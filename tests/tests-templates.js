"use strict";
const chai = require('chai');
const expect = chai.expect;

describe("Templates tests", function () {
    const Handlebars = require('handlebars');

    const mockedRequester = (function(){
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

    it('Expect templates to compile correctly.', function () {
        var expected = "<template>Pesho</template>";

        return templates.compile('templateName', {user: "Pesho"}).then((result) => {
                expect(result).to.equal(expected);
            }
        );
    });

    it('Expect to cache templates with same name.', function () {
        var expectedCallCount = 1;
        templates.compile('templateName', {user: "Pesho"});
        return templates.compile('templateName', {user: "Pesho"}).then(() => {
                var resultCallCount = mockedRequester.getRequestCallCount();
                expect(resultCallCount).to.equal(expectedCallCount);
            }
        );
    });

    it('Expect templates to compile correctly with caching.', function () {
        var expected = "<template>Pesho</template>";
        templates.compile('templateName', {user: "Pesho"});

        return templates.compile('templateName', {user: "Pesho"}).then((result) => {
                expect(result).to.equal(expected);
            }
        );
    });

    it('Expect compile to call requester with correct url.', function () {
        var expectedUrl = '../public/templates/templateName.handlebars';

        return templates.compile('templateName', {user: "Pesho"}).then(() => {
                var resultUrl = mockedRequester.getLastUrl();
                expect(resultUrl).to.equal(expectedUrl);
            }
        );
    });
});