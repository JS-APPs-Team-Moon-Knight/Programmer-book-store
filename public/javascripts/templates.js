let templates = {
    get: function(name) {
        let url = `/templates/${name}.handlebars`;
        return requester.get(url);
    }
};