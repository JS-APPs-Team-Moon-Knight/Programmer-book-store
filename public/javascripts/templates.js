import {requester} from "requester";

let templates = (function () {
    "use strict";
    let cachedTemplates = [/*{name: "", template: ""}*/];

    function get(name) {
        let cachedTemplate = cachedTemplates.find(x => x.name === name);

        if (!cachedTemplate) {
            let url = `./templates/${name}.handlebars`;

            return requester.get(url)
                .then(template => {
                    cachedTemplates.push({name: name, template: template});
                    return Promise.resolve(template);
                });
        }
        else {
            return Promise.resolve(cachedTemplate.template);
        }
    }

    function compile(templateName, data) {
        var result = get(templateName).then(template => {
            var templateFunction = Handlebars.compile(template);
            return templateFunction(data);
        });

        return result;
    }

    return {
        compile
    }
})();

export {templates}