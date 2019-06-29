var friends = require("../data/friends");

module.exports = function(app) {

  /**
   * Used to display a JSON of all possible friends
   */
  app.get("/api/friends", function(req, res) {
    console.log(friends);
    
    res.json(friends)
  })

  /**
   * Used to handle incoming survey results 
   * and handles compatibility logic.
   */
  app.post("/api/friends", function(req, res) {
    console.log(req.body)
    friends.push(req.body);
  })

}