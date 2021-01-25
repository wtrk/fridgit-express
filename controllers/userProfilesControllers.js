const UserProfile = require('../models/userProfiles')

exports.userProfileAdd = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let newUserProfile = await UserProfile.insertMany(req.body, function(err, userProfiles) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.userProfilesList = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let userProfiles = await UserProfile.find({}, function(err, userProfiles) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(userProfiles.length===0) {
          return res.status(400).json({error: 'No user profiles in the database'})
      }
      return res.json(userProfiles);
    
  });
}

exports.userProfileDetails = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let userProfile = await UserProfile.findById(req.param('id'), function(err, userProfile) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (userProfile===null) {
      return res.status(400)
        .json({ error: "User profile not available in the database" });
    }
    return res.json(userProfile);
  });
}

exports.userProfileUpdate = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let userProfile = await UserProfile.findByIdAndUpdate(req.param('id'), req.body[0], function(err, userProfile) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (userProfile===null) {
      return res
        .status(400)
        .json({ error: "User profile not available in the database" });
    }
    return res.json(userProfile);
  });
  
}

exports.userProfileDelete = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let userProfile = await UserProfile.deleteMany(
    {
      _id: {
        $in: req.params.ids.split(",")

      }
      }, function(err, userProfile) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (userProfile.n === 0) {
          return res
            .status(400)
            .json({ error: "User profiles not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
