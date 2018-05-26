const morgan = require('morgan');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const lovskaDruzinaRouter = require('./routes/lovskaDruzina');
const clanRouter = require('./routes/clan');
const porociloRouter = require('./routes/porocilo');
const aktivnostRouter = require('./routes/aktivnost');
const koordinatePodrocjaRouter = require('./routes/koordinatePodrocja');
require('./passport/passport')(passport);

let express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./controllers'));
app.use('/lovske_druzine', lovskaDruzinaRouter);
app.use('/clani', clanRouter);
app.use('/porocila', porociloRouter);
app.use('/aktivnosti', aktivnostRouter);
app.use('/koordinatePodrocja', koordinatePodrocjaRouter);
//app.use('/auth', authRoutes)(app, passport);

app.post('/signup', passport.authenticate('local-signup'),
    function (req, res) {
        res.status(200).json(req.user);
    });

app.post('/signin', passport.authenticate('local-signin'),
    function(req, res){
        res.status(200).json(req.user);
    }
);

app.listen(port, function() {
    console.log('Listening on port ' + port)
});