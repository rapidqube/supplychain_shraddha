'use strict';

var express = require('express');
var router = express.Router();
var cors = require('cors');
var bodyParser = require('body-parser');
var bcSdk = require('../query');
var user = 'dhananjay.p';
var affiliation = 'supplychain';
var requestid = "requestid";


exports.readRequest = (params) => {
    return new Promise((resolve, reject) => {
        
        bcSdk.readRequest({
            user :user,
            requestid: requestid 
        })

        .then((requestArray) => {
            console.log("data in requestArray " + requestArray)

            return resolve({
                status: 201,
                query: requestArray
            })
        })

        .catch(err => {

            if (err.code == 11000) {

                return reject({
                    status: 409,
                    message: 'cant fetch !'
                });

            } else {
                console.log("error occurred" + err);

                return reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });
            }
        })
    })
};