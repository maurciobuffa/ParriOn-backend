/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { createUser, login, validateToken } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')

router.post(
  '/register',
  [
    // check('name', 'name is required')
    //   .not()
    //   .isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'Password needs at least 6 characters').isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
)

router.post(
  '/',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'Password needs at least 6 characters').isLength({
      min: 6,
    }),
    validateFields,
  ],
  login
)

router.get('/renew', validateJWT, validateToken)

module.exports = router
