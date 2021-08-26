import React from 'react';

const axios = require('axios')
const {REACT_APP_LOCATIONIQ_ACCESS_TOKEN} = process.env

export default class CityInfo extends React.Component{
    state = {
        city: []
    }
    render() {
        const handleClick = event => {
            event.preventDefault()
            let inputVal= document.getElementById("city").value;
            console.log(`inputVal= ${inputVal}`)
            axios.get(`https://us1.locationiq.com/v1/search.php?key=${REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${inputVal}&format=json`)
                .then(response => {
                    console.log(response)
                    const city= response.data
                    this.setState({city})
                })
                .catch (error => {
                    console.log(error)
                })

        } 
        return (
            <>
            <h2>City Information</h2>
            <form onSubmit={handleClick}>
                <label>
                    City
                    <input type="text" name="city" id="city"/>
                </label>
                <button type="submit">Explore!</button>
            </form>
            <br/>
            <div className="container">

            <div className="border border-primary">
                <div className="row">
                    
                    {
                        this.state.city.map(city => (
                            <div key={city.place_id} name={city.place_id}>
                                <div className="col-12">
                                    <p className="mb-0 mt-5">city name</p>
                                    <div className="mb-5">{city.display_name}</div>
                                </div>
                                <div className="col-12"> 
                                    <p className="mb-0">latitude</p>
                                    <div className="mb-5">{city.lat}</div>
                                </div>
                                <div className="col-12">
                                    <p className="mb-0">longitude</p>
                                    <div className="mb-5">{city.lon}</div> 
                                </div>                 
                            </div>
                                
                        ))
                          
                    }

                </div>
                
            </div>

            </div>

            </>
        );
    }
}

        