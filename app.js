const express= require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
var port=process.env.PORT || 3000;
const app = express();
const {indexRouterPage} = require('./routes/index');
const {blogRouterPage,addblogPage,addblogdata,viewblogPage,commentblog} = require('./routes/blog');
const {loginRouterPage,regisRouter,logRouter,logoutRouter} = require('./routes/login');
const {adminRouterPage} = require('./routes/admin');
const {studyRouterPage,addStudyPage,addStudy} = require('./routes/studyPage');
//const port = 3000;

/*const db = mysql.createConnection({
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b782c7fb7f73e1',
    password: '248d905b',
    database: 'heroku_89925aedaf7b102'
});*/

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webblogDB'
});

db.connect((err => {
    if (err) {
        throw err;
    }
    console.log('Connected to database successfully')
}));

global.db = db;

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//view engine setup
//app.set('port',process.env.port || port );
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.use(fileUpload());

app.get('/',indexRouterPage);
app.get('/blog', blogRouterPage);
app.get('/blog/add',addblogPage);
app.get('/blog/:id',viewblogPage);
app.post('/blog/add/datainput',addblogdata);
app.post('/blog/:id',commentblog);
app.get('/login', loginRouterPage);
app.post('/login/regis', regisRouter);
app.post('/login/log', logRouter);
app.get('/login/logout',logoutRouter);
app.get('/admin',adminRouterPage);
app.get('/study',studyRouterPage);
app.get('/study/addstudy',addStudyPage);
app.post('/study/addstudy',addStudy);

app.listen(port,()=> {
    console.log('Server Running')
});