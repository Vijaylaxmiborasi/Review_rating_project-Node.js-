const bcrypt = require("bcrypt")
const userSchema = require('../models/userModelSchema')
const jwt = require("jsonwebtoken")
const { transporter } = require('../service/emailService')

//user signup
const signup = async (req, res) => {
    const userData = new userSchema(req.body)
    const isEmailExists = await userSchema.findOne({
        userEmail: req.body.userEmail,
    });
    if (isEmailExists) {
        return res.status(409).json({
            success : "failure",
            message: "User with this email is already exists",
        })
    } else {
        try {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(req.body.password, salt);
            const filePath = `/upload/${req.file.filename}`;
            userData.profilepic = filePath;
            await userData.save();
            res.status(201).json({
                success: "success",
                message: "User created successfully",
            })
        }
        catch(err) {
            res.status(400).json({
                success: "Failure",
                message: "Error occur" + err.message
            })
        }
    }
}

//user Login
const logIn = async (req, res
) => {
    try {
        const { userEmail, password } = req.body;
        if (userEmail && password) {
            const userData = await userSchema.findOne({ userEmail: userEmail });
            if (userData != null) {
                const isMatch = await bcrypt.compare(password, userData.password);
                if (userData.userEmail === userEmail && isMatch) {
                    //Generate jwt
                    const token = jwt.sign({ userId: userData._id },
                        process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                    return res.status(200).send({
                        success: "success",
                        message: "Login Success",
                        "userDetail": userData,
                        token: token,
                    });
                } else {
                    res.status(401).send({
                        success: 'failure',
                        message: 'Invalid credentials.'
                    });
                }
            } 
        }

    } catch (err) {
        console.log(err);

    }
}

//send email and reset password
const sendUserResetPasswordEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const isEmailExist = await userSchema.findOne({ email: email });
        if (isEmailExist != null) {
            const secret = isEmailExist._id + process.env.JWT_SECRET_KEY;
            const token = await jwt.sign({ userID: isEmailExist._id }, secret, {
                expiresIn: "5d"
            });

            const link = `http://127.0.0.1.3000/api/user/reset/${isEmailExist._id}/${token}`;
                await transporter.sendMail({
                from: "borasivijaylaxmi2000@gmail.com",
                to: "vijaylaxmiborasi1526@gmail.com",
                subject: "For Reset Your Password",
                html: `<a href=${link}>Click on this for reset password, else the link  will expire in 5 days</a>`,
            });
            return res.status(201).json({
                success: "success",
                message: "Email sent Succcesfully",
                token: token,
                userID: isEmailExist._id,
            });
        } else {
            res.status(550).json({
                success: "failure",
                message: "Email with this user is not found."
            });
            
        }
    } catch (err) {
        res.status(500).json({
            success: "failure",
            message: "Error occured "+err.message,
        });
    }
};

//User Reset password ApI
const userPasswordReset = async (req, res) => {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    try {
        const checkUser = await userSchema.findById(id);
        if (checkUser != null) {
            const secretKey = checkUser._id + process.env.JWT_SECRET_KEY;
            jwt.verify(token, secretKey);
            if (newPassword === confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(confirmPassword, salt);
                await userSchema.findByIdAndUpdate(checkUser._id, {
                    $set: { password: password },
                });
                res.status(200).json({
                    success: "success",
                    message: "Password updated successfully",
                });
            } else {
                res.status(403).json({
                    success: "failure",
                    message: "Password and confirm password does not match",
                });
            }
        } else {
            res.status(401).json({
                success: "failure",
                message: "Unauthorised user."
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: "failure",
            message:'error occured '+ err.message,
        });
    }
};

module.exports = {
    signup,
    logIn,
    sendUserResetPasswordEmail,
    userPasswordReset,
}
