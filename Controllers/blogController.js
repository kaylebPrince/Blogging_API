const blogModel = require('../Models/blogModel');
const UserModel = require('../Models/UserModel');
const {reading_time} = require("./utilityFile");

const errorHandler = (err) => {
    console.log(err.message, err.code);

    let error = {
        title: "",
        body: ""
    };

    if(err.code === 11000){
        if(err.message.includes("test.blogs index: title_1 duplicate key")){
            error.title = "Title already exists";
            return error;
        }
    }

    if (err.message.includes("blog validation failed")){
        Object.values(err.error).forEach(({props})=>{
            error[props.path] = props.message;
        });
    }
    return error;
}

exports.createBlogPost = async(req, res) => {
    const {title, description, tags, body } = req.body;
    const user = req.user;
    const blogPost = await blogModel.create({
        title,
        description: description || title,
        body,
        author: await user._id,
        reading_time,
        tags    
    });

    console.log("reading time", reading_time)

    res.status(201).json({status: true, blogPost});
    // } catch (err) {
    //     const error = errorHandler(err);
    //     res.status(400).json({status: false, error});
    // }
};

// Get a blog post by id
module.exports.getPost = async(req,res) => {
    try{
        const { id } = req.params;
        const blogPost = await blogModel.findById(id).populate("author", { email:1});
    
        if(blogPost.state !== "published") {
            return res.status(403).json({
                status: false,
                message: "Requested blog post is not published",
            });
        }

        // update the blog read count
        blogPost.read_count += 1;
        await blogPost.save();

        return res.json({
            status:true,
            data: blog
        });
    } catch (err){
        res.status(400).json({status:false, error: "An error occured"});
    }
}

//  Get all published blog posts
module.exports.getPosts = async(req,res) => {
    const { query } = req;
    const {
        auth,
        title,
        tags,
        page = 1,
        reading_time,
        read_count,
        per_page = 20
    } = query;

    // let author;

    // if(auth) {
    //     const user = await UserModel.find({: auth});
        
    //     if(user){
    //         try{
    //             author = user[0]._id;
    //         }catch (err){
    //             res.status(400).json({
    //                 status: "false",
    //                 error: "email does not exist"
    //             });
    //         }
    //     }
    // }


    if(title){
        findQuery.title = title;
    }

    const findQuery = { state: "published"};
    const setQuery = { updatedAt: -1, createdAt: 1};

    // if(author) {
    //     findQuery.author = author;
    // }

    if(tags){
        findQuery.tags = tags;
    }

    if(read_count){
        setQuery.read_count = 1;
    }

    if(reading_time){
        setQuery.reading_time = 1;
    }

    try{
        const blogPosts = await blogModel
        .find(findQuery)
        .populate("author",{
            email: 1
        })
        .sort(setQuery)
        .skip(page * per_page)
        .limit(per_page)

        console.log(blogPosts);
    
        if(blogPosts.length >= 1) {
            console.log("successful");
            res.status(200).json({status: true, blogPosts});
        }else if(blogPosts.length <= 0){
            res.status(404).json({status:true, blogPosts: "no match found"});
        } 
    } catch(err){
        res.status(400).json({error: "An error occured, try again"});
    }
}


module.exports.editPost = async(req, res) => {
    const user = req.user.email;
    try{
        const { id } = req.params;
        const blogPost = await blogModel.findById(id).populate("author", {email: 1});
        const author = blogPost.author.email;
        const blogId = blogPost.id;

        if(user === author){
            const editedPost = await blogModel.findByIdAndUpdate(id,{
                ...req.body,
            });
            res.status(200).json({status: true, message: "blog succcessfully edited", editedPost});
        } else {
            throw new Error("You are not authorized to edit this post");
        }
    } catch(err){
        res.status(401).json({error: "You are not authorized to update this post"});
    }
}

module.exports.deletePost = async(req, res) => {
    const user = req.user.email;
    try{
        const { id } = req.params
        const blogPost = await blogModel.findById(id).populate("author", {email:1});
        const author = blogPost.author.email;

        if(user === author){
            const deleteBlogPost = await blogModel.findByIdAndDelete(id);
            res.status(200).json({
                status: true, message: "Blog post deleted",
            });
        } else {
            throw new Error("You do not have write permission on this post");
        }
    } catch(err){
        res.status(401).json({error:"You are not authorized"});
    }
};

module.exports.userBlogPosts = async(req, res)=>{
    const userId = req.user._id.toString();

    try{
        const { query } = req;
        const { state } = query;

        const page = 0

        const per_page = 20;

        const findQuery = { author: userId};

        if(state){
            findQuery.state = state;
        }

        const blogPosts = await blogModel.find(findQuery)
            .populate("author", { email: 1})
            .sort("asc")
            .skip(page*per_page)
            .limit(per_page);

        if(blogPosts){
            res.status(200).json({status: true, blogPosts});
        } else{
            res.status(200).json({status: true, message: "You have no published blog posts yet"});
        }
    } catch(err){
        res.status(401).json({status:false, err});
    }
};