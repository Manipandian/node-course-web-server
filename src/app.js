const path = require("path");
const express = require("express");
const getGeoCode = require("./utils/geoCode");
const getWheatherData = require("./utils/wheatherData");
const hbs = express("hbs"); //to load dynamic content into static files like html

const app = express(); 

const staticPublicPath = path.join(__dirname, "../public"); //to get path of static files
const viewHbsPath = path.join(__dirname, "../templates/views"); //reference path for hbs views
const partialsHbsPath = path.join(__dirname, "../templates/partials") //to get partials files path reference
console.log(hbs);

app.use("", express.static(staticPublicPath)); //to refer static file path as default absolute path

// hbs.registerPartials(partialsHbsPath, () => {}); //referrring partials path
app.set("view engine", "hbs"); //to refer hbs files(handlebars to load dyanmic content into static file)
app.set("views", viewHbsPath); // refer new path for hbs views reference




app.get("", (req, res) => {
  res.render("index", {
    title: "Home Page",
    name: "Mani"
  })
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Dynamic about About",
    name: "Mani About"
  })
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Dynamic",
    name: "Mani Help"
  })
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    title: "Error Message!",
    errorMessage: "help article not found"
  });
})

app.get("/wheather", (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: "Address is missing"
    });
  }
  getGeoCode(req.query.address, (error, locationData) => {
    if (error) return res.send("Cant get geo code!"); // commenting since api not working
    locationData &&
      getWheatherData(locationData, req.query.address, (error, currentWheaatherStatus) => {
        if (error) return res.send({error: "Unable to fetch wheather data for given location"});
        const { weather_descriptions, temperature, feelslike } =
          currentWheaatherStatus;
        res.send({
          address: req.query.address,
          forCast: feelslike,
          temperature,
          description: weather_descriptions[0]
        });
      });
  });
});

app.get("*", (req, res) => {
  console.log("404 page");
  res.render("notFound", {
    title: "Error Message!",
    errorMessage: "Page not found"
  })
})

app.listen("3000", () => {
    console.log("server running on port 3000");
})