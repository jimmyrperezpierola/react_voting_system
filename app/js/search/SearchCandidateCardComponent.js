var React = require('react');
var truncate = require('truncate');
var text = "Candidato aprasymas turi buti pakankamai ilgas kad galetu butis sutrumpiontas";
var styles = {"image": {width: 20, height: 20}}
var partyName;

function SearchCandidateCardComponent(props) {
  partyName = (props.candidate.partyName == undefined) ? "Išsikėlęs pats" : props.candidate.partyName;
  return (
        <div className="well well-sm candidate-card-wide">
                <div className="row candidate-card-low">
                    <div className="col-sm-8 col-md-12">
                        <h4>
                            {props.candidate.firstName}&nbsp;{props.candidate.lastName}
                            <span
                                className="glyphicon glyphicon-remove-circle"
                                aria-hidden="true"
                                style={{ float: 'right', cursor: 'pointer' }}
                                onClick={props.hideDetails}>
                            </span>
                        </h4>
                        <small><img src="app/imgs/political_party.png" style={ styles.image }/>&nbsp; {partyName}</small>
                        <p>
                            <img src="app/imgs/fingerprint.png" style={ styles.image }/>&nbsp; {props.candidate.personId}
                            <br />
                            <img src="app/imgs/books.png" style={ styles.image }/>&nbsp; {text}
                        </p>
                        <br />
                        <p>
                            Užimta vieta vienmandačiuose - 10<br />
                            Išrinktas
                        </p>
                        <p>
                            Užimta vieta daugiamandačiuose - 10<br />
                            Neišrinktas
                        </p>
                    </div>
                </div>
            </div>
  );
}

module.exports = SearchCandidateCardComponent;
