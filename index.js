require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const posts = [];
let currentId = 1;
 
app.get('/v1/posts', (req, res) => {
    throw new Error('1234');
  res.json(posts);
});

app.get('/v1/posts/:id', (req, res) => {
    const {id} = req.params;

    const post = posts.find(i => {
        return i.id === Number(id);
    });

    if (!post) {
        return res.sendStatus(404);
    }

    return res.json(post);
});

app.put('/v1/posts/:id', (req, res) => {
    const {id} = req.params;

    const  {author, content} = req.body;

    const post = posts.find(i => i.id === Number(id));

    if(!post) {
        return res.sendStatus(404);
    }

    post.author = author;
    post.content = content;

    return res.json(post);
});

app.post('/v1/posts', (req, res) => {
    const {author, content} = req.body;
    const newPost = {author, content, id:currentId++};
    posts.push(newPost);
    return res.json(newPost);
});

app.delete('/v1/posts/:id', (req, res) => {
    const {id} = req.params;

    const postIndex = posts.findIndex(i => i.id === Number(id));

    if (postIndex === -1) {
        return res.sendStatus(404);
    }

    const deletedPost = posts.splice(postIndex, 1);

    return res.json(deletedPost);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
})