var React = require('react');

function AddedCountyDisplayComponent(props) {
    var remove = function() {
        props.remove((props.index));
    };
    return (
        <div style={{ paddingLeft: '0.5vw' }}>
            <p style={{ display: 'inline-block' }}>{props.name}</p><span className="glyphicon glyphicon-remove-sign" style={{ paddingLeft: 10 }} onClick={remove}></span>
        </div>
    )
}

module.exports = AddedCountyDisplayComponent;
