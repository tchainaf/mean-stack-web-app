var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    console.log(req.body);
    console.log("userId: " + req.session.userId);
    console.log(req.query);
    request.get(config.apiUrl + '/list/' + req.body.username, 
    function (error, response, body) {
        if (error) {
            return res.render('question', { error: 'An error occurred' });
        }
    });

    res.render('question');
});


module.exports = router;