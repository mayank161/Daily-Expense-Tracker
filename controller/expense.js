const user = require('../models/user');
const expe = require('../models/expense')
const db = require('../util/database')
// exports.addExpense = (req,res) => {
//     data.
// }

exports.getExpense = (req,res,next) => {
    let sumExpense;
    expe.findAll({where: {userId: 1}})
    .then(data =>  {
        console.log(data.length);
        data.forEach(d => {
            console.log(d.dataValues.value)
            sumExpense += d.dataValues.value;
        }).then(() => {console.log(sumExpense)});
    })
    // res.json({id: 1});
    // console.log('hhhhhhhhhhhhhhhh');
}

exports.postData = (req,res,next) => {
    console.log('response of the post data is')
    // json file can only be excess when you use body-parser.json in app.js
    console.log(req.body);
    const d = req.body
    expe.create({
        type: d.type,
        value: d.value,
        description: d.description,
        userId: req.body.id
    });
}