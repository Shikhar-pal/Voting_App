const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    // first check if the Authorization header is present
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    //  Extract the token from the Authorization header
    const token =req.headers.authorization.split(' ')[1]; // Assuming the header is in the format "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Proceed to the next middleware or route handler
    }catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}


// function to generate a JWT token for a user
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
} 



module.exports = {jwtAuthMiddleware, generateToken};