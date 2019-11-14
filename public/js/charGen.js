const wizUrl = window.location.href + 'wizard/';

fetch(wizUrl+'lists')
  .then(data => data.json())
  .then(data => populateAllDropdowns(data))
  .catch(err => console.log('Unable to populate lists: '+err));

fetch(wizUrl+'raceDesc')
  .then(data => data.json())
  .then(data => populateRaceTab(data))
  .catch(err => console.log('Unable to populate race tab: '+err));


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


// --- race tab stuff --- //

function populateRaceTab(raceTabData) {
  var tabContent = document.getElementById('tab-content').children;

  for (i=0;i<tabContent.length;i++) {
    var thisRaceData = raceTabData[i];
    
    var thisTabContent = tabContent['list-'+thisRaceData.raceName].children;
    var raceInfoDiv = thisTabContent['race-info'];
    var raceAbilitiesDiv = thisTabContent['race-abilities'];

    raceInfoDiv.innerHTML += createRaceInfo(thisRaceData);
    
    for (raceAb=0; raceAb<thisRaceData.racialAbilities.length; raceAb++) {
      let thisAbility = thisRaceData.racialAbilities[raceAb];
      raceAbilitiesDiv.innerHTML += createRaceAbilityBox(thisAbility);
    }

    if (thisRaceData.subdecisions) {
      let raceSelectPane = thisTabContent['race-select-pane'];
      raceSelectPane.innerHTML += createSubdecisionDiv(thisRaceData.subdecisions);
    }
  }
}

function createRaceInfo(raceData) {
  return `<div id="race-raceName" class="race-raceName">${raceData.raceName}</div>
          <div id="race-description" class="race-description">${raceData.description}</div>
          <div id="race-stats" class="race-stats">
            <div id="race-AS" class="race-AS">${raceData.AS}</div>
            <div id="race-HP" class="race-HP">${raceData.HP}</div>
            <div id="race-sizeType" class="race-sizeType">${raceData.sizeType}</div>
          </div>`;
}

function createRaceAbilityBox(ability) {
  return `<div class="race-ability-box">
	          <div class="label-bar">${ability.name}</div>
	          <div class="ability-text">${ability.description}</div>
          </div>`;
}


function createSubdecisionDiv(data) {
  var options = `<option hidden="" disabled="" selected=""></option>`;
  var detail = ``;

  for (opt=0;opt<data.selectOptions.length;opt++) {
    options += `<option>${data.selectOptions[opt].name}</option>`;
    detail += `<span hidden id="${data.selectOptions[opt].name}">${data.selectOptions[opt].detail}</span>`;
  }

  return `<div hidden class="subdecisions" id="subdecisions">
            <label for="subdecisionSelect">${data.selectLabel}</label>
            <select class="browser-default custom-select" id="subdecisionSelect" oninput="subdecisionSelect(this)">
              ${options}
            </select>
            <div class="subdecision-detail" id="subdecisionDetail">
              ${detail}
            </div>
          </div>`;
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
