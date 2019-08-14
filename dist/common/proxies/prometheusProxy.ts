import q from "q";
import moment from 'moment';
export class PrometheusProxy {
    ds: any;

    constructor(ds){
        this.ds = ds;
    }

    query(query: any){
        let body = {
            range: { from: moment().subtract(5, 'minute'), to: moment() },
            targets: [{expr: query.expr, format: 'time_series'}],
            legendFormat: '{{' + query.legend + '}}',
            interval: '15s'
        };
        return this.ds.query(body)
            .then(res => {
                if (res  && res.data){
                    return  this.formData(res.data, query);
                }else{
                    return {}
                }
            })
    }

    formData(data, query){
        return data.map(item =>
            {
                return {
                    target : item.target.substring(query.legend.length + 3, item.target.length - 2),
                    datapoint : this.__getLastNonNullValue(item.datapoints)
                };
            }

        );
    }

    __getLastNonNullValue = dataset => {
        if(dataset){
            let skiper = dataset.filter(item => item[0]!= null);
            return skiper[skiper.length-1][0];
        }
    };
}
