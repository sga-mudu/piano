import {keys} from "./keys.js";
const allKeys = []; 
const audioMap = {};

//key: value 
//{q: q.mp3, w: w.mp3...}

document.addEventListener("DOMContentLoaded", () => {
    const pianoKeysContainer = document.querySelector(".piano-keys");
    createPianoKeys(pianoKeysContainer);
    preloadAudio();
    document.addEventListener("keydown", pressedKey);

    pianoKeysContainer.querySelectorAll(".key").forEach((key) => {
        key.addEventListener("click", () => playTuned(key.dataset.key));
    });
});

const createPianoKeys = (container) => {
    keys.forEach(({note, key, isBlack, mappedKey}) => {
        const li = document.createElement("li");
        li.className = `key ${isBlack ? "black" : "white"}`;
        const displayKey = mappedKey || key; 
        li.dataset.key = displayKey;
        li.innerHTML = `<div> ${note} </div>
                        <span>${key.toUpperCase()}</span>`;
        container.appendChild(li);
        allKeys.push(displayKey);
    });
}

const preloadAudio = () =>{
    allKeys.forEach((keyName) => { 
        //user = {}
        //user[name] = "Mudu"
        //user = {name: "Mudu"}

        audioMap[keyName] = new Audio(`./pianoKeys/${keyName}.mp3`);
    });
};

const pressedKey = (e) =>{
    const {mappedKey} = keys.find(({key}) => key === e.key);
    const key = mappedKey || e.key;

    if(allKeys.includes(key)){
        playTuned(key);
    }
};

const playTuned = (key) => {
    const audio = audioMap[key];
    if(!audio) return;
    audio.currenTime = 0;

    const volumeInput = document.querySelector(".volume-slider input");
    audio.volume = volumeInput.value;

    audio.play();

    const clickedKey = document.querySelector(`[data-key = "${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => clickedKey.classList.remove("active"), 150);

};


