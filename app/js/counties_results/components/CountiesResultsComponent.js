var React = require('react');
//var ReactRouter = require('react-router');
var SpoiledBallotsInputComponent = require('../components/tiny_components/SpoiledBallotsInputComponent');
var SM_ResultsFormComponent = require('./tiny_components/SM_ResultsFormComponent');
var MM_ResultsFormComponent = require('./tiny_components/MM_ResultsFormComponent');
var Validations = require('../../utils/Validations');

var switchButtons;
var formSubmitAttributes;
var springErrors;

var CountiesResultsComponent = React.createClass({
    getInitialState: function() {
        return ({ jsErrors: [] });
    },
    submitResults: function() {
        var higherOrderSubmit;
        var errors = [];
        if (this.props.singleMandateEnv) {
            higherOrderSubmit = this.props.submitSMresults;
            errors = Validations.checkErrorsSMform(this.props.dictionary,
                                                   this.props.spoiled);
        } else {
            higherOrderSubmit = this.props.submitMMresults;
            errors = Validations.checkErrorsMMform();
        }

        if (errors.length > 0) {
            this.setState({ jsErrors: Validations.prepareErrors(errors) });
        } else {
            this.setState({ jsErrors: [] });
            higherOrderSubmit();
        }
    },
    backendErrors: function() {
        return Validations.prepareErrors(this.props.springErrors);
    },
    determineFormView: function() {
        var resultsForm;
        if (this.props.activeCountyId != undefined) {
            switchButtons = (
                <div>
                    <button className="btn btn-default btn-lg" onClick={this.props.showSM}>"1-MANDATIS"</button>
                    <button className="btn btn-default btn-lg" onClick={this.props.showMM}>"M-MANDATIS"</button>
                </div>
            );
            var singleM = this.props.singleMandateEnv;
            if (singleM != undefined) {
                formSubmitAttributes = (
                    <button className="btn btn-primary btn-md" onClick={this.submitResults}>
                        SIŲSTI REZUS
                    </button>
                );
                springErrors = this.props.springErrors;
                resultsForm = ((singleM) ?
                        <SM_ResultsFormComponent
                            spoiled={this.props.spoiled}
                            changeSpoiled={this.props.changeSpoiled}
                            candidates={this.props.candidates}
                        />
                        :
                        <MM_ResultsFormComponent
                        // spoiled={this.props.spoiled}
                        // changeSpoiled={this.props.changeSpoiled}
                        // candidates={this.props.candidates}
                        />
                );
            }
        }
        return resultsForm;
    },
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 units-list-area">
                        {this.determineFormView()}
                    </div>
                    <div className="col-md-4 units-create-area">
                        <div className="col-md-11">
                            {this.props.repsSelection}
                            {switchButtons}
                            {formSubmitAttributes}
                            {this.state.jsErrors}
                            {springErrors}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CountiesResultsComponent;
