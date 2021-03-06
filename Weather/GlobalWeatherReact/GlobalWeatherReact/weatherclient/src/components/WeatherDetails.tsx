﻿import React from "react";
import { Weather } from '../types/Weather';
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";

interface IProp {
    weather: Weather;
}

class WeatherDetails extends React.Component<IProp> {
    // Fix issue IProps
    static defaultProps = {
        weather: {} }

    render() {
        const weather = this.props.weather;

        return (
            <div>
                <div className="city col-sm-9">
                    {
                        weather.location && <div>
                            <h1>{weather.location}</h1>
                            <div className='row'>
                                <table>
                                    <tr>
                                        <td>
                                            {
                                                weather.weatherIcon &&
                                                <img src={weather.weatherIcon} className='img-thumbnail' />
                                            }
                                        </td>
                                        <td>
                                            <span>{weather.weatherText}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            {
                                                weather.isDaytime &&
                                                <span>Daytime</span>
                                            }
                                            {
                                                !weather.isDaytime &&
                                                <span>Night</span>
                                            }
                                        </td>
                                        <td>
                                            <span>{weather.temperatureValue}&deg;
                                                      {weather.temperatureUnit}</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    }
                </div>

                {
                    weather.error && <p className='weatherError'>{weather.error}</p>
                }
            </div>
        );
    }
}

//export default WeatherDetails

//Redux
const mapStateToProps = (state: AppState): IProp =>({
    weather: state.weather
});

export default connect (mapStateToProps)(WeatherDetails)