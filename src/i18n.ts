import i18lib from "i18next";

import common_hu from "./translations/hu.json";
import common_en from "./translations/en.json";

let FALLBACK_LANGUAGE = "hu";


export function detectLanguage(){
    let lang = FALLBACK_LANGUAGE;
    
    let supportedLangs = ["hu","en"];

    let parsedLang = navigator.language.split("-")[0];

    if (supportedLangs.includes(parsedLang)){
        lang = parsedLang;
    }

    return lang;
}

i18lib
.init({
    lng: detectLanguage(),
    interpolation: { escapeValue: false },  // React already does escaping
    resources: {
        hu: {
            common: common_hu               
        },
        en: {
            common: common_en
        },
    },
});

export var i18next = i18lib;