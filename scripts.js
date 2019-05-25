

var preferencesSection = document.getElementById("preferences-section")
var raceSection = document.getElementById("race-section")
var themeSection = document.getElementById("theme-section")
var classSection = document.getElementById("class-section")
var abilityScoresSection = document.getElementById("ability-scores-section")
var classChoicesSection = document.getElementById("class-choices-section")
var skillsSection = document.getElementById("skills-section")
var featsSection = document.getElementById("feats-section")
var equipmentSection = document.getElementById("equipment-section")

var preferencesTab = document.getElementById("preferences-tab")
var raceTab = document.getElementById("race-tab")
var themeTab = document.getElementById("theme-tab")
var classTab = document.getElementById("class-tab")
var abilityScoresTab = document.getElementById("ability-scores-tab")
var classChoicesTab = document.getElementById("class-choices-tab")
var skillsTab = document.getElementById("skills-tab")
var featsTab = document.getElementById("feats-tab")
var equipmentTab = document.getElementById("equipment-tab")


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



