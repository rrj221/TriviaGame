// window.onload=function() {   console.log("hello world.");

var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var questionCount = 0;
var currentQuestion = '';
var defaultBreakTime = 5;
var defaultTimerTime = 15;

function backgroundBlue() {
	$("html").css("background-color", "blue");
    $("html").css("background-image", "none");
}

var questions = {
	q1: {
		name: "college",
		question: "Where did Ryan go to college?",
		choices: {
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
		gif: "assets/images/hokie.gif",
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
	},			
};

var intervalId;
var timer = {
    time: defaultTimerTime,
    // lap:1,
    // reset: function () {
    //     stopwatch.time = 0;
    //     stopwatch.lap = 1;
    //     //change the "display" div to "00:00"
    //     $("#display").html(stopwatch.timeConverter(0));

    //     //empty the "laps" div
    //     $("#laps").empty();
    //     stopwatch.stop();
    // },
    countdown: function() {
    	intervalId = setInterval(timer.count, 1 * 1000);

    },
    start: function() {
        //Use setInterval to start the count here
        intervalId = setInterval(timer.count, 1 * 1000);
    },
    stop: function() {
        //Use clearInterval to stop the count here
        clearInterval(intervalId);
    },
    recordLap: function() {
        //Get the current time, pass that into the stopwatch.timeConverter function, and save the result in a variable

        //Add the current lap and time to the "laps" div
        
        //increment lap by 1, remember we cant use "this" here
    },
    count: function() {
        //increment time by 1, remember we cant use "this" here
        timer.time--;

        //Get the current time, pass that into the stopwatch.timeConverter function, and save the result in a variable
        // var formattedTime = stopwatch.timeConverter(stopwatch.time);
        //Use the variable you just created to show the converted time in the "display" div
        // $("#display").text(formattedTime);
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
		console.log(questions.q1.choices.choice3.isCorrect);
		if (questions[question].choices[choice].isCorrect) {
			console.log("if woot");
			return questions[question].choices[choice].name;
		} else {
			console.log("here I am on else");
		}	
	}
};

function findCorrectChoiceNum(question) {
	for (i = 1; i <= 4; i++) {
		var choice = "choice"+i;
		console.log(questions.q1.choices.choice3.isCorrect);
		if (questions[question].choices[choice].isCorrect) {
			console.log("if woot");
			return choice;
		} else {
			console.log("here I am on else");
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

	// displayTimer();

	$(".gameArea").empty();

	backgroundBlue();

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
};

function incorrect() {
	$(".gameArea").empty();
	timer.stop();

	//show correct background
	var correctChoice = findCorrectChoiceNum(currentQuestion);  //returns choice1, choice2....
	var correctBackGround = currentQuestion+"-"+correctChoice;
	$('html').css('background-image', "url('assets/images/"+correctBackGround+".jpg')");

	$("<div>", {class: "correct", text: "That's not correct!"}).appendTo(".gameArea");
	$("<div>", {class: "answer", text: "The correct answer is: "+findCorrect(currentQuestion)}).appendTo(".gameArea");
	setTimeout(nextQuestion, defaultBreakTime * 1000);
};

function unanswered() {
	$(".gameArea").empty();
	timer.stop();
	$("<div>", {class: "answer", text: "The correct answer is: "+findCorrect(currentQuestion)}).appendTo(".gameArea");
}

function nextQuestion() {
	questionCount++;
	if (questionCount > 8) {
		endGame();
	} else {
		displayTimer();
		displayQuestion();
	}
}

function endGame() {
	console.log("game over");
	timer.stop();
	questionCount = 0;
	timer.time = defaultTimerTime;
	$(".gameArea").empty();
	$("<div>", {class: 'gameOver', text: "Game Over!"}).appendTo(".gameArea");
	$("<p></p>").appendTo(".gameArea");
	$("<div>", {class: 'startOver', text: "Press the start button to start over"}).appendTo(".gameArea");
	$("<p></p>").appendTo(".gameArea");
	var newButton = $('<div>').html("<p><a id='startButton' class='btn btn-primary btn-lg' href='#' role='button'>Start</a></p>");
	$('.gameArea').append(newButton);
}

$(".gameArea").on("click", "#startButton", function() {
	questionCount++;
	displayQuestion();
	displayTimer();
});

$(".gameArea").on("click", ".choice1, .choice2, .choice3, .choice4", function() {
	var guess = $(this).attr("class");
	console.log(guess);
	if (questions[currentQuestion].choices[guess].isCorrect) {
		alert("yay");
		correct();
		// $(".gameArea").empty();
		// displayTimer();
		// displayQuestion();
	} else if (!questions[currentQuestion].choices[guess].isCorrect) {
		alert("nay");
		incorrect();
		// $(".gameArea").empty();
		// displayTimer();
		// displayQuestion();
	}
});

$(".gameArea").on("mouseenter", ".choice1, .choice2, .choice3, .choice4", function() {
	var guess = $(this).attr("class");
	
	// console.log("i hovered");
	// var bodyClassCurrent = $("body").attr('class');
	var backGroundImg = $(this).data('backgroundimage');

	// $('html').css("opacity", 0);

	$('html').css("background-image", "url('assets/images/"+backGroundImg+".jpg')");

	// $(this).child().addClass('hovered');
	$(this).css("background-color", "black");
	$(this).css('color', 'yellow');

	// $('html').animate({opacity: 1}, 750);

	// $("body").switchClass(bodyClassCurrent, bodyClassNew, 500);

});

$(".gameArea").on("mouseleave", ".choice1, .choice2, .choice3, .choice4", function() {
	var guess = $(this).attr("class");
	// $('body').css("background-image", "none");
	// console.log("i hovered");

	// $('html').css('opacity', 1);	

	var bodyClassCurrent = $("body").attr('class');
	// var bodyClassNew = $(this).data('bodyclassdata');

	// $("body").switchClass(bodyClassCurrent, ".defaultBody", 500);

	$(this).css("background", "green");
	$(this).css('color', 'white');
	// $(this).child().removeClass('hovered');


});












// }