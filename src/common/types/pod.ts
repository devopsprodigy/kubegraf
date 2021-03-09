import { ERROR, SUCCEEDED, SUCCESS, TERMINATING, WARNING } from '../constants';
import { BaseModel } from './traits/baseModel';

export class Pod extends BaseModel {
  metrics: {
    cpuUsed: number | string;
    memoryUsed: number | string;
    cpuRequested: number | string;
    memoryRequested: number | string;
    cpuLimit: number | string;
    memoryLimit: number | string;
  };
  sourceMetrics: {
    cpuUsed: number;
    memoryUsed: number;
    cpuRequested: number;
    memoryRequested: number;
    cpuLimit: number;
    memoryLimit: number;
  };
  used: boolean;
  private eventMessage: string = null;

  constructor(data) {
    super(data);
    this.metrics = {
      cpuUsed: 'N-A',
      memoryUsed: 'N-A',
      cpuRequested: 'N-A',
      memoryRequested: 'N-A',
      cpuLimit: 'N-A',
      memoryLimit: 'N-A',
    };
    this.sourceMetrics = {
      cpuUsed: null,
      memoryUsed: null,
      cpuRequested: null,
      memoryRequested: null,
      cpuLimit: null,
      memoryLimit: null,
    };
    this.used = false;
  }

  get status() {
    if (this.data.metadata.deletionTimestamp) {
      return TERMINATING;
    } else if (this.data.status.phase === 'Running') {
      let conditionStatus;
      let containerStatuses;
      let initContainerStatuses;

      if (this.data.status.conditions) {
        conditionStatus = this.data.status.conditions.filter((item) => item.status === 'False');
        conditionStatus.length > 0 ? (conditionStatus = true) : (conditionStatus = false);
      }
      if (this.data.status.containerStatuses) {
        containerStatuses = this.data.status.containerStatuses.filter((item) => item.ready === false);
        containerStatuses.length > 0 ? (containerStatuses = true) : (containerStatuses = false);
      }
      if (this.data.status.initContainerStatuses) {
        initContainerStatuses = this.data.status.initContainerStatuses.filter((item) => item.ready === false);
        initContainerStatuses.length > 0 ? (initContainerStatuses = true) : (initContainerStatuses = false);
      }
      if (conditionStatus || containerStatuses || initContainerStatuses) {
        return ERROR;
      } else {
        return SUCCESS;
      }
    } else {
      switch (this.data.status.phase) {
        case 'Pending':
          return WARNING;
        case 'Succeeded':
          return SUCCEEDED;
        case 'Failed':
          return ERROR;
        case 'Unknown':
          return ERROR;
        default:
          return ERROR;
      }
    }
  }

  get color() {
    switch (this.status) {
      case ERROR:
        return 'error';
      case WARNING:
        return 'warning';
      case TERMINATING:
        return 'terminating';
      case SUCCESS:
        return 'success';
      case SUCCEEDED:
        return 'succeeded';
      default:
        return 'success';
    }
  }

  get message() {
    if (this.eventMessage) {
      return this.eventMessage;
    }

    let status = this.status;
    let data = this.data;
    let phase = this.data.status.phase;
    let message = 'Pod is ' + phase;
    if (status === ERROR) {
      if (data.status.containerStatuses) {
        let d = data.status.containerStatuses.filter((item) => item.ready === false)[0];
        if (d && d.state && d.state.waiting) {
          if (d.state.waiting.message && d.state.waiting.reason) {
            message = d.state.waiting.reason + '. ' + d.state.waiting.message;
            return message;
          }
        }
      } else if (data.status.conditions) {
        let d = data.status.conditions.filter(
          (item) => item.ready === false || (item.type === 'PodScheduled' && item.status === 'False')
        )[0];
        if (d !== undefined) {
          return d.message;
        }
      } else if (data.status.message) {
        return data.status.message;
      }
      return 'Undefined error';
    } else {
      if (this.data.metadata.deletionTimestamp) {
        return 'Pod is Terminating';
      } else if (phase === 'Running' || phase === 'Succeeded') {
        return 'Pod is ' + phase;
      } else {
        if (data.status.containerStatuses) {
          let d = data.status.containerStatuses.filter((item) => item.ready === false)[0];
          if (d.state.waiting.message && d.state.waiting.message.length > 0) {
            message = d.state.waiting.message;
          }
        } else if (data.status.conditions) {
          let d = data.status.conditions.filter(
            (item) => item.ready === false || (item.type === 'PodScheduled' && item.status === 'False')
          )[0];
          if (d !== undefined) {
            message = d.message;
          }
        } else if (data.status.message) {
          message = data.status.message;
        }
        return message;
      }
    }
  }

  set message(msg) {
    this.eventMessage = msg;
  }

  get NaMessage() {
    return 'Prometheus metrics unavailable';
  }

  get usageCpuColor() {
    if (this.sourceMetrics.cpuUsed === null) {
      return '';
    }

    if (this.sourceMetrics.cpuRequested && this.sourceMetrics.cpuLimit) {
      const min =
        (this.sourceMetrics.cpuLimit - this.sourceMetrics.cpuRequested) * 0.5 + this.sourceMetrics.cpuRequested;
      const max =
        (this.sourceMetrics.cpuLimit - this.sourceMetrics.cpuRequested) * 0.8 + this.sourceMetrics.cpuRequested;

      if (this.sourceMetrics.cpuUsed < min) {
        return 'green';
      } else if (this.sourceMetrics.cpuUsed >= max) {
        return 'red';
      } else {
        return 'yellow';
      }
    }
    return 'red';
  }

  get usageMemoryColor() {
    if (this.sourceMetrics.memoryUsed === null) {
      return '';
    }

    if (this.sourceMetrics.memoryRequested && this.sourceMetrics.memoryLimit) {
      const min =
        (this.sourceMetrics.memoryLimit - this.sourceMetrics.memoryRequested) * 0.5 +
        this.sourceMetrics.memoryRequested;
      const max =
        (this.sourceMetrics.memoryLimit - this.sourceMetrics.memoryRequested) * 0.8 +
        this.sourceMetrics.memoryRequested;

      if (this.sourceMetrics.memoryUsed < min) {
        return 'green';
      } else if (this.sourceMetrics.memoryUsed >= max) {
        return 'red';
      } else {
        return 'yellow';
      }
    }

    return 'red';
  }
}
