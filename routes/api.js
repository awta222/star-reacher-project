const express = require('express');
const routes = express.Router();

let Race = require('../models/races.model'),
Theme = require('../models/themes.model');

routes.route('/raceAS/:id').get((req,res) => {
    let raceId = Number(req.params.id);
    
    Race.findOne({id: raceId}).then((race) => {
        res.status(200).send(race.AS);
    }).catch((err) => {res.status(400).send(err)});

});

routes.route('/baseAS/:raceId-:themeId').get((req,res) => {
    let raceId = Number(req.params.raceId),
    themeId = Number(req.params.themeId);

    Race.findOne({id: raceId}).then((race) => {
        Theme.findOne({id: themeId}).then((theme) => {
            let baseAS = race.AS; 
            baseAS[theme.ASBonusIndex]++;
            res.status(200).send(baseAS);
        })
    }).catch((err) => {res.status(400).send(err)});
        
});

module.exports = routes;
