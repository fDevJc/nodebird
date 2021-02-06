const express = require('express'); //express server
//const cookieParser = require('cookie-parser');
const morgan = require('morgan'); //log
//const path = require('path');
//const session = require('express-session');
//const nunjucks = require('nunjucks');
//const dotenv = require('dotenv');

const app = express();

app.set('port',process.env.PORT || 8080);
app.set('view engine', 'html');

app.use(morgan('dev'));

app.get('/',(req,res)=>{
	res.send('Hello Express');			
});

app.listen(app.get('port'),()=>{
	console.log(app.get("port"), 'port server running.....');
});

