const loginmodel = require("../models/loginModel");
const Validation = require("../validations/validation");
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

  
  const isValidRequestBody = function (requestbody) {
    return Object.keys(requestbody).length > 0;
  };

const UserCreate = async function (req, res) {
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

        if (!Validation.isValid(requestBody.username)) {
            return res.status(400).send({ status: false, message: 'username is required!' })
        };

        if (!Validation.isValid(requestBody.age)) {
            return res.status(400).send({ status: false, message: 'age is required!' })
        };


        if (!Validation.isValid(requestBody.phone)) {
            return res.status(400).send({ status: false, message: 'Phone no. is required!' })
        };

        if (!/^[0-9]\d{9}$/gi.test(requestBody.phone)) {
            res
                .status(400)
                .send({
                    status: false,
                    message: `provide 10 digits Mobile Number`,
                });
            return;
        }
        
        let Userdata = await loginmodel.create(requestBody)
       return res.status(201).send({ status: true, message: 'New details created successfully.', data: Userdata });
     // console.log({ status: true, data: Userdata });

 } catch (error) {

    return res.status(500).send({ status: false, msg: error.message });

 }


}

const LoginCreate = async function (req, res) {
    try {
        const requestBody = req.body;

        if (!Validation.isValidRequestBody(requestBody))

            return res.status(400).send({ status: false, message: 'Invalid request body. Please provide login details.' });

        if (!Validation.isValidEmail(requestBody.email))

            return res.status(400).send({ status: false, message: 'E-Mail is required.' });
            
        let existemail = await loginmodel.findOne({ email: requestBody.email})
        if (existemail)
           return res.status(400).send({ status: false, message: 'Email is already exist!' })


        if (!Validation.isValid(requestBody.password))

            return res.status(400).send({ status: false, message: 'Password is required.' });


        const user = await loginmodel.findOne({ email: requestBody.email, password: requestBody.password });
        if (!user)

            return res.status(400).send({ status: false, msg: "Invalid login credentials!" });
            const userPass = 'Password123'

            let inputPass = prompt('Please enter your password:')
            let counter = 1
            const MAX_ATTEMPS = 5
            
            while (inputPass != userPass) {
              if (counter < 5) inputPass = prompt('Please enter your password:')
              else {
                alert('Account has been blocked')
                break
              }
            
              counter++
            }
            
            counter = 1
            
            console.log('Thank you for providing the right password!')
        let token = jwt.sign(
            {
                userId: user._id.toString(),
                batch: "Uranium",
                organisation: "FUnctionUp",
            },
            "group-50",
            {
                expiresIn: '24h'
            }
        );
        // res.header('x-api-key', token);
        res.status(201).send({ status: true, msg: " New Login Successfull !", token: token });
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
};
module.exports.UserCreate = UserCreate
module.exports.LoginCreate= LoginCreate



