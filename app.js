let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false; // does game start? NO cause we are waiting for key press
let level = 0; // as the game didnot start so level = 0

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game startd");
    started = true; // we dont want to start the game again and again so if our started == false means that we have to start our game\ so we initilize the started value to true
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = []; // as our level up then the user have to renter all the values from the start and if we do the correct order pressing then our level will be update and the btn will be flash

  level++;
  h2.innerText = `level : ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx]; // s sai hamre pass array sai random color ayega , aur is color class ka ham btn access kar sakte hai
  let randBtn = document.querySelector(`.${randColor}`); // s color sai ham class banayege aur os class sai os btn ko access karenge
  //   means randcolor mai array sai color value ayee hogi aur ham nai har colors ko oske name ka class diya hai so same ham randcolor (eg..yellow aya hai) osko class banake os color ko select kar lenge

  // console.log(randBtn);

  // as our random btn flash we will push that flash btn to our game seq array
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
  // means ham nai ek array sai random index select kardiya then os random index ko randomcolor array sai color ko extract kar diya aur pir os randomcolor ka class banake hamnee select kar diya and then we pass that the flash fnx to flash the random btn
}

function checkAns(idx) {
  // console.log(`current level : ${level}`);

  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      // means user enter that much values that are present in the gameseq
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `GAME OVER! Your score was <b>${level}</b> <br> press any key to restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "black";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this; // ye vahi btn ko press karega jis btn ko press kiya gaya hai
  userflash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  // we extract our id of user pressing btn and as  id = color  of that btn so we will have push
  // and now we will check that whatever we add our color is matching with our game seq or not (last added color)

  checkAns(userSeq.length - 1); // it  is printing the curr level and that level size will be equals to the size of color array seq
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

// .....  TO track the highest score of the user played game and we can print the highest score on the screeen constantly
