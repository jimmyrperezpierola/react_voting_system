var React = require('react');

var InlineCsvUploadForm = React.createClass({
    upload: function() {
        var file = this.refs.fileCSV.files[0];
        var fd = new FormData();
        fd.append('file', file);
        this.props.upload(fd, this.props.associationId);
    },
    render: function() {
        return (
            <div className="inline-add-county-form">
                <form>
                    <div className="form-group">
                        <input type="file" ref="fileCSV" id="inputFile"/>
                    </div>
                    <div className="county-form-actions">
                        <button type="submit" onClick={this.upload} className="btn btn-primary btn-lg">Siūsti</button>
                    </div>
                </form>
            </div>
        )
    }
});

module.exports = InlineCsvUploadForm;
