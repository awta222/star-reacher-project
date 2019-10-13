const wizUrl = window.location.href + 'wizard/';


//for populating dropdown options
var listsData;

fetch(wizUrl+'lists')
    .then(res => res.json())
    .then((res) => {
      listsData = res;
      populateOptions('homeworlds','homeworld-entry');
    }).catch((e) => {console.log('Unable to load lists: '+e)});

function populateOptions(listName,elementId) {
  var listArray = listsData.find((list) => {return list.listName == listName}).list;
  var selectElement = document.getElementById(elementId);
  for (i=0;i<listArray.length;i++) {
    let option = document.createElement('option');
    option.innerHTML = listArray[i];
    selectElement.appendChild(option);
  }
}


//populating race tab
var raceDescriptions;

fetch(wizUrl+'raceDesc')
  .then(res => res.json())
  .then((res) => {
    raceDescriptions = res;
    console.log(raceDescriptions);
  }).catch((e) => {console.log('Unable to load raceDescriptions: '+e)})


function populateRaceTab() {

  var tabContent = document.getElementById('tab-content').children;

  var tabIndex = [['list-android','Android'],['list-human','Human'],['list-kasatha','Kasatha'],
  ['list-lashunta','Lashunta'],['list-shirren','Shirren'],['list-vesk','Vesk'],['list-ysoki','Ysoki']];

  var raceInfoKey = [['#race-name','raceName'],['#race-description','description'],['#race-AS','AS'],
  ['#race-HP','HP'],['#race-sizeType','sizeType']];

  for (i=0;i<tabContent.length;i++) {

    //get main div for the race we're updating, and get the data we'll use to populate with
    var thisTabContent = tabContent[tabIndex[i][0]].children;
    var thisData = raceDescriptions.find((race) => {return race.raceName == tabIndex[i][1]});
    
    //populate race info (race name, desc, stat block)
    var raceInfo = thisTabContent['race-info'];
    for (infoCounter=0; infoCounter<raceInfoKey.length; infoCounter++) {
      let thisElement = raceInfo.querySelector(raceInfoKey[infoCounter][0]);
      thisElement.innerHTML = thisData[raceInfoKey[infoCounter][1]];
    }

    //create race ability boxes based off dataset for this race
    var raceAbilities = thisTabContent['race-abilities'];
    for (abilityCounter=0; abilityCounter<thisData.racialAbilities.length; abilityCounter++) {
      let thisAbility = thisData.racialAbilities[abilityCounter];
      let raceAbilityBox = createRaceAbilityBox(thisAbility.name,thisAbility.description);
      raceAbilities.appendChild(raceAbilityBox);
    }

  }
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
