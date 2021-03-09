import { Pod } from './pod';
import { Service } from './service';
import { BaseModel } from './traits/baseModel';

export class Deployment extends BaseModel {
  pods: Pod[];
  services: Service[];

  constructor(data: any) {
    super(data);
    this.pods = [];
    this.services = [];
  }
}
