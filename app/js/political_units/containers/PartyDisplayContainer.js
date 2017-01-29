var React = require('react');
var axios = require('axios');
var PartyDisplayComponent = require('../components/PartyDisplayComponent');
var CandidateCardComponent = require('../../components/CandidateCardComponent');

var PartyDisplayContainer = React.createClass({
    getInitialState: function() {
        return ({ showCandidates: false });
    },
    prepareCandidates(showBoolean) {
        var candidates = [];
        if (showBoolean) {
            this.props.partyInfo.candidates.forEach((c, index) => {
                candidates.push(
                    <CandidateCardComponent
                        key={index}
                        candidate={c}
                    />
                )
            });
        }
        this.props.prepareCandidates(candidates, showBoolean, this.props.partyInfo.id);
    },
    toggleShowCandidates: function() {
        this.setState({ showCandidates: !this.state.showCandidates });
        this.prepareCandidates(!this.state.showCandidates);
    },
    deleteActiveCandidates: function(party_id) {
        var _this = this;
        var deletePath = "http://localhost:8080/api/party/" + party_id + "/candidates";
        axios.delete(deletePath)
            .then(function(resp) {
                _this.props.prepareCandidates([], false, undefined);
                _this.setState({ showCandidates: false });
            })
            .catch(function(err) {
               console.log(err);
            });
    },
    handleCandidatesUpload: function(fd, partyId) {
        var _this = this;
        var uploadPath = "http://localhost:8080/api/party/" + partyId + "/candidates";
        axios.post(uploadPath, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(function(resp) {
                _this.setState({ activeCandidates: [], showCandidates: false, activePartyId: partyId });
                console.log(resp);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    render: function() {
        return (
            <PartyDisplayComponent
                index={this.props.index}
                show={this.state.showCandidates}
                toggleShow={this.toggleShowCandidates}
                delete={this.props.delete}
                deleteCandidates={this.deleteActiveCandidates}
                partyInfo={this.props.partyInfo}
                upload={this.props.upload}
            />
        );
    }
});

module.exports = PartyDisplayContainer;
