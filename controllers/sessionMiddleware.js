module.exports = {
    checkForSession(req, res, next){
        if (!req.session.user) {
            req.session.user = {
              name: '',
              id: '',
              loggedIn: false
            };
            next()
          }
    },
    corsConfig(req, res, next) {
      // console.log(req.get('origin'))
      res.header("Access-Control-Allow-Origin", "http://192.168.1.49:19006");
      res.header("Access-Control-Allow-Credentials", true);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    }
}