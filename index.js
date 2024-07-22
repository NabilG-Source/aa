const express = require("express");
const session = require("express-session");
const path = require("path");
const appExpress = express();

const filesystem = require("fs");
const { loadRegistered } = require("./jsonFunction");

let ejs = require("ejs");
const webPort = 3000;

appExpress.use(express.urlencoded({ extended: true }));
appExpress.use(express.json());

appExpress.use(session({
  secret: 'gaddjlkasadyfallksfadigyksj272478kde', // ganti dengan kunci rahasia yang kuat
  resave: false,
  saveUninitialized: true,
  store: new session.MemoryStore()
}));

appExpress.set("view engine", "ejs");
appExpress.use(express.static("./"));

// Landing Page
appExpress.get("/", (req, res) => {
  res.render("index");
});

// Check apakah registeredAccount.json ada

// Render login.ejs
appExpress.get("/login", (req, res) => {
  // load registered account using loadRegistered function from
  // jsonFunction.js
  const registeredAccount = loadRegistered(
    "public/database/registeredAccount.json",
    "utf-8"
  );

  res.render("login", {
    title: "Login Page",
    registeredAccount,
  });
});

appExpress.post("/login/", (req, res) => {
  const { emailUser, passwordUser } = req.body;
  const registeredAccount = loadRegistered(
    "public/database/registeredAccount.json",
    "utf-8"
  );

  const findUserAccount = registeredAccount.find(
    (user) => user.email === emailUser && user.pass === passwordUser
  );
  if (findUserAccount) {
    req.session.isLoggedIn = true;
    res.redirect("/login/status/success");
  } else {
    res.redirect("/login/status/failed");
  }
});

function checkLogin(req, res, next){
  if(req.session.isLoggedIn){
    next();
  } else {
    res.status(403).json({ status: "failed", message: "Login Failed, Failed to validating user account"});
  }
}

// Handle login system
appExpress.get("/login/status/:status", checkLogin, (req, res) => {
  const statusLogin = req.params.status;

  if (statusLogin === "success") {
    res.json({ status: "success", message: "Login Succesfully Validated" });
    res.send()
  } else {
    res.json({ status: "failed", message: "Login Failed, Failed to validating user account"});
  }
});

appExpress.get("/a/", (req, res) => {
  res.send("This a your contact list");
});

// Handle if code status == 404
appExpress.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404 NOT FOUND</h1>");
});

appExpress.listen(webPort, () => {
  console.log(`Server is listening on port localhost:${webPort}`);
});
