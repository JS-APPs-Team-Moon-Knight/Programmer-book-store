import * as requester from 'requester';

let templates = (function(name){
    "use strict";
    let cachedTemplates = [/*{name: "", template: ""}*/];

    function get(name) {
        let url = `/templates/${name}.handlebars`;
        let cachedTemplate = cachedTemplates.find(x => x.name === name);

        if(!cachedTemplate) {
            let result = requester.get(url);
            cachedTemplates.push({name: name, template: result});

            return result;
        }
        else {
            return cachedTemplate.template;
        }
    }

    return {
        get
    }
})();

export { templates }