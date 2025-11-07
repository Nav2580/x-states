import { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelCountry] = useState("");
  const [selectedState, setSelState] = useState("");
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
      console.error("Error fetching countries:", error);
    }
  }

  async function getState(country) {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/countries/${country}/states`
      );
      setStates(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  }

  async function getCity(country, state) {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/countries/${country}/states/${state}/cities`
      );
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Select Location</h1>

      {/* Country */}
      <select
        name="country"
        id="country"
        value={selectedCountry}
        onChange={(e) => {
          setSelCountry(e.target.value);
          setSelState("");
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

      {/* State */}
      <select
        name="state"
        id="state"
        value={selectedState}
        disabled={!states.length}
        onChange={(e) => {
          setSelState(e.target.value);
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

      {/* City */}
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

      {selectedCity && selectedState && selectedCountry && (
        <h3>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </h3>
      )}
    </div>
  );
};

export default Main;
