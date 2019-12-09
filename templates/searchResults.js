module.exports = exports = {}; 

exports.fullSearch = (results) => results.map(result => `
<div class="card card-body mb-1" id="${result._id}" onmouseover="highlightOption(this)" onclick="itemSelect()">
    <div id="itemInfo">
        <span id="itemName">${result.itemName}</span>
        <span id="itemLevel">Lvl ${result.Level}</span>
    </div>         
    <div class="category">${result.category}</div>
</div>
`).join('');