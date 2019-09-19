const User = require('../models/user');
const { jwt } = require('../helpers');

class UserController {
    static signup(req, res, next) {
        const { name } = req.body
        let image = 'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png';
        
        User.create({ name, image })
            .then(result => {
                
                let userData = {
                    name,
                    image
                }

                let token = jwt.generateToken(userData);
                res.status(200).json({ token });
            })
            .catch(next)
    }
}

module.exports = UserController