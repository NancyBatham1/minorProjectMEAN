import bcrypt from "bcryptjs";
import User from '../db/models/user.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {

    try {
        console.log(req.body);
        const { firstName, lastName, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const createResponse = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: hashPassword
        });

        if (createResponse) {
            return res.status(200).json({
                status: true,
                message: "User created successfully"
            })
        }

    } catch (error) {
        console.error(error, "catch error");
        return res.status(500).json({
            status: false,
            message: 'something went wrong'
        })
    }
}

export const login = async (req, res) => {

    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(400).json({
                status: false,
                message: `User ${email} not found`
            })
        }

        const matchpass = await bcrypt.compare(password, user.password);

        if (!matchpass) {
            return res.status(400).json({
                status: false,
                message: `invalid credentials`
            })
        }

        const token = jwt.sign({ useremail: user.email, userid: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });///user is obj from DB

        return res.status(200).json({
            status: true,
            message: "Logged in successfully",
            data: token
        })


    } catch (error) {
        console.error(error, "catch error");
        return res.status(500).json({
            status: false,
            message: 'something went wrong'
        })
    }
}
