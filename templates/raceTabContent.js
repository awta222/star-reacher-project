module.exports = exports = {};

exports.raceList = (racenameArray) => racenameArray.map(raceName => `
    <a class="list-group-item list-group-item-action" id="list-${raceName}-list" data-toggle="list" href="#list-${raceName}" role="tab">
    ${raceName}
    </a>
`).join('');

exports.raceTabContents = (races) => races.map(race => `
    <div class="tab-pane fade show" id="list-${race.raceName}" role="tabpanel" aria-labelledby="list-${race.raceName}-list">
        <div class="race-image">
            <img src="images/${race.raceName}.png" alt="">
        </div>
        <div class="race-info" id="race-info">
            <div id="race-raceName" class="race-raceName">${race.raceName}</div>
            <div id="race-description" class="race-description">${race.description}</div>
            <div id="race-stats" class="race-stats">
                <div id="race-AS" class="race-AS">${race.AS}</div>
                <div id="race-HP" class="race-HP">HP: ${race.HP}</div>
                <div id="race-sizeType" class="race-sizeType">${race.sizeType}</div>
            </div>
        </div>
        <hr> 
        <div class="race-abilities" id="race-abilities">
            ${
                race.racialAbilities.map(ability => `
                    <div class="race-ability-box">
                        <div class="label-bar">${ability.name}</div>
                        <div class="ability-text">${ability.description}</div>
                    </div>
                `).join('')
            }
        </div>
        <div class="race-select-pane" id="race-select-pane">
            <button type="button" class="btn btn-primary btn-lg btn-block race-select-button" id="${race.raceName}" onclick="selectRace(this)">Select This Race</button>
            ${(race.subdecisions) ? `
                <div hidden class="subdecisions" id="subdecisions">
                    <label for="subdecisionSelect">${race.subdecisions.selectLabel}</label>
                    <select class="browser-default custom-select" id="subdecisionSelect" oninput="subdecisionSelect(this)">
                        <option hidden="" disabled="" selected=""></option>
                        ${
                            race.subdecisions.selectOptions.map(option => `
                                <option>${option.name}</option>
                            `).join('')
                        }
                    </select>
                    <div hidden="" class="subdecision-detail" id="subdecisionDetail">
                        ${
                            race.subdecisions.selectOptions.map(option => `
                                <span hidden="" id="${option.name}">${option.detail}</span>
                            `).join('')
                        }
                    </div>
                </div>
            ` : ''
            }
        </div>
    </div>
`).join('');
