var express = require("express");
var router = express.Router({ mergeParams: true });
var Blog = require("../models/blogs");
var Comment = require("../models/comment");
var middleware = require("../middleware");



//COMMENTS ROUTES
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { blog: blog });
        }
    })
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if (err) {
            req.flash("error", "Something went wrong");
            console.log(err);
            res.redirect("/blogs");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {

                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    blog.comments.push(comment);
                    blog.save();
                    console.log(comment);
                    req.flash("success", "Successfully comment added");
                    res.redirect('/blogs/' + blog._id);
                }
            });
        }
    });
});


//Comments EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", { blog_id: req.params.id, comment: foundComment });
        }
    });

});

//COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");

        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//COMMENT DESTROY ROUTES
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findOneAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blogs/" + req.params.id)
        }
    });
});



module.exports = router;