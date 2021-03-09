import { Deployment } from './deployment';
import { Statefulset } from './statefulset';
import { Daemonset } from './daemonset';
import store from '../../common/store';
import { Pod } from '../../common/types/pod';
import { Job } from '../../common/types/job';
import { Cronjob } from '../../common/types/cronjob';
import { BaseModel } from '../../common/types/traits/baseModel';

export class Namespace extends BaseModel {
  deployments: Deployment[];
  statefulsets: Statefulset[];
  daemonsets: Daemonset[];
  other: Array<{ pods: Pod[] }>;
  jobs: Job[];
  cronJobs: Cronjob[];
  sort: string;

  constructor(data) {
    super(data);
    this.deployments = [];
    this.statefulsets = [];
    this.daemonsets = [];
    this.other = [{ pods: [] }];
    this.sort = 'name';
  }

  toggle() {
    super.toggle();
    let namespaceStore = store.getObject('namespaceStore');
    let index = namespaceStore.findIndex((item) => item.name === this.name);
    if (index || index === 0) {
      namespaceStore[index].open = this.open;
    }
    store.setObject('namespaceStore', namespaceStore);
  }
}
