var React = require('react');
var axios = require('axios');
var SearchCandidateComponent = require('./SearchCandidateComponent');
var SearchBarComponent = require('./SearchBarComponent');
var SearchCandidatesHeaderComponent = require('./SearchCandidatesHeaderComponent');

var SearchCandidatesListContainer = React.createClass({
    getInitialState: function() {
        return ({ candidates: [], query: "" });
    },
    componentDidMount: function() {
        var _this = this;
        axios.get('http://localhost:8080/api/candidate')
             .then(resp => {
                _this.setState({ candidates: resp.data });
             })
             .catch(err => {
                console.log(err);
             });
    },
    prepareCandidates: function() {
        var query = this.state.query.toLowerCase();
        var candidates = [];
        this.state.candidates.forEach((c, idx) => {
          console.log(c);

            var match = false;
            if (c.firstName.toLowerCase().includes(query)) match = true;
            else if (c.lastName.toLowerCase().includes(query)) match = true;
            else if (c.partyName != undefined) {
              if (c.partyName.toLowerCase().includes(query)) match = true;
            }

            if (match) {
                candidates.push(
                    <SearchCandidateComponent
                        key={idx}
                        candidate={c}
                    />
                );
            }
        });
        candidates.unshift(<SearchCandidatesHeaderComponent key={this.state.candidates.length}/>);
        return candidates;
    },
    handleChangeQuery: function(e) {
        this.setState({ query: e.target.value });
    },
    clearQuery: function() {
        this.setState({ query: "" });
    },
    render() {
        return (
            <div>
                <SearchBarComponent
                    query={this.state.query}
                    changeQuery={this.handleChangeQuery}
                    clearQuery={this.clearQuery}
                />
                {this.prepareCandidates()}
            </div>
        );
    }
});

module.exports = SearchCandidatesListContainer;
