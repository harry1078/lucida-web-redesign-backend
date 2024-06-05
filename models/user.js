const Sequelize = require("sequelize")
const sequelize = require("../util/database")

const User = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNULL: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNULL: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Name is required"
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNULL: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Email-id required"
            },
            isEmail: {
                args: true,
                msg: 'Valid email-id required'
            }
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
    },
    phone: {
        type: Sequelize.STRING,
        allowNULL: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Phone number required"
            },
            isNumeric: {
                args: true,
                msg: "Please enter a number"
            },
            checkLength(value) {
                if (value.length < 10) {
                    throw new Error("Please enter valid number");
                }
                else if (value.length > 10) {
                    throw new Error("Please enter valid number");
                }
            }
        },
        unique: {
            args: true,
            msg: 'phone number already in use!'
        }
    },
    message: {
        type: Sequelize.STRING,
        allowNULL: false
    },
})

module.exports = User