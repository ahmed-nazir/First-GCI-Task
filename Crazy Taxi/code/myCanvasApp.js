/**
 * @author Sam Scott, Sheridan College, 2013
 */

//***************************
//Variables
//***************************

////////////////Images Import//////////////
	//Background Images
var background = new Image();
background.src = "images/background2.png"
var backgroundmenu = new Image();
backgroundmenu.src = "images/menu.png"
	//Power Up and obsticals
var person = new Image();
person.src = "images/person.png"
var pylon = new Image();
pylon.src = "images/pylon.png"
var powerup = new Image();
powerup.src = "images/powerup.png"
	//Player 1
var carup = new Image();
carup.src = "images/carup.png"
var cardown = new Image();
cardown.src = "images/cardown.png"
var carleft = new Image();
carleft.src = "images/carleft.png"
var carright = new Image();
carright.src = "images/carright.png"
	//Player 2
var car2up = new Image();
car2up.src = "images/car2up.png"
var car2down = new Image();
car2down.src = "images/car2down.png"
var car2left = new Image();
car2left.src = "images/car2left.png"
var car2right = new Image();
car2right.src = "images/car2right.png"


var buttonclick = 0;
var startgame = false;
var startgame2 = false;
var time = 59;
var increment = 0.03;
var score = 0;
var score2 = 0;
var help = false;
var rulescreen = false;

		
	//Car position and speed
var carX = 500;
var carY = 250;
var carX2 = 100;
var carY2 = 250;
var speed = 5;
var speed2 = 5;
var cardirec = ""; //car1 direction
var cardirec2 = ""; //car2 direction
var carimagedir = carleft;
var carimagedir2 = car2right;

	//Person & Obsical Positon
var powerupX = Math.floor(Math.random() * ((680 - 10) + 1)) + 10;
var powerupY = Math.floor(Math.random() * ((480 - 10) + 1)) + 10;
var pylonX = Math.floor(Math.random() * ((680 - 10) + 1)) + 10;
var pylonY = Math.floor(Math.random() * ((480 - 10) + 1)) + 10;
var personX = Math.floor(Math.random() * ((680 - 10) + 1)) + 10;
var personY = Math.floor(Math.random() * ((480 - 10) + 1)) + 10;

//////////////Sounds/////////////////
var crash = new Audio("sounds/crash.wav");
var music = new Audio("sounds/music.wav");
var food = new Audio("sounds/food.wav");
var ping = new Audio("sounds/powerup.wav");
var winner = new Audio("sounds/winner.wav");
var error = new Audio("sounds/error.wav");




//Customize the look of the canvas app
//***************************
//Menu
//***************************
function init() {
	// CUSTOMIZE YOUR APP
	setTitle("Taxi"); // set title
	setByLine("by Ahmed Nazir"); // set name
	setCanvasSize(700,500); // canvas height and width in pixels
	setButton1("Pause"); // ("" if not using)
	setButton2("Help"); // ("" if not using)
	setButton3("Restart"); // ("" if not using)
	setTimer(20); 
	// END OF CUSTOMIZATIONS 
	
}
function menu(){ //Menu Screen before the game
	canvas.drawImage(backgroundmenu,0, 0);
	canvas.fillStyle = "black";	
	canvas.font = "70px Georgia";
	canvas.fillText("Crazy Taxi",200,150);
	canvas.font = "30px Georgia";	
	canvas.fillRect(265,230,210,40);
	canvas.fillRect(265,320,210,40);
	canvas.fillRect(323,395,90,40);
	canvas.fillStyle = "White";	
	canvas.fillText("2 Player Mode",275,260);
	canvas.fillText("1 Player Mode",275,350);
	canvas.fillText("Rules",330,425);
	music.play();
	music.volume = 0.25;
	
	if (startgame === true){ //game 1 starts
		draw();
		movecar();
		rules(); 
	} else if (startgame2 === true){ //game 2 starts
		draw2();
		movecar();
		rules2();
		counttimer();
	} else if (rulescreen === true){
		canvas.drawImage(backgroundmenu,0,0);
		canvas.font = "50px Georgia";
		canvas.fillStyle = "black";
		canvas.fillText("Rules of the Game",150,120);
		canvas.font = "30px Georgia";
		canvas.drawImage(powerup,60,170);
		canvas.fillText("= Powerup (Your Speed Increases)",100,200);
		canvas.drawImage(person,50,220);
		canvas.fillText("= Person (Get the person to get points)",100,250);
		canvas.drawImage(pylon,60,280);
		canvas.fillText("= Pylon ('-2' points if hit, < -2 = Game Over)",100,310);
		canvas.fillText("*Hitting the borders resets the score and speed*",40,370);
		canvas.fillText("*Hitting each other resets speed and position*",60,420);
	}
}



//***************************
//Drawing The Screen
//***************************
   //* Draws the 2 player mode game *//
function draw(){
	// Background
	canvas.drawImage(background,0, -2);
	
	// Food
	
	// Score
	canvas.fillStyle = "white";
	canvas.font = "30px Georgia";
	canvas.fillText("Player 1: " + score,525,30);
	canvas.fillText("Player 2: " + score2,10,30);
	
	//Players 
	canvas.drawImage(carimagedir,carX, carY); //Player 1
	canvas.drawImage(carimagedir2,carX2,carY2); //Player2
	canvas.drawImage(powerup,powerupX,powerupY); //PowerUp
	canvas.drawImage(person,personX,personY); //Person
	canvas.drawImage(pylon,pylonX,pylonY); //pylon
}

 //*Draws the 1 player mode game *//
function draw2(){
	//Background
	canvas.drawImage(background,0, -2);
				
	// Score
	canvas.fillStyle = "white";
	canvas.font = "30px Georgia";
	canvas.fillText("Player 1: " + score,525,30);
	canvas.fillText("Speed: " + (speed-5) + "x",60,30);
	
	//Player/Powerup/Person
	canvas.drawImage(carimagedir,carX, carY); //Player
	canvas.drawImage(powerup,powerupX,powerupY); // Powerup
	canvas.drawImage(person,personX,personY); //Person
	canvas.drawImage(pylon,pylonX,pylonY); //pylon
}


//***************************
//Rules / Collisions
//***************************
function rules(){
	
	//<If car 1 hits the person they get a point>
	if (((carX >= personX || carX+60 >= personX) && ( carX+60 <= personX+55||carX <= personX+55))&& ((carY >= personY || carY+60 >= personY) && (carY+60 <= personY+40||carY <= personY+40))){
		food.play();
		personX = Math.floor(Math.random() * (680 - 10 + 1)) + 10; //Respawns Person x
		personY = Math.floor(Math.random() * (480 - 10 + 1)) + 10; //Respawns Person y
		score += 1; // adds to player 1 score
	}else if (((carX2 >= personX || carX2+60 >= personX) && ( carX2+60 <= personX+55||carX2 <= personX+55))&& ((carY2 >= personY || carY2+60 >= personY) && (carY2+60 <= personY+40||carY2 <= personY+40))){
		food.play();
		personX = Math.floor(Math.random() * (680 - 10 + 1)) + 10; //respawns person x
		personY = Math.floor(Math.random() * (480 - 10 + 1)) + 10; //respawns person y
		score2 += 1; // adds to player 2 score
	}
	
	//<If the cars hit the power up they go faster>
	if (((carX >= powerupX || carX+60 >= powerupX) && ( carX+60 <= powerupX+29||carX <= powerupX+29))&& ((carY >= powerupY || carY+60 >= powerupY) && (carY+60 <= powerupY+39||carY <= powerupY+39))){
		ping.play();
		speed += 1; //Speed increases player 1
		powerupX = Math.floor(Math.random() * (680 - 10 + 1)) + 10; //respawns powerup x
		powerupY = Math.floor(Math.random() * (480 - 10 + 1)) + 10; //respawns powerup y
	}else if (((carX2 >= powerupX || carX2+60 >= powerupX) && ( carX2+60 <= powerupX+29||carX2 <= powerupX+29))&& ((carY2 >= powerupY || carY2+60 >= powerupY) && (carY2+60 <= powerupY+39||carY2 <= powerupY+39))){
		ping.play();
		speed2 +=1; //Speed increase player 2
		powerupX = Math.floor(Math.random() * (680 - 10 + 1)) + 10; //respawns powerup x
		powerupY = Math.floor(Math.random() * (480 - 10 + 1)) + 10; //respawns powerup y
	}	
	
	//<If the cars hit each other they reset>
	if (((carX >= carX2 || carX+66 >= carX2) && ( carX+66 <= carX2+66||carX <= carX2+66))&& ((carY >= carY2 || carY+66 >= carY2) && (carY+66 <= carY2+66||carY <= carY2+66))){
		carX = 500; //************************************
		carY = 250;    	//Resets car 1 & 2 x and y values
		carX2 = 100;
		carY2 = 250; //***********************************
		cardirec = "";   	//Resets car movement & direction
		cardirec2 = ""; //********************************
		speed = 5;			//Resets Speed for both cars
		speed2 = 5;  //***********************************
		crash.play(); //Plays crash sound
	}
	
	//<If the car hits the pylon -2 points>
	if (((carX >= pylonX || carX+60 >= pylonX) && ( carX+60 <= pylonX+35||carX <= pylonX+35))&& ((carY >= pylonY || carY+60 >= pylonY) && (carY+60 <= pylonY+35||carY <= pylonY+35))){
		error.play();
		pylonX = Math.floor(Math.random() * (680 - 10 + 1)) + 10; //Resets pylon x
		pylonY = Math.floor(Math.random() * (480 - 10 + 1)) + 10; //Resets pylon y
		score -= 2; //score - 2
	}else if (((carX2 >= pylonX || carX2+60 >= pylonX) && ( carX2+60 <= pylonX+35||carX2 <= pylonX+35))&& ((carY2 >= pylonY || carY2+60 >= pylonY) && (carY2+60 <= pylonY+35||carY2 <= pylonY+35))){
		error.play();
		pylonX = Math.floor(Math.random() * (680 - 10 + 1)) + 10; //Resets pylon x
		pylonY = Math.floor(Math.random() * (480 - 10 + 1)) + 10; //resets pylon y
		score2 -= 2; //score -2
	}
	boarders();	
	obsticalcollision();
	scoredisp();
	
	//<Changes the name of the button each time its clicked>
	//<Also the pasue/start function of the screen which stops the game nd starts the game>
	if (buttonclick % 2 != 0){ //pause
		cardirec = ""
		cardirec2 = ""
		increment = 0;
		setButton1("Start");
	}else if (buttonclick % 2 === 0){ //play
		increment = 0.03;
		setButton1("Pause");
	}
}
function rules2(){
	
	//<If the car touches the person then they get a point>
	if (((carX >= personX || carX+60 >= personX) && ( carX+60 <= personX+55||carX <= personX+55))&& ((carY >= personY || carY+60 >= personY) && (carY+60 <= personY+40||carY <= personY+40))){
		food.play(); //Plays sound
		personX = Math.floor(Math.random() * (680 - 10 + 1)) + 10; //Person respawns in x
		personY = Math.floor(Math.random() * (480 - 10 + 1)) + 10; //Person respawns in y
		score += 1; //Adds to score
	}
	
	//<If the car touches the powerup then they get a speed boost>
	if (((carX >= powerupX || carX+60 >= powerupX) && ( carX+60 <= powerupX+29||carX <= powerupX+29))&& ((carY >= powerupY || carY+60 >= powerupY) && (carY+60 <= powerupY+39||carY <= powerupY+39))){
		ping.play(); //plays sound
		speed += 1; //Speed increases
		powerupX = Math.floor(Math.random() * (680 - 10 + 1)) + 10; //Powerup respawns in x
		powerupY = Math.floor(Math.random() * (480 - 10 + 1)) + 10; //Powerup respawns in y
	}
	
	//<If the car hits the pylon -2 points>
	if (((carX >= pylonX || carX+60 >= pylonX) && ( carX+60 <= pylonX+35||carX <= pylonX+35))&& ((carY >= pylonY || carY+60 >= pylonY) && (carY+60 <= pylonY+35||carY <= pylonY+35))){
		error.play();
		pylonX = Math.floor(Math.random() * (680 - 10 + 1)) + 10; //Resets pylon x
		pylonY = Math.floor(Math.random() * (480 - 10 + 1)) + 10; //Resets pylon y
		score -= 2; //score - 2
	}
	
	boarders();
	obsticalcollision();
	
	//<Changes the name of the button each time its clicked>
	//<Also the pasue/start function of the screen which stops the game nd starts the game>
	if (buttonclick % 2 != 0){
		cardirec = ""
		increment = 0;
		setButton1("Start");
	}else if (buttonclick % 2 === 0){
		increment = 0.03;
		setButton1("Pause");
	}
}
function obsticalcollision(){
	
	//<If any obsicles spawn in the same place it will respawn>
	
	if(powerupX === personX && powerupY === personY){
		powerupX = Math.floor(Math.random() * (680 - 10 + 1)) + 10;
		powerupY = Math.floor(Math.random() * (680 - 10 + 1)) + 10;
		personX = Math.floor(Math.random() * (680 - 10 + 1)) + 10;
		personY = Math.floor(Math.random() * (680 - 10 + 1)) + 10;
	} else if (pylonX === personX && pylonY === personY){
		personX = Math.floor(Math.random() * (680 - 10 + 1)) + 10;
		personY = Math.floor(Math.random() * (680 - 10 + 1)) + 10;
		pylonX = Math.floor(Math.random() * (680 - 10 + 1)) + 10;
		pylonY = Math.floor(Math.random() * (680 - 10 + 1)) + 10;
	} else if (pylonX === powerupX && powerupY === pylonY){
		pylonX = Math.floor(Math.random() * (680 - 10 + 1)) + 10;
		pylonY = Math.floor(Math.random() * (680 - 10 + 1)) + 10;
		powerupX = Math.floor(Math.random() * (680 - 10 + 1)) + 10;
		powerupY = Math.floor(Math.random() * (680 - 10 + 1)) + 10;
	}
}
function boarders(){
	
	//<If any car hits the edge of the canvas speed and position is reset>
	
	if (carY >= 445){ //Bottom of canvas
		error.play();
		carX = 500;
		carY = 250;
		score = 0;
		cardirec = "";
		speed = 5;
	}
	if (carY <= -5){   //Top of canvas
		error.play();
		carX = 500;
		carY = 250;
		score = 0;
		cardirec = "";
		speed = 5;
	}
	if (carX >= 645){ //Right of canvas
		error.play();
		carX = 500;
		carY = 250;
		score = 0
		cardirec = "";
		speed = 5;
	}
	if (carX <= -5){ //Left of canvas
		error.play();
		carX = 500;
		carY = 250;
		score = 0;
		cardirec = "";
		speed = 5;
	}	
	if (carY2 >= 445){ //Top of canvas
		error.play();
		carX2 = 100;
		carY2 = 250;
		score2 = 0;
		cardirec2 = "";
		speed2 = 5;
	}
	if (carY2 <= -5){ //Bottom of canvas
		error.play();
		carX2 = 100;
		carY2 = 250;
		score2 = 0;
		cardirec2 = "";
		speed2 = 5;
	}
	if (carX2 >= 645){ //Right of canvas
		error.play();
		carX2 = 100;
		carY2 = 250;
		score2 = 0
		cardirec2 = "";
		speed2 = 5;
	}
	if (carX2 <= -5){ //Left of canvas
		error.play();
		carX2 = 100;
		carY2 = 250;
		score2 = 0;
		cardirec2 = "";
		speed2 = 5;
	}
}

function counttimer(){
	canvas.fillStyle = "white";
	canvas.font = "50px Comic Sans MS";
	canvas.fillText((Math.round((1+time)*100)/100).toFixed(1),335,45);//Displays the counter to 1 decimal place
	time -= increment; // timer - the increment
	
	//<If the timer reaches 0 the game over screen will come
	if((Math.round((1+time)*100)/100).toFixed(0) <= 0){
		music.volume = 0.1;
		canvas.drawImage(background,0, -2); //draws background
		canvas.fillText("Your Final Score is " + score,110,300); //score diplay
		canvas.font = "70px Comic Sans MS";
		canvas.fillText("Game Over",170,220);
		canvas.font = "30px Comic Sans MS";
		canvas.fillText("Press ESC to Exit",220,40);
		time = -1 // timer stops at 0
		cardirec = "" //car doesnt move
	}
}
//*****************************
//Score
//*****************************

function scoredisp(){

	//Player 1
	//<If player 1 gets 10 points or player 2 gets lower then -2 player 1 wins>
	if (score >=10 || score2 < -2){
		music.volume = 0.1
		canvas.drawImage(background,0, -2); //Draws background
		cardirec = ""; //Stops the car from moving
		cardirec2 = ""; 
		canvas.font = "80px Comic Sans MS";
		canvas.fillText("Player 1 Wins!",90,280);
		canvas.font = "30px Comic Sans MS";
		canvas.fillText("Press ESC to Exit",220,40);	
		canvas.font = "40px Georgia";
		canvas.fillText("Player 1: " + score,490,480); //Displays the final scores
		canvas.fillText("Player 2: " + score2,10,480);		
	}
	
	//Player 2
	//<If player 2 gets 10 points or player 1 gets lower then -2 player 2 wins>
	if (score2 >=10 || score < -2){
		music.volume = 0.1
		canvas.drawImage(background,0, -2); //Draws background
		cardirec2 = ""; //Stops car moving
		cardirec = ""
		canvas.font = "80px Comic Sans MS";
		canvas.fillText("Player 2 Wins!",90,280);
		canvas.font = "30px Comic Sans MS";
		canvas.fillText("Press ESC to Exit",220,40);
		canvas.font = "40px Georgia";
		canvas.fillText("Player 1: " + score,490,480); //displays the final scores
		canvas.fillText("Player 2: " + score2,10,480);
	}
}

//*****************************
//Moving the car
//*****************************

//<If the car is faced a certain direction it will move in that diraction>

function movecar(){
	//Player 1 Movement
	if (cardirec === "up")
	{carY = carY - speed;}
	else if (cardirec === "down")
	{carY = carY + speed;}
	else if (cardirec === "left")
	{carX = carX - speed;}
	else if (cardirec === "right")
	{carX = carX + speed;}
	
	// Player 2 Movement 
	if (cardirec2 === "down")
	{carY2 += speed2;}
	else if (cardirec2 === "up")
	{carY2 -= speed2;}
	else if (cardirec2 === "left")
	{carX2 -= speed2;}
	else if (cardirec2 === "right")
	{carX2 += speed2;}
}
	
//*****************************
//KEYBOARD INPUT SECTION
//*****************************
  //*Changes the direction of the appropriate player*//
  //*@param (number) code The key code of the key pressed *//
  //*@param (string) char A single character string for the key pressed*//

  //<If the escape key is pressed all variables are reset>
  
  function keyDown(code, char) {
	//debugOut("key press, code="+code+" char="+char);
	if (code === 27){ //Esc Key
		startgame = false;
		startgame2 = false;
		rulescreen = false;
		carX = 500;
		carY = 250;
		carX2 = 100;
		carY2 = 250;
		cardirec = "";
		cardirec2 = "";
		speed = 5;
		speed2 = 5;
		score = 0;
		score2 = 0;
		time=59;
		increment = 0.3;
		setButton1("Pause");
		buttonclick = 0;
		music.pause();
	}


// Game Movements//
	
	//<The Players car direction, if a direction key is pressed 
	//the car will change to that direction>
	
	/*Player 1*/
	if (code === 38) { //Up Arrow                
		cardirec = "up";
		carimagedir = carup;
	} else if (code === 40) { //Down Arrow
		cardirec = "down";
		carimagedir = cardown;
	} else if (code === 37) { //Left Arrow
		cardirec = "left";
		carimagedir = carleft;
	} else if (code === 39) { //Right Arrow
		cardirec = "right";
		carimagedir = carright;                     
	}
	/*Player 2*/
	if (code == 87) { //W Key
		cardirec2 = "up"
		carimagedir2 = car2up;
	} else if (code == 83) { //S Key
		cardirec2 = "down"
		carimagedir2 = car2down;
	} else if (code == 65) { //D Key
		cardirec2 = "left"
		carimagedir2 = car2left;
	} else if (code == 68) { //A Key
		cardirec2 = "right"
		carimagedir2 = car2right; 
	}                                            
}


// <NOT USED>
function keyPress(code, char) {}
 //Stops player movement when a key is lifted 
// * @param (number) code The key code of the key released 
 //* @param (string) char A single character string for the key released
function keyUp(code, char) {
	//debugOut("key up, code="+code+" char="+char);
}


//*****************************
//MOUSE INPUT SECTION
//*****************************
function mouseDown(x, y, button) {
	if (startgame === false && startgame2 === false){ // only works in menu screen and not in games
		//<If you click the buttons with a mouse diffrent modes will start>
		if ((x >= 265) && (x <= 265+210) && (y >= 230) && (y <= 230+40)){ 
			startgame = true; //Starts 2 player mode
			startgame2 = false; //turns off 1 player mode
			rulescreen = false; //turns off rules screen
		}
		else if ((x >= 265) && (x <= 265+210) && (y >= 320) && (y <= 320+40)){
			startgame2 = true; //Starts 1 player mode
			startgame = false; //turns off 2 player mode
			rulescreen = false; //turns off rules screen
		}
		else if ((x >= 323) && (x <= 323+90) && (y >= 395) && (y <= 395+40)){
			rulescreen = true; //Starts rules screen
			startgame = false; //turns off 2 player mode
			startgame2 = false; // turns off 1 player mode
		}
	}
}

function mouseUp(x, y, button) {}
function mouseMove(x, y) {}
function mouseOver(x, y) {}
function mouseOut(x, y) {}
//*****************************
//BUTTON INPUT SECTION
//*****************************

//* Starts/Pauses the game *//
function button1Click(button) {
	//debugOut(buttonclick);
	buttonclick += 1;
}

//* Displays the buttons layout (Help) *//
function button2Click(button) { //Help
	alert("Player 1 Use Arrow Keys\nPlayer 2 Use:\n     W:Up\n     A:Left\n     S:Down\n     D: Right \n\n ***ESC TO EXIT***");
}

//* Restarts the game *//
function button3Click(button){
	carX = 500;
	carY = 250;
	carX2 = 100;
	carY2 = 250;
	cardirec = "";
	cardirec2 = "";
	speed = 5;
	speed2 = 5;
	score = 0;
	score2 = 0;
	time=59;
}

//****************************
//TIMER SECTION
//****************************
//* Main game method*//
function clockTickEvent() {
	//debugOut("tick");
	menu();
}