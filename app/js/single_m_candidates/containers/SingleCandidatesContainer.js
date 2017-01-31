var React = require('react');
var axios = require('axios');
var SingleMandateDistrictDisplayContainer = require('./SingleMandateDistrictDisplayContainer');
var SingleCandidatesComponent = require('../components/SingleCandidatesComponent');
var CandidateCardComponent = require('../../components/CandidateCardComponent');

var SingleCandidatesContainer = React.createClass({
    getInitialState: function() {
        return ({ districts: [], activeCandidates: [], showCandidates: false, activeDistrictId: undefined });
    },
    componentDidMount: function() {
        var _this = this;
        axios.get('http://localhost:8080/api/district/')
            .then(function(resp) {
                _this.setState({ districts: resp.data });
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    prepareDistricts() {
      console.log("this.state candidates");
      console.log(this.state.activeCandidates);
        var districts = [];
        this.state.districts.forEach((d, index) => {
            districts.push(<SingleMandateDistrictDisplayContainer
                                key={index}
                                index={index}
                                district={d}
                                prepareCandidates={this.setActiveCandidates}
                                upload={this.handleCandidatesUpload}
                                deleteCandidates={this.deleteActiveCandidates}
                           />)
        });
        return districts;
    },
    setActiveCandidates: function(candidates, showBoolean, activeDistrictId) {
      var cand = []
      if (showBoolean) {
          candidates.forEach((c, index) => {
              cand.push(
                  <CandidateCardComponent
                    key={index}
                    candidate={c}
                  />
              )
          });
      }
      this.setState({ activeCandidates: cand, showCandidates: showBoolean, activeDistrictId: activeDistrictId });
    },
    deleteActiveCandidates: function(district_id) {
        var _this = this;
        var deletePath = "http://localhost:8080/api/district/" + district_id + "/candidates"
        axios.delete(deletePath)
            .then(function(resp) {
                _this.setActiveCandidates([], false, district_id);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    handleCandidatesUpload: function(fd, districtId) {
        var _this = this;
        var uploadPath = "http://localhost:8080/api/district/" + districtId + "/candidates";
        axios.post(uploadPath, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(function(resp) {
              _this.setActiveCandidates(resp.data.candidates, true, resp.data.id);
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
