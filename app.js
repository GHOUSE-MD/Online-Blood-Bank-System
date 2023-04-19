const path = require("path");
const express = require("express");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");
const bodyparser = require("body-parser");

const mongoDBStore = mongodbStore(session);

const db = require("./data/database");
const app = express();

const sessionStore = new mongoDBStore({
  uri: "mongodb://127.0.0.1:27017",
  databaseName: "blood",
  collection: "sessions",
});

const first = require("./router/first");
const userRoutes = require("./router/blood");
const authRoutes = require("./router/auth");
const adminRoutes = require("./router/Admin");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(
  session({
    secret: "super-secret-blood",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use(async function (req, res, next) {
  const user = req.session.user;
  const isAuth = req.session.isAuthenticated;

  if (!user || !isAuth) {
    return next();
  }

  const userDoc = await db
    .getdb()
    .collection("users")
    .findOne({ email: user.email });
  isAdmin = userDoc.isAdmin;

  res.locals.isAdmin = isAdmin;
  res.locals.isAuth = isAuth;
  next();
});

app.use(first);
app.use(adminRoutes);
app.use(authRoutes);
app.use(userRoutes);

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3001);
});
