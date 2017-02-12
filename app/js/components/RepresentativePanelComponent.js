var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var styles = {
		"active": {backgroundColor: '#006B96', color:"white"},
		"passive": {backgroundColor: '#CDEBF7', color:"#006B96"}
}

var RepresentativesPanelComponent = React.createClass({
		getInitialState: function () {
				return ({
						tagIds: {
								location1: styles.passive,
								location2: styles.passive,
								location3: styles.passive,
								location4: styles.passive,
								location5: styles.passive
						}
				});
	  },
		resetButtonBackgrounds: function() {
	      this.setState({
						tagIds: {
								location1: styles.passive,
								location2: styles.passive,
								location3: styles.passive,
								location4: styles.passive,
								location5: styles.passive
						}
				});
	  },
		setBackgrounds: function(tag) {
				var stateObj = this.state;
				var newState = {};

				Object.keys(stateObj.tagIds).forEach(key => {
						var value = (key === tag.id) ? styles.active : styles.passive;
						newState[key] = value;
				});
				this.setState({ tagIds: newState });
		},
	  componentWillReceiveProps: function(nextProps) {
		    if (nextProps.location.pathname === '/atstovui') {
						this.resetButtonBackgrounds();
		    }
				if (nextProps.location.pathname === '/atstovui/apylinkes-rezultatai') {
						this.setBackgrounds(location1);
		    }
		    // if (nextProps.location.pathname === '/administravimas/apygardu-kandidatai') {
				// 		this.setBackgrounds(location2);
				// }
				// if (nextProps.location.pathname === '/administravimas/apylinkiu-atstovai') {
				// 		this.setBackgrounds(location3);
				// }
		    // if (nextProps.location.pathname === '/administravimas/politinis-suskirstymas') {
				// 		this.setBackgrounds(location4);
		    // }
		    // if (nextProps.location.pathname === '/administravimas/apylinkiu-rezultatai') {
				// 		this.setBackgrounds(location5);
		    // }
	  },
	  render: function() {
	  		return (
						<div>
								<div className="menu">
										<ul className="nav nav-tabs" id="bootstrap-overrides-nav-tabs">
												<li className="tab">
														<Link
																to="atstovui/apylinkes-rezultatai"
																className="adminPanelButton"
																id="location1"
																style={this.state.tagIds.location1}>
																Apylinkes rezultatai
														</Link>
												</li>
												<li className="tab">
														<Link

																className="adminPanelButton"
																id="location2"
																style={this.state.tagIds.location2}>
																NO TITLE &nbsp; NO TITLE
														</Link>
												</li>
												<li className="tab">
														<Link

																className="adminPanelButton"
																id="location3"
																style={this.state.tagIds.location3}>
																NO TITLE &nbsp; NO TITLE
														</Link>
												</li>
												<li className="tab">
														<Link

																className="adminPanelButton"
																id="location4"
																style={this.state.tagIds.location4}>
																NO TITLE &nbsp; NO TITLE
														</Link>
												</li>
												<li className="tab">
														<Link
																to="atstovui/profilis"
																className="adminPanelButton"
																id="location5"
																style={this.state.tagIds.location5}>
																Atstovo profilis
														</Link>
												</li>
										</ul>
								</div>
								<div className="main-layout">
				            {this.props.children}
								</div>
						</div>
	      );
	  }
});

module.exports = RepresentativesPanelComponent;
