const User = require("../models/user")

exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;
  
    User.create({
        name : name,
        email : email,
        phone : phone,
        message : message
    })
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      })
  };