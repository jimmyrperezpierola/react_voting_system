var React = require('react');

function NewCountyFormButton(props) {
    return (
        <div>
            <span onClick={props.renderCountyForm} style={{ cursor: 'pointer' }}><span className="glyphicon glyphicon-plus"></span> SUKURTI APYLINKĘ</span>
        </div>
    )
}

module.exports = NewCountyFormButton;
