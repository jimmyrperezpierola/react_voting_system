var React = require('react');
var InlineCsvUploadForm = require('../../components/tiny_components/InlineCsvUploadForm');

function SingleMandateDistrictDisplayComponent(props) {
    var display; var actions;
    if (!props.show) display = {display: 'none'};
    if (props.districtInfo.candidates.length > 0) {
        actions = <p onClick={props.deleteCandidates}><span className="glyphicon glyphicon-remove-sign"></span> ištrinti kandidatus</p>
    } else {
        actions = <InlineCsvUploadForm
                      upload={props.upload}
                      districtId={props.districtInfo.id}
                  />
    }
    return (
        <div>
            <div className="list-group-item active">
                <div onClick={props.toggleShow} className="party-link">
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
