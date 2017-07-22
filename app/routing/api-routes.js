'use strict';

(function(){
    var path = require('path');
    var tableData = require('./../data/friends.js');

    module.exports = function (app) {

//this is saying when ever you go to api tables//
//can you go ahead and display it in json format
    app.get('/api/friends', function (req, res) {
        res.json(tableData);
    });
    //this will handle incoming survey results
 		app.post("/api/friends", function(req, res) {
			var newFriend = req.body;
			var currentScores = [];
			var matchedFriend = 0;
			var matchedScore = 100; //largest value difference

			//function to add array
            function add(a,b){
            	return parseInt(a) + parseInt(b) 
            }

			//Get total score for each person in PERSON object
			for(var i = 0; i < tableData.length; i++){
				//Get scores in people.scores
				var personScore = tableData[i].scores;
				var sum = personScore.reduce(add, 0);
				currentScores.push(sum)
			}

			//Get total score for new entry
            var newFriendScore = newFriend.scores;
			var newFriendSum = newFriendScore.reduce(add, 0);

			//Now, compare each score in currentScores (all of the friend's scores) with newFriendSum (the new entry's score)
			for(var i=0; i < currentScores.length; i++){
				//Determine difference between both people
				var friendDelta = Math.abs((newFriendSum - currentScores[i]))
				if(matchedScore >= friendDelta) {
					matchedScore = friendDelta;
					matchedFriend = i;
				}
			}
			//Get name of matched person
			var matchedPerson = tableDta[matchedFriend];
			res.json(matchedPerson);	
        });

    };
})();