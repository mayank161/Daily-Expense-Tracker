const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database')
const app = express();
const expense = require('./models/expense') 
const expenseRouts = require('./routs/expense');
const userRouts = require('./routs/user');

const user = require('./models/user')
const expe = require('./models/expense')
// cors error occurred when we call request from different port like axios from frontend
// so we have to use it
var cors = require('cors')
app.use(cors());


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()); // it is important to post the json response from axios post

sequelize.authenticate().then(() => console.log('database run'))
.catch(err => console.log(err));

user.hasMany(expense);  
expense.belongsTo(user);
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
}).then(() => console.log('edit the database'))

app.listen(3000)