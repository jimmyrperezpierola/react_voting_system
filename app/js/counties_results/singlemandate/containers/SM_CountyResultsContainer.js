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
        return ({ representative: undefined,
                  results: undefined,
                  candidates: undefined,
                  activeCountyId: undefined,
                  dictionary: new Map(),
                  spoiled: "",
                  springErrors: []
                });
    },
    componentDidMount: function() {

        // refactor when login will be implemented
        
    },
    componentWillReceiveProps(newProps) {
        console.log("NEWPROPS")
        if (newProps.countyId !== null) {
            this.getResultsOrCandidates(newProps);
        }
    },
    getResultsOrCandidates: function(props) {
        console.log("GETTING RESULTS")
        let _this = this
        const resultsUrl = "http://localhost:8080/api/results/county/" + props.countyId + "/single-mandate"
        axios
            .get(resultsUrl)
            .then(function(response) {
                console.log("RESULTS DATA")
                console.log(response.data)
                if (response.data) {
                    _this.setState({ results: response.data })
                } else {
                    _this.getCandidates(props)
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    getCandidates(props) {
        console.log("GETTING CANDIDATES")
        let _this = this
        const candidatesUrl = "http://localhost:8080/api/district/" + props.districtId + "/candidates";
        axios
            .get(candidatesUrl)
            .then(function(response) {
                _this.setState({ 
                    candidates: response.data,
                    dictionary: _this.formDictionary(response.data)
                })
            })
            .catch(function(err) {
                console.log(err)
            })
    },
    prepareCandidates() {
        console.log("PREPARING CANDIDATES")
        var dictionary = this.state.dictionary;
        let preparedCandidates = 
            this.state.candidates.map((candidate, idx) => {
                    return <CandidateDisplayComponent
                                key={idx}
                                candidate={candidate}
                                changeVotes={this.handleChangeVotes}
                                letes={dictionary.get(candidate.id)}
                            />
            });
        return preparedCandidates;
    },
    prepareCandidatesWithResults() {
        console.log("PREPARING RESULTS")
        return this.state.results.votes.map((vote, idx) => {
                    return <CandidateWithResultsDisplayComponent
                                key={idx}
                                candidate={vote.candidate}
                                voteCount={vote.voteCount}
                            />
                })
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
        e.preventDefault()
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
        axios.post('http://localhost:8080/api/results/county/single-mandate', body)
              .then(function(resp) {
                  _this.setState({ springErrors: [],
                                   dictionary: new Map(),
                                   spoiled: undefined,
                                   results: resp.data });
              })
              .catch(function(err) {
                  console.log(err);
                  errors.push(err.response.data.rootMessage);
                  _this.setState({ springErrors: errors.concat(err.response.data.errorsMessages) });
              });
    },
    render: function() {
        var formOrResults;
        if (this.state.results) {
            console.log("PIRMAS")
            formOrResults = <SM_CountyResultsDisplayComponent
                                representative={this.prepareRepresentative()}
                                spoiled={this.state.results.spoiledBallots}
                                candidates={this.prepareCandidatesWithResults()}
                                createdOn={Helpers.dateTimeFormatWithMessage(
                                              this.state.results.createdOn,
                                              "Rezultatai pateikti"
                                          )}
                                confirmedOn={Helpers.dateTimeFormatWithMessage(
                                              this.state.results.confirmedOn,
                                              "Rezultatai patvirtinti"
                                          )}
                            />
        } else if (this.state.candidates) {
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
