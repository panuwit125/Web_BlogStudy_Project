module.exports = {
    loginRouterPage: (req,res) => {
      res.render('login.ejs');
    },
    regisRouter: (req,res) => {
        /*if(!req.files) {
          return res.status(400).send(req.body);
        }*/

        let name = req.body.nameInput;
        let username = req.body.user_name;
        let password = req.body.pass_word;
        let typeperson = req.body.typeperson;

        let usernameQuery = "SELECT * FROM "+ typeperson +" WHERE username = '"+ username +"'";
        db.query(usernameQuery,(err,result) => {
          if(err) {
            return res.status(500).send(err);
          }
          if (result.length > 0) {
            res.render('login.ejs');
            console.log('register success');
          } else {
            let query = "INSERT INTO "+ typeperson +" (Username,Password,Name,Money) VALUES ('" + username + "','" + password + "','" + name + "', 0)";
            db.query(query,(err,result) => {
              if(err) {
                return res.status(500).send(err);
              }
              res.redirect('/')
            });
          }
        });
    },
    logRouter: (req,res) => {
      let username = req.body.user_login;
      let password = req.body.pass_login;
      let typelogperson = req.body.typelogperson;
      
      if( typelogperson == 'Student') {
        if (username && password) {
          let logquery = "SELECT * FROM Student WHERE Username = '"+ username +"' AND Password = '"+ password +"'";
          db.query(logquery,(err,result) => {
            if (result.length > 0) {
              req.session.loggedin = true;
              req.session.username = result;
              res.redirect('/');
            } else {
              res.send('Incorrect Username and/or Password'+ result + logquery);
            }
            res.end();
          });
        } else {
          res.send('Please enter Username and Password');
          res.end();
        }
      } else {
        if (username && password) {
          let logquery = "SELECT * FROM Teacher WHERE Username = '"+ username +"' AND Password = '"+ password +"'";
          db.query(logquery,(err,result) => {
            if (result.length > 0) {
              req.session.loggedin = true;
              req.session.username = result;
              res.redirect('/');
            } else {
              res.send('Incorrect Username and/or Password'+ result + logquery);
            }
            res.end();
          });
        } else {
          res.send('Please enter Username and Password');
          res.end();
        }
      }
    }
}