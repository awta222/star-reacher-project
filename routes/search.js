const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');

const Equipment = require('../models/equipment.model');

routes.route('/').get((req,res) => {
    res.status(200).send
});

routes.route('/quickSearch/:searchString').get((req,res) => {
    let searchString = req.params.searchString;
    Equipment.find({"itemName": { $regex: searchString, $options: 'gim'}})
        .limit(10)
        .then(items => res.status(200).send(items))
        .catch(e => res.status(400).send(e));
});

routes.route('/fullSearch/').post((req,res) => {
    let parameters = req.body;
    let subfilterCount = 0;
    let query = {};

    if (parameters.itemName) {query['itemName'] = {$regex: parameters.itemName, $options: 'gim'}}
    if (parameters.category.length) {query['category'] = {$in: parameters.category}}
    if (parameters.Price) {query['Price'] = {$lte: Number(parameters.Price)}}
    if (parameters.Level.min || parameters.Level.max) {
        query['Level'] = {};
        if (parameters.Level.min) {query['Level'].$gte = Number(parameters.Level.min)}
        if (parameters.Level.max) {query['Level'].$lte = Number(parameters.Level.max)}
    }

    for (i=0;i<parameters.subfilters.length;i++) {
        subfilterCount += parameters.subfilters[i].values.length;
    }

    if (subfilterCount) {
        for (i=0;i<parameters.subfilters.length;i++) {
            if (parameters.subfilters[i].values.length) {
                let filterBy = parameters.subfilters[i].values.map((value) => {
                    return (Number(value)) ? Number(value) : value});
                query[parameters.subfilters[i].propName] = {$in: filterBy}
            }
        }
    }

    //console.log(query);

    Equipment.find(query).limit(100)
        .then((items) => {res.status(200).send(items)})
        .catch(e => res.status(400).send(e));
});

routes.route('/getItem/:itemId').get((req,res) => {
    let itemId = req.params.itemId;
    Equipment.findOne({"_id": itemId})
        .then(item => res.status(200).send(item))
        .catch(e => res.status(400).send(e));
});

routes.route('/getSubfilters/:category').get((req,res) => {
    var category = req.params.category;
    
    getSubfilterObject(category)
        .then((object) => {res.status(200).send(object)})
        .catch(e => res.status(400).send(e));
});

routes.route('/getItemList/:idList').get((req,res) => {
    var idList = req.params.idList.split(',').map(_id => mongoose.Types.ObjectId(_id));

    Equipment.find({'_id': {$in: idList}})
        .then((itemArray) => {res.status(200).send(itemArray)})
        .catch(e => res.status(400).send(e)); 
});

async function getSubfilterObject(category) {
    const categoryItems = await Equipment.find({category: category});
    const objectKeys = Object.keys(categoryItems[0].toJSON());
    const keysToRemove = ['_id','itemName','Price','Level','category'];
    var filterObject = [];

    for (k=0;k<keysToRemove.length;k++) {objectKeys.splice(objectKeys.indexOf(keysToRemove[k]), 1)}
    
    for (i=0;i<objectKeys.length;i++) {
        let unique = [...new Set(categoryItems.map(item => item.toJSON()[objectKeys[i]]))];
        if (unique.length <= 15 && unique.length != 1) 
            {filterObject.push({propName: objectKeys[i], uniqueArray: unique})}
    }

    return filterObject;
}

module.exports = routes;