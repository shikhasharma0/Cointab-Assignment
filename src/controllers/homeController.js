const homemodel = require("../models/homeModel");
const Validation = require("../validations/validation");
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")


const UserLogout = async function (req, res) {
    try {

        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
           res
                .status(400)
                .send({
                    status: false,
                    msg: "Invalid request parameters. Please provide user Details",
                });
            return
        }

        
    } catch (error) {

        return res.status(500).send({ status: false, msg: error.message });
    
    }
}