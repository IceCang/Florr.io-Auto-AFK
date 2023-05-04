// ==UserScript==
// @name         Florr.io Auto AFK
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Auto AFK in florr.io
// @author       liucang (3060272052@qq.com)
// @match        https://florr.io/
// @icon         https://florr.io/favicon.ico
// @grant        none
// ==/UserScript==

'use strict';

const warnWindow = document.createElement('div');

const warn = (text) => {
    warnWindow.innerText = text;
    warnWindow.style.opacity = "1";
    setTimeout(()=>{warnWindow.style.opacity = "0";}, 3000);
}

(function() {
    warnWindow.style.position = "absolute";
    warnWindow.style.top = "30%";
    warnWindow.style.margin = "0 auto";
    warnWindow.style.background = "#00000077";
    warnWindow.style.color = "#FFFFFF"
    warnWindow.style.fontFamily = "Ubuntu";
    warnWindow.style.textShadow = "rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px";
    warnWindow.id = "warn-window"
    warnWindow.style.width = "16%";
    warnWindow.style.paddingTop = "5px";
    warnWindow.style.paddingBottom = "5px";
    warnWindow.style.paddingLeft = "25px";
    warnWindow.style.paddingRight = "25px";
    warnWindow.style.zIndex = "999";
    warnWindow.style.transition = "all 1s ease-in-out";
    warnWindow.style.opacity = "0";
    warnWindow.style.fontSize = "28px";
    warnWindow.style.textAlign = "center";
    warnWindow.style.left = "42%";
    warnWindow.style.cursor = "default";
    warnWindow.style.borderRadius = "5px";
    const node = document.getElementsByTagName('canvas')[0];
    node.parentNode.insertBefore(warnWindow, node);

    warn("Florr.io Auto AFK\nThis is NOT done yet.")

    document.documentElement.addEventListener("keydown", (e) => {
        if(e.keyCode === 80) {
            warn("Florr.io Auto AFK\nThis is NOT done yet.")
        }
    })
})();