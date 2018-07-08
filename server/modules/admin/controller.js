import Admin from './model';
import Quote from '../quotes/model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const adminHomePage = async (req, res) => {
    const data = await Quote.find({});
    return res.status(200).json({
        message: 'yay, it works',
        data: data,
        user: req.AdminData
    })
};

export const signUp = async (req, res) => {
    try {
        const checkAdmin = await Admin.findOne({ email: req.body.email });
        if (checkAdmin) {
            return res.status(422).json({ message: 'Admin already exist' })
        }
        else {
            const password = await bcrypt.hash(req.body.password, 10);
            const newAdmin = await new Admin({
                email: req.body.email,
                password: password
            });
            const admin = await newAdmin.save();
            return res.status(200).json(admin);
        }
    }
    catch (e) {
        console.log('Error occured in Signup');
    }
}

export const logIn = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            res.status(401).json({ message: "Login failed" })
        }
        else {
            const match = await bcrypt.compare(req.body.password, admin.password);
            if (match) {
                const token = await jwt.sign({ email: match.email, id: match._id }, 'mySecretChange', { expiresIn: '1h' });
                res.status(200).json(token);
            }
            else {
                res.status(401).json({ message: 'Login failed' });
            }
        }
    }
    catch (e) {
        console.log('Error occured with login')
    }
}

export const deleteQuote = async (req, res) => {
    try {
        let quoteID = req.params.quoteID;
        const deleted = await Quote.deleteOne({ _id: quoteID });
        if (deleted) {
            res.status(200).json({ message: 'Quote deleted' });
        }
    }
    catch (e) {
        res.status(404).json({ message: 'Unable to delete quote' });
    }
}