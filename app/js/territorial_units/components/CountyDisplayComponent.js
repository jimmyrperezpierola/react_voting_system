var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

function CountyDisplayComponent(props) {
    return (
        <div className="list-group-item">
            <div className="party-link">
                <Link to="">{props.name}</Link>
            </div>
            <div className="party-actions">
            </div>
        </div>
    );
};

module.exports = CountyDisplayComponent;
