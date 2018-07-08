import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = await jwt.verify(token, 'mySecretChange');
        req.AdminData = decoded;
        next();
    }
    catch (e) {
        return res.status(401).json({ error: e.message, message: 'Auth failed' });
    }
}