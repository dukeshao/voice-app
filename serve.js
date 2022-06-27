const request = require('request');
const fs = require('fs');
const { Appkey } = require('./config/index.json');
const getToken = require('./tool/getToken');


function callback(error, response, body) {
  if (error != null) {
    console.log(error);
  }
  else {
    // console.log('The audio file recognized result:');
    // console.log(body);
    if (response.statusCode == 200) {
      body = JSON.parse(body);
      if (body.status == 20000000) {
        console.log('result: ' + body.result);
        // console.log('The audio file recognized succeed!');
      } else {
        console.log('The audio file recognized failed!');
      }
    } else {
      console.log('The audio file recognized failed, http code: ' + response.statusCode);
    }
  }
}

function process(requestUrl, token, audioFile) {
  /**
   * 读取音频文件
  */
  var audioContent = null;
  try {
    audioContent = fs.readFileSync(audioFile);
  } catch (error) {
    if (error.code == 'ENOENT') {
      console.log('The audio file is not exist!');
    }
    return;
  }

  /**
   * 设置HTTPS请求头部
  */
  var httpHeaders = {
    'X-NLS-Token': token,
    'Content-type': 'application/octet-stream',
    'Content-Length': audioContent.length
  };
  console.log("header token=>",token)

  var options = {
    url: requestUrl,
    method: 'POST',
    headers: httpHeaders,
    body: audioContent
  };

  request(options, callback);
}



var appkey = Appkey;
// var token = '填入服务鉴权Token';


var url = 'https://nls-gateway-cn-shanghai.aliyuncs.com/stream/v1/asr';
var audioFile = './files/test.wav';
var format = 'pcm';
var sampleRate = '16000';
var enablePunctuationPrediction = true;
var enableInverseTextNormalization = true;
var enableVoiceDetection = false;

/**
 * 设置RESTful请求参数
 */
var requestUrl = url;
requestUrl = requestUrl + '?appkey=' + appkey;
requestUrl = requestUrl + '&format=' + format;
requestUrl = requestUrl + '&sample_rate=' + sampleRate;
if (enablePunctuationPrediction) {
  requestUrl = requestUrl + '&enable_punctuation_prediction=' + 'true';
}
if (enableInverseTextNormalization) {
  requestUrl = requestUrl + '&enable_inverse_text_normalization=' + 'true';
}
if (enableVoiceDetection) {
  requestUrl = requestUrl + '&enable_voice_detection=' + 'true';
}

getToken().then(token => {
  process(requestUrl, token.Id, audioFile);
})