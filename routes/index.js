module.exports = {
  indexRouterPage: (req,res) => {
    if (req.session.loggedin){
      let user_name = req.session.username;
      let queryviewblog = "SELECT * FROM blog_studentandteacher";
      db.query(queryviewblog,(err,result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.render('index.ejs',{
          results:req.session.loggedin,
          name:user_name[0].Username,
          money:user_name[0].Money,
          resultblog: result
        });
      });
      
      //req.results = req.session.loggedin;
      //res.send(user_name);
    } else {
      let queryviewblog = "SELECT * FROM blog_studentandteacher";
      db.query(queryviewblog,(err,result) => {
        if (err) {
          return res.status(500).send(err);
        }
        //var bloghtml = result[0].Description;
        //var bloghtml_text = bloghtml.toH
        res.render('index.ejs',{
          //blogHtml: bloghtml,
          resultblog: result,
          results:""
        });
      });
    }
    //res.end();
  }
}