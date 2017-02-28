var React = require('react');
var RepresentativeCardComponent = require('./RepresentativeCardComponent');

var ResultsDisplayComponent = React.createClass({
    render: function() {
        console.log("RESULTS DISPLAY COMPONENT")
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 units-list-area">
                        <div className="list-group-item active">
                            <span>{this.props.header}</span>
                        </div>
                        <div className="list-group-item">
                            <p className="county-results">
                                Sugadintų biuletinių skaičius: &nbsp; {this.props.spoiled}
                            </p>
                        </div>
                        <div className="list-group-item" style={{ height: 'auto' }}>
                            {this.props.results}
                        </div>
                    </div>
                    <div className="col-md-4 units-create-area">
                        <div className="col-md-11">
                            <RepresentativeCardComponent representative={this.props.representative} />
                            {this.props.createdOn}
                            {this.props.confirmedOn}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ResultsDisplayComponent;
