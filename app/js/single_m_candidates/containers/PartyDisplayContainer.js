var React = require('react');
var PartyDisplayComponent = require('../components/PartyDisplayComponent');

var PartyDisplayContainer = React.createClass({
    getInitialState: function() {
        return ({ showMembers: false, hoverState: false });
    },
    prepareMembers(showBoolean) {
        var members = [];
        if (showBoolean) {
            this.props.partyInfo.partyMembersList.forEach((c, index) => {
                members.push(
                    <div>{c.personalId}</div>
                )
            });
        }
        this.props.prepareMembers(members, !showBoolean, this.props.partyInfo.id);
    },
    toggleShowMembers: function() {
        this.setState({ showMembers: !this.state.showMembers });
        this.prepareMembers(!this.state.showMembers);
    },
    changeHoverState: function() {
        this.setState({ hoverState: !this.state.hoverState });
    },
    render: function() {
        return (
            <PartyDisplayComponent
                index={this.props.index}
                show={this.state.showMembers}
                toggleShow={this.toggleShowMembers}
                delete={this.props.delete}
                partyInfo={this.props.partyInfo}
                hover={this.changeHoverState}
                mouseOut={this.changeHoverState}
                hovered={this.state.hoverState}
            />
        );
    }
});

module.exports = PartyDisplayContainer;
