const numericInputs = document.querySelectorAll("[inputmode='numeric']");

numericInputs.forEach((e) => {
    validateInput(e);
})

function validateInput(input) {
    input.addEventListener("beforeinput", function (e) {
        let beforeValue =  input.value;
        e.target.addEventListener(
            "input",
            function () {
                if (input.validity.patternMismatch) {
                    input.value = beforeValue;
                }
            },
            { once : true}
        );
    });
}