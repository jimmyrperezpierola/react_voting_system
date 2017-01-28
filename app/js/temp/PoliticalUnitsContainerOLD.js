var Link = ReactRouter.Link;

var PoliticalUnitsContainer = React.createClass({
    getInitialState: function() {
        return ({ political_parties: [], candidates: [], ppName: "", refresh: false });
    },
    componentDidMount: function() {
        var _this = this;
        axios.get('api/political-parties')
            .then(function(resp) {
                _this.setState({ political_parties: resp.data });
                console.log(resp);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    handleNameChange: function(e) {
          this.setState
    },
    handlePPCreate: function() {
        var _this = this;
        var body = {
            name: this.state.ppName
        }
        axios.post('api/political-parties', body)
            .then(function(resp) {
                _this.setState({ refresh: !this.state.refresh });
                console.log(resp);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    render: function() {
		return <PoliticalUnitsComponent
                    create={this.handlePPCreate}
               />
    }
});

window.PoliticalUnitsContainer = PoliticalUnitsContainer;
