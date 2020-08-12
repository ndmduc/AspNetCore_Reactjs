import React from 'react';
import Form from './Form';
import WeatherDetails from './WeatherDetails';
import { Weather } from '../types/Weather';
import { Country } from '../types/Country';
import { City } from '../types/City';
import { Constants } from '../Constants';
import { CurrentCondition } from '../types/CurrentCondition';
import { CityMetaData } from '../types/CityMetaData';
import { ThunkDispatch } from '../../node_modules/redux-thunk';
import { AppActions } from '../types/actions';
import { bindActionCreators } from '../../node_modules/redux';
import { getCountries } from '../actions/actions';
import { connect } from 'react-redux';

interface IState {
    weather: Weather;
    countries: Country[];
    city?: City
}

interface IDispatchProps{
    getCountries: () => void;
}

class Home extends React.Component<IDispatchProps, IState>{
    
    public state: IState = {
        weather: { error: '' } as Weather,
        countries: [],
        city: undefined
    }

    async getCountries(): Promise<Country[]> {
        try {
            const res = await fetch(`${Constants.locationAPIUrl}/countries?apikey=${Constants.apiKey}`);
            return await res.json() as Country[];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getCity(searchText: string, countryCode: string): Promise<City> {
        const res = await fetch(`${Constants.locationAPIUrl}/cities/${countryCode}/search?apikey=${Constants.apiKey}&q=${searchText}`);
        const cities = await res.json() as City[];
        if (cities.length > 0) {
            return cities[0];
        }

        return {} as City;
    }

    async getCurrentConditions(city: City) {
        try {
            const res = await fetch(`${Constants.currentConditionsAPIUrl}/${city.Key}?apikey=${Constants.apiKey}`);
            const currentConditions = await res.json() as CurrentCondition[];
            if (currentConditions.length > 0) {
                const weather = new Weather(currentConditions[0], city);
                await this.setStateAsync({ weather: weather, city: city } as IState);
            }
        } catch (error) {
            console.log(error);
        }
        return {} as Weather;
    }

    // Get weather
    getWeather = async (e: any, countryCode: string, searchText: string) => {
        //e.prevenDefault();
        if (!countryCode && !searchText) {
            await this.setStateAsync({ weather: { error: 'Please enter the value.' } } as IState);
            return;
        }

        try {
            const city = await this.getCity(searchText, countryCode);
            if (city.Key) {
                await this.updateLastAccessedCity(city);
                await this.getCurrentConditions(city);
            }
        } catch (e) {
            await this.setStateAsync({ weather: { error: e } } as IState);
        }
    }

    //async getWeatherAsync(city: City) {
    //    try {
    //        const res = await fetch(`${Constants.currentConditionsAPIUrl}`)
    //    } catch (e) {
    //        console.log(e);
    //    }

    //    return {} as Weather;
    //}

    async updateLastAccessedCity(city: City) {
        try {
            const data = new CityMetaData(city);
            await fetch(`${Constants.cityAPIUrl}`, {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    async getLastAccessedCity(): Promise<City> {
        try {
            const res = await fetch(`${Constants.cityAPIUrl}`);
            const data = await res.json() as CityMetaData;
            return {
                Key: data.id,
                EnglishName: data.name,
                Type: 'City',
                Country: {
                    ID: data.countryId,
                    EnglishName: ''
                }
            } as City;
        } catch (e) {
            console.log(e);
            return {} as City;
        }
    }

    async componentDidMount() {
        try {
            // const countries = await this.getCountries();
            // await this.setStateAsync({ countries: countries } as IState);

            // const lastCity = await this.getLastAccessedCity();
            // if (lastCity && lastCity.Key) {
            //     await this.getCurrentConditions(lastCity);
            // }

            // Redux
            this.props.getCountries();
        } catch (error) {
            console.log(error);
        }
    }

    

    async setStateAsync(state: IState) {
        return new Promise((resolve: any) => {
            console.log(resolve);
            this.setState(state, resolve);
        })
    }

    // Use redux
    render() {
        return (
            <div className="container content panel">
                <div className='container'>
                    <div className='row'>
                        <div className='form-container'>
                            <WeatherDetails  />
                            <Form  />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // render() {
    //     return (
    //         <div className="container content panel">
    //             <div className='container'>
    //                 <div className='row'>
    //                     <div className='form-container'>
    //                         <WeatherDetails weather={this.state.weather} />
    //                         <Form countries={this.state.countries} getWeather={this.getWeather} />
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
}

//export default Home;

// Use redux
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): IDispatchProps => ({
    getCountries: bindActionCreators(getCountries, dispatch)
});

export default connect(null, mapDispatchToProps)(Home);