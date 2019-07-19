// main.js
// Find Amount for bill due by each person
// Given bill amount, and number of days the person was at home
// By M. Jameel Baig
var totalamt = 0;
var nheads = 0;
var ndays = 0;

var objs = [];

function onSubmit(){
    totalamt =  document.getElementById('totalamt').value;
    nheads =  document.getElementById('nheads').value;
    ndays =  document.getElementById('ndays').value;

    var heads = document.getElementById("heads")
    console.log(heads);
    for(let i = 0; i<nheads; i++){
        // Create Parent div of this column
        let pair = document.createElement("div")
        pair.classList.add('row', 'pairitem')

        // name column
        let namecol = document.createElement('div')
        namecol.classList.add('col-sm-6', 'col-xs-6');
        pair.appendChild(namecol);
        
        // Create Name Input
        let nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Name'
        nameInput.classList.add("form-control")
        namecol.appendChild(nameInput);
        
        // numdays col
        let numdaycol = document.createElement('div')
        numdaycol.classList.add('col-sm-6', 'col-xs-6');
        pair.appendChild(numdaycol);

        // Create Number of Days Input
        let daysInput = document.createElement('input');
        daysInput.type = 'number';
        daysInput.classList.add('form-control');
        daysInput.placeholder = 'Number of Days'
        numdaycol.appendChild(daysInput);


        heads.appendChild(pair);
    }
    // Create Enter Button
    var headssubmit = document.createElement('a');
    headssubmit.classList.add('btn', 'btn-primary')
    headssubmit.text = "Enter";
    headssubmit.href = "#"
    headssubmit.id = "headsubmit";

    // Add event listener to create next forms
    headssubmit.addEventListener('click', headEventListener);
    // Add Enter button to DOM
    // heads.parentNode.insertBefore(headssubmit, heads.nextSibling);
    heads.appendChild(headssubmit);
}


function clearField(){
    // var head = document.get
    var h = document.getElementById('heads');
    let ch = h.lastElementChild;
    while(ch){
        console.log(ch);
        h.removeChild(ch);
        ch = h.lastElementChild;
    }
    
    var r = document.getElementById('result');
    ch = r.lastElementChild;
    while(ch){
        console.log(ch);
        r.removeChild(ch);
        ch = r.lastElementChild;
    }
    // for(let ch in document.getElementById('heads').childElementCount){
    //     document.getElementById('heads').children[ch]);
    // }
}

function headEventListener(e){
    var targetel = document.getElementById('heads')
    let numChild = targetel.getElementsByClassName('pairitem').length;
    console.log(numChild);
    // children.namedItem('div');

    // Create as many forms as there number of people entered
    for(let i = 0; i<numChild; i++){
        let currChild= targetel.children[i].getElementsByTagName('input');
        console.log(currChild);
        // As per the script, first child is the name, second is n days
        let name = currChild[0].value;
        let days = currChild[1].value;

        // Create an anonymous object to my array 
        // for each name, with name, days and amount due
        objs.push({
            name: name,
            days: days,
            amtdue: 0
        });
    }

    // Sort the objects to be in descending order by days
    let minval = objs.sort(function(a, b){return a.days - b.days})[0];
    let mindays = minval.days;

    console.log(minval);
    console.log(objs);
    let tempamt = totalamt;
    let tempheads = nheads;
    var dueforhim = 0
    let prevdays = 0;
    let i = 0;

    while(i < objs.length){
        // total split among number of heads paying rn and total days
        let splitheaddays = totalamt / (ndays * tempheads);
        
        dueforhim += splitheaddays * (objs[i].days - prevdays);
        // Find number of people who have the same number of days
        let j = 0;
        objs[i].amtdue = Math.round(dueforhim * 100)/100;

        prevdays = objs[i].days;
        tempheads -= 1;
        i += 1;
    }
    console.log(objs);

    var resultul = document.createElement('ul');
    resultul.classList.add('list-group', 'col-md-6');

    for(let i = 0; i<objs.length; i++){
        let liitem = document.createElement('li')
        liitem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "col");
        liitem.innerHTML = objs[i].name;
        
        let amtspan = document.createElement('span');
        amtspan.classList.add('badge', 'badge-success', 'badge-pill');
        amtspan.innerHTML = `$ ${objs[i].amtdue}`;

        liitem.appendChild(amtspan);

        resultul.appendChild(liitem);
    }

    document.getElementById('result').appendChild(resultul);
}