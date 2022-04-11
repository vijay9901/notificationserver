
const express = require('express');
const moment = require('moment');
const router = express.Router();
const Company = require('../models/companyModal')
const getDates = require('./getDates').getDates;


const companiesList = async (req, res) => {
    console.log("companiesList hitted!!!")
    try {

        const company = await Company.find({})
        res.status(201).send(company);
    }
    catch (e) {
        res.status(400).send(e)
    }

}

const getCompanyByEntityId = async (req, res) => {
    console.log("getCompanyByEntityId --- ", req.params.id)

    try {
        const _id = req.params.id
        let company = await Company.findById({ _id }, {
            schedule: 1, companyId: 1, _id: 0
        });

        if (!company) {
            return res.status(404).send()
        }
        let { schedule, companyId } = company;
       let count = 0;
        res.send({
            companyId,
            notifications: schedule.map(function (obj) {
                return {
                    senddate:obj,
                    notification:++count
                };
            })
        })
    }
    catch (e) {
        res.status(400).send(e)
    }

}


const companyDetails = async (req, res) => {
    console.log("companyDetails -- ", req.body)
    
    console.log("getdates -- ", getDates(req.body.market))
    try {
        req.body.schedule = getDates(req.body.market)
        req.body.calldate = moment().format('DD/MM/YYYY');
        const company = new Company(req.body)
        const details = await company.save()
        await Company.findByIdAndUpdate(details._id, { "companyId": details._id }, { new: true, runValidators: true })
        res.status(201).send(details);
    }
    catch (e) {
        res.status(400).send(e)
    }

}


router.get('/companies-list', companiesList);

router.post('/company-details', companyDetails);

router.get('/company/:id', getCompanyByEntityId)


module.exports = router;