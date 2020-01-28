const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const secrets = require("./secrets.json");
const { addUser } = require("./db");
const { hashPass } = require("./bcrypt");

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.json());

app.use(express.static("./public"));

app.use(
    cookieSession({
        secret: secrets.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

// REGISTRATION PAGE //
app.get("/registration", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    console.log("post request body: ", req.body);

    let first = req.body.first,
        last = req.body.last,
        email = req.body.email,
        password = req.body.password;
    hashPass(password).then(hashedPass => {
        addUser(first, last, email, hashedPass)
            .then(result => {
                console.log("result from addUser: ", result[0]);
                req.session.userId = result[0];

                console.log("cookie attached!: ", req.session.userId);
                res.json(result[0]);
            })
            .catch(err => console.log("error in register post: ", err));
    });
});

// THIS MUST BE THE LAST ROUTE //
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/registration");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
//__THIS MUST BE THE LAST ROUTE__//
app.listen(8080, function() {
    console.log("I'm listening.");
});
