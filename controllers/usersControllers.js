const User = require('../models/user')

exports.userAdd = (req,res) => {
  const {username} = req.body[0]
  console.log(username)
  User.findOne({username}).exec((err,user) => {
    if(user) {
        return res.status(400).json({error: 'Username is taken'})
    }
  })
  let newUser = new User(req.body[0]);
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
  let users = await User.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, users) {
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
  let user = await User.findByIdAndUpdate(req.param('id'), req.body[0], function(err, user) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (user===null) {
      return res
        .status(400)
        .json({ error: "User not available in the database" });
    }
    return res.json(user);
  });
  
}

exports.userDelete = async (req,res) => {
  let user = await User.deleteMany(
    {
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

exports.userTypeDetails = async (req,res) => {
  let user = await User.find({usertype_id: req.param('typeId')}, function(err, user) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (user.length === 0) {
      return res
        .status(400)
        .json({ error: "No user available for the selected type" });
    }
    return res.json(user);
  });
}
