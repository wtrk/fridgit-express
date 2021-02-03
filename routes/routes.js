const express = require('express')
const router = express.Router()
// import  controller
const usersControllers = require('../controllers/usersControllers')
const userTypesControllers = require('../controllers/userTypesControllers')
const userProfilesControllers = require('../controllers/userProfilesControllers')
const warehousesControllers = require('../controllers/warehousesControllers')
const allocationRulesControllers = require('../controllers/allocationRulesControllers')
const countriesControllers = require('../controllers/countriesControllers')
const citiesControllers = require('../controllers/citiesControllers')
const tiersControllers = require('../controllers/tiersControllers')
const neighbourhoodsControllers = require('../controllers/neighbourhoodsControllers')
const serviceTypesControllers = require('../controllers/serviceTypesControllers')
const suppliersControllers = require('../controllers/suppliersControllers')
const storesControllers = require('../controllers/storesControllers')
const cabinetsControllers = require('../controllers/cabinetsControllers')
const priceRulesControllers = require('../controllers/priceRulesControllers')

const neighbourhoodAliasControllers = require('../controllers/neighbourhoodAliasControllers')
const clientsControllers = require('../controllers/clientsControllers')

router.get("/clients", clientsControllers.clientsList)
router.get("/clients/:id", clientsControllers.clientDetails)
router.post("/clients", clientsControllers.clientAdd)
router.put("/clients/:id", clientsControllers.clientUpdate)
router.delete("/clients/:ids", clientsControllers.clientDelete)
router.put("/clientLegals/:clientId", clientsControllers.clientLegalAdd)
router.delete("/clientLegals/:clientId/:clientLegalId", clientsControllers.clientLegalDelete)
router.delete("/clientContacts/:clientId/:clientContactId", clientsControllers.clientContactDelete)
router.put("/clientContacts/:clientId", clientsControllers.clientContactAdd)

//Users Routes
router.get("/users", usersControllers.usersList)
router.get("/users/:id", usersControllers.userDetails)
router.get("/users/type/:typeId", usersControllers.userTypeDetails)
router.post("/users", usersControllers.userAdd)
router.put("/users/:id", usersControllers.userUpdate)
router.delete("/users/:ids", usersControllers.userDelete)

router.get("/userType", userTypesControllers.userTypesList)
router.post("/userType", userTypesControllers.userTypeAdd)
router.delete("/userType/:ids", userTypesControllers.userTypeDelete)

router.get("/userProfile", userProfilesControllers.userProfilesList)
router.get("/userProfile/:id", userProfilesControllers.userProfileDetails)
router.post("/userProfile", userProfilesControllers.userProfileAdd)
router.put("/userProfile/:id", userProfilesControllers.userProfileUpdate)
router.delete("/userProfile/:ids", userProfilesControllers.userProfileDelete)

router.get("/userProfile/privilege/:userProfileId", userProfilesControllers.userProfilePrivilegeList)
router.post("/userProfile/privilege/:userProfileId", userProfilesControllers.userProfilePrivilegeAdd)
router.put("/userProfile/privilege/:userProfileId/:pageId", userProfilesControllers.userProfilePrivilegeUpdate)
router.delete("/userProfile/privilege/:userProfileId/:pageId", userProfilesControllers.userProfilePrivilegeDelete)


router.get("/warehouses", warehousesControllers.warehousesList)
router.get("/warehouses/:id", warehousesControllers.warehouseDetails)
router.post("/warehouses", warehousesControllers.warehouseAdd)
router.put("/warehouses/:id", warehousesControllers.warehouseUpdate)
router.delete("/warehouses/:ids", warehousesControllers.warehouseDelete)

router.get("/allocationRules", allocationRulesControllers.allocationRulesList)
router.get("/allocationRules/:id", allocationRulesControllers.allocationRuleDetails)
router.post("/allocationRules", allocationRulesControllers.allocationRuleAdd)
router.put("/allocationRules/:id", allocationRulesControllers.allocationRuleUpdate)
router.delete("/allocationRules/:ids", allocationRulesControllers.allocationRuleDelete)

router.get("/allocationRulesCities/:allocationRuleId", allocationRulesControllers.allocationRuleCitiesList)
router.delete("/allocationRulesCities/:allocationRuleId/:allocationRuleCitiesId", allocationRulesControllers.allocationRuleCitiesDelete)
router.get("/allocationRulesNeighbourhoods/:allocationRuleId", allocationRulesControllers.allocationRuleNeighbourhoodsList)
router.delete("/allocationRulesNeighbourhoods/:allocationRuleId/:allocationRuleNeighbourhoodsId", allocationRulesControllers.allocationRuleNeighbourhoodsDelete)
router.get("/allocationRulesCustomers/:allocationRuleId", allocationRulesControllers.allocationRuleCustomersList)
router.delete("/allocationRulesCustomers/:allocationRuleId/:allocationRuleCustomersId", allocationRulesControllers.allocationRuleCustomersDelete)
router.get("/allocationRulesOperations/:allocationRuleId", allocationRulesControllers.allocationRuleOperationsList)
router.delete("/allocationRulesOperations/:allocationRuleId/:allocationRuleOperationsId", allocationRulesControllers.allocationRuleOperationsDelete)

router.get("/countries", countriesControllers.countriesList)
router.get("/countries/:id", countriesControllers.countryDetails)
router.post("/countries", countriesControllers.countryAdd)
router.put("/countries/:id", countriesControllers.countryUpdate)
router.delete("/countries/:ids", countriesControllers.countryDelete)

router.get("/cities", citiesControllers.citiesList)
router.get("/cities/:id", citiesControllers.cityDetails)
router.post("/cities", citiesControllers.cityAdd)
router.put("/cities/:id", citiesControllers.cityUpdate)
router.delete("/cities/:ids", citiesControllers.cityDelete)

router.get("/cityAlias/:cityId", citiesControllers.cityAliasList)
//router.post("/cityAlias/:cityId", citiesControllers.cityAliasAdd)
router.delete("/cityAlias/:cityId/:cityAliasName", citiesControllers.cityAliasDelete)

router.get("/tiers", tiersControllers.tiersList)
router.get("/tiers/:id", tiersControllers.tierDetails)
router.post("/tiers", tiersControllers.tierAdd)
router.put("/tiers/:id", tiersControllers.tierUpdate)
router.delete("/tiers/:ids", tiersControllers.tierDelete)

router.get("/tierCity/:tierId", tiersControllers.tierCityList)
router.delete("/tierCity/:tierId/:tierCityId", tiersControllers.tierCityDelete)
router.put("/tierCity/:tierId", tiersControllers.tierCityAdd)

router.get("/neighbourhoods", neighbourhoodsControllers.neighbourhoodsList)
router.get("/neighbourhoods/:id", neighbourhoodsControllers.neighbourhoodDetails)
router.post("/neighbourhoods", neighbourhoodsControllers.neighbourhoodAdd)
router.put("/neighbourhoods/:id", neighbourhoodsControllers.neighbourhoodUpdate)
router.delete("/neighbourhoods/:ids", neighbourhoodsControllers.neighbourhoodDelete)

router.get("/neighbourhoodAlias", neighbourhoodAliasControllers.neighbourhoodAliasList)
router.get("/neighbourhoodAlias/:id", neighbourhoodAliasControllers.neighbourhoodAliasDetails)
router.post("/neighbourhoodAlias", neighbourhoodAliasControllers.neighbourhoodAliasAdd)
router.put("/neighbourhoodAlias/:id", neighbourhoodAliasControllers.neighbourhoodAliasUpdate)
router.delete("/neighbourhoodAlias/:ids", neighbourhoodAliasControllers.neighbourhoodAliasDelete)

router.get("/serviceTypes", serviceTypesControllers.serviceTypesList)
router.get("/serviceTypes/:id", serviceTypesControllers.serviceTypeDetails)
router.post("/serviceTypes", serviceTypesControllers.serviceTypeAdd)
router.put("/serviceTypes/:id", serviceTypesControllers.serviceTypeUpdate)
router.delete("/serviceTypes/:ids", serviceTypesControllers.serviceTypeDelete)

router.get("/suppliers", suppliersControllers.suppliersList)
router.get("/suppliers/:id", suppliersControllers.supplierDetails)
router.post("/suppliers", suppliersControllers.supplierAdd)
router.put("/suppliers/:id", suppliersControllers.supplierUpdate)
router.delete("/suppliers/:ids", suppliersControllers.supplierDelete)

router.get("/stores", storesControllers.storesList)
router.get("/stores/:id", storesControllers.storeDetails)
router.post("/stores", storesControllers.storeAdd)
router.put("/stores/:id", storesControllers.storeUpdate)
router.delete("/stores/:ids", storesControllers.storeDelete)

router.get("/cabinets", cabinetsControllers.cabinetsList)
router.get("/cabinets/:id", cabinetsControllers.cabinetDetails)
router.post("/cabinets", cabinetsControllers.cabinetAdd)
router.put("/cabinets/:id", cabinetsControllers.cabinetUpdate)
router.delete("/cabinets/:ids", cabinetsControllers.cabinetDelete)

router.get("/priceRules", priceRulesControllers.priceRulesList)
router.get("/priceRules/:id", priceRulesControllers.priceRuleDetails)
router.post("/priceRules", priceRulesControllers.priceRuleAdd)
router.put("/priceRules/:id", priceRulesControllers.priceRuleUpdate)
router.delete("/priceRules/:ids", priceRulesControllers.priceRuleDelete)

router.get("/priceRulesCustomers/:priceRuleId", priceRulesControllers.priceRuleCustomersList)
router.delete("/priceRulesCustomers/:priceRuleId/:priceRulesCustomersId", priceRulesControllers.priceRuleCustomersDelete)

router.get("/priceRulesCountries/:priceRuleId", priceRulesControllers.priceRuleCountriesList)
router.delete("/priceRulesCountries/:priceRuleId/:priceRulesCountriesId", priceRulesControllers.priceRuleCountriesDelete)

router.get("/priceRulesCitiesIn/:priceRuleId", priceRulesControllers.priceRuleCitiesInList)
router.delete("/priceRulesCitiesIn/:priceRuleId/:priceRulesCitiesInId", priceRulesControllers.priceRuleCitiesInDelete)

router.get("/priceRulesCitiesOut/:priceRuleId", priceRulesControllers.priceRuleCitiesOutList)
router.delete("/priceRulesCitiesOut/:priceRuleId/:priceRulesCitiesOutId", priceRulesControllers.priceRuleCitiesOutDelete)

router.get("/priceRulesNeighbourhoodsIn/:priceRuleId", priceRulesControllers.priceRuleNeighbourhoodsInList)
router.delete("/priceRulesNeighbourhoodsIn/:priceRuleId/:priceRulesNeighbourhoodsInId", priceRulesControllers.priceRuleNeighbourhoodsInDelete)

router.get("/priceRulesNeighbourhoodsOut/:priceRuleId", priceRulesControllers.priceRuleNeighbourhoodsOutList)
router.delete("/priceRulesNeighbourhoodsOut/:priceRuleId/:priceRulesNeighbourhoodsOutId", priceRulesControllers.priceRuleNeighbourhoodsOutDelete)

router.get("/priceRulesTiersIn/:priceRuleId", priceRulesControllers.priceRuleTiersInList)
router.delete("/priceRulesTiersIn/:priceRuleId/:priceRulesTiersInId", priceRulesControllers.priceRuleTiersInDelete)

router.get("/priceRulesTiersOut/:priceRuleId", priceRulesControllers.priceRuleTiersOutList)
router.delete("/priceRulesTiersOut/:priceRuleId/:priceRulesTiersOutId", priceRulesControllers.priceRuleTiersOutDelete)

module.exports = router