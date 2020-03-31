const fs = require('fs');

module.exports = {
  blogRouterPage: (req,res) => {
    if (req.session.loggedin) {
      res.render('blog.ejs',{
        results: req.session.loggedin,
        name: req.session.username[0].Username,
        money: req.session.username[0].Money
      });
    } else {
      res.render('blog.ejs',{
        results:""
      });
    }
  }
}