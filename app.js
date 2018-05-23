const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const lovskaDruzinaRouter = require('./routes/lovskaDruzina');
const clanRouter = require('./routes/clan');
const porociloRouter = require('./routes/porocilo');
const aktivnostRouter = require('./routes/aktivnost');
const koordinatePodrocjaRouter = require('./routes/koordinatePodrocja');
const saveImage = require('./routes/saveImage');



let express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});

app.set('views', __dirname + '/views');
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./controllers'));
app.use('/lovske_druzine', lovskaDruzinaRouter);
app.use('/clani', clanRouter);
app.use('/porocila', porociloRouter);
app.use('/aktivnosti', aktivnostRouter);
app.use('/koordinatePodrocja', koordinatePodrocjaRouter);
app.use('/saveImage', saveImage);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});

app.listen(port, function() {
  console.log('Listening on port ' + port)
});