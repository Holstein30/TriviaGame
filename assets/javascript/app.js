$(document).ready(function () {

	// ----- Variables -----

	var correct = 0;
	var wrong = 0;
	var time = 15;
	var outOfTime = 0;
	var qNum = 0;
	var clockrunning = false;

	// sounds
	var swing = new Audio("../sounds/golfswing.mp3");
	var whacker = new Audio("../sounds/whacker.mp3");
	var inthehole = new Audio("../sounds/inthehole.mp3");
	var turds = new Audio("../sounds/2turds.mp3");
	var waiting = new Audio("../sounds/waiting.mp3");
	var drugs = new Audio("../sounds/takedrugs.mp3");

	// HTML & Interval reset/clear for after game ends

	clearInterval(timer);
	var resetHtml = $(".container").html();
	$(".container").html(resetHtml);
	$(".stats").hide();


	// ----- Objects -----

	var Q1 = {
		question: "What percentage of golfers achieve a handicap under 18?",
		choice1: "80",
		choice2: "30",
		choice3: "50",
		choice4: "20",
		answer: "20"
	}

	var Q2 = {
		question: "How many balls are hit into the water each year on number 17 at TPC Sawgrass?",
		choice1: "1,000",
		choice2: "125,000",
		choice3: "75,000",
		choice4: "10,000",
		answer: "125,000"
	}

	var Q3 = {
		question: "Who holds the record of winning The Open (British Open) Championship 6 times?",
		choice1: "Harry Vardon",
		choice2: "Tom Watson",
		choice3: "Jack Nicklaus",
		choice4: "Tiger Woods",
		answer: "Harry Vardon"
	}

	var Q4 = {
		question: "How many dimples does a regulation golf ball have?",
		choice1: "222",
		choice2: "147",
		choice3: "336",
		choice4: "473",
		answer: "336"
	}

	var Q5 = {
		question: "In what year was St. Andrews Golf Course established?",
		choice1: "1477",
		choice2: "1742",
		choice3: "1552",
		choice4: "1815",
		answer: "1552"
	}

	var Q6 = {
		question: "Which country offers hole-in-one insurance?",
		choice1: "Japan",
		choice2: "South Korea",
		choice3: "Sweden",
		choice4: "Britain",
		answer: "Japan"
	}

	var Q7 = {
		question: "Tiger Woods was 126 under par in the majors between 1997-2008. Joe Ogilvie \
		was the next best during that span with what score?",
		choice1: "85 under par",
		choice2: "Even par",
		choice3: "10 over par",
		choice4: "63 over par",
		answer: "63 over par"
	}

	var Q8 = {
		question: "What is the maximum number of clubs you are allowed to carry in your golf bag?",
		choice1: "10",
		choice2: "12",
		choice3: "14",
		choice4: "15",
		answer: "14"
	}

	// Array to hold objects

	var questions = [Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8]

	// ----- FUNCTIONS -----

	// Hide toggle

	function hideToggle () {
		$('.hide').toggleClass('unhidden hidden');
	}

	// Question rotation 

	function newQuestion () {
		if (!clockrunning) {
			time = 15;
			timer = setInterval(countdown, 1000);
			$("#timer").show();
			$("#timer").html("<h3 id='timer'>Time Left: " + time + "</h3>");
			$("#question").html("<h3 id='question'>" + questions[qNum].question + "</h3>");
			$("#answer1").html(questions[qNum].choice1);
			$("#answer2").html(questions[qNum].choice2);
			$("#answer3").html(questions[qNum].choice3);
			$("#answer4").html(questions[qNum].choice4);
			$(".answers").show();
			clockrunning = true;
		}
	}

	// Timer countdown (maybe warning at 5-10 seconds left)

	function countdown () {
		time--;
		$("#timer").html("<h3 id='timer'>Time Left: " + time + "</h3>");
		if (time === 0) {
			timesUp();
			checkGame();
		}
	}

	// Check if game over or move to next question

	function checkGame () {
		clearInterval(timer);
		clockrunning = false;
		qNum++;
		if (qNum === questions.length) {
			setTimeout(gameOver, 4000);
		}
		else {
			setTimeout(newQuestion, 4000);
		}
	}

	// Timer runs out, play sound, show image, show answer

	function timesUp () {
		outOfTime++;
		$("#gif").html("<img src='https://media.giphy.com/media/HQRgg6ks7nkyY/giphy.gif'>");
		$(".answers").hide();
		$("#gif").show();
		waiting.play();
		$("#question").html("<h3 id='question'>Time's up! Correct Answer: " + questions[qNum].answer + "</h3>");
		setTimeout(noGif, 4000);
	}

	// Correct answer function

	function correctGuess () {
		correct++;
		$("#gif").html("<img src='https://media.giphy.com/media/3oEduKVQdG4c0JVPSo/giphy.gif'>");
		$(".answers").hide();
		$("#gif").show();
		inthehole.play();
		$("#timer").html("<h3 id='timer'>Correct!!!</h3>");
		setTimeout(noGif, 4000);
	}

	// Wrong answer function

	function wrongGuess () {
		wrong++;
		$("#gif").html("<img src='https://media.giphy.com/media/sPqwGBxaMXfpe/giphy.gif'>");
		$(".answers").hide();
		$("#gif").show();
		turds.play();
		$("#timer").html("<h3 id='timer'>WRONG!!!</h3>");
		$("#question").html("<h3 id='question'>Correct Answer: " + questions[qNum].answer + "</h3>");
		setTimeout(noGif, 4000);
	}

	// Game over, tally stats (maybe display something depending on how many correct they got)

	function gameOver () {
		$(".stats").show();
		if (correct >= 5) {
			$("#gif").html("<img src='https://media.giphy.com/media/3ohA2GnDgeDgRnTYac/giphy.gif'>");
			whacker.play();
		}
		else {
			$("#gif").html("<img src='https://media.giphy.com/media/xTiTnkWFuC4slkuUPm/giphy.gif'>");
			drugs.play();
		}
		$(".answers").hide();
		$("#gif").show();
		$("#question").html("<h3 id='question'>Thanks for Playing!</h3>");
		$("#correct").html("<h3 id='correct'>Correct: " + correct + "</h3>")
		$("#wrong").html("<h3 id='wrong'>Wrong: " + wrong + "</h3>");
		$("#timesUp").html("<h3 id='timesUp'>Ran out of Time: " + outOfTime + "</h3>");
		clearInterval(timer);
		$("#timer").hide();
		setTimeout(restart, 10000);
	}

	// Restart game function 

	function restart () {
		correct = 0;
		wrong = 0;
		time = 15;
		outOfTime = 0;
		qNum = 0;
		hideToggle();
		$("#gif").hide();
		$(".stats").hide();
		$("#startGame").show();
		$("#startGame").text("Play Again");
	}

	// Remove gif 

	function noGif () {
		$("#gif").empty();
	}

	// ----- Events -----

	// Event for start button 

	$("#startGame").on("click", function () {
		hideToggle();
		$(".stats").hide();
		noGif();
		newQuestion();
	});

	// Event for user choice

	$(".answers").click(function () {
		if ($(this).text() == questions[qNum].answer) {
			correctGuess();
			checkGame();
		}
		else {
			wrongGuess();
			checkGame();
		}
	});

});

