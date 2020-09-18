var bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Blog = require("./models/blogs"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    express = require("express"),
    methodOverride = require("method-override");
const { serializeUser } = require("passport");


var commentRoutes = require("./routes/comments"),
    blogRoutes = require("./routes/blog"),
    indexRoutes = require("./routes/index"),
    // multer = require('multer');

    app = express();



//APP CONFIGURATIONS
//mongoose.connect("mongodb://localhost/aeipathy");
//mongoose.connect("mongodb+srv://vidit:MSdhoni1234567@@@aeipathy-orjzn.mongodb.net/test?retryWrites=true&w=majority");
//mongodb+srv://vidit:MSdhoni1234567@@@aeipathy-orjzn.mongodb.net/test?retryWrites=true&w=majority
//mongoose.connect("mongodb+srv://vidit:MSdhoni@@1234567@aeipathy-orjzn.mongodb.net/test");
//mongoose.connect("mongodb+srv://vidit:vidit@aeipathy-orjzn.mongodb.net/test?retryWrites=true&w=majority");
//mongoose.connect("mongodb://localhost/vidit");
//mongoose.connect("mongodb+srv://vidit:vidit@rock-pfakn.mongodb.net/rock?retryWrites=true&w=majority")
//mongoose.connect("mongodb+srv://vidit:vidit@cheshta-j58qo.mongodb.net/vidithr?retryWrites=true&w=majority");
//mongoose.connect("mongodb+srv://vidit:vidit@cheshta-j58qo.mongodb.net/test?retryWrites=true&w=majority");
//mongoose.connect("mongodb+srv://vidit:vidit@cheshta-j58qo.mongodb.net/cheshta?retryWrites=true&w=majority");
//mongoose.connect("mongodb+srv://vidit:vidit@cheshta-j58qo.mongodb.net/new?retryWrites=true&w=majority");
//mongoose.connect("mongodb+srv://vidit:vidit@aeipathy-orjzn.mongodb.net/test?retryWrites=true&w=majority")
mongoose.connect("mongodb+srv://vidit:vidit@vidit.orjzn.mongodb.net/vidit?retryWrites=true&w=majority");
app.set("view engine", "ejs", );

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"))
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: " this is the secrets",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(blogRoutes);
app.use("/blogs/:id/comments", commentRoutes);



var port = process.env.PORT || 3000
app.listen(port, process.env.IP, function() {
    console.log(" SERVER IS RUNNING");
});