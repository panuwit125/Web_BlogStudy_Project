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
    let message = "";
    if (req.session.loggedin) {
      res.render('addblog.ejs',{
        results: req.session.loggedin,
        name: req.session.username[0].Username,
        money: req.session.username[0].Money,
        message: ""
      });
    } else {
      res.redirect('/blog')
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
          res.render('addblog.ejs',{
            message: "กรุณากรอกให้ครบ",
            results: req.session.loggedin,
            name: req.session.username[0].Username,
            money: req.session.username[0].Money
          });
        } else {
          let queryinsert = "INSERT INTO blog_studentandteacher (IDStudentOrTeacher,NameBlog,Description,Viewblog) VALUES ('"+ req.session.username[0].Username +"','"+ name +"','"+ description +"',0)";
          db.query(queryinsert,(err,result) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.redirect('/blog');
          });
        }
      });
    } else {
      res.render('addblog.ejs',{
        message: "กรุณากรอกให้ครบ",
        results: req.session.loggedin,
        name: req.session.username[0].Username,
        money: req.session.username[0].Money
      });
    }
  },
  viewblogPage: (req,res) => {
    let message = "";
    let blogid = req.params.id;
    let query = "SELECT * FROM blog_studentandteacher WHERE IDBlogStudent = "+ blogid +"";
    db.query(query,(err,result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length > 0) {
        let cmquery = "SELECT * FROM comment_blog WHERE IDBlogStudent = "+ blogid +"";
        db.query(cmquery,(err,results) => {
            if (req.session.loggedin){
              let update = "UPDATE blog_studentandteacher SET Viewblog = Viewblog+1 WHERE IDBlogStudent = "+ blogid +" ";
              db.query(update,(err,update) => {
                if (err) {
                  return res.status(500).send(err);
                }
                
                  res.render('viewblog.ejs',{
                    idcm: blogid,
                    idblog: result,
                    token: req.session.loggedin,
                    name: req.session.username[0].Username,
                    money: req.session.username[0].Money,
                    comment: results,
                    message: ""
                }); 
              });
              
            } else {
              let update = "UPDATE blog_studentandteacher SET Viewblog = Viewblog+1 WHERE IDBlogStudent = "+ blogid +" ";
              db.query(update,(err,update) => {
                if (err) {
                  return res.status(500).send(err);
                }
              res.render('viewblog.ejs',{
                idblog: result,
                comment: results,
                token: "",
                message: ""
              });
            }); 
            }
        });
      } else {
        res.redirect('/')
      }
    });
  },
  commentblog: (req,res) => {
    let message = "";
    let cmtext = req.body.textareacomment;
    let blogid = req.params.id;
    if (cmtext) {
      let query = "SELECT * FROM blog_studentandteacher WHERE IDBlogStudent = '"+ blogid +"'";
      db.query(query,(err,result) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (result.length > 0) {
          let querysave = "INSERT INTO comment_blog (IDBlogStudent,Comment,Person) VALUES ("+ blogid +",'"+ cmtext +"','"+ req.session.username[0].Username +"')";
          db.query(querysave,(err,result) => {
            res.redirect('/blog/'+blogid);
          });
        } else {
          res.send('err'+blogid)
        }
      });
    } else {
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
                  comment: results,
                  message: "กรุณากรอกแสดงความคิดเห็น"
              }); 
              } else {
                res.render('viewblog.ejs',{
                  idblog: result,
                  comment: results,
                  token: "",
                  message: ""
                }); 
              }
          });
        } else {
          res.redirect('/')
        }
      });
    }
  },
  blogstaffrouter: (req,res) => {
    if (req.session.loggedin) {
      let query = "SELECT * FROM blog_staff";
      db.query(query,(err,result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.render('viewblogstaff.ejs',{
          results: req.session.loggedin,
          name: req.session.username[0].Username,
          money: req.session.username[0].Money,
          resultblog: result
        });
      });
      
    } else {
      let query = "SELECT * FROM blog_staff";
      db.query(query,(err,result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.render('viewblogstaff.ejs',{
          results:"",
          resultblog:result
        });
      });
    }
  },
  viewblogstaff: (req,res) => {
    let message = "";
    let blogid = req.params.id;
    let query = "SELECT * FROM blog_staff WHERE IDBlogstaff = "+ blogid +"";
    db.query(query,(err,result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (req.session.loggedin) {
          res.render('viewblogstaffpage.ejs',{
            idcm: blogid,
            idblog: result,
            token: req.session.loggedin,
            name: req.session.username[0].Username,
            money: req.session.username[0].Money,
            message: ""
        });
      } else {
        res.render('viewblogstaffpage.ejs',{
          idcm: blogid,
          idblog: result,
          token: req.session.loggedin,
          message: ""
      });
      }
    });
  }
}