import bcrypt from "bcrypt";
import jwt from "../lib/jwt.js";
import User from '../models/User.js';

const authService = {
    async register(username, email, password, rePassword) {
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (password !== rePassword) {
            throw new Error('Password miss match!');
        }
        if (user) {
            throw new Error('User already exists!');
        }

        const newUser = await User.create({
            username,
            email,
            password
        })

        return this.generateToken(newUser);
    },

    async login(username, password) {
        // get user from database
        const user = await User.findOne({ username });

        // throw error if user didn't exist
        if (!user) {
            throw new Error('Invalid username or password!');
        }
        // check password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid username or password!')
        }

        return this.generateToken(user);
    },
    // generate token
    async generateToken(user) {
        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username,
        };
        const header = { expiresIn: '2h', };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, header)
        // return token
        return token;
    }

}

export default authService;


