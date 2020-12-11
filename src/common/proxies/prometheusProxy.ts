import q from "q";
import moment from 'moment';
export class PrometheusProxy {
    ds: any;

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

        if(debug)
            console.log(body);

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
        if(debug){
            console.log(data);
            console.log(query);
        }
        return data.map(item =>
            {
                if(debug){
                    console.log(item.target);
                    console.log(query.legend);
                    console.log(item.target.substring(query.legend.length + 3, item.target.length - 2));
                }


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
