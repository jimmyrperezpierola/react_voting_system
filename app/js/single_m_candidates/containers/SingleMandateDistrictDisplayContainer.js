var React = require('react');
var axios = require('axios');
var SingleMandateDistrictDisplayComponent = require('../components/SingleMandateDistrictDisplayComponent');
var CandidateCardComponent = require('../../components/CandidateCardComponent');

var SingleMandateDistrictDisplayContainer = React.createClass({
    getInitialState: function() {
        return ({ showCandidates: false });
    },
    prepareCandidates(showBoolean) {
        var candidates = [];
        if (showBoolean) {
            this.props.district.candidates.forEach((c, index) => {
                candidates.push(
                    <CandidateCardComponent
                      key={index}
                      candidate={c}
                    />
                )
            });
        }
        this.props.prepareCandidates(candidates, showBoolean, this.props.district.id);
    },
    handleCandidatesDelete: function() {
        var _this = this;
        var deletePath = "http://localhost:8080/api/district/" + this.props.district.id + "/candidates"
        axios.delete(deletePath)
            .then(function(resp) {
                _this.props.prepareCandidates([], false, undefined);
                _this.setState({ showCandidates: false });
                console.log(resp);
            })
            .catch(function(err) {
                console.log(err);
            });
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
                districtInfo={this.props.district}
                deleteCandidates={this.handleCandidatesDelete}
                upload={this.props.upload}
            />
        );
    }
});

module.exports = SingleMandateDistrictDisplayContainer;
