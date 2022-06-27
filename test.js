//node 模块
const express = require('express')
const app = express()
//中间件
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
//请求
// const request = require('request');
var path = require('path');

//语音文件
const fs = require('fs');
//阿里云语音模块
// var RPCClient = require('@alicloud/pop-core').RPCClient;

// const { Appkey, AccessKeyID, AccessKeySecret } = require('./config/index.json');
const formidable = require('formidable')

app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200); //让options尝试请求快速结束
  else
    next();
})


app.post('/getAudioInfo', function (req, res) {
  let form = new formidable.IncomingForm()
  form.encoding = 'utf-8' // 编码
  form.parse(req, async (err, fields, files) => {
    let { speechFile } = fields;
    // console.log(fields.speechFile)
    var buf = new Buffer.from(speechFile, 'base64');
    fs.writeFile("files/test.wav", buf, () => { });
  })
  // res.send(data);
});


app.listen(9999, function () { console.log('server start success...') });
