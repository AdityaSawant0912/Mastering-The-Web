exports.getIndex = (req, res) => {
    user = null
    if(req.session)
        user = req.session.user
    res.status(200).render('home', {user})
}