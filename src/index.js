// change require to es6 import style
import $ from 'jquery';
import './style.scss';

$('#main').html('Here we go!');


const Timer = {
  secondsPassed: 0,
  increment() {
    this.secondsPassed += 1;
    $('#main').text(`You've been on this page for ${this.secondsPassed} seconds!`);
  },
  trackTime() {
    setInterval(() => { this.increment(); }, 1000);
  },
};
Timer.trackTime();
