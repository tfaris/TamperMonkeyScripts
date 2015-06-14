// ==UserScript==
// @name         Youtube Subscriptions Auto-Loader
// @namespace    
// @version      0.1
// @description  Loads all available subscription videos from the subscriptions feed page. Simply simulates clicking the "Load more" button.
// @author       tfaris
// @match        https://www.youtube.com/feed/subscriptions
// @grant        none
// ==/UserScript==
function loadSubs(infoElement){
    var btns = document.getElementsByClassName("browse-items-load-more-button");
    if (btns.length > 0){
        btns[0].click();
        setTimeout(function(){loadSubs(infoElement);}, 2);
    } else{
        infoElement.textContent = "Loading all sub videos... Done.";
    }
}

var container = document.getElementsByClassName("branded-page-v2-container branded-page-base-bold-titles branded-page-v2-container-flex-width branded-page-v2-has-top-row")[0], 
    element = container.getElementsByClassName("branded-page-v2-top-row")[0],
    controlsContainer = document.createElement("div"),
    infoElement = document.createElement("p"),
    helpElement = document.createElement("p");

controlsContainer.id = "all-subs-loader-ctrls";
controlsContainer.className = "feed-header yt-card clearfix";
controlsContainer.style.paddingTop = controlsContainer.style.paddingBottom = "10px";

helpElement.textContent = "GreaseMonkey Script by tfaris";
helpElement.style.textAlign = "right";
helpElement.style.fontSize = ".7em";

var startLoadBtn = document.createElement("button");
startLoadBtn.id = "load-all-sub-vids";
startLoadBtn.className = "yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-uix-button-has-icon yt-uix-button-reverse inq-no-click";
startLoadBtn.textContent = "Load All Available Subscription Videos...";

startLoadBtn.onclick = function(){
    infoElement.textContent = "Loading all available sub videos...";
    startLoadBtn.remove();
    loadSubs(infoElement);
};

controlsContainer.appendChild(helpElement);
controlsContainer.appendChild(startLoadBtn);
controlsContainer.appendChild(infoElement);

container.insertBefore(controlsContainer, element);