

var preferencesSection = document.getElementById("preferences-section"),
    raceSection = document.getElementById("race-section"),
    themeSection = document.getElementById("theme-section"),
    classSection = document.getElementById("class-section"),
    abilityScoresSection = document.getElementById("ability-scores-section"),
    classChoicesSection = document.getElementById("class-choices-section"),
    skillsSection = document.getElementById("skills-section"),
    featsSection = document.getElementById("feats-section"),
    equipmentSection = document.getElementById("equipment-section"),
    preferencesTab = document.getElementById("preferences-tab"),
    raceTab = document.getElementById("race-tab"),
    themeTab = document.getElementById("theme-tab"),
    classTab = document.getElementById("class-tab"),
    abilityScoresTab = document.getElementById("ability-scores-tab"),
    classChoicesTab = document.getElementById("class-choices-tab"),
    skillsTab = document.getElementById("skills-tab"),
    featsTab = document.getElementById("feats-tab"),
    equipmentTab = document.getElementById("equipment-tab");


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
    if (preferencesSection.classList.contains("active-section")) {
    } else {
        clearSections();
        preferencesSection.classList.add("active-section");
        clearPrimaryTab();
        preferencesTab.classList.add("btn-primary");
    } 
}

function raceTabSelect() {
    if (raceSection.classList.contains("active-section")) {
    } else {
        clearSections();
        raceSection.classList.add("active-section");
        clearPrimaryTab();
        raceTab.classList.add("btn-primary");
    } 
}

function themeTabSelect () {
    if (themeSection.classList.contains("active-section")) {
    } else {
        clearSections();
        themeSection.classList.add("active-section");
        clearPrimaryTab();
        themeTab.classList.add("btn-primary");
    } 
}

function classTabSelect () {
    if (classSection.classList.contains("active-section")) {
    } else {
        clearSections();
        classSection.classList.add("active-section");
        clearPrimaryTab();
        classTab.classList.add("btn-primary");
    } 
}

function abilityScoresTabSelect () {
    if (abilityScoresSection.classList.contains("active-section")) {
    } else {
        clearSections();
        abilityScoresSection.classList.add("active-section");
        clearPrimaryTab();
        abilityScoresTab.classList.add("btn-primary");
    } 
}

function classChoicesTabSelect () {
    if (classChoicesSection.classList.contains("active-section")) {
    } else {
        clearSections();
        classChoicesSection.classList.add("active-section");
        clearPrimaryTab();
        classChoicesTab.classList.add("btn-primary");
    } 
}

function skillsTabSelect () {
    if (skillsSection.classList.contains("active-section")) {
    } else {
        clearSections();
        skillsSection.classList.add("active-section");
        clearPrimaryTab();
        skillsTab.classList.add("btn-primary");
    } 
}
function featsTabSelect () {
    if (featsSection.classList.contains("active-section")) {
    } else {
        clearSections();
        featsSection.classList.add("active-section");
        clearPrimaryTab();
        featsTab.classList.add("btn-primary");
    } 
}

function equipmentTabSelect () {
    if (equipmentSection.classList.contains("active-section")) {
    } else {
        clearSections();
        equipmentSection.classList.add("active-section");
        clearPrimaryTab();
        equipmentTab.classList.add("btn-primary");
    } 
}



