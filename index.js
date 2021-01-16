const express = require('express');
const momemt = require('moment');
const fetch = require('node-fetch');


const app = express();

app.get('/api/rates',(req,res)=>{

if(/\?.+/.test(req.url))
{
    var toRe =fetch(`https://api.exchangeratesapi.io/latest?base=${req.query.base}&symbols=${req.query.currency.split(",")[0]},${req.query.currency.split(",")[1]},${req.query.currency.split(",")[2]}`)
    .then((resp) => resp.json())
    .then((data) => {
        res.json({result:{data}});
    }).catch((err) => console.log(err));
}else{
    var toRe =fetch(`https://api.exchangeratesapi.io/latest`)
    .then((resp) => resp.json())
    .then((data) => {
        res.json({result:{data}});
    }).catch((err) => console.log(err));
}
});


app.get('*', (req, res) => {
    return res.status(404).send({error: 'Route not found'})
})

const PORT = process.env.PORT || 4000;


app.listen(PORT,()=>console.log(`server started on port ${PORT}`));