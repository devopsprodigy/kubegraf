///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import appEvents from "grafana/app/core/app_events"
import { __getGrafanaVersion } from "../../common/helpers"

export class ClusterPermissions {
    $scope: any
    cluster: any
    busy: boolean
    pageReady: boolean
    version: number
    permissionFormOpen: boolean = false
    permissionFormValid: boolean = false
    permissionType: string = "Team"
    permissionUser: number = null
    permissionRole: string = null
    users: any[]
    teams: any[]

    static templateUrl = 'components/cluster-permissions/cluster-permissions.html'

    constructor($scope, $injector, private backendSrv, private datasourceSrv, private alertSrv, private $q, private $location, private $window) {
        document.title = 'DevOpsProdigy KubeGraf | Cluster Permissions'
        this.pageReady = false
        this.$scope = $scope
        this.$q = $q
        this.busy = false
        this.version = __getGrafanaVersion($window);
        this.getData().finally(() => {
            this.pageReady = true
            this.$scope.$apply()
            console.log(this.cluster.jsonData.permissions)
        });
    }

    async getData() {
        await Promise.all([
            this.getCluster(),
            this.getUsers(),
            this.getTeams()
        ]);
    }

    async getCluster(): Promise<void> {
        if ("clusterId" in this.$location.search()) {
            await this.getDatasource(this.$location.search().clusterId)
        }
    }

    async getUsers() {
        const url = '/api/users/'
        await this.backendSrv.request({url, method: 'GET'})
            .then(res => {
                this.users = res
            })
            .catch(() => {
                appEvents.emit('alert-error', [`Users not found `])
            })
    }

    async getTeams() {
        const url = '/api/teams/search'
        await this.backendSrv.request({url, method: 'GET'})
            .then(res => {
                this.teams = res.teams
            })
            .catch(() => {
                appEvents.emit('alert-error', [`Teams not found `])
            })
    }

    addPermission(): void {
        const permission = {
            type: this.permissionType,
            user: this.permissionUser,
            role: this.permissionRole
        }

        if (this.validate(permission)) {
            if (typeof this.cluster.jsonData.permissions === "undefined") {
                this.cluster.jsonData.permissions = []
            }

            if (this.checkDuplicate(permission)) {
                this.cluster.jsonData.permissions.push(permission)
                this.saveCluster()
            } else {
                appEvents.emit('alert-error', [`Permission already exists`])
            }
        }
    }

    updatePermission(index: number, role: string): void {
        if (this.cluster.jsonData.permissions[index]) {
            this.cluster.jsonData.permissions[index].role = role
            this.saveCluster()
        } else {
            appEvents.emit('alert-error', [`Permission not found`])
        }
    }

    deletePermission(index: number): void {
        if (this.cluster.jsonData.permissions[index]) {
            this.cluster.jsonData.permissions.splice(index, 1)
            this.saveCluster()
        } else {
            appEvents.emit('alert-error', [`Permission not found`])
        }

    }

    getDatasource(id) {
        return this.backendSrv.get('/api/datasources/' + id)
            .then(result => {
                if (!(result.jsonData.prom_name))
                    result.jsonData.prom_name = ''

                if (!(result.jsonData.refresh_pods_rate))
                    result.jsonData.refresh_pods_rate = '60'

                this.cluster = result
            })
    }

    togglePermissionForm(open: boolean): void {
        this.permissionFormOpen = open
    }

    validateForm(field: string) {
        if (field === 'type') {
            this.permissionUser = null
        }

        const permission = {
            type: this.permissionType,
            user: this.permissionUser,
            role: this.permissionRole
        }

        if (this.validate(permission)) {
            this.permissionFormValid = true
            return true
        }

        this.permissionFormValid = false
        return false
    }

    validate(permission: any): boolean|string {
        return (permission.type && permission.user && permission.role) ||
            ((permission.type === "Viewer" || permission.type === "Editor") && permission.role)
    }

    checkDuplicate(permission: any): boolean {
        return this.cluster.jsonData.permissions.every((current) => {
            return !(current.type === permission.type && current.user === permission.user && current.role === permission.role)
        })
    }

    getName(permission: any): string {
        if (permission.type === "Viewer") {
            return 'Viewer (Role)'
        } else if (permission.type === "Editor") {
            return 'Editor (Role)'
        } else if (permission.type === "Team") {
            return `${permission.user.name} (Team)`
        } else if ((permission.type === "User")) {
            return `${permission.user.login} (User)`
        }

        return "Undefined"
    }

    saveCluster() {
        this.backendSrv.put('/api/datasources/' + this.cluster.id, this.cluster)
            .then(res => {
                if (res && res.datasource) {
                    this.cluster = res.datasource;
                }
            })
    }
}
