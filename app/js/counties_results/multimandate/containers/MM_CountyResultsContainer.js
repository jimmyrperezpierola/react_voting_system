var React = require('react');
var axios = require('axios');
var MM_CountyResultsComponent = require('../components/MM_CountyResultsComponent');
var MM_CountyResultsDisplayComponent = require('../components/MM_CountyResultsDisplayComponent');
var CandidateDisplayComponent = require('../../shared/CandidateDisplayComponent');
var MM_PartyComponent = require('../components/MM_PartyComponent');
var MM_PartyDisplayWithResultsComponent = require('../components/MM_PartyDisplayWithResultsComponent');
var Validations = require('../../../utils/Validations');
var Helpers = require('../../../utils/Helpers');

var MM_CountyResultsContainer = React.createClass({
    getInitialState: function() {
        return ({ parties: [],
                  activeCountyId: undefined,
                  representative: {},
                  dictionary: new Map(),
                  spoiled: undefined,
                  springErrors: [],
                  MMresults: {}
                });
    },
    componentDidMount: function() {

        // refactor when login will be implemented

    },

    componentWillReceiveProps(newProps) {
        if (newProps.countyId !== null) {
            this.getMMresults(newProps);
        }
    },
    getMMresults: function(props) {
        console.log("GETTING RESULTS")
        var _this = this;
        var resultsUrl = "http://localhost:8080/api/county-results/" + props.countyId + "/multi-mandate";
        var partiesUrl = "http://localhost:8080/api/party/"
        axios
            .all([
                axios.get(resultsUrl),
                axios.get(partiesUrl)
            ])
            .then(axios.spread(function(results, parties) {
                var dictionary = _this.formDictionary(parties.data);
                _this.setState({ 
                    MMresults: results.data,
                    parties: parties.data,
                    dictionary: dictionary
                })
            }))
            .catch(function(err) {
                console.log(err);
            });
    },
    prepareParties: function() {
        var preparedParties = [];
        var parties = this.state.parties;

        parties.forEach((p, idx) => {
            preparedParties.push(
                <MM_PartyComponent
                    key={idx}
                    party={p}
                    changeVotes={this.handleChangeVotes}
                    votes={this.state.dictionary.get(p.id)}
                />
            );
        });

        return preparedParties;
    },
    preparePartiesWithResults: function() {
        var preparedParties = [];
        var parties = this.state.parties;
        var partiesVotesList = this.state.MMresults.unitVotesList;
        var pVotes = {};

        parties.forEach((p, idx) => {
            partiesVotesList.forEach(pv => {
                if (pv.party.id === p.id) pVotes = pv;
            });
            preparedParties.push(
                <MM_PartyDisplayWithResultsComponent
                    key={idx}
                    party={p}
                    pVotes={pVotes}
                />
            );
        });

        return preparedParties;
    },
    formDictionary: function(parties) {
        var mapped = new Map();
        parties.forEach(p => mapped.set(p.id, undefined));
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
    handleChangeVotes: function(party_id, votes) {
        var actualDict = this.state.dictionary;
        actualDict.set(party_id, votes);
        this.setState({ dictionary: actualDict });
    },
    handleSubmitMMresults: function() {
        var _this = this;
        var map = this.state.dictionary;
        var partiesVotes = [];
        for (var pair of map) partiesVotes.push({ "unitId": pair[0], "votes": pair[1] });
        var errors = [];
        var body = {
            "spoiledBallots": this.state.spoiled,
            "countyId": this.props.countyId,
            "singleMandateSystem": false,
            "unitVotes": partiesVotes
        }

        axios.post('http://localhost:8080/api/county-results/',
                    body,
                    { headers: { 'Content-Type': 'application/json' } }
            )
            .then(function(resp) {
                _this.setState({ springErrors: [],
                                 dictionary: new Map(),
                                 spoiled: undefined,
                                 MMresults: resp.data });
            })
            .catch(function(err) {
                console.log(err);
                errors.push(err.response.data.rootMessage);
                _this.setState({ springErrors: errors.concat(err.response.data.errorsMessages) });
            });
    },
    render: function() {
        var formOrResults;
        if (Object.keys(this.state.MMresults).length > 0) {
            formOrResults = <MM_CountyResultsDisplayComponent
                                representative={this.prepareRepresentative()}
                                spoiled={this.state.MMresults.spoiledBallots}
                                parties={this.preparePartiesWithResults()}
                                createdOn={Helpers.dateTimeFormatWithMessage(
                                              this.state.MMresults.createdOn,
                                              "Rezultatai pateikti"
                                          )}
                                confirmedOn={Helpers.dateTimeFormatWithMessage(
                                              this.state.MMresults.confirmedOn,
                                              "Rezultatai patvirtinti"
                                          )}
                            />
        } else if (this.state.parties.length > 0) {
            formOrResults = <MM_CountyResultsComponent
                                representative={this.prepareRepresentative()}
                                parties={this.prepareParties()}
                                spoiled={this.state.spoiled}
                                dictionary={this.state.dictionary}
                                changeSpoiled={this.handleChangeSpoiled}
                                submitMMresults={this.handleSubmitMMresults}
                                springErrors={this.state.springErrors}
                                activeCountyId={this.props.countyId}
                                clearForm={this.clearForm}
                            />
        } else {
            return <div></div>
        }
        return formOrResults;
    }
});

module.exports = MM_CountyResultsContainer;
