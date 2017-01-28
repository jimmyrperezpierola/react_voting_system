var React = require('react');
var PoliticalUnitsComponent = require('../components/PoliticalUnitsComponent');

var PoliticalUnitsContainer = React.createClass({
    getInitialState: function() {
        return ({ parties: [], partyName: "", candidates: [] });
    },
    componentDidMount: function() {
        var _this = this;
        axios.get('')
            .then(function(resp) {
                _this.setState({ parties: resp.data });
                console.log(resp);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    prepareParties() {
        var parties = [];
        this.state.parties.forEach((p, index) => {
            parties.push(<td>{p.name}</td>)
        });
        return parties;
    },
    prepareCandidates() {
        var candidates = [];
        this.state.candidates.forEach((c, index) => {
            candidates.push(
                <div>{c.personalId}</div>
            )
        });
        return candidates;
    },
    handleNameChange: function(e) {
        this.setState({ partyName: e.target.value });
    },
    handlePartySubmit: function(e) {
        var _this = this;
        var body = {
            //name: this.state.districtName,
            //counties: this.state.counties
        }
        var parties = this.state.parties;
        axios.post('', body)
            .then(function(resp) {
                console.log(resp);
                parties.push(resp.data);
                _this.setState({ parties: parties, partyName: "", candidates: [] });
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    handlePartyDestroy(idx) {
        var parties = this.state.parties;
        parties.splice(idx, 1);
        this.setState({ parties:  parties});
    },
    render: function() {
        return <PoliticalUnitsComponent
                  parties={this.prepareParties()}
                  delete={this.handlePartyDestroy}
                  changeName={this.handleNameChange}
                  name={this.state.partyName}
                  create={this.handlePartySubmit}
                  candidates={this.prepareCandidates()}
               />
    }
});

module.exports = PoliticalUnitsContainer;
