const request = require("request");

let getDataOption = {
    url: 'https://apis.sktelecom.com/v1/baas/data/Spot',
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "TDCProjectKey": process.env.BAAS_API_KEY,
        "Content-Type": "application/json;charset=utf-8"
    }
};

let fcmOption = {
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
        "Authorization": "key=" + process.env.FCM_SERVER_KEY,
        "Content-Type": "application/json;charset=utf-8"
    },
    body: ""
};

request(getDataOption, function (err, res, body) {
    let result = JSON.parse(body).results;

    let fcmData = {
        "to": "/topics/default",
        "time_to_live": 14400,
        "data": {
            "title": "",
            "content": "",
            "id": "",
            "location": "",
            "channel": "default_channel",
            "priority": 3,
            "type": "suggest"
        }
    };

    let targetIndex = getRandomInt(0, result.length);
    fcmData.data.title = result[targetIndex].title;
    fcmData.data.content = result[targetIndex].description;
    fcmData.data.id = result[targetIndex].id;
    fcmData.data.location = result[targetIndex].location.latitude + "/" + result[targetIndex].location.longitude;

    fcmOption.body = JSON.stringify(fcmData);

    request(fcmOption, function (err, res, body) {
        console.log(body);
    });
});

function getRandomInt(min, max) { //min ~ max 사이의 임의의 정수 반환
    return Math.floor(Math.random() * (max - min)) + min;
}