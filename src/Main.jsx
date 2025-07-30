import { useEffect, useState } from "react"
import axios from 'axios'

const Main = () => {

    const [countries,setCountries] = useState([])
    const [states,setStates] = useState([])
    const [cities,setCities] = useState([])

    const [selectedCountry,setSelcountry] = useState("")
    const [selectedState,setSelstate] = useState("")
    const [selectedCity,setSelCity] = useState("")

    useEffect(() => {
        getCountry()
    },[])

    useEffect(() => {
        if(selectedCountry) {
            getState(selectedCountry)
        }
        
    },[selectedCountry])

    useEffect(() => {
        if(selectedCountry && selectedState) {
            getCity(selectedCountry,selectedState)
        }
   
    },[selectedCountry,selectedState])



    async function getCountry() {

        const response = await axios.get('https://crio-location-selector.onrender.com/countries')
        console.log(response.data)
        setCountries(response.data)
        
    } 

    async function getState(country) {

        const response = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/states`)
        console.log(response.data)
        setStates(response.data)
    }

    async function getCity(country,state) {

        const response = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`)
        console.log(response.data)
        setCities(response.data)
    }

    return (
        <div>
            <h1>XStates</h1>
            
                <select 
                    name="country" 
                    id="country"
                    value={selectedCountry}
                    onChange={(e) => {

                        setSelcountry(e.target.value);
                        setSelstate("")
                        setStates([])
                        setCities([])
                        
                    }}>

                    <option value="default"> Select Country</option>
                    {
                            countries.map((country) => 
                                (
                                    <option key={country} value={country}>{country}</option>
                                )
                            )
                    } 
                    
                </select>

                <select 
                    name="state" 
                    id="state"
                    value={selectedState}
                    disabled = {!states.length}
                    onChange={(e) => {

                        setSelstate(e.target.value)
                        setCities([])
                        
                    }}>

                    <option value="default"> Select States</option>
                    {
                            states.map((state) => 
                                (
                                    <option 
                                        key={state} 
                                        value={state}
                                        >{state}
                                    </option>
                                )
                            )
                    } 
                    
                </select>

                <select 
                    name="city" 
                    id="city"
                    value={selectedCity}
                    disabled = {!cities.length}
                    onChange={(e) => {
                        setSelCity(e.target.value)
                    }}
                    >

                    <option value="default"> Select City</option>
                    {
                            cities.map((city) => 
                                (
                                    <option 
                                        key={city} 
                                        value={city}
                                        >{city}
                                    </option>
                                )
                            )
                    } 
                    
                </select>
            
               { selectedCity && (
                <h3>You selected {selectedCity},{selectedState},{selectedCountry}</h3>
               )}
            
            
           
        </div>
    )
}

export default Main