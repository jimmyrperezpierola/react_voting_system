var React = require('react');

function CandidateCardComponent(props) {
  return (
    <div className="card">
      <div className="card-block">
        <h4 className="card-title">{props.candidate.firstName}&nbsp;{props.candidate.lastName}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{props.candidate.personId}</h6>
        <p className="card-text">CANDIDATO APRASYMAS</p>
        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  );
}

module.exports = CandidateCardComponent;
