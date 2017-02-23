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
                    <div className="col-sm-8 col-md-12" style={{backgroundColor: "white"}}>


                        <p>
                            <small><span><img src="app/imgs/SM_candidate.png" style={ styles.image } alt="candidate-icon"/>&nbsp;<b>Kandidatas:</b>&nbsp; <span style={{color:'#1c9312', fontWeight:"bold"}}>{props.candidate.firstName}&nbsp;{props.candidate.lastName}</span></span></small>

                            <span
                                className="glyphicon glyphicon-remove-circle"
                                aria-hidden="true"
                                style={{ float: 'right', cursor: 'pointer' }}
                                onClick={props.hideDetails}>
                            </span>
                        </p>
                        <p>
                            <small><img src="app/imgs/political_party.png" style={ styles.image }/>&nbsp;<b>Partija:</b>&nbsp; {partyName}</small>
                        </p>
                        <p>
                            <small><img src="app/imgs/fingerprint.png" style={ styles.image }/>&nbsp;<b>A/K:</b>&nbsp; {props.candidate.personId}</small>
                        </p>
                        <p>
                            <small><img src="app/imgs/books.png" style={ styles.image }/>&nbsp;<b>Apie:</b>&nbsp;  <b style={{color: "red"}}>/funkcionalumo nėra/</b> <br />{text}</small>
                        </p>
                        <br />
                        <p>
                            <small>
                                <b style={{color: "red"}}>/funkcionalumo nėra/</b><br />
                                Užimta vieta vienmandačiuose - 10<br />
                                <b>Išrinktas</b>
                            </small>
                        </p>
                        <p>
                            <small>
                                Užimta vieta daugiamandačiuose - 10<br />
                                <b>Neišrinktas</b>
                            </small>
                        </p>
                    </div>
                </div>
            </div>
  );
}

module.exports = SearchCandidateCardComponent;
