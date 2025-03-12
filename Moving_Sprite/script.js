let popToggle = true;


const canvas = document.querySelector("canvas");
const drawingSurface = canvas.getContext("2d");
const button = document.querySelector("#create-cats");
const sprites = []
const pop = document.getElementById("pop");
const music = document.getElementById("music");
const counter = document.getElementById("counter");
const togglePopSound = document.getElementById("toggle-pop-sound");
togglePopSound.onClick = popSoundToggle;


function popSoundToggle(){
    if(popToggle === true){
        popToggle = false;
        console.log("Pop sound is off")
        return popToggle
    } else {
        popToggle = true;
        console.log("Pop sound is on")
        return true
        return popToggle;
    }
}



function loadHandler() {
    update();
}

function draw() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", draw);
draw();

let sprite = {
    x : 0,
    y : 0,
    width : 54,
    height : 72,
    xSpeed : 0,
    Yspeed : 0
}

function addSprite(){
    const newSprite = Object.create(sprite);
    newSprite.x = Math.random() * ((canvas.width - 90) - 90) + 90; //random number between canvas width-90 and 90 to account for size of the cat
    newSprite.y = Math.random() * ((canvas.height - 90) - 90) + 90; //random number between canvas height-90 and 90 to account for size of the cat
    newSprite.xSpeed = 3;
    newSprite.ySpeed = 3;
    sprites.push(newSprite);
    console.log("Add cats is running...")
    console.log("There are " + sprites.length + "cats on screen.")
    music.play();
    counter.innerHTML = sprites.length + " cats";
    console.log("sprites length " + sprites.length);
}



let cat = Object.create(sprite)
const image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "cat.png";

function update(){
    window.requestAnimationFrame(update, canvas);
    for (let i = 0; i < sprites.length; i++){
        let cat = sprites[i];
        cat.x += cat.xSpeed;
        cat.y += cat.ySpeed;
    }
    
function popSound(){
    let sound = new Audio("pop.mp3");
    sound.play();
    console.log("Pop sound played")
}

    //collision detection

    for (let i=0; i<sprites.length; i++){
        let cat = sprites[i];
        if (cat.x + cat.width > canvas.width || cat.x < 0) {
            cat.xSpeed = -cat.xSpeed; // Reverse direction
            popSound();
            console.log("collision detection is running...")
        }
        if (cat.y + cat.height > canvas.height || cat.y < 0) {
            cat.ySpeed = -cat.ySpeed; // Reverse direction
            popSound();
            console.log("collision detection is running...")
        }
    }

    render();
}

function render(){
    drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0; i < sprites.length; i++){
        let cat = sprites[i];
        drawingSurface.drawImage(image, cat.x, cat.y, cat.width, cat.height);
    }
}

button.onclick = addSprite;

console.log("Script loaded");
loadHandler();