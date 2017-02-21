var React = require('react');
var MM_ResultsFormComponent = require('./MM_ResultsFormComponent');
var Validations = require('../../../utils/Validations');

var MM_CountyResultsComponent = React.createClass({
    getInitialState: function() {
        return ({ jsErrors: [] });
    },
    submitResults: function(e) {
        e.preventDefault();
        var errors = Validations.checkErrorsMMform(this.props.dictionary,
                                                   this.props.spoiled);
        if (errors.length > 0) {
            this.setState({ jsErrors: Validations.prepareJSerrors(errors, "Klaida rezultatuose") });
        } else {
            this.setState({ jsErrors: [] });
            this.props.submitMMresults();
        }
    },
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 units-list-area">
                        <MM_ResultsFormComponent
                            spoiled={this.props.spoiled}
                            changeSpoiled={this.props.changeSpoiled}
                            parties={this.props.parties}
                        />
                    </div>
                    <div className="col-md-4 units-create-area">
                        <div className="col-md-11">
                            {this.props.representative}
                            <button className="btn btn-primary btn-md" onClick={this.submitResults}>
                                SIŲSTI REZUS
                            </button>
                            {this.state.jsErrors}
                            {this.props.springErrors}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MM_CountyResultsComponent;
