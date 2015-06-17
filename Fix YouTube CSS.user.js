// ==UserScript==
// @name         Fix YouTube CSS
// @namespace    none
// @version      0.1
// @description  Adds various style fixes to youtube.
// @author       tfaris
// @match        https://www.youtube.com/*
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @resource     css https://raw.githubusercontent.com/tfaris/TamperMonkeyScripts/master/tfaris-youtube-fixes.css
// ==/UserScript==
GM_addStyle(GM_getResourceText("css"));
