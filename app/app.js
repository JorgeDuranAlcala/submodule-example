const bodyParser = require("body-parser");
const express = require("express");
const Country = require("./Country");
const app = express();
const countries_names = [
  "France",
  "Germany",
  "Spain",
  "Colombia",
  "Singapur",
  "USA",
  "UK",
  "South Africa",
  "Canada",
];
let countries = countries_names.map((name) => new Country(name, 4000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/getAllCountries", (req, res) => {
  res.status(200).send({ countries });
});
app.get("/api/getCountryByName/:countryName", (req, res) => {
  const { countryName } = req.params;
  const country = countries.find((c) => c.name === countryName);
  if (country) {
    res.status(200).send({ country });
  } else {
    res.status(404).send({ message: "we couldn't find the country" });
  }
});

app.put("/api/updateCountry/:countryName", (req, res) => {
  const { countryName } = req.params;
  const { data } = req.body;
  const country = countries.find((c) => c.name === countryName);
  if (country) {
    countries = countries.map((c) =>
      c.name === country.name ? { ...c, ...data } : c
    );
    res.status(200).send({ message: "updated successfuly" });
  } else {
    res.status(404).send({ message: "we couldn't find the country" });
  }
});

app.post("/api/addCountry", (req, res) => {
  const { countryName } = req.body;
  const newCountry = countries.push(countryName);
  res.status(201).send({ message: "created successfuly", newCountry });
});

app.delete("api/deleteCountry/:countryName", (req, res) => {
  const { countryName } = req.params;
  countries = countries.filter((country) => country !== countryName);
  res.status(200).send({ message: "deleted successfuly" });
});

module.exports = app;
