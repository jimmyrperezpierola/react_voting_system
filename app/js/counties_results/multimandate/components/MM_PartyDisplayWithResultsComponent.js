var React = require('react');
var CandidateWithResultsDisplayComponent = require('./CandidateWithResultsDisplayComponent');
var Validations = require('../../../utils/Validations');

var MM_PartyDisplayWithResultsComponent = React.createClass({
    render: function() {
        return (
          <div className="unit">
                <div className="list-group-item">
                  <div>
                    <div style={{height: "20px"}}>
                      <div className="col-md-7">{this.props.party.name}</div>
                      <div className="col-md-3">Balsų skaičius</div>
                      <div className="col-md-2">{this.props.pVotes.votes}</div>
                    </div>
                  </div>
                </div>
          </div>
        );
    }
});

module.exports = MM_PartyDisplayWithResultsComponent;
