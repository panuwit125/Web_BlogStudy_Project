const fs = require('fs');

module.exports = {
  blogRouterPage: (req,res) => {
    if (req.session.loggedin) {
      let query = "SELECT * FROM blog_studentandteacher";
      db.query(query,(err,result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.render('blog.ejs',{
          results: req.session.loggedin,
          name: req.session.username[0].Username,
          money: req.session.username[0].Money,
          resultblog: result
        });
      });
      
    } else {
      let query = "SELECT * FROM blog_studentandteacher";
      db.query(query,(err,result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.render('blog.ejs',{
          results:"",
          resultblog:result
        });
      });
    }
  },
  addblogPage: (req,res) => {
    if (req.session.loggedin) {
      res.render('addblog.ejs',{
        results: req.session.loggedin,
        name: req.session.username[0].Username,
        money: req.session.username[0].Money
      });
    } else {
      redirect('/blog')
    }
  },
  addblogdata: (req,res) => {
    let message = "";
    let name = req.body.inputname;
    let description = req.body.inputeditor;
    if (name && description) {
      let query = "SELECT * FROM blog_studentandteacher WHERE NameBlog = '"+ name +"'";
      db.query(query,(err,result) => {
        if (result.length > 0) {
          message = "Name is not avalable";
        } else {
          let queryinsert = "INSERT INTO blog_studentandteacher (IDStudentOrTeacher,NameBlog,Description) VALUES ('"+ req.session.username[0].Username +"','"+ name +"','"+ description +"')";
          db.query(queryinsert,(err,result) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.redirect('/blog');
          });
        }
      });
    }
  },
  viewblogPage: (req,res) => {
    let blogid = req.params.id;
    let query = "SELECT * FROM blog_studentandteacher WHERE IDBlogStudent = '"+ blogid +"'";
    db.query(query,(err,result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length > 0) {
        let cmquery = "SELECT * FROM comment_blog WHERE IDBlogStudent = "+ blogid +"";
        db.query(cmquery,(err,results) => {
            if (req.session.loggedin){
              res.render('viewblog.ejs',{
                idcm: blogid,
                idblog: result,
                token: req.session.loggedin,
                name: req.session.username[0].Username,
                money: req.session.username[0].Money,
                comment: results
            }); 
            } else {
              res.render('viewblog.ejs',{
                idblog: result,
                comment: results,
                token: ""
              }); 
            }
        });
      } else {
        res.redirect('/')
      }
    });
  },
  commentblog: (req,res) => {
    let cmtext = req.body.textareacomment;
    let blogid = req.params.id;
    let query = "SELECT * FROM blog_studentandteacher WHERE IDBlogStudent = '"+ blogid +"'";
    db.query(query,(err,result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length > 0) {
        let querysave = "INSERT INTO comment_blog (IDBlogStudent,Comment) VALUES ("+ blogid +",'"+ cmtext +"')";
        db.query(querysave,(err,result) => {
          res.redirect('/blog/'+blogid);
        });
      } else {
        res.send('err'+blogid)
      }
    });
  }
}