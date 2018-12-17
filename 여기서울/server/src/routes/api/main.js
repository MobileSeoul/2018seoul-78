const Express = require('express');
const Router = Express.Router();
const dateFormat = require('dateformat');
const request = require("request");

Router.get("/time", function (req, res) {
    return res.status(200).json({time: dateFormat(new Date(), "mm/dd/yyyy")});
});

Router.get("/suggestion-upload", function (req, routerRes) {
    if (req.query.key === process.env.CLIENT_API_KEY) {
        let options = {
            url: 'https://apis.sktelecom.com/v1/baas/data/Suggestion',
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "TDCProjectKey": process.env.BAAS_API_KEY,
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                "id": req.query.id,
                "suggest": req.query.suggest
            })
        };
        request(options, function (err, res, body) {
            return routerRes.status(200).json(JSON.parse(body));
        });
    } else {
        return routerRes.status(200).json({result: "KEY 값을 확인 해 주세요"});
    }
});

Router.get("/get-spot-data", function (req, routerRes) {
    if (req.query.key === process.env.CLIENT_API_KEY) {
        let options = {
            url: 'https://apis.sktelecom.com/v1/baas/data/Spot',
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "TDCProjectKey": process.env.BAAS_API_KEY,
                "Content-Type": "application/json;charset=utf-8"
            }
        };
        request(options, function (err, res, body) {
            return routerRes.status(200).json(JSON.parse(body));
        });
    }
    else {
        return routerRes.status(200).json({result: "KEY 값을 확인 해 주세요"});
    }
});

Router.get("/delete-image", function (req, resRouter) {
    if (req.query.key === process.env.CLIENT_API_KEY) {
        let options = {
            url: 'https://apis.sktelecom.com/v1/baas/data/Test/' + req.query.id,
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "TDCProjectKey": process.env.BAAS_API_KEY,
                "Content-Type": "application/json;charset=utf-8"
            }
        };
        request(options, function (err, res, body) {
            return resRouter.status(200).json(JSON.parse(body));
        });
    }
    else {
        return resRouter.status(200).json({result: "KEY 값을 확인 해 주세요"});
    }
});

module.exports = Router;