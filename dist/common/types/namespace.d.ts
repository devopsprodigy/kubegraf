import { Deployment } from "./deployment";
import { Statefulset } from "./statefulset";
import { Daemonset } from "./daemonset";
import { Pod } from '../../common/types/pod';
import { Job } from '../../common/types/job';
import { Cronjob } from '../../common/types/cronjob';
import { BaseModel } from '../../common/types/traits/baseModel';
export declare class Namespace extends BaseModel {
    deployments: Array<Deployment>;
    statefulsets: Array<Statefulset>;
    daemonsets: Array<Daemonset>;
    other: Array<{
        pods: Array<Pod>;
    }>;
    jobs: Array<Job>;
    cronJobs: Array<Cronjob>;
    sort: string;
    constructor(data: any);
    toggle(): void;
}
