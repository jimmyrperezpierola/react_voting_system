var React = require('react');
var NewCountyAsideForm = require('./NewCountyAsideForm');
var NewCountyInlineFormButton = require('./NewCountyInlineFormButton');

var  NewDistrictInlineForm = React.createClass({
    getInitialState: function() {
        return ({ showAsideForm: false, countyName: "", votersCount: undefined });
    },
    handleSwitchState() {
        this.setState({ showAsideForm: !this.state.showAsideForm });
    },
    handleCountyAdd(e) {
        var body = {
            name: this.state.countyName,
            votersCount: this.state.votersCount
        };
        this.setState({ showAsideForm: false, countyName: "", votersCount: undefined });
        console.log("ADDED");
        this.props.addCounty(body);
    },
    handleNameChange: function(e) {
        this.setState({ countyName: e.target.value});
    },
    handleVotersCountChange: function(e) {
        this.setState({ votersCount: e.target.value});
    },
    render: function() {
        if (this.state.showAsideForm) {
            return <NewCountyAsideForm
                cancel={this.handleSwitchState}
                add={this.handleCountyAdd}
                changeName={this.handleNameChange}
                changeCount={this.handleVotersCountChange}
                name={this.state.countyName}
                count={this.state.votersCount}
            />
        } else {
            return <NewCountyInlineFormButton
                renderCountyForm={this.handleSwitchState}
            />
        }
    }
});

module.exports = NewDistrictInlineForm;
