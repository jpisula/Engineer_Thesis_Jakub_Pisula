import React from 'react';

export class PickerList extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            countries: props.countries
        }
    }

    render() {
        const {countries} = this.state;

        let countrySelect = countries.data.map((country) => {
            return (<Picker.item label={country.country_name} value={country.country_name} key={country.country_name}/>)
        });
        return countrySelect;
    }
}