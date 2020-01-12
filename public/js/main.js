(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var input = document.getElementById('search');
input.addEventListener("keyup", function(e) {
  if(e.keyCode == 13) {
    getContent();
   }
    });

  
    $('#search-result').on('click', '.movie', function(){
        $('.overlay').show();
        $(this).css('z-index', '2');
        $(this).children("div").show();
     });

     $('.overlay').on('click', function(){
        $('.overlay').hide();
        $('.movie').css('z-index', '0');
        $('.desc').hide();
     })

    
    
function getContent () {
 $("#search-result").empty();
 nodes = [];   
 $.get( "/search/"+input.value);
//  window.history.pushState("", "", "search/"+input.value);
}

//Make connection
var socket = io.connect('http://localhost:3000');

var nodes = [];
//Load movies when received
socket.on('dataReceived', function(data){ 
    if(data.query == input.value) {

  //Sort movies by node
  var bool = false;
  for(var i = 0; i < nodes.length; i++) {
    
    if(nodes[i] > data.sortId) {
        bool = true;
        nodes.splice(i, 0, data.sortId);
    $("#sortId-"+nodes[i+1]).before(`<div id="sortId-${data.sortId}" class="movie"><a href="/movies/${data.title}"><img src="${data.imgUrl}"><br><span>${data.title}</span></a><div class="desc"></div></div>`);
        break;
    }

  }
  if (!bool) {
      nodes.push(data.sortId);
      $('#search-result').append(`<div id="sortId-${data.sortId}" class="movie"><a href="/movies/${data.title}"><img src="${data.imgUrl}"><br><span>${data.title}</span></a><div class="desc"></div></div>`);

  }



}
});

},{}]},{},[1]);
