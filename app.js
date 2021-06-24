const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database')
const app = express();
const expenseRouts = require('./routs/expense');
const userRouts = require('./routs/user');

const user = require('./models/user');
const expense = require('./models/expense');
const month = require('./models/monthly');
const year = require('./models/yearly');
const order = require('./models/order'); 

console.log(user);

// cors error occurred when we call request from different port like axios from frontend
// so we have to use it
var cors = require('cors');
app.use(cors());


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()); // it is important to post the json response from axios post

sequelize.authenticate().then(() => console.log('database run'))
.catch(err => console.log(err));

user.hasMany(expense);  
expense.belongsTo(user);

user.hasMany(month);
month.belongsTo(user);
month.hasMany(expense);
expense.belongsTo(month);

user.hasMany(year);
year.belongsTo(user);
year.hasMany(month);
month.belongsTo(year);

user.hasMany(order);
order.belongsTo(user);
// using expense routes
// app.use((req,res,next) => {
//     user.findByPk(1)
//     .then(User => {
//         req.user.id = User.id;
//         console.log('pppppppppppppppppp', req.user.id)
//     })
//     next();
// })
sequelize.sync() // trial adding data
.then(() => {
    app.use(expenseRouts);
    app.use(userRouts);
}).then(() => {
    console.log('edit the database')
})
.catch(() => console.log('database not connected'))

app.listen(3000)