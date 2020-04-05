module.exports = {
    loginRouterPage: (req,res) => {
      res.render('login.ejs',{
        message:"",
        messagelog:""
      });
    },
    regisRouter: (req,res) => {
        let messagelog = "";
        let message = "";
        let option = req.body.option;
        let username = req.body.user_name;
        let password = req.body.pass_word;
        let typeperson = req.body.typeperson;

        if (option == "regis") {
          let name = req.body.nameInput;
          if (username && password && name && typeperson) {
            let usernameQuery = "SELECT * FROM "+ typeperson +" WHERE username = '"+ username +"'";
            db.query(usernameQuery,(err,result) => {
              if(err) {
                return res.status(500).send(err);
              }
              if (result.length > 0) {
                res.render('login.ejs',{
                  message: "มีคนใช้ user นี้แล้ว",
                  messagelog:""
                });
              } else {
                let query = "INSERT INTO "+ typeperson +" (Username,Password,Name,Money) VALUES ('" + username + "','" + password + "','" + name + "', 0)";
                db.query(query,(err,result) => {
                  if(err) {
                    return res.status(500).send(err);
                  }
                  res.render('login.ejs',{
                    message: "สมัครสำเร็จ",
                    messagelog:""
                  });
                });
              }
            });
          } else {
            res.render('login.ejs',{
              messagelog: "",
              message:"กรุณากรอกให้ครบ"
            });
          }
          
        } else {
          //Login Back-end
          if (username && password && typeperson){
            //Check Admin Before Check Other Person
            let queryadmin = "SELECT * FROM staff WHERE Username='"+ username +"' and Password ='"+ password +"'";
            db.query(queryadmin,(err,adminresult) => {
              if(err) {
                return res.status(500).send(err);
              }
              if (adminresult.length > 0) {
                req.session.loggedin = true;
                req.session.username = adminresult;
                res.redirect('/admin');
              } else {
                if( typeperson == 'student') {
                  if (username && password) {
                    let logquery = "SELECT * FROM student WHERE Username = '"+ username +"' AND Password = '"+ password +"'";
                    db.query(logquery,(err,result) => {
                      if (result.length > 0) {
                        req.session.loggedin = true;
                        req.session.username = result;
                        req.session.typelogperson = typeperson;
                        res.redirect('/');
                      } else {
                        res.render('login.ejs',{
                          messagelog: "รหัสของคุณไม่ถูกต้อง",
                          message:""
                        });
                      }
                      res.end();
                    });
                  } else {
                    res.render('login.ejs',{
                      messagelog: "กรุณากรอกให้ครบ",
                      message:""
                    });
                  }
                } else if ( typeperson == 'teacher') {
                  if (username && password) {
                    let logquery = "SELECT * FROM teacher WHERE Username = '"+ username +"' AND Password = '"+ password +"'";
                    db.query(logquery,(err,result) => {
                      if (result.length > 0) {
                        req.session.loggedin = true;
                        req.session.username = result;
                        req.session.typelogperson = typeperson;
                        res.redirect('/');
                      } else {
                        res.render('login.ejs',{
                          messagelog: "กรุณากรอกให้ครบ",
                          message:""
                        });
                      }
                      res.end();
                    });
                  } else {
                    res.render('login.ejs',{
                      messagelog: "กรุณากรอกให้ครบ",
                      message:""
                    });
                  }
                } else {
                  res.render('login.ejs',{
                    messagelog: "กรุณากรอกให้ครบ",
                    message:""
                  });
                }
                }
              });
          } else {
            res.render('login.ejs',{
              messagelog: "กรุณากรอกให้ครบ",
              message:""
            });
          }
        } 
    },logoutRouter: (req,res) => {
      req.session.loggedin = false;
      res.redirect('/');
    }
}