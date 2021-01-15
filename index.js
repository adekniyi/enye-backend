const express = require('express');
const momemt = require('moment');
const fetch = require('node-fetch');


const app = express();

app.get('/api/rates',(req,res)=>{

    // console.log(req.query.currency);
    // console.log(req.query.currency.split(",")[1]);
    var getData;

    var toRe =fetch(`https://api.exchangeratesapi.io/latest?base=${req.query.base}&symbols=${req.query.currency.split(",")[0]},${req.query.currency.split(",")[1]},${req.query.currency.split(",")[2]}`)
    .then((resp) => resp.json())
    .then((data) => {
        res.json(data);
    }).catch((err) => console.log(err));
  
    var toRes = {
        results:{
            base:req.query.base,
            date: momemt().format("YYYY-MM-D"),
            rates:{
                [req.query.currency.split(",")[0]] : 0.0377244605,
                [req.query.currency.split(",")[1]] :0.033795458,
                [req.query.currency.split(",")[2]] :0.044824204
            }
        }
    }
});

const PORT = process.env.PORT || 4000;


app.listen(PORT,()=>console.log(`server started on port ${PORT}`));