var React = require('react');

function AddedCountyDisplayComponent(props) {
    var remove = function() {
        props.remove((props.index));
    };
    console.log(props.county);
    return (
        <div style={{ padding: 3 }}>
            <p style={{ display: 'inline-block' }}>
                <span className="glyphicon glyphicon-map-marker"></span>&nbsp;{props.county.name}
            </p> &nbsp; &nbsp;
            <p style={{ display: 'inline-block' }}>
                <span className="glyphicon glyphicon-user"></span>&nbsp;{props.county.voterCount}
            </p>
            <span
                className="glyphicon glyphicon-remove-sign"
                style={{ paddingLeft: 10, cursor: 'pointer' }}
                onClick={remove}>
            </span>
        </div>
    )
}

module.exports = AddedCountyDisplayComponent;
