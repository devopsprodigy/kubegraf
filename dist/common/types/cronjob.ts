import {Job} from '../../common/types/job';
import {BaseModel} from '../../common/types/traits/baseModel';

export class Cronjob extends BaseModel{
    jobs: Array<Job>;

    constructor(data){
        super(data)
        this.jobs = [];
    }
}
