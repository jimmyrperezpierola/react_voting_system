var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var NewPartyAsideForm = require('./tiny_components/NewPartyAsideForm');

function PoliticalUnitsComponent(props) {
  return (
    <div className="container">
              <div className="row">
                  <div className="col-md-8 territorial-list-area">
                      <div className="list-group">
                          <div className="list-group-item active">
                              <div className="party-link">
                                  <Link to="#">Partijų sąrašas</Link>
                              </div>
                          </div>
                          <div className="list-group-item" style={{ height: 'auto' }}>
                              <div>
                                  <table id="party_table">
                                      {props.parties}
                                  </table>
                              </div>
                          </div>
                          <div className="list-group-item">
                              <div>
                                  PARTY MEMBERS LIST
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-4 territorial-create-area">
                      <NewPartyAsideForm create={props.create} />
                  </div>

              </div>
    </div>
      );
};

module.exports = PoliticalUnitsComponent;
