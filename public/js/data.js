const wizUrl = window.location.href + 'wizard/';

fetch(wizUrl+'lists')
  .then(data => data.json())
  .then(data => populateAllDropdowns(data))
  .catch(err => console.log('Unable to populate lists: '+err));

/* fetch(wizUrl+'raceDesc')
  .then(data => data.json())
  .then(data => populateRaceTab(data))
  .catch(err => console.log('Unable to populate race tab: '+err)); */

fetch(wizUrl+'raceDesc', {
    method: 'POST',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify(['CRB'])
  }).then(res => res.json())
    .then((content) => {
      document.getElementById('race-list').innerHTML = content.listItems;
      document.getElementById('tab-content').innerHTML = content.tabContent;
    })
    .catch(err => console.log('Unable to populate race tab: '+err));


function populateAllDropdowns(listCollection) {
// in the format ('list name','target element id')
  populateDropdown('homeworlds','homeworldSelect');

  function populateDropdown(listName,elementId) {
    var listArray = listCollection.find((list) => {return list.listName == listName}).list;
    var dropdown = document.getElementById(elementId);
    var options = ``;
    for (i=0;i<listArray.length;i++) {options += `<option>${listArray[i]}</option>`}
    dropdown.innerHTML += options;
  }
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
