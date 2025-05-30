import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const posts = [];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Homepage: show all posts
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// Show form to create new post
app.get("/posts", (req, res) => {
  res.render("posts");
});

// Handle new post submission
app.post("/submit", (req, res) => {
  const newPost = {
    id: Date.now(), // unique id
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
  };
  posts.push(newPost);
  res.redirect("/");
});

// Delete post by ID
app.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  res.redirect("/");
});

// Show edit form for a post
app.get("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (post) {
    res.render("edit", { post });
  } else {
    res.redirect("/");
  }
});

// Handle edit submission
app.post("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (post) {
    post.title = req.body.title;
    post.author = req.body.author;
    post.content = req.body.content;
  }
  res.redirect("/");
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server hosted successfully on ${port}`);
});
