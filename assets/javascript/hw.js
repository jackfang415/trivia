
//This is the array of objects along with the properties, which contains the choices and the actual answer.
var quiz = [
	{		
		question: "Who defeated Ronda Rousey in UFC 193?",
		choice: ["Amanda Nunes", "Miesha Tate", "Holly Holm", "Cris Cyborg"],
		answer: 2
	},

	{	
		question: "Who did Jose Aldo lose to in UFC 194?",
		choice: ["Max Holloway", "Conor McGregor", "Luciano Azevedo", "Chad Mendes"],
		answer: 1
	},

	{
		question: "What submission move did Chan Sung Jung use against Leonard Garcia?",
		choice: ["Armbar", "Rear-Naked Choke", "Twister", "Kimura"],
		answer: 2
	},

	{
		question: "As of 2018, who is the current record holder for the most title defenses in the heavyweight division?",
		choice: ["Stipe Miocic", "Cain Valazquez", "Brock Lesnar", "Junior Dos Santos"],
		answer: 0
	}
];

//These variables counting the number of correct and incorrect answers. It also includes where the user is in the game.
var correct = 0;
var incorrect = 0;
var round = 0;

//This function starts the clock counting down by each second.
function clock() {
	getTimer = setInterval(decrement, 1000)
}

var counter = 60;



function decrement(){
	console.log("counter",counter)
	counter--;
	$("#timer").text("Remaining Time: " + counter)
		
	if (counter === 0) {
	clearInterval(getTimer);

	setTimeout(function(){
		console.log("Game Over");
		$("#main-content").empty();

		var gameStats = $('<p>');
		var final = round + "/" + quiz.length;
		gameStats.text(final);
		var message = $("<h1>")
		message.text("Game Over!!!");
		$("#main-content").append(message, gameStats);

	},1000);
	}
}

$(document).ready(function() {
	$("#correct").text("Correct: " + correct);
	$("#incorrect").text("Incorrect: " + incorrect);
	$("#timer").text("Remaining Time: " + counter);


	$("#start").on("click", function(){
		$("#timer, #correct, #incorrect").removeClass("hide");
		$("#main-content").empty();
		clock();

		for(var i=0; i < quiz.length;i++) {
			var questionList = $("<h2>");
			questionList.addClass("question");
			questionList.text(quiz[i].question);
			$("#main-content").append(questionList);

			var btnGrp = $("<div>");
			btnGrp.addClass("btnGrp");
			btnGrp.attr("role","group");
			btnGrp.attr("id","bg" + i)
			btnGrp.attr("aria-label","First group");
			$("#main-content").append(btnGrp);

		for(var j = 0; j < quiz[i].choice.length;j++) {
			var buttonChoices = $("<button>");
			buttonChoices.addClass("options btn btn-secondary");
			buttonChoices.attr("type", "button");
			buttonChoices.attr("name", i);
			buttonChoices.attr("id", "c"+j);
			buttonChoices.attr("value", j);
			buttonChoices.text(quiz[i].choice[j]);
			$("#bg"+i).append(buttonChoices);
		};
		};
	});

	$("#main-content").on("click",".options", function(){
		
		if(round < quiz.length){
			round++;
			var buttonName = $(this).attr("name");
			var buttonList = $(".btn[name=" + "'" + buttonName + "'" +"]");

			for(var i = 0; i < buttonList.length;i++) {
				buttonList[i].classList.remove("selected");
				buttonList[i].setAttribute("disabled", true);
			}
			var buttonSelect = parseInt($(this).val());
			var questionIndex = parseInt($(this).attr("name"))

				if(buttonSelect === quiz[questionIndex].answer){
					console.log("correct");
					correct++;
					$("#correct").text("Correct: " + correct);
				}

				else {
					incorrect++;
					$("#incorrect").text("Incorrect: " + incorrect);
					console.log("incorrect");
				}
			console.log(buttonSelect);
			$(this).addClass("selected");
			};
	});
});