var raceSection = document.getElementById("race-section")
var preferencesSection = document.getElementById("preferences-section")
var raceTab = document.getElementById("race-tab")
var preferencesTab = document.getElementById("preferences-tab")





function raceTabSelect() {
    if (raceSection.classList.contains("active-section")) {
    } else {
        preferencesSection.classList.remove("active-section"); //Setup all sections to remove active
        raceSection.classList.add("active-section");
        preferencesTab.classList.remove("btn-primary"); //Setup all sections to remove primary
        raceTab.classList.add("btn-primary");
    } 
}

function preferencesTabSelect () {
    if (preferencesSection.classList.contains("active-section")) {
    } else {
        raceSection.classList.remove("active-section"); //Setup all sections to remove active
        preferencesSection.classList.add("active-section");
        raceTab.classList.remove("btn-primary"); //Setup all sections to remove primary
        preferencesTab.classList.add("btn-primary");

    } 
}

