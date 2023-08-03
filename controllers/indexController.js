exports.getIndex = (req, res) => {
    if(req.session)
        res.status(200).render('home', {user: req.session.user})
}