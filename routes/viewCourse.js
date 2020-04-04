module.exports = {
    viewCourse: (req,res) => {
        let id = req.params.id;
        let idcourse = req.params.idcourse;
        let token = req.session.loggedin;
        let user = req.session.username;
        let typeperson = req.session.typelogperson;
        if (token) {
            if (typeperson == 'Student') {
                let querycheck = "SELECT * FROM study_inclassroom WHERE IDStudent = "+ user[0].IDStudent +" AND IDRoom = "+ id +" ";
                db.query(querycheck,(err,resultcheck) => {
                    if (err) {
                        return res.status(500).send(err)
                    }
                    if (resultcheck.length > 0) {
                        let querycourse = "SELECT * FROM study_course WHERE IDCourse = "+ idcourse +" AND IDRoom = "+ id +" ";
                        db.query(querycourse,(err,resultcourse) => {
                            if (err) {
                                return res.status(500).send(err)
                            }
                            if (resultcourse.length > 0) {
                                res.render('viewcourse.ejs',{
                                    token: req.session.loggedin,
                                    name: req.session.username[0].Username,
                                    money: req.session.username[0].Money,
                                    course: resultcourse
                                });
                            } else {
                                res.send('ไม่มีบทเรียนนี้');
                            }
                        });
                        
                    } else {
                        res.send('คุณไม่ได้อยู๋ในห้องเรียน')
                    }
                });
            } else if (typeperson == 'Teacher') {
                let querycheck = "SELECT * FROM create_classroom WHERE IDRoom = "+ id +" AND IDTeacher = "+ user[0].IDTeacher +" ";
                db.query(querycheck,(err,resultcheck) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (resultcheck.length > 0) {
                        let querycheckcourse = "SELECT * FROM study_course WHERE IDCourse = "+ idcourse +" AND IDRoom = "+ id +" ";
                        db.query(querycheckcourse,(err,resultcheckcourse) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            if (resultcheckcourse.length > 0) {
                                res.render('viewcourse.ejs',{
                                    token: req.session.loggedin,
                                    name: req.session.username[0].Username,
                                    money: req.session.username[0].Money,
                                    course: resultcheckcourse
                                });
                            } else {
                                res.send('ไม่มีบทเรียนนี้');
                            }
                        });
                    } else {
                        res.send('คุณไม่ได้อยู๋ในห้องเรียน')
                    }
                });
            } else {
                res.send('err')
            }
        } else {
            res.send('โปรดทำการเข้าสู่ระบบ')
        }
    }
}