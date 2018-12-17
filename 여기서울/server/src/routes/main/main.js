const Express = require('express');
const Router = Express.Router();

Router.get("/", function (req, res) {
    res.render("index");
    //return res.status(200).json({state: "working"});
});

module.exports = Router;