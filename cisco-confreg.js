"use strict";
var CiscoConfreg;
(function (CiscoConfreg) {
    function registerFromTwiddles() {
        var _a;
        var twiddles = document.querySelectorAll(".ccrc-twiddle");
        var finalValue = 0;
        for (var i = 0; i < twiddles.length; i++) {
            var twiddle = twiddles.item(i);
            if (twiddle.tagName.toLowerCase() === "select") {
                var selectTwiddle = twiddle;
                var opts = selectTwiddle.selectedOptions;
                for (var j = 0; j < opts.length; j++) {
                    var valStr = (_a = opts.item(j)) === null || _a === void 0 ? void 0 : _a.value;
                    if (valStr === undefined) {
                        continue;
                    }
                    var val = parseInt(valStr, 16);
                    // tslint:disable-next-line: no-bitwise
                    finalValue = finalValue | val;
                }
            }
            else if (twiddle.tagName.toLowerCase() === "input") {
                var inputTwiddle = twiddle;
                if (inputTwiddle.type.toLowerCase() === "checkbox") {
                    if (inputTwiddle.checked) {
                        var valStr = inputTwiddle.value;
                        var val = parseInt(valStr, 16);
                        // tslint:disable-next-line: no-bitwise
                        finalValue = finalValue | val;
                    }
                }
            }
        }
        var confregElem = document.getElementById("ccrc-confreg");
        confregElem.value = finalValue.toString(16);
    }
    function twiddlesFromRegister() {
        var confregElem = document.getElementById("ccrc-confreg");
        var confregStr = confregElem.value;
        var confreg = 0;
        if (/^[0-9a-fA-F]{0,4}$/.test(confregStr)) {
            confreg = parseInt(confregStr, 16);
        }
        var twiddles = document.querySelectorAll(".ccrc-twiddle");
        for (var i = 0; i < twiddles.length; i++) {
            var twiddle = twiddles.item(i);
            if (twiddle.tagName.toLowerCase() === "select") {
                var selectTwiddle = twiddle;
                var maskStr = selectTwiddle.getAttribute("data-mask");
                if (maskStr === null) {
                    continue;
                }
                var mask = parseInt(maskStr, 16);
                // tslint:disable-next-line: no-bitwise
                var confregOpt = confreg & mask;
                var opts = selectTwiddle.options;
                for (var j = 0; j < opts.length; j++) {
                    var option = opts.item(j);
                    if (option === null) {
                        continue;
                    }
                    // select the option where the masked value matches
                    var valStr = option.value;
                    var val = parseInt(valStr, 16);
                    option.selected = (val === confregOpt);
                }
            }
            else if (twiddle.tagName.toLowerCase() === "input") {
                var inputTwiddle = twiddle;
                if (inputTwiddle.type.toLowerCase() === "checkbox") {
                    var valStr = inputTwiddle.value;
                    var val = parseInt(valStr, 16);
                    // tslint:disable-next-line: no-bitwise
                    inputTwiddle.checked = ((confreg & val) !== 0);
                }
            }
        }
    }
    function domLoaded() {
        var twiddles = document.querySelectorAll(".ccrc-twiddle");
        for (var i = 0; i < twiddles.length; i++) {
            twiddles.item(i).addEventListener("input", registerFromTwiddles);
        }
        document.getElementById("ccrc-confreg").addEventListener("input", twiddlesFromRegister);
    }
    function init() {
        document.addEventListener("DOMContentLoaded", domLoaded);
    }
    CiscoConfreg.init = init;
})(CiscoConfreg || (CiscoConfreg = {}));
//# sourceMappingURL=cisco-confreg.js.map