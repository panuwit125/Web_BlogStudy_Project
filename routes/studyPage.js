module.exports = {
    studyRouterPage: (req,res) => {
        let token = req.session.loggedin;
        let querystudy = "SELECT * FROM create_classroom";
        db.query(querystudy,(err,result) => {
            if(err){
                return res.status(500).send(err)
            }
            if (token) {
                if (req.session.typelogperson.length > 0) {
                    res.render('studyPage.ejs',{
                        token: req.session.loggedin,
                        studyroom: result,
                        user: req.session.username,
                        typeperson: req.session.typelogperson,
                        name: req.session.username[0].Username,
                        money: req.session.username[0].Money
                    });
                } else {
                    req.session.loggedin = false;
                    res.send('แอบอ้าง')
                    //res.redirect('/study');
                } 
            } else {
                res.render('studyPage.ejs',{
                    typeperson: "",
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
        let description = req.body.inputeditor;
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
                    let queryimport = "INSERT INTO create_classroom (IDTeacher,NameClassroom,DescriptionClass,NumberStudent) VALUES ("+ Idteacher[0].IDTeacher +",'"+ namestudy +"','"+ description +"',0)";
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
                    let typeperson = req.session.typelogperson;
                    let IDStudent = req.session.username[0].IDStudent;
                    if (typeperson == 'student') {
                        let querycheck ="SELECT * FROM study_inclassroom WHERE IDStudent = "+ IDStudent +" AND IDRoom = "+ id +" ";
                        db.query(querycheck,(err,checkstudent) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            if (checkstudent.length > 0) {
                                let querycourse = "SELECT * FROM study_course WHERE IDRoom = "+ id +"";
                                db.query(querycourse,(err,courseresult) => {
                                    if (err) {
                                        return res.status(500).send(err)
                                    }
                                    res.render('ViewStudyPage.ejs',{
                                        token: token,
                                        user: req.session.username,
                                        classroom: result,
                                        name: req.session.username[0].Username,
                                        money: req.session.username[0].Money,
                                        check: checkstudent,
                                        typeperson: req.session.typelogperson,
                                        course: courseresult
                                    });
                                });
                                
                            } else {
                                res.render('ViewStudyPage.ejs',{
                                    token: token,
                                    user: req.session.username,
                                    classroom: result,
                                    name: req.session.username[0].Username,
                                    money: req.session.username[0].Money,
                                    check: checkstudent,
                                    typeperson: req.session.typelogperson
                                });
                            }
                        });
                    } else if (typeperson == 'teacher') {
                        let querycheck = "SELECT * FROM create_classroom WHERE IDRoom ="+ id +" AND IDTeacher = "+ req.session.username[0].IDTeacher +"";
                        db.query(querycheck,(err,resultcheck) => {
                            if (err) {
                                return res.status(500).send(err)
                            }
                            if (resultcheck.length > 0) {
                                let querycourse = "SELECT * FROM study_course WHERE IDRoom = "+ id +"";
                                db.query(querycourse,(err,courseresult) => {
                                    if (err) {
                                        return res.status(500).send(err)
                                    }
                                    res.render('ViewStudyPage.ejs',{
                                        token: token,
                                        user: req.session.username,
                                        classroom: result,
                                        name: req.session.username[0].Username,
                                        money: req.session.username[0].Money,
                                        typeperson: req.session.typelogperson,
                                        check: resultcheck,
                                        course: courseresult
                                    });
                                });
                            } else {
                                res.render('ViewStudyPage.ejs',{
                                    token: token,
                                    user: req.session.username,
                                    classroom: result,
                                    name: req.session.username[0].Username,
                                    money: req.session.username[0].Money,
                                    typeperson: req.session.typelogperson,
                                    check: resultcheck
                                });
                            }
                        });
                        
                        
                    } else {
                        req.session.loggedin = false;
                        res.redirect('/study');
                    }
                } else {
                    req.session.loggedin = false;
                    res.render('ViewStudyPage.ejs',{
                        token: "",
                        classroom: result,
                        typeperson: ""
                    });
                }
            } else {
                res.send('err not found Page');
            }
        });
    },
    joinclass: (req,res) => {
        let token = req.session.loggedin;
        let roomid = req.params.id;
        let queryroom = "SELECT * FROM create_classroom WHERE IDRoom ="+ roomid +"";
        if (token) {
            let IDStudent = req.session.username[0].IDStudent;
            db.query(queryroom,(err,result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                let querycheck = "SELECT * FROM study_inclassroom WHERE IDStudent="+ IDStudent +"";
                db.query(querycheck,(err,resultcheck) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (resultcheck.length > 0) {
                        res.send("คุณเข้าห้องแล้ว");
                    } else {
                        let queryinsert = "INSERT INTO study_inclassroom (IDStudent,IDRoom) VALUES ("+ IDStudent +","+ roomid +")";
                        db.query(queryinsert,(err,results) => {
                            let queryupdate = "UPDATE create_classroom SET NumberStudent = NumberStudent + 1 WHERE IDRoom = "+ roomid +"";
                            db.query(queryupdate,(err,updateresult) => {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                res.redirect('/study/'+roomid);
                            })
                        }); 
                    }
                })
            });
        } else {
            res.send('กรุณาล็อคอิน');
        }  
    }
}