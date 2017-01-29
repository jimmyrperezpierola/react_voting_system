var React = require('react');

function NewCountyInlineForm(props) {
    return (
        <div className="inline-add-county-form">
            <form>
                <div className="form-group">
                    <input type="text" onChange={props.changeName} className="form-control" value={props.name} placeholder="Apylinkės pavadinimas"/>
                </div>
                <div className="form-group">
                    <input type="number" onChange={props.changeVoterCount} className="form-control" value={props.count} placeholder="Apylinkės gyv. skaičius" min={1}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-xs" onClick={props.submit}>Sukurti</button>
                    <button className="btn btn-warning btn-xs" onClick={props.cancel}>Atšaukti</button>
                </div>
            </form>
        </div>
    )
};

module.exports = NewCountyInlineForm;
