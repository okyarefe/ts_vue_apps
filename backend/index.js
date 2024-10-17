const express = require("express");
const port = 5000;
const app = express();
const cors = require("cors");
const md5 = require("md5");
require("dotenv").config();
app.use(cors());
app.use(express.json());
// Weather app
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

//Marvel app
const MARVEL_API_ENDPOINT = "http://gateway.marvel.com/v1/public/comics";
const MARVEL_PUBLIC_KEY = process.env.MARVEL_API_PUBLIC;
const MARVEL_SECRET_KEY = process.env.MARVEL_API_SECRET;
const ts = new Date().getTime();
const hash = md5(ts + MARVEL_SECRET_KEY + MARVEL_PUBLIC_KEY);
const marvelRequestUrl = `${MARVEL_API_ENDPOINT}?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;
app.listen(5000, () => console.log(`Server is running on ${port}`));

// Endpoints for weather API
app.get("/weatherapi", async (req, res) => {
  const { latitude, longitude } = req.query;
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}`
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching weather data..Please try again" });
  }
});

//Endpoints for Marvel API
app.get("/marvel", async (req, res) => {
  console.log("Request to /marvel ");
  try {
    const response = await fetch(marvelRequestUrl);

    const data = await response.json();
    console.log(data.data);
    res.json(data.data);
  } catch (error) {
    console.log("Error", error);
    res.json({ error: error.message });
  }
});
