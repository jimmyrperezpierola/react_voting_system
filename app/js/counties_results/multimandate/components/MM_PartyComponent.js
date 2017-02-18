var React = require('react');
var CandidateDisplayComponent = require('../../shared/CandidateDisplayComponent');
var Validations = require('../../../utils/Validations');

var MM_PartyComponent = React.createClass({
    changeVotes: function(e) {
        this.props.changeVotes(this.props.party.id, e.target.value);
    },
    render: function() {
        return (
            <div className="unit">
                  <div className="list-group-item">
                    <div>
                      <div style={{height: "20px"}}>
                        <div className="col-md-7">{this.props.party.name}</div>
                        <div className="col-md-3">Balsų skaičius</div>
                        <div className="col-md-2">
                            <input
                                type="text"
                                className="form-control county-results-input"
                                onChange={this.changeVotes}
                                value={this.props.votes}
                            />
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
        );
    }
});

module.exports = MM_PartyComponent;
