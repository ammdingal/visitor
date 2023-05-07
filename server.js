let express = require("express");
let app = express();
let session = require("express-session");

app.use(session({
    secret: 'cutie',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(express.static(__dirname + '/static'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    let count = req.session.count || 0;
    count++;
    req.session.count = count;
    res.render('index', { count: count });
});

app.get('/reset', function(req, res){
    req.session.count = 0;
    res.redirect('/');
})

app.get('/repeat', function(req, res){
    const count = req.session.count || 0;
    req.session.count = count;
    res.render('index', { count });
})

app.listen(8000, function(req, res){
    console.log('listening on port 8000');
});