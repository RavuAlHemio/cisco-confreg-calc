module CiscoConfreg {
    function registerFromTwiddles(): void {
        let twiddles: NodeListOf<Element> = document.querySelectorAll(".ccrc-twiddle");
        let finalValue: number = 0;
        for (let i: number = 0; i < twiddles.length; i++) {
            let twiddle: Element = twiddles.item(i);
            if (twiddle.tagName.toLowerCase() === "select") {
                let selectTwiddle: HTMLSelectElement = <HTMLSelectElement>twiddle;
                let opts: HTMLCollectionOf<HTMLOptionElement> = selectTwiddle.selectedOptions;
                for (let j: number = 0; j < opts.length; j++) {
                    let valStr: string = opts.item(j).value;
                    let val: number = parseInt(valStr, 16);
                    // tslint:disable-next-line: no-bitwise
                    finalValue = finalValue | val;
                }
            } else if (twiddle.tagName.toLowerCase() === "input") {
                let inputTwiddle: HTMLInputElement = <HTMLInputElement>twiddle;
                if (inputTwiddle.type.toLowerCase() === "checkbox") {
                    if (inputTwiddle.checked) {
                        let valStr: string = inputTwiddle.value;
                        let val: number = parseInt(valStr, 16);
                        // tslint:disable-next-line: no-bitwise
                        finalValue = finalValue | val;
                    }
                }
            }
        }

        let confregElem: HTMLInputElement = <HTMLInputElement>document.getElementById("ccrc-confreg");
        confregElem.value = finalValue.toString(16);
    }

    function twiddlesFromRegister(): void {
        let confregElem: HTMLInputElement = <HTMLInputElement>document.getElementById("ccrc-confreg");
        let confregStr: string = confregElem.value;
        let confreg: number = 0;
        if (/^[0-9a-fA-F]{0,4}$/.test(confregStr)) {
            confreg = parseInt(confregStr, 16);
        }

        let twiddles: NodeListOf<Element> = document.querySelectorAll(".ccrc-twiddle");
        for (let i: number = 0; i < twiddles.length; i++) {
            let twiddle: Element = twiddles.item(i);
            if (twiddle.tagName.toLowerCase() === "select") {
                let selectTwiddle: HTMLSelectElement = <HTMLSelectElement>twiddle;
                let maskStr: string = selectTwiddle.getAttribute("data-mask");
                let mask: number = parseInt(maskStr, 16);
                // tslint:disable-next-line: no-bitwise
                let confregOpt: number = confreg & mask;

                let opts: HTMLCollectionOf<HTMLOptionElement> = selectTwiddle.options;
                for (let j: number = 0; j < opts.length; j++) {
                    // select the option where the masked value matches
                    let valStr: string = opts.item(j).value;
                    let val: number = parseInt(valStr, 16);

                    // tslint:disable-next-line: no-bitwise
                    opts.item(j).selected = (val === confregOpt);
                }
            } else if (twiddle.tagName.toLowerCase() === "input") {
                let inputTwiddle: HTMLInputElement = <HTMLInputElement>twiddle;
                if (inputTwiddle.type.toLowerCase() === "checkbox") {
                    let valStr: string = inputTwiddle.value;
                    let val: number = parseInt(valStr, 16);

                    // tslint:disable-next-line: no-bitwise
                    inputTwiddle.checked = ((confreg & val) !== 0);
                }
            }
        }
    }

    function domLoaded(): void {
        let twiddles: NodeListOf<Element> = document.querySelectorAll(".ccrc-twiddle");
        for (let i: number = 0; i < twiddles.length; i++) {
            (<HTMLInputElement>twiddles.item(i)).addEventListener("input", registerFromTwiddles);
        }

        document.getElementById("ccrc-confreg").addEventListener("input", twiddlesFromRegister);
    }

    export function init(): void {
        document.addEventListener("DOMContentLoaded", domLoaded);
    }
}
