var React = require('react');
var ConfirmAction = require('../../components/tiny_components/ConfirmAction');

function DistrictDisplayComponent(props) {
    var del = function() { props.delete(props.index) };
    var counties = []; var actions = [];
    var popup = function() { $('.popoverDistrict').popover({ trigger: "hover" }) };

<<<<<<< HEAD
    if (props.show) {
        counties = props.counties;
        actions = (
            <div>
                <div className="list-group-item">
                    <ConfirmAction
                        title="Ar tikrai norite pašalinti apygardą?"
                        body="Duomenų atstatymas neįmanomas."
                        onConfirm={props.delete}
=======
    return (
	     <div className="unit">
            <div className="list-group-item active" id="unit-header">
                <div className="unit-name-area"
                    onClick={props.toggleCountiesList}
                    style={{ cursor: 'pointer', width: '90%' }}>
                    {props.name}
                </div>
                <div className="unit-actions-area">
                    <span className="glyphicon glyphicon-remove-sign popoverDistrict"
                        id={"remove-district-button-" + props.index}
                        style={{ cursor: 'pointer', padding: '0px 15px 0px 15px' }}
                        onClick={del}
                        onMouseOver={popup}
                        data-content="Ištrinti"
                        rel="popover"
                        data-placement="top"
                        data-trigger="hover"
>>>>>>> refs/remotes/origin/master
                    >
                        <p className="remove-units-element" style={{ cursor: 'pointer' }}>
                            <span className="glyphicon glyphicon-remove-sign">
                            </span> &nbsp;
                            šalinti apygardą
                        </p>
                    </ConfirmAction>
                </div>
                <div className="list-group-item" style={{ textAlign: 'center' }}><strong>Apylinkės</strong></div>
            </div>
        );
    }

    return (
	     <div className="unit">
            <div className="list-group-item active" id="unit-header"
                onClick={props.toggleCountiesList}
                style={{ cursor: 'pointer' }}
            >
                <div className="unit-name-area">{props.name}</div>
            </div>
            {actions}
            {counties}
        </div>
    );
};

module.exports = DistrictDisplayComponent;
