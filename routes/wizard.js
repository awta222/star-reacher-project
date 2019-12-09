const express = require('express');
const routes = express.Router();

const Race = require('../models/races.model'),
Theme = require('../models/themes.model'),
Lists = require('../models/lists.model'),
RaceDesc = require('../models/raceDesc.model');

const raceTabTemplates = require('../templates/raceTabContent');

routes.route('/lists').get((req,res) => {
    Lists.find().then((lists) => {
        res.status(200).send(lists);
    }).catch((e) => {response.status(400).send(e)});
});

routes.route('/raceDesc').post((req,res) => {
    let query = {'Source': {$in: req.body}};

    RaceDesc.find().lean().then((raceDesc) => {
        let raceNames = raceDesc.map(race => race.raceName);
        let content = {
            listItems: raceTabTemplates.raceList(raceNames),
            tabContent: raceTabTemplates.raceTabContents(raceDesc)
        };
        res.status(200).send(content);
    }).catch((e) => {response.status(400).send(e)});
});

//baseAS builder
routes.route('/baseAS/:raceId-:themeId').get((req,res) => {

    let raceId = Number(req.params.raceId),
    themeId = Number(req.params.themeId);

    Race.findOne({id: raceId}).then((race) => {
        Theme.findOne({id: themeId}).then((theme) => {
            let baseAS = Array(6).fill(10); //base 10 array
            for (i=0;i<6;i++) {baseAS[i] += race.AS[i]} //apply raceAS
            baseAS[theme.ASBonusIndex]++; //lookup theme AS bonus and add 1
            res.status(200).send(baseAS);
        })
    }).catch((err) => {res.status(400).send(err)});
        
});

module.exports = routes;
