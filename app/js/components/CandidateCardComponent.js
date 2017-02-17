var React = require('react');

function CandidateCardComponent(props) {
  return (
        <div className="well well-sm candidate-card">
                <div className="row candidate-card-low">

                    <div className="col-sm-6 col-md-8">
                        <h4>{props.candidate.firstName}&nbsp;{props.candidate.lastName}</h4>
                        <small><cite><i className="glyphicon glyphicon-flag"></i> PARTY NAME</cite></small>
                        <p>
                            <i className="glyphicon glyphicon-eye-open"></i> {props.candidate.personId}
                            <br />
                            <i className="glyphicon glyphicon-briefcase"></i> Kandidato aprasymas
                        </p>
                        <button type="button" className="btn btn-default btn-sm" style={{ marginBottom: 10 }}>Detaliau</button>
                    </div>
                </div>
            </div>
  );
}

module.exports = CandidateCardComponent;
