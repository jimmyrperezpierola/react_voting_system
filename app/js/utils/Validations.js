var React = require('react');
var ErrorWrapper = require('../components/tiny_components/ErrorWrapper');

var Validations = {
    checkErrorsPartyAsideForm: function(name, file) {
        var errors = [];

        if (name.length < Vars.min) errors.push(Errors.nameToShort);
        if (name.length > Vars.max) errors.push(Errors.nameToLong);
        if (!Vars.nameRegex.test(name)) errors.push(Errors.onlyAlphas);

        if (file == undefined) {
            errors.push(Errors.noFileError);
        } else {
            var extension = file.name.split(".").pop().toLowerCase();
            if (extension.localeCompare("csv") != 0) errors.push(Errors.csvOnly);
        }

        return errors;
    },
    checkErrorsDistrictAsideForm: function(name) {
        var errors = [];

        if (name.length < Vars.min) errors.push(Errors.nameToShort);
        if (name.length > Vars.max) errors.push(Errors.nameToLong);
        if (!Vars.nameRegex.test(name)) errors.push(Errors.onlyAlphas);

        return errors;
    },
    checkErrorsCountyForm: function(name, count) {
        var errors = [];

        if (name.length < Vars.min) errors.push(Errors.nameToShort);
        if (name.length > Vars.max) errors.push(Errors.nameToLong);
        if (!Vars.nameRegex.test(name)) errors.push(Errors.onlyAlphas);

        switch (true) {
            case (count == undefined):
              errors.push(Errors.popToLow + 0);
              break;
            case (count < 100):
              errors.push(Errors.popToLow + count);
              break;
            case (count > 3000000):
              errors.push(Errors.popToHigh + count);
              break;
        }

        return errors;
    },
    validateCsv: function(file) {
      var errors = [];

      if (file == undefined) {
          errors.push(Errors.noFileError);
      } else {
          var extension = file.name.split(".").pop().toLowerCase();
          if (extension.localeCompare("csv") != 0) errors.push(Errors.csvOnly);
      }

      return errors;
    },
    prepareErrors: function(errors, style) {
        var preparedErrors = [];
        errors.forEach((e, idx) => {
            preparedErrors.push(<ErrorWrapper message={e} key={idx} inlineStyle={style}/>);
        });
        return preparedErrors;
    },
};

var Vars = {
    nameRegex: new RegExp(/^[a-zA-Z]*$/),
    min: 3,
    max: 40
};

var Errors = {
    nameToShort: "Pavadinime ne mažiau " + Vars.min + " raidžių",
    nameToLong: "Pavadinime ne daugiau " + Vars.max + " raidžių",
    onlyAlphas: "Pavadinime tik raidės",
    popToLow: "Nerealiai mažai gyventojų - ",
    popToHigh: "Nerealiai daug gyventojų - ",
    noFileError: "Butina ikelti nariu sarasa",
    csvOnly: "Failas turi buti .csv"
};

module.exports = Validations;
