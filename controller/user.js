const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');
const orders = require('../models/order');
// it is necessary to require dotenv data
require('dotenv').config();

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
        return res.json({message:"401"});
    }
    const u = await user.create({
        name: req.body.name,
        email: email,
        password: await bcrypt.hash(password,12)
    });

    res.json({userId: u.id});
}

exports.postLogin = async function(req,res,next) {
    const email = req.body.email;
    const password = req.body.password;
   
    const USER = await user.findOne({where: {email: email}});
    console.log(USER,'dsadjddjshajdds')
    if(!USER) { return res.status(401).json({message:"not found"}); }
    
    const match = await bcrypt.compare(password,USER.password)
    if(match) {
        const token = await jwt.sign({id: USER.id, email: email},process.env.ACCESS_TOKEN_SECRET);
        console.log(token,'dyhasgdyhsadhas')
        res.status(201).json({jwtToken: token});
    }
    else { res.status(401),json({data: 'not found'})}
}



exports.premium = (req,res,next) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.RazorPAy_ID,
            key_secret: process.env.RazorPay_Secret_key
        });

        const amount = 10000;

        rzp.orders.create({amount, currency: "INR"}, (err,order) => {
            if(err){ throw new Error(err) };

            req.user.createOrder({orderId: order.id, status: 'PENDING'})
            .then(() => { return res.status(201).json({order,keyId: rzp.key_id}) })
            .catch(() => {throw new Error(err)})
        })
      
    } catch (error) {
        console.log(error);
        res.status(403).json({message: 'something went wrong',error: error})
    }
}





exports.authenticated = async(req,res,next) => {
    try {
        const token = await req.header("Authorization");
        console.log(token,'thisdsjakhdkjsadkjdksjdjksadjksadsadasddas');
        const userId = (jwt.verify(token,process.env.ACCESS_TOKEN_SECRET));
        console.log(userId.id,'hdjashdjasdjsajkdaskldjklasdjlkasdjklasdjlaskdasd');
        user.findByPk(userId.id).then(user => {
            console.log(JSON.stringify(user));
            req.user = user;
            next();
        })
        .catch(err =>{ throw new Error(err); })
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({success: false});
    }
}

exports.update = (req,res,next) => {
    try {
        const {order_id,payment_id} = req.body
        console.log('hii', req.body.order_id, req.body.payment_id, req.header("Authorization"));
        orders.findOne({where: {orderId: order_id}}).then((order) => {
            const userId = order.userId;
            user.findByPk(userId).then(usr => {
                usr.update({isPremium: true});
            }).catch(err => {throw new Error(err)});
            order.update({paymentId: payment_id, status: 'SUCCESSFUL'}).then(() => {
                res.status(202).json({success: true});
            }).catch(err => {throw new Error(err)})
        }).catch(err => {throw new Error(err)})

    } catch (error) {
        console.log(error);
        res.status(404).json({error: error,message: 'something went wrong'})
    }
}