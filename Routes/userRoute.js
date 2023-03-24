const express = require('express')
const routes = express.Router();
const userController = require('../controllers/userController')
const validation = require('../validation/user/user_validation')
const auth = require('../middlewares/auth_middleware');
const { upload } = require('../middlewares/imageStorage');
 //const upload = multer()

routes.post('/user_signup',upload.single('profilepic'),validation.registerUserValidation,userController.signup)
routes.post('/user_login', validation.logInUserValidation, userController.logIn)
routes.post('/reset_password', auth.checkUserAuth, userController.sendUserResetPasswordEmail)
routes.post('/change_password/:id/:token', auth.checkUserAuth, userController.userPasswordReset)


module.exports = routes
