var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var styles = {
		"active": {backgroundColor: '#006B96', color:"white"},
		"passive": {backgroundColor: '#CDEBF7', color:"#006B96"}
}

var AdminPanelComponent = React.createClass({
		getInitialState: function () {
				return ({
						tagIds: {
								teritoriniaiVienetai: styles.passive,
								apygarduKandidatai: styles.passive,
								apylinkiuAtstovai: styles.passive,
								politiniaiVienetai: styles.passive,
								apylinkiuRezultatai: styles.passive
						}
				});
	  },
		resetButtonBackgrounds: function() {
	      this.setState({
						tagIds: {
								teritoriniaiVienetai: styles.passive,
								apygarduKandidatai: styles.passive,
								apylinkiuAtstovai: styles.passive,
								politiniaiVienetai: styles.passive,
								apylinkiuRezultatai: styles.passive
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
		    if (nextProps.location.pathname === '/administravimas') {
						this.resetButtonBackgrounds();
		    }
				if (nextProps.location.pathname === '/administravimas/teritorinis-suskirstymas') {
						this.setBackgrounds(teritoriniaiVienetai);
		    }
		    if (nextProps.location.pathname === '/administravimas/apygardu-kandidatai') {
						this.setBackgrounds(apygarduKandidatai);
				}
				if (nextProps.location.pathname === '/administravimas/apylinkiu-atstovai') {
						this.setBackgrounds(apylinkiuAtstovai);
				}
		    if (nextProps.location.pathname === '/administravimas/politinis-suskirstymas') {
						this.setBackgrounds(politiniaiVienetai);
		    }
		    if (nextProps.location.pathname === '/administravimas/apylinkiu-rezultatai') {
						this.setBackgrounds(apylinkiuRezultatai);
		    }
	  },
	  render: function() {
	  		return (
						<div>
								<div className="menu">
										<ul className="nav nav-tabs" id="bootstrap-overrides-nav-tabs">
												<li className="tab">
														<Link
																to="administravimas/teritorinis-suskirstymas"
																className="adminPanelButton"
																id="teritoriniaiVienetai"
																style={this.state.tagIds.teritoriniaiVienetai}>
																Teritoriniai vienetai
														</Link>
												</li>
												<li className="tab">
														<Link
																to="administravimas/apygardu-kandidatai"
																className="adminPanelButton"
																id="apygarduKandidatai"
																style={this.state.tagIds.apygarduKandidatai}>
																Apygardų kandidatai
														</Link>
												</li>
												<li className="tab">
														<Link
																to="administravimas/apylinkiu-atstovai"
																className="adminPanelButton"
																id="apylinkiuAtstovai"
																style={this.state.tagIds.apylinkiuAtstovai}>
																Apylinkių atstovai
														</Link>
												</li>
												<li className="tab">
														<Link
																to="administravimas/politinis-suskirstymas"
																className="adminPanelButton"
																id="politiniaiVienetai"
																style={this.state.tagIds.politiniaiVienetai}>
																Politiniai vienetai
														</Link>
												</li>
												<li className="tab">
														<Link
																to="administravimas/apylinkiu-rezultatai"
																className="adminPanelButton"
																id="apylinkiuRezultatai"
																style={this.state.tagIds.apylinkiuRezultatai}>
																Apylinkių rezultatai
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

module.exports = AdminPanelComponent;
