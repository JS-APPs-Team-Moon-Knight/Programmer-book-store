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
                });
        }
        else {
            return Promise.resolve(cachedTemplate.template);
        }
    }

    return {
        get
    }
})();

export {templates}