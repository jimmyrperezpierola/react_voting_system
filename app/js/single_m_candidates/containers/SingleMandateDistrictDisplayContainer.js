var React = require('react');
var axios = require('axios');
var SingleMandateDistrictDisplayComponent = require('../components/SingleMandateDistrictDisplayComponent');
//var CandidateCardComponent = require('../../components/CandidateCardComponent');

var SingleMandateDistrictDisplayContainer = React.createClass({
    getInitialState: function() {
        return ({ showCandidates: false });
    },
    prepareCandidates: function(showBoolean) {
        this.props.prepareCandidates(this.props.district.candidates, showBoolean, this.props.district.id);
        console.log("this.props.district.candidates");
        console.log(this.props.district.candidates);
        //console.log(this.props.district.candidates);
    },
    deleteActiveCandidates: function() {
        this.props.deleteCandidates(this.props.district.id);
    },
    toggleShowCandidates: function() {
        this.setState({ showCandidates: !this.state.showCandidates });
        this.prepareCandidates(!this.state.showCandidates);
    },
    render: function() {
        return (
            <SingleMandateDistrictDisplayComponent
                index={this.props.index}
                show={this.state.showCandidates}
                toggleShow={this.toggleShowCandidates}
                deleteCandidates={this.deleteActiveCandidates}
                districtInfo={this.props.district}
                upload={this.props.upload}
            />
        );
    }
});

module.exports = SingleMandateDistrictDisplayContainer;
