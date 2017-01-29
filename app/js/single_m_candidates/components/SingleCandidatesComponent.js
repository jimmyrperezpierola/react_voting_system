var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

function SingleCandidatesComponent(props) {
    var candidates = [];
    if (props.activeDistrictId != undefined) {
        if (props.activeCandidates.length > 0 && props.show) {
            candidates = props.activeCandidates;
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 territorial-list-area">
                    <div className="list-group-item active">
                        <div className="party-link">
                            <Link>Apygardų sąrašas</Link>
                        </div>
                    </div>
                    <div className="list-group-item" style={{ height: 'auto' }}>
                        <div>
                            <table id="party_table">
                                {props.districts}
                            </table>
                        </div>
                    </div>
                    <div className="list-group-item">
                        <div className="card-group">
                            candidates
                            {candidates}
                        </div>
                    </div>
                </div>

                <div className="col-md-4 territorial-create-area">
                    <div className="col-md-10">

                    </div>
                </div>
            </div>
        </div>
    );
};

module.exports = SingleCandidatesComponent;
