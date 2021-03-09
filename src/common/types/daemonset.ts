import { Pod } from './pod';
import { Service } from './service';
import { BaseModel } from '../../common/types/traits/baseModel';

export class Daemonset extends BaseModel {
  pods: Pod[];
  services: Service[];

  constructor(data: any) {
    super(data);
    this.pods = [];
  }
}
