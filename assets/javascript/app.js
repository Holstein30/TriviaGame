$(document).ready(function () {

	// ----- Variables -----

	var correct = 0;
	var wrong = 0;
	var time = 15;
	var outOfTime = 0;
	var qNum = 0;

	// HTML & Interval reset/clear for after game ends

	clearInterval(timer);
	var resetHtml = $(".container").html();
	$(".container").html(resetHtml);
	$(".stats").hide();


	// ----- Objects -----

	var Q1 = {
		question: "question1",
		choice1: "choice1",
		choice2: "choice2",
		choice3: "choice3",
		choice4: "choice4",
		answer: "choice1",
		img: "#"
	}

	var Q2 = {
		question: "question2",
		choice1: "choice1",
		choice2: "choice2",
		choice3: "choice3",
		choice4: "choice4",
		answer: "choice1",
		img: "#"
	}

	var Q3 = {
		question: "question3",
		choice1: "choice1",
		choice2: "choice2",
		choice3: "choice3",
		choice4: "choice4",
		answer: "choice1",
		img: "#"
	}

	var Q4 = {
		question: "question4",
		choice1: "choice1",
		choice2: "choice2",
		choice3: "choice3",
		choice4: "choice4",
		answer: "choice1",
		img: "#"
	}

	var Q5 = {
		question: "question5",
		choice1: "choice1",
		choice2: "choice2",
		choice3: "choice3",
		choice4: "choice4",
		answer: "choice1",
		img: "#"
	}

	var Q6 = {
		question: "question6",
		choice1: "choice1",
		choice2: "choice2",
		choice3: "choice3",
		choice4: "choice4",
		answer: "choice1",
		img: "#"
	}

	var Q7 = {
		question: "question7",
		choice1: "choice1",
		choice2: "choice2",
		choice3: "choice3",
		choice4: "choice4",
		answer: "choice1",
		img: "#"
	}

	var Q8 = {
		question: "question8",
		choice1: "choice1",
		choice2: "choice2",
		choice3: "choice3",
		choice4: "choice4",
		answer: "choice1",
		img: "#"
	}

	// Array to hold objects

	var questions = [Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8]

	// ----- FUNCTIONS -----

	// Question rotation 

	function newQuestion () {
		time = 15;
		timer = setInterval(countdown, 1000);
		$("#timer").show();
		$("#timer").html("<h3 id='timer'>Time Left: " + time + "</h3>");
		$("#question").html("<h3 id='question'>" + questions[qNum].question + "</h3>");
		$("#answer1").html(questions[qNum].choice1);
		$("#answer2").html(questions[qNum].choice2);
		$("#answer3").html(questions[qNum].choice3);
		$("#answer4").html(questions[qNum].choice4);
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
		$("#gif").show();
		$("#question").html("<h3 id='question'>Time's up! The correct answer was: " + questions[qNum].answer + "</h3>");
		setTimeout(noGif, 4000);
	}

	// Correct answer function

	function correctGuess () {
		correct++;
		$("#gif").html("<img src='https://media.giphy.com/media/3oEduKVQdG4c0JVPSo/giphy.gif'>");
		$("#gif").show();
		$("#timer").html("<h3 id='timer'>Correct!!!</h3>");
		setTimeout(noGif, 4000);
	}

	// Wrong answer function

	function wrongGuess () {
		wrong++;
		$("#gif").html("<img src='https://media.giphy.com/media/sPqwGBxaMXfpe/giphy.gif'>");
		$("#gif").show();
		$("#timer").html("<h3 id='timer'>WRONG!!!</h3>");
		$("#question").html("<h3 id='question'>The correct answer was: " + questions[qNum].answer + "</h3>");
		setTimeout(noGif, 4000);
	}

	// Game over, tally stats (maybe display something depending on how many correct they got)

	function gameOver () {
		$(".stats").show();
		$("#gif").html("<img src='https://media.giphy.com/media/O2kFK6fdz217a/giphy.gif'>");
		$("#gif").show();
		$("#question").html("<h3 id='question'>Thanks for Playing!</h3>");
		$("#correct").html("<h3 id='correct'>Correct: " + correct + "</h3>")
		$("#wrong").html("<h3 id='wrong'>Wrong: " + wrong + "</h3>");
		$("#timesUp").html("<h3 id='timesUp'>Ran out of Time: " + outOfTime + "</h3>");
		clearInterval(timer);
		$("#timer").hide();
		setTimeout(restart, 5000);
	}

	// Restart game function 

	function restart () {
		correct = 0;
		wrong = 0;
		time = 15;
		outOfTime = 0;
		qNum = 0;
		$("#startGame").show();
		$("#startGame").text("New Game");
	}

	// Remove gif 

	function noGif () {
		$("#gif").empty();
	}

	// ----- Events -----

	// Event for start button 

	$("#startGame").on("click", function () {
		$(this).hide();
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

