var React = require('react');

function CandidateCardComponent(props) {
  return (
    <div className="candidate card">
      <div className="col-md-12">
        <div className="card-block">
          <h4 className="card-title">{props.candidate.firstName}&nbsp;{props.candidate.lastName}</h4>
          <h6 className="card-subtitle mb-2 text-muted">{props.candidate.personId}</h6>
          <p className="card-text">CANDIDATO APRASYMAS</p>
          <p className="card-text"><small className="text-muted">Small text</small></p>
        </div>
      </div>
    </div>
  );
}

module.exports = CandidateCardComponent;
