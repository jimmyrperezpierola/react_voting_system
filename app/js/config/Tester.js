var React = require('react');

var Tester = React.createClass({
    getInitialState: function() {
        return ({ name: "" });
    },
    renderEdit: function(e) {
        console.log(e);
    },
    render: function() {
        return (
            <div>
                <p id="vardas">Vardas</p>
                <button onClick={this.renderEdit}>Edit</button>
            </div>
        );
    }
});

module.exports = Tester;
