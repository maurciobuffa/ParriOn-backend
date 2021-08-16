const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generateJWT } = require('../helpers/jwt')

const createUser = async (req, res = response) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'This email address has already been registered'
            })
        }

        user = new User(req.body)

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact to support team'
        })
    }
}

const login = async (req, res = response) => {
    try {
        const { email, password } = req.body

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid User'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid Password'
            })
        }

        const token = await generarJWT(user.id, user.name)


        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact to support team'
        })
    }
}

const validateToken = async (req, res = response) => {
    const { uid, name } = req

    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    createUser,
    login,
    validateToken
}
