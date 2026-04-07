const colors = ['black','violet','indigo','blue','green','yellow','orange','red'];

let size = 30;
let size_left = document.querySelector('.size_left');
let size_right = document.querySelector('.size_right');
let size_box = document.querySelector('.size');
let col_box = document.querySelector('.disp-col');
let col_left = document.querySelector('.col_left');
let col_right = document.querySelector('.col_right');
let col_text = document.querySelector('.color');
let main_box  = document.querySelector('.right');
let set = document.querySelector('.set');
let eraser = document.querySelector('.eraser');
let clear  = document.querySelector('.clear');
let rainbow = document.querySelector('.rainbow');

let rain  = false;
let col_idx = 0;

col_box.style.backgroundColor = colors[col_idx];
col_text.innerText = colors[col_idx];

// 🎨 Color controls
col_left.addEventListener('click',()=>{
    rain = false;
    eraser.style.backgroundColor = '#fff';
    eraser.style.color = 'black';

    if(col_idx === 0) col_idx = colors.length;
    col_idx--;

    col_box.style.backgroundColor = colors[col_idx];
    col_text.innerText = colors[col_idx];
});

col_right.addEventListener('click',()=>{
    rain = false;
    eraser.style.backgroundColor = '#fff';
    eraser.style.color = 'black';

    if(col_idx === colors.length - 1) col_idx = -1;
    col_idx++;

    col_box.style.backgroundColor = colors[col_idx];
    col_text.innerText = colors[col_idx];
});

// 📏 Size controls
size_box.innerText = size;

size_left.addEventListener('click',()=>{
    if(size > 1){
        size--;
        size_box.innerText = size;
    }
});

size_right.addEventListener('click',()=>{
    if(size < 60){
        size++;
        size_box.innerText = size;
    }
});

// 🧱 Create grid
set.addEventListener('click',()=>{
    rain = false;
    eraser.style.backgroundColor = '#fff';
    eraser.style.color = 'black';

    main_box.innerHTML = '';
    let numb = size;

    for(let i = 0; i < numb * numb; i++){
        let cell = document.createElement('div');
        cell.style.height = (600/numb)+'px';
        cell.style.width = (600/numb)+'px';
        cell.classList.add('child_div');
        main_box.appendChild(cell);
    }

    setTimeout(()=>{
        document.querySelectorAll('.child_div').forEach(child=>{
            child.style.border = 'none';
        });
    },400);
});

// 🖌️ Drawing logic (optimized)
let isMouseDown = false;
let temp = 0;

document.addEventListener("mousedown", () => {
    isMouseDown = true;
});

document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

main_box.addEventListener("mousemove", (event) => {
    if (!isMouseDown) return;

    let box = event.target;

    if (box.classList.contains("child_div")) {
        if (rain) {
            if (temp === colors.length) temp = 0;
            col_text.innerText = colors[temp];
            temp++;
        }
        box.style.backgroundColor = col_text.innerText;
    }
});

main_box.addEventListener("mousedown", (event) => {
    let box = event.target;

    if (box.classList.contains("child_div")) {
        if (rain) {
            if (temp === colors.length) temp = 0;
            col_text.innerText = colors[temp];
            temp++;
        } else {
            rainbow.style.backgroundColor = '#fff';
            rainbow.style.color = 'black';
        }
        box.style.backgroundColor = col_text.innerText;
    }
});

// 🧹 Clear
clear.addEventListener('click',()=>{
    rain = false;
    main_box.innerHTML = '';
    set.click();
});

// 🧽 Eraser
eraser.addEventListener('click',()=>{
    rain = false;
    rainbow.style.backgroundColor = '#fff';
    rainbow.style.color = 'black';

    eraser.style.backgroundColor = '#333333';
    eraser.style.color = '#fff';

    col_box.style.backgroundColor = 'white';
    col_text.innerText = 'white';
});

// 🌈 Rainbow mode
rainbow.addEventListener('click',()=> {
    rain = true;

    rainbow.style.backgroundColor = '#333333';
    rainbow.style.color = '#fff';

    eraser.style.backgroundColor = '#fff';
    eraser.style.color = 'black';
});
