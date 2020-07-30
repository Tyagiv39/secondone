var cheerio=require('cheerio');
var request=require('request');
var mysql=require('mysql');
var cron=require('node-cron');

var con=mysql.createConnection({
  host:"localhost",
  user:"  ",
  password:"  ",
  database:"mydb"
})


con.connect(function(err,result){
if(err) throw err;
console.log('connectrd');
var url='https://in.tradingview.com/markets/stocks-india/market-movers-active/';
  cron.schedule("*/30 * * * * *",function(){
     request(url,function(err,resp,body){
  if (err) throw err;
  const $=cheerio.load(body);
  for(var i=0;i<101;i++){
var a=$('.tv-screener-table__symbol-container ').find('a').eq(i).text();
var b=$('tbody tr').children('td:nth-child(2)').eq(i).text();
var sql=  "UPDATE stockdatas SET stockname='"+a+"',LTPprice='"+b+"' WHERE id='"+i+"'";
//console.log(a +"------" +b);
con.query(sql,function (err,result) {
   });
};});
con.query("SELECT*FROM stockdatas" ,function (err,result){
  if (err) throw err;
  console.log(result); });
});

});
