const express = require('express');
const momemt = require('moment');


const app = express();

app.get('/',(req,res)=>{

    console.log(req.query.currency);
    console.log(req.query.currency.split(",")[1]);

     fetch(`https://api.exchangeratesapi.io/latest?base=${req.query.base}&symbols=${req.query.currency.split(",")[0]},${req.query.currency.split(",")[1]},${req.query.currency.split(",")[2]}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
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
    res.json(toRes);
});

const PORT = process.env.PORT || 4000;


app.listen(PORT,()=>console.log(`server started on port ${PORT}`));