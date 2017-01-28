var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var NewDistrictInlineForm = require('./tiny_components/NewDistrictInlineForm');

function TerritorialBreakdownComponent(props) {
    return (
	    <div className="container">
            <div className="row">
                <div className="col-md-8 territorial-list-area">
                    <div className="list-group">
                        {props.districts}
                    </div>
                </div>

                <div className="col-md-4 territorial-create-area">
                    <div className="col-md-10">
                        <form>
                            <div className="form-group">
                                <label htmlFor="inputDistrict">Apygardos pavadinimas</label>
                                <input type="text" className="form-control" id="inputDistrictName" value={props.name} onChange={props.changeName}/>
                            </div>
                            {props.counties}
                            <NewDistrictInlineForm addCounty={props.addCounty}/>
                            <button type="submit" className="btn btn-primary btn-lg" onClick={props.create}>Sukurti</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

module.exports = TerritorialBreakdownComponent;
