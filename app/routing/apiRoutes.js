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
    
    var totals = [], lowestSum = -1;
    //For each friend in db...
    for(perFriend of friends) {
      //Do not make current member a possible choice for a match
      if (perFriend.FFuuid !== req.body.FFuuid) {
        var currentSum = 0;
        //Sum the differences for each answer
        for(var i = 0; i < perFriend.survey.length; i++) {
            currentSum += Math.abs(req.body.survey[i] - perFriend.survey[i]);
        }
        //Store each diff into totals with friend's id.
        totals.push({FFuuid: perFriend.FFuuid, sum: currentSum, name: perFriend.name, photo: perFriend.photo});
      }
    }
    //Find lowest diff
    totals.sort((a,b) => (a.sum > b.sum) ? 1 : -1);
    
   var filterSum = totals[0].sum;
   var matches = totals.filter(el => el.sum == filterSum).map(el => `Name: ${el.name}\nPhoto: ${el.photo}\n`).join("\n")
   console.log("===",matches,"===");
   
    return res.json(matches);
  })

}