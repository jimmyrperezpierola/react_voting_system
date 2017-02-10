var React = require('react');

var CandidateDisplayComponent = React.createClass({
    //var partyName = (this.props.candidate.partyName == undefined) ? "Išsikėlęs pats" : this.props.candidate.partyName,
    changeVotes: function(e) {
        this.props.changeVotes(this.props.candidate.id, e.target.value);
    },
    render: function() {
        return (
            <div className="unit">
                  <div className="list-group-item">
                    <div>
                      <div style={{height: "20px"}}>
                        <div className="col-md-4">{this.props.candidate.firstName} &nbsp; {this.props.candidate.lastName}</div>
                        <div className="col-md-3">{this.props.candidate.partyName}</div>
                        <div className="col-md-3">Balsų skaičius</div>
                        <div className="col-md-2"><input type="text" className="form-control county-results-input" onChange={this.changeVotes} value={this.props.votes}/></div>
                      </div>
                    </div>
                  </div>
            </div>
        );
    }
});

module.exports = CandidateDisplayComponent;
