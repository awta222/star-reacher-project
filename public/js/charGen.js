const wizUrl = window.location.href + 'wizard/';

var raceDescGlobal;

Promise.all([
  fetch(wizUrl+'raceDesc').then(data => data.json()),
  fetch(wizUrl+'lists').then(data => data.json())
  ])
  .then((data) => {
    populateRaceTab(data[0]);
    populateAllDropdowns(data[1]);
}).catch((e) => {console.log('Unable to populate data from server: '+e)}); 


function populateAllDropdowns(listCollection) {
// in the format ('list name','target element id')
  populateDropdown('homeworlds','homeworldSelect');

  function populateDropdown(listName,elementId) {
    var listArray = listCollection.find((list) => {return list.listName == listName}).list;
    var dropdown = document.getElementById(elementId);
    for (i=0;i<listArray.length;i++) {
      let option = document.createElement('option');
      option.innerHTML = listArray[i];
      dropdown.appendChild(option);
    }
  }
}


function populateRaceTab(raceTabData) {

  var tabContent = document.getElementById('tab-content').children;

  //div names and data names to pair data with the right section when iterating
  var tabIndex = [['list-android','Android'],['list-human','Human'],['list-kasatha','Kasatha'],
  ['list-lashunta','Lashunta'],['list-shirren','Shirren'],['list-vesk','Vesk'],['list-ysoki','Ysoki']];

  for (i=0;i<tabIndex.length;i++) {
    var thisRaceData = raceTabData.find((race) => {return race.raceName == tabIndex[i][1]});
    
    var thisTabContent = tabContent[tabIndex[i][0]].children;
    var raceInfoDiv = thisTabContent['race-info'];
    var raceAbilitiesDiv = thisTabContent['race-abilities'];

    createRaceStatBlock(raceInfoDiv,thisRaceData);
    
    for (raceAb=0; raceAb<thisRaceData.racialAbilities.length; raceAb++) {
      let thisAbility = thisRaceData.racialAbilities[raceAb];
      let raceAbilityBox = createRaceAbilityBox(thisAbility.name,thisAbility.description);
      raceAbilitiesDiv.appendChild(raceAbilityBox);
    }
  }
}

function createRaceStatBlock(raceInfoSection,raceData) {
  var raceInfo = raceInfoSection;

  function addDiv(name) {
    let div = document.createElement('div');
    div.className = div.id = 'race-'+name;
    if (raceData[name]) {div.innerHTML = raceData[name]}
    return div;
  } 

  let raceName = addDiv('raceName'), 
  description = addDiv('description'),
  stats = addDiv('stats'), AS = addDiv('AS'),
  HP = addDiv('HP'), sizeType = addDiv('sizeType'); 

  raceInfo.appendChild(raceName); raceInfo.appendChild(description); raceInfo.appendChild(stats);
  stats.appendChild(AS); stats.appendChild(HP); stats.appendChild(sizeType); 
}

function createRaceAbilityBox(abilityName,abilityDesc) {
  let raceAbilityBox = document.createElement('div');
  raceAbilityBox.className = "race-ability-box";

  let labelBar = document.createElement('div');
  labelBar.className = "label-bar";
  labelBar.innerHTML = abilityName;

  let abilityText = document.createElement('div');
  abilityText.className = "ability-text";
  abilityText.innerHTML = abilityDesc;

  raceAbilityBox.appendChild(labelBar);
  raceAbilityBox.appendChild(abilityText);

  return raceAbilityBox;
}


//old baseAS
function getBaseAS(raceId,themeId) {
  const baseASUrl = wizUrl+'baseAS/'+raceId+"-"+themeId;
  return fetch(baseASUrl)
    .then(res => res.json())
    .then(res => console.log(res+", typeof = "+typeof res)

      // do what needs to be done with baseAS here

    )

}
