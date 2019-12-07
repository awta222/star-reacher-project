const url = window.location.href+'/';

const quickSearchInput = document.getElementById('quickSearchInput');
const fullSearchInput = document.getElementById('fullSearchInput');
const quickMatchList = document.getElementById('match-list-quick');
const fullMatchList = document.getElementById('match-list-full');
const selectedList = document.getElementById('selectedList');
const options = () => {
    if (currentSearchType === 'quick') {return Array.from(quickMatchList.children)}
        else {return Array.from(fullMatchList.children)}
}

var currentSearchType = 'full';
var selectedItems = [];

var fullSearchQuery = {
    itemName: '', 
    category: [], 
    Price: 0, 
    Level: {min: '', max: ''},
    subfilters: []
};



quickSearchInput.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowUp': arrowUp(); break;
        case 'ArrowDown': arrowDown(); break;
        case 'Enter': if (highlightedOptionIndex() > -1) {itemSelect()} break;
        default:  clearFocus(); break;
    }
});

fullSearchInput.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowUp': arrowUp(); break;
        case 'ArrowDown': arrowDown(); break;
        case 'Enter': 
            if (highlightedOptionIndex() > -1) {itemSelect()}
                else if (fullSearchInput === document.activeElement) {fullSearchEquipment()}
            break;
        case 'Escape': clearFocus(); break;
        default: clearFocus(); break;
    }
});

fullSearchInput.addEventListener('click', () => {
    if (options().some(opt => opt.classList.contains('focus'))) {clearFocus()}
});

$('.dropdown-menu#category').on('click', (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('dropdown-item')) {setCategoryFilter(e.target)} 
});

$('.dropdown-menu#subfilter').on('click', (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('dropdown-item')) {selectSubfilter(e.target)} 
});



async function quickSearchEquipment(searchText) {
    if (searchText.length > 2) {
        const res = await fetch(url+'/quickSearch/'+searchText);
        const list = await res.json();
        outputQuickSearch(list);
    } else {quickMatchList.innerHTML = '';}
}

async function fullSearchEquipment() {
    if (fullMatchList.children.length) {clearFocus()}
    var searchText = document.getElementById('fullSearchInput').value;
    if (searchText) {fullSearchQuery.itemName = searchText} 
        else {fullSearchQuery.itemName = ''}
    const res = await fetch(url+'fullSearch/', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(fullSearchQuery)
    });
    const list = await res.json();
    outputFullSearch(list);
}

async function getSelectedItem(id) {
    const res = await fetch(url+'/getItem/'+id);
    const item = await res.json();
    addSelectedItem(item);
}

async function getItemList(idString) {
    const res = await fetch(url+'/getItemList/'+idString);
    const itemList = await res.json();
    return itemList;
}

async function getSubfilters(category) {
    const res = await fetch(url+'getSubfilters/'+category);
    const categoryProps = await res.json();
    return categoryProps;
}



function searchTypeChange(buttonId) {
    var quickSection = document.getElementById('quickSearch'),
    quickButton = document.getElementById('quick'),
    fullSection = document.getElementById('fullSearch'),
    fullButton = document.getElementById('full');
    if (buttonId === 'quick') {
        currentSearchType = 'quick'; fullMatchList.innerHTML = ''; fullSearchInput.value = '';
        quickSection.removeAttribute('hidden'); fullSection.setAttribute('hidden','');
        fullButton.classList += ' active'; quickButton.classList.remove('active');
    } else {
        currentSearchType = 'full'; quickMatchList.innerHTML = ''; quickSearchInput.value = '';
        fullSection.removeAttribute('hidden'); quickSection.setAttribute('hidden','');
        quickButton.classList += ' active'; fullButton.classList.remove('active'); 
    }
}

function setCategoryFilter(clickedElement) {
    let filterOptions = clickedElement.parentElement.children;
    let category = clickedElement.innerText;
    let button = document.getElementById('categoryDropdown');

    for (o=0;o<filterOptions.length;o++) {setCheckmark(filterOptions[o],false)}
    setCheckmark(clickedElement,true);

    if (fullSearchQuery.category != [category]) {
        var subfilter = document.getElementById('subfilter');
        document.getElementById('subfilterCount').innerHTML = 0;
        fullSearchQuery.subfilters = [];
        
        if (category != 'All') {
            getSubfilters(category)
                .then((propArray) => {
                    let html = `<div class="dropdown-item" id="filterAll">
                                    <div class="check-container"><i class="fas fa-check"></i></div>
                                    All
                                </div>`;
                    
                    for (i=0;i<propArray.length;i++) {
                        let options = propArray[i].uniqueArray.map((item) => `
                            <li class="dropdown-item"><div class="check-container"></div>${item}</li>
                        `).join('');

                        html += `<h5 class="dropdown-header">${propArray[i].propName}</h5>
                            <div id="${'filter'+propArray[i].propName}">${options}</div>`;
                        
                        fullSearchQuery.subfilters.push({propName: propArray[i].propName, values: []});
                    }
                    subfilter.innerHTML = html;
                    fullSearchQuery.category = [category];
                })
            .catch(e => console.log(e));
        } else {
            subfilter.innerHTML = `<h5 class="dropdown-header">select a category...</h5>`;
            subfilterCount.innerText = 0;
            fullSearchQuery.category = [];
            button.innerText = 'Category';
        }
    }
    button.innerText = (category == 'All') ? 'Category' : category;
}

function selectSubfilter(clickedElement) {
    let propName = clickedElement.parentElement.id.replace('filter','');
    let propValue = clickedElement.innerText;
    let allElement = document.getElementById('filterAll');

    if (propValue == 'All') {
        fullSearchQuery.subfilters.forEach((filter) => {filter.values = []});
        let allCheckmarks = document.getElementById('subfilter').querySelectorAll('.check-container');
        allCheckmarks.forEach(element => element.innerHTML = '');
        setCheckmark(allElement,true);
        updateSubfilterCount();
    } else {
        let subfilterQuery = fullSearchQuery.subfilters.find(
            (filter) => {return filter.propName == propName});

        if (!subfilterQuery.values.includes(propValue)) {
            setCheckmark(allElement,false);
            setCheckmark(clickedElement,true);
            subfilterQuery.values.push(propValue);
            updateSubfilterCount();
        } else {
            setCheckmark(clickedElement,false);
            subfilterQuery.values = subfilterQuery.values.filter(value => value != propValue);
            updateSubfilterCount();
        }
    }
}

function updateSubfilterCount() {
    var count = 0;
    for (i=0;i<fullSearchQuery.subfilters.length;i++) {
        count += fullSearchQuery.subfilters[i].values.length;
    }
    document.getElementById('subfilterCount').innerHTML = count;
    if (count === 0) {setCheckmark(document.getElementById('filterAll'),true)}
}

function priceFilterUpdate(newValue) {
    if (newValue) {fullSearchQuery.Price = newValue}
        else {fullSearchQuery.Price = ''}
}

function levelFilterUpdate(minOrMax,value) {
        if (value) {fullSearchQuery.Level[minOrMax] = value}
            else {fullSearchQuery.Level[minOrMax] = ''}
}

function setCheckmark(listElement,isChecked) {
    let checkContainer = listElement.querySelector('.check-container');
    checkContainer.innerHTML = (isChecked) ? '<i class="fas fa-check"></i>' : '';
}



function outputQuickSearch(listArray) {
    const html = listArray.map(listItem => `
        <div class="card card-body mb-1" id="${listItem._id}" 
            onmouseover="highlightOption(this)" onclick="itemSelect()">
            <div class="cardHeader">
                <span id="itemName">${listItem.itemName}</span>               
            </div>
            <span class="category">${listItem.category}</span>
            <small>Level ${listItem.Level}</small><small>${listItem.Price} credits</small>
        </div>
    `).join('');
    quickMatchList.innerHTML = html;
}

function outputFullSearch(listArray) {
    const html = listArray.map(listItem => `
        <div class="card card-body mb-1" id="${listItem._id}" 
            onmouseover="highlightOption(this)" onclick="itemSelect()">
            <div id="itemInfo">
                <span id="itemName">${listItem.itemName}</span>
                <span id="itemLevel">Lvl ${listItem.Level}</span>
            </div>         
            <div class="category">${listItem.category}</div>
        </div>
    `).join('');
    fullMatchList.innerHTML = html;
    document.getElementById('resultsCount').innerHTML = listArray.length + ' results';
}



function addSelectedItem(item) {
    const itemHeaders = (({itemName,category,_id,Level,Price}) => 
        ({itemName,category,_id,Level,Price}))(item);

    var itemDetails = Object.assign({}, item);

    let propsToRemove = ['itemName','category','_id','Level','Price','Source'];
    for (i=0;i<propsToRemove.length;i++) {delete itemDetails[propsToRemove[i]]}

    let properties = ``;
    for (let prop in itemDetails) {
        properties += `<div class="item-prop">
                            <div class="item-prop-value">${itemDetails[prop]}</div>
                            <div class="item-prop-name">${prop}</div>                           
                        </div>`
    }

    const html = `
        <div class="card card-body mb-1" id="${itemHeaders._id}">
                <div class="cardHeader">
                    <i class="fas fa-minus-circle" 
                        onclick="removeSelectedItem(this.closest('.card'))"></i>
                    <span id="itemName">${itemHeaders.itemName}</span>
                    <span class="selCategory">${itemHeaders.category}</span>
                </div>
                <small>Level ${itemHeaders.Level}</small>
                <small>${itemHeaders.Price} credits</small>
                <div class="item-properties mt-2" id="properties">
                    ${properties}
                </div>
        </div>
    `;

    selectedList.innerHTML += html;
    if (!selectedItems.includes(item)) {selectedItems.push(item);}
}

function itemSelect() {
    let index = highlightedOptionIndex();
    let selectedId = options()[index].id;
    getSelectedItem(selectedId);
}

function removeSelectedItem(e) {
    selectedItems.push(selectedItems.splice(selectedItems
        .findIndex(item => item._id == e.id),1)[0]);
    selectedItems.pop();
    e.parentNode.removeChild(e);
}

function removeAllSelected() {
    document.getElementById('selectedList').innerHTML = '';
    selectedItems = [];
}



function clearFocus() {
    let focusedItem = options().find((opt) => {return opt.classList.contains('focus')});
    if (focusedItem) {focusedItem.classList.remove('focus')}
}

function arrowUp() {
    if (options().length) {
        var index = highlightedOptionIndex();
        if (index != -1 && index != 0) {
            highlightOption(options()[index - 1]);
        }
    }
}

function arrowDown() {
    if (options().length) {
        var matchList = (currentSearchType == 'quick') ? quickMatchList : fullMatchList;
        var index = highlightedOptionIndex();
        if (index === matchList.children.length - 1) {return}
        if (index === -1) {highlightOption(options()[0])}
            else {highlightOption(options()[index + 1])}
    }
}

function highlightedOptionIndex() {
    if (options().length) {
        let highlighted = options().find((e) => {return e.classList.contains('focus')});
        return options().indexOf(highlighted);
    }
}

function highlightOption(element) {
    if (!options().length) {return}
    for (i=0;i<options().length;i++) {options()[i].classList.remove('focus')}
    element.classList.add('focus');
}