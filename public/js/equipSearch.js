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
        const list = await res.text();
        quickMatchList.innerHTML = list;
    } else {quickMatchList.innerHTML = '';}
}

async function fullSearchEquipment() {
    if (fullMatchList.children.length) {clearFocus()}

    const res = await fetch(url+'fullSearch/', {
        method: 'POST',
        headers: {'Accept': 'text/html', 'Content-Type': 'application/json'},
        body: JSON.stringify(fullSearchQuery)
    });

    const list = await res.text();
    fullMatchList.innerHTML = list;
    document.getElementById('resultsCount').innerHTML = fullMatchList.children.length + ' results';
}

async function getSelectedItem(id) {
    if (!selectedItems.map(e=>e._id).includes(id)) {
        const res = await fetch(url+'/getItem/'+id);
        const item = await res.json();
        selectedList.innerHTML += item.html;    
        selectedItems.push(item.json);
    }
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
        var subfilterElement = document.getElementById('subfilter');
        document.getElementById('subfilterCount').innerHTML = 0;
        fullSearchQuery.subfilters = [];
        
        if (category != 'All') {
            getSubfilters(category)
                .then((subfilters) => {
                    subfilterElement.innerHTML = subfilters.html;
                    fullSearchQuery.category = [category];
                    fullSearchQuery.subfilters = subfilters.propNames.map(propName => {
                        return {propName: propName, values: []}
                    }); 
                }).catch(e => console.log(e));
        } else {
            subfilterElement.innerHTML = `<h5 class="dropdown-header">select a category...</h5>`;
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