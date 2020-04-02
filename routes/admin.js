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
    }
}