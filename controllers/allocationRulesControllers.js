const AllocationRule = require('../models/allocationRules')

exports.allocationRuleAdd = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log("req","ppp",req.body)
  let newAllocationRule = await AllocationRule.insertMany(req.body, function(err, allocationRules) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.allocationRulesList = async (req,res) => {
  let allocationRules = await AllocationRule.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, allocationRules) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(allocationRules.length===0) {
          return res.status(400).json({error: 'No allocation rules in the database'})
      }
      return res.json(allocationRules);
    
  });
}

exports.allocationRuleDetails = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let allocationRule = await AllocationRule.findById(req.param('id'), function(err, allocationRule) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (allocationRule===null) {
      return res.status(400)
        .json({ error: "Allocation rule not available in the database" });
    }
    return res.json(allocationRule);
  });
}

exports.allocationRuleUpdate = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let allocationRule = await AllocationRule.findByIdAndUpdate(req.param('id'), req.body[0], function(err, allocationRule) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (allocationRule===null) {
      return res
        .status(400)
        .json({ error: "Allocation rule not available in the database" });
    }
    return res.json(allocationRule);
  });
  
}

exports.allocationRuleDelete = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let allocationRule = await AllocationRule.deleteMany(
    {
      _id: {
        $in: req.params.ids.split(",")

      }
      }, function(err, allocationRule) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (allocationRule.n === 0) {
          return res
            .status(400)
            .json({ error: "Allocation rules not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}

exports.allocationRuleCitiesList = async (req,res) => {
  const allocationRuleId=req.params.allocationRuleId
  let allocationRuleCities = await AllocationRule.findById(allocationRuleId,'cities', function(err, allocationRuleCities) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(!allocationRuleCities) {
          return res.status(400).json({error: 'No Cities for specified allocation rule'})
      }
      return res.json(allocationRuleCities);
    
  });
}
exports.allocationRuleCitiesDelete = async (req,res) => {
  const allocationRuleId = req.params.allocationRuleId;
  const allocationRuleCitiesId = req.params.allocationRuleCitiesId;

  let allocationRuleCities = await AllocationRule.findByIdAndUpdate(
    allocationRuleId,
    {
      $pull: {
        cities: {
          _id: {
            $in: allocationRuleCitiesId.split(","),
          },
        },
      },
    },
    function (err, allocationRuleCities) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!allocationRuleCities) {
        return res.status(400).json({error: 'No Cities for specified allocation rule'})
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}

exports.allocationRuleNeighbourhoodsList = async (req,res) => {
  const allocationRuleId=req.params.allocationRuleId
  let allocationRuleNeighbourhoods = await AllocationRule.findById(allocationRuleId,'neighbourhoods', function(err, allocationRuleNeighbourhoods) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(!allocationRuleNeighbourhoods) {
          return res.status(400).json({error: 'No Neighbourhoods for specified allocation rule'})
      }
      return res.json(allocationRuleNeighbourhoods);
    
  });
}
exports.allocationRuleNeighbourhoodsDelete = async (req,res) => {
  const allocationRuleId = req.params.allocationRuleId;
  const allocationRuleNeighbourhoodsId = req.params.allocationRuleNeighbourhoodsId;
  
  let allocationRuleNeighbourhoods = await AllocationRule.findByIdAndUpdate(
    allocationRuleId,
    {
      $pull: {
        neighbourhoods: {
          _id: {
            $in: allocationRuleNeighbourhoodsId.split(","),
          },
        },
      },
    },
    function (err, allocationRuleNeighbourhoods) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!allocationRuleNeighbourhoods) {
        return res.status(400).json({error: 'No Neighbourhoods for specified allocation rule'})
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}

exports.allocationRuleCustomersList = async (req,res) => {
  const allocationRuleId=req.params.allocationRuleId
  let allocationRuleCustomers = await AllocationRule.findById(allocationRuleId,'customers', function(err, allocationRuleCustomers) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(!allocationRuleCustomers) {
          return res.status(400).json({error: 'No Customers for specified allocation rule'})
      }
      return res.json(allocationRuleCustomers);
    
  });
}
exports.allocationRuleCustomersDelete = async (req,res) => {
  const allocationRuleId = req.params.allocationRuleId;
  const allocationRuleCustomersId = req.params.allocationRuleCustomersId;
  
  let allocationRuleCustomers = await AllocationRule.findByIdAndUpdate(
    allocationRuleId,
    {
      $pull: {
        customers: {
          _id: {
            $in: allocationRuleCustomersId.split(","),
          },
        },
      },
    },
    function (err, allocationRuleCustomers) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!allocationRuleCustomers) {
        return res.status(400).json({error: 'No Customers for specified allocation rule'})
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}

exports.allocationRuleOperationsList = async (req,res) => {
  const allocationRuleId=req.params.allocationRuleId
  let allocationRuleOperations = await AllocationRule.findById(allocationRuleId,'operations', function(err, allocationRuleOperations) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(!allocationRuleOperations) {
          return res.status(400).json({error: 'No Operations for specified allocation rule'})
      }
      return res.json(allocationRuleOperations);
    
  });
}
exports.allocationRuleOperationsDelete = async (req,res) => {
  const allocationRuleId = req.params.allocationRuleId;
  const allocationRuleOperationsId = req.params.allocationRuleOperationsId;
  
  let allocationRuleOperations = await AllocationRule.findByIdAndUpdate(
    allocationRuleId,
    {
      $pull: {
        operations: {
          _id: {
            $in: allocationRuleOperationsId.split(","),
          },
        },
      },
    },
    function (err, allocationRuleOperations) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!allocationRuleOperations) {
        return res.status(400).json({error: 'No Operations for specified allocation rule'})
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}