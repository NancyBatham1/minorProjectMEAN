import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                status: false,
                message: "No token, authorization denied"
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log('decode ', decode);
            
            req.user = decode;
            console.log("The decoded user is : ", req.user);
            next();
        } catch (error) {
            res.status(400).json({
                status: false,
                message: "Token is not valid"
            });
        }
    } else {
        return res.status(401).json({
            status: false,
            message: "No token, authorization denied"
        });
    }
}

