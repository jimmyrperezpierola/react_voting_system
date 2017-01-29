var React = require('react');
var NewCountyAsideForm = require('./NewCountyAsideForm');
var NewCountyInlineFormButton = require('./NewCountyInlineFormButton');

var  NewDistrictInlineForm = React.createClass({
    getInitialState: function() {
        return ({ showAsideForm: false, countyName: "", voterCount: undefined });
    },
    handleSwitchState() {
        this.setState({ showAsideForm: !this.state.showAsideForm });
    },
    handleCountyAdd(e) {
        var body = {
            name: this.state.countyName,
            voterCount: this.state.voterCount
        };
        this.setState({ showAsideForm: false, countyName: "", voterCount: undefined });
        this.props.addCounty(body);
    },
    handleNameChange: function(e) {
        this.setState({ countyName: e.target.value});
    },
    handleVoterCountChange: function(e) {
        this.setState({ voterCount: e.target.value});
    },
    render: function() {
        if (this.state.showAsideForm) {
            return <NewCountyAsideForm
                cancel={this.handleSwitchState}
                add={this.handleCountyAdd}
                changeName={this.handleNameChange}
                changeCount={this.handleVoterCountChange}
                name={this.state.countyName}
                count={this.state.voterCount}
            />
        } else {
            return <NewCountyInlineFormButton
                renderCountyForm={this.handleSwitchState}
            />
        }
    }
});

module.exports = NewDistrictInlineForm;
