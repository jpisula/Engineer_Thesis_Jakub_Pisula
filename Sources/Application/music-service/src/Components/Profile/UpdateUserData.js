import React from 'react';
import axios from 'axios';
import "./profile.css";

export class UpdateUserData extends React.Component {
    constructor(props) {
        super(props);

        this.user_id = props.user_id;

        this.state = {
            user: props,
            countries: null
        };
    }

    componentDidMount() {    
        axios('http://localhost/api/requests/countries/getCountries.php', {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
                crossdomain: true,  
        }) .then((resp) => {
            this.setState({countries: resp.data});
        });
    
    }

    updateData(e){
        e.preventDefault();
        
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }

        let data = {
            user_id: this.user_id,
            age: formData.age,
            gender: formData.gender,
            country_name: formData.country,
        };

        axios('http://localhost/api/requests/users/updateData.php', {
          method: "post",
          data: JSON.stringify(data),
          withCredentials: true,
          credentials: 'include',
          origin: 'http://localhost',
          crossdomain: true,        
        }) .then(function(resp) {
            window.location.reload();
        });
    }

    render() {
        const {user, countries} = this.state;

        if(countries) {
            let countrySelect = countries.data.map(function(country){
                return(<option value={country.country_name} key={country.country_id}> {country.country_name} </option>)
            });
            return (
                <div className="card profilePanel-card">
                    <div className="card-header">
                        Zaktualizuj swoje dane:
                    </div>
                    <div className="card-body">
                        <form id="ajax-updateData-form" method="post" role="form" onSubmit={this.updateData.bind(this)} autoComplete="off">
                        <div className="form-group">
                        <label>Wiek
                        <input type="number" name="age" required={true} defaultValue={user.age} id="age" tabIndex="1" className="form-control" placeholder="Wiek" ref="age" autoComplete="off"></input>
                        </label>
                        </div>  
                        <div className="form-group">
                        <label>Płeć<br></br>
                        <select name="gender" ref="gender" defaultValue={user.gender} tabIndex="2" id="gender">
                                        <option value="M">Mężczyzna</option>
                                        <option value="K">Kobieta</option>
                                    </select>
                        </label>
                        </div>   
                        <div className="form-group">
                        <label>Państwo<br></br>
                        <select name="country" ref="country" defaultValue={user.country_name} tabIndex="3" id="country">
                                        {countrySelect}
                                    </select>
                        </label>
                        </div>            
                        <input type="submit" name="submit" id="reg-submit" tabIndex="4" className="btn btn-info updateDataBtn" value="Aktualizuj"></input>
                    
                    
                        
                    </form>
                    </div>
                </div>
            );
        } else return null;
    }
}