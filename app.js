const express = require('express'); //express server
//const cookieParser = require('cookie-parser');
const morgan = require('morgan'); //log
const path = require('path');
//const session = require('express-session');
const nunjucks = require('nunjucks');
//const dotenv = require('dotenv');

const pageRouter = require('./routes/page');
const testRouter = require('./routes/test');

const app = express();

app.set('port', process.env.PORT || 8080);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', pageRouter);
app.use('/test', testRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'port server running.....');
});
