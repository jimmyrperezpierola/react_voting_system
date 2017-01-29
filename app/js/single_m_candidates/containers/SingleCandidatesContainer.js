var React = require('react');
var axios = require('axios');
var SingleMandateDistrictDisplayContainer = require('./SingleMandateDistrictDisplayContainer');
var SingleCandidatesComponent = require('../components/SingleCandidatesComponent');

var SingleCandidatesContainer = React.createClass({
    getInitialState: function() {
        return ({ districts: [], activeCandidates: [], showCandidates: false, activeDistrictId: undefined });
    },
    componentDidMount: function() {
        var _this = this;
        axios.get('http://localhost:8080/api/district/')
            .then(function(resp) {
                _this.setState({ districts: resp.data });
                console.log(resp);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    prepareDistricts() {
        var districts = [];
        this.state.districts.forEach((d, index) => {
            districts.push(<SingleMandateDistrictDisplayContainer
                                key={index}
                                index={index}
                                district={d}
                                prepareCandidates={this.setActiveCandidates}
                                upload={this.handleCandidatesUpload}
                           />)
        });
        return districts;
    },
    setActiveCandidates: function(candidates, showBoolean, activeDistrictId) {
        this.setState({ activeCandidates: candidates, showCandidates: showBoolean, activeDistrictId: activeDistrictId });
    },
    handleCandidatesUpload: function(fd, districtId) {
        var _this = this;
        var uploadPath = "http://localhost:8080/api/district/" + districtId + "/candidates";
        axios.post(uploadPath, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(function(resp) {
                _this.setState({ activeCandidates: [], showCandidates: false, activeDistrictId: districtId });
                console.log(resp);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    render: function() {
        return <SingleCandidatesComponent
                  districts={this.prepareDistricts()}
                  activeCandidates={this.state.activeCandidates}
                  show={this.state.showCandidates}
                  activeDistrictId={this.state.activeDistrictId}
               />
    }
});

module.exports = SingleCandidatesContainer;
