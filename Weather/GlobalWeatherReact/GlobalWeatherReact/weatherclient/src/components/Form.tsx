﻿import React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';
import { Country } from '../types/Country';
import { City } from '../types/City';
import { ThunkDispatch } from '../../node_modules/redux-thunk';
import { AppActions } from '../types/actions';
import { bindActionCreators } from '../../node_modules/redux';
import { getWeather } from '../actions/actions';
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";

// interface IProps {
//     getWeather: (e: any, country: string, searchText: string) => Promise<void>;

//     countries: Country[];
// }

interface IState {
    city: City;
    country: Country;
    cities: City[];
    searchText: string;
}

// Redux
interface IFormProps{
    countries: Country[];
}
interface IDispatchProps{
    getWeather: (country: string, city: string) => void;
}
interface IProps extends IFormProps, IDispatchProps {}

class Form extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            city: {} as City,
            country: {} as Country,
            cities: [],
            searchText: ""
        }
    }

    handleSubmit = async (e: any) => {
        e.preventDefault(); // Prevent auto reload page when form submit
        //this.props.getWeather(e, this.state.country.ID, this.state.searchText);

        //Redux
        if(this.state.searchText && this.state.country)
            this.props.getWeather(this.state.country.ID, this.state.searchText);
    }

    // Fix issue IProps
    static defaultProps = { countries: [] }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-4 form-group'>
                            <Typeahead id='country'
                                labelKey='EnglishName'
                                options={this.props.countries}
                                onChange={(s) => this.setState({ country: s[0] } as IState)}
                                placeholder='Country...'
                                />
                        </div>

                        <div className='col-sm-4 form-group field'>
                            <FormControl id='city' type='text' name='city'
                                onChange={(e: any) => this.setState({ searchText: e.target.value })}
                                placeholder='City...' />
                        </div>

                        <div className="col-sm-2 form-group field">
                            <Button variant="primary" type="submit"> Go </Button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

//export default Form;

// Redux
const mapStateToProps = (state: AppState) : IFormProps => ({
    countries: state.countries
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): IDispatchProps => ({
    getWeather: bindActionCreators(getWeather, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form)