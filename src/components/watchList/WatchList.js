import React, {useEffect,useState} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import StockList from '../stockList/StockList';

import CanvasJSReact from '../../lib/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function WatchList() {

    const [state,setState] = useState({
        data:null,
        lastSearchKey:'NDAQ',
        watchList:['NDAQ'],
        graphData:[],
        counter:0
    });

    useEffect(()=>{
        
        //console.log('xx',state.counter)
        //if (state.counter<3) {
        axios({
            "method":"GET",
            "url":"https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key":"9baa6445d4msh716951b1fc8dd7ep12ae96jsnab0526eeaa56",
            "useQueryString":true
            },"params":{
            "region":"US",
            "lang":"en",
            "symbol":state.lastSearchKey
            }
            })
            .then((response)=>{
                //console.log(response);
                const axios = require("axios");

                axios({
                    "method":"GET",
                    "url":"https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart",
                    "headers":{
                    "content-type":"application/octet-stream",
                    "x-rapidapi-host":"apidojo-yahoo-finance-v1.p.rapidapi.com",
                    "x-rapidapi-key":"9baa6445d4msh716951b1fc8dd7ep12ae96jsnab0526eeaa56",
                    "useQueryString":true
                    },"params":{
                    "period2":"1590775200",
                    "period1":"1590744600",
                    "interval":"5m",
                    "region":"US",
                    "symbol":state.lastSearchKey,
                    "lang":"en",
                    "range":"1d"
                    }
                    })
                    .then((response2)=>{
                    //console.log(response)
                    

                    let finalGraphData = [];
                        console.log('yy',response2)
                    response2.data.chart.result[0].indicators.quote[0].open.map((item,index)=>{
                        finalGraphData.push({label:response2.data.chart.result[0].timestamp[index], y:item})
                    });

                    

                    setState({...state,data:[response.data],watchList:[...state.watchList,state.lastSearchKey], graphData:finalGraphData});

                    })
                    .catch((error)=>{
                    console.log(error)
                    })


                
            })
            .catch((error)=>{
                console.log(error);
        });

    //}

    },[state.lastSearchKey]);

    const searchHandler = (e) => {
        if (e.key === 'Enter') {
            //console.log(e.target.value)
            setState({...state, lastSearchKey:e.target.value});
        }
    }

    const options = {
        title: {
          text: state.lastSearchKey
        },
        axisY:{
            minimum: 115
        },			

        data: [{  type: "line",
                  dataPoints: state.graphData 
                  /*[
                      { label: "Apple",  y: 10  },
                      { label: "Orange", y: 15  },
                      { label: "Banana", y: 25  },
                      { label: "Mango",  y: 30  },
                      { label: "Grape",  y: 28  }
                  ]*/
         }] 
     }

    return (
        <div>
            <br/>

            <TextField
                id="outlined-read-only-input"
                label="Search"
                defaultValue="NDAQ"
                InputProps={{
                    readOnly: false,
                }}
                variant="outlined"
                onKeyDown={(e)=>searchHandler(e)}
            />

            <br/>
            {state.data?
            <StockList data={state.data}/>:null}

            <br/>

            <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
        />
        </div>
    )
}

export default WatchList
