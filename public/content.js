// тут ip сервера подставляется вручную 😀
const URL =%REACT_APP_BASE_URL %;
/*

 */
// "matches" из манифеста не работает на hh.ru
// при переходе между страницами chrome не проверяет соответствие этим  vvvv  шаблонам
// "https://*.hh.ru/applicant/resumes/view?resume=*", "https://*.hh.ru/resume/*"
// поэтому оставил <all_urls>
// в итоге требуется перезагрузка страницы, чтобы перепроверить соответствие url шаблону
// возможно решением будет использование background скрипта
function isOnHeadHunter() {
    const pathes = [
        new RegExp("^https:\\/\\/.*\\.hh\\.ru\\/applicant\\/resumes\\/view\\?resume=.*$"),
        new RegExp("^https:\\/\\/.*\\.hh\\.ru\\/resume\\/.*$")
    ]
    // return pathes.some(document.location.href.match)
    for (const path of pathes)
        if (document.location.href.match(path))
            return true;
    return false;
}

const buttonId = 'hh-ts-extension-href-button-12412412442'

function makeButton() {
    const button = document.createElement('a');
    button.id = buttonId;
    button.target = '_blank';
    button.role = 'button';
    button.href = `${URL}/resume-create?link=${document.location.href}`;
    button.innerText = 'Добавить резюме';
    button.classList.add('mbutton');
    document.body.appendChild(button);
}

function refreshButton() {
    console.log(document.location.href);
    if (isOnHeadHunter()) {
        makeButton();
    } else {
        document.getElementById(buttonId)?.remove();
    }
}

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req === 'refresh') {
        refreshButton();
        console.log('got refresh')
        return;
    }
    console.log('got parse')
    const form = parseForm();
    console.log("parsed: " + JSON.stringify(form))
    sendResponse(form);
})

// makeButton();
refreshButton();
// browser.webNavigation.onHistoryStateUpdated.addListener(() => refreshButton());
// window.onpopstate = () => refreshButton();
// window.history.pushState = new Proxy(window.history.pushState, {
//     apply: (target, thisArg, argArray) => {
//         refreshButton();
//         return target.apply(thisArg, argArray);
//     },
// });

// chrome.tabs.onUpdated.addListener(() => refreshButton());

function parseForm() {
    const parser = new Parser();
    const info = parser.getInfo();
    return {id: null, link: document.location.href, ...info}
}

class Parser {
    #document;
    #info_fields;

    constructor() {
        this.#document = document;
        this.#info_fields = [
            {name: "fullname", method: () => this.#getName()},
            {name: "phone", method: () => this.#getPhone()},
            {name: "email", method: () => this.#getEmail()},
            {name: "education", method: () => this.#getEducation()},
            {name: "experience", method: () => this.#getExperience()},
            // {name: "age", method: () => this.#getAge()},
            // {name: "city", method: () => this.#getCity()}
        ]
    }

    getInfo() {
        const info = {}
        for (const field of this.#info_fields) {
            const value = field.method();
            if (value !== undefined)
                info[field.name] = value;
        }
        return info;
    }

    #getName() {
        const name = this.#document.querySelector('[data-qa="resume-personal-name"]')
        return name?.innerText;
    }

    #getPhone() {
        const number = this.#document.querySelector('[data-qa="resume-contacts-phone"] > span')
        return number?.innerText;
    }

    #getEmail() {
        const email = this.#document.querySelector('[data-qa="resume-contact-email"] > a')
        return email?.innerText;
    }

    #getEducation() {
        const education = this.#document.querySelector('[data-qa="resume-block-education"]')
        return education?.innerText;
    }

    #getExperience() {
        const exp = this.#document.querySelector('[data-qa="resume-block-experience"]');
        return exp?.innerText;
    }
}
