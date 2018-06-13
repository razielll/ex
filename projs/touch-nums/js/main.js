'use strict';

var SIZE;
var nextNum = 1;
var startTime;
var interval;

function decideTable(elBtn) {
  if (elBtn.innerText === 'Easy') SIZE = 4;
  if (elBtn.innerText === 'Medium') SIZE = 6;
  if (elBtn.innerText === 'Hard') SIZE = 8;
  populateTable();
}

function populateTable() {
  nextNum = 1;
  resetTime();
  clearInterval(interval);
  var nums = randNums();
  var gameTable = '';
  gameTable += '<table>';
  for (var i = 0; i < SIZE; i++) {
    gameTable += '<tr>';
    for (var j = 0; j < SIZE; j++) {
      gameTable += '<td onClick="cellClicked(this)">' + nums.pop() + '</td>';
    }
    gameTable += '</tr>';
  }
  gameTable += '</table>';
  document.querySelector('#gameTable').innerHTML = gameTable;
}

function cellClicked(clickedNum) {
  var currNum = +clickedNum.innerText;

  if (currNum === 1){
    startTime = Date.now();
    interval = setInterval(countTimer, 10)
  }
  if (currNum === nextNum) {
    clickedNum.style.background = getRandomColor();
    clickedNum.style.color = getRandomColor();
    nextNum++;
  }
  if (currNum === SIZE ** 2) {
    clearInterval(interval);
  }
}





function resetTime(){
  document.querySelector('#timer').innerHTML = 0 + ':' + 0;
}


function countTimer() {
  // seconds += 0.01;
  // document.getElementById('timer').innerHTML = seconds.toFixed(3);
  document.querySelector('#timer').innerHTML = parseFloat((Date.now() - startTime) / 1000).toFixed(3);
}

function randNums(nums) {
  var nums = [];
  for (var i = 0; i < SIZE ** 2; i++) {
    nums[i] = 1 + i;
  }
  nums = shuffle(nums);
  return nums;
}

function shuffle(nums) {
  var j, x, i;
  for (i = nums.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = nums[i];
    nums[i] = nums[j];
    nums[j] = x;
  }
  return nums;
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}