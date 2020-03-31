module.exports = {
  indexRouterPage: (req,res) => {
    if (req.session.loggedin){
      let user_name = req.session.username;
      res.render('index.ejs',{
        results:req.session.loggedin,
        name:user_name[0].Username,
        money:user_name[0].Money
      });
      req.results = req.session.loggedin;
      //res.send(user_name);
    } else {
      res.render('index.ejs',{
        results:""
      });
    }
    res.end();
  }
}