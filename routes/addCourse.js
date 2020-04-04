module.exports = {
    addCourse: (req,res) => {
        let namecourse = req.body.namecourse;
        let description = req.body.inputeditor;
        let id = req.params.id;
        let typeperson = req.session.typelogperson;
        if (namecourse && description) {
            if ( typeperson == 'Teacher') {
                let query = "SELECT * FROM create_classroom WHERE IDRoom = "+ id +"";
                db.query(query,(err,result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (result.length > 0) {
                        let querycheck = "SELECT * FROM study_course WHERE NameCourse = '"+ namecourse +"' AND IDRoom="+ id +"";
                        db.query(querycheck,(err,checkresult) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            if ( checkresult.length > 0 ) {
                                res.send('ชื่อนี้ถูกใช้ไปแล้ว')
                            } else {
                                let queryinsert = "INSERT INTO study_course (IDRoom,NameCourse,DescriptionCourse) VALUES ("+ id +",'"+ namecourse +"','"+ description +"')";
                                db.query(queryinsert,(err,insert) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }
                                    res.redirect('/study/'+id);
                                });
                            }
                        });
                    } else {
                        res.send('ไม่มีห้องให้เพิ่มบทเรียน')
                    }
                });
            } else {
                res.send('err');
            }
        } else {
            res.send('กรอกให้ครบ')
        }
    },
    addCoursePage: (req,res) => {
        let token = req.session.loggedin;
        let user = req.session.uesrname;
        let id = req.params.id;
        if (token) {
            let typeperson = req.session.typelogperson;
            if ( typeperson == 'Teacher' ) {
                let query = "SELECT * FROM create_classroom WHERE IDRoom = "+ id +"";
                db.query(query,(err,result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (result.length > 0) {
                        res.render('addcourse.ejs',{
                            token: req.session.loggedin,
                            user: req.session.uesrname,
                            classroom: result,
                            typeperson: req.session.typelogperson,
                            name: req.session.username[0].Username,
                            money: req.session.username[0].Money
                        });
                    } else {
                        res.send('ไม่มีห้องเรียนนี้ err')
                    }
                });
            } else {
                res.send('คุณไม่ใช่ครู');
            }
        } else {
            res.send('err');
        }
    }
}