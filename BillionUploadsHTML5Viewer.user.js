// ==UserScript==
// @name         BillionUploads HTML5 Viewer
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://billionuploads.com/*
// @match        http://180upload.com/*
// @grant        none
// ==/UserScript==

$(document).ready(function(){    
    var queryStringToJSON = function (url) {
        if (url === '')
            return '';
        var pairs = (url || location.search).slice(1).split('&');
        var result = {};
        for (var idx in pairs) {
            var pair = pairs[idx].split('=');
            if (!!pair[0])
                result[pair[0].toLowerCase()] = decodeURIComponent(pair[1] || '');
        }
        return result;
    };
    
    var iceUrl = $("#iceQuickStream").attr("src");
    if (iceUrl){
        var urlData = queryStringToJSON($("<a/>").attr("href", iceUrl)[0].search);
        if (urlData && urlData.vurl){
            var viewerURL = "http://tfaris.github.io/TamperMonkeyScripts/vjs-viewer/vjs-viewer.html?v=" 
                + encodeURIComponent(urlData.vurl);
            $("body").append(
                $("<a id='cc-viewer' target='_blank' >View In HTML5</a>").attr("href", viewerURL)    
            );            
            // ** Styles **
            $("#cc-viewer").css({
                "font-size" : "26px",
                "margin"    : "30px 5px",
                "display"   : "block"
            });
            $(".tmpl").css({
                "margin-top" : "100px"
            });
        }
    }
});