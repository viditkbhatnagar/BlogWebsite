var express = require("express");
var router = express.Router();
var Blog = require("../models/blogs");
var middleware = require("../middleware");

//var dotnev = require('dotenv').config()
var multer = require('multer');
var storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
var imageFilter = function(req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter })

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'drctzbyr7',
    api_key: 568782117139368,
    api_secret: "MswQ2UgwyxoksNx_pHQkltMyyvU"
});




//var mongoose = require('mongoose');
//var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
router.get("/", function(req, res) {
    //res.redirect("/blogs");
    res.render("landing");
});


router.get("/blogs", function(req, res) {
    var perPage = 30;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    Blog.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function(err, blogs) {
        Blog.count().exec(function(err, count) {
            if (err) {
                console.log("ERROR!");
            } else {
                res.render("index", {
                    blogs: blogs,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
});

//NEW ROUTE
router.get("/blogs/new", function(req, res) {

    res.render("new");
});

//NEW ROUTE
router.get("/blogs/photo", function(req, res) {
    res.render("show");
});




//CREATE ROUTE
router.post("/blogs", upload.single('image'), function(req, res) {


    Blog.create(req.body.blog, function(err, blog) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('back');
        }
        res.redirect('/blogs');
    });
});






//DELETE ROUTE
router.delete("/blogs/:id", middleware.checkBlogOwnership, function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.redirect("/blogs");
            } else {
                res.redirect("/blogs");
            }
        })
        //redirect somewhere
});



//EDIT ROUTE
router.get("/blogs/edit", function(req, res) {
    res.render("edit");

});



//UPDATE ROUTE
router.put("/blogs/:id", function(req, res) {

    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});


// Blog Like Route
router.post("/blogs/:id/like", middleware.isLoggedIn, function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            console.log(err);
            return res.redirect("/blogs");
        }

        // check if req.user._id exists in foundCampground.likes
        var foundUserLike = foundBlog.likes.some(function(like) {
            return like.equals(req.user._id);
        });

        if (foundUserLike) {
            // user already liked, removing like
            foundBlog.likes.pull(req.user._id);
        } else {
            // adding the new user like
            foundBlog.likes.push(req.user);
        }

        foundBlog.save(function(err) {
            if (err) {
                console.log(err);
                return res.redirect("/blogs");
            }
            return res.redirect("/blogs/" + foundBlog._id);
        });
    });
});




module.exports = router;