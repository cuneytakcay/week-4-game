$(document).ready(function() {

	//================================ VARIABLES DECLARED ========================================
	var characterSelected, enemySelected;
	var selectedCharacter, selectedEnemy, selectedCharacterId, selectedEnemyId;
	var attack = 0;
	var defense;
	var attackBtn = $("<button>Attack!</button>").attr("class", "btn btn-danger text-white pt-2 pb-2 pl-4 pr-4 m-4");
	var restartBtn = $("<button>Restart</button>").attr("class", "btn btn-warning text-white pt-2 pb-2 pl-4 pr-4 m-4");
	var heMan, manAtArms, sheRa, teela, orko, skeletor, hordak, evilLyn, beastMan, charactersArray;
	
	//========================== DISPLAYS THE CHARACTERS ON THE PAGE ============================= 
	function refreshPage() {
		// Character objects created =============================================================
		heMan = { name: "He-Man", totalPow: 150, attackPow: 10, counterPow: 30, image: "he-man.jpg" };
		manAtArms = { name: "Man-At-Arms", totalPow: 120, attackPow: 6, counterPow: 20, image: "man-at-arms.jpg" };
		sheRa = { name: "She-Ra", totalPow: 145, attackPow: 10, counterPow: 25, image: "she-ra.jpg" };
		teela = { name: "Teela", totalPow: 90, attackPow: 4, counterPow: 10, image: "teela.jpg" };
		orko = { name: "Orko", totalPow: 100, attackPow: 7, counterPow: 5, image: "orko.jpg" };
		skeletor = { name: "Skeletor", totalPow: 130, attackPow: 10, counterPow: 20, image: "skeletor.jpg" };
		hordak = { name: "Hordak", totalPow: 135, attackPow: 8, counterPow: 25, image: "hordak.jpg" };
		evilLyn = { name: "Evil-Lyn", totalPow: 95, attackPow: 6, counterPow: 8, image: "evil-lyn.jpg" };
		beastMan = { name: "Beast Man", totalPow: 115, attackPow: 8, counterPow: 15, image: "beast-man.jpg" };
		// Character objects assigned to an array ================================================
		charactersArray = [heMan, manAtArms, sheRa, teela, orko, skeletor, hordak, evilLyn, beastMan];
		//
		for (var i = 0; i < charactersArray.length; i++) {
			var div = $("<div>").attr("class", "bg-white border border-success rounded d-inline-block mr-1 mt-2 pr-2 pl-2 character");
			div.attr("id", charactersArray[i].name);
			var topName = $("<p>").text(charactersArray[i].name);
			var img = $("<img>").attr("src", "assets/images/" + charactersArray[i].image);
			var botNum = $("<p>").attr("id", "bottomNumber");
			botNum.text(charactersArray[i].totalPow);
			div.append(topName, img, botNum);
			$("#characters").append(div);
		}
		$("#text-1").html("<p>Select your character first.</p>");
		characterSelected = false;
		enemySelected = false;
		console.log("characterSelected: " + characterSelected);
		console.log("enemySelected: " + enemySelected);
	}

	//=========================== SELECTS YOUR CHARACTER AND ENEMIES =============================
	function selectCharacter() {
		$("#text-1").html("");
		$("#your-character-title").html("<h2>Your Character</h2>");
		$("#your-character").append(selectedCharacter);
		selectedCharacter.removeClass("character");
		selectedCharacterId = selectedCharacter.attr("id");
		$("#enemies").append($(".character"));
		$(".character").removeClass("bg-white");
		$(".character").addClass("bg-danger");
		$("#text-2").html("<h2>Enemies Available to Attack</h2>");
		$("#text-3").html("<p>Select your enemy</p>");
	}
	
	//=================================== SELECTS DEFENDER =======================================
	function selectEnemy() {
		$("#text-3").html("");
		$("#result-text").html("");
		$("#your-enemy-title").html("<h2>Your Enemy</h2>");
		$("#your-enemy").append(selectedEnemy);
		selectedEnemyId = selectedEnemy.attr("id");
		selectedEnemy.removeClass("bg-danger");
		selectedEnemy.addClass("bg-dark text-danger");
		$("#btn-attack").append(attackBtn);
	}
	
	//=================================== CALCULATES POWERS ======================================
	function calculatePower() {
		for (var i = 0; i < charactersArray.length; i++) {
			if (charactersArray[i].name === selectedCharacterId) {
				var characterIndex = i;
				break;
			}
		}

		for (var i = 0; i < charactersArray.length; i++) {
			if (charactersArray[i].name === selectedEnemyId) {
				var enemyIndex = i;
				break;
			}
		}
		 
		attack += charactersArray[characterIndex].attackPow;
		defense = charactersArray[enemyIndex].counterPow;

		charactersArray[enemyIndex].totalPow -= attack;
		
		if (charactersArray[enemyIndex].totalPow > 0) { 
			charactersArray[characterIndex].totalPow -= defense;
			
			if (charactersArray[characterIndex].totalPow > 0) {
				$("#your-text").html("<p>You attacked " + selectedEnemyId + " for <strong>" + attack + "</strong> damage.</p>");
				$("#enemy-text").html("<p>" + selectedEnemyId + " attacked you back for <strong>" + defense + "</strong> damage.</p>");
				$("#your-enemy #bottomNumber").text(charactersArray[enemyIndex].totalPow);
			} else {
				$("#btn-attack").html("");
				$("#result-text").append(restartBtn);
				$("#result-text").append("<p>You have been defeated by " + selectedEnemyId + ". Press the restart button to play again.</p>");
			}
			 
		} else {

			if ($("#enemies .character").length > 0) {
				$("#your-text").html("");
				$("#enemy-text").html("");
				$("#btn-attack").html("");
				$("#result-text").html("<p>You attacked " + selectedEnemyId + " for <strong>" + attack + 
				                     "</strong> damage, and you have defeated " + selectedEnemyId + 
				                     ".</p><p>Choose another enemy to attack.</p>");
				$("#your-enemy").empty();
				enemySelected = false;
			} else {
				$("#your-enemy").empty();
				$("#result-text").html("<p>CONGRATULATIONS! You have defeated all your enemies.</p>" + 
					                     "<p>Press the restart button to play again.</p>");
				$("#result-text").append(restartBtn);
			}
			
		}

		$("#your-character #bottomNumber").text(charactersArray[characterIndex].totalPow);
		
	}

	//==================================== CALL FUNCTIONS ========================================
	refreshPage();

	$(".character").on("click", function() {
		if (!characterSelected) {
			selectedCharacter = $(this);
			selectCharacter();
			characterSelected = true;
			console.log("characterSelected: " + characterSelected);
			console.log("enemySelected: " + enemySelected);
		}
	})


	$(".character").on("click", function() {
		if ($(this).attr("id") !== selectedCharacterId && !enemySelected) {
			selectedEnemy = $(this);
			selectEnemy();
			enemySelected = true;
			console.log("characterSelected: " + characterSelected);
			console.log("enemySelected: " + enemySelected);
		}	
	})

	attackBtn.on("click", function() {
		calculatePower(); 
	})

	restartBtn.on("click", function() {
		$("#your-character").html("");
		$("#your-enemy").html("");
		$("#enemies").html("");
		$("#text-2").html("");
		$("#your-character-title").html("");
		$("#your-enemy-title").html("");
		$("#your-text").html("");
		$("#enemy-text").html("");
		$("#result-text").html("");
		refreshPage();
		characterSelected = false;
		enemySelected = false;
		attackCompleted = false;
	})
})


