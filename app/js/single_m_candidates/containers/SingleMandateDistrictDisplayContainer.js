var React = require('react');
var axios = require('axios');
var SingleMandateDistrictDisplayComponent = require('../components/SingleMandateDistrictDisplayComponent');
var CandidateCardComponent = require('../../components/CandidateCardComponent');

var SingleMandateDistrictDisplayContainer = React.createClass({
    getInitialState: function() {
        return ({ showCandidates: false,
                  springErrors: [],
                  district: this.props.district });
    },
    componentWillReceiveProps: function(newProps) {
        if (newProps.district != this.state.district) {
            this.setState({ district: newProps.district })
        }
    },
    prepareCandidates: function() {
        var cand = [];
        this.state.district.candidates.forEach((c, index) => {
            cand.push(
                  <CandidateCardComponent
                      key={index}
                      candidate={c}
                  />
            )
        });
        return cand;
    },
    uploadCandidates: function(fd, districtId) {
        var _this = this;
        var errors = [];
        var uploadPath = "http://localhost:8080/api/district/" + districtId + "/candidates";
        axios.post(uploadPath, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(function(resp) {
                _this.setState({ springErrors: [], district: resp.data });
            })
            .catch(function(err) {
                console.log(err);
                errors.push(err.response.data.rootMessage);
                _this.setState({ springErrors: errors.concat(err.response.data.errorsMessages) });
            });
    },
    deleteCandidates: function() {
        this.props.deleteCandidates(this.props.district.id);
    },
    toggleShowCandidates: function() {
        this.setState({ showCandidates: !this.state.showCandidates });
    },
    render: function() {
        return (
            <SingleMandateDistrictDisplayComponent
                index={this.props.index}
                show={this.state.showCandidates}
                toggleShow={this.toggleShowCandidates}
                deleteCandidates={this.deleteCandidates}
                district={this.state.district}
                upload={this.uploadCandidates}
                candidates={this.prepareCandidates()}
                springErrors={this.state.springErrors}
            />
        );
    }
});

module.exports = SingleMandateDistrictDisplayContainer;
