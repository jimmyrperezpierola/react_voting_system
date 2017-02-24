var React = require('react');
var Geosuggest = require('react-geosuggest').default;

var Tester = React.createClass({
    getInitialState: function() {
        return ({ address: "" });
    },
    onSuggestSelect: function(suggest) {
        this.setState({ address: suggest.label });
    },
    hideOtherSuggestions: function() {
        $('.geosuggest__suggests').hide();
    },
    clearSuggest: function() {
        this._geoSuggest.clear();
        this.setState({ address: "" });
    },
    render: function() {
        return (
            <div>
                <p>Address selected:</p>
                <p id="vardas">{this.state.address}</p>
                <hr />
                <br />

                <Geosuggest
                    ref={el=>this._geoSuggest=el}
                    placeholder="Start typing!"
                    className="class-name-GEO"
                    inputClassName="input-class-name-GEO"
                    country="lt"
                    queryDelay='500'
                    onSuggestSelect={this.onSuggestSelect}
                    onActiveSuggest={this.hideOtherSuggestions}
                />

                <button onClick={this.clearSuggest}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
            </div>
        );
    }
});

module.exports = Tester;
