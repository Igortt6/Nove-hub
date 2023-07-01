// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


if (document.getElementById("myForm")) {
    const form = document.getElementById("myForm");
    form.addEventListener("submit", formSend);
    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        const formData = new FormData(form);
        if (error === 0) {
            form.classList.add("_sending");
            const url = "sendmessage.php";
            const response = await fetch(url, {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                form.reset();
                alert("Форма відправлена!");
                form.classList.remove("_sending");
                flsModules.popup.close("#popup");
            } else {
                alert("Ошибка");
                form.classList.remove("_sending");
                flsModules.popup.close("#popup");
            }
        }
    }
    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll("._required");
        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);
            if (input.classList.contains("_email")) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else if (input.value === "") {
                formAddError(input);
                error++;
            }
        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add("_error");
        input.classList.add("_error");
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
}