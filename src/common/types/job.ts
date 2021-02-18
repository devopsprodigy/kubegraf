import { Pod } from '../../common/types/pod';
import { BaseModel } from '../../common/types/traits/baseModel';

export class Job extends BaseModel {
  pods: Pod[];

  constructor(data) {
    super(data);
    this.pods = [];
  }
}
