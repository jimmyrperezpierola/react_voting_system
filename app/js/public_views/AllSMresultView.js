var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var axios = require('axios');
var ReactTable = require('react-table').default;
var spring = require('../config/SpringConfig');
var Helper = require('../utils/Helper');

var hide = { display: 'none' };

var AllSMresultView = React.createClass({
    getInitialState() {
        return ({ collection: {} });
    },
    componentWillMount() {
        axios.get(spring.localHost.concat('/api/results/single-mandate/'))
            .then(function(resp) {
                this.setState({ collection: resp.data, districts: resp.data.length, counties });
                console.log(resp.data)
            }.bind(this))
            .catch(err => {
                console.log(err);
            });
    },
    prepareData() {
        if (Object.keys(this.state.collection).length == 0) return [];

        let totalCounties = 0;                          //visos apylinkes
        let totalConfirmedCounties = 0;                 //visos apylinkes atsiuntusios balsus
        let totalVoterCount = 0;                        //visi balsavimo teise turintys gyventojai
        let grandTotalBallots = 0;                      //visi dalyvave gyventojai
        let totalSpoiledBallots = 0;                    //visi sugadinti biuleteniai
        let totalValidBallots = 0;                      //visi galiojantys biuleteniai
        let totalPercentTotalVoters = 0.0;              //% nuo visu dalyvavusiu rinkeju
        let totalPercentSpoiledBallots = 0.0;           //% nuo visu sugadintu biuleteiniu
        let totalPercentValidBallots = 0.0;             //% nuo visu galiojanciu biuleteiniu
        let districts = this.state.collection.length;   //visos apygardos
        var rows = [];

        this.state.collection.forEach(d => {
            const percentTotalVoters = (d.totalBallots / (d.voterCount * 1.0) * 100).toFixed(2);
            const percentSpoiledBallots = (d.spoiledBallots / (d.totalBallots * 1.0) * 100).toFixed(2);
            const percentValidBallots = (d.validBallots / (d.totalBallots * 1.0) * 100).toFixed(2);

            totalCounties += d.totalCounties;
            totalConfirmedCounties += d.confirmedCountyResults;
            totalVoterCount += d.voterCount;
            grandTotalBallots += d.totalBallots;
            totalSpoiledBallots += d.spoiledBallots;
            totalValidBallots += d.validBallots;
            totalPercentTotalVoters += parseFloat(percentTotalVoters);
            totalPercentSpoiledBallots += parseFloat(percentSpoiledBallots);
            totalPercentValidBallots += parseFloat(percentValidBallots);

            rows.push(
                {
                    district: <Link to="">{d.name}</Link>,
                    counties: d.totalCounties,
                    confirmedCounties: d.confirmedCountyResults,
                    voterCount: d.voterCount,
                    totalVoters: d.totalBallots,
                    percentTotalVoters: percentTotalVoters,
                    spoiledBallots: d.spoiledBallots,
                    percentSpoiledBallots: percentSpoiledBallots,
                    validBallots: d.validBallots,
                    percentValidBallots: percentValidBallots
                }
            );
        });

        let sortedRows = Helper.sortSMresultDesc(rows);

        sortedRows.push(
            {
                district: <strong style={{ float: 'right', marginRight: 10 }}>Iš viso:</strong>,
                counties: <strong>{totalCounties}</strong>,
                confirmedCounties: <strong>{totalConfirmedCounties}</strong>,
                voterCount: <strong>{totalVoterCount}</strong>,
                totalVoters: <strong>{grandTotalBallots}</strong>,
                percentTotalVoters: <strong>{totalPercentTotalVoters}</strong>,
                spoiledBallots: <strong>{totalSpoiledBallots}</strong>,
                percentSpoiledBallots: <strong>{totalPercentSpoiledBallots}</strong>,
                validBallots: <strong>{totalValidBallots}</strong>,
                percentValidBallots: <strong>{totalPercentValidBallots}</strong>
            }
        );

        return rows;
    },
    getColumns() {
        return (
            [
                {
                    header: 'Apygarda',
                    accessor: 'district',
                    headerStyle: { fontWeight: 'bold' },
                    style: { marginLeft: 5 },
                    id: 1
                },
                {
                    header: 'Apylinkių',
                    accessor: 'counties',
                    headerStyle: { fontWeight: 'bold' },
                    style: { marginLeft: 5 },
                    id: 2
                },
                {
                    header: 'Pateikė rezultatus',
                    accessor: 'confirmedCounties',
                    headerStyle: { fontWeight: 'bold' },
                    style: { textAlign: 'center' },
                    id: 3
                },
                {
                    header: 'Rinkėjų skaičius',
                    accessor: 'voterCount',
                    headerStyle: { fontWeight: 'bold' },
                    style: { textAlign: 'center' },
                    id: 4
                },
                {
                    header: 'Dalyvavo',
                    accessor: 'totalVoters',
                    headerStyle: { fontWeight: 'bold' },
                    style: { textAlign: 'center' },
                    id: 5
                },
                {
                    header: '%',
                    accessor: 'percentTotalVoters',
                    headerStyle: { fontWeight: 'bold' },
                    style: { textAlign: 'center' },
                    id: 6
                },
                {
                    header: 'Negaliojantys biuleteniai',
                    accessor: 'spoiledBallots',
                    headerStyle: { fontWeight: 'bold' },
                    style: { textAlign: 'center' },
                    id: 7
                },
                {
                    header: '%',
                    accessor: 'percentSpoiledBallots',
                    headerStyle: { fontWeight: 'bold' },
                    style: { textAlign: 'center' },
                    id: 8
                },
                {
                    header: 'Galiojantys biuleteniai',
                    accessor: 'validBallots',
                    headerStyle: { fontWeight: 'bold' },
                    style: { textAlign: 'center' },
                    id: 9
                },
                {
                    header: '%',
                    accessor: 'percentValidBallots',
                    headerStyle: { fontWeight: 'bold' },
                    style: { textAlign: 'center' },
                    id: 10
                }
            ]
        );
    },
    getOptions() {
        const array = [5, 10, 20, 40];
        if (Object.keys(this.state.collection).length > 0) {
            const max = this.state.collection.votes.length + 1;
            array.push(max);
            return Array.from(new Set(array.filter(i => { return i <= max })));
        } else {
            return array;
        }
    },
    render() {
        return (
            <div>
                {/*<h4 className="h4-election">2017 m. kovo 16 d. Lietuvos Respublikos Seimo rinkimai</h4>
                <h3>Balsavimo rezultatai vienmandatėse apygardose</h3>
                <div className="row narrowed" style={{ margin: '30px 0px 30px 0px' }}>
                    <div className="col-md-4"></div>
                    <div className="col-md-5">
                        <p className="small-p">Apylinkių skaičius - <strong>{111}</strong></p>
                        <p className="small-p">Apygardų skaičius - <strong>{111}</strong></p>
                        <p className="small-p">Pagal gautus iš apylinkių duomenis:</p>
                        <p className="small-p indented">
                            rinkėjų sąraše įrašyta rinkėjų – <strong>{this.state.collection.voterCount}</strong>,
                            rinkimuose dalyvavo – <strong>{this.state.collection.totalBallots}&nbsp;
                            ({(this.state.collection.totalBallots / (this.state.collection.voterCount * 1.0) * 100).toFixed(2)} %)</strong>
                        </p>
                        <p className="small-p indented">
                            negaliojančių biuletenių – <strong>{this.state.collection.spoiledBallots}&nbsp;
                            ({(this.state.collection.spoiledBallots / (this.state.collection.totalBallots * 1.0) * 100).toFixed(2)} %)</strong>,
                            galiojančių biuletenių – <strong>{this.state.collection.validBallots}&nbsp;
                            ({(this.state.collection.validBallots / (this.state.collection.totalBallots * 1.0) * 100).toFixed(2)} %)</strong>
                        </p>
                    </div>
                    <div className="col-md-12">
                        <p className="centered-p">
                            Sąraše įrašytų ir rinkimuose dalyvavusių rinkėjų skaičiai skelbiami pagal duomenis
                            perdavusių rinkimų apylinkių protokolus.
                        </p>
                    </div>
                    <div className="col-md-12">
                        <h3>Balsavimo rezultatai apygardose</h3>
                    </div>
                </div>
                <ReactTable
                    data={this.prepareData()}
                    columns={this.getColumns()}
                    defaultPageSize={5}
                    pageSizeOptions={this.getOptions()}
                    showPageJump={false}
                    previousText='Ankstesnis'
                    nextText='Kitas'
                    loadingText='Kraunama...'
                    noDataText='Duomenų nėra'
                    pageText='Puslapis'
                    ofText='iš '
                    rowsText='eilučių'
                />*/}
            </div>
        );
    }
});

module.exports = AllSMresultView;