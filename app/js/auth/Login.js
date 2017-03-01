const React = require('react');
const axios = require('axios');
const LoginComponent = require('./LoginComponent');

const Login = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return ({ username: "", password: "", loginError: false });
    },
    doLogin(e) {
        e.preventDefault();
        const _this = this;
        const loginData = {
            "username": this.state.username,
            "password": this.state.password
        };
        axios.post('http://localhost:8080/api/auth/login', loginData, { headers: { 'Content-Type': 'application/json' } })
            .then(resp => {
                console.log(resp.data);
            })
            .catch(err => {
                console.log(err);
                _this.setState({ loginError: true });
            })
    },
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    },
    handleNameChange(e) {
        this.setState({ username: e.target.value })
    },
    prepareloginError() {
        var error = [];
        if (this.state.loginError) error =(
                                            <div className="form-group alert alert-danger login">
                                                <label>Neteisingi prisijungimo duomenys</label>
                                            </div>
                                        );
        return error;
    },
    render: function() {
        return (
            <LoginComponent
                username={this.state.username}
                password={this.state.password}
                changeName={this.handleNameChange}
                changePassword={this.handlePasswordChange}
                doLogin={this.doLogin}
                loginError={this.prepareloginError()}
            />
        );
    }
});

module.exports = Login;