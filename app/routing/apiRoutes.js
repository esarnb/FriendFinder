var friends = require("../data/friends");

module.exports = function(app) {

  /**
   * Used to display a JSON of all possible friends
   */
  app.get("/api/friends", function(req, res) {
    res.json(friends)
  })

  /**
   * Used to handle incoming survey results 
   * and handles compatibility logic.
   */
  app.post("/api/friends", function(req, res) {
    req.body.survey = req.body.survey.map(el => parseInt(el));
    friends.push(req.body);
    
    var totals = [];
    //For each friend in db...
    for(perFriend of friends) {
      
      /*
        Do not make current member a possible choice for 
        a match with his/her self for this instance only.
      */
      if (perFriend.name !== req.body.name) {
        var currentSum = 0;
        //Sum the differences for each answer
        for(var i = 0; i < perFriend.survey.length; i++) {
            currentSum += Math.abs(req.body.survey[i] - perFriend.survey[i]);
        }
        //Store each diff into totals with friend's id.
        totals.push({sum: currentSum, name: perFriend.name, photo: perFriend.photo});
      }
    }
    //Find lowest diff
    totals.sort((a,b) => (a.sum > b.sum) ? 1 : -1);
  
   //Get all users with the same match diff compatibility
   var filterSum = totals[0].sum;
   var matches = totals.filter(el => el.sum == filterSum);
   
   //Send data back to client about potential matches
   matches ? res.json(matches) : res.json({"Error":"No Matches"})
  })

}