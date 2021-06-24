const user = require('../models/user');
const expe = require('../models/expense')
const db = require('../util/database');
const monthly = require('../models/monthly');
const year = require('../models/yearly');
const expense = require('../models/expense');
const Sequelize  = require('sequelize');

// const monthly = require('../models/monthly');
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

exports.postData =async function(req,res,next) {
    console.log('response of the post data is')
    // json file can only be excess when you use body-parser.json in app.js
    console.log(req.body);
    const data = req.body
    let exp =0,inc =0;
    if(data.type =="E") { exp =data.value; }
    else { inc = data.value; }
    
    const cat = data.cat;
  console.log(cat,'djsdhsjadjsdhjsdjsjsdjksd')
  const id = req.user.id;
    const d = new Date;
    const m = d.getMonth() + 1;
    var date;
    if(m <=9) { date = d.getFullYear() + "-0"+  m;}
    else { date = d.getFullYear() + "-"+  m;}
    console.log(date);
    // check if same month and year is present or not if present then update the amount
    // else create a new column of new month and year
    var yearly= await year.findOne({
        where: {year: d.getFullYear(), month: date,userId: id}
    })
    if(!yearly) {
        yearly = await year.create({
            year: d.getFullYear(),
            month: date,
            Expense: exp,
            Income: inc,
            userId: id
        })
    }
    else {
        yearly.Expense += exp
        yearly.Income += inc
        yearly.save()
    }
    
     var result = await monthly.findOne ({
        where: {pp: d,userId: id}
        })
        if(result) { // update
            result.TotalExpense += exp;
            result.TotalIncome += inc;
            result.date = date;
            result.pp = d;
            result.save();
        }
        else { // create
           result = await monthly.create({
                    TotalIncome: inc,
                    TotalExpense: exp,
                    date: date,
                    pp: d,
                    userId: id,
                    yearId: yearly.id
            }).catch(err => console.log(err))
        }

        expe.create({
            type: data.type,
            catagory: data.cat,
            value: data.value,
            description: data.description,
            userId: id,
            monthId: result.id
        }).catch(err => console.log(err))
}

exports.getMonth = async function (req,res,next) {
    const date = req.params.month;

   const month = await monthly.findAll({
       where:{ date: date}
   });
   
   if(month.length >0) {
    //    const daily = await expense.findAll({
    //        where: {monthId: month.id}
    //    })
    //     console.log(daily);
    //    res.json({data: daily});
    // console.log(month[0].dataValues);
    res.json({month: month})
   }
   else {console.log(month) 
       res.json({month: 'not'})}
}


exports.getYear = async (req,res,next) => {
     const data = req.params.year;
     console.log(parseInt(data));
     const yea = await year.findAll({
         where: {year: parseInt(data)}
     });

     if(yea.length>0) {
        //   const months = await monthly.findAll({
        //       where: {yearId: yea.id}
        //   })

        //   console.log(months);
          res.json({year: yea });
     }
     else { res.json({year: 'not'})}
}

exports.getDay = async(req,res,next) => {
    console.log(req.user.isPremium);
    if(req.user.isPremium != true) { return res.status(401).json({date: 'not premium'}); }
    const day = req.params.date;
    console.log(day);

    const month = await monthly.findOne({where: {pp: day}});
    if(!month) { return  res.status(200).json({date: 'not'}); }
    console.log(month.id);

    const date = await expense.findAll({where:{monthId: month.id}});
    if(!date) { return  res.status(200).json({date: 'not'}); }
    console.log(date);
    // const max = await monthly.findOne({
    //         attributes: [Sequelize.fn('max',Sequelize.col('TotalIncome'))],
    //         raw: true
    // })
    // console.log(max);
    res.json({date})
}



exports.getMax =  async(req,res,next) => {
    try {
        const id = req.user.id;
        monthly.findAll({
            where: {userId: id},
            attributes: [Sequelize.fn('max',Sequelize.col('TotalIncome'))],
                raw: true
        }).then(max => {
            console.log(max);
            res.status(200).json({max:max})
        })
        
    } catch (error) {
        console.log(error);
    }
}