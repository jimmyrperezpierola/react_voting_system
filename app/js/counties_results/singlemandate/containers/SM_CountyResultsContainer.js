var React = require('react');
var axios = require('axios');
var SM_CountyResultsComponent = require('../components/SM_CountyResultsComponent');
var SM_CountyResultsDisplayComponent = require('../components/SM_CountyResultsDisplayComponent');
var CandidateDisplayComponent = require('../../shared/CandidateDisplayComponent');
var CandidateWithResultsDisplayComponent = require('../../multimandate/components/CandidateWithResultsDisplayComponent');
var Validations = require('../../../utils/Validations');
var Helpers = require('../../../utils/Helpers');

var SM_CountyResultsContainer = React.createClass({
    getInitialState: function() {
        return ({ candidates: [],
                  activeCountyId: undefined,
                  representative: {},
                  dictionary: new Map(),
                  spoiled: "",
                  springErrors: [],
                  SMresults: {}
                });
    },
    componentDidMount: function() {

        // refactor when login will be implemented
        
    },
    componentWillReceiveProps(newProps) {
        if (newProps.countyId !== null) {
            this.getSMresults(newProps);
        }
    },
    getSMresults: function(props) {
        console.log("GETTING RESULTS")
        var _this = this;
        var resultsUrl = "http://localhost:8080/api/county-results/" + props.countyId + "/single-mandate";
        var candidatesUrl = "http://localhost:8080/api/district/" + props.districtId + "/candidates";
        axios
            .all([
                axios.get(resultsUrl),
                axios.get(candidatesUrl)
            ])
            .then(axios.spread(function(results, candidates) {
                var dictionary = _this.formDictionary(candidates.data);
                _this.setState({ 
                    SMresults: results.data,
                    candidates: candidates.data,
                    dictionary: dictionary
                })
            }))
            .catch(function(err) {
                console.log(err);
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
    prepareCandidatesWithResults: function() {
        console.log("PREPARING CANDIDATES")
        var preparedCandidates = [];
        var candidates = this.state.candidates;
        var candidatesVotesList = this.state.SMresults.unitVotesList;
        var cVotes = {};

        candidates.forEach((c, idx) => {
            candidatesVotesList.forEach(cv => {
                if (cv.candidate.id === c.id) cVotes = cv;
            });
            preparedCandidates.push(
                <CandidateWithResultsDisplayComponent
                    key={idx}
                    candidate={c}
                    cVotes={cVotes}
                />
            );
        });

        return preparedCandidates;
    },
    formDictionary: function(candidates) {
        var mapped = new Map();
        candidates.forEach(c => mapped.set(c.id, ""));
        return mapped;
    },
    clearForm: function() {
        var newDictionary = new Map();
        var tempDictionary = this.state.dictionary;
        tempDictionary.forEach(function(value, key) {
            newDictionary.set(key, "");
        });
        this.setState({ dictionary: newDictionary,
                        springErrors: [],
                        spoiled: "" });
    },
    prepareRepresentative() {
        return (
            <div>
                <div className="list-group-item active">
                    Prisijungęs kaip
                </div>
                <div className="list-group-item">
                    <img src="app/imgs/representative.png" style={{ width: 20, height: 20 }}/> &nbsp;
                    <span>{this.props.representative.firstName}</span> &nbsp;
                    <span>{this.props.representative.lastName}</span>
                </div>
            </div>
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
        for (var pair of map) candidatesVotes.push({ "unitId": pair[0], "votes": pair[1] });
        var errors = [];
        var body = {
            "spoiledBallots": this.state.spoiled,
            "countyId": this.props.countyId,
            "singleMandateSystem": true,
            "unitVotes": candidatesVotes
        }
        axios.post('http://localhost:8080/api/county-results/',
                    body,
                    { headers: { 'Content-Type': 'application/json' } }
              )
              .then(function(resp) {
                  _this.setState({ springErrors: [],
                                   dictionary: new Map(),
                                   spoiled: undefined,
                                   SMresults: resp.data });
              })
              .catch(function(err) {
                  console.log(err);
                  errors.push(err.response.data.rootMessage);
                  _this.setState({ springErrors: errors.concat(err.response.data.errorsMessages) });
              });
    },
    render: function() {
        var formOrResults;
        if (Object.keys(this.state.SMresults).length > 0) {
            console.log("PIRMAS")
            formOrResults = <SM_CountyResultsDisplayComponent
                                representative={this.prepareRepresentative()}
                                spoiled={this.state.SMresults.spoiledBallots}
                                candidates={this.prepareCandidatesWithResults()}
                                createdOn={Helpers.dateTimeFormatWithMessage(
                                              this.state.SMresults.createdOn,
                                              "Rezultatai pateikti"
                                          )}
                                confirmedOn={Helpers.dateTimeFormatWithMessage(
                                              this.state.SMresults.confirmedOn,
                                              "Rezultatai patvirtinti"
                                          )}
                            />
        } else if (this.state.candidates.length > 0) {
            console.log("ANTRAS")
            formOrResults = <SM_CountyResultsComponent
                                representative={this.prepareRepresentative()}
                                candidates={this.prepareCandidates()}
                                spoiled={this.state.spoiled}
                                dictionary={this.state.dictionary}
                                changeSpoiled={this.handleChangeSpoiled}
                                submitSMresults={this.handleSubmitSMresults}
                                springErrors={this.state.springErrors}
                                activeCountyId={this.props.countyId}
                                clearForm={this.clearForm}
                             />
        } else {
            console.log("TRECIAS")
            return <div></div>
        }
        return formOrResults;
    }
});

module.exports = SM_CountyResultsContainer;
