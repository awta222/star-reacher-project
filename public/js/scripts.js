function importTest() {
    let imports = require('./charGen');
    console.log(imports.test);
}

var sections = {
    preferences: document.getElementById("preferences-section"),
    race: document.getElementById("race-section"),
    theme: document.getElementById("theme-section"),
    class: document.getElementById("class-section"),
    abilityScores: document.getElementById("ability-scores-section"),
    classChoices: document.getElementById("class-choices-section"),
    skills: document.getElementById("skills-section"),
    feats: document.getElementById("feats-section"),
    equipment: document.getElementById("equipment-section")
};

var tabs = {
    preferences: document.getElementById("preferences-tab"),
    race: document.getElementById("race-tab"),
    theme: document.getElementById("theme-tab"),
    class: document.getElementById("class-tab"),
    abilityScores: document.getElementById("ability-scores-tab"),
    classChoices: document.getElementById("class-choices-tab"),
    skills: document.getElementById("skills-tab"),
    feats: document.getElementById("feats-tab"),
    equipment: document.getElementById("equipment-tab")
};

//all relevant inputs stored as functions that get the value live
var charInput = {
    name() {return document.getElementById('char-name-entry').value},
    race() {return getSelectedRace()}
};

//array of all the clickable race buttons in the race tab; find active one to get selected race
var raceList = document.getElementById("race-list").getElementsByTagName('*');

//returns selected race as string
function getSelectedRace() {
    for (i=0; i<raceList.length; i++) {
        if (raceList[i].classList.contains('active')) {return raceList[i].innerHTML}
    }  
}

//bucket to hold current tab statuses
var isTabLocked = [
    [tabs.race, true], [tabs.theme, true], [tabs.class, true], 
    [tabs.abilityScores, true], [tabs.classChoices, true], 
    [tabs.skills, true], [tabs.feats, true], [tabs.equipment, true]
];

//validation functions use this function to lock/unlock the desired tab
function updateTabLock(tabId,isLocked) {
    var tab = isTabLocked.find((e) => {return e[0].id === tabId});
    if (tab[1] === isLocked) {return} 
        else {
            tab[1] = isLocked;
            if (isLocked) {  //if locking the tab...
                tab[0].setAttribute("disabled","disabled");
                tab[0].classList.add("disabled");
                tab[0].innerHTML = '<i class="fas fa-lock"></i>' + tab[0].innerHTML; 
            } else {   //if unlocking the tab...
                tab[0].removeAttribute("disabled");
                tab[0].classList.remove("disabled");
                tab[0].innerHTML = tab[0].innerHTML.replace('<i class="fas fa-lock"></i>','');
            }
        }    
}

function unlockAllTabs() { //for testing purposes
    for (i=0; i<isTabLocked.length; i++) {updateTabLock(isTabLocked[i][0].id,false)}
}

//validation functions use this function to check whether all required fields are there
function tabComplete(requiredFields) {return !requiredFields.some(x => !x)}

//tab validation functions
function prefTabValidate() {
    var requiredFields = [charInput.name()];
    if (tabComplete(requiredFields)) {updateTabLock(tabs.race.id,false)}
        else {updateTabLock(tabs.race.id,true)}
}

function raceTabValidate() {
    var requiredFields = [charInput.race()];
    if (tabComplete(requiredFields)) {updateTabLock(tabs.theme.id,false)}
        else {updateTabLock(tabs.theme.id,true)}
}

function clearSections() {
    var wizardSections = document.querySelectorAll(".wizard-section");
    for (i=0; i < wizardSections.length; i++) {
        wizardSections[i].classList.remove("active-section");
    }
}

function clearPrimaryTab () {
    var wizardTabs = document.querySelectorAll(".btn-tab");
    for (i=0; i < wizardTabs.length; i++) {
        wizardTabs[i].classList.remove("btn-primary");
    }
}

function preferencesTabSelect () {
    if (sections.preferences.classList.contains("active-section")) {
    } else {
        clearSections();
        sections.preferences.classList.add("active-section");
        clearPrimaryTab();
        tabs.preferences.classList.add("btn-primary");
    } 
}

function raceTabSelect() {
    if (sections.race.classList.contains("active-section")) {
    } else {
        clearSections();
        sections.race.classList.add("active-section");
        clearPrimaryTab();
        tabs.race.classList.add("btn-primary");
    } 
}

function themeTabSelect () {
    if (sections.theme.classList.contains("active-section")) {
    } else {
        clearSections();
        sections.theme.classList.add("active-section");
        clearPrimaryTab();
        tabs.theme.classList.add("btn-primary");
    } 
}

function classTabSelect () {
    if (sections.class.classList.contains("active-section")) {
    } else {
        clearSections();
        sections.class.classList.add("active-section");
        clearPrimaryTab();
        tabs.class.classList.add("btn-primary");
    } 
}

function abilityScoresTabSelect () {
    if (sections.abilityScores.classList.contains("active-section")) {
    } else {
        clearSections();
        sections.abilityScores.classList.add("active-section");
        clearPrimaryTab();
        tabs.abilityScores.classList.add("btn-primary");
    } 
}

function classChoicesTabSelect () {
    if (sections.classChoices.classList.contains("active-section")) {
    } else {
        clearSections();
        sections.classChoices.classList.add("active-section");
        clearPrimaryTab();
        tabs.classChoices.classList.add("btn-primary");
    } 
}

function skillsTabSelect () {
    if (sections.skills.classList.contains("active-section")) {
    } else {
        clearSections();
        sections.skills.classList.add("active-section");
        clearPrimaryTab();
        tabs.skills.classList.add("btn-primary");
    } 
}
function featsTabSelect () {
    if (sections.feats.classList.contains("active-section")) {
    } else {
        clearSections();
        sections.feats.classList.add("active-section");
        clearPrimaryTab();
        tabs.feats.classList.add("btn-primary");
    } 
}

function equipmentTabSelect () {
    if (sections.equipment.classList.contains("active-section")) {
    } else {
        clearSections();
        sections.equipment.classList.add("active-section");
        clearPrimaryTab();
        tabs.equipment.classList.add("btn-primary");
    } 
}



