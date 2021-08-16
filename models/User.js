const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    avatar: {
        type: String
    },
    cellphone: {
        type: String
    },
    firstNames: {
        type: String
    },
    lastNames: {
        type: String
    },
    houseNumber: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    birthDate: {
        type: String
    },
    phone: {
        type: String
    },
    principalAddress: {
        type: String
    },
    secondaryAddress: {
        type: String
    },
    otherReferences: {
        type: String,
    },
    location: {
        latitude: {
            type: String,
        },
        latitudeDelta: {
            type: String,
        },
        longitude: {
            type: String,
        },
        longitudeDelta: {
            type: String,
        },
    }
})

module.exports = model('User', UserSchema)
