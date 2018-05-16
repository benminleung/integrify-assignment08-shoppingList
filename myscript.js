let num = 0;

// Item Constructor
function ItemObj (name, quant, done=false) {
    this.name = name;
    this.quant = quant;
    this.done = done;
    this.id = num;
    num++;
}

// Shopping List Array
const shopListArray = [
    new ItemObj('Apple', 2),
    new ItemObj('Orange', 3),
    new ItemObj('PineApple', 4, true),
    new ItemObj('PineOrange', 5, true),
    new ItemObj('Blueberries', 4, true)
];

const deletedListArray = [

];

const colorScheme = [

]

function printListMenu (type) {
    switch(type) {
        case 'shop':
            printList('done', false, 'shopListId')
            break;
        case 'done':
            printList('done', true, 'doneListId')
            break;
        case 'all':
            printList('done', false, 'shopListId')
            printList('done', true, 'doneListId')
    }
}

// Filter the properties of a given key. TargetId identifies where the html code will be inserted. Calls HTML builder.
function printList (key, propertyValue, targetId) {
        document.getElementById(targetId).innerHTML = "";
        shopListArray.filter(item => item[key] == propertyValue).forEach(item => document.getElementById(targetId).innerHTML += itemHtmlBuilder(item));
}

// Main HTML builder of the item blocks
function itemHtmlBuilder(item) {
    let itemHtml = "";

    //adds ACTIVE class to if item.done is true
    function isDone (bool) {
        return bool ? 'nonActive' : 'active';
    }

    itemHtml = `
        <div class="item">
            <label class="done" onclick="doneButton(${item.id})"><div class="tick"></div></label>
            <div class="nameQuantUnit">
                <div class="name">${item.name}</div>
                <div class="quant"> x ${item.quant}</div>
            </div>
            <label class="delete" onclick="deleteItem(${item.id})"><i class="far fa-trash-alt"></i></label>
        </div>
    `;
    return itemHtml;
}

// Click button creates new Item and erases input boxes
function newItem() {
    if (document.getElementById('itemInput').value && document.getElementById('quantInput').value) {
        shopListArray.unshift(new ItemObj(cap1stLetter(document.getElementById('itemInput').value), cap1stLetter(document.getElementById('quantInput').value)));
        document.getElementById('itemInput').value = '';
        document.getElementById('quantInput').value = '';
        printListMenu('shop');
    } else {
       alert('Please fill inputs');
    }
}

//Flips 'done' value of an item between true and flase
function doneButton(id) {
    let obj = itemById(id);
    obj.done = !obj.done;
    printListMenu('all');
}

//returns the object that has this name
function itemById (id) {
    return shopListArray.find((item) => item.id === id);
}

// Delets item
function deleteItem (id) {
    shopListArray.splice(shopListArray.indexOf(itemById(id)),1);
    printListMenu('all');
}

function cap1stLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function hideDoneList (){
    document.getElementById('doneListId').style.display == "none" ?
    document.getElementById('doneListId').style.display = "grid" :
    document.getElementById('doneListId').style.display = "none";
    console.log(document.getElementById('doneListId').style.display);
}

function printRings (number) {
    console.log('printRing was running');
    console.log(document.getElementsByClassName('headerbar'));
    for (let i = 0; i < number; i++) {
        document.getElementsByClassName('headerbar')[0].innerHTML +=
            `<div class="bind">
                <div class="ring"></div>
                <div class="hole"></div>
            </div>`;
    }
}