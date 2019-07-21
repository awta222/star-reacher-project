const express = require('express');
const routes = express.Router();

let Race = require('../models/races.model'),
Theme = require('../models/themes.model');

routes.route('/raceAS/:raceId').get((req,res) => {
    let raceId = Number(req.params.raceId);
    
    Race.findOne({id: raceId}).then((race) => {
        res.status(200).send(race.AS);
    }).catch((err) => {res.status(400).send(err)});

});

routes.route('/baseAS/:raceId-:themeId').get((req,res) => {
    let raceId = Number(req.params.raceId),
    themeId = Number(req.params.themeId);

    Race.findOne({id: raceId}).then((race) => {
        Theme.findOne({id: themeId}).then((theme) => {
            let baseAS = Array(6).fill(10); //base 10 array
            for (i=0;i<6;i++) {baseAS[i] += race.AS[i]} //apply raceAS
            baseAS[theme.ASBonusIndex]++; //lookup AS bonus by theme and +1
            res.status(200).send(baseAS);
        })
    }).catch((err) => {res.status(400).send(err)});
        
});

module.exports = routes;
