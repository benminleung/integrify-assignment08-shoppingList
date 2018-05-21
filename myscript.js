let num = 0;

// Item Constructor
function ItemObj (name, quant, done=false) {
    this.name = name;
    this.quant = quant;
    this.done = done;
    this.id = `id${num}`;
    num++;

    this.doneToggle = function () {
        this.done = !this.done;
    }

    this.print = function () {
        if (this.done){
            document.getElementById('doneListId').appendChild(itemElementCreater(this));
        } else {
            document.getElementById('shopListId').appendChild(itemElementCreater(this));
        }
    }

    this.print();
}

// Shopping List Array
const shopListArray = [
    new ItemObj('Apple', 2),
    new ItemObj('Orange', 3),
    new ItemObj('PineApple', 4, true),
    new ItemObj('PineOrange', 5, true),
    new ItemObj('Blueberries', 4, true),
    new ItemObj('Kale', 2),
    new ItemObj('Tomato', 3),
    new ItemObj('Potato', 4, true),
    new ItemObj('Lemon', 5, true),
    new ItemObj('Pear', 4, true),
    new ItemObj('Milk', 2),
    new ItemObj('Butter', 3),
    new ItemObj('Rice', 4, true),
    new ItemObj('Pasta', 5, true),
    new ItemObj('Candy', 99, true)
];

// Main HTML builder of the item blocks
function itemElementCreater(item) {
    // console.log('itemELementCreater activated')
    // console.log(item);
    //creates item <div>
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.id = item.id;
    itemDiv.addEventListener('click', e => eventHandler(e, itemDiv.id));
    itemDiv.addEventListener('mouseover', e => mouseOverHandler(e, itemDiv.id))
    itemDiv.addEventListener('mouseout', e => mouseOutHandler(e, itemDiv.id))
    
        //creates done <label>
        const done = document.createElement('label');
        done.className = 'done';

            //creates tick <div>
            const tick = document.createElement('div');
            tick.className = 'tick';

        done.appendChild(tick);

        //creates nameQuantUnit <div>
        const nameQuantUnit = document.createElement('div');
        nameQuantUnit.className = 'nameQuantUnit';
        
            //creates name <div>
            const name = document.createElement('input');
            name.className = 'name';
            name.type = 'text';            
            name.id = `${item.id}name`;
            name.value = `${item.name}`;
            name.readOnly = true;
            //OLD way of creating name with DIV tag.
            // const name = document.createElement('div');
            // name.className = 'name';
            // name.id = `${item.id}name`;
            // var nameText = document.createTextNode(`${item.name}`)
            // name.appendChild(nameText);

            //creates quant <div>
            const quant = document.createElement('input');
            quant.className = 'quant';
            quant.type = 'number';
            quant.min = 0;
            quant.id = `${item.id}quant`;
            quant.value = `${item.quant}`;
            quant.readOnly = true;
            // const quant = document.createElement('div');
            // quant.className = 'quant';
            // quant.id = `${item.id}quant`;
            // var quantNum = document.createTextNode(`${item.quant}`)
            // quant.appendChild(quantNum);

        nameQuantUnit.appendChild(name);
        nameQuantUnit.appendChild(quant);

        //creates edit <i>
        const edit = document.createElement('i');
        edit.className = 'edit fas fa-pencil-alt fa-2x';

        //creates delete <label>
        const remove = document.createElement('label');
        remove.className = 'delete';

            //creates trash icon <i>
            const trash = document.createElement('i');
            trash.className = 'deleteIcon far fa-trash-alt fa-2x';
        
        remove.appendChild(trash);

    itemDiv.appendChild(done);    
    itemDiv.appendChild(nameQuantUnit);
    itemDiv.appendChild(edit);
    itemDiv.appendChild(remove);

    return itemDiv;

    // console.log(itemDiv);
}

function eventHandler (e, id) {
    const target = e.target;
    // console.log(e.target);

    switch(target.classList[0]) {
        // Done button
        case 'tick':
        case 'done':
            doneButton(id);
            break;

        // Delete button
        case 'deleteIcon':
        case 'delete':
            deleteItem(id);
            break;
        
        // Edit button
        case 'edit':
           editButton(id);
        break;

        // New Item Submission
    }

}

function mouseOverHandler (e, id) {
    const target = e.target;
    // console.log(e.target);

    switch(target.classList[0]) {
        // Delete button
        case 'deleteIcon':
        case 'delete':
            // document.getElementById(id).style.background = "linear-gradient(to right, var(--primary-color), var(--primary-color), red)";
            document.getElementById(id).classList.add('deleteHover');
            break;
        
        // Edit
        case 'edit':
            document.getElementById(id).classList.add('editHover');
        break;
    }
}


function mouseOutHandler (e, id) {
    const target = e.target;
    // console.log(e.target);

    switch(target.classList[0]) {
        // Delete button
        case 'deleteIcon':
        case 'delete':
            // document.getElementById(id).style.background = '';
            document.getElementById(id).classList.remove('deleteHover');
            break;
        
        // Edit
        case 'edit':
            document.getElementById(id).classList.remove('editHover');
        break;
    }
}


function newItem() {

    //Assign item name input
    const itemInput = document.getElementById('itemInput');
    //Assign quant input value, and gives 1 if not defined by user.
    const quantInputValue = document.getElementById('quantInput').value == ""? 1: document.getElementById('quantInput').value;

    if (itemInput.value) {
        const newItem = new ItemObj(cap1stLetter(itemInput.value), quantInputValue);
        shopListArray.push(newItem);
        itemInput.value = '';
        quantInput.value = '';
    } else {
       alert('Please fill inputs');
    }
}


// Removes item element from original place and adds item element to new place. Toggles item DONE boolean.
function doneButton(id) {
    const item = itemById(id);
    console.log();
    // document.getElementById(id).remove();

    if (item.done){
        document.getElementById('shopListId').appendChild(document.getElementById(id));
    } else {
        document.getElementById('doneListId').insertBefore(document.getElementById(id), document.getElementById('doneListId').firstChild);
    }

    console.log('Done button');    
    item.doneToggle();
    debugItemsConsLog();
}

function editButton(id) {
    const text = document.getElementById(`${itemById(id).id}name`);
    const number = document.getElementById(`${itemById(id).id}quant`);
    console.log(text);
    
    text.readOnly = !text.readOnly;
    number.readOnly = !number.readOnly;

    text.readOnly || text.focus();
}

//returns the object that has this name
function itemById (id) {
    return shopListArray.find((item) => item.id === id);
}

// Deletes item from array and removes item element
function deleteItem (id) {
    console.log('Delete button');
    document.getElementById(id).remove();
    shopListArray.splice(shopListArray.indexOf(itemById(id)),1);
    debugItemsConsLog();
}


function cap1stLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Hides done list
function hideDoneList (){
    const style = document.getElementById('doneListId').style;
    style.display === "none"
        ? style.display = "grid"
        : style.display = "none";
}


function printRings (number) {
    for (let i = 0; i < number; i++) {
        document.getElementsByClassName('headerbar')[0].innerHTML +=
            `<div class="bind">
                <div class="ring"></div>
                <div class="hole"></div>
            </div>`;
    }
}

function debugItemsConsLog (){
    console.log(`DEBUG. Items remaining: ${shopListArray.length}`);
    // console.log(shopListArray);
}

printRings(6);