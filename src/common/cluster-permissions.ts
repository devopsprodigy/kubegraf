import appEvents from "grafana/app/core/app_events";
import { ContextSrv } from "grafana/app/core/services/context_srv";
import { BackendSrv } from "grafana/app/core/services/backend_srv";
import { TYPE_KUBEGRAF_PLUGIN } from "./constants";

export class ClusterPermissions {
    userTeams: any[] = null;

    constructor(private backendSrv: BackendSrv, private contextSrv: ContextSrv) {
        this.getUserTeams().then(res => {
            this.userTeams = res
        })
    }

    checkPermission(permissions: any[]): boolean {
        if (typeof permissions === "undefined"){
            return true
        }

        if (this.contextSrv.isGrafanaAdmin || this.contextSrv.hasRole('Admin')) {
            return true
        }

        return permissions.findIndex(async permission => {
            if (this.contextSrv.hasRole('Editor') && permission.type === "Editor") {
                return true
            }

            if (this.contextSrv.hasRole('Viewer') && permission.type === "Viewer") {
                return true
            }
            // @ts-ignore
            if (permission.type === "User" && permission.user.id === this.contextSrv.user.id) {
                return true
            }

            if (permission.type === "Team") {
                if (this.userTeams === null) {
                    this.userTeams = await this.getUserTeams()
                }

                if (this.userTeams.findIndex(team => {
                    return permission.user.id === team.id
                }) > -1) {
                    return true
                }
            }

            return false
        }) > -1
    }

    async getUserTeams(force: boolean = false) {
        if (this.userTeams === null && force === false) {
            const teams = await this.backendSrv.get('/api/user/teams');

            if (Array.isArray(teams)) {
                return teams;
            }

            appEvents.emit('alert-error', [`Teams not received`]);
            return [];
        }

        return this.userTeams;
    }

    isAdmin() {
        let isAdmin = false;

        try {
            isAdmin = this.contextSrv.hasRole('Admin');
        } catch (e) {
            console.error(e);
        }

        return isAdmin
    }

    checkPermissionByClusterName(clusterName: string): boolean {
        const datasources = window.grafanaBootData.settings.datasources

        if (datasources) {
            const clusters = Object.keys(datasources)
                .filter(key => datasources[key].name === clusterName)
                .filter(key => {
                    return datasources[key].jsonData ? this.checkPermission(datasources[key].jsonData.permissions) : false
                })
            if (clusters.length > 0) {
                return true;
            }
        }
        return false;
    }
}
