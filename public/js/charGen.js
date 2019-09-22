var url = window.location.href;

function getBaseAS() {
  if (!raceId || !themeId) {return console.log("need race & theme")}
  const baseASUrl = url+'wizard/baseAS/'+raceId+"-"+themeId;
  return fetch(baseASUrl)
    .then(res => res.json())
    .then(res => console.log(res+", typeof = "+typeof res)

      // do what needs to be done with baseAS here

    )

}
