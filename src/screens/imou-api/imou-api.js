const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

function get_auth_sign(time, nonce, appSecret){
    
    // 4. Generar la cadena original de la firma
    const SIGN_TEMPLATE = `time:${time},nonce:${nonce},appSecret:${appSecret}`;

    // 5. Generar el hash MD5
    const sign = crypto.createHash("md5").update(SIGN_TEMPLATE, "utf8").digest("hex");

    console.log("Timestamp:", time, "Type:", typeof(time));
    console.log("Nonce:", nonce);
    console.log("Sign:", sign);

    return (time, nonce, sign)
}

const url_api = "https://openapi-or.easy4ip.com/openapi"
const appId = "lceebe919be07a48a4"
const appSecret = "86d0d6517af0465f8c5df2a6e8cb1b"
const time = Math.floor(Date.now() / 1000);
const nonce = uuidv4();
let sign = get_auth_sign(time, nonce, appSecret)

const getAccessToken = async () => {
    const response = await fetch(url_api + "/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "system":{
            "ver":"1.0",
            "appId" : appId,
            "sign": sign, 
            "time": time,
            "nonce": nonce
        },
        "id": uuidv4(),
        "params":{

        }
      })
    });
    
    const data = await response.json();
    console.log(data);
    //return data.data.accessToken;
    
};

//getAccessToken();
let accessToken = 'At_0000or26d1c8e1533b4c4183caa3fe97'

const bindDeviceLive = async () => {
  const response = await fetch(url_api + "/bindDeviceLive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "system":{
          "ver": "1.0",
          "appId": appId,
          "sign": sign, 
          "time": time,
          "nonce": nonce
      },
      "id": uuidv4(),
      "params":{
        "streamId": 1,
        "deviceId": "658F7AJGFBC18D4",
        "channelId":"0",
        "token": accessToken
      }
    })
  });
  
  const data = await response.json();
  console.log(data);
};

const getLiveStreamInfo = async () => {
  const response = await fetch(url_api + "/getLiveStreamInfo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "system":{
          "ver":"1.0",
          "appId": appId,
          "sign": sign, 
          "time": time,
          "nonce": nonce
      },
      "id": uuidv4(),
      "params":{
        "deviceId":"658F7AJGFBC18D4",
        "channelId":"0",
        "token": accessToken
      }
    })
  });
  
  const data = await response.json();
  console.log(data);
};

const queryLiveStatus = async () => {
  const response = await fetch(url_api + "/queryLiveStatus", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "system":{
          "ver":"1.0",
          "appId": appId,
          "sign": sign, 
          "time": time,
          "nonce": nonce
      },
      "id": uuidv4(),
      "params":{
        "liveToken":"34e5de7b-bc0c-45d2-893a-cf1f0e4a3721",
        "token": accessToken
      }
    })
  });
  
  const data = await response.json();
  console.log(data);
};

const queryDeviceRtmpLive = async () => {
  const response = await fetch(url_api + "/queryDeviceRtmpLive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "system":{
          "ver": "1.0",
          "appId": appId,
          "sign": sign, 
          "time": time,
          "nonce": nonce
      },
      "id": uuidv4(),
      "params":{
        "token": accessToken,
        "deviceId": "658F7AJGFBC18D4",
        "channelId": "0"
      }
    })
  });
  
  const data = await response.json();
  console.log(data);
};

const liveList = async () => {
  const response = await fetch(url_api + "/liveList", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "system":{
          "ver": "1.0",
          "appId": appId,
          "sign": sign, 
          "time": time,
          "nonce": nonce
      },
      "id": uuidv4(),
      "params":{
        "token": accessToken,
        "queryRange": "1-10"
      }
    })
  });
  
  const data = await response.json();
  console.log(data);
};

const unbindLive = async () => {
  const response = await fetch(url_api + "/unbindLive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "system":{
          "ver": "1.0",
          "appId": appId,
          "sign": sign, 
          "time": time,
          "nonce": nonce
      },
      "id": uuidv4(),
      "params":{
        "token": accessToken,
        "deviceId": "658F7AJGFBC18D4",
      }
    })
  });
  
  const data = await response.json();
  console.log(data);
};

const createDeviceRtmpLive = async () => {
  const response = await fetch(url_api + "/createDeviceRtmpLive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "system":{
          "ver": "1.0",
          "appId": appId,
          "sign": sign, 
          "time": time,
          "nonce": nonce
      },
      "id": uuidv4(),
      "params":{
        "deviceId": "658F7AJGFBC18D4",
        "channelId": "0",
        "token": accessToken,
      }
    })
  });
  
  const data = await response.json();
  console.log(data);
};

const queryRtmpLive = async () => {
  const response = await fetch(url_api + "/queryDeviceRtmpLive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "system":{
          "ver": "1.0",
          "appId": appId,
          "sign": sign, 
          "time": time,
          "nonce": nonce
      },
      "id": uuidv4(),
      "params":{
        "deviceId": "658F7AJGFBC18D4",
        "channelId": "0",
        "token": accessToken,
      }
    })
  });
  
  const data = await response.json();
  console.log(data);
};

const deleteDeviceRtmpLive = async () => {
  const response = await fetch(url_api + "/deleteDeviceRtmpLive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "system":{
          "ver": "1.0",
          "appId": appId,
          "sign": sign, 
          "time": time,
          "nonce": nonce
      },
      "id": uuidv4(),
      "params":{
        "deviceId": "658F7AJGFBC18D4",
        "channelId": "0",
        "token": accessToken,
      }
    })
  });
  
  const data = await response.json();
  console.log(data);
};

unbindLive();