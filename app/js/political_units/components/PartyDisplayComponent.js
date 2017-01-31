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
      actions = <p onClick={deleteCandidates} className="remove-units-element" style={{ cursor: 'pointer' }}><span className="glyphicon glyphicon-remove-sign"></span> šalinti narius</p>
    } else {
      actions = <InlineCsvUploadForm upload={props.upload} associationId={props.partyInfo.id}/>
    }

    return (
        <div className="unit">
            <div className="list-group-item active">
                <div onClick={props.toggleShow} style={{ cursor: 'pointer' }}>
                    {props.partyInfo.name}
                </div>
            </div>
            <div className="list-group-item" style={ display }>
                {actions}
                <p onClick={del} style={{ cursor: 'pointer', paddingTop: 10 }}><span className="glyphicon glyphicon-remove-sign"></span> šalinti partiją</p>
            </div>
        </div>
    );
}

module.exports = PartyDisplayComponent;
