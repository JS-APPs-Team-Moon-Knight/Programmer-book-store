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

    const templates = require('../public/javascripts/templates').getInstance(mockedRequester, Handlebars);

    it('Expect compile to exist and be a function.', function () {
        expect(templates.compile).to.exist;
        expect(templates.compile).to.be.a('function');

    });

    it('Expect compile to return a promise', function () {
        var result = templates.compile('templateName', {user: "Pesho"});

        expect(result).to.be.a('Promise');
    });

    it('Expect compile to have correct output.', function (done) {
        const expected = "<template>Pesho</template>";

        templates.compile('templateName', {user: "Pesho"})
            .then((result) => {
                    expect(result).to.equal(expected);
                })
            .then(done, done);
    });

    it('Expect compile to cache templates with same name.', function (done) {
        const expectedCallCount = 1;

        templates.compile('templateName', {user: "Pesho"});
        templates.compile('templateName', {user: "Pesho"})
            .then(() => {
                    var resultCallCount = mockedRequester.getRequestCallCount();
                    expect(resultCallCount).to.equal(expectedCallCount);
                })
            .then(done, done);
    });

    it('Expect compile to have correct output when caching.', function (done) {
        const expected = "<template>Pesho</template>";

        templates.compile('templateName', {user: "Pesho"});
        templates.compile('templateName', {user: "Pesho"})
            .then((result) => {
                    expect(result).to.equal(expected);
                })
            .then(done, done);
    });

    it('Expect compile to call requester with correct url.', function (done) {
        const expectedUrl = './templates/templateName.handlebars';

        templates.compile('templateName', {user: "Pesho"})
            .then(() => {
                    var resultUrl = mockedRequester.getLastUrl();
                    expect(resultUrl).to.equal(expectedUrl);
                })
            .then(done, done);
    });
});