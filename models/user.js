const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { bcrypt } = require('../helpers')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        validate: [
            {
                validator: function (val) {
                    return mongoose.model('Users', userSchema).find({
                        _id: {
                            $ne: this._id
                        },
                        name: val
                    })
                        .then(data => {
                            if (data.length !== 0) {
                                return false
                            }
                        })
                        .catch(err => {
                            return err.message
                        })
                },
                message: 'Name has been used'
            }
        ],
        minlength: [5, 'Name must to have 5 characters as minimum']
    },
    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User