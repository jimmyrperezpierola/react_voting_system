var React = require('react');
var axios = require('axios');
var ReactTable = require('react-table').default;
var spring = require('../config//SpringConfig');
var Helper = require('../utils/Helper');

var CountySMresultsView = React.createClass({
    getInitialState() {
        return ({ collection: {} });
    },
    componentWillMount() {
        axios.get(
            spring.localHost
                .concat('/api/results/county/')
                .concat(this.props.currentUser.county.id + '')
                .concat('/single-mandate')
        )
            .then(function(resp) {
                this.setState({ collection: resp.data });
            }.bind(this))
            .catch(err => {
                console.log(err);
            });
    },
    prepareData() {

        if (Object.keys(this.state.collection).length == 0) return [];

        var rows = [];
        console.log(this.state.collection);
        console.log(this.state.collection.votes);

        this.state.collection.votes.forEach(v => {
            const candName = v.candidate.firstName.concat(' ').concat(v.candidate.lastName);
            const partyName = (v.candidate.party == null) ? 'Išsikėlęs pats' : v.candidate.party.name;
            const percFromValid = this.state.collection.validBallots * 1.0 / v.voteCount;
            const percFromAll = this.state.collection.totalBallots * 1.0 / v.voteCount;
            rows.push(
                {
                    candidate: candName,
                    partyName: partyName,
                    voteCount: v.voteCount
                }
            );
        });

        return rows;
    },
    getColumns() {
        return (
            [
                { header: 'Kandidatas', accessor: 'candidate', id: 1 },
                { header: 'Iškėlė', accessor: 'partyName', id: 2 },
                { header: 'Balsai', accessor: 'voteCount', id: 3 }
            ]
        );
    },
    render() {
        return (
            <div>
                <ReactTable
                    data={this.prepareData()}
                    columns={this.getColumns()}
                />
            </div>
        );
    }
});

module.exports = CountySMresultsView;