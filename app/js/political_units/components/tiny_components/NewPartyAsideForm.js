var React = require('react');
var Validations = require('../../../utils/Validations');

var NewPartyAsideForm = React.createClass({
    getInitialState: function() {
        return ({ jsErrors: [], springErrors: [] });
    },
    componentWillReceiveProps: function(newProps) {
        if (newProps.springErrors != this.state.springErrors) {
            this.setState({ springErrors: newProps.springErrors })
        }
    },
    create: function(e) {
        e.preventDefault();
        var file = this.refs.fileCSV.files[0];
        var errors = Validations.checkErrorsPartyAsideForm(this.props.name, file);

        if (errors.length > 0) {
            this.setState({ jsErrors: errors });
        } else {
            var fd = new FormData();
            fd.append('file',file);
            this.refs.fileCSV.value = "";
            this.setState({ jsErrors: [] });
            this.props.create(fd);
        }
    },
    prepareSpringErrors: function() {
        console.log("SPRING PREPARE");
        return Validations.prepareSpringErrors(this.state.springErrors);
    },
    prepareJSerrors: function() {
        return Validations.prepareJSerrors(this.state.jsErrors, "Klaida registruojant partiją!");
    },
    render: function() {
        var springErrors = (this.props.springErrors.length > 0) ? this.prepareSpringErrors() : [];
        var jsErrors = (this.state.jsErrors.length > 0) ? this.prepareJSerrors() : [];
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="inputCounty">Partijos pavadinimas</label>
                        <input type="text" className="form-control" id="inputCountyName" onChange={this.props.changeName} value={this.props.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputFile">Įkelti partijos sąrašą</label>
                        <input ref="fileCSV" type="file" id="inputFile"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={this.create} className="btn btn-primary btn-md">Sukurti</button>
                    </div>
                </form>
                <div className="form-group errors-area">
                    {jsErrors}
                    {springErrors}
                </div>
            </div>
        )
    }
});

module.exports = NewPartyAsideForm;
