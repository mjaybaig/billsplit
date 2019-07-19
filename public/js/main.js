// main.js
// Find Amount for bill due by each person
// Given bill amount, and number of days the person was at home
// By M. Jameel Baig
var totalamt = 0;
var nheads = 0;
var ndays = 0;

var objs = [];
// var heads = [];
// var names = [];
function onSubmit(){
    totalamt =  document.getElementById('totalamt').value;
    nheads =  document.getElementById('nheads').value;
    ndays =  document.getElementById('ndays').value;

    var heads = document.getElementById("heads")
    for(let i = 0; i<nheads; i++){
        // Create Parent div of this column
        let div = document.createElement("div")
        div.classList.add('col')

        // Create Name Input
        let nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Name'
        div.appendChild(nameInput);
        
        // Create Number of Days Input
        let daysInput = document.createElement('input');
        daysInput.type = 'number';
        daysInput.placeholder = 'Number of Days'
        div.appendChild(daysInput);


        heads.appendChild(div);
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
    heads.parentNode.insertBefore(headssubmit, heads.nextSibling);
}

function headEventListener(e){
    var targetel = document.getElementById('heads')
    let numChild = targetel.childElementCount;

    // Create as many forms as there number of people entered
    for(let i = 0; i<numChild; i++){
        let currChild= targetel.children[i].getElementsByTagName('input');

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
        // heads.push(days);

        // names.push(name);
    }

    // Sort the objects to be in descending order by days
    let minval = objs.sort(function(a, b){return a.days - b.days})[0];
    let mindays = minval.days;

    console.log(minval);
    console.log(objs);
    let tempamt = totalamt;
    let tempheads = nheads;
    var dueforhim = 0
    let i = 0;
    while(i < objs.length){
        // total split among number of heads paying rn and total days
        let splitheaddays = totalamt / (ndays * tempheads);
        
        dueforhim += splitheaddays * (objs[i].days - objs[0].days == 0? 
            objs[i].days: 
            objs[i].days - objs[i-1].days);
        
        // Find number of people who have the same number of days
        let j = 0;
        // objs[i].amtdue = dueforhim;
        while(objs[i+j+1] && objs[i+j+1].days == objs[i].days){
            objs[i+j+1].amtdue = dueforhim;
            objs[i].amtdue = dueforhim;
            // objs[i+j+1].amtdue = dueforhim/(j+1)
            j += 1
        }
        console.log(`${j+1} people share same num of days as ${objs[i].name}`)
        if(j == 0){
            objs[i].amtdue = dueforhim
            i += 1
        }
        else{
            i += j
        }
        tempheads -= 1;
    }
    // for (let i = 0; i<objs.length; i++){
    //     if(objs[i+1] && objs[i+1].days != objs[i].days){
    //     }
    //     else{

    //         dueforhim = 
    //     }
    //     console.log(dueforhim)
    //     // for(let j = i; j<objs.length; j++){
    //     //     objs[j].amtdue += dueforhim;
    //     //     if(objs[j].days == objs[i].days){
    //     //         objs[j].amtdue = dueforhim
    //     //     }
    //     // }
    // }
    console.log(objs);
}