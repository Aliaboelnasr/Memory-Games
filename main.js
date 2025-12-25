// select the start game button
document.querySelector(".control-button span").onclick = function () {
  // prompt window to ask for name
  let yourname = prompt("what is your name?");
  // if name is null or empty
  if (yourname == null || yourname == "") {
    //    set name to unknown
    document.querySelector(".name span ").innerHTML = "unknown";
  }
  // name is not null
  else {
    // set name to your name
    document.querySelector(".name span ").innerHTML = yourname;
  }
  // rmove splash screen
  document.querySelector(".control-button").remove();
};

// effect duration
let duration = 1000;

// select blocks container
let blockscontainer = document.querySelector(".memory-game-blocks");

// create array from game blocks
let blocks = Array.from(blockscontainer.children);

// create range of keys

// let orderRange = [...Array(blocks.length).keys()];

let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

// let testOrderRange = [
//   1, 11, 13, 12, 18, 17, 19, 0, 2, 16, 5, 7, 9, 3, 10, 4, 6, 8, 14, 15,
// ];

//Add order css property to game blocks
blocks.forEach((block, index) => {
  // add css order property
  block.style.order = orderRange[index];

  // add click event
  block.addEventListener("click", function () {
    // trigger the flip block function
    flipBlock(block);
  });
});

// flip block function

function flipBlock(selectedBlock) {
  // add class is-flipped
  selectedBlock.classList.add("is-flipped");
  //  collect all flipped cards
  let allflippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (allflippedBlocks.length === 2) {
    // stop clicking function
    stopclicking();
    // checking matched blocks function
    checkMatchedblocks(allflippedBlocks[0], allflippedBlocks[1]);
  }
}
// if there are two selected blocks
// checking matched blocks
function checkMatchedblocks(firstblock, secondblock) {
  let triesElement = document.querySelector(".tries span");

  if (firstblock.dataset.football === secondblock.dataset.football) {
    firstblock.classList.remove("is-flipped");
    secondblock.classList.remove("is-flipped");

    firstblock.classList.add("has-match");
    secondblock.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstblock.classList.remove("is-flipped");
      secondblock.classList.remove("is-flipped");
    }, duration);
    
    document.getElementById("fail").play();
  }
}

// stop clicking function
function stopclicking() {
  // add class no-clicking on main container
  blockscontainer.classList.add("no-clicking");
  setTimeout(() => {
    // remove class no-clicking after the duration
    blockscontainer.classList.remove("no-clicking");
  }, duration);
}

// shuffle function
function shuffle(array) {
  // setting vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);

    // decrease lenth by one
    current--;
    // [1] save current element in statsh
    temp = array[current];
    // [2] current element = random element
    array[current] = array[random];
    // [3] random element =  get element from stash
    array[random] = temp;
  }

  return array;
}

// current Array [1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10]
//  New Array [1,2,3,0,5,9,7,8,6,4]

/* 

[2]  current element = random element
[3] random element =  get element from stash
*/
