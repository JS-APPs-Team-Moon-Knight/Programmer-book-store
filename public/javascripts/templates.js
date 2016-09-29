import {requester} from 'requester';

let templates = (function(){
    "use strict";
    let cachedTemplates = [/*{name: "", template: ""}*/];

    function get(name) {
        let url = `./templates/${name}.handlebars`;
        let cachedTemplate = cachedTemplates.find(x => x.name === name);

        if(!cachedTemplate) {
            let result = requester.get(url);
            let templateFunction;
            result.then(template => {
                cachedTemplates.push({name: name, template: template});
            });

            return result;
        }
        else {
            return Promise.resolve(cachedTemplate.template);
        }
    }

    return {
        get
    }
})();

export { templates }