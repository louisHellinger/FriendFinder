var path = require("path");

var friends = require("../data/friends.js");


module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
		console.log(res);

		res.json(friends);

	});

	app.post("/api/friends", function(req, res) {

		console.log("\n\r=======================================\n\r");
		console.log("=======================================\n\r");
		console.log("made it to post");

		var newFriend = req.body;
		console.log(req.body);

		var newFriend = {
			name: req.body.name,
			photo: req.body.photo,
			scores: req.body["scores[]"]
		};

		// save best match as an objects

		var bestMatch = {
			name: "",
			photo: "",
			score: null
		};

		friends.push(newFriend);

		//console.log("this is the new friend" + newFriend.scores);

		for (var i = 0; i < friends.length - 1; i++) {
			console.log("\n\r========================================\n\r");
			console.log("new Friend = " + newFriend.name);
			console.log("COMPARE = " + friends[i].name + "\n\r");

			var currentScore = null;

			for (var j = 0; j < friends[i].scores.length; j++) {
				//console.log("this is the friends Score " + friends[i].scores);

				var score = Math.abs(friends[i].scores[j] - newFriend.scores[j]);
				console.log(j + " score = " + score);
				currentScore = currentScore + score;

			} //end of innerloop

			console.log("this it the current score " + currentScore);

			if (bestMatch.score === null) {
				bestMatch.score = currentScore;
				bestMatch.name = friends[i].name;
				bestMatch.photo = friends[i].photo;


			} else if (currentScore <= bestMatch.score) {
				bestMatch.score = currentScore;
				bestMatch.name = friends[i].name;
				bestMatch.photo = friends[i].photo;
				console.log("Most Compatible friend = " + bestMatch.name);
			} else {


				console.log("\n\r" + friends[i].name + " is not the most compatible");
			}

			console.log("\n\r" + bestMatch.name + " is the best match");
		} // end of outerloop


		res.json(bestMatch);
	});
}