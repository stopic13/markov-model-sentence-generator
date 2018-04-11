// change require to es6 import style
import $ from 'jquery';
$('#main').html('Here we go!');


let Timer = {
  secondsPassed: 0,
  consoleMsg: function(){
    this.secondsPassed++;
    $(`#main`).text(`You've been on this page for ${this.secondsPassed} seconds!`);
  },
   increment: function(){
     setInterval(() =>
     {this.consoleMsg()}, 1000);
   }
}
Timer.increment();
