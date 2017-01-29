var React = require('react');
var axios = require('axios');
var PoliticalUnitsComponent = require('../components/PoliticalUnitsComponent');
var PartyDisplayContainer = require('./PartyDisplayContainer');

var PoliticalUnitsContainer = React.createClass({
    getInitialState: function() {
        return ({ parties: [], partyName: "", activeCandidates: [], showCandidates: false, activePartyId: undefined });
    },
    componentDidMount: function() {
        var _this = this;
        axios.get('http://localhost:8080/api/party')
            .then(function(resp) {
                _this.setState({ parties: resp.data });
                console.log(resp);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    prepareParties() {
        var parties = this.state.parties;
        var preparedParties = [];
        parties.forEach((p, idx) => {
            preparedParties.push(
                <PartyDisplayContainer
                    key={idx}
                    index={idx}
                    partyInfo={p}
                    delete={this.handlePartyDestroy}
                    deleteActiveCandidates={this.deleteActiveCandidates}
                    prepareCandidates={this.setActiveCandidates}
                    upload={this.handleCandidatesUpload}
                />
            );
        });
        return preparedParties;
    },
    handleNameChange: function(e) {
        this.setState({ partyName: e.target.value });
    },
    handlePartySubmit: function(fd) {
        var body = {
            party: { name: this.state.partyName },
            file: fd.get("file")
        };
        var _this = this;

        var parties = this.state.parties;
        axios.post('http://localhost:8080/api/party', body, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(function(resp) {
                console.log(resp);
                parties.push(resp.data);
                _this.setState({ parties: parties, partyName: "" });

                // var uploadURL = "http://localhost:8080/api/party/" + resp.data.id + "/candidates";
                // axios.post(uploadURL, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                //     .then(function(resp) {
                //         parties.push(resp.data);
                //         _this.setState({ parties: parties, partyName: "" });
                //     })
                //     .catch(function(err) {
                //        console.log(err);
                //     });

            })
            .catch(function(err) {
                console.log(err);
            });
    },
    handleCandidatesUpload: function(fd, partyID) {
        var _this = this;
        var uploadPath = "http://localhost:8080/api/party/" + partyID + "/candidates";
        axios.post(uploadPath, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(function(resp) {
                _this.setState({ activeCandidates: [], showCandidates: false, activePartyId: partyID });
                console.log(resp);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    handlePartyDestroy(idx, party_id) {
        var _this = this;
        var deleteURL = "http://localhost:8080/api/party/" + party_id + "";
        axios.delete(deleteURL)
            .then(function(resp) {
                var parties = _this.state.parties;
                parties.splice(idx, 1);
                _this.setState({ parties: parties, activeCandidates: [], showCandidates: false });
            })
            .catch(function(err) {
               console.log(err);
            });

    },
    setActiveCandidates: function(candidates, showBoolean, activePartyId) {
        this.setState({ activeCandidates: candidates, showCandidates: showBoolean, activePartyId: activePartyId });
    },
    deleteActiveCandidates: function(party_id) {
        var _this = this;
        var deleteURL = "http://localhost:8080/api/party/" + party_id + "/candidates";
        axios.delete(deleteURL)
            .then(function(resp) {
                _this.setState({ activeCandidates: [], showCandidates: false, activePartyId: undefined });
                console.log("DELETED");
            })
            .catch(function(err) {
               console.log(err);
            });
    },
    render: function() {
        return <PoliticalUnitsComponent
                  parties={this.prepareParties()}
                  changeName={this.handleNameChange}
                  name={this.state.partyName}
                  create={this.handlePartySubmit}
                  activeCandidates={this.state.activeCandidates}
                  show={this.state.showCandidates}
                  upload={this.uploadStandaloneCsv}
                  activePartyId={this.state.activePartyId}
               />
    }
});

module.exports = PoliticalUnitsContainer;
