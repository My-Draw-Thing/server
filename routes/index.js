const router = require('express').Router();

const UserController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.status(200).json({
        "message": 'ok'
    });
});
router.post('/signup', UserController.signup);

router.get('/*', (req, res, next) => {
    next({ statusCode: 404, msg: 'Route not found' });
});

module.exports = router
