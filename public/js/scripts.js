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

//contains tab locked/unlocked statuses
var isTabLocked = [
    [tabs.race, true], [tabs.theme, true], [tabs.class, true], 
    [tabs.abilityScores, true], [tabs.classChoices, true], 
    [tabs.skills, true], [tabs.feats, true], [tabs.equipment, true]
];

//will hold subdecision info for all tabs to use...?
var subdecisions = {
    race: [
        {
            raceName: "Lashunta",
            selectLabel: "Select Dimorph:",
            options: [
                {text: "Damaya", desc: "+2 Int, -2 Con"},
                {text: "Korasha", desc: "+2 Str, -2 Wis"}
            ]
        }
    ]
};

//array of race list items from race-list div
var raceList = Array.from(document.getElementById("race-list").getElementsByTagName('*'));

//holds character selections
var charInput = {
    name() {return document.getElementById('char-name-entry').value},
    race: ""
};


// --- tab switching stuff --- //
function clearSections() {
    let wizardSections = document.querySelectorAll(".wizard-section");
    for (i=0; i < wizardSections.length; i++) {
        wizardSections[i].classList.remove("active-section");
    }
}

function clearPrimaryTab() {
    let wizardTabs = document.querySelectorAll(".btn-tab");
    for (i=0; i < wizardTabs.length; i++) {
        wizardTabs[i].classList.remove("btn-primary");
    }
}

function tabSelect(tabName) {
    var section = sections[tabName], tab = tabs[tabName];
    if (!section.classList.contains("active-section")) {
        clearSections();
        section.classList.add("active-section");
        clearPrimaryTab();
        tab.classList.add("btn-primary");
    } 
}


// --- race tab stuff --- //

function selectRace(buttonElement) {
    if (charInput.race != buttonElement.id) {
        var checkIcon = '<i class="fas fa-check"></i>';
        if (charInput.race) {
            let previousRaceButton = document.getElementById(charInput.race);
            let previousListItem = raceList.find((item) => {return item.innerHTML.includes(charInput.race)});
            previousRaceButton.innerHTML = "Select This Race";
            previousListItem.innerHTML = previousListItem.innerHTML.replace(checkIcon,'');
        }
        charInput.race = buttonElement.id; 
        buttonElement.innerHTML = "Selected  "+checkIcon;
        let newRaceListItem = raceList.find((e) => {return e.innerHTML == buttonElement.id})
        newRaceListItem.innerHTML += checkIcon;
    }
    
    lockController(tabs.race.id,true);
}

function getRaceSubdecisions(raceName) {
    var decisions = subdecisions.race.filter(decision => decision.raceName == raceName);
    if (!decisions.length) {return}
        else {return decisions}
}

// --- validation stuff --- //

//locks/unlocks the desired tab
function updateTabLock(tabId,isLocked) {
    var tab = isTabLocked.find((e) => {return e[0].id === tabId});
    if (tab[1] === isLocked) {return} 
        else {
            tab[1] = isLocked;
            var lockIcon = '<i class="fas fa-lock"></i>';
            if (isLocked) {
                tab[0].setAttribute("disabled","disabled");
                tab[0].classList.add("disabled");
                tab[0].innerHTML = lockIcon + tab[0].innerHTML; 
            } else {
                tab[0].removeAttribute("disabled");
                tab[0].classList.remove("disabled");
                tab[0].innerHTML = tab[0].innerHTML.replace(lockIcon,'');
            }
        }    
}

//when a tab is complete, unlocks next tab. When incomplete, locks all subsequent tabs
function lockController(tabId,isComplete) {
    let tabOrder = ["preferences-tab","race-tab","theme-tab","class-tab","ability-scores-tab",
    "class-choices-tab","skills-tab","feats-tab","equipment-tab"];

    let nextTabIndex = tabOrder.indexOf(tabId) + 1;

    if (isComplete) {updateTabLock(tabOrder[nextTabIndex],false)}
        else {for (i=nextTabIndex; i<tabOrder.length; i++) {updateTabLock(tabOrder[i],true)}}
}

//for testing purposes
function unlockAllTabs() {for (i=0;i<isTabLocked.length;i++) {updateTabLock(isTabLocked[i][0].id,false)}}

//returns boolean for whether all required fields are present
function tabComplete(requiredFields) {return !requiredFields.some(x => !x)}


//tab validation
function prefTabValidate() {
    let requiredFields = [charInput.name()];
    if (tabComplete(requiredFields)) {lockController(tabs.preferences.id,true)}
        else {lockController(tabs.preferences.id,false)}
}




