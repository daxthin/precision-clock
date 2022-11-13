let clockDisplayItems = document.querySelectorAll('.number');
let input = document.querySelector('.input');
let consoleElement = document.querySelector('.console');

let update_interval = 1;
let canEdit = true;
let id; // interval ID

function startClock() {
    id = setInterval(() => {
        clockDisplayItems.forEach(item => Clock(item)) 
    }, update_interval);
}

startClock();

input.addEventListener('input', () => {
    InputLogic(input);
    // stop the clock when changing update interval
    clearInterval(id);    
});


input.addEventListener('keypress', e => {
    if (e.key == 'Enter') {
        // resume clock after change the update interval
        startClock();
        e.preventDefault();  
    }    
    // avoid letters on input
    if (isNaN(e.key)) {
        e.preventDefault();  
    }  
})

/**
 * 
 * @param {*} input - handle update interval input logic 
 */
function InputLogic(input) {
    const content = String(input.textContent);
    const storeFirstChar = String(input.textContent).slice(0, 1);

    if (isNaN(content)) {  
        input.textContent = 1;
    } 
    
    if (content.startsWith('0')) {
        content.split('').forEach(e => {
            if (e > 0) {
                input.textContent = content.replaceAll(0, '');
                setCaret(input, 1);
            }
        })   
    }

    if (content.length >= 4 && canEdit) {
        input.textContent = 1000;
        canEdit = false;
    } 
    else if (!canEdit) {
        canEdit = true;
        input.textContent = storeFirstChar;      
        setCaret(input, 1);
    }
    update_interval = parseFloat(input.textContent);
}

/**
 * 
 * @param {*} input element textfield
 * @param {*} pos desired position for the caret
 */
function setCaret(input, pos) {
    let range = document.createRange()
    let sel = window.getSelection()
    range.setStart(input.childNodes[0], pos)
    range.collapse(true)   
    sel.removeAllRanges()
    sel.addRange(range)
}

/**
 * 
 * @param {*} item - clock display item 
 */
function Clock(item) {
    var date = new Date;
    date.setTime(date.getTime());
    
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours();
      
    var milliSeconds = date.getMilliseconds();   

    switch (item.classList[1]) {
        case 'hour':
            item.textContent = hour;
            break;
        case 'minutes':
            item.textContent = minutes;
            break;
        case 'seconds':
            item.textContent = seconds;
            break;
        case 'mseconds':
            item.textContent = milliSeconds;
            break;
        default:
            break;           
    }
}
