app.factory("TranslateService", function() {
    return {
        get: function(key, lang) {
            if(lang == undefined) {
                lang = "en";
            }

            if(translations[lang] == undefined) {
                console.error("Unknown language: " + lang);
            }

            if(translations[lang][key] == undefined) {
                if(translations.en[key] == undefined) {
                    console.error("No known translation for key: " + key);
                    return "NO_TRANSLATION_FOUND";
                }

                console.warn("No translation for key: " + key + " found, using the english translation instead");
                return translations.en[key];
            }

            return translations[lang][key];
        }
    }
});
