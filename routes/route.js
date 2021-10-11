const Router = require('express'),
    router = new Router();


const checkId = async (req, res, next) => {
    if (await User.findByPk(req.params.id)) {
        next()
    } else {
        res.statusCode = 400;
        res.json({
            error: `Record number ${req.params.id} not found.`
        })
    }
};

module.exports = {router}
