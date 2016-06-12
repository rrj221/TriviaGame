var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var questionCount = 0;
var currentQuestion = '';
var defaultBreakTime = 6;
var defaultTimerTime = 25;
var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;

var audioBoop = new Audio('assets/sounds/hit-01.wav');
var audioApplause = new Audio('assets/sounds/applause-short.mp3');
var audioFail = new Audio('assets/sounds/fail.mp3');
var audioEnd = new Audio('assets/sounds/fantasy-emotional.wav');

function backgroundBlue() {
	$("html").css("background-color", "blue");
    $("html").css("background-image", "none");
};

function shortPlay(song) {
	song.play();
	setTimeout(function() {
		song.pause();
		song.currentTime = 0;
	}, defaultBreakTime * 1000);
};

function loopPlay(song) {
	song.addEventListener('ended', function() {
    	this.currentTime = 0;
    	this.play();
	}, false);
	song.play();
};

function stopSong(song) {
	song.pause();
	song.currentTime = 0;
};

var questions = {
	q1: {
		name: "college",
		question: "Where did Ryan go to college?",
		choices: {
			//it would have been simpler to do this as an array but I didn't realize until later that
			//I wouldn't need the other attributes that I thought I would use later
			choice1: {
				name: "Harvard",
				isCorrect: false,
				image: "",
			},
			choice2: {
				name: "Penn State",
				isCorrect: false,
				image: "",
			},
			choice3: {
				name: "Virginia Tech",
				isCorrect: true,
				image: "../images/img-q1-3",
			},
			choice4: {
				name: "TCNJ",
				isCorrect: false,
				image: "",
			},
		},
		gif: "assets/images/vt-bird-gif.gif",
		correct: "choice3",
	},
	q2: {
		name: "job",
		question: "Which company does Ryan currently work for?",
		choices: {
			choice1: {
				name: "New York Life",
				isCorrect: true,
				image: '',
			},
			choice2: {
				name: "Facebook",
				isCorrect: false,
				image: '',
			},
			choice3: {
				name: "Uber",
				isCorrect: '',
				image: '',
			},
			choice4: {
				name: "Starbucks",
				isCorrect: false,
				image: '',
			},
		},
		gif: 'assets/images/nylife.gif',
		correct: "choice1",
	},	
	q3: {
		name: "sport",
		question: "What is Ryan's favorite sport?",
		choices: {
			choice1: {
				name: "Baseball",
				isCorrect: false,
				image: '',
			},
			choice2: {
				name: "Hockey",
				isCorrect: false,
				image: '',
			},
			choice3: {
				name: "Badminton",
				isCorrect: false,
				image: '',
			},
			choice4: {
				name: "Basketball",
				isCorrect: true,
				image: '',
			},
		},
		gif: 'assets/images/basketball.gif',
		correct: "choice4",
	},	
	q4: {
		name: "band",
		question: "Of these awesome bands, which was has Ryan been listening to the most lately?",
		choices: {
			choice1: {
				name: "Led Zeppelin",
				isCorrect: false,
				image: '',
			},
			choice2: {
				name: "Grateful Dead",
				isCorrect: true,
				image: '',
			},
			choice3: {
				name: "Rihanna",
				isCorrect: false,
				image: '',
			},
			choice4: {
				name: "Waxatachee",
				isCorrect: false,
				image: '',
			},
		},
		gif: 'assets/images/jerry.gif',
		correct: "choice2",
	},
	q5: {
		name: "major",
		question: "What was Ryan's college major?",
		choices: {
			choice1: {
				name: "Biology",
				isCorrect: false,
				image: '',
			},
			choice2: {
				name: "English",
				isCorrect: false,
				image: '',
			},
			choice3: {
				name: "Accounting",
				isCorrect: true,
				image: '',
			},
			choice4: {
				name: "Engineering",
				isCorrect: false,
				image: '',
			},
		},
		gif: 'assets/images/accounting.gif',
		correct: "choice3",
	},
	q6: {
		name: "instrument",
		question: "What instrument does Ryan play?",
		choices: {
			choice1: {
				name: "Guitar",
				isCorrect: true,
				image: '',
			},
			choice2: {
				name: "Harp",
				isCorrect: false,
				image: '',
			},
			choice3: {
				name: "Clarinet",
				isCorrect: false,
				image: '',
			},
			choice4: {
				name: "Trumpet",
				isCorrect: false,
				image: '',
			},
		},
		gif: 'assets/images/guitar.gif',
		correct: "choice1",
	},	
	q7: {
		name: "town",
		question: "Which town did Ryan grow up in?",
		choices: {
			choice1: {
				name: "Miami, Florida",
				isCorrect: false,
				image: '',
			},
			choice2: {
				name: "Boston, Massechusets",
				isCorrect: false,
				image: '',
			},
			choice3: {
				name: "Los Angeles, California", 
				isCorrect: false,
				image: '',
			},
			choice4: {
				name: "Readington, NJ",
				isCorrect: true,
				image: '',
			},
		},
		gif: 'assets/images/jersey.gif',
		correct: "choice4",
	},	
	q8: {
		name: "pet",
		question: "What is Ryan's favorite pet?",
		choices: {
			choice1: {
				name: "Fish",
				isCorrect: false,
				image: '',
			},
			choice2: {
				name: "Cat",
				isCorrect: true,
				image: '',
			},
			choice3: {
				name: "Dog",
				isCorrect: false,
				image: '',
			},
			choice4: {
				name: "Hamster",
				isCorrect: false,
			},
		},
		gif: 'assets/images/cat.gif',
		correct: "choice2",
	},			
};

var intervalId;
var timer = {
    time: defaultTimerTime,
    start: function() {
        //Use setInterval to start the count here
        intervalId = setInterval(timer.count, 1 * 1000);
    },
    stop: function() {
        clearInterval(intervalId);
    },
    count: function() {
        timer.time--;
        $('.timer').text("Time Remaining: "+timer.time+" Seconds");   
        timer.outOfTime();   
    },
    outOfTime: function() {
    	if (timer.time <= 0) {
    		timer.stop();
    		backgroundBlue();
    		$(".gameArea").empty();
    		$("<div>", {class: "unanswered", text: "Times up!"}).appendTo(".gameArea");
    		setTimeout(nextQuestion, defaultBreakTime * 1000);
    	}
    }
};

function findCorrect(question) {
	for (i = 1; i <= 4; i++) {
		var choice = "choice"+i;
		if (questions[question].choices[choice].isCorrect) {
			return questions[question].choices[choice].name;
		} 
	}
};

function displayTimer() {
	$(".timerArea").empty();
	$("<div>", {class: "timer"}).appendTo(".timerArea");
	$('.timer').text("Time Remaining: "+defaultTimerTime+" Seconds");
	timer.start();
	$("<p>").appendTo(".timerArea");
};

function displayQuestion() {
	currentQuestion = 'q'+questionCount;
	timer.time = defaultTimerTime;
	$(".gameArea").empty();
	backgroundBlue();

	//displays questions to DOM
	$("<div>", {class: "question", text: questions[currentQuestion].question}).appendTo(".gameArea");
	for (i = 1; i <= 4; i++) {
		var choice = 'choice'+i;
		var backgroundName = currentQuestion+"-"+choice;
		var questionDiv =  $("<div>", {class: choice,
					text: questions[currentQuestion].choices[choice].name, 
					'data-backgroundimage': backgroundName}).appendTo(".gameArea");
		questionDiv.appendTo('.gameArea');
		var questionDivChild = $("<div>"); 
		questionDivChild.appendTo(questionDiv);
	}
};

function correct() {
	$(".gameArea").empty();
	timer.stop();
	$("<div>", {class: "correct", text: "That's correct!"}).appendTo(".gameArea");
	gif = questions[currentQuestion].gif;
	$("<img>").attr('src', gif).appendTo('.gameArea');
	setTimeout(nextQuestion, defaultBreakTime * 1000);
	correctCount++;

	shortPlay(audioApplause);
};

function incorrect() {
	$(".gameArea").empty();
	timer.stop();

	//show correct background
	var correctChoice = questions[currentQuestion].correct;  //returns choice1, choice2....
	var correctBackGround = currentQuestion+"-"+correctChoice;
	$('html').css('background-image', "url('assets/images/"+correctBackGround+".jpg')");

	$("<div>", {class: "correct", text: "That's not correct!"}).appendTo(".gameArea");
	$("<div>", {class: "answer", text: "The correct answer is: "+findCorrect(currentQuestion)}).appendTo(".gameArea");
	setTimeout(nextQuestion, defaultBreakTime * 1000);
	incorrectCount++;
	shortPlay(audioFail);
};

function unanswered() {
	$(".gameArea").empty();
	timer.stop();
	$("<div>", {class: "answer", text: "The correct answer is: "+findCorrect(currentQuestion)}).appendTo(".gameArea");
	unansweredCount++;
	shortPlay(audioFail);
};

function nextQuestion() {
	questionCount++;
	if (questionCount > 8) {
		endGame();
	} else {
		displayTimer();
		displayQuestion();
	}
};

function resetVariables() {
	correctCount = 0;
	incorrectCount = 0;
	questionCount = 0;
	timer.time = defaultTimerTime;
	unansweredCount = 0;
};

function allCorrect() {
	if (correctCount === 8) {
		$("<p>").attr('class', 'blankRow').appendTo(".gameArea");
		var niceTextMessage1 = "Congrats on getting all the questions right";
		var niceTextMessage2 = "Here's a nice picture for you to enjoy";
		$("<div>", {class: 'winner1', text: niceTextMessage1}).appendTo(".gameArea");
		$("<div>", {class: 'winner2', text: niceTextMessage2}).appendTo(".gameArea");
		$("<p>").attr('class', 'blankRow').appendTo(".gameArea");
		gif = 'assets/images/swift.gif';
		$("<img>").attr('src', gif).appendTo('.gameArea');
		$("<p>").attr('class', 'blankRow').appendTo(".gameArea");
	}
};

function endGame() {
	timer.stop();

	//modifying the DOM
	$(".gameArea").empty();
	$("<div>", {class: 'gameOver', text: "Game Over!"}).appendTo(".gameArea");
	$("<p>").appendTo(".gameArea");
	$("<div>", {class: 'numberCorrect', text: "You got "+correctCount+" question(s) right"}).appendTo(".gameArea");
	$("<div>", {class: 'numberIncorrect', text: "You got "+incorrectCount+" question(s) wrong"}).appendTo(".gameArea");
	$("<div>", {class: 'numberUnanswered', text: "You left "+unansweredCount+" question(s) unanswered"}).appendTo(".gameArea");
	$("<p>").appendTo(".gameArea");
	allCorrect();
	$("<div>", {class: 'startOver', text: "Press the start button to start over"}).appendTo(".gameArea");
	$("<p>").appendTo(".gameArea");
	var newButton = $('<div>').html("<p><a id='startButton' class='btn btn-primary btn-lg' href='#' role='button'>Start</a></p>");
	$('.gameArea').append(newButton);

	loopPlay(audioEnd);

	resetVariables();
};

$(".gameArea").on("click", "#startButton", function() {
	questionCount++;
	displayQuestion();
	displayTimer();
	stopSong(audioEnd);
});

$(".gameArea").on("click", ".choice1, .choice2, .choice3, .choice4", function() {
	var guess = $(this).attr("class");
	if (questions[currentQuestion].choices[guess].isCorrect) {
		correct();
	} else if (!questions[currentQuestion].choices[guess].isCorrect) {
		incorrect();
	}
});

$(".gameArea").on("mouseenter", ".choice1, .choice2, .choice3, .choice4", function() {
	var guess = $(this).attr("class");
	audioBoop.play();

	//display background of hovered image
	var backGroundImg = $(this).data('backgroundimage');
	$('html').css("background-image", "url('assets/images/"+backGroundImg+".jpg')");

	//styling hovered choice
	$(this).css("background-color", "black");
	$(this).css('color', 'yellow');
});

$(".gameArea").on("mouseleave", ".choice1, .choice2, .choice3, .choice4", function() {
	var guess = $(this).attr("class");

	//makes their styling go back to normal
	$(this).css("background", "green");
	$(this).css('color', 'white');
});