var React = require('react');

function CountyDisplayComponent(props) {
    var display;
    if (!props.show) display = {display: 'none'};

    return (
        <div className="unit">
            <div className="list-group-item active">
                <div onClick={props.toggleShow} style={{ cursor: 'pointer' }}>
                    <strong>{props.county.name}</strong> (Apygarda: {props.county.districtName})
                </div>
            </div>
            <div style={ display }>
                <div className="list-group-item">
                    <button onClick={props.displaySM} className="btn btn-default btn-sm">1-MANDATINIAI</button>
                    <button onClick={props.displayMM} className="btn btn-default btn-sm">M-MANDATINIAI</button>
                </div>
                {props.results}
            </div>

        </div>
    );
}

module.exports = CountyDisplayComponent;
