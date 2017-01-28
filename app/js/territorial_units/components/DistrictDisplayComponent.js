function DistrictDisplayComponent(props) {
    var del = function() {
        props.delete(props.index);
    };
    var counties = (props.show) ? props.counties : [];
    return (
	    <div>
            <div className="list-group-item active">
                <div onClick={props.toggleCountiesList} className="party-link">
                    {props.name}
                </div>
                <div className="party-actions">
                    <p onClick={del}><span className="glyphicon glyphicon-remove-sign"></span> šalinti</p>
                </div>
            </div>
            {counties}
        </div>
    );
};

module.exports = DistrictDisplayComponent;
