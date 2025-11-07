import { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelcountry] = useState("");
  const [selectedState, setSelstate] = useState("");
  const [selectedCity, setSelCity] = useState("");

  useEffect(() => {
    getCountry();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getState(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      getCity(selectedCountry, selectedState);
    }
  }, [selectedCountry, selectedState]);

  async function getCountry() {
    try {
      const response = await axios.get(
        "https://crio-location-selector.onrender.com/countries"
      );
      setCountries(response.data);
    } catch (error) {
      console.error("Error Fetching Countries");
    }
  }

  async function getState(country) {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country/${country}/states`
      );
      setStates(response.data);
    } catch (error) {
      console.error("Error Fetching States");
    }
  }

  async function getCity(country, state) {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country/${country}/state/${state}/cities`
      );
      setCities(response.data);
    } catch (error) {
      console.error("Error Fetching Cities");
    }
  }

  return (
    <div>
      <h1>Select Location</h1>

      <select
        name="country"
        id="country"
        value={selectedCountry}
        onChange={(e) => {
          setSelcountry(e.target.value);
          setSelstate("");
          setSelCity("");
          setStates([]);
          setCities([]);
        }}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        name="state"
        id="state"
        value={selectedState}
        disabled={!states.length}
        onChange={(e) => {
          setSelstate(e.target.value);
          setSelCity("");
          setCities([]);
        }}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        name="city"
        id="city"
        value={selectedCity}
        disabled={!cities.length}
        onChange={(e) => setSelCity(e.target.value)}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedCountry && selectedState && selectedCity && (
        <h3>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </h3>
      )}
    </div>
  );
};

export default Main;
