const UserType = require('../models/userTypes')


exports.userTypeAdd = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log("req","ppp",req.body)
  let newUserType = await UserType.insertMany(req.body, function(err, userTypes) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}
exports.userTypesList = async (req,response) => {
  let userTypes = await UserType.find({}, function(err, userTypes) {
    if (err) {
      return response.status(400).json({
        error: err,
      });
    }
      if(userTypes.length===0) {
          return response.status(400).json({error: 'No user types in the database'})
      }
      return response.json(userTypes);
    
  });
}