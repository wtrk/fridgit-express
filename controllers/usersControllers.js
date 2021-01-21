const User = require('../models/user')

exports.userAdd = (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const {username} = req.body
  User.findOne({username}).exec((err,user) => {
    if(user) {
        return res.status(400).json({error: 'Username is taken'})
    }
  })
  let newUser = new User(req.body);
  newUser.save((err,success) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
        message: 'Success'
    })
  })
}

exports.usersList = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let users = await User.find({}, function(err, users) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(users.length===0) {
          return res.status(400).json({error: 'No users in the database'})
      }
      return res.json(users);
    
  });
}

exports.userDetails = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let user = await User.findById (req.param('id'), function(err, user) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (user.length === 0) {
      return res
        .status(400)
        .json({ error: "User not available in the database" });
    }
    return res.json(user);
  });
}

exports.userUpdate = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let user = await User.findByIdAndUpdate (req.param('id'), req.body, function(err, user) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (user.length === 0) {
      return res
        .status(400)
        .json({ error: "User not available in the database" });
    }
    return res.json(user);
  });
  
}

exports.userDelete = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let user = await User.deleteMany(
    {
      _id: {
        $in: req.params.ids.split(",")

      }
      }, function(err, user) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (user.n === 0) {
          return res
            .status(400)
            .json({ error: "Users not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
