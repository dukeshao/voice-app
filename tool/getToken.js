var RPCClient = require('@alicloud/pop-core').RPCClient;
const { Appkey, AccessKeyID, AccessKeySecret } = require('../config/index.json');

async function getToken() {
  let client = new RPCClient({
    accessKeyId: AccessKeyID,
    accessKeySecret: AccessKeySecret,
    endpoint: 'http://nls-meta.cn-shanghai.aliyuncs.com',
    apiVersion: '2019-02-28'
  });

  let result = await client.request('CreateToken');
  console.log(result.Token);
  /*
    {
      UserId: '',
      Id: '',
      ExpireTime: 
    }
  */
  return result.Token;
}
// getToken()

module.exports = getToken;