"use strict";
const chai = require('chai');
const expect = chai.expect;

describe("Templates tests", function () {
    const Handlebars = require('handlebars');

    const mockedRequester = (function(){
        var getCalledCount = 0;

        function get(url) {
            getCalledCount++;
            return Promise.resolve("<template>{{user}}</template>");
        }
        function getAsyncCallCount() {
            return getCalledCount;
        }

        return {
            get,
            getAsyncCallCount
        }
    })();

    const templates = require('../public/javascripts/templates')(mockedRequester, Handlebars);

    it('Expect templates to compile correctly', function () {
        var expected = "<template>Pesho</template>";
        return templates.compile('template', {user: "Pesho"}).then((result) => {
                expect(result).to.equal(expected);
            }
        );
    });

    it('Expect templates to compile correctly with caching.', function () {
        var expected = "<template>Pesho</template>";
        return templates.compile('template', {user: "Pesho"}).then((result) => {
                expect(result).to.equal(expected);
            }
        );
    });

    it('Expect templates to cache templates with same name.', function () {
        return templates.compile('template', {user: "Pesho"}).then(() => {
                expect(mockedRequester.getAsyncCallCount()).to.equal(1);
            }
        );
    });
});