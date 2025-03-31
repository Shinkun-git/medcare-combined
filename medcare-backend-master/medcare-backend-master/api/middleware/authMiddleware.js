import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        // console.log("authenticating user token---> ",token?.slice(-5));
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token" });
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }
            req.user = decoded; // Attach user data to request
            next();
        });
    } catch (error) {
        res.status(500).json({ message: "Authentication error" });
    }
};
