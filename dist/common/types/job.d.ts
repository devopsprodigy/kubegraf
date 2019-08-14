import { Pod } from '../../common/types/pod';
import { BaseModel } from '../../common/types/traits/baseModel';
export declare class Job extends BaseModel {
    pods: Array<Pod>;
    constructor(data: any);
}
