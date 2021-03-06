const express = require('express'); //express server
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); //log
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const testRouter = require('./routes/test');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
passportConfig();

app.set('port', process.env.PORT || 8082);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database connect success');
  })
  .catch((err) => {
    console.log('DB connect error : ', err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', postRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  console.error(error);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log('>>>>>>>app/err : ', err);
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'prodcution' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'port server running.....');
});
