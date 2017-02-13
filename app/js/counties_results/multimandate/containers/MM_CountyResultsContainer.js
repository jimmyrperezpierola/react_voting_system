var React = require('react');
var axios = require('axios');
var MM_CountyResultsComponent = require('../components/MM_CountyResultsComponent');
var CandidateDisplayComponent = require('../../shared/CandidateDisplayComponent');
var MM_PartyDisplayComponent = require('../components/MM_PartyDisplayComponent');
var Validations = require('../../../utils/Validations');

var MM_CountyResultsContainer = React.createClass({
    getInitialState: function() {
        return ({ parties: [],
                  selfNominatedCandidates: [],
                  activeCountyId: undefined,
                  countiesReps: [],
                  dictionary: new Map(),
                  spoiled: undefined,
                  springErrors: [],
                  mergedResults: 0
                });
    },
    componentDidMount: function() {
        var _this = this;
        axios.get('http://localhost:8080/api/county-rep/')
            .then(function(resp) {
                _this.setState({ countiesReps: resp.data });
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    getParties: function(countyId) {
        var _this = this;
        var getUrl = "http://localhost:8080/api/party/";
        axios.get(getUrl)
            .then(function(resp) {
              var initialDictionary = _this.formInitialDictionary(resp.data);
                _this.setState({ parties: resp.data,
                                 dictionary: initialDictionary });
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    prepareParties: function() {
        var preparedParties = [];
        var parties = this.state.parties;

        parties.forEach((p, idx) => {
            preparedParties.push(
                <MM_PartyDisplayComponent
                    key={idx}
                    party={p}
                    mergeResults={this.mergeResults}
                />
            );
        });

        return preparedParties;
    },
    formInitialDictionary: function(parties) {
        var mapped = new Map();
        parties.forEach(p => {
            p.candidates.forEach(c => {
                mapped.set(c.id, undefined);
            });
        });
        return mapped;
    },
    clearActiveCounty: function() {
        this.setState({ activeCountyId: undefined, parties: [], mergedResults: 0 });
    },
    prepareRepresentativesSelection() {
        var representatives = [];
        var countiesReps = this.state.countiesReps;
        if (countiesReps.length > 0) {
            countiesReps.forEach((cr, idx) => {
                representatives.push(
                    <option
                        value={cr.county.id}
                        key={idx}
                        onClick={this.getParties}
                    >
                        {cr.firstName + " " + cr.lastName}
                    </option>
                );
            });
        }
        return (
            <select>
                <option
                    value={undefined}
                    onClick={this.clearActiveCounty} >
                    PASIRINKTI APYLINKĖS ATSTOVĄ
                </option>
                {representatives}
            </select>
        );
    },
    handleChangeSpoiled: function(e) {
        this.setState({ spoiled: e.target.value })
    },
    handleSubmitMMresults: function() {
        var _this = this;
        var map = this.state.dictionary;
        var candidatesVotes = [];
        for (var pair of map) {
            candidatesVotes.push({ "candidateId": pair[0], "votes": pair[1] });
        }
        var body = {
            "spoiledBallots": this.state.spoiled,
            "countyId": this.state.activeCountyId,
            "singleMandateSystem": false,
            "candidatesVotes": candidatesVotes
        }
        axios.post('http://localhost:8080/api/county-results/', body)
            .then(function(resp) {
                _this.setState({ springErrors: [],
                                 dictionary: new Map(),
                                 spoiled: undefined });
            })
            .catch(function(err) {
                console.log(err);
                _this.setState({ springErrors: err.response.data.errorsMessages });
            });
    },
    mergeResults: function(partyDictionary) {
        var actualDict = this.state.dictionary;
        partyDictionary.forEach(function(value, key) {
            actualDict.set(key, value);
        });
        var merged = this.state.mergedResults;
        merged += 1;
        this.setState({ dictionary: actualDict, mergedResults: merged, springErrors: [] });
    },
    prepareSpringErrors: function() {
        var style={"marginTop": 10}
        return Validations.prepareErrors(this.state.springErrors, style);
    },
    render: function() {
        return <MM_CountyResultsComponent
                  repsSelection={this.prepareRepresentativesSelection()}
                  parties={this.prepareParties()}
                  spoiled={this.state.spoiled}
                  dictionary={this.state.dictionary}
                  changeSpoiled={this.handleChangeSpoiled}
                  submitMMresults={this.handleSubmitMMresults}
                  springErrors={this.prepareSpringErrors()}
                  activeCountyId={this.state.activeCountyId}
                  mergedResults={this.state.mergedResults}
                  partiesCount={this.state.parties.length}
               />
    }
});

module.exports = MM_CountyResultsContainer;
