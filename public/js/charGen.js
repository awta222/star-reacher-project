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

    createRaceStatBlock(raceInfoDiv,thisRaceData);
    
    for (raceAb=0; raceAb<thisRaceData.racialAbilities.length; raceAb++) {
      let thisAbility = thisRaceData.racialAbilities[raceAb];
      let raceAbilityBox = createRaceAbilityBox(thisAbility.name,thisAbility.description);
      raceAbilitiesDiv.appendChild(raceAbilityBox);
    }

    if (thisRaceData.subdecisions) {
      let raceSelectPane = thisTabContent['race-select-pane'];
      raceSelectPane.appendChild(createSubdecisionDiv(thisRaceData.subdecisions));
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


function createSubdecisionDiv(subdecisionData) {
  let subdecisionDiv = document.createElement('div');
  subdecisionDiv.className = subdecisionDiv.id = 'subdecisions';
  subdecisionDiv.setAttribute('hidden','');

  let label = document.createElement('label');
  label.setAttribute('for','subdecisionSelect');
  label.innerHTML = subdecisionData.selectLabel;

  var select = document.createElement('select');
  select.className = "browser-default custom-select";
  select.id = "subdecisionSelect";
  select.setAttribute('oninput','subdecisionSelect(this)');
  select.innerHTML = '<option hidden disabled selected></option>';
  
  var decisionDetail = document.createElement('div');
  decisionDetail.className = 'subdecision-detail';
  decisionDetail.id = 'subdecisionDetail';

  for (s=0;s<subdecisionData.selectOptions.length;s++) {
    let option = document.createElement('option');
    option.innerHTML = subdecisionData.selectOptions[s].name;
    select.appendChild(option);

    let span = document.createElement('span');
    span.setAttribute('hidden',''); 
    span.id = subdecisionData.selectOptions[s].name;
    span.innerHTML = subdecisionData.selectOptions[s].detail;
    decisionDetail.appendChild(span);
  }

  subdecisionDiv.appendChild(label); subdecisionDiv.appendChild(select);
  subdecisionDiv.appendChild(decisionDetail);

  return subdecisionDiv;
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
