$(document).ready(function() {
	//============================================================================================
	//================================ VARIABLES DECLARED ========================================
	//============================================================================================
	var characterSelected = false;
	var defenderSelected = false;
	var selectedCharacter, selectedDefender, selectedCharacterId, selectedDefenderId, defense, restartBtn;
	var attack = 0;
	//============================================================================================
	//============================== CHARACTER OBJECTS ARRAY =====================================
	//============================================================================================
	var heMan = { name: "He-Man", totalPow: 150, attackPow: 10, counterPow: 30, image: "he-man.jpg" };
	var manAtArms = { name: "Man-At-Arms", totalPow: 120, attackPow: 6, counterPow: 20, image: "man-at-arms.jpg" };
	var sheRa = { name: "She-Ra", totalPow: 145, attackPow: 10, counterPow: 25, image: "she-ra.jpg" };
	var teela = { name: "Teela", totalPow: 90, attackPow: 4, counterPow: 10, image: "teela.jpg" };
	var orko = { name: "Orko", totalPow: 100, attackPow: 7, counterPow: 5, image: "orko.jpg" };
	var skeletor = { name: "Skeletor", totalPow: 130, attackPow: 10, counterPow: 20, image: "skeletor.jpg" };
	var hordak = { name: "Hordak", totalPow: 135, attackPow: 8, counterPow: 25, image: "hordak.jpg" };
	var evillyn = { name: "Evil-Lyn", totalPow: 95, attackPow: 6, counterPow: 8, image: "evil-lyn.jpg" };
	var beastMan = { name: "Beast Man", totalPow: 115, attackPow: 8, counterPow: 15, image: "beast-man.jpg" };

	var charactersArray = [heMan, manAtArms, sheRa, teela, orko, skeletor, hordak, evillyn, beastMan];
	//============================================================================================
	//========================== DISPLAYS THE CHARACTERS ON THE PAGE ============================= 
	//============================================================================================
	function refreshPage() {
		for (var i = 0; i < charactersArray.length; i++) {
			var div = $("<div>").attr("class", "bg-white border border-success rounded text-center float-left mr-1 mt-2 pr-2 pl-2 character");
			div.attr("id", charactersArray[i].name);
			var topName = $("<p>").text(charactersArray[i].name);
			var img = $("<img>").attr("src", "assets/images/" + charactersArray[i].image);
			var botNum = $("<p>").attr("id", "bottomNumber");
			botNum.text(charactersArray[i].totalPow);
			div.append(topName, img, botNum);
			$("#characters").append(div);
		}
	}
	//============================================================================================
	//=========================== SELECTS YOUR CHARACTER AND ENEMIES =============================
	//============================================================================================
	function selectCharacter() {
		$("#your-character").append(selectedCharacter);
		$(selectedCharacter).removeClass("character");
		selectedCharacterId = $(selectedCharacter).attr("id");
		$("#enemies").append($(".character"));
		$(".character").removeClass("bg-white");
		$(".character").addClass("bg-danger");
	}
	//============================================================================================
	//=================================== SELECTS DEFENDER =======================================
	//============================================================================================
	function selectDefender() {
		$("#defender").append(selectedDefender);
		selectedDefenderId = $(selectedDefender).attr("id");
		$(selectedDefender).removeClass("bg-danger");
		$(selectedDefender).addClass("bg-dark text-danger");
	}
	//============================================================================================
	//=================================== CALCULATES POWERS ======================================
	//============================================================================================
	function calculatePower() {
		for (var i = 0; i < charactersArray.length; i++) {
			if (charactersArray[i].name === selectedCharacterId) {
				var indexChar = i;
				break;
			}
		}

		for (var i = 0; i < charactersArray.length; i++) {
			if (charactersArray[i].name === selectedDefenderId) {
				var indexDef = i;
				break;
			}
		}
		 
		attack += charactersArray[indexChar].attackPow;
		defense = charactersArray[indexDef].counterPow;

		charactersArray[indexDef].totalPow -= attack;
		
		if (charactersArray[indexDef].totalPow > 0) { 
			charactersArray[indexChar].totalPow -= defense;
			
			if (charactersArray[indexChar].totalPow > 0) {
				$("#defender-text").html("<p>You attacked " + selectedDefenderId + " for <strong>" + attack + 
				                     "</strong> damage.</p><p>" + selectedDefenderId + 
				                     " attacked you back for <strong>" + defense + "</strong> damage.</p>");
				$("#defender #bottomNumber").text(charactersArray[indexDef].totalPow);
			} else {
				$("#defender-text").html("<p>You have been defeated by " + selectedDefenderId + 
				                     ". Press the restart button to play again.</p>");
				restartBtn = $("<button>Restart</button>").attr("class", "btn btn-warning text-white pt-2 pb-2 pl-4 pr-4 m-4");
				$("#defender-text").append(restartBtn);
			}
			 
		} else {

			if ($("#enemies .character").length > 0) {
				$("#defender-text").html("<p>You attacked " + selectedDefenderId + " for <strong>" + attack + 
				                     "</strong> damage, and you have defeated " + selectedDefenderId + 
				                     ".</p><p>Choose another enemy to attack.</p>");
				$("#defender").empty();
				defenderSelected = false;
			} else {
				$("#defender").empty();
				$("#defender-text").html("<p>CONGRATULATIONS! You have defeated all your enemies.</p>" + 
					                     "<p>Press the restart button to play again.</p>");
				restartBtn = $("<button>Restart</button>").attr("class", "btn btn-warning text-white pt-2 pb-2 pl-4 pr-4 m-4");
				$("#defender-text").append(restartBtn);
			}
			
		}

		$("#your-character #bottomNumber").text(charactersArray[indexChar].totalPow);
		
	}
	//============================================================================================
	//==================================== ALL FUNCTIONS =========================================
	//============================================================================================
	refreshPage();

	$(".character").on("click", function() {
		if (!characterSelected) {
			selectedCharacter = $(this);
			selectCharacter();
			$("#defender-text").html("");
			characterSelected = true;
		}
	})


	$(".character").on("click", function() {
		if ($(this).attr("id") !== selectedCharacterId && !defenderSelected) {
			selectedDefender = $(this);
			selectDefender();
			defenderSelected = true;
			$("#defender-text").html("");
		}	
	})

	$("button").on("click", function() {
		if (defenderSelected) {
			calculatePower();
		} else if (characterSelected) {
			$("#defender-text").html("<p>Select an enemy first!</p>");
		} else {
			$("#defender-text").html("<p>Select your character first!</p>");
		}
	})


})


