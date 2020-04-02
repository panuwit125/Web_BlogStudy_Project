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
                    token: token,
                    studyroom: result,
                    user: req.session.username
                });
                
            } else {
                res.render('studyPage.ejs',{
                    studyroom: result
                });
            }
        });
    },
    addStudyPage: (req,res) => {
        let token = req.session.loggedin;
        if (token) {
            res.render('addstudy.ejs',{
                user: req.session.username
            });
        } else {
            req.session.loggedin = false;
            res.redirect('/study');
        }
    }
}