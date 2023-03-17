const { clear } = require('console');
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  })
}

// run the program in the terminal: node index.js



/* 
    - create a first room
    - Create a minimum of 4 room objects with state machines.
      - Each room needs to have two immutable objects, a description(console.log("Message")) and a connection to another room, and one mutable object, an inventory. 
        - items in the room inventory needs to be .pop out of the room inventory array, and .push into the player inventory.
    - Create a player inventory.




*/
// class and constructor for the rooms
class NewRoom {
  constructor(name, description, inventory) {
      this.name = name
      this.desc = description
      this.inventory = inventory
  }
};
//player inventory array(mutable)
let playerInventory = []
//list of all the rooms for the state machine
let foyer = new NewRoom(
"foyer",
"description of room", 
"shoe"
);
let mainRoom = new NewRoom(
  "Main Room",
  "description of room",
);
let study = new NewRoom(
  "study",
  "your uncles study.",
  "key"
);
let leftRoom = new NewRoom(
  "Left Room",
  "description of room",
);
let rightRoom = new NewRoom(
  "Right Room",
  "description of room",
);
let hallwayRight = new NewRoom(
  "hallwayRight",
  "description of room",
);
let hallwayLeft = new NewRoom(
  "hallway left",
  "description of room",
);
let stairsUp = new NewRoom(
  "stairsUp",
  "description of room",
);

let stairsDown = new NewRoom(
  "basement stairs",
  "A dark stairway leading to an ancient looking stone door with a modern keypad lock. You feel a great sense of forboding emanating from the room behind the door..."
)
let exit = new NewRoom(
  "The Exit",
  "You've taken the safe path choosing to leave this house, and whatever mysteries it contains."
)// I was originally going to use this for the room descriptions and such, but I found a different way too. I left this for an idea where my thought process was going
let basement = new NewRoom(
  "basement",
  "You have successfully opened the door at the bottom of the stairs. The room is made entirely of stone, and is strangely lit by by sconces burning with a green blue flame even though the house has been empty for decades. The only other contents of the room are a table, and lone book set in the center of a large brass ring set in the floor. The sense of dread that permeated through the door is even stronger now, but you are inexplicably drawn to the tome. Against your better judgement you pickup the tome, and for some reason you KNOW that it is bound in human flesh. Upon opening the tome you find a handwritten note from your uncle. It reads, 'My dearest nephew, this is the Necronomicon, written long ago by the Mad Warlock Abdul Alhazred. Within it lie the very secrets of the universe, and the beings that have shaped it since time immemorial. I only hope that you are stronger of mind than I was. I was unable to view the contents and keep my sanity. Best of luck, Uncle Howard.' You want to drop the book and leave this madness behind, but almost of their own volition your hands begin to turn the page..."
)


let roomLookUp = {
  "foyer": foyer,
  "hallwayRight": hallwayRight,
  "rightRoom": rightRoom,
  "hallwayLeft": hallwayLeft,
  "leftRoom": leftRoom,
  "mainRoom": mainRoom,
  "stairsUp": stairsUp,
  "stairsDown": stairsDown,
  "basement": basement,
  "exit": exit,
  "study": study
};

let roomStates = {
  foyer: ["mainRoom", "exit"],
  hallwayRight: ["mainRoom", "rightRoom"],
  mainRoom: ["hallwayRight", "hallwayLeft", "stairsUp", "stairsDown"],
  stairsDown: ["mainRoom", "basement"],
  basement: ["stairsDown"],
  hallwayLeft: ["mainRoom", "leftRoom"],
  stairsUp: ["mainRoom", "study"],
  study: ["stairsUp"],
  rightRoom: ["hallwayRight"],
  leftRoom: ["hallwayLeft"]
};

let currentRoom = "foyer";


// function for navigating the STATE MACHINE throughout the game
 function moveRoom(newNewRoom) {

  let validMove = roomStates[currentRoom]

  if (validMove.includes(newNewRoom)) {
    currentRoom = newNewRoom;
   
  
 }

  

}

 


start()

  async function start() {
  let messageGS = "ZORK. DIRECTIONS: In this game you will be able to move through out the house and pick up items in some of the rooms. When you enter a room you will get a description of what you can see, this will include any rooms you can get to from there, and if there's any possible items to pick up. To move, when prompted type in the room you want to go to EXACTLY as the description does. To pick up an item in a room, when prompted, type grab. You will encounter locked doors, the codes for these can be found around the map. Enjoy!"
  console.log(messageGS);
  let messageGS2 = "The date is August the 23rd, and I find myself on my way to a small town in Southern Vermont. I came here because I received a letter from an estranged Uncle. It reads, 'My dear Nephew, If you are reading this I am dead. In a rare moment of lucidity I managed to write this letter to you and instruct the hospital staff to send it to you should I die. I know it has been many years since I have seen you, but it is due to my hospitalization at the Brattleboro Retreat. But I digress. I am leaving everything I have to you. My home on Bald Mountain in Windham County VT, and all it's contents, are now yours. I wish you the best. Uncle Howard...' So still in shock I head to see to my Uncles effects."
  console.log(messageGS2)
  let messageGS3 =  " Would you like to play? y or n?"
  console.log(messageGS3)
  let answerGS = await ask("")
  if (answerGS == "y"){
  foyerRoom()
  } else if (answerGS == "n") {
    process.exit();
  }
// Here I have all of the rooms as async functions, this is how the PLAYER moves throughout the game.
};

 async function foyerRoom() {
  let message = "You find yourself in the foyer of your Uncles antediluvian home. For some reason you feel uneasy being here, but you are also drawn to the home. You can see the main room, and the exit from here. What would you like to do?"
  console.log(message)
  let answer = await ask("");

  if (answer == "main room") {
    moveRoom("mainRoom");
    roomMain();
  }  else if (answer == "exit") {
    console.log("You've taken the safe path of leaving this house, and whatever mysteries it contains.");
    process.exit();
  } else if (answer != "main room" && answer != "exit") {
    console.log(`You can not do that.`);
    foyer();
  };

  // each room is attached only to certain rooms using the state machine function, and the async functions. If else determines where to go.
  
  async function roomMain() {
    let mainRoomMessage = "You are in the main room of the house. You see a left hallway, a right hallway, stairs up, stairs down and the foyer. Where would you like to go?";
    console.log(mainRoomMessage)
    let answerMR = await ask("");

    if (answerMR == "left hallway"){
      moveRoom("hallwayLeft");
      leftHallway();
    } else if (answerMR == "foyer") {
    moveRoom("foyer");
    foyer
    } else if (answerMR == "right hallway"){
    moveRoom("hallwayRight");
    rightHallway();
    } else if (answerMR == "stairs up"){
      moveRoom(stairsUp);
      upStairs();
    } else if (answerMR == "stairs down") {
      moveRoom("stairsDown");
      downStairs();
    } else if (answerMR == "foyer"){
    moveRoom("foyer"); 
    foyerRoom();
  }else if (answerMR != "left hallway" && answerMR != "foyer" && answerMR != "right hallway" && answerMR != "stairs up" && answerMR != "stairs down"){
      console.log("You can not do that.");
      roomMain();
    }

  }

  async function leftHallway() {
    console.log("You're in the left hall. From here you see the left room and the main room. Where would you like to go?");

    let answerLH = await ask("");

    if (answerLH == "left room"){
    moveRoom("leftRoom");
    roomLeft();
    } else if (answerLH == "main room") {
    moveRoom("mainRoom");
    roomMain();
    } else if (answerLH != "left room" && answerLH != "main room") {
      console.log("You can not do that.");
      leftHallway();
    }
  }

  async function roomLeft() {
    let messageLR = "You are in what appears to be an old study. On a side table you find a note with the number 1937 written on it. You can also see the left hall from here. What would you like to do?"
    console.log(messageLR);

    let answerLR = await ask ("") 
      if (answerLR == "grab") {
        playerInventory.push("note 1937");
        console.log(`You now have ${playerInventory} in your inventory`);
        roomLeftNoItem();  
  } else if (answerLR == "left hall") {
    moveRoom("hallwayLeft");
    leftHallway();
  } else if (answerLR != "left hall" && answerLR != grab) {
    console.log("You can not do that");
    roomLeft();
  }
}

  async function roomLeftNoItem() {
    let messageLR = "You are in what appears to be an old study. You can see the left hall from here. What would you like to do?"
    console.log(messageLR);

    let answerLRNI = await ask ("") 
      if (answerLRNI == "left hall") {
    moveRoom("hallwayLeft");
    leftHallway();
  } else if (answerLRNI != "left hall"){
    console.log("You can not do that");
    roomLeftNoItem();
  }

}

async function rightHallway() {
  console.log("You're in the right hallway. From here you see the right room room and the main room. Where would you like to go?");

  let answerRH = await ask("");

  if (answerRH == "right room"){
  moveRoom("rightRoom");
  roomRight();
  } else if (answerRH == "main room") {
  moveRoom("mainRoom");
  roomMain();
  } else if (answerRH != "main room" && answerRH != "left room")
  console.log("you can not do that");
  rightHallway();
};

async function roomRight() {
  console.log("You're in the right room. From here you see the right hallway. Where would you like to go?");

  let answerRR = await ask("");

  if (answerRR == "right hallway"){
  moveRoom("hallwayRight");
  roomRight();
  } else if (answerRR != "right hallway")
  console.log("you can not do that");
  rightHallway();
};

async function upStairs() {
  console.log("You're at the top of the stairs. You see a door with a key pad on it. Enter the code or leave.");

  let answerUS = await ask("");

  if (answerUS == "1937"){
  moveRoom("study");
  studyRoom();
  } else if (answerUS == "leave") {
  moveRoom("mainRoom");
  roomMain();
  } else if (answerUS != "1937" && answerUS != "leave")
  console.log("you can't do that");
  upStairs();
};

async function studyRoom() {
  console.log("You're in your uncles old study. On his desk there is a news paper from 1927 about a disastrous flood. You can see the stairs up from here. What do you want to do?");

  let answerSR = await ask("");

  if (answerSR == "stairs up"){
  moveRoom("stairsUp");
  roomRight();
  } else if (answerSR == "grab") {
  playerInventory.push("news paper from 1927");
  console.log(`You now have ${playerInventory} in your inventory.`)
  studyRoomNI();
  } else if (answerSR != "stairs up" && answerSR != "grab")
  console.log("you can not do that");
  studyRoom();
};

async function studyRoomNI() {
  console.log("You're in your uncles old study. You can see the stairs up from here. What do you want to do?");

  let answerSRNI = await ask("");

  if (answerSRNI == "stairs up"){
  moveRoom("stairsUp");
  upStairs();
  } else if (answerSRNI != "stairs up")
  console.log("you can not do that");
  studyRoomNI();
};

async function downStairs() {
  console.log("You're on a  dark stairway leading to an ancient looking stone door with a modern keypad lock. You feel a great sense of forboding emanating from the room behind the door... enter the code or leave.");

  let answerSD = await ask("");

  if (answerSD == "1927"){
  moveRoom("basement");
  basementRoom();
  } else if (answerSD == "leave") {
  moveRoom("mainRoom");
  roomMain();
  } else if (answerSD != "1927" && answerSD != "leave");
  console.log("You can not do that.");
  downStairs();
};

async function basementRoom() {
  console.log("You have successfully opened the door at the bottom of the stairs. The room is made entirely of stone, and is strangely lit by by sconces burning with a green blue flame even though the house has been empty for decades. The only other contents of the room are a table, and lone book set in the center of a large brass ring set in the floor. The sense of dread that permeated through the door is even stronger now, but you are inexplicably drawn to the tome. Against your better judgement you pickup the tome, and for some reason you KNOW that it is bound in human flesh. Upon opening the tome you find a handwritten note from your uncle. It reads, 'My dearest nephew, this is the Necronomicon, written long ago by the Mad Warlock Abdul Alhazred. Within it lie the very secrets of the universe, and the beings that have shaped it since time immemorial. I only hope that you are stronger of mind than I was. I was unable to view the contents and keep my sanity. Best of luck, Uncle Howard.' You want to drop the book and leave this madness behind, but almost of their own volition your hands begin to turn the page...");

process.exit();
};

} 