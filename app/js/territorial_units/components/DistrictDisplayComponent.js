var React = require('react');

function DistrictDisplayComponent(props) {
    var del = function() {
        props.delete(props.index);
    };
    var counties = (props.show) ? props.counties : [];
    var display = (props.showActions) ? {} : { display: 'none' };
    console.log(display);
    return (
	    <div>
            <div className="list-group-item active" onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut}>
                <div onClick={props.toggleCountiesList} className="party-link">
                    {props.name}
                </div>
                <div className="party-actions">
                    <p onClick={del} style={ display }><span className="glyphicon glyphicon-remove-sign"></span> šalinti</p>
                </div>
            </div>
            {counties}
        </div>
    );
};

module.exports = DistrictDisplayComponent;
