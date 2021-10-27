const express = require("express");
const bodyParser = require("body-parser");
const app = new express();
const expressSession = require("express-session");

const fileUpload = require("express-fileupload");
const newPostController = require("./controllers/newPost");
const newContactController = require("./controllers/contact");
const newAboutController = require("./controllers/about");
const newIndexController = require("./controllers/index");
const newPostById = require("./controllers/postById");
const storePostController = require("./controllers/storePost");
const validateMiddleware = require("./middleware/validationMiddleware");
const newRegisterController = require("./controllers/register");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
const logoutController = require("./controllers/logout");

app.use(fileUpload());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/posts/newest", validateMiddleware);
app.use(expressSession({ secret: "keyboard cat" }));

const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

mongoose.connect(
  "mongodb+srv://serputov:serputov@cluster0.ftpdg.mongodb.net/ads?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get("/", newIndexController);
app.get("/about", newAboutController);
app.get("/contact", newContactController);

app.get(
  "/auth/register",
  redirectIfAuthenticatedMiddleware,
  newRegisterController
);
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);

app.get("/auth/logout", logoutController);
app.get("/post/:id", newPostById);
app.get("/posts/new", authMiddleware, newPostController);

app.post("/posts/newest", authMiddleware, storePostController);

app.use((req, res) => res.render("notfound"));

global.loggedIn = null;
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
