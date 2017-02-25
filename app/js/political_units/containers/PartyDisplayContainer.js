var React = require('react');
var axios = require('axios');
var PartyDisplayComponent = require('../components/PartyDisplayComponent');
var CandidateCardComponent = require('../../components/CandidateCardComponent');

var PartyDisplayContainer = React.createClass({
    getInitialState: function() {
        return ({ showCandidates: false,
                  springErrors: [],
                  party: this.props.party,
                  displayLoadingIcon: {display: "none"}
               });
    },
    componentWillReceiveProps: function(newProps) {
        if (newProps.party != this.state.party) {
            this.setState({ party: newProps.party })
        }
    },
    prepareCandidates: function() {
        var cand = [];
        if (this.state.showCandidates) {
            this.state.party.candidates.forEach((c, index) => {
                cand.push(
                      <CandidateCardComponent
                          key={index}
                          candidate={c}
                      />
                );
            });
        }
        return cand;
    },
    deleteCandidates: function() {
        this.props.deleteCandidates(this.state.party.id);
    },
    deleteParty: function(index, party_id) {
        this.toggleShowCandidates();
        this.props.delete(index, party_id);
    },
    toggleShowCandidates: function() {
        this.setState({ showCandidates: !this.state.showCandidates });
    },
    uploadCandidates: function(fd, partyID) {
        var _this = this;
        var errors = [];
        var uploadUrl = "http://localhost:8080/api/party/" + partyID + "/candidates";
        this.setState({displayLoadingIcon: {display: "inline"}});
        axios.post(uploadUrl, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(function(resp) {
                _this.setState({ springErrors: [], party: resp.data, displayLoadingIcon: {display: "none"} });
                _this.props.updateParties(resp.data);
            })
            .catch(function(err) {
                console.log(err);
                errors.push(err.response.data.rootMessage);
                _this.setState({ springErrors: errors.concat(err.response.data.errorsMessages) });
            });
    },
    render: function() {
        return (
            <PartyDisplayComponent
                index={this.props.index}
                show={this.state.showCandidates}
                toggleShow={this.toggleShowCandidates}
                delete={this.deleteParty}
                deleteCandidates={this.deleteCandidates}
                party={this.state.party}
                upload={this.uploadCandidates}
                candidates={this.prepareCandidates()}
                springErrors={this.state.springErrors}
                displayLoadingIcon={this.state.displayLoadingIcon}
            />
        );
    }
});

module.exports = PartyDisplayContainer;
