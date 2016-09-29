let templates = function (requester, templateEngine) {
    "use strict";
    let cachedTemplates = [/*{name: "", template: ""}*/];

    function get(name) {
        let cachedTemplate = cachedTemplates.find(x => x.name === name);

        if (!cachedTemplate) {
            let url = `../public/templates/${name}.handlebars`;

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
            var templateFunction = templateEngine.compile(template);
            return templateFunction(data);
        });

        return result;
    }

    return {
        compile
    }
};

if (typeof window === 'undefined') {
    module.exports = templates;
}
// export {templates};

