import bcrypt from "bcryptjs";
import User from '../db/models/user.model.js';
import Employee from "../db/models/employee.model.js";
import Organization from "../db/models/organization.model.js";
import Modules from "../db/models/module.model.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {

    try {
        console.log(req.body);
        const { firstName, lastName, email, password, role, is_active, organization_id, is_delete } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const ifSuperAdmin = await User.count({where:{role:'super_admin'}})

        if(ifSuperAdmin>0 && role == 'super_admin'){
            return res.status(500).json({
                status: false,
                message: 'super admin already exists'
            })
        }
        const createResponse = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: hashPassword,
            role: role, 
            is_active: is_active,
            organization_id: organization_id,
            is_delete: is_delete
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

        const token = jwt.sign({ useremail: user.email, userid: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });///user is obj from DB

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
