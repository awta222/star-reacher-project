const wizUrl = window.location.href + 'wizard/';
const loadParam = {
  method: 'POST',
  headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
  body: JSON.stringify(['CRB'])
};

fetch(wizUrl+'lists')
  .then(data => data.json())
  .then(data => populateAllDropdowns(data))
  .catch(err => console.log('Unable to populate lists: '+err));

fetch(wizUrl+'raceDesc', loadParam).then(res => res.json())
    .then((content) => {
      document.getElementById('race-list').innerHTML = content.listItems;
      document.getElementById('race-content').innerHTML = content.tabContent;
    }).catch(err => console.log('Unable to populate race tab: '+err));

fetch(wizUrl+'themeDesc', loadParam).then(res => res.json())
  .then((content) => {
    document.getElementById('theme-list').innerHTML = content.listItems;
    document.getElementById('theme-content').innerHTML = content.tabContent;
  }).catch(err => console.log('Unable to populate race tab: '+err));

function populateAllDropdowns(listCollection) {
  function populateDropdown(listName,elementId) {
    let listArray = listCollection.find((list) => {return list.listName == listName}).list,
    dropdown = document.getElementById(elementId),
    html = listArray.map(item => `<option>${item}</option>`).join('');
    dropdown.innerHTML += html;
  }
  populateDropdown('homeworlds','homeworldSelect');
  populateDropdown('deities','deitySelect');
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
