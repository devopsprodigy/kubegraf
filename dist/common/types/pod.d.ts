import { BaseModel } from '../../common/types/traits/baseModel';
export declare class Pod extends BaseModel {
    metrics: {
        cpuUsed: number | string;
        memoryUsed: number | string;
        cpuRequested: number | string;
        memoryRequested: number | string;
    };
    used: boolean;
    private eventMessage;
    constructor(data: any);
    status: number;
    color: string;
    message: any;
    NaMessage: string;
}
