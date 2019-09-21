//reset arrays
var raceAS = [0,0,0,0,0,0], themeAS = [0,0,0,0,0,0], totalAS = [10,10,10,10,10,10],
modAS = [0,0,0,0,0,0], pbAS = [0,0,0,0,0,0];

var url = window.location.href;

//declare user input variables
var raceId, themeId, classId, level; 

//store required fields as variables so we don't have to "get" them each time
//possibly use this at end of wizard to submit all inputs to backend
var charInput = {
  name: document.getElementById('char-name-entry')
}

var tabs = {
  race: document.getElementById('race-tab'),
  theme: document.getElementById('theme-tab'),
  class: document.getElementById('class-tab'),
  abilityScores: document.getElementById('ability-scores-tab'),
  classChoices: document.getElementById('class-choices-tab'),
  skills: document.getElementById('skills-tab'),
  feats: document.getElementById('feats-tab'),
  equipment: document.getElementById('equipment-tab')
};

//bucket to hold current tab statuses
var isTabLocked = [
  ['race', true, tabs.race], ['theme', true, tabs.theme], ['class', true, tabs.class], 
  ['abilityScores', true, tabs.abilityScores], ['classChoices', true, tabs.classChoices], 
  ['skills', true, tabs.skills], ['feats', true, tabs.feats], ['equipment', true, tabs.equipment]
];

//one function for locking/unlocking any tab since same action taken for each tab
function updateTabLock(tabName,isLocked) {
  for (i=0; i<isTabLocked.length; i++) {
    if (isTabLocked[i][0] === tabName) {
        if (isTabLocked[i][1] === isLocked) {return}
        else {
            isTabLocked[i][1] = isLocked;
            var element = isTabLocked[i][2];
            if (isLocked) {   //if locking the tab...
              element.setAttribute("disabled","disabled"); //disable button
              element.classList.add("disabled"); //make text gray
              element.innerHTML = '<i class="fas fa-lock"></i> Race'; //add icon
            } else {   //if unlocking the tab...
              element.removeAttribute("disabled"); //enable button
              element.classList.remove("disabled"); //undo gray text
              element.innerHTML ="Race"; //remove icon
            }
        }    
    }
  }
}

//checks lists of required fields for any tab and returns boolean of whether everything has a value
function tabComplete(requiredFields) {return !requiredFields.some(x => !x)}

//checks pref tab for completeness and unlocks race tab
function prefTabValidate() {
  var requiredFields = [
    charInput.name.value
  ];
  
  if (tabComplete(requiredFields)) {updateTabLock('race',false)}
    else {updateTabLock('race',true)}
}


function getBaseAS() {
  if (!raceId || !themeId) {return console.log("need race & theme")}
  const baseASUrl = url+'wizard/baseAS/'+raceId+"-"+themeId;
  return fetch(baseASUrl)
    .then(res => res.json())
    .then(res => console.log(res+", typeof = "+typeof res)

      // do what needs to be done with baseAS here

    )

}

function abLabel() {return ["str","dex","con","int","wis","cha"]}

function playerEntry() {}
function nameEntry() {}
function genderEntry() {}
function alignmentEntry() {}
function deityEntry() {}
function homeworldEntry() {}

function classEntry() {
  document.getElementById("char-class").innerHTML = document.getElementById("class-entry").value;
  classId = document.getElementById("class-entry").selectedIndex-1;
  classId = (classId < 0) ? "" : classId;
  ranksRemaining();
}

function levelEntry() {
  document.getElementById("char-level").innerHTML = document.getElementById("level-entry").value;
  level = Number(document.getElementById("level-entry").value);
  level = (level < 1) ? "" : level;
  var skillRanks = document.querySelectorAll(".skillRanks");
  for (let i = 0; i < skillRanks.length; i++) {
    skillRanks[i].max = level;
  }
  ranksRemaining();
}

function raceEntry() {
  document.getElementById("char-race").innerHTML = document.getElementById("race-entry").value;
  raceId = document.getElementById("race-entry").selectedIndex;
  raceId = (raceId < 0) ? "" : raceId;
    if (!raceId) {raceAS.fill(0)}
      else {
        let race_index = [[0,2,0,2,0,-2],[0,0,0,0,0,0],[2,0,0,-2,2,0],[0,0,-2,2,0,2],
        [2,0,0,0,-2,2],[0,0,2,0,2,-2],[2,0,2,-2,0,0],[-2,2,0,2,0,0],[0,2,-2,0,0,2],[0,2,2,-2,0,0],
        [0,0,2,0,-2,2],[0,-2,2,0,2,0],[0,2,0,0,0,0],[2,0,0,0,0,0],[0,2,0,2,0,-2]];
        raceAS = race_index[raceId-1];
      }
    totalsMods_AS();
    if (raceId === 5) {
      let genderSelector = document.getElementById("gender-entry");
      let option = document.createElement("option");
      option.text = "Host";
      genderSelector.add(option);
    }
      else {
        let genderSelector = document.getElementById("gender-entry");
        if (genderSelector.length > 3) {
          genderSelector.remove(genderSelector.length-1);
        }
      }
}

function themeEntry() {
  document.getElementById("char-theme").innerHTML = document.getElementById("theme-entry").value;
  themeId = document.getElementById("theme-entry").selectedIndex;
  themeId = (themeId < 1) ? "" : themeId; //may not need this line since theme id's now start at 1 and not 0?
  themeAS.fill(0);
  let themeless_input = 6, //get ability score for themeless
  theme_index = [1,2,5,0,1,4,3,2,5,4,3,4,5,2,3,5,1,2,5,4,3,3,2,themeless_input];
  if (themeId < 0) {themeAS.fill(0)} else {themeAS[theme_index[themeId]]++};
  totalsMods_AS();
}

function pointBuyEntry() {
    var pb_sum = 0;
    for (let i = 0; i < 6; i++) {
        pbAS[i] = Number(document.getElementById(abLabel()[i]+"-PB").value);
        pb_sum += pbAS[i];
    }
    document.getElementById("point-buy-count").value = 10 - pb_sum;
  totalsMods_AS ();
}

function pointBuyReset() {
  for (let i = 0; i < 6; i++) {document.getElementById(abLabel()[i]+"-PB").value = ""};
  pbAS.fill(0);
  document.getElementById("point-buy-count").value = 10;
  totalsMods_AS();  
}

function totalsMods_AS() {
  for (let i = 0; i < 6; i++) {
    totalAS[i] = 10 + themeAS[i] + raceAS[i] + pbAS[i];
    modAS[i] = Math.floor((totalAS[i] - 10) / 2);
    document.getElementById(abLabel()[i]).innerHTML = totalAS[i];
    document.getElementById(abLabel()[i]+"-mod").innerHTML = modAS[i];
    }
}

function resetAll() {
  pointBuyReset(); 
  for (let i = 0; i < getSkillNames().length; i++) {
    document.getElementById(getSkillNames()[i]+"-ranks").value = 0;
  }
  document.getElementById("skill-rank-count").innerHTML = "";
  for (let i = 0; i < getSkillNames().length; i++) {
    document.getElementById(getSkillNames()[i]+"-total").innerHTML = "";
    document.getElementById(getSkillNames()[i]+"-box").checked = false;
  }
  document.getElementById("class-entry").selectedIndex = "0"; classEntry();
  document.getElementById("level-entry").value = ""; levelEntry();
  document.getElementById("race-entry").selectedIndex = "0"; raceEntry ();
  document.getElementById("theme-entry").selectedIndex = "0"; themeEntry ();
  document.getElementById("gender-entry").selectedIndex = "0"; genderEntry();
  document.getElementById("alignment-entry").selectedIndex = "0"; alignmentEntry();
  document.getElementById("deity-entry").selectedIndex = "0"; deityEntry();
  document.getElementById("homeworld-entry").selectedIndex = "0"; homeworldEntry();
  document.getElementById("char-name-entry").value = ""; nameEntry();
  //document.getElementById("player-entry").selectedIndex = "0"; playerEntry();
  document.getElementById("stat-max-hp").innerHTML = "";
  document.getElementById("stat-max-stam").innerHTML = "";
  document.getElementById("stat-max-res").innerHTML = "";
  document.getElementById("save-fort").innerHTML = "";
  document.getElementById("save-reflex").innerHTML = "";
  document.getElementById("save-will").innerHTML = "";  
  totalsMods_AS();
}

function finalizeCharacter() {
  hpStamRes();
  saveCalc();
  allSkillCalc();
}

function hpStamRes() {
  let hpstam_index = [6,6,6,6,7,7,5],
  racehp_index = [4,4,4,4,4,6,6,2,4,4,6,6,2,2,6],
  keyab_index = [5,3,4,1,5,((totalAS[0] >= totalAS[1]) ? 0 : 1),3],
  HP = racehp_index[raceId] + (level * hpstam_index[classId]),
  stamina = level * (modAS[2] + hpstam_index[classId]),
  resolve = ((level === 1) ? 1 : Math.floor(0.5 * level)) + modAS[keyab_index[classId]];
  resolve = (resolve < 1) ? 1 : resolve;
  document.getElementById("stat-max-hp").innerHTML = HP;
  document.getElementById("stat-max-stam").innerHTML = stamina;
  document.getElementById("stat-max-res").innerHTML = resolve;  
}

function saveCalc() {
  let save_mod = [modAS[2],modAS[1],modAS[4]],
  save_prog_lookup = [[0,1,1],[1,1,0],[0,0,1],[0,1,1],[1,0,1],[1,0,1],[0,0,1]],
  save_prog = save_prog_lookup[classId],
  good = [2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12],
  poor = [0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6],
  save_array = [0,0,0];
  for (let i = 0; i < 3; i++) {
      if (!save_prog[i]) {save_array[i] = poor[level-1] + save_mod[i]} 
      else {save_array[i] = good[level-1] + save_mod[i]}
  };
  document.getElementById("save-fort").innerHTML = save_array[0];
  document.getElementById("save-reflex").innerHTML = save_array[1];
  document.getElementById("save-will").innerHTML = save_array[2];
}

function debugHideShow() {
  var x = document.getElementById("allDebug");
  var buttonDisplay = document.getElementById("debugHideShowButton");
  if (x.style.display === "none") {
    x.style.display = "block";
    buttonDisplay.innerHTML = "Hide Debug";
  } else {
    x.style.display = "none";
    buttonDisplay.innerHTML = "Show Debug";
  }
}


function allSkillCalc() {
  let skillNameArray = getSkillNames(),
  skillTrainingIndex = getClassSkillTraining(),
  skillModIndex = [1,0,5,3,3,5,5,3,5,3,3,4,4,3,1,,,4,1,1,4], 
  themeSkillIndex = [14,,4,1,18,11,,13,9,12,3,20,5,8,3,4,2,12,4,11,10,7,6,],
  skillTotals = [], raceBonus = 0;

  for (let i = 0; i < skillNameArray.length; i++) {
    let skillName = skillNameArray[i], //get this iteration's skill name
    themeBonus = 0, skillMod; 
    raceBonus = getSkillRacialBonus(i),
    classBonus = getSkillClassBonus(i); 
    //later add professionModIndex

    //handle that we don't have profession inputs
    skillMod = (skillModIndex[i] == undefined) ? 0 : modAS[skillModIndex[i]];

    //get inputted ranks and set to 0 if blank
    let skillRanks = Number(document.getElementById(skillName+"-ranks").value);
    skillRanks = (!skillRanks) ? 0 : skillRanks;

    //if this iteration has ranks and is a class skill, training bonus is 3
    let skillTraining = (skillRanks && skillTrainingIndex[i]) ? 3 : 0;

    //if this iteration is for the selected theme's skill: if not proficient, make proficient, else add 1.
    if (i === themeSkillIndex[themeId]) {
      if (!skillTrainingIndex[themeSkillIndex[themeId]]) {
        skillTrainingIndex[themeSkillIndex[themeId]]++;}
        else {themeBonus++};
    }

    skillTotals[i] = skillMod + skillRanks + skillTraining + themeBonus + raceBonus + classBonus;
    console.log(skillName+": "+skillTotals[i]+", Mod: "+skillMod+", Theme: "+themeBonus+", Ranks/Trained: "+skillRanks+"/"+skillTraining+", Race: "+raceBonus+", Class: "+classBonus);

  }
 
  //check trained skill checkboxes, print all skill totals. Since this is 
  //the beginning of the workflow for skill ranks, populate ranks remaining
  for (let i = 0; i < skillNameArray.length; i++) {
    document.getElementById(skillNameArray[i]+"-total").innerHTML = skillTotals[i];
    if (skillTrainingIndex[i]) {
      document.getElementById(skillNameArray[i]+"-box").checked = true;}
        else {document.getElementById(skillNameArray[i]+"-box").checked = false;}
    }
  ranksRemaining();
}

function skillRankCalc(fieldName,ranks) {
  ranks = (!ranks) ? 0 : Number(ranks); 
  let skillModIndex = [1,0,5,3,3,5,5,3,5,3,3,4,4,3,1,,,4,1,1,4],
  themeSkillIndex = [14,,4,1,18,11,,13,9,12,3,20,5,8,3,4,2,12,4,11,10,7,6,];

  let skillName = fieldName.substring(0,fieldName.length-6),
  skillId = getSkillNames().indexOf(skillName),
  skillMod = modAS[skillModIndex[skillId]];
  
  if (skillMod == undefined) {skillMod = 0}//handle that we don't have profession inputs

  let skillTrainingIndex = getClassSkillTraining(),
  themeBonus = 0;
  if (skillId === themeSkillIndex[themeId]) {
    if (!skillTrainingIndex[themeSkillIndex[themeId]]) {
      skillTrainingIndex[themeSkillIndex[themeId]]++;}
        else {themeBonus++}
  }
  let skillTraining = (ranks && skillTrainingIndex[skillId]) ? 3 : 0;
  let skillTotals = skillMod + themeBonus + ranks + skillTraining + getSkillRacialBonus(skillId) + getSkillClassBonus(skillId);

  //log to console for debugging
  console.log(skillName+"(id "+skillId+"): "+skillTotals+", Mod: "+skillMod+", Theme: "+themeBonus+", Ranks/Trained: "+ranks+"/"+skillTraining+", Race: "+getSkillRacialBonus(skillId))+", Class: "+getClassSkillTraining(skillId);
  
  //update total
  document.getElementById(skillName+"-total").innerHTML = skillTotals;
  
  ranksRemaining();
}

function resetRanks() {
  for (let i = 0; i < getSkillNames().length; i++) {
    document.getElementById(getSkillNames()[i]+"-ranks").value = 0;
  };
  ranksRemaining(); allSkillCalc();
}

function ranksRemaining() {
  if (!Number.isInteger(classId) || !level) {
    document.getElementById("skill-rank-count").innerHTML = "";
    return}
  let skillNames = getSkillNames(),
  classRanksperLevel = [8,4,6,8,4,4,4],
  ranksAvailable = level * (classRanksperLevel[classId] + modAS[3]), 
  currentRanks = 0;
  for (let i = 0; i < skillNames.length; i++) {
    let ranks = document.getElementById(skillNames[i]+"-ranks").value;
    if (!ranks) {continue;} 
      else {currentRanks += Number(ranks);}
  }
  document.getElementById("skill-rank-count").innerHTML = ranksAvailable - currentRanks;
}

function getSkillRacialBonus(skillIdInput) {
  let skillId = skillIdInput, skillBonusOutput = 0,
  raceBonusIndex = [0,2,3,4,5,7,8,9,11];
  if (!raceBonusIndex.includes(raceId)) {return 0}

  let input1, input2; //pretend to get lashunta Student inputs (two skillId's)
  if (raceId === 3 || raceId === 4) {input1 = 9, input2 = 10}

  let raceSkillBonusIndex = [ //in the format [skillId, bonus value]
    [[17, -2]], 
    [[0,2],[1,2],[4,2]],
    [[input1,2],[input2,2]],
    [[input1,2],[input2,2]],
    [[4,2],[5,2]],
    [[7,2],[19,2],[20,2]],
    [[6,10]],
    [[0,2]],
    [[9,2],[20,2]]
  ];
  let skillBonuses = raceSkillBonusIndex[raceBonusIndex.indexOf(raceId)];

  for (let i = 0; i < skillBonuses.length; i++) {
    if (skillId === skillBonuses[i][0]) {skillBonusOutput = skillBonuses[i][1];}
  }
  return skillBonusOutput;
}

function getSkillClassBonus(skillIdInput) {
  let skillId = skillIdInput, skillBonusOutput = 0;
  if (![1,3,6].includes(classId)) {return 0}
  if (classId === 3) {return Math.ceil((Number(level)+2)/4)} //operative's edge
  if (![3,7,11].includes(skillId)) {return 0} //the remaining bonuses are only for skills 3,7,11

  let bonusArray = 
      (classId === 1) ? [[3,7],(level === 20) ? 6 : Math.ceil(level/4)] //mechanic bypass
    : (classId === 6) ? [[3,11],(level < 3) ? 0 : Math.floor(level/3)] //technomancer techlore
    : 0;

  for (let i = 0; i < bonusArray[0].length; i++) {
    if (skillId === bonusArray[0][i]) {skillBonusOutput = bonusArray[1]}
  }
  return skillBonusOutput;
}


function getClassSkillTraining() {
  let classSkillTrainedIndex = [
    [1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,0],
    [0,1,0,1,0,0,0,1,0,0,1,0,1,1,1,1,1,0,0,0,0],
    [0,0,1,0,1,1,1,0,1,1,1,1,1,0,0,1,1,1,0,0,1],
    [1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,1,0,0,0,1,0,0,1,0,0,1,1,1,0,1,1,1,0,1,0],
    [1,1,0,0,0,0,0,1,1,0,1,0,0,0,1,1,1,0,0,0,1],
    [0,0,0,1,0,0,0,1,0,1,0,1,0,1,1,1,1,0,1,0,0]
  ];
  return classSkillTrainedIndex[classId];
}

function getSkillNames() { //list in ID order of skill field names
  return ['acrobatics','athletics','bluff','computers','culture',
  'diplomacy','disguise','engineering','intimidate','lifeScience',
  'medicine','mysticism','perception','physicalScience','piloting',
  'profession1','profession2','senseMotive','sleightOfHand','stealth',
  'survival'];
}






