const user = require('../models/user');
const bcrypt = require('bcryptjs');


exports.getUser = (req,res,next) => {
   
    user.create({
        name: "jay",
        email: "jay12@gmail.com"
    }).then((User) => {
        res.json({id: User.id});
        // added the value to front end then use send the value to backend
        // get the value from front end then add it to expense foreign key database
    })
}

exports.postSingUp = async function(req,res,next) {
    const email = req.body.email;
    const password =  req.body.password;

    const USER = await user.findOne({ where: {email, email}});
    if(USER) {
        return res.json({err: 'user already exist'});
    }
    const u = await user.create({
        name: req.body.name,
        email: email,
        passWord: await bcrypt.hash(password,12)
    });

    console.log('user created and id is', u.id);
}