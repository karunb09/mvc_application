const path = require("path")
const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser") // simplifies access to request body
const fs = require('fs')
const app = express()  // make express app
const port = 8081


// ADD THESE COMMENTS AND IMPLEMENTATION HERE 
// 1 set up the view engine
app.set("views", path.resolve(__dirname, "views")) // path to views
app.set("view engine", "ejs") // specify our view



// 2 manage our entries
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 3 set up the logger
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }));

// 4 handle valid GET requests
app.get("/", function (req, res) {
    //res.sendFile(path.join(__dirname + '/assets/index.html'))
    res.render("index.ejs")
})
app.get("/YourChoice", function (req, res) {
    res.render("YourChoice.ejs")
})
app.get("/index", function (req, res) {
    res.render("index.ejs")
})
app.get("/contact", function (req, res) {
    res.render("contact.ejs")
})


// 5 handle valid POST request (not required to fully work)
app.post("/contact", function (req, res) {
    var api_key = '0cab07dc3541a0d404472ffb689ad32f-4836d8f5-bde1d107';
    var domain = 'sandboxa428a18d02b4418683ed4d585938a1e9.mailgun.org';
    var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

    var data = {
        from: 'Sonam <postmaster@sandboxa428a18d02b4418683ed4d585938a1e9.mailgun.org>',
        to: 'sonam.gadekari@gmail.com',
        subject: req.body.FirstName+" Sent you a message",
        html: "<b style='color:green'> Message: </b>"+req.body.Question
    };

    mailgun.messages().send(data, function (error, body) {
        console.log(body);
        if(!error)
        res.send("Mail sent")
        else
        res.send("Mail not sent");
    });
})


// 6 respond with 404 if a bad URI is requested
app.get(function (req, res) {
    res.render("404")
})

// Listen for an application request on port 8081
app.listen(process.env.PORT || port, function () {
    console.log('Guestbook app listening on http://127.0.0.1:8081/')
})