var React = require('react');
var Validations = require('../../utils/Validations');

var InlineCsvUploadForm = React.createClass({
    getInitialState: function() {
        return ({ jsErrors: [] });
    },
    upload: function() {
        var file = this.refs.fileCSV.files[0];

        var errors = Validations.validateCsv(file);
        if (errors.length > 0) {
            var style={ marginTop: 10 };
            this.setState({ jsErrors: Validations.prepareErrors(errors, style) });
        } else {
            var fd = new FormData();
            fd.append('file',file);
            this.props.upload(fd, this.props.associationId);
        }
    },
    render: function() {
        return (
            <div>
                <form id="inline-csv-form">
                    <div className="form-group browse-button-area">
                        <input type="file" ref="fileCSV" id="inputFile"/>
                    </div>
                    <div className="form-group upload-button-area">
                        <button type="submit" onClick={this.upload} className="btn btn-primary btn-sm">Siūsti</button>
                    </div>
                </form>
                <div id="inline-form-errors">
                    {this.state.jsErrors}
                </div>
            </div>
        )
    }
});

module.exports = InlineCsvUploadForm;
