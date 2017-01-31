var React = require('react');
var InlineCsvUploadForm = require('../../components/tiny_components/InlineCsvUploadForm');

function SingleMandateDistrictDisplayComponent(props) {
    var display; var actions;
    if (!props.show) display = {display: 'none'};
    if (props.districtInfo.candidates.length > 0) {
        actions = <p onClick={props.deleteCandidates} className="remove-units-element" style={{ cursor: 'pointer' }}><span className="glyphicon glyphicon-remove-sign"></span> šalinti kandidatus</p>
    } else {
        actions = <InlineCsvUploadForm
                      upload={props.upload}
                      associationId={props.districtInfo.id}
                  />
    }
    return (
        <div className="unit">
            <div className="list-group-item active">
                <div onClick={props.toggleShow} style={{ cursor: 'pointer' }}>
                    {props.districtInfo.name}
                </div>
            </div>
            <div className="list-group-item" style={ display }>
                {actions}
            </div>
        </div>
    );
}

module.exports = SingleMandateDistrictDisplayComponent;
