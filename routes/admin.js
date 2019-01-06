var express = require('express');
var router = express.Router();
const adminModel = require("../models/adminModel.js");

/*
 *  Hash the password or just check versuse
 *  the database? When does the pass get hashed?
 */

// retrieve admin user and check pass
router.get('/', (req, res) => {
    let name = req.body.name;
    let pass = req.body.pass;

    adminModel.getAdminUser(name)
        .then(response => {
          console.log('get admin route:', response)
          if (response.status === 200 && response.pass === pass) {
          res.status(200).send(JSON.stringify(name));
          return res.redirect('http://localhost:8000/admin');
        } else {
            let message = 'Login Failed - Please Try Again'
            res.status(401).send(JSON.stringify(message))
            return res.redirect('http:localhost:8000/')
        }
        })
        .catch(err => {
          console.log("admin route err:", err)
           next(err); 
        })
});

module.exports = router;