const UserType = require('../models/userTypes')


exports.userTypesList = async (req,response) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
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