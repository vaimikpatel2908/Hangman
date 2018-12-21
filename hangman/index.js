var username="";
var rand = 0;
var word = "";
var numWrong = 0;
var numRight = 0;
var correctName= 0;
var characters = 0;
var blanks=0;
var a="";
var b="";
var alphabets = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ");
var actors = ["Sharukh Khan","Salman Khan","Aamir Khan","Amitabh Bachchan","John Ali","John Abhraham","Varun Dhawan","Ranveer Singh","Ranbir Kapoor","Aarjun Kapoor"];     
var actresses = ["Kareena Kapoor","Karishma Kapoor","Amrita rao","Sonam Kapoor","Sonakshi Sinha","Malika Arora","Farida Khan","Jhanvi Kapoor","Tanya Data","Priyanka Chopra"];
var movies = ["Raam Leela","Jodha AKbar","Ravan","Om Shanti Om","Baghi","Padmavat","Rowdy Rathore","Welcome","Rani","Golmaal"];
var category="";
var used=[];
var timeLeft=120; 
var timerId;
var timeOut;
var level=1;


window.onload=function (){
	if(localStorage.username != undefined)
	{
		// if user already login and left the game before game ends. 
		alert(localStorage.username);
		username=localStorage.username;
		word=localStorage.word;
		numWrong=parseInt(localStorage.numWrong);
		used=localStorage.used;
		category=localStorage.category;
		level=localStorage.level;
		if(category==="actor")
		{
			actor();
		}else if(category==="actress")
		{
			actress();
		}else if(category === "movie")
		{
			movie();
		}
		hangman();
		var r=document.getElementById("results");
		results.style.visibility = "visible";
		results.style.display = "Block";
        results.style.color = "red";
        results.innerHTML = "You only have "+(10-numWrong)+" chances left!";
		document.getElementById("mainPage").style.visibility="hidden";
		document.getElementById("mainPage").style.display="none";
		document.getElementById("rules_game").style.visibility="hidden";
		document.getElementById("rules_game").style.display="none";
	}
	else{
		
		//initializing localStorage variables for new user.
localStorage.setItem("word","");
localStorage.setItem("numWrong",0);
localStorage.setItem("category","");
localStorage.setItem("used","");
	localStorage.setItem("level",1);
	}
}

function getLevelUsername(){
	document.getElementById('levels').innerHTML="Level  :  " + level;
	document.getElementById('userdetail').innerHTML="Username  :  " + username;
}

function countdown() {
    if (timeLeft == -1) {
        stopTimer(timerId);
		timeOut=true;
        doSomething();
    } else {
        document.getElementById('timer').innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
}

function doSomething() {
	timeOut=true;
	guessLetter();
}

function resetTimer(){
	timeOut=false;
	timeLeft=120;
	var timerId = setInterval(countdown, 1000);
}

function stopTimer(timer){
	clearInterval(timer);
}


function rules(){
    document.getElementById('mainPage').style.display = "none";
	document.getElementById('start_game').style.display = "none";
    document.getElementById('rules_game').innerHTML = "1. This game is time-based. Player gets 120 seconds to correctly guess the words. <br>2. To win this game player needs to complete 6 levels <br> 3.On every wrong guess of the letter hangman is drawn. Players looses the game if complete hangman is drawn.<br/><br/> <center id='userdetails' style='margin-right:30%;'>Name : <input type='text' placeholder='Enter Name' id='username' value='' /></center>";
	document.getElementById('startBtn').style.display="block";
}
function startQuiz(){
	username=document.getElementById('username').value;
	localStorage.setItem("username",username);
	document.getElementById('mainPage').style.display = "none";
	document.getElementById('rules_game').style.display= "none";
	document.getElementById('text').innerHTML ="Choose any 1 category";
	document.getElementById('start_game').style.display = "block";
	document.getElementById('startBtn').style.display="none";
	
}
function actor(){
	getLevelUsername();
	stopTimer(timerId);
	alert("Level -: "+level);
	reset();
	var exists=false;
	while(rand ==0 || exists)
	{		
    rand = Math.floor(Math.random()*actors.length);
    word = actors[rand];
	exists=false;
	if(used.includes(word))
	{
		exists=true;
	}
	}
	category="actor";
	used[used.length]=word;
	localStorage.word=word;
	localStorage.category=category;
	localStorage.used=used;
    document.getElementById('start_game').style.display = "none";
    document.getElementById('categoryName').innerHTML ="Guess the name of this famous Bollywood Actor";
    displayLetters();
	resetTimer();
	countdown();
}
function actress(){
	getLevelUsername();
	stopTimer(timerId);
	alert("Level -: "+level);
	reset();
	var exists=false;
	while(rand ==0 || exists)
	{		
    rand = Math.floor(Math.random()*actresses.length);
    word = actresses[rand];
	exists=false;
	if(used.includes(word))
	{
		exists=true;
	}
	}
	category="actress";
	used[used.length]=word;
	localStorage.word=word;
	localStorage.category=category;
	localStorage.used=used;
    document.getElementById('start_game').style.display = "none";
    document.getElementById('categoryName').innerHTML = "Guess the name of this famous Bollywood Actress";
    displayLetters();
	resetTimer();
	countdown();
}

function movie(){
	getLevelUsername();
	stopTimer(timerId);
	alert("Level -: "+level);
	reset();
    var exists=false;
	while(rand ==0 || exists)
	{		
    rand = Math.floor(Math.random()*movies.length);
    word = movies[rand];
	exists=false;
	if(used.includes(word))
	{
		exists=true;
	}
	}
	category="movie";
	used[used.length]=word;
	localStorage.word=word;
	localStorage.category=category;
	localStorage.used=used;
    document.getElementById('start_game').style.display = "none";
    document.getElementById('categoryName').innerHTML = "Guess the name of this famous Bollywood Movie";
    displayLetters();
	resetTimer();
	countdown();
}
function displayLetters(){
	var childs=document.getElementById('letterBank').children;
	
	for(i=0;i < childs.length;i++)
	{
		childs[i].style.visibility="visible";
	}
	
	var letters=document.getElementById('wordWrap').children;
	
	for(i=0;i < letters.length;i++)
	{	letters[i].style.visibility="visible";
		letters[i].childNodes[0].nextSibling.innerHTML="";
		letters[i].childNodes[0].nextSibling.style.visibility="hidden";
		letters[i].childNodes[0].nextSibling.style.disply="none";
		letters[i].style.border="0px";
	}
     a = word.length;
     b = a-1; 
    for(i = 0; i < word.length; i++)
	{
        var letter = word.substring(b,a);
        if(alphabets.indexOf(letter) > 0)
		{
            a--;
            b--;
        }
       
    }
	a = word.length;
	b = a-1;
    while (a>0){
        characters++;
        var letter = word.substring(b,a);
        if(letter === " "){
            document.getElementById('letter'+a).innerHTML = "&nbsp;";
            document.getElementById('letter'+a).style.visibility = "hidden";
            document.getElementById('underline'+a).style.visibility = "hidden";
            document.getElementById('underline'+a).style.display = "block";
            blanks++;
        }
        else{
            document.getElementById('letter'+a).innerHTML = letter;
            document.getElementById('letter'+a).style.visibility = "hidden";
            document.getElementById('letter'+a).style.disply = "block";
            document.getElementById('underline'+a).style.display = "block";            
            document.getElementById('underline'+a).style.border = "1px solid black";
        }
        a--;
        b--;
    }
    correctName = word.length - blanks;
    document.getElementById('gamePage').style.display = "block";
    
}

function guessLetter(){
	var correct = 0;
	var results = document.getElementById('results');
	var incrctGuess="";
	if(!timeOut)
	{
		var target = event.target || event.srcElement;
		target.style.visibility = "hidden";
		var lower = target.id;
		var upper = document.getElementById(lower).getAttribute('value');
		incrctGuess=upper+",";
		var ul1 = document.getElementById('underline1').offsetWidth;
		for(a = 1; a < 26; a++){
			if(document.getElementById('letter'+a).innerHTML === upper || document.getElementById('letter'+a).innerHTML === lower){
				document.getElementById('letter'+a).style.visibility = "visible";
				correct++;
				numRight++;
			}
		}
	}
    if(correct==0){
        numWrong++;
		localStorage.numWrong=numWrong;
		incorrectGuesses(incrctGuess);
        hangman();
    }
	if(numWrong==1)
	{
		results.style.visibility = "visible";
		results.style.display = "Block";
        results.style.color = "red";
        results.innerHTML = "You only have 09 chances left!";
	}
	if(numWrong==2)
	{
		results.style.visibility = "visible";
		results.style.display = "Block";
        results.style.color = "red";
        results.innerHTML = "You only have 08 chances left!";
	}
	if(numWrong==3)
	{
		results.style.visibility = "visible";
		results.style.display = "Block";
        results.style.color = "red";
        results.innerHTML = "You only have 07 chances left!";
	}
	if(numWrong==4)
	{
		results.style.visibility = "visible";
		results.style.display = "Block";
        results.style.color = "red";
        results.innerHTML = "You only have 06 chances left!";
	}
	if(numWrong==5)
	{
		results.style.visibility = "visible";
		results.style.display = "Block";
        results.style.color = "red";
        results.innerHTML = "You only have 05 chances left!";
	}
	if(numWrong==6)
	{
		results.style.visibility = "visible";
		results.style.display = "Block";
        results.style.color = "red";
        results.innerHTML = "You only have 04 chances left!";
	}
	if(numWrong==7)
	{
		results.style.visibility = "visible";
		results.style.display = "Block";
        results.style.color = "red";
        results.innerHTML = "You only have 03 chances left!";
	}
	if(numWrong==8)
	{
		results.style.visibility = "visible";
		results.style.display = "Block";
        results.style.color = "red";
        results.innerHTML = "You only have 02 chances left!";
	}
	if(numWrong==9)
	{
		results.style.visibility = "visible";
		results.style.display = "Block";
        results.style.color = "red";
        results.innerHTML = "Oops!! Only 1 chance left";
	}
    if(numWrong==10){
		localStorage.clear();
        results.innerHTML = " Sorry You lose!!<br>Keep guessing until you get it right. ";
        document.getElementById('again').style.display = "block";
        document.getElementById('home').style.display = "block";
        /*document.getElementById('vidSent').style.display = "block";*/
		stopTimer(timerId);
    }
	
    if(numRight==correctName){
        correctGuess();
		stopTimer(timerId);
    }
}
function incorrectGuesses(wrongLetter){
	
	document.getElementById('incorrectGuess').style.display = "block";
	document.getElementById('incorrectGuess').innerHTML += wrongLetter;
	
}
function correctGuess(){
    var ul1 = document.getElementById('underline1')/*.offsetWidth;*/
    var again = document.getElementById('again');
    var results = document.getElementById('results');
        results.style.visibility = "visible";
        results.style.color = "#00b100";
    if(numWrong >= 10){
        results.innerHTML = "Good..You got the correct word,but you lost all your chances!! Better luck next time ";
        again.style.display = "block";
        document.getElementById('home').style.display = "block";
        /*document.getElementById('vidSent').style.display = "block";*/
       
    }
    else{
		if(level !== 6){
		nextLevel();
		stopTimer(timerId);
		if(category==="actor")
		{
			actor();
		}else if(category==="actress")
		{
			actress();
		}else if(category === "movie")
		{
			movie();
		}
		
        results.innerHTML = "You are Correct!";
		}
		else
		{
			
			results.innerHTML = "Congratulations!! You Won.";
			alert("Congratulations!! You Won");
		}
		
        again.style.display = "block";
        document.getElementById('home').style.display = "block";
        /*document.getElementById('vidSent').style.display = "block";*/
        
    }
}
function nextLevel(){
	//reset();
	level++;
	localStorage.level=level;
}
function reset(){
rand = 0;
word = "";
numWrong = 0;
numRight = 0;
correctName= 0;
characters = 0;
blanks=0;
a="";
b="";
letter=0;
}
function hangman()	
{
	var ctx = document.getElementById("hangman").getContext('2d');
        ctx.fillStyle = "grey";
        ctx.lineWidth=3;
        ctx.fillRect(0, 0, 300, 300);
    if(numWrong==1)
	{
		ctx.beginPath(); //ground
            ctx.moveTo(35,270);
            ctx.lineTo(265,270);
            ctx.stroke();
	}
    if(numWrong==2)
	{
		ctx.beginPath(); //ground
            ctx.moveTo(35,270);
            ctx.lineTo(265,270);
            ctx.stroke();
		ctx.beginPath(); //vertical bar
            ctx.moveTo(50,270);
            ctx.lineTo(50,25);
            ctx.stroke();
        ctx.beginPath(); //vertical bar long piece
            ctx.moveTo(65,270);
            ctx.lineTo(65,85);
            ctx.stroke();
		ctx.beginPath(); //vertical bar short piece
            ctx.moveTo(65,90);
            ctx.lineTo(65,40);
            ctx.stroke();
    }
    if(numWrong==3)
	{
		ctx.beginPath(); //ground
            ctx.moveTo(35,270);
            ctx.lineTo(265,270);
            ctx.stroke();
		ctx.beginPath(); //vertical bar
            ctx.moveTo(50,270);
            ctx.lineTo(50,25);
            ctx.stroke();
        ctx.beginPath(); //vertical bar long piece
            ctx.moveTo(65,270);
            ctx.lineTo(65,85);
            ctx.stroke();
		ctx.beginPath(); //vertical bar short piece
            ctx.moveTo(65,90);
            ctx.lineTo(65,40);
            ctx.stroke();
		ctx.beginPath(); //horizontal bar
            ctx.moveTo(49,25);
            ctx.lineTo(175,25);
            ctx.stroke();
		 ctx.beginPath(); //horizontal bar short piece
            ctx.moveTo(49,40);
            ctx.lineTo(86,40);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar long piece
            ctx.moveTo(85,40);
            ctx.lineTo(175,40);
            ctx.stroke();
        ctx.beginPath(); //small vertical bar
            ctx.moveTo(173,25);
            ctx.lineTo(173,40);
            ctx.stroke();
    }
    if(numWrong==4)
	{
		ctx.beginPath(); //ground
            ctx.moveTo(35,270);
            ctx.lineTo(265,270);
            ctx.stroke();
		ctx.beginPath(); //vertical bar
            ctx.moveTo(50,270);
            ctx.lineTo(50,25);
            ctx.stroke();
        ctx.beginPath(); //vertical bar long piece
            ctx.moveTo(65,270);
            ctx.lineTo(65,85);
            ctx.stroke();
		ctx.beginPath(); //vertical bar short piece
            ctx.moveTo(65,90);
            ctx.lineTo(65,40);
            ctx.stroke();
		ctx.beginPath(); //horizontal bar
            ctx.moveTo(49,25);
            ctx.lineTo(175,25);
            ctx.stroke();
		 ctx.beginPath(); //horizontal bar short piece
            ctx.moveTo(49,40);
            ctx.lineTo(86,40);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar long piece
            ctx.moveTo(85,40);
            ctx.lineTo(175,40);
            ctx.stroke();
        ctx.beginPath(); //small vertical bar
            ctx.moveTo(173,25);
            ctx.lineTo(173,40);
            ctx.stroke();
		ctx.beginPath(); //noose
            ctx.moveTo(150,40);
            ctx.lineTo(150,80);
            ctx.stroke();
	    }
    if(numWrong==5)
	{
		ctx.beginPath(); //ground
            ctx.moveTo(35,270);
            ctx.lineTo(265,270);
            ctx.stroke();
		ctx.beginPath(); //vertical bar
            ctx.moveTo(50,270);
            ctx.lineTo(50,25);
            ctx.stroke();
        ctx.beginPath(); //vertical bar long piece
            ctx.moveTo(65,270);
            ctx.lineTo(65,85);
            ctx.stroke();
		ctx.beginPath(); //vertical bar short piece
            ctx.moveTo(65,90);
            ctx.lineTo(65,40);
            ctx.stroke();
		ctx.beginPath(); //horizontal bar
            ctx.moveTo(49,25);
            ctx.lineTo(175,25);
            ctx.stroke();
		 ctx.beginPath(); //horizontal bar short piece
            ctx.moveTo(49,40);
            ctx.lineTo(86,40);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar long piece
            ctx.moveTo(85,40);
            ctx.lineTo(175,40);
            ctx.stroke();
        ctx.beginPath(); //small vertical bar
            ctx.moveTo(173,25);
            ctx.lineTo(173,40);
            ctx.stroke();
		ctx.beginPath(); //noose
            ctx.moveTo(150,40);
            ctx.lineTo(150,80);
            ctx.stroke();
		ctx.beginPath(); //head
            ctx.arc(150, 100, 20, 0, 2*Math.PI);
            ctx.stroke();
    }
    if(numWrong==6)
	{
		ctx.beginPath(); //ground
            ctx.moveTo(35,270);
            ctx.lineTo(265,270);
            ctx.stroke();
		ctx.beginPath(); //vertical bar
            ctx.moveTo(50,270);
            ctx.lineTo(50,25);
            ctx.stroke();
        ctx.beginPath(); //vertical bar long piece
            ctx.moveTo(65,270);
            ctx.lineTo(65,85);
            ctx.stroke();
		ctx.beginPath(); //vertical bar short piece
            ctx.moveTo(65,90);
            ctx.lineTo(65,40);
            ctx.stroke();
		ctx.beginPath(); //horizontal bar
            ctx.moveTo(49,25);
            ctx.lineTo(175,25);
            ctx.stroke();
		 ctx.beginPath(); //horizontal bar short piece
            ctx.moveTo(49,40);
            ctx.lineTo(86,40);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar long piece
            ctx.moveTo(85,40);
            ctx.lineTo(175,40);
            ctx.stroke();
        ctx.beginPath(); //small vertical bar
            ctx.moveTo(173,25);
            ctx.lineTo(173,40);
            ctx.stroke();
		ctx.beginPath(); //noose
            ctx.moveTo(150,40);
            ctx.lineTo(150,80);
            ctx.stroke();
		ctx.beginPath(); //head
            ctx.arc(150, 100, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //body
            ctx.moveTo(150,120);
            ctx.lineTo(150,190);
            ctx.stroke();
    }
	if(numWrong==7)
	{
		ctx.beginPath(); //ground
            ctx.moveTo(35,270);
            ctx.lineTo(265,270);
            ctx.stroke();
		ctx.beginPath(); //vertical bar
            ctx.moveTo(50,270);
            ctx.lineTo(50,25);
            ctx.stroke();
        ctx.beginPath(); //vertical bar long piece
            ctx.moveTo(65,270);
            ctx.lineTo(65,85);
            ctx.stroke();
		ctx.beginPath(); //vertical bar short piece
            ctx.moveTo(65,90);
            ctx.lineTo(65,40);
            ctx.stroke();
		ctx.beginPath(); //horizontal bar
            ctx.moveTo(49,25);
            ctx.lineTo(175,25);
            ctx.stroke();
		 ctx.beginPath(); //horizontal bar short piece
            ctx.moveTo(49,40);
            ctx.lineTo(86,40);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar long piece
            ctx.moveTo(85,40);
            ctx.lineTo(175,40);
            ctx.stroke();
        ctx.beginPath(); //small vertical bar
            ctx.moveTo(173,25);
            ctx.lineTo(173,40);
            ctx.stroke();
		ctx.beginPath(); //noose
            ctx.moveTo(150,40);
            ctx.lineTo(150,80);
            ctx.stroke();
		ctx.beginPath(); //head
            ctx.arc(150, 100, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //body
            ctx.moveTo(150,120);
            ctx.lineTo(150,190);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(150,135);
            ctx.lineTo(180,160);
            ctx.stroke();
    }
	if(numWrong==8)
	{
		ctx.beginPath(); //ground
            ctx.moveTo(35,270);
            ctx.lineTo(265,270);
            ctx.stroke();
		ctx.beginPath(); //vertical bar
            ctx.moveTo(50,270);
            ctx.lineTo(50,25);
            ctx.stroke();
        ctx.beginPath(); //vertical bar long piece
            ctx.moveTo(65,270);
            ctx.lineTo(65,85);
            ctx.stroke();
		ctx.beginPath(); //vertical bar short piece
            ctx.moveTo(65,90);
            ctx.lineTo(65,40);
            ctx.stroke();
		ctx.beginPath(); //horizontal bar
            ctx.moveTo(49,25);
            ctx.lineTo(175,25);
            ctx.stroke();
		 ctx.beginPath(); //horizontal bar short piece
            ctx.moveTo(49,40);
            ctx.lineTo(86,40);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar long piece
            ctx.moveTo(85,40);
            ctx.lineTo(175,40);
            ctx.stroke();
        ctx.beginPath(); //small vertical bar
            ctx.moveTo(173,25);
            ctx.lineTo(173,40);
            ctx.stroke();
		ctx.beginPath(); //noose
            ctx.moveTo(150,40);
            ctx.lineTo(150,80);
            ctx.stroke();
		ctx.beginPath(); //head
            ctx.arc(150, 100, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //body
            ctx.moveTo(150,120);
            ctx.lineTo(150,190);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(150,135);
            ctx.lineTo(180,160);
            ctx.stroke();
		ctx.beginPath(); //left arm
            ctx.moveTo(150,135);
            ctx.lineTo(120,160);
            ctx.stroke();
    }

	if(numWrong==9)
	{
		ctx.beginPath(); //ground
            ctx.moveTo(35,270);
            ctx.lineTo(265,270);
            ctx.stroke();
		ctx.beginPath(); //vertical bar
            ctx.moveTo(50,270);
            ctx.lineTo(50,25);
            ctx.stroke();
        ctx.beginPath(); //vertical bar long piece
            ctx.moveTo(65,270);
            ctx.lineTo(65,85);
            ctx.stroke();
		ctx.beginPath(); //vertical bar short piece
            ctx.moveTo(65,90);
            ctx.lineTo(65,40);
            ctx.stroke();
		ctx.beginPath(); //horizontal bar
            ctx.moveTo(49,25);
            ctx.lineTo(175,25);
            ctx.stroke();
		 ctx.beginPath(); //horizontal bar short piece
            ctx.moveTo(49,40);
            ctx.lineTo(86,40);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar long piece
            ctx.moveTo(85,40);
            ctx.lineTo(175,40);
            ctx.stroke();
        ctx.beginPath(); //small vertical bar
            ctx.moveTo(173,25);
            ctx.lineTo(173,40);
            ctx.stroke();
		ctx.beginPath(); //noose
            ctx.moveTo(150,40);
            ctx.lineTo(150,80);
            ctx.stroke();
		ctx.beginPath(); //head
            ctx.arc(150, 100, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //body
            ctx.moveTo(150,120);
            ctx.lineTo(150,190);
            ctx.stroke();
        ctx.beginPath(); //right arm
            ctx.moveTo(150,135);
            ctx.lineTo(180,160);
            ctx.stroke();
		ctx.beginPath(); //left arm
            ctx.moveTo(150,135);
            ctx.lineTo(120,160);
            ctx.stroke();
		ctx.beginPath(); //right leg
            ctx.moveTo(149,188);
            ctx.lineTo(180,230);
            ctx.stroke();
    }

	if(numWrong>=10)
	{
		ctx.beginPath(); //ground
            ctx.moveTo(35,270);
            ctx.lineTo(265,270);
            ctx.stroke();
		ctx.beginPath(); //vertical bar
            ctx.moveTo(50,270);
            ctx.lineTo(50,25);
            ctx.stroke();
        ctx.beginPath(); //vertical bar long piece
            ctx.moveTo(65,270);
            ctx.lineTo(65,85);
            ctx.stroke();
		ctx.beginPath(); //vertical bar short piece
            ctx.moveTo(65,90);
            ctx.lineTo(65,40);
            ctx.stroke();
		ctx.beginPath(); //horizontal bar
            ctx.moveTo(49,25);
            ctx.lineTo(175,25);
            ctx.stroke();
		 ctx.beginPath(); //horizontal bar short piece
            ctx.moveTo(49,40);
            ctx.lineTo(86,40);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar long piece
            ctx.moveTo(85,40);
            ctx.lineTo(175,40);
            ctx.stroke();
        ctx.beginPath(); //small vertical bar
            ctx.moveTo(173,25);
            ctx.lineTo(173,40);
            ctx.stroke();
		ctx.beginPath(); //noose
            ctx.moveTo(150,40);
            ctx.lineTo(150,80);
            ctx.stroke();
		ctx.beginPath(); //head
            ctx.arc(150, 100, 20, 0, 2*Math.PI);
            ctx.stroke();
        ctx.beginPath(); //body
            ctx.moveTo(150,120);
            ctx.lineTo(150,190);
            ctx.stroke();
       ctx.beginPath(); //right arm
            ctx.moveTo(150,135);
            ctx.lineTo(180,160);
            ctx.stroke();
		ctx.beginPath(); //left arm
            ctx.moveTo(150,135);
            ctx.lineTo(120,160);
            ctx.stroke();
		ctx.beginPath(); //right leg
            ctx.moveTo(149,188);
            ctx.lineTo(180,230);
            ctx.stroke();
		ctx.beginPath(); //left leg
            ctx.moveTo(151,188);
            ctx.lineTo(120,230);
            ctx.stroke();
    }
}