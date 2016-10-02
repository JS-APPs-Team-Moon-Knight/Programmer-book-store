let templates = {
    getInstance(requester, templateEngine) {
        "use strict";
        var cachedTemplates = {};

        function _get(name) {
            if (cachedTemplates[name]) {
                return Promise.resolve(cachedTemplates[name]);
            }
            else {
                let url = `./templates/${name}.handlebars`;

                return requester.get(url)
                    .then(template => {
                        cachedTemplates[name] = template;
                        return Promise.resolve(template);
                    });
            }
        }

        function compile(templateName, data) {
            var result = _get(templateName).then(template => {
                var templateFunction = templateEngine.compile(template);
                return templateFunction(data);
            });

            return result;
        }

        return {
            compile
        }
    }
};

if (typeof window === 'undefined') {
    module.exports = templates;
}

