module.exports = exports = {};

exports.themeList = (themeNameArray) => themeNameArray.map(themeName => `
    <a class="list-group-item list-group-item-action" id="list-${themeName.replace(' ','')}-list" data-toggle="list" href="#list-${themeName.replace(' ','')}" role="tab">
    ${themeName}
    </a>
`).join('');

// this was once in the race-image div: <img src="images/${theme.themeName}.png" alt="">

exports.themeTabContents = (themes) => themes.map(theme => `
    <div class="tab-pane fade show" id="list-${theme.themeName.replace(' ','')}" role="tabpanel" aria-labelledby="list-${theme.themeName.replace(' ','')}-list">
        <div class="race-image">

        </div>
        <div class="info-section">
            <div class="selection-name">${theme.themeName}<div class="theme-AS">${theme.AS}</div></div>
            <div class="selection-description">${theme.description}</div>
            <div class="stat-block">
                <div class="race-AS">${theme.AS}</div>
            </div>
        </div>
        <hr> 
        <div class="ability-cards">
            ${
                theme.themeAbilities.map(ability => `
                    <div class="ability-box">
                        <div class="label-bar">${ability.name} - Level ${ability.level}</div>
                        <div class="ability-text">${ability.description}</div>
                    </div>
                `).join('')
            }
        </div>
        <div class="race-select-pane" id="race-select-pane">
            <button type="button" class="btn btn-primary btn-lg btn-block race-select-button" id="${theme.themeName}" onclick="selectRace(this)">Select This Theme</button>
            ${(!theme.subdecisions) ? '' : `
                <div hidden class="subdecisions" id="subdecisions">
                    <label for="subdecisionSelect">${theme.subdecisions.selectLabel}</label>
                    <select class="browser-default custom-select" id="subdecisionSelect" oninput="subdecisionSelect(this)">
                        <option hidden="" disabled="" selected=""></option>
                        ${
                            theme.subdecisions.selectOptions.map(option => `
                                <option>${option.name}</option>
                            `).join('')
                        }
                    </select>
                    <div hidden="" class="subdecision-detail" id="subdecisionDetail">
                        ${
                            theme.subdecisions.selectOptions.map(option => `
                                <span hidden="" id="${option.name}">${option.detail}</span>
                            `).join('')
                        }
                    </div>
                </div>`
            } 
        </div>
    </div>
`).join('');
