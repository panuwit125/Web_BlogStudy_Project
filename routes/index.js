module.exports = {
  indexRouterPage: (req,res) => {
    let query = "SELECT * FROM create_classroom";
    db.query(query,(err,resultclass) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (req.session.loggedin){
        let user_name = req.session.username;
        let queryviewblog = "SELECT * FROM blog_studentandteacher";
        db.query(queryviewblog,(err,result) => {
          if (err) {
            return res.status(500).send(err);
          }
          let queryblogadmin = "SELECT * FROM blog_staff"
          db.query(queryblogadmin,(err,resultblogadmin) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.render('index.ejs',{
              results:req.session.loggedin,
              name:user_name[0].Username,
              money:user_name[0].Money,
              resultblog: result,
              resultblogadmin: resultblogadmin,
              resultclass: resultclass
            });
          });
          
        });
      } else {
        let queryviewblog = "SELECT * FROM blog_studentandteacher";
        db.query(queryviewblog,(err,result) => {
          if (err) {
            return res.status(500).send(err);
          }
          let queryblogadmin = "SELECT * FROM blog_staff"
          db.query(queryblogadmin,(err,resultblogadmin) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.render('index.ejs',{
              resultblog: result,
              resultblogadmin: resultblogadmin,
              resultclass: resultclass,
              results:""
            });
          });
          
        });
      }
    });
  }
}