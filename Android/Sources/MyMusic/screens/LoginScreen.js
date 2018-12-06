import React from 'react';

export class LoginScreen extends React.Component() {
    static navigationOptions = {
        title: "Welcome",
    };
    render() {
        return (
            <Text>Hello, user!</Text>
        )
    }

}