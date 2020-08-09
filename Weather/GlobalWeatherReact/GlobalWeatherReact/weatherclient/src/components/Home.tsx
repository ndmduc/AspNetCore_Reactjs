﻿import React from 'react';
import Form from './Form';
import WeatherDetails from './WeatherDetails';
import { Weather } from '../types/Weather';
import { Country } from '../types/Country';
import { City } from '../types/City';
import { Constants } from '../Constants';
import { CurrentCondition } from '../types/CurrentCondition';

interface IState {
    weather: Weather;
    countries: Country[];
    city?: City
}
class Home extends React.Component<IState>{
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
                await this.getCurrentConditions(city);
            }
        } catch (e) {
            await this.setStateAsync({ weather: { error: e } } as IState);
        }
    }

    async componentDidMount() {
        try {
            const countries = await this.getCountries();
            await this.setStateAsync({ countries: countries } as IState);
        } catch (error) {

        }
    }

    async componentWillUnmount() {
        try {
            console.log("com unmount")
        } catch (error) {

        }
    }

    async setStateAsync(state: IState) {
        return new Promise((resolve: any) => {
            console.log(resolve);
            this.setState(state, resolve);
        })
    }

    render() {
        return (
            <div className="container content panel">
                <div className='container'>
                    <div className='row'>
                        <div className='form-container'>
                            <WeatherDetails weather={this.state.weather} />
                            <Form countries={this.state.countries} getWeather={this.getWeather} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;