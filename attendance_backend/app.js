const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const cors = require('cors');
const compression = require('compression')

require('dotenv').config();

// const session = require('express-session');

// Khai bao thư viện express 
const app = express();

// khai báo địa chỉ truy cập cho project 
const port = process.env.APP_PORT || 3005;
const host = process.env.APP_HOST || '127.0.0.1';

// Chạy thư viện express đã khai báo thông qua biến app: 

// set up đia chỉ truy cấp cho project 
app.set('port', port);
app.set('host', host);

// set up tính năng đọc file ejs
app.set('views', './view')
app.set('view engine', 'ejs');
app.use(cors());
app.options('*', cors());
// setup compression for increased performance
app.use(compression());
// set up session
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
// }));

// set up tính năng đọc file json 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.raw());
app.use(express.static('public'));
// set up router 

app.use('/',router);


app.listen(app.get('port'), app.get('host'),()=>{
    console.log(`Server is running at http://${host}:${port}`);
    })


// Note: project này sẽ dùng thư viện knex để kết nối db mysql nên sẽ cài thư viện là knex