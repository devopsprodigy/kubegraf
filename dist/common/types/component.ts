import {BaseModel} from '../../common/types/traits/baseModel';
import {ERROR, SUCCESS, COLOR_RED, COLOR_GREEN} from '../../common/constants';

export class Component extends BaseModel{

    constructor(data){
        super(data)
    }

    get status(){
        let type = this.data.conditions.filter(item => item.type === 'Healthy')[0];

        if(type !== undefined && type.status === 'True'){
            return SUCCESS
        } else {
            return ERROR
        }
    }

    get color(){
        switch (this.status) {
            case SUCCESS:
                return COLOR_GREEN;
            case ERROR:
                return COLOR_RED;
            default:
                return;
        }
    }

    get message(){
        let conditions = this.data.conditions;

        if(conditions) {
            let message = conditions.filter(item => item.type === 'Healthy')[0];
            return message && message.message;
        }
    }

}
