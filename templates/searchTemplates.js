module.exports = exports = {}; 

exports.fullSearchResults = (results) => results.map(result => `
    <div class="card card-body mb-1" id="${result._id}" onmouseover="highlightOption(this)" onclick="itemSelect()">
        <div id="itemInfo">
            <span id="itemName">${result.itemName}</span>
            <span id="itemLevel">Lvl ${result.Level}</span>
        </div>         
        <div class="category">${result.category}</div>
    </div>
`).join('');

exports.quickSearchResults = (results) => results.map(result => `
    <div class="card card-body mb-1" id="${result._id}" onmouseover="highlightOption(this)" onclick="itemSelect()">
        <div class="cardHeader">
            <span id="itemName">${result.itemName}</span>               
        </div>
        <span class="category">${result.category}</span>
        <small>Level ${result.Level}</small><small>${result.Price} credits</small>
    </div>
`).join('');

exports.itemCard = (item) => `
    <div class="card card-body mb-1" id="${item._id}">
        <div class="cardHeader">
            <i class="fas fa-minus-circle" 
                onclick="removeSelectedItem(this.closest('.card'))"></i>
            <span id="itemName">${item.itemName}</span>
            <span class="selCategory">${item.category}</span>
        </div>
        <small>Level ${item.Level}</small>
        <small>${item.Price} credits</small>
        <div class="item-properties mt-2" id="properties">
            ${
                Object.keys(item).map((prop)=> {
                    let omitProps = ['itemName','category','_id','Level','Price','Source'];
                    if (!omitProps.includes(prop)) {return `
                        <div class="item-prop">
                            <div class="item-prop-value">${item[prop]}</div>
                            <div class="item-prop-name">${prop}</div>                           
                        </div>
                    `} else {return ''}
                }).join('')
            }
        </div>
    </div>
`;

exports.subfilters = (subfilterObject) => `
    <div class="dropdown-item" id="filterAll">
        <div class="check-container"><i class="fas fa-check"></i></div>
        All
    </div>
    ${
        subfilterObject.map(filter => `
            <h5 class="dropdown-header">${filter.propName}</h5>
            <div id="${'filter'+filter.propName}">
                ${
                    filter.uniqueArray.map(value => `
                        <li class="dropdown-item"><div class="check-container"></div>${value}</li>
                    `).join('')
                }
            </div>
        `).join('')
    }
`;