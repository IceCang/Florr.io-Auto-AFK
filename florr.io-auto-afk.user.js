// ==UserScript==
// @name         Florr.io Auto AFK
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Auto AFK in florr.io
// @author       liucang (3060272052@qq.com)
// @match        https://florr.io/
// @icon         https://florr.io/favicon.ico
// @grant        none
// ==/UserScript==

'use strict';

const afkPanel = document.createElement('div');
let mouseStat = 0;
let switchSlot = 1;
let openedPanel = false;
let AFKing = false;
let selected = 1;
let AFKinterval = 0;
let panelTimeout = 0;

const leftArrow = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 512\" fill=\"#AAAAAA\" height=\"28px\" style=\"display: inline-block;vertical-align: middle;\"><path d=\"M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z\"/></svg>";
const rightArrow = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 512\" fill=\"#AAAAAA\" height=\"28px\" style=\"display: inline-block;vertical-align: middle;\"><path d=\"M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z\"/></svg>";
const mouseLeft = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" height=\"28px\" style=\"display: inline-block;vertical-align: middle;\"><path d=\"M0 192H176V0H160C71.6 0 0 71.6 0 160v32z\" /><path d=\"m0 32V352c0 88.4 71.6 160 160 160h64c88.4 0 160-71.6 160-160V224H192 0zm384-32V160C384 71.6 312.4 0 224 0H208V192H384z\" fill=\"#AAAAAA\" /></svg>";
const mouseRight = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" height=\"28px\" style=\"display: inline-block;vertical-align: middle;\"><path d=\"M0 192H176V0H160C71.6 0 0 71.6 0 160v32z\" fill=\"#AAAAAA\" /><path d=\"m0 32V352c0 88.4 71.6 160 160 160h64c88.4 0 160-71.6 160-160V224H192 0z\" fill=\"#AAAAAA\" /><path d=\"m384-32V160C384 71.6 312.4 0 224 0H208V192H384z\"/></svg>";
const mouseNormal = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" height=\"28px\" fill=\"#AAAAAA\" style=\"display: inline-block;vertical-align: middle;\"><path d=\"M0 192H176V0H160C71.6 0 0 71.6 0 160v32zm0 32V352c0 88.4 71.6 160 160 160h64c88.4 0 160-71.6 160-160V224H192 0zm384-32V160C384 71.6 312.4 0 224 0H208V192H384z\"/></svg>";

const panelTitle = "<span style=\"font-size: 36px;\">Florr.io Auto AFK</span><br>";
const rowb = "<span>";
const rowe = "</span>";
const divb = "<div style=\"border-radius: 5px; padding: 5px;\">";
const divbs = "<div style=\"border-radius: 5px; background: #CCCCCC66; padding: 5px;\">";
const dive = "</div>";

const slotCode = [0, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 48]

const openPanel = (text) => {
    clearTimeout(panelTimeout)
    afkPanel.innerHTML = text;
    afkPanel.style.display = "block";
    if (openedPanel) {
        panelTimeout = setTimeout(() => { afkPanel.style.display = "none"; }, 1000);
        afkPanel.style.opacity = "0";
    }
    else afkPanel.style.opacity = "1";
    openedPanel = !openedPanel;
}

const setPanel = (text) => {
    afkPanel.innerHTML = text;
}

const generateMouseRow = () => {
    let row = "";
    if (selected === 1) {
        row += divbs;
    }
    else row += divb;
    row += rowb + "Mouse status: " + leftArrow + "&nbsp;";
    if (mouseStat === 0) {
        row += mouseLeft;
    }
    else if (mouseStat === 1) {
        row += mouseNormal;
    }
    else if (mouseStat === 2) {
        row += mouseRight;
    }
    row += "&nbsp;" + rightArrow + dive;
    return row;
}

const generateSlotRow = () => {
    let row = "";
    if (selected === 2) {
        row += divbs;
    }
    else row += divb;
    row += rowb + "Slot to switch: " + leftArrow + "&nbsp;";
    if (switchSlot === 10) row += `Slot 0`;
    else row += `Slot ${switchSlot}`;
    row += "&nbsp;" + rightArrow + dive;
    return row;
}

const generateInnerPanel = () => {
    return generateMouseRow() + generateSlotRow() + divb + rowb + "Press F to start!" + rowe + dive;
}

const startAFK = () => {
    if (AFKing) {
        AFKing = false;
        clearInterval(AFKinterval);
        if (mouseStat != 1) {
            document.getElementsByTagName("canvas")[0].dispatchEvent(new MouseEvent("mouseup", { "button": mouseStat, "clientX": 309, "clientY": 326 }))
        }
        openPanel(panelTitle + "<hr>" + "AFK Stopped!")
    }
    else {
        setInterval(() => {
            window.dispatchEvent(new KeyboardEvent("keydown", { "keyCode": slotCode[switchSlot] }));
            setTimeout(() => {
                window.dispatchEvent(new KeyboardEvent("keyup", { "keyCode": slotCode[switchSlot] }));
            },Math.random()*100);
            setTimeout(() => {
                window.dispatchEvent(new KeyboardEvent("keydown", { "keyCode": slotCode[switchSlot] }));
                setTimeout(() => {
                    window.dispatchEvent(new KeyboardEvent("keyup", { "keyCode": slotCode[switchSlot] }));
                },Math.random()*100);
            },Math.random()*100+Math.random()*100)
        },60000)
        if (mouseStat != 1) {
            document.getElementsByTagName("canvas")[0].dispatchEvent(new MouseEvent("mousedown", { "button": mouseStat, "clientX": 309, "clientY": 326 }))
        }
        AFKing = true;
        clearTimeout(panelTimeout)
        setPanel(panelTitle + "<hr>" + "AFK Enabled!")
        afkPanel.style.display = "block";
        afkPanel.style.opacity = "1";
        openedPanel = true;
    }
}

window.onload = () => {
    afkPanel.style.position = "relative";
    afkPanel.style.marginTop = "15%";
    afkPanel.style.marginBottom = "15%";
    afkPanel.style.marginLeft = "auto";
    afkPanel.style.marginRight = "auto";
    afkPanel.style.background = "#00000077";
    afkPanel.style.color = "#FFFFFF"
    afkPanel.style.fontFamily = "Ubuntu";
    afkPanel.style.textShadow = "rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px";
    afkPanel.style.width = "24%";
    afkPanel.style.paddingTop = "5px";
    afkPanel.style.paddingBottom = "5px";
    afkPanel.style.paddingLeft = "25px";
    afkPanel.style.paddingRight = "25px";
    afkPanel.style.zIndex = "999";
    afkPanel.style.transition = "all 1s ease-in-out";
    afkPanel.style.opacity = "0";
    afkPanel.style.fontSize = "28px";
    afkPanel.style.textAlign = "center";
    afkPanel.style.cursor = "default";
    afkPanel.style.borderRadius = "5px";
    afkPanel.style.display = "none";
    if (document.getElementById('container')) {
        const node = document.getElementById('container');
        node.parentNode.insertBefore(afkPanel, node);
    }

    else {
        const node = document.getElementsByTagName('canvas')[0];
        node.parentNode.insertBefore(afkPanel, node);
    }


    document.documentElement.addEventListener("keydown", (e) => {
        if (e.keyCode === 80 && !AFKing) {
            openPanel(panelTitle + "<hr>" + generateInnerPanel())
        }
        else if (e.keyCode === 38 && openedPanel && !AFKing) { // up
            if (selected === 2) selected = 1;
            setPanel(panelTitle + "<hr>" + generateInnerPanel())
        }
        else if (e.keyCode === 40 && openedPanel && !AFKing) { // down
            if (selected === 1) selected = 2;
            setPanel(panelTitle + "<hr>" + generateInnerPanel())
        }
        else if (e.keyCode === 39 && openedPanel && !AFKing) {
            if (selected === 1) {
                if (mouseStat !== 2) mouseStat++;
            }
            else if (selected === 2) {
                if (switchSlot !== 10) switchSlot++;
            }
            setPanel(panelTitle + "<hr>" + generateInnerPanel())
        }
        else if (e.keyCode === 37 && openedPanel && !AFKing) {
            if (selected === 1) {
                if (mouseStat !== 0) mouseStat--;
            }
            else if (selected === 2) {
                if (switchSlot !== 1) switchSlot--;
            }
            setPanel(panelTitle + "<hr>" + generateInnerPanel())
        }
        else if (e.keyCode === 70) {
            startAFK();
        }
    })
};

