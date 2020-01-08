require("dotenv").config();
const express = require("express");
const massive = require("massive");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const session = require("express-session");
// const cors = require("cors");
const ac = require("./controllers/authController");
// const pc = require('./controllers/patientController')
const sm = require("./controllers/sessionMiddleware");
const app = express();

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db is good");
  app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is listening`));
});

app.use(express.json());
app.use(sm.corsConfig);


app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60
    }
  })
);

app.post("/auth/register", ac.register);
app.post("/auth/login", ac.login);
app.delete("/auth/logout", ac.logout);
app.get("/auth/user", ac.getUser);

app.get("/api/patients", ac.getAllPatients);
