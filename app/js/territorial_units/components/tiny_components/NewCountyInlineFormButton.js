function NewCountyInlineFormButton(props) {
    return (
        <div className="party-actions">
            <p onClick={props.renderCountyForm}><span className="glyphicon glyphicon-plus"></span> PRIDĖTI APYLINKĘ</p> &nbsp;
        </div>
    )
}

module.exports = NewCountyInlineFormButton;
