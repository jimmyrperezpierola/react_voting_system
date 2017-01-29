var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var NewPartyAsideForm = require('./tiny_components/NewPartyAsideForm');
var InlineCsvUploadForm = require('../../components/tiny_components/InlineCsvUploadForm');

function PoliticalUnitsComponent(props) {
    var candidates = [];
    if (props.activePartyId != undefined) {
        if (props.activeCandidates.length > 0 && props.show) {
            candidates = props.activeCandidates;
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 territorial-list-area">
                    <div className="list-group">
                        <div className="list-group-item active">
                            <div className="party-link">
                                <Link>Partijų sąrašas</Link>
                            </div>
                        </div>
                        <div className="list-group-item" style={{ height: 'auto' }}>
                            <div>
                                <table id="party_table">
                                    {props.parties}
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
                </div>
                <div className="col-md-4 territorial-create-area">
                    <NewPartyAsideForm
                      create={props.create}
                      changeName={props.changeName}
                      name={props.name}
                    />
                </div>
            </div>
        </div>
    );
}

module.exports = PoliticalUnitsComponent;
