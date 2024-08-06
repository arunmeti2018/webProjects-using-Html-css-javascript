
let string = "";
let input = document.querySelector("input");
const buttons = document.querySelectorAll("button");

function calculator() {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            try {
                if (e.target.innerHTML == '=') {
                    string = eval(string);
                    input.value = string;
                }
                else if (e.target.innerHTML == 'AC') {
                    string = "";
                    input.value = string;
                }
                else if (e.target.innerHTML == 'DEL') {
                    string = string.slice(0, - 1);
                    input.value = string;
                }
                else {
                    string += e.target.innerHTML;
                    // console.log(string)

                    input.value = string;
                }
            }
            catch (e) {
                alert("invalid input ");
            }
        })

    });

}
calculator();