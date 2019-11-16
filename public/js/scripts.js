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


//holds character selections
var charInput = {
    name() {return document.getElementById('char-name-entry').value},
    race: {name: "", subdecisions: ""}
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
    updateNextPrev();
}

function getCurrentTab() {
    for (var section in sections) {
        if (sections[section].classList.contains("active-section")) {
            var sectionName = sections[section].id;
            sectionName = sectionName.replace('-section','');
        }
    }
    return sectionName;
}

function currentTabLockIndex() {
    if (getCurrentTab() == 'preferences') {return -1}
        else {
            let currentTabId = getCurrentTab()+"-tab";
            let tabLockItem = isTabLocked.find((e) => {return e[0].id == currentTabId});
            return isTabLocked.indexOf(tabLockItem);
        }
}

function updateNextPrev() {
    let currentTabName = getCurrentTab();
    let nextTabIsLocked = isTabLocked[currentTabLockIndex() + 1][1];

    if (currentTabName == 'preferences') {disableElement('previous',true)}
        else {disableElement('previous',false)}

    if (nextTabIsLocked) {disableElement('next',true)}
        else {disableElement('next',false)}
}

function disableElement(elementId,toDisable) {
    let e = document.getElementById(elementId);
    if (e.hasAttribute('disabled') != toDisable) {
        if (toDisable) {e.setAttribute('disabled','disabled')}
            else {e.removeAttribute('disabled')}
    }
}

function nextTab() {
    let nextTabName = isTabLocked[currentTabLockIndex() + 1][0].id;
    nextTabName = nextTabName.replace('-tab','');
    tabSelect(nextTabName);
}

function previousTab() {
    if (getCurrentTab() != 'race') {
        let previousTabName = isTabLocked[currentTabLockIndex() - 1][0].id;
        previousTabName = previousTabName.replace('-tab','');
        tabSelect(previousTabName);
    } else {tabSelect('preferences')}
}


// --- race tab stuff --- //

function selectRace(buttonElement) {
    if (charInput.race.name != buttonElement.id) {
        var raceList = Array.from(document.getElementById("race-list").getElementsByTagName('*'));
        var checkIcon = '<i class="fas fa-check"></i>';
        if (charInput.race.name) {
            let previousRaceButton = document.getElementById(charInput.race.name);
            let previousListItem = raceList.find((item) => {return item.innerHTML.includes(charInput.race.name)});
            previousRaceButton.innerHTML = "Select This Race";
            previousListItem.innerHTML = previousListItem.innerHTML.replace(checkIcon,'');
        }
        charInput.race.name = buttonElement.id; 
        buttonElement.innerHTML = "Selected  "+checkIcon;
        let newRaceListItem = raceList.find((e) => {return e.innerHTML == buttonElement.id});
        newRaceListItem.innerHTML += checkIcon;
    }

    //if this race's race-select-pane has a hidden subdecision section...
    if (buttonElement.parentElement.children['subdecisions']) {
        charInput.race.subdecisions = "";
        
        let raceSelectPane = buttonElement.parentElement;
        let subdecisions = raceSelectPane.children['subdecisions'];
        let tabPane = raceSelectPane.parentElement;
        
        subdecisions.removeAttribute('hidden');

        //tabPane height = 775
        let newTabPaneHeight = 775 - (raceSelectPane.offsetHeight - 75); console.log(newTabPaneHeight);
        tabPane.setAttribute('style','height:'+newTabPaneHeight+'px');
        raceSelectPane.setAttribute('style','background-color: #c8daff;');
    } else {
        charInput.race.subdecisions = "";
        document.querySelectorAll("#subdecisions").forEach((e) => {
            e.setAttribute('hidden',''); 
            e.parentElement.removeAttribute('style');
        });

        Array.from(document.getElementsByClassName('tab-pane'))
            .forEach(e => e.removeAttribute('style'));
    }

    raceTabValidate();
}

// shows/hides the appropriate subdecision detail in the gray div
// subdecision details are placed in spans since they are meant to be inline text
function subdecisionSelect(dropdown) { 
    var spanArray = dropdown.parentElement.getElementsByTagName('span'); //array of all spans in this section
    var selectedSpan = spanArray[dropdown.options[dropdown.selectedIndex].text]; //span whose id matches selected option innerHTML
    if (selectedSpan.hasAttribute('hidden')) {
        selectedSpan.removeAttribute('hidden');
        for (i=0;i<spanArray.length;i++) { // hide all other spans except the selected one
            if (spanArray[i] != selectedSpan && !spanArray[i].hasAttribute('hidden')) {
                spanArray[i].setAttribute('hidden','');
            }
        }
    }
    charInput.race.subdecision = dropdown.options[dropdown.selectedIndex].text;
    raceTabValidate();
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
    updateNextPrev();    
}

//validation functions tell this function when their given tab is complete
//when a tab is complete, unlock next tab. When incomplete, lock all subsequent tabs
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

function raceTabValidate() {
    if (charInput.race.name) {
        let raceSelectPane = document.getElementById('list-'+charInput.race.name).children['race-select-pane'];
        if (raceSelectPane.children['subdecisions']) {
            let subdecisionsSection = raceSelectPane.children['subdecisions'];
            if (subdecisionsSection.children['subdecisionSelect'].selectedIndex) 
                {lockController(tabs.race.id,true)}
                else {lockController(tabs.race.id,false)}
        } else {lockController(tabs.race.id,true)}
    }
}


