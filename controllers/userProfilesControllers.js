const UserProfile = require('../models/userProfiles')

exports.userProfileAdd = async (req,res) => {
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
  let userProfiles = await UserProfile.find({}, "_id name" ,function(err, userProfiles) {
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
  let userProfile = await UserProfile.findById(req.params.id, function(err, userProfile) {
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
  let userProfile = await UserProfile.findByIdAndUpdate(req.params.id, req.body[0], function(err, userProfile) {
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
  let userProfile = await UserProfile.deleteMany(
    {_id: {$in: req.params.ids.split(",")}},
    function(err, userProfile) {
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



exports.userProfilePrivilegeAdd = async (req,res) => {
  const userProfileId = req.params.userProfileId;
  try{
    let userProfilePrivilege =  await UserProfile.findOne({_id: userProfileId});
    userProfilePrivilege.privilege.push(req.body);
    userProfilePrivilege.save();
    return res.status(200).json("Successfully added");
  }catch (error){
      return res.status(400).json({
        error,
      });
  }
}
exports.userProfilePrivilegeList = async (req,res) => {
  const userProfileId=req.params.userProfileId
  let userProfilePrivilege = await UserProfile.findById(userProfileId,'privilege', function(err, userProfilePrivilege) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(userProfilePrivilege.length===0) {
          return res.status(400).json({error: 'No privilege for the specified user profile'})
      }
      return res.json(userProfilePrivilege);
    
  });
}
exports.userProfilePrivilegeUpdate = async (req,res) => {
  const userProfileId = req.params.userProfileId;
  const pageId = req.params.pageId;
  let userProfilePrivilege = await UserProfile.update(
    {
      _id: userProfileId,
      'privilege._id': pageId,
    },
    {
      $set: {
        'privilege.$.role': req.body,
      },
    },
    function (err, userProfilePrivilege) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (userProfilePrivilege.n === 0) {
        return res
          .status(400)
          .json({ error: "No privilege for the specified user profile" });
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}
exports.userProfilePrivilegeDelete = async (req,res) => {
  const userProfileId = req.params.userProfileId;
  const pageId = req.params.pageId;
  let userProfilePrivilege = await UserProfile.findByIdAndUpdate(
    userProfileId,
    {
      $pull: {
        privilege: {
          _id: {
            $in: pageId.split(","),
          },
        },
      },
    },
    function (err, userProfilePrivilege) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (userProfilePrivilege.n === 0) {
        return res.status(400).json({error: 'No privilege for the specified user profile'})
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}
