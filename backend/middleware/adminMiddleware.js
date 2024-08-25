const { User } = require('../model/User.model');

const adminMiddleware = async (req, res, next) => {
    try {
        // Assuming the email is passed in the request headers or body
        const email = req.headers.email || req.body.email;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (user && user.role === 'admin') {
            // Proceed to the next middleware or route handler
            next();
        } else {
            res.status(403).json({ message: 'Access denied. Only admins can access this route.' });
        }
    } catch (err) {
        console.error('Error in adminMiddleware:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = adminMiddleware;
