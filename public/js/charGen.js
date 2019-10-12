const wizUrl = window.location.href + 'wizard/';

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

function getBaseAS(raceId,themeId) {
  const baseASUrl = wizUrl+'baseAS/'+raceId+"-"+themeId;
  return fetch(baseASUrl)
    .then(res => res.json())
    .then(res => console.log(res+", typeof = "+typeof res)

      // do what needs to be done with baseAS here

    )

}
