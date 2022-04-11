const express = require('express');
const router = new express.Router();

const bodyPraser = require('body-parser');


const notification = require('./notification');


router.use((req,res,next)=>{
    console.log("main api routing call hitted!!!");
    next();
})

/**
 * APIS
 */

router.use('/notification',notification);

module.exports = router;