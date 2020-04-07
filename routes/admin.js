module.exports = {
    adminRouterPage: (req,res) => {
        let token = req.session.loggedin;
        let admin = req.session.username;
        if (token) {
            res.render('admin/indexadmin.ejs',{
                admin:admin
            });
        } else {
            req.session.loggedin = false;
            res.redirect('/')
        }
    },
    viewblogadmin: (req,res) => {
        let token = req.session.loggedin;
        let admin = req.session.username;
        let query = "SELECT * FROM blog_studentandteacher"
        db.query(query,(err,result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (token) {
            res.render('admin/viewblogadmin.ejs',{
                admin:admin,
                result:result
            });
            } else {
                req.session.loggedin = false;
                res.redirect('/')
            }
        });
    },
    addblogadmin: (req,res) => {
        let message = "";
        let token = req.session.loggedin;
        let admin = req.session.username;
        if (token) {
            res.render('admin/addblogadmin.ejs',{
                admin:admin,
                message: ""
            });
        } else {
            req.session.loggedin = false;
            res.redirect('/')
        }
    },
    adddata: (req,res) => {
        let message = "";
        let token = req.session.loggedin;
        let admin = req.session.username;
        let name = req.body.inputname;
        let description = req.body.inputeditor;
        if (name && description) {
            let query = "SELECT * FROM blog_staff WHERE NameBlog = '"+ name +"'";
            db.query(query,(err,result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (result.length > 0){
                    res.render('admin/addblogadmin.ejs',{
                        message: "ชื่อกระทู้นี้ถูกใช้ไปแล้ว"
                    });
                }else {
                    let queryinsert = "INSERT INTO blog_staff (IDStaff,NameBlog,Description) VALUES ("+ admin[0].IDStaff +",'"+ name +"','"+ description +"')";
                    db.query(queryinsert,(err,resultinsert) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/admin');
                    });
                }
            })
        } else {
            res.render('admin/addblogadmin.ejs',{
                message: "กรุณากรอกให้ครบ"
            });
        }
    },
    deleteblog: (req,res) => {
        let id = req.params.id;
        let query = "DELETE FROM blog_studentandteacher WHERE IDBlogStudent = '"+ id +"'";
        db.query(query,(err,result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/admin/blog');
        });
    },
    blogadminview: (req,res) => {
        let token = req.session.loggedin;
        let admin = req.session.username;
        let query = "SELECT * FROM blog_staff"
        db.query(query,(err,result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (token) {
            res.render('admin/blogadmin.ejs',{
                admin:admin,
                result:result
            });
            } else {
                req.session.loggedin = false;
                res.redirect('/')
            }
        });
    },
    deleteblogadmin: (req,res) => {
        let id = req.params.id;
        let query = "DELETE FROM blog_staff WHERE IDBlogstaff = '"+ id +"'";
        db.query(query,(err,result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/admin/blogadmin');
        });
    }
}