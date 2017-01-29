var React = require('react');
var InlineCsvUploadForm = require('../../components/tiny_components/InlineCsvUploadForm');

function PartyDisplayComponent(props) {
    var del = function() {
        props.delete(props.index, props.partyInfo.id);
    };
    var deleteCandidates = function() {
        props.deleteCandidates(props.partyInfo.id);
    };

    var display;
    if (!props.show) display = {display: 'none'};

    var actions;
    if (props.partyInfo.candidates.length > 0) {
      actions = <p onClick={deleteCandidates}><span className="glyphicon glyphicon-remove-sign"></span> šalinti kandidatus</p>
    } else {
      actions = <InlineCsvUploadForm upload={props.upload} associationId={props.partyInfo.id}/>
    }

    return (
        <div>
            <div className="list-group-item active">
                <div onClick={props.toggleShow} className="party-link">
                    {props.partyInfo.name}
                </div>
            </div>
            <div className="list-group-item" style={ display }>
                {actions}
                <p onClick={del}><span className="glyphicon glyphicon-remove-sign"></span> šalinti partiją</p>
            </div>
        </div>
    );
}

module.exports = PartyDisplayComponent;
