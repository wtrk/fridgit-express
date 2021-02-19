const PriceRule = require('../models/priceRules')

exports.priceRuleAdd = async (req,res) => {
  let newPriceRule = await PriceRule.insertMany(req.body, function(err, priceRules) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}
exports.priceRulesList = async (req,res) => {
  let priceRules = await PriceRule.find({}, null, {sort: { 'priority' : 1,'updatedAt' : -1 }}, function(err, priceRules) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(priceRules.length===0) {
          return res.status(400).json({error: 'No price rules in the database'})
      }
      return res.json(priceRules);
    
  });
}
exports.priceRuleDetails = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let priceRule = await PriceRule.findById(req.param('id'), function(err, priceRule) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (priceRule===null) {
      return res.status(400)
        .json({ error: "Price rule not available in the database" });
    }
    return res.json(priceRule);
  });
}
exports.priceRuleUpdate = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let priceRule = await PriceRule.findByIdAndUpdate(req.param('id'), req.body[0], function(err, priceRule) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (priceRule===null) {
      return res
        .status(400)
        .json({ error: "Price rule not available in the database" });
    }
    return res.json(priceRule);
  });
  
}
exports.priceRuleDelete = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let priceRule = await PriceRule.deleteMany(
    {
      _id: {
        $in: req.params.ids.split(",")

      }
      }, function(err, priceRule) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (priceRule.n === 0) {
          return res
            .status(400)
            .json({ error: "Price rules not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}


exports.priceRuleFromCityIn = async (req,res) => {
  const cityName = req.params.cityName;
  let priceRule = await PriceRule.find({ citiesIn: { $elemMatch: { name: cityName } } }, function(err, priceRule) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(priceRule);
  });
}
exports.priceRuleFromCityOut = async (req,res) => {
  const cityName = req.params.cityName;
  let priceRule = await PriceRule.find({ citiesOut: { $elemMatch: { name: cityName } } }, function(err, priceRule) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(priceRule);
  });
}
exports.priceRuleFromCityInOut = async (req,res) => {
  const cityInName = req.params.cityInName;
  const cityOutName = req.params.cityOutName;
  let priceRule = await PriceRule.find({ citiesIn: { $elemMatch: { name: cityInName } },citiesOut: { $elemMatch: { name: cityOutName } } }, function(err, priceRule) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(priceRule);
  });
}

exports.priceRuleFromClient = async (req,res) => {
  const clientName = req.params.clientName;
  let priceRule = await PriceRule.find({ clients: { $elemMatch: { name: clientName } } }, function(err, priceRule) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(priceRule);
  });
}

exports.priceRuleCustomersList = async (req,res) => {
  const priceRuleId=req.params.priceRuleId
  let priceRuleCustomers = await PriceRule.findById(priceRuleId,'customers', function(err, priceRuleCustomers) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(!priceRuleCustomers) {
          return res.status(400).json({error: 'No Customers for specified price rule'})
      }
      return res.json(priceRuleCustomers);
    
  });
}
exports.priceRuleCustomersDelete = async (req,res) => {
  const priceRuleId = req.params.priceRuleId;
  const priceRuleCustomersId = req.params.priceRuleCustomersId;
  
  let priceRuleCustomers = await PriceRule.findByIdAndUpdate(
    priceRuleId,
    {
      $pull: {
        customers: {
          _id: {
            $in: priceRuleCustomersId.split(","),
          },
        },
      },
    },
    function (err, priceRuleCustomers) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!priceRuleCustomers) {
        return res.status(400).json({error: 'No Customers for specified price rule'})
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}

exports.priceRuleCountriesList = async (req,res) => {
  const priceRuleId=req.params.priceRuleId
  let priceRuleCountries = await PriceRule.findById(priceRuleId,'countries', function(err, priceRuleCountries) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(!priceRuleCountries) {
          return res.status(400).json({error: 'No Countries for specified price rule'})
      }
      return res.json(priceRuleCountries);
    
  });
}
exports.priceRuleCountriesDelete = async (req,res) => {
  const priceRuleId = req.params.priceRuleId;
  const priceRuleCountriesId = req.params.priceRuleCountriesId;
  
  let priceRuleCountries = await PriceRule.findByIdAndUpdate(
    priceRuleId,
    {
      $pull: {
        countries: {
          _id: {
            $in: priceRuleCountriesId.split(","),
          },
        },
      },
    },
    function (err, priceRuleCountries) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!priceRuleCountries) {
        return res.status(400).json({error: 'No Countries for specified price rule'})
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}

exports.priceRuleCitiesInList = async (req,res) => {
  const priceRuleId=req.params.priceRuleId
  let priceRuleCitiesIn = await PriceRule.findById(priceRuleId,'citiesIn', function(err, priceRuleCitiesIn) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(!priceRuleCitiesIn) {
          return res.status(400).json({error: 'No Cities In for specified price rule'})
      }
      return res.json(priceRuleCitiesIn);
    
  });
}
exports.priceRuleCitiesInDelete = async (req,res) => {
  const priceRuleId = req.params.priceRuleId;
  const priceRuleCitiesInId = req.params.priceRuleCitiesInId;

  let priceRuleCitiesIn = await PriceRule.findByIdAndUpdate(
    priceRuleId,
    {
      $pull: {
        citiesIn: {
          _id: {
            $in: priceRuleCitiesInId.split(","),
          },
        },
      },
    },
    function (err, priceRuleCitiesIn) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!priceRuleCitiesIn) {
        return res.status(400).json({error: 'No CitiesIn for specified price rule'})
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}
exports.priceRuleCitiesOutList = async (req,res) => {
  const priceRuleId=req.params.priceRuleId
  let priceRuleCitiesOut = await PriceRule.findById(priceRuleId,'citiesOut', function(err, priceRuleCitiesOut) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(!priceRuleCitiesOut) {
          return res.status(400).json({error: 'No Cities Out for specified price rule'})
      }
      return res.json(priceRuleCitiesOut);
    
  });
}
exports.priceRuleCitiesOutDelete = async (req,res) => {
  const priceRuleId = req.params.priceRuleId;
  const priceRuleCitiesOutId = req.params.priceRuleCitiesOutId;

  let priceRuleCitiesOut = await PriceRule.findByIdAndUpdate(
    priceRuleId,
    {
      $pull: {
        citiesOut: {
          _id: {
            $in: priceRuleCitiesOutId.split(","),
          },
        },
      },
    },
    function (err, priceRuleCitiesOut) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!priceRuleCitiesOut) {
        return res.status(400).json({error: 'No CitiesOut for specified price rule'})
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}

exports.priceRuleNeighbourhoodsInList = async (req,res) => {
  const priceRuleId=req.params.priceRuleId
  let priceRuleNeighbourhoodsIn = await PriceRule.findById(priceRuleId,'neighbouthoodsIn', function(err, priceRuleNeighbourhoodsIn) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(!priceRuleNeighbourhoodsIn) {
          return res.status(400).json({error: 'No Neighbourhoods In for specified price rule'})
      }
      return res.json(priceRuleNeighbourhoodsIn);
    
  });
}
exports.priceRuleNeighbourhoodsInDelete = async (req,res) => {
  const priceRuleId = req.params.priceRuleId;
  const priceRuleNeighbourhoodsInId = req.params.priceRuleNeighbourhoodsInId;

  let priceRuleNeighbourhoodsIn = await PriceRule.findByIdAndUpdate(
    priceRuleId,
    {
      $pull: {
        neighbouthoodsIn: {
          _id: {
            $in: priceRuleNeighbourhoodsInId.split(","),
          },
        },
      },
    },
    function (err, priceRuleNeighbourhoodsIn) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!priceRuleNeighbourhoodsIn) {
        return res.status(400).json({error: 'No NeighbourhoodsIn for specified price rule'})
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}
exports.priceRuleNeighbourhoodsOutList = async (req,res) => {
  const priceRuleId=req.params.priceRuleId
  let priceRuleNeighbourhoodsOut = await PriceRule.findById(priceRuleId,'neighbouthoodsOut', function(err, priceRuleNeighbourhoodsOut) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(!priceRuleNeighbourhoodsOut) {
          return res.status(400).json({error: 'No Neighbourhoods Out for specified price rule'})
      }
      return res.json(priceRuleNeighbourhoodsOut);
    
  });
}
exports.priceRuleNeighbourhoodsOutDelete = async (req,res) => {
  const priceRuleId = req.params.priceRuleId;
  const priceRuleNeighbourhoodsOutId = req.params.priceRuleNeighbourhoodsOutId;

  let priceRuleNeighbourhoodsOut = await PriceRule.findByIdAndUpdate(
    priceRuleId,
    {
      $pull: {
        neighbouthoodsOut: {
          _id: {
            $in: priceRuleNeighbourhoodsOutId.split(","),
          },
        },
      },
    },
    function (err, priceRuleNeighbourhoodsOut) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!priceRuleNeighbourhoodsOut) {
        return res.status(400).json({error: 'No NeighbourhoodsOut for specified price rule'})
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}

exports.priceRuleTiersInList = async (req,res) => {
  const priceRuleId=req.params.priceRuleId
  let priceRuleTiersIn = await PriceRule.findById(priceRuleId,'tiersIn', function(err, priceRuleTiersIn) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(!priceRuleTiersIn) {
          return res.status(400).json({error: 'No Tiers In for specified price rule'})
      }
      return res.json(priceRuleTiersIn);
    
  });
}
exports.priceRuleTiersInDelete = async (req,res) => {
  const priceRuleId = req.params.priceRuleId;
  const priceRuleTiersInId = req.params.priceRuleTiersInId;

  let priceRuleTiersIn = await PriceRule.findByIdAndUpdate(
    priceRuleId,
    {
      $pull: {
        tiersIn: {
          _id: {
            $in: priceRuleTiersInId.split(","),
          },
        },
      },
    },
    function (err, priceRuleTiersIn) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!priceRuleTiersIn) {
        return res.status(400).json({error: 'No TiersIn for specified price rule'})
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}
exports.priceRuleTiersOutList = async (req,res) => {
  const priceRuleId=req.params.priceRuleId
  let priceRuleTiersOut = await PriceRule.findById(priceRuleId,'tiersOut', function(err, priceRuleTiersOut) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(!priceRuleTiersOut) {
          return res.status(400).json({error: 'No Tiers Out for specified price rule'})
      }
      return res.json(priceRuleTiersOut);
    
  });
}
exports.priceRuleTiersOutDelete = async (req,res) => {
  const priceRuleId = req.params.priceRuleId;
  const priceRuleTiersOutId = req.params.priceRuleTiersOutId;

  let priceRuleTiersOut = await PriceRule.findByIdAndUpdate(
    priceRuleId,
    {
      $pull: {
        tiersOut: {
          _id: {
            $in: priceRuleTiersOutId.split(","),
          },
        },
      },
    },
    function (err, priceRuleTiersOut) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!priceRuleTiersOut) {
        return res.status(400).json({error: 'No TiersOut for specified price rule'})
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}


