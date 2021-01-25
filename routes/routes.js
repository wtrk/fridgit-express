const express = require('express')
const router = express.Router()
// import  controller
const usersControllers = require('../controllers/usersControllers')
const userTypesControllers = require('../controllers/userTypesControllers')
const userProfilesControllers = require('../controllers/userProfilesControllers')
const warehousesControllers = require('../controllers/warehousesControllers')
const countriesControllers = require('../controllers/countriesControllers')
const citiesControllers = require('../controllers/citiesControllers')
const tiersControllers = require('../controllers/tiersControllers')
const neighbourhoodsControllers = require('../controllers/neighbourhoodsControllers')
const serviceTypesControllers = require('../controllers/serviceTypesControllers')
const suppliersControllers = require('../controllers/suppliersControllers')

//Users Routes
router.get("/users", usersControllers.usersList)
router.get("/users/:id", usersControllers.userDetails)
router.post("/users", usersControllers.userAdd)
router.put("/users/:id", usersControllers.userUpdate)
router.delete("/users/:ids", usersControllers.userDelete)

router.get("/userType", userTypesControllers.userTypesList)
router.post("/userType", userTypesControllers.userTypeAdd)

router.get("/userProfile", userProfilesControllers.userProfilesList)
router.get("/userProfile/:id", userProfilesControllers.userProfileDetails)
router.post("/userProfile", userProfilesControllers.userProfileAdd)
router.put("/userProfile/:id", userProfilesControllers.userProfileUpdate)
router.delete("/userProfile/:ids", userProfilesControllers.userProfileDelete)

router.get("/warehouses", warehousesControllers.warehousesList)
router.get("/warehouses/:id", warehousesControllers.warehouseDetails)
router.post("/warehouses", warehousesControllers.warehouseAdd)
router.put("/warehouses/:id", warehousesControllers.warehouseUpdate)
router.delete("/warehouses/:ids", warehousesControllers.warehouseDelete)

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

router.get("/tiers", tiersControllers.tiersList)
router.get("/tiers/:id", tiersControllers.tierDetails)
router.post("/tiers", tiersControllers.tierAdd)
router.put("/tiers/:id", tiersControllers.tierUpdate)
router.delete("/tiers/:ids", tiersControllers.tierDelete)

router.get("/neighbourhoods", neighbourhoodsControllers.neighbourhoodsList)
router.get("/neighbourhoods/:id", neighbourhoodsControllers.neighbourhoodDetails)
router.post("/neighbourhoods", neighbourhoodsControllers.neighbourhoodAdd)
router.put("/neighbourhoods/:id", neighbourhoodsControllers.neighbourhoodUpdate)
router.delete("/neighbourhoods/:ids", neighbourhoodsControllers.neighbourhoodDelete)

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

module.exports = router