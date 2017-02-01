var React = require('react');
var ErrorWrapper = require('./ErrorWrapper');

var ContactForm = React.createClass({
    getInitialState: function() {
        return ({ name: "", email: "", errors: [] });
    },
    handleChangeName: function(e) {
        this.setState({ name: e.target.value });
    },
    handleChangeEmail: function(e) {
        this.setState({ email: e.target.value });
    },
    checkForErrors: function() {
        var errors = [];

        var name = this.state.name;
        var nameRegex = new RegExp(/^[a-zA-Z]*$/);
        if (name.length < 3) errors.push("Vardas per trumpas. Min 3 simboliai");
        if (name.length > 40) errors.push("Vardas per ilgas. Max 40 simboliu");
        if (!nameRegex.test(name)) errors.push("Vardas gali buti tik raides");

        var email = this.state.email;
        var emailRegex = new RegExp(/\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i);
        if (email.length == 0 | !emailRegex.test(email)) errors.push("Tinkamas formatas test@example.com");

        return errors;
    },
    handleSubmit: function() {
        var errors = this.checkForErrors();
        if (errors.length > 0) {
            this.setState({ errors: this.prepareErrors(errors) });
            console.log(errors);
        } else {
            console.log('axios.post');
        }
    },
    prepareErrors: function(errors) {
        var preparedErrors = [];
        errors.forEach(e => {
            preparedErrors.push(<ErrorWrapper message={e}/>);
        });
        return preparedErrors;
    },
    render: function() {
        return (
            <form>
                <div className="form-group">
                    ERRORS
                    {this.state.errors}
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control"
                        value={this.state.name}
                        onChange={this.handleChangeName}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control"
                        value={this.state.email}
                        onChange={this.handleChangeEmail}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-sm"
                        onClick={this.handleSubmit}>
                        Upload
                    </button>
                </div>
            </form>
        );
    }
});

module.exports = ContactForm;
