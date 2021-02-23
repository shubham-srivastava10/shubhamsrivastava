let User = require('../models/User');

//Handle index function
exports.index = function (req, res){
    User.get((err, users) => {
        if (err){
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

//Handle user signup post action
exports.new = function (req, res){
    console.log("Hello entering post request");
    console.log(req.body);
    const {email, thoughts} = req.body;
    let newUser = new User({email, thoughts});
    newUser.save()
        .then(user => {
            // res.redirect('http://localhost:3000/');
            res.json({
                message: "User registered",
                data: user
            });
        })
        .catch(err => console.log(err));

};