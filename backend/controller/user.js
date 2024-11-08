const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({ message: "User Fetched", data: users });
    } catch (error) {
        res.status(500).send({ message: "error", error: error });
    }
};

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).send({ message: "user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            status: true,
            role: "initiator",
        });

        await user.save();
        return res.status(201).send({ message: "User Created", data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "error", error: error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).send({ message: "Invalid Password" });
        }

        const token = jwt.sign(
            { role: user.role, email: user.email, name: user.name, _id: user._id },
            "your_jwt_secret_key",
            { expiresIn: "10h" }
        );
        res.status(200).send({
            message: "User LoggedIn",
            data: user,
            token: token,
            role: user.role,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "error" });
    }
};