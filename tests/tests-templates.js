"use strict";
const chai = require('chai');
const expect = chai.expect;

describe("Templates tests", function () {
    const Handlebars = require('handlebars');

    const mockedRequester = (function () {
        var getCalledCount = 0,
            lastUrl;

        function get(url) {
            lastUrl = url;
            getCalledCount++;
            return Promise.resolve("<template>{{user}}</template>");
        }

        function getRequestCallCount() {
            return getCalledCount;
        }

        function getLastUrl() {
            return lastUrl;
        }

        return {
            get,
            getRequestCallCount,
            getLastUrl
        }
    })();

    const templates = require('../public/javascripts/templates')(mockedRequester, Handlebars);

    it('Expect compile to exist and  be a function.', function () {
        const expected = "function";

        var result = typeof templates.compile;

        expect(templates.compile).to.exist;
        expect(result).to.equal(expected);

    });

    it('Expect compile to return a promise', function () {
        var result = templates.compile('templateName', {user: "Pesho"});

        expect(result instanceof Promise).to.be.true;
    });

    it('Expect compile to have correct output.', function () {
        const expected = "<template>Pesho</template>";

        return templates.compile('templateName', {user: "Pesho"}).then((result) => {
                expect(result).to.equal(expected);
            }
        );
    });

    it('Expect compile to cache templates with same name.', function () {
        const expectedCallCount = 1;
        templates.compile('templateName', {user: "Pesho"});

        return templates.compile('templateName', {user: "Pesho"}).then(() => {
                var resultCallCount = mockedRequester.getRequestCallCount();
                expect(resultCallCount).to.equal(expectedCallCount);
            }
        );
    });

    it('Expect compile to have correct output when caching.', function () {
        const expected = "<template>Pesho</template>";
        templates.compile('templateName', {user: "Pesho"});

        return templates.compile('templateName', {user: "Pesho"}).then((result) => {
                expect(result).to.equal(expected);
            }
        );
    });

    it('Expect compile to call requester with correct url.', function () {
        const expectedUrl = './templates/templateName.handlebars';

        return templates.compile('templateName', {user: "Pesho"}).then(() => {
                var resultUrl = mockedRequester.getLastUrl();
                expect(resultUrl).to.equal(expectedUrl);
            }
        );
    });
});