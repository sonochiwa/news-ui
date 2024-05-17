document.addEventListener("DOMContentLoaded", function () {
    const toggleClass = (buttonId, elementId, className) => {
        const button = document.getElementById(buttonId);
        const element = document.getElementById(elementId);

        button.addEventListener("click", () => {
            element.classList.toggle(className);
        });

        document.addEventListener("click", (event) => {
            if (!button.contains(event.target) && event.target !== element) {
                element.classList.remove(className);
            }
        });
    };

    toggleClass("btn1", "lng1", "language-active");
    toggleClass("btn2", "lng2", "language-active");
    toggleClass("button1", "language1", "language-active");
    toggleClass("button2", "language2", "language-active");

    const account = document.getElementById("account");
    const account1 = document.getElementById("account1");
    const close = document.getElementById("close");
    const auth = document.getElementById("auth");
    const over = document.getElementById("over");
    const fake = document.getElementById("real-fake");

    const toggleAuth = (accountButton) => {
        accountButton.addEventListener("click", () => {
            auth.classList.toggle("auth-window-active");
            over.classList.toggle("over-active");
            fake.classList.toggle("real-fake-active");
        });
    };

    const closeAuth = (closeButton) => {
        closeButton.addEventListener("click", () => {
            auth.classList.remove("auth-window-active");
            over.classList.remove("over-active");
            fake.classList.remove("real-fake-active");
        });
    };

    toggleAuth(account);
    toggleAuth(account1);
    closeAuth(close);

    const btn_reg = document.getElementById("btn-reg");
    const btn_auth = document.getElementById("btn-auth");
    const reg = document.getElementById("reg");
    const close_reg = document.getElementById("close-reg");

    btn_reg.addEventListener("click", () => {
        reg.classList.toggle("reg-window-active");
        auth.classList.remove("auth-window-active");
    });

    btn_auth.addEventListener("click", () => {
        auth.classList.toggle("auth-window-active");
        reg.classList.remove("reg-window-active");
    });

    close_reg.addEventListener("click", () => {
        reg.classList.remove("reg-window-active");
        over.classList.remove("over-active");
        fake.classList.remove("real-fake-active");
    });

    const updateTextContent = (buttonId, targetId, text) => {
        const button = document.getElementById(buttonId);
        const target = document.getElementById(targetId);

        button.addEventListener("click", () => {
            target.innerHTML = text;
        });
    };

    updateTextContent("ru-lan", "button-language", "Русский");
    updateTextContent("ru-cnt", "button-country", "Россия");
});

// const apiUrl = "http://92.124.138.138:7000/api/";
const apiUrl = "http://localhost:7000/api";

const fetchLanguages = async () => {
    const response = await fetch(`${apiUrl}/languages`);
    const languages = await response.json();

    // console.log(languages);

    const languagesList = document.getElementById("lng1");
    languagesList.innerHTML = "";

    languages.forEach((language) => {
        const listItem = document.createElement("tr");
        listItem.innerHTML = `<li><a href="#">${language.Name}</a></li>`;
        languagesList.appendChild(listItem);
    });
};

fetchLanguages();
