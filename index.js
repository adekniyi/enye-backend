const express = require('express');
const momemt = require('moment');
const fetch = require('node-fetch');


const app = express();

app.get('/api/rates',(req,res)=>{



    var toRe =fetch(`https://api.exchangeratesapi.io/latest?base=${req.query.base}&symbols=${req.query.currency.split(",")[0]},${req.query.currency.split(",")[1]},${req.query.currency.split(",")[2]}`)
    .then((resp) => resp.json())
    .then((data) => {
        if(data==null||data==undefined){
        res.json({result:{data}});
        }
        else{
            res.status(400).json({message:"invalid query format pls make sure your url is like this '/api/rates?base=CZK&currency=EUR,GBP,USD'"})
        }
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