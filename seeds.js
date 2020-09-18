async function seedDB() {
    await Blog.remove({});
    console.log("blogs removed");
    await comment.remove({});
    console.log("comments removed");
    for (var seed of seeds) {
        let blog = await Blog.create(seed);
        console.log("blogs created");
        let comment = await Comment.create({
            text: ' this is a great place',
            author: {
                id: "588c2e092403d111454fff76",
                username: "Jack"
            }
        })
        console.log("comment created");
        blog.comments.push(comment);
        blog.save();
        console.log("comment added to blog");
    }
}
module.exports = seedDB;



/*var mongoose = require("mongoose");
var Blogs = require("./models/blogs");


function seedDB() {
    Blog.remove({}, function(err) {
        if (err) {
            console.log("removed blog");
        }
    });
}
module.exports = seedDB;
*/


/*var mongoose = require("mongoose");
var Blog = require("./models/blogs");
var Comment = require("./models/comment");

var data = [{
            title: "Cloud's Rest",
            image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },


        function seedDB() {
            //Remove all campgrounds
            Blog.remove({}, function(err) {
                if (err) {
                    console.log(err);
                }
                console.log("removed blogs!");
                Comment.remove({}, function(err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("removed comments!");
                    //add a few campgrounds
                    data.forEach(function(seed) {
                        Blog.create(seed, function(err, blog) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("added a blog");
                                //create a comment
                                Comment.create({
                                    text: "This place is great, but I wish there was internet",
                                    author: "Homer"
                                }, function(err, comment) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        blog.comments.push(comment);
                                        blog.save();
                                        console.log("Created new blog");
                                    }
                                });
                            }
                        });
                    });
                });
            });
            //add a few comments
        }
       module.exports = seedDB;
       */

/*var mongoose = require("mongoose");
var Blog = require("./models/blogs");
var Comment = require("./models/comment");

var data = [{
        title: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author: {
            id: "588c2e092403d111454fff76",
            username: "Jack"
        }
    },
    {
        title: "Desert Mesa",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author: {
            id: "588c2e092403d111454fff71",
            username: "Jill"
        }
    },
    {
        title: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author: {
            id: "588c2e092403d111454fff77",
            username: "Jane"
        }
    }
]

function seedDB() {
    //Remove all campgrounds
    Blog.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed blogs!");
        Comment.deleteMany({}, function(err) {
            if (err) {
                console.log(err);
            }
            console.log("removed comments!");
            //add a few campgrounds
            data.forEach(function(seed) {
                Blog.create(seed, function(err, blog) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create({
                            text: "This place is great, but I wish there was internet",
                            author: {
                                id: "588c2e092403d111454fff76",
                                username: "Jack"
                            }
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                blog.comments.push(comment);
                                blog.save();
                                console.log("Created new comment");
                            }
                        });
                    }
                });
            });
        })
    });
    //add a few comments
}

module.exports = seedDB;
*/