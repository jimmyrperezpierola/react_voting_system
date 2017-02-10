var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var ReactDOM = require('react-dom');

var Application = require('./js/Application');
var HomePageContainer = require('./js/containers/HomePageContainer');
var AdminPanelComponent = require('./js/components/AdminPanelComponent');
var TerritorialBreakdownContainer = require('./js/territorial_units/containers/TerritorialBreakdownContainer');
var PoliticalUnitsContainer = require('./js/political_units/containers/PoliticalUnitsContainer');
var SingleCandidatesContainer = require('./js/single_m_candidates/containers/SingleCandidatesContainer');
var NoMatch = require('./js/config/NoMatch');
var CountyRepresentativesDisplayContainer = require('./js/territorial_units/containers/CountyRepresentativesDisplayContainer');

ReactDOM.render((
  <Router history={ReactRouter.hashHistory}>
    <Route path="/" component={Application}>
        <IndexRoute component={HomePageContainer}/>
        <Route path="administravimas" component={AdminPanelComponent}>
            <Route path="teritorinis-suskirstymas" component={TerritorialBreakdownContainer}/>
            <Route path="apygardu-kandidatai" component={SingleCandidatesContainer}/>
			      <Route path="apylinkiu-atstovai" component={CountyRepresentativesDisplayContainer}/>
			      <Route path="politinis-suskirstymas" component={PoliticalUnitsContainer}/>
        </Route>
        <Route path="*" component={NoMatch} />
    </Route>
  </Router>
), document.getElementById('root'));

/*
ReactDOM.render((
	<Router history={ReactRouter.hashHistory}>
		<Route path="/" component={Application}>
			<IndexRoute components={{pageName: HomePageComponent, content: ProductsListContainer}} />
			<Route path="products">
				<IndexRoute components={{pageName: ProductsPageComponent, content: ProductsListContainer}} />
				<Route path=":id" components={{pageName: ProductsPageComponent, content: ProductDetailsContainer}} />
			</Route>
			<Route path="admin">
				<IndexRoute components={{pageName: AdminPageComponent, content: AdminPanelContainer}} />
				<Route path="products/:id/edit" components={{pageName: AdminPageComponent, content: AdminProductEditContainer}} />
				<Route path="products/new" components={{pageName: AdminPageComponent, content: AdminProductNewContainer}} />
			</Route>
		</Route>
		<Route path="*" component={NoMatch} />
	</Router>
), document.getElementById('root'));*/
