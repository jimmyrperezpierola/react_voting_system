var React = require('react');
var SpoiledBallotsInputComponent = require('../tiny_components/SpoiledBallotsInputComponent');

function MM_ResultsFormComponent(props) {
    return (
        <form>
            <SpoiledBallotsInputComponent
                spoiled={props.spoiled}
                changeSpoiled={props.changeSpoiled}
            />
            <div className="list-group-item active">
                <span>Apylinkės kandidatų sąrašas (DAUGIAMANDAČIAI)</span>
            </div>
            <div className="list-group-item" style={{ height: 'auto' }}>
                //{props.candidates}
                REIKIA NUSTATYTI KAIP ATRODYS MM FORMA
            </div>
        </form>
    );
}

module.exports = MM_ResultsFormComponent;
