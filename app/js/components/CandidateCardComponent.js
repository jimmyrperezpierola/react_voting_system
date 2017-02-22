var React = require('react');
var truncate = require('truncate');
var CandidateDetails = require('../components/tiny_components/CandidateDetails');
var text = "Candidato aprasymas turi buti pakankamai ilgas kad galetu butis sutrumpiontas labai labai ilgas aprašymas labai labai ilgas aprašymas labai labai ilgas aprašymas labai labai ilgas aprašymas labai labai ilgas aprašymas labai labai ilgas aprašymas labai labai ilgas aprašymas labai labai ilgas aprašymas labai labai ilgas aprašymas labai labai ilgas aprašymas labai labai ilgas aprašymas labai labai ilgas aprašymas labai labai ilgas aprašymas labai labai ilgas aprašymas";
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
                        <CandidateDetails
                            firstName={props.candidate.firstName}
                            lastName={props.candidate.lastName}
                            partyName={partyName}
                            positionInPartyList={props.candidate.positionInPartyList}
                            personId={props.candidate.personId}
                            about={text}
                        />
                    </div>
                </div>
            </div>
  );
}

module.exports = CandidateCardComponent;
