const { v4: uuidv4 } = require('uuid');
const User = require("../models/User");

exports.getLogin = (req, res) => {
    if(req.session.authorised)
        res.status(200).redirect("/product");
    res.status(200).render('login', { user: null });
}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    console.log(user);
    if (user) {
        if (user.user_password == password) {
            req.session.authorised = true;
            req.session.user = {
                id: user.user_id,
                name: user.user_name,
                email: user.user_email,
                role: user.user_role,
            }
            console.log(req.session.user);
            res.status(200).redirect("/product");
        } else {
            console.log('Wrong password');
            res.status(401).render('login');
        }
    } else {
        console.log('User not found');
        res.status(401).render('login');
    }
}

exports.getSignup = (req, res) => {
    if (req.session.authorised)
        res.status(200).redirect("/product");
    res.status(200).render('signup', { user: null });
}

exports.postSignup = async (req, res) => {
    const { name, email, password, role } = req.body;
    const id = uuidv4().slice(0, 16);
    const newUser = new User({ id, name, email, password, role });
    const { userSave, authSave } = await newUser.save();
    if (userSave[0].affectedRows == 1 && authSave[0].affectedRows == 1) {
        req.session.authorised = true;
        req.session.user = {
           id,
           name, 
           email,
           role,
        }
        res.status(201).redirect("/product");
    }
}

exports.getLogout = (req, res) => {
    req.session.destroy((err) => res.redirect("/"));
}
