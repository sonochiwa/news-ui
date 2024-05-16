document.addEventListener("DOMContentLoaded", function () {
    const btn1 = document.getElementById("btn1")
    const lng1 = document.getElementById("lng1")

    btn1.addEventListener("click", function () {
        lng1.classList.toggle("language-active")
    })
    document.addEventListener("click", function () {
        if (!btn1.contains(event.target) && event.target !== lng1) {
            lng1.classList.remove("language-active")
        }
    })

    const btn2 = document.getElementById("btn2")
    const lng2 = document.getElementById("lng2")

    btn2.addEventListener("click", function () {
        lng2.classList.toggle("language-active")
    })
    document.addEventListener("click", function () {
        if (!btn2.contains(event.target) && event.target !== lng2) {
            lng2.classList.remove("language-active")
        }
    })

    const button1 = document.getElementById("button1")
    const language1 = document.getElementById("language1")

    button1.addEventListener("click", function () {
        language1.classList.toggle("language-active")
    })
    document.addEventListener("click", function () {
        if (!button1.contains(event.target) && event.target !== language1) {
            language1.classList.remove("language-active")
        }
    })

    const button2 = document.getElementById("button2")
    const language2 = document.getElementById("language2")

    button2.addEventListener("click", function () {
        language2.classList.toggle("language-active")
    })
    document.addEventListener("click", function () {
        if (!button2.contains(event.target) && event.target !== language2) {
            language2.classList.remove("language-active")
        }
    })

    const account = document.getElementById("account")
    const account1 = document.getElementById("account1")
    const close = document.getElementById("close")
    const auth = document.getElementById("auth")
    const over = document.getElementById("over")


    account.addEventListener("click", function () {
        auth.classList.toggle("auth-window-active")
    })
    if (!account.contains(event.target) && event.target !== auth) {
        auth.classList.remove("auth-window-active")
    }
    close.addEventListener("click", function () {
        auth.classList.remove("auth-window-active")
    })

    account1.addEventListener("click", function () {
        auth.classList.toggle("auth-window-active")
    })
    if (!account1.contains(event.target) && event.target !== auth) {
        auth.classList.remove("auth-window-active")
    }
    account1.addEventListener("click", function () {
        over.classList.toggle("over-active")
    })

    account.addEventListener("click", function () {
        over.classList.toggle("over-active")
    })
    if (!account.contains(event.target) && event.target !== auth) {
        auth.classList.remove("auth-window-active")
    }
    close.addEventListener("click", function () {
        over.classList.remove("over-active")
    })

    const btn_reg = document.getElementById("btn-reg")
    const btn_auth = document.getElementById("btn-auth")
    const reg = document.getElementById("reg")
    const close_reg = document.getElementById("close-reg")

    btn_reg.addEventListener("click", function () {
        reg.classList.toggle("reg-window-active")
    })
    btn_reg.addEventListener("click", function () {
        auth.classList.remove("auth-window-active")
    })
    if (!btn_reg.contains(event.target) && event.target !== reg) {
        reg.classList.remove("reg-window-active")
    }
    close_reg.addEventListener("click", function () {
        reg.classList.remove("reg-window-active")
    })
    close_reg.addEventListener("click", function () {
        over.classList.remove("over-active")
    })

    btn_auth.addEventListener("click", function () {
        reg.classList.remove("reg-window-active")
    })
    btn_auth.addEventListener("click", function () {
        auth.classList.toggle("auth-window-active")
    })
    if (!btn_auth.contains(event.target) && event.target !== auth) {
        auth.classList.remove("auth-window-active")
    }
    close.addEventListener("click", function () {
        over.classList.remove("over-active")
    })

    var ru_lan = document.getElementById("ru-lan");
    var button_language = document.getElementById("button-language");
    var ru_cnt = document.getElementById("ru-cnt");
    var button_country = document.getElementById("button-country");

    ru_lan.addEventListener("click", function () {
        button_language.innerHTML = "Русский";
    });
    ru_cnt.addEventListener("click", function () {
        button_country.innerHTML = "Россия";
    });
})
