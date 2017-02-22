var React = require('react');
var truncate = require('truncate');
var text = "Candidato aprasymas turi buti pakankamai ilgas kad galetu butis sutrumpiontas";
var styles = {"image": {width: 20, height: 20}}
var partyName;

function CandidateCardComponent(props) {
  partyName = (props.candidate.partyName == undefined) ? "Išsikėlęs pats" : props.candidate.partyName;
  return (
        <div className="well well-sm candidate-card">
                <div className="row candidate-card-low">
                    <div className="col-sm-8 col-md-12">
                        <h4>{props.candidate.firstName}&nbsp;{props.candidate.lastName}</h4>
                        <small><cite><img src="app/imgs/political_party.png" style={ styles.image }/>&nbsp; {partyName}</cite></small>
                        <p>
                            <img src="app/imgs/fingerprint.png" style={ styles.image }/>&nbsp; {props.candidate.personId}
                            <br />
                            <img src="app/imgs/books.png" style={ styles.image }/>&nbsp; {truncate(text, 50)}
                        </p>
                        <button type="button" className="btn btn-default btn-sm" style={{ marginBottom: 10 }}>Detaliau</button>
                    </div>
                </div>
            </div>
  );
}

module.exports = CandidateCardComponent;
