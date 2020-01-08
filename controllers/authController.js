const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = {
  async register(req, res) {
    const db = req.app.get("db");
    let { email, password, passCheck, name } = req.body;
    if (password !== passCheck)
      return res.status(400).send("passwords do not match");
    let sessionsUser = await db.get_user_by_email(email);
    if (sessionsUser[0]) return res.sendStatus(403);
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    sessionsUser = await db.add_user([email, hash, name]);
    req.session.user = {
      name: name,
      id: sessionsUser[0].id,
      loggedIn: true
    };
    res.status(200).send(req.session.user);
  },

  async login(req, res) {
    const db = req.app.get("db");
    let { emailInput, passwordInput } = req.body;
    let sessionsUser = await db.get_user_by_email(emailInput);
    if (!sessionsUser[0]) return res.status(400).send("username not found");
    const match = await bcrypt.compare(passwordInput, sessionsUser[0].hash);
    if (match) {
      req.session.user = {
        name: sessionsUser[0].first_name,
        id: sessionsUser[0].id,
        loggedIn: true
      };
    } else {
      res.status(400).send("invalid password");
    }
    res.status(200).send(req.session.user);
  },

  async logout(req, res) {
    await req.session.destroy();
    res.sendStatus(200);
  },
  async getUser(req, res) {
    res.status(200).send(req.session);
  },
  async getAllPatients(req, res) {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const patients = await db.get_patients(+id);
    res.status(200).send(patients);
  }
};
