var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

function CountyDisplayComponent(props) {
    var del = function() { props.delete(props.index) };
    var edit = function() { };
    var popup = function() { $('.popoverCounty').popover({ trigger: "hover" }) };
    return (
        <div className="list-group-item">
            <p style={{ display: 'inline-block', width: '30%' }} id={"county-title-" + props.index}>
                <span className="glyphicon glyphicon-list-alt"></span>&nbsp;{props.county.name}
            </p>
            <p style={{ display: 'inline-block', width: '15%' }} id={"county-voters-count-" + props.index}>
                <span className="glyphicon glyphicon-user"></span>&nbsp;{props.county.voterCount}
            </p>
            <p style={{ display: 'inline-block', width: '40%' }} id={"county-address-" + props.index}>
                <span className="glyphicon glyphicon-map-marker"></span>&nbsp;{props.county.address}
            </p>
            <div className="unit-actions-area">
                <span className="glyphicon glyphicon-edit popoverCounty"
                    id={"edit-county-button-" + props.index}
                    style={{ cursor: 'pointer' }}
                    onClick={edit}
                    onMouseOver={popup}
                    data-content="Redaguoti"
                    rel="popover"
                    data-placement="top"
                    data-trigger="hover"
                >
                </span>
                <span className="glyphicon glyphicon-remove-sign popoverCounty"
                    id={"remove-county-button-" + props.index}
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
    );
};

module.exports = CountyDisplayComponent;
