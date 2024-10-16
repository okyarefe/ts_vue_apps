const express = require("express");
const port = 5000;
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.listen(5000, () => console.log(`Server is running on ${port}`));

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
