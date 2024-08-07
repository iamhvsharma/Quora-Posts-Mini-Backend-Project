const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')

 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))



app.set("view engine",  "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Setting up middlewares to parse the data coming from post request
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// PORT number
const port = 3000;

// Server is listening at port 3000
app.listen(port, (req, res) => {
    console.log(`Listening at port ${port}`);
    
})

// Server is serving 
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Quora mini Project</h1>")
})

// We don't have Database right now so we are using array of objects to store the post data
let posts = [
    {   
        id: uuidv4(), 
        username: "harshvardhan",
        content: "I love coding"
    },
    {   
        id: uuidv4(),
        username: "mk016",
        content: "How to improve communication skills?"
    },
    {
        id: uuidv4(),
        username: "kartikmehta",
        content: "UI/UX is future money making skills"
    }
]

console.log(posts[{}])

// Implement: GET /posts -> Restful API

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
})

// Implement: POST /posts -> Restful API

// Create Route => POST         /posts          to add a new post

// We need to 

// -> Serve the form       GET     /posts/new

app.get("/posts/new", (req, res) =>{
    res.render("newPost.ejs")
})

// -> Add the new post     POST    /posts

app.post("/posts", (req, res) => {
    let id = uuidv4();
    let {username, content} = req.body;
    posts.push({id, username, content});

    // res.render("index.ejs", {posts}) // It's working but not a good approach

    // We should use redirect 

    res.redirect("/posts"); // By default it will send a get request

})


// ID based get request
app.get("/posts/:id", (req, res) =>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    
    res.render("show.ejs", { post });
})



// Update API

app.patch("/posts/:id", (req, res) =>{
    
    let { id } = req.params
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);

    res.redirect("/posts")
    
    
})

app.get("/posts/:id/edit", (req, res) => {
let { id } = req.params;
let post = posts.find((p) => id === p.id);
res.render("edit.ejs", { post })


 })


 // Delete API

 app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")
    
 })