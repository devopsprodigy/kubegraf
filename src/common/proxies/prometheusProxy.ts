import q from "q";
import moment from 'moment';
export class PrometheusProxy {
    ds: any;
    version: any;

    constructor(ds){
        this.ds = ds;

    }

    query(query: any, debug: boolean = false){
        let body = {
            range: { from: moment().subtract(2, 'minute'), to: moment() },
            targets: [{expr: query.expr, format: 'time_series'}],
            legendFormat: '{{' + query.legend + '}}',
            interval: '15s'
        };

        let res = this.ds.query(body)
        if (typeof res.then !== "function") {
            res = res.toPromise()
        }

        return res.then(res => {
            if (res && res.data){
                return  this.formData(res.data, query, debug);
            }else{
                return {}
            }
        })
    }

    formData(data, query, debug = false){
        return data.map(item =>
            {
                if(debug){
                    console.log(item);
                }


                return {
                    target : this.__getName(item, query),
                    datapoint : this.__getLastNonNullValue(item)
                };
            }

        );
    }

    __getLastNonNullValue = item => {
        if(item.fields){
            let valueField = item.fields.filter(row => {
                return row.name && row.name === "Value";
            })

            if (valueField){
                let vArr = valueField[0].values.buffer.filter(point => point != null);
                let value = vArr[vArr.length - 1];
                if(value == null){
                    console.log(item);
                }
                return value;

            }
        }else if(item.dataset){
            let skiper = item.dataset.filter(item => item[0]!= null);
            return skiper[skiper.length-1][0];
        }else{
            return 0;
        }
    };

    __getName = (item, query) => {
        if(item.target !== undefined){
            return item.target.substring(query.legend.length + 3, item.target.length - 2);

        }

        if(item.name !== undefined){
            return item.name.substring(query.legend.length + 3, item.name.length - 2);
        }

    }
}
