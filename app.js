const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.set('strictQuery', true);
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});


const wsjSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    author: String,
    date: String,
    description: String,
    content: Array
});
const reutersSchema = new mongoose.Schema({
    title: String,
    image1080: String,
    image480: String,
    date: String,
    description: String,
    content: Array
});
const bloombergSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    author: String,
    date: String,
    content: Array
});
const nytSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    author: String,
    date: String,
    description: String,
    content: Array
});
const bbcSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    author: String,
    date: String,
    type: String,
    description: String,
    content: Array
});
const ftSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    author: String,
    date: String,
    description: String,
    content: Array
})
const mwSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    author: String,
    date: String,
    description: String,
    content: String
});

const forbesSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    date: String,
    description: String,
    content: Array
});

const newsWsjSchema = new mongoose.Schema({
    name: String,
    posts: [wsjSchema]
});
const newsReutersSchema = new mongoose.Schema({
    name: String,
    posts: [reutersSchema]
});
const newsBloombergSchema = new mongoose.Schema({
    name: String,
    posts: [bloombergSchema]
});
const newsNytSchema = new mongoose.Schema({
    name: String,
    posts: [nytSchema]
});

const newsBbcSchema = new mongoose.Schema({
    name: String,
    posts: [bbcSchema]
});

const newsFtSchema = new mongoose.Schema({
    name: String,
    posts: [ftSchema]
});
const newsMwSchema = new mongoose.Schema({
    name: String,
    posts: [mwSchema]
});
const newsForbesSchema = new mongoose.Schema({
    name: String,
    posts: [forbesSchema]
});

const News = mongoose.model('News', newsWsjSchema);
const NewsReuter = mongoose.model('NewsReuter', newsReutersSchema);
const NewsBloomberg = mongoose.model('NewsBloomberg', newsBloombergSchema);
const NewsNyt = mongoose.model('NewsNyt', newsNytSchema);
const NewsBbc = mongoose.model('NewsBbc', newsBbcSchema);
const NewsFt = mongoose.model('NewsFt', newsFtSchema);
const NewsMw = mongoose.model('NewsMw', newsMwSchema);
const NewsForbes = mongoose.model('NewsForbes', newsForbesSchema);

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
})
const Contact = mongoose.model('Contact', contactSchema);


// ================= ALL NEWS =================
app.get('/', (req, res) => {
    News.findOne({name: "WSJ"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            res.render('wsj', {posts: foundNews.posts, stop: 15});
        }
    });
});

app.get('/reuters', (req, res) => {
    NewsReuter.findOne({name: "REUTERS"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            res.render('reuters', {posts: foundNews.posts, stop: 15});
        }
    });
});

app.get("/bloomberg", (req, res) => {
    NewsBloomberg.findOne({name: "BLOOMBERG"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            let stop = 15;
            if (stop > foundNews.posts.length) {
                stop = foundNews.posts.length;
            }
            res.render('bloomberg', {posts: foundNews.posts, stop: stop});
        }
    });
});

app.get("/NewYorkTimes", (req, res) => {
    NewsNyt.findOne({name: "NYT"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            res.render('nyt', {posts: foundNews.posts, stop: 15});
        }
    });
});

app.get('/bbc', (req, res) => {
    NewsBbc.findOne({name: "BBC"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            res.render('bbc', {posts: foundNews.posts, stop: 15});
        }
    });
});
app.get('/ft', (req, res) => {
    NewsFt.findOne({name: "FT"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            res.render('ft', {posts: foundNews.posts, stop: 15});
        }
    });
});

app.get('/marketwatch', (req, res) => {
    NewsMw.findOne({name: "MW"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            res.render('mw', {posts: foundNews.posts, stop: 15});
        }
    });
})

app.get('/forbes', (req, res) => {
    NewsForbes.findOne({name: "FORBES"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            let stop = 15;
            if (stop > foundNews.posts.length) {
                stop = foundNews.posts.length;
            }
            res.render('forbes', {posts: foundNews.posts, stop: stop});
        }
    });
});


// ================= Single Post =================//
app.get('/news/wsj/:postId', (req, res) => {
    let requestedPostId = req.params.postId;
    requestedPostId = requestedPostId.split("&&")[1];
    News.findOne({name: "WSJ"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            foundNews.posts.forEach(post => {
                if (post._id == requestedPostId) {
                    res.render('wsj-post', {post: post});
                }
            });
        }
    });
});

app.get('/news/reuters/:postId', (req, res) => {
    let requestedPostId = req.params.postId;
    requestedPostId = requestedPostId.split("&&")[1];
    NewsReuter.findOne({name: "REUTERS"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            foundNews.posts.forEach(post => {
                if (post._id == requestedPostId) {
                    res.render('reuters-post', {post: post});
                }
            });
        }
    });
});

app.get('/news/bloomberg/:postId', (req, res) => {
    let requestedPostId = req.params.postId;
    requestedPostId = requestedPostId.split("&&")[1];
    NewsBloomberg.findOne({name: "BLOOMBERG"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            foundNews.posts.forEach(post => {
                if (post._id == requestedPostId) {
                    res.render('bloomberg-post', {post: post});
                }
            });
        }
    });
});

app.get('/news/NewYorkTimes/:postId', (req, res) => {
    let requestedPostId = req.params.postId;
    requestedPostId = requestedPostId.split("&&")[1];
    NewsNyt.findOne({name: "NYT"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            foundNews.posts.forEach(post => {
                if (post._id == requestedPostId) {
                    res.render('nyt-post', {post: post});
                }
            });
        }
    });
});

app.get('/news/bbc/:postId', (req, res) => {
    let requestedPostId = req.params.postId;
    requestedPostId = requestedPostId.split("&&")[1];
    NewsBbc.findOne({name: "BBC"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            foundNews.posts.forEach(post => {
                if (post._id == requestedPostId) {
                    res.render('bbc-post', {post: post});
                }
            });
        }
    });
});

app.get('/news/ft/:postId', (req, res) => {
    let requestedPostId = req.params.postId;
    requestedPostId = requestedPostId.split("&&")[1];
    NewsFt.findOne({name: "FT"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            foundNews.posts.forEach(post => {
                if (post._id == requestedPostId) {
                    res.render('ft-post', {post: post});
                }
            });
        }
    });
});

app.get('/news/marketwatch/:postId', (req, res) => {
    let requestedPostId = req.params.postId;
    requestedPostId = requestedPostId.split("&&")[1];
    NewsMw.findOne({name: "MW"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            foundNews.posts.forEach(post => {
                if (post._id == requestedPostId) {
                    res.render('mw-post', {post: post});
                }
            });
        }
    });
});

app.get('/news/forbes/:postId', (req, res) => {
    let requestedPostId = req.params.postId;
    requestedPostId = requestedPostId.split("&&")[1];
    NewsForbes.findOne({name: "FORBES"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            foundNews.posts.forEach(post => {
                if (post._id == requestedPostId) {
                    res.render('forbes-post', {post: post});
                }
            });
        }
    });
});


//======================Load More====================//
app.get('/wsj/:page', (req, res) => {
    let stop = +req.params.page.split("=")[1];
    stop *= 10;
    News.findOne({name: "WSJ"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            const posts = foundNews.posts;
            if (stop > posts.length) {
                stop = posts.length;
            }
            res.render('wsj', {posts: posts, stop: stop});
        }
    });
});

app.get('/reuters/:page', (req, res) => {
    let stop = +req.params.page.split("=")[1];
    stop *= 10;
    NewsReuter.findOne({name: "REUTERS"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            const posts = foundNews.posts;
            if (stop > posts.length) {
                stop = posts.length;
            }
            res.render('reuters', {posts: posts, stop: stop});
        }
    });
});

app.get("/bloomberg/:page", (req, res) => {
    let stop = +req.params.page.split("=")[1];
    stop *= 10;
    NewsBloomberg.findOne({name: "BLOOMBERG"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            const posts = foundNews.posts;
            if (stop > posts.length) {
                stop = posts.length;
            }
            res.render('bloomberg', {posts: posts, stop: stop});
        }
    });
});

app.get('/nyt/:page', (req, res) => {
    let stop = +req.params.page.split("=")[1];
    stop *= 10;
    NewsNyt.findOne({name: "NYT"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            const posts = foundNews.posts;
            if (stop > posts.length) {
                stop = posts.length;
            }
            res.render('nyt', {posts: posts, stop: stop});
        }
    });
});

app.get('/bbc/:page', (req, res) => {
    let stop = +req.params.page.split("=")[1];
    stop *= 10;
    NewsBbc.findOne({name: "BBC"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            const posts = foundNews.posts;
            if (stop > posts.length) {
                stop = posts.length;
            }
            res.render('bbc', {posts: posts, stop: stop});
        }
    });
});

app.get('/ft/:page', (req, res) => {
    let stop = +req.params.page.split("=")[1];
    stop *= 10;
    NewsFt.findOne({name: "FT"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            const posts = foundNews.posts;
            if (stop > posts.length) {
                stop = posts.length;
            }
            res.render('ft', {posts: posts, stop: stop});
        }
    });
});

app.get('/marketwatch/:page', (req, res) => {
    let stop = +req.params.page.split("=")[1];
    stop *= 10;
    NewsMw.findOne({name: "MW"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            const posts = foundNews.posts;
            if (stop > posts.length) {
                stop = posts.length;
            }
            res.render('mw', {posts: posts, stop: stop});
        }
    });
});

app.get('/forbes/:page', (req, res) => {
    let stop = +req.params.page.split("=")[1];
    stop *= 10;
    NewsForbes.findOne({name: "FORBES"}, (err, foundNews) => {
        if (err) {
            console.log(err);
        } else {
            const posts = foundNews.posts;
            if (stop > posts.length) {
                stop = posts.length;
            }
            res.render('forbes', {posts: posts, stop: stop});
        }
    });
});

// ===================Contact Us=====================//
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.post('/contact', (req, res) => {
    const newContact = new Contact({
        name: req.body.cName,
        email: req.body.cEmail,
        message: req.body.cMessage
    });
    newContact.save().then((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Contact saved");
        }
    });
    res.redirect('/');
});

// ===================Footer=====================//
app.get('/terms-and-conditions', (req, res) => {
    res.sendFile(__dirname + "/public/terms-and-conditions.html");
});
app.get('/about-us', (req, res) => {
    res.sendFile(__dirname + "/public/about-us.html");
});
app.get('/privacy-policy', (req, res) => {
    res.sendFile(__dirname + "/public/privacy-policy.html");
});

app.get('/disclaimer', (req, res) => {
    res.sendFile(__dirname + "/public/disclaimer.html");
});


app.listen(port, () => {
    console.log('Server started on port 3000');
});