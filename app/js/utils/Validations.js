var React = require('react');
var ErrorWrapper = require('../components/tiny_components/ErrorWrapper');

var Vars = {
    nameRegex: new RegExp(/^([a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ0-9\s][^qQwWxX]*)$/),
    partyNameRegex: new RegExp(/^([a-zA-Z][^qQwWxX]*)$/),
    min: 3,
    max: 40
};

var Validations = {
    checkErrorsPartyAsideForm: function(name, file) {
        var errors = [];

        if (name.length < Vars.min) errors.push(Errors.nameToShort);
        if (name.length > Vars.max) errors.push(Errors.nameToLong);
        if (!Vars.partyNameRegex.test(name)) errors.push(Errors.onlyAlphas);

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

var Errors = {
    nameToShort: "REACT - Pavadinime ne mažiau " + Vars.min + " raidžių",
    nameToLong: "REACT - Pavadinime ne daugiau " + Vars.max + " raidžių",
    onlyAlphas: "REACT - Pavadinimas neatitinka formato",
    popToLow: "REACT - Nerealiai mažai gyventojų - ",
    popToHigh: "REACT - Nerealiai daug gyventojų - ",
    noFileError: "REACT - Butina ikelti nariu sarasa",
    csvOnly: "REACT - Failas turi buti .csv"
};

module.exports = Validations;
