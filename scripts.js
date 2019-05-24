var raceSection = document.getElementById("race-section")
var preferencesSection = document.getElementById("preferences-section")
var raceTab = document.getElementById("race-tab")
var preferencesTab = document.getElementById("preferences-tab")





function raceTabSelect() {
    if (raceSection.style.display === "none") {
        preferencesSection.style.display === "none";
        raceSection.style.display === "block";
        preferencesTab.classList.remove("btn-primary");
        raceTab.classList.add("btn-primary");
    } 
}

function preferencesTabSelect () {
    if (preferencesSection.style.display === "none") {
        raceSection.style.display === "none";
        preferencesSection.style.display === "block";
        raceTab.classList.remove("btn-primary");
        preferencesTab.classList.add("btn-primary");

    } 
}

