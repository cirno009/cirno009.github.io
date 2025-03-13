let popToggle = true;
let musicPause = false;
const canvas = document.querySelector("canvas");
const drawingSurface = canvas.getContext("2d");
const button = document.querySelector("#create-cats");
const sprites = []
const pop = document.getElementById("pop");
const music = document.getElementById("music");
const counter = document.getElementById("counter");
// const togglePopSound = document.querySelector("#toggle-pop-sound");
const toggleMusic = document.querySelector("#toggle-music");

function popSoundToggle(){
    if(popToggle === true){
        popToggle = false;
        togglePopSound.innerText = "Sound: OFF";
        return popToggle
    } else {
        popToggle = true;
        togglePopSound.innerText = "Sound: ON";
        return popToggle
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
    newSprite.xSpeed = Math.random() < 0.5 ? -3 : 3;
    newSprite.ySpeed = Math.random() < 0.5 ? -3 : 3;
    sprites.push(newSprite);
    if(musicPause === false){
        music.play();
    }

    counter.innerHTML = sprites.length + " cats";
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
    if(popToggle === true){
        let sound = new Audio("pop.mp3");
        sound.play();
    }
}

    //collision detection

    for (let i=0; i<sprites.length; i++){
        let cat = sprites[i];
        if (cat.x + cat.width > canvas.width || cat.x < 0) {
            cat.xSpeed = -cat.xSpeed; // Reverse direction
            // popSound();
        }
        if (cat.y + cat.height > canvas.height || cat.y < 0) {
            cat.ySpeed = -cat.ySpeed; // Reverse direction
            // popSound();
        }
        if(cat.x - cat.width > canvas.width){
            cat.x = canvas.width - cat.width;
            console.log("Cat went out of bounds, repositioning...")
        }
        if(cat.y - cat.height > canvas.height){
            cat.y = canvas.height - cat.height;
            console.log("Cat went out of bounds, repositioning...")
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

toggleMusic.addEventListener("click", function(){
    console.log("music toggle is" + musicPause)
    if(musicPause === true){
        music.play();
        musicPause = false
        toggleMusic.innerText = "Music: ON";
    } else {
        music.pause();
        musicPause = true
        toggleMusic.innerText = "Music: OFF";
        }
})

// togglePopSound.addEventListener("click", popSoundToggle);
button.onclick = addSprite;

loadHandler();