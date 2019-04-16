//reset arrays
var race_as = [0,0,0,0,0,0], theme_as = [0,0,0,0,0,0], total_as = [10,10,10,10,10,10],
base_as = [10,10,10,10,10,10], mod_as = [0,0,0,0,0,0], pb_as = [0,0,0,0,0,0];

//declare user input variables
var race_ID, theme_ID, class_ID, level, themeless_input = 6; //Number(themeless_ab.value)

//declare other things
var HP, stamina, resolve, save_array, ab_label = ["str","dex","con","int","wis","cha"];

//function playerEntry() {document.getElementById("char-player").innerHTML = document.getElementById("player-entry").value;}

function nameEntry() {document.getElementById("char-name").innerHTML = document.getElementById("char-name-entry").value;}

function classEntry() {
  document.getElementById("char-class").innerHTML = document.getElementById("class-entry").value;
  class_ID = document.getElementById("class-entry").value;
}

function levelEntry() {
  document.getElementById("char-level").innerHTML = document.getElementById("level-entry").value;
  level = document.getElementById("level-entry").value;
};

function genderEntry() {document.getElementById("char-gender").innerHTML = document.getElementById("gender-entry").value;}

function alignEntry() {document.getElementById("char-align").innerHTML = document.getElementById("alignment-entry").value;}
  
function deityEntry() {document.getElementById("char-deity").innerHTML = document.getElementById("deity-entry").value;}
  
function homeworldEntry() {document.getElementById("char-homeworld").innerHTML = document.getElementById("homeworld-entry").value;}

function raceEntry() {
  document.getElementById("char-race").innerHTML = document.getElementById("race-entry").value;
  race_ID = document.getElementById("race-entry").selectedIndex;
    if (!race_ID) {race_as.fill(0)} 
      else {
        let race_index = [[0,2,0,2,0,-2],[0,0,0,0,0,0],[2,0,0,-2,2,0],[0,0,-2,2,0,2],
        [2,0,0,0,-2,2],[0,0,2,0,2,-2],[2,0,2,-2,0,0],[-2,2,0,2,0,0],[0,2,-2,0,0,2],[0,2,2,-2,0,0],
        [0,0,2,0,-2,2],[0,-2,2,0,2,0],[0,2,0,0,0,0],[2,0,0,0,0,0],[0,2,0,2,0,-2]];
        race_as = race_index[race_ID-1];
      }
    totalsMods_AS ();
};

function themeEntry () {
  document.getElementById("char-theme").innerHTML = document.getElementById("theme-entry").value;
  theme_ID = document.getElementById("theme-entry").selectedIndex;
  theme_as.fill(0);
  var theme_index = [2,3,6,1,2,5,4,3,6,5,4,5,6,3,4,6,2,3,6,5,4,4,3,themeless_input];
  if (!theme_ID) {theme_as.fill(0)} else {theme_as[theme_index[theme_ID-1]-1]++};
  totalsMods_AS ();
};

function pointBuyEntry () {
    var pb_sum = 0;
    for (i = 0; i < 6; i++) {
        pb_as[i] = Number(document.getElementById(ab_label[i]+"-PB").value);
        pb_sum += pb_as[i];
    }
  document.getElementById("point-buy-count").value = 10 - pb_sum;
  totalsMods_AS ();
};

function pointBuyReset() {
  for (i = 0; i < 6; i++) {document.getElementById(ab_label[i]+"-PB").value = ""};
  pb_as.fill(0);
  document.getElementById("point-buy-count").value = 10;
  totalsMods_AS();  
}

function totalsMods_AS () {
  for (i = 0; i < 6; i++) {
      total_as[i] = base_as[i] + theme_as[i] + race_as[i] + pb_as[i];
      mod_as[i] = Math.floor((total_as[i] - 10) / 2);
      document.getElementById(ab_label[i]).innerHTML = total_as[i];
      document.getElementById(ab_label[i]+"-mod").innerHTML = mod_as[i];
      }
  };

  function resetAll () {
    document.getElementById("class-entry").selectedIndex = "0";
    document.getElementById("level-entry").selectedIndex = "0";
    document.getElementById("race-entry").selectedIndex = "0";
    document.getElementById("theme-entry").selectedIndex = "0";
    for (i = 0; i < 6; i++) {document.getElementById(ab_label[i]+"-PB").value = "";};
    document.getElementById("point-buy-count").value = 10;
    raceEntry (); themeEntry (); totalsMods_AS ();
  }

function finalizeCharacter () {
  race_ID = document.getElementById("race-entry").selectedIndex;
  class_ID = document.getElementById("class-entry").selectedIndex;
  level = Number(document.getElementById("level-entry").value);
  hpStamRes ();
  saveCalc ();
  //skillCalc ();
}

function hpStamRes () {
  var hpstam_index = [6,6,6,6,7,7,5];
  var racehp_index = [4,4,4,4,4,6,6,2,4,4,6,6,2,2,6];
  var keyab_index = [6,4,5,2,6,((total_as[0] >= total_as[1]) ? 1 : 2),4];
  HP = racehp_index[race_ID-1] + (level * hpstam_index[class_ID-1]);
  stamina = level * (mod_as[2] + hpstam_index[class_ID-1]);
  resolve = ((level === 1) ? 1 : Math.floor(0.5 * level)) + mod_as[keyab_index[class_ID-1]-1];
  resolve = (resolve < 1) ? 1 : resolve;
  console.log(level+", typeof = "+typeof level);
  console.log(HP);
  document.getElementById("stat-max-hp").innerHTML = HP;
  document.getElementById("stat-max-stam").innerHTML = stamina;
  document.getElementById("stat-max-res").innerHTML = resolve;  
}  

function saveCalc() {
  var save_mod = [mod_as[2],mod_as[1],mod_as[4]],
  save_prog_lookup = [[0,1,1],[1,1,0],[0,0,1],[0,1,1],[1,0,1],[1,0,1],[0,0,1]],
  save_prog = save_prog_lookup[class_ID-1],
  good = [2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12],
  poor = [0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6],
  save_array = [0,0,0];
  for (i = 0; i < 3; i++) {
      if (!save_prog[i]) {save_array[i] = poor[level-1] + save_mod[i]} 
      else {save_array[i] = good[level-1] + save_mod[i]}
  };
  document.getElementById("save-fort").innerHTML = save_array[0];
  document.getElementById("save-reflex").innerHTML = save_array[1];
  document.getElementById("save-will").innerHTML = save_array[2];
}
/*
function skillCalc() {
  var class_skillprof = (class_ID === 1) ? [1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,0]
        : (class_ID === 2) ? [0,1,0,1,0,0,0,1,0,0,1,0,1,1,1,1,1,0,0,0,0]
        : (class_ID === 3) ? [0,0,1,0,1,1,1,0,1,1,1,1,1,0,0,1,1,1,0,0,1]
        : (class_ID === 4) ? [1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1]
        : (class_ID === 5) ? [1,1,0,0,0,1,0,0,1,0,0,1,1,1,0,1,1,1,0,1,0]
        : (class_ID === 6) ? [1,1,0,0,0,0,0,1,1,0,1,0,0,0,1,1,1,0,0,0,1]
        : (class_ID === 7) ? [0,0,0,1,0,0,0,1,0,1,0,1,0,1,1,1,1,0,1,0,0]
        : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var skillName_array = Object.keys(char.skills),
  skillMod_index = [2,1,6,4,4,6,6,4,6,4,4,5,5,4,2,0,0,5,2,2,5], 
  themeSkill_index = [15,0,5,2,19,12,0,14,10,13,4,21,6,9,4,5,3,13,5,12,11,8,7,0],
  skillMod = [], themeMod, skillRanks = [], skillTraining = [], skillTotal = [];
  for (i = 0; i < skillName_array.length; i++) {
    let skillName = skillName_array[i];
    //get ability modifiers
    skillMod[i] = mod_as[skillMod_index[i]-1];
    console.log(skillMod[i]);
    //get theme bonus if any
    themeMod = (themeSkill_index[theme_ID-1] === (i + 1) && class_skillprof[class_ID-1] != 0) ? 1 : 0;
    //get ranks and add training bonus where there are ranks
    skillRanks[i] = document.getElementById(skillName+"_ranks").value;
    skillTraining[i] = (skillRanks[i] != 0) ? 3 : 0;
    //get racial bonuses <-- RESEARCH WHERE THESE OCCUR
    //get feat bonuses <-- PLACEHOLDER UNTIL LATER
    //get decision bonuses <-- PLACEHOLDER UNTIL LATER
    //sum up total and print to page
 /*    if (i === 1) {
      console.log("Mod: "+skillMod[i]);
      console.log("Theme: "+themeMod);
      console.log("Ranks: "+skillRanks[i]);
      console.log("Training: "+skillTraining[i]);
    } 
    skillTotal[i] = skillMod[i] + themeMod + skillRanks[i] + skillTraining[i];
    document.getElementById(skillName).value = skillTotal[i];
  }
  //get # ranks per level
  //get & display current ranks remaining
}

function skillRankReset() {
  // ? would be nice
};

function skillRankCalc(fieldName,ranks){
  ranks = Number(ranks);
  let skillName = fieldName.substring(0,fieldName.length-6),
  skillName_array = Object.keys(char.skills),
  skill_ID = skillName_array.indexOf(skillName);
  //get ability mod
  let skillMod = mod_as[skill_mod_index[char.skills[skillName].sort-1]-1];
  
  //(theme_skill_index[theme_ID-1] === skill_ID) ? ()
  console.log(fieldName);
  console.log(ranks);
  console.log(skillName);
  //get stuff from input
  console.log(Object.keys(char.skills));
  console.log(skill_ID);
  //get components for total
  //let skillMod = 
  
  //var skill_mod = 
  //total bonus = skill mod + ranks + class training + theme bonus + race bonus + feat bonus + decision bonuses

  //print to total
  
  //update and print ranks remaining
}


var char = {
  as: {total_as, mod_as},
  skills:{
    acrobatics:{sort:1, total:skillTotal(), ranks:2},
    athletics:{},
    bluff:{},
    computers:{},
    culture:{},
    diplomacy:{},
    disguise:{},
    engineering:{},
    intimidate:{},
    lifescience:{},
    medicine:{},
    mysticism:{},
    perception:{},
    physicalscience:{},
    piloting:{},
    profession:{},
    sensemotive:{},
    sleightofhand:{},
    stealth:{},
    survival:{}
  }
}

//total bonus = skill mod + ranks + class training + theme bonus + race bonus + feat bonus + decision bonuses
function skillTotal() {
}
*/