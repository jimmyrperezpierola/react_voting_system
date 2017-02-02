var React = require('react');
var ErrorWrapper = require('../components/tiny_components/ErrorWrapper');

var Validations = {
    checkErrorsPartyAsideForm: function(name, file) {
        var errors = [];
        var nameRegex = new RegExp(/^[a-zA-Z]*$/);

        if (name.length < 3) errors.push("Pavadinime ne mažiau 3 raidžių");
        if (name.length > 40) errors.push("Pavadinime ne daugiau 40 raidžių");
        if (!nameRegex.test(name)) errors.push("Pavadinime tik raidės");

        if (file == undefined) {
            errors.push("Butina ikelti nariu sarasa");
        } else {
            var extension = file.name.split(".").pop().toLowerCase();
            if (extension.localeCompare("csv") != 0) errors.push("Failas turi buti .csv");
        }

        return errors;
    },
    checkErrorsDistrictAsideForm: function(name) {
        var errors = [];
        var nameRegex = new RegExp(/^[a-zA-Z]*$/);

        if (name.length < 3) errors.push("Pavadinime ne mažiau 3 raidžių");
        if (name.length > 40) errors.push("Pavadinime ne daugiau 40 raidžių");
        if (!nameRegex.test(name)) errors.push("Pavadinime tik raidės");

        return errors;
    },
    checkErrorsCountyForm: function(name, count) {
        var errors = [];
        var nameRegex = new RegExp(/^[a-zA-Z]*$/);

        if (name.length < 3) errors.push("Pavadinime ne mažiau 3 raidžių");
        if (name.length > 40) errors.push("Pavadinime ne daugiau 40 raidžių");
        if (!nameRegex.test(name)) errors.push("Pavadinime tik raidės");

        switch (true) {
            case (count == undefined):
              errors.push("Nerealiai mažai gyventojų - 0");
              break;
            case (count < 100):
              errors.push("Nerealiai mažai gyventojų - " + count);
              break;
            case (count > 3000000):
              errors.push("Nerealiai daug gyventojų - " + count);
              break;
        }

        return errors;
    },
    validateCsv: function(file) {
      var errors = [];

      if (file == undefined) {
          errors.push("Butina ikelti nariu sarasa");
      } else {
          var extension = file.name.split(".").pop().toLowerCase();
          if (extension.localeCompare("csv") != 0) errors.push("Failas turi buti .csv");
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

module.exports = Validations;
