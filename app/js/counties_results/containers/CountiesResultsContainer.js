var React = require('react');
var axios = require('axios');
var CountiesResultsComponent = require('../components/CountiesResultsComponent');
var CandidateDisplayComponent = require('../components/CandidateDisplayComponent');
var Validations = require('../../utils/Validations');

var CountiesResultsContainer = React.createClass({
    getInitialState: function() {
        return ({ candidates: [],
                  activeCountyId: undefined,
                  countiesReps: [],
                  dictionary: new Map(),
                  spoiled: undefined,
                  springErrors: [],
                  singleMandateEnv: undefined,
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
    getCandidates: function(countyId) {
        var _this = this;
        var getUrl = "http://localhost:8080/api/county/" + countyId + "/candidates";
        axios.get(getUrl)
            .then(function(resp) {
              var initialDictionary = _this.formInitialDictionary(resp.data);
                _this.setState({ candidates: resp.data,
                                 activeCountyId: countyId,
                                 dictionary: initialDictionary });
            })
            .catch(function(err) {
                console.log(err);
                console.log("NO SUCH COUNTY FOUND. CID - " + countyId);
            });
    },
    prepareCandidates() {
        var preparedCandidates = [];
        var candidates = this.state.candidates;
        var stateDictionary = this.state.dictionary;

        candidates.forEach((c, idx) => {
            preparedCandidates.push(
                <CandidateDisplayComponent
                    key={idx}
                    candidate={c}
                    changeVotes={this.handleChangeVotes}
                    votes={stateDictionary.get(c.id)}
                />
            );
        });

        return preparedCandidates;
    },
    formInitialDictionary: function(candidates) {
        var mapped = new Map();
        candidates.forEach(c => mapped.set(c.id, undefined));
        return mapped;
    },
    clearActiveCounty: function() {
        this.setState({ activeCountyId: undefined, candidates: [] });
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
                        onClick={this.getCandidates.bind(this, cr.county.id)}
                    >
                        {cr.firstName + " " + cr.lastName}
                    </option>
                );
            });
        }
        return (
            <select>
                <option value={undefined} onClick={this.clearActiveCounty}>PASIRINKTI APYLINKĖS ATSTOVĄ</option>
                {representatives}
            </select>
        );
    },
    handleChangeSpoiled: function(e) {
        this.setState({ spoiled: e.target.value })
    },
    handleChangeVotes: function(candidate_id, votes) {
        var actualDict = this.state.dictionary;
        actualDict.set(candidate_id, votes);
        this.setState({ dictionary: actualDict });
    },
    handleSubmitSMresults: function() {
        var _this = this;
        var map = this.state.dictionary;
        var candidatesVotes = [];
        for (var pair of map) {
            candidatesVotes.push({ "candidateId": pair[0], "votes": pair[1] });
        }
        var body = {
            "spoiledBallots": this.state.spoiled,
            "countyId": this.state.activeCountyId,
            "singleMandateSystem": true,
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
    handleSubmitMMresults: function() {
        // CODE NEEDED
        console.log("SUBMITTING MM RESULTS");
    },
    prepareSpringErrors: function() {
        var style={"marginTop": 10}
        return Validations.prepareErrors(this.state.springErrors, style);
    },
    showSM: function() {
        this.setState({ singleMandateEnv: true });
    },
    showMM: function() {
        this.setState({ singleMandateEnv: false });
    },
    render: function() {
        return <CountiesResultsComponent
                  repsSelection={this.prepareRepresentativesSelection()}
                  candidates={this.prepareCandidates()}
                  spoiled={this.state.spoiled}
                  dictionary={this.state.dictionary}
                  changeSpoiled={this.handleChangeSpoiled}
                  submitSMresults={this.handleSubmitSMresults}
                  submitMMresults={this.handleSubmitMMresults}
                  springErrors={this.prepareSpringErrors()}
                  activeCountyId={this.state.activeCountyId}
                  singleMandateEnv={this.state.singleMandateEnv}
                  showSM={this.showSM}
                  showMM={this.showMM}
               />
    }
});

module.exports = CountiesResultsContainer;
