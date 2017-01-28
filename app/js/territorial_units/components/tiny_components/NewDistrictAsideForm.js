function NewDistrictAsideForm(props) {
    return (
        <form>
            <div className="form-group">
                <label htmlFor="inputCounty">Partijos pavadinimas</label>
                <input type="text" className="form-control" id="inputCountyName" placeholder="Partijos pavadinimas"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputFile">(Nebūtina) Įkelti partijos sąrašą</label>
                <input type="file" id="inputFile"/>
            </div>
            <div className="county-form-actions">
                <button type="submit" onClick={props.create} className="btn btn-primary btn-lg">Sukurti</button>
            </div>
        </form>
    )
}

module.exports = NewDistrictAsideForm;
