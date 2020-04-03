module.exports = {
    studyRouterPage: (req,res) => {
        let token = req.session.loggedin;
        let querystudy = "SELECT * FROM create_classroom";
        db.query(querystudy,(err,result) => {
            if(err){
                return res.status(500).send(err)
            }
            if (token) {
                res.render('studyPage.ejs',{
                    token: req.session.loggedin,
                    studyroom: result,
                    user: req.session.username,
                    typeperson: req.session.typelogperson,
                    name: req.session.username[0].Username,
                    money: req.session.username[0].Money
                });
                
            } else {
                res.render('studyPage.ejs',{
                    token: "",
                    studyroom: result
                });
            }
        });
    },
    addStudyPage: (req,res) => {
        let token = req.session.loggedin;
        if (token) {
            res.render('addstudy.ejs',{
                user: req.session.username,
                name: req.session.username[0].Username,
                money: req.session.username[0].Money
            });
        } else {
            req.session.loggedin = false;
            res.redirect('/study');
        }
    },
    addStudy: (req,res) => {
        let namestudy = req.body.namestudy;
        let token = req.session.loggedin;
        let Idteacher = req.session.username;
        if (token) {
            let query = "SELECT * FROM create_classroom WHERE NameClassroom = '"+ namestudy +"'";
            db.query(query,(err,result) => {
                if (err) {
                    return res.status(500).send(err)
                }
                if (result.length > 0) {
                    res.redirect('/study');
                } else {
                    let queryimport = "INSERT INTO create_classroom (IDTeacher,NameClassroom) VALUES ("+ Idteacher[0].IDTeacher +",'"+ namestudy +"')";
                    db.query(queryimport,(err,results) => {
                        res.redirect('/study');
                    });
                }
            });
        } else {
            req.session.loggedin = false;
            res.redirect('/study');
        }
    },
    viewStudyPage: (req,res) => {
        let id = req.params.id;
        let token = req.session.loggedin;
        let queryStudy = "SELECT * FROM create_classroom WHERE IDRoom = "+ id +"";
        db.query(queryStudy,(err,result) => {
            if (err) {
                return res.status(500).send(err)
            }
            if (result.length > 0) {
                if (token) {
                res.render('ViewStudyPage.ejs',{
                    token: token,
                    user: req.session.username,
                    classroom: result
                });
                } else {
                    res.render('ViewStudyPage.ejs',{
                        token: "",
                        classroom: result
                    });
                }
            } else {
                res.send('err not found Page');
            }
        });
    }
}