const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const app = express();

const ejs = require('ejs');
const fs = require('fs');

const searchTemplates = require('../templates/searchResults');

const Equipment = require('../models/equipment.model');

routes.route('/quickSearch/:searchString').get((req,res) => {
    let searchString = req.params.searchString;
    Equipment.find({"itemName": { $regex: searchString, $options: 'gim'}})
        .limit(10).lean()
        .then(items => res.status(200).send(items))
        .catch(e => res.status(400).send(e));
});
 
routes.route('/ejsTest/').post((req,res) => {
    let query = buildQueryObject(req.body);
    
    Equipment.find(query).limit(100).lean()
        .then((items) => {
            let html = searchTemplates.fullSearch(items);
            console.log(html);
            res.status(200).send(html);
/*             fs.readFile('./views/fullSearchResults.ejs', 'utf8', (err,template) => {
                if (err) throw err;
                console.log(items);
                let html = ejs.render(template, {results: items});
                console.log(html);
                //res.set('Content-Type', 'text/html');
                res.status(200).send(html);
            }); */
            
        })
        .catch(e => res.status(400).send(e));
}); 

routes.route('/fullSearch/').post((req,res) => {
    let query = buildQueryObject(req.body);

    Equipment.find(query).limit(100).lean()
        .then((items) => {res.status(200).send(items)})
        .catch(e => res.status(400).send(e));
});

routes.route('/getItem/:itemId').get((req,res) => {
    let itemId = req.params.itemId;
    Equipment.findOne({"_id": itemId}).lean()
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

    Equipment.find({'_id': {$in: idList}}).lean()
        .then((itemArray) => {res.status(200).send(itemArray)})
        .catch(e => res.status(400).send(e)); 
});

function buildQueryObject(query) {
    let subfilterCount = 0;
    let queryObject = {};

    if (query.itemName) {queryObject['itemName'] = {$regex: query.itemName, $options: 'gim'}}
    if (query.category.length) {queryObject['category'] = {$in: query.category}}
    if (query.Price) {queryObject['Price'] = {$lte: Number(query.Price)}}
    if (query.Level.min || query.Level.max) {
        queryObject['Level'] = {};
        if (query.Level.min) {queryObject['Level'].$gte = Number(query.Level.min)}
        if (query.Level.max) {queryObject['Level'].$lte = Number(query.Level.max)}
    }

    for (i=0;i<query.subfilters.length;i++) {
        subfilterCount += query.subfilters[i].values.length;
    }

    if (subfilterCount) {
        for (i=0;i<query.subfilters.length;i++) {
            if (query.subfilters[i].values.length) {
                let filterBy = query.subfilters[i].values.map((value) => {
                    return (Number(value)) ? Number(value) : value});
                    queryObject[query.subfilters[i].propName] = {$in: filterBy}
            }
        }
    }

    console.log(queryObject);

    return queryObject;
}

async function getSubfilterObject(category) {
    const categoryItems = await Equipment.find({category: category}).lean();
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