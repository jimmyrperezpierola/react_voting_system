function NewCountyAsideFormButton(props) {
    return (
        <div id="add-county">
            <button onClick={props.renderCountyForm} className="btn btn-default btn-sm">Pridėti apylinkę</button>
        </div>
    )
}

module.exports = NewCountyAsideFormButton;
