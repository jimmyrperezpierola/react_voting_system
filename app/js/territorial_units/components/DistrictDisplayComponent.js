var React = require('react');

function DistrictDisplayComponent(props) {
    var del = function() { props.delete(props.index) };
    var counties = (props.show) ? props.counties : [];
    var popup = function() { $('.popoverDistrict').popover({ trigger: "hover" }) };

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
                    >
                    </span>
                </div>
            </div>
            {counties}
        </div>
    );
};

module.exports = DistrictDisplayComponent;
