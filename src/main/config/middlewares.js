const express = require('express');
const bodyParser = require('body-parser');
const contetTypeConfig = require('./contet-type.config');

module.exports = (app) => {
    app.set('view engine', 'jade');

    app.use(express.json());
    app.use(express.urlencoded());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'));


    app.use(contetTypeConfig);
}