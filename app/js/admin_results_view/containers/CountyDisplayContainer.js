var React = require('react');
var axios = require('axios');
var CountyDisplayComponent = require('../components/CountyDisplayComponent');
var AdminViewCandidateComponent = require('../components/tiny_components/AdminViewCandidateComponent');
var MM_PartyDisplayWithResultsComponent = require('../../counties_results/multimandate/components/MM_PartyDisplayWithResultsComponent');

var CountyDisplayContainer = React.createClass({
    getInitialState: function() {
        return ({ showResults: false,
                  smDisplay: undefined,
                  parties: [] });
    },
    componentDidMount: function() {
        var _this = this;
        axios.get('http://localhost:8080/api/party')
            .then(function(resp) {
                _this.setState({ parties: resp.data });
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    toggleShowResults: function() {
        this.setState({ showResults: !this.state.showResults });
    },
    displaySMresults: function() {
        this.setState({ smDisplay: true });
    },
    displayMMresults: function() {
        this.setState({ smDisplay: false });
    },
    getResults: function(county, singleMandate) {
        var results;
        county.countyResults.forEach(cr => {
            if (cr.singleMandateSystem == singleMandate) results = cr;
        });
        return results;
    },
    prepareSMresults: function() {
      var results = this.getResults(this.props.county, true);
      if (results == undefined) {
          return "REZULTATŲ NĖRA";
      }
      var preparedResults = [];

      preparedResults.push(
          <div className="list-group-item" key={results.candidateVotesList.length}>
              <p>Sugadinti biuleteniai: {results.spoiledBallots}</p>
          </div>
      );
      results.candidateVotesList.forEach((cv, idx) => {
          var partyName = (cv.candidate.partyName) ? cv.candidate.partyName : "Išsikėlęs pats";
          preparedResults.push(
              <AdminViewCandidateComponent
                  key={idx}
                  firstName={cv.candidate.firstName}
                  lastName={cv.candidate.lastName}
                  partyName={partyName}
                  votes={cv.votes}
              />
          );
      });
      return preparedResults;
    },
    prepareMMresults: function() {
        var results = this.getResults(this.props.county, false);
        if (results == undefined) {
            return "REZULTATŲ NĖRA";
        }
        var preparedResults = [];
        var parties = this.state.parties;

        // preparedResults.push(
        //     <div className="list-group-item" key={results.candidateVotesList.length}>
        //         <p>Sugadinti biuleteniai: {results.spoiledBallots}</p>
        //     </div>
        // );
        parties.forEach((p, idx) => {
            preparedResults.push(
                <MM_PartyDisplayWithResultsComponent
                    party={p}
                    results={results}
                />
            );
        });

        return (
            <div>
                <div className="list-group-item" key={results.candidateVotesList.length}>
                    <p>Sugadinti biuleteniai: {results.spoiledBallots}</p>
                </div>
                <div className="list-group-item">
                    {preparedResults}
                </div>
            </div>
        );
    },
    render: function() {
        var results;
        if (this.state.smDisplay == undefined) {
            results = "PASIRINKITE MANDATO TIPĄ";
        } else if (this.state.smDisplay) {
            results = this.prepareSMresults();
        } else {
            results = this.prepareMMresults();
        }
        return (
            <CountyDisplayComponent
                index={this.props.index}
                show={this.state.showResults}
                toggleShow={this.toggleShowResults}
                county={this.props.county}
                displaySM={this.displaySMresults}
                displayMM={this.displayMMresults}
                results={results}
            />
        );
    }
});

module.exports = CountyDisplayContainer;
