var express = require("express");

var app = express();
var PORT = process.env.PORT || 7500;

//Static for CSS Stylesheet compatibility
app.use(express.static('app'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
