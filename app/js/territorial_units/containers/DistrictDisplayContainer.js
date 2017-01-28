var React = require('react');
var DistrictDisplayComponent = require('../components/DistrictDisplayComponent');
var CountyDisplayComponent = require('../components/CountyDisplayComponent');
var NewCountyInlineForm = require('../components/tiny_components/NewCountyInlineForm');
var NewCountyInlineFormButton = require('../components/tiny_components/NewCountyInlineFormButton');

var DistrictDisplayContainer = React.createClass({
    getInitialState: function() {
        return ({ showCounties: false, showInlineForm: false, countyName: "", votersCount: undefined, counties: [] });
    },
    componentDidMount: function() {
        this.setState({ counties: this.props.district.counties });
    },
    toggleCountiesList: function() {
        this.setState({ showCounties: !this.state.showCounties });
    },
    prepareCounties: function() {
        var counties = [];
        this.state.counties.forEach((c, index) => {
            counties.push(<CountyDisplayComponent
                key={index}
                name={c.name}
            />);
        });
        counties.push(
            <div className="list-group-item">
                {this.toggleInlineForm()}
            </div>
        );
        return counties;
    },
    addCountyToState: function(nCounty) {
        var counties = this.state.counties;
        counties.push(nCounty);
        this.setState({ counties: counties });
    },
    toggleShowInlineState() {
        this.setState({ showInlineForm: !this.state.showInlineForm });
    },
    handleCountyCreate() {
        var _this = this;
        var body = {
            name: this.state.countyName,
            votersCount: this.state.votersCount,
            districtId: this.props.district.id
        };
        axios.post('api/counties', body)
            .then(function(resp) {
                _this.setState({ showInlineForm: false, countyName: "", votersCount: undefined });
                _this.addCountyToState(resp.data);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    handleNameChange: function(e) {
        this.setState({ countyName: e.target.value })
    },
    handleVotersCount: function(e) {
        this.setState({ votersCount: e.target.value })
    },
    handleDistrictDestroy(idx) {
        var _this = this;
        var deletePath = "api/districts/" + this.props.district.id + "";
        axios.delete(deletePath)
            .then(function(resp) {
                console.log("DELETED");
                console.log(idx);
                _this.props.delete(idx);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    toggleInlineForm() {
        if (this.state.showInlineForm) {
            return <NewCountyInlineForm
                cancel={this.toggleShowInlineState}
                submit={this.handleCountyCreate}
                changeName={this.handleNameChange}
                changeVotersCount={this.handleVotersCount}
                name={this.state.countyName}
                count={this.state.votersCount}
            />
        } else {
            return <NewCountyInlineFormButton
                renderCountyForm={this.toggleShowInlineState}
            />
        }
    },
    render: function() {
        return <DistrictDisplayComponent
                    name={this.props.district.name}
                    counties={this.prepareCounties()}
                    toggleCountiesList={this.toggleCountiesList}
                    show={this.state.showCounties}
                    delete={this.handleDistrictDestroy}
                    index={this.props.index}
               />
    }
});

module.exports = DistrictDisplayContainer;
