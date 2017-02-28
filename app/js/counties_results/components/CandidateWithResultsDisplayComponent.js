var React = require('react');
var styles = {
		"image": {width: 20, height: 20}
}

var CandidateWithResultsDisplayComponent = React.createClass({
    render: function() {
        var candidate = this.props.candidate
        var voteCount = this.props.voteCount
        var partyName = (candidate.partyName == undefined) ? "Išsikėlęs pats" : candidate.partyName;
        return (
            <div className="unit">
                  <div className="list-group-item">
                    <div>
                      <div style={{height: 20}}>
                        <div className="col-md-4">
                            <img src="app/imgs/boss.png" style={ styles.image }/> &nbsp;
                            {candidate.firstName} &nbsp; {candidate.lastName}
                        </div>
                        <div className="col-md-4">
                            <img src="app/imgs/political_party.png" style={ styles.image }/> &nbsp;
                            {partyName}
                        </div>
                        <div className="col-md-2" style={{ textAlign: 'right' }}><span>Balsai:</span></div>
                        <div className="col-md-2">{voteCount}</div>
                      </div>
                    </div>
                  </div>
            </div>
        );
    }
});

module.exports = CandidateWithResultsDisplayComponent;
