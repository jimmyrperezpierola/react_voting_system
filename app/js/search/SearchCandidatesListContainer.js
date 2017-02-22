var React = require('react');
var axios = require('axios');
var SearchCandidateComponent = require('./SearchCandidateComponent');

var SearchCandidatesListContainer = React.createClass({
    getInitialState() {
        return ({ candidates: [] });
    },
    componentDidMount() {
        var _this = this;
        axios.get()
             .then(resp => {
                _this.setState({ candidates: resp.data });
             })
             .catch(err => {
                console.log(err);
             });
    },
    prepareCandidates() {
        return this.state.candidates.map((c, idx) => {
            return (
                <SearchCandidateComponent
                    key={idx}
                    candidate={c}
                />
            );
        })
    },
    render() {
        return (
            "LIST OF CANDIDATES"
        )
    }
});

module.exports = SearchCandidatesListContainer;
