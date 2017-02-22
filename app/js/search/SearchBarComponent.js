var React = require('react');

var SearchBarComponent = React.createClass({
    render: function() {
        return (
          <div className="row narrowed" style={{ margin: '10px 0px' }}>
              <div className="col-md-3">
                   <form>
                       <div className="input-group">
                           <input
                              className="form-control"
                              id="system-search"
                              placeholder="Ieškoti kandidato"
                              onChange={this.props.changeQuery}
                              value={this.props.query}
                           />
                           <span className="input-group-btn">
                               <button className="btn btn-default" onClick={this.props.clearQuery}>
                                  <i className="glyphicon glyphicon-remove-circle"></i>
                               </button>
                           </span>
                       </div>
                   </form>
               </div>
          </div>
        );
    }
});

module.exports = SearchBarComponent;
