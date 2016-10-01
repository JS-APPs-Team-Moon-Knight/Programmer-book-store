"use strict";
const chai = require('chai');
const expect = chai.expect;

describe("Requester tests", function () {
    const mockedJquery = (function () {
        var lastRequest = {};

        function ajax(request) {
            lastRequest = request;
            request.success();
        }

        function getLastRequest() {
            return lastRequest;
        }

        return {
            ajax,
            getLastRequest
        }
    })();

    const requester = require('../public/javascripts/requester')(mockedJquery),
        defaultExpectedUrl = './api/auth',
        expectedFunctionType = 'function',
        defaultExpectedHeaders = {'x-auth-token': 'OOO'},
        defaultExpectedData = {'name': 'Pesho'},
        expectedPostMethod = 'POST',
        expectedGetMethod = 'GET',
        expectedPutmethod = 'PUT';

    describe("get tests", function () {
        it('Expect get to exist and be a function.', function () {
            var result = typeof requester.get;

            expect(requester.get).to.exist;
            expect(result).to.equal(expectedFunctionType);
        });

        it('Expect get to call ajax method with correct parameters.', function () {
            return requester.get(defaultExpectedUrl).then(() => {
                var result = mockedJquery.getLastRequest();

                expect(result.url).to.equal(defaultExpectedUrl);
                expect(result.method).to.equal(expectedGetMethod);
            });
        });

        it('Expect get to return a promise.', function () {
            var result = requester.get({url: defaultExpectedUrl});

            expect(result instanceof Promise).to.be.true;
        });
    });


    describe("putJSON tests", function () {
        it('Expect putJSON to exist and be a function.', function () {
            var result = typeof requester.putJSON;

            expect(requester.putJSON).to.exist;
            expect(result).to.equal(expectedFunctionType);
        });

        it('Expect putJSON to call ajax method with correct parameters.', function () {
            return requester.putJSON(defaultExpectedUrl, defaultExpectedData, defaultExpectedHeaders).then(() => {
                var requestResult = mockedJquery.getLastRequest();

                expect(requestResult.url).to.equal(defaultExpectedUrl);
                expect(requestResult.method).to.equal(expectedPutmethod);
                expect(requestResult.headers).to.equal(defaultExpectedHeaders);
                expect(requestResult.data).to.equal(JSON.stringify(defaultExpectedData));
            });
        });

        it('Expect putJSON to return a promise.', function () {
            var result = requester.putJSON(defaultExpectedUrl);

            expect(result instanceof Promise).to.be.true;
        });
    });

    describe("postJSON tests", function () {
        it('Expect postJSON to exist and be a function.', function () {
            var result = typeof requester.postJSON;

            expect(requester.postJSON).to.exist;
            expect(result).to.equal(expectedFunctionType);
        });

        it('Expect postJSON to call ajax method with correct parameters.', function () {
            return requester.postJSON(defaultExpectedUrl, defaultExpectedData, defaultExpectedHeaders).then(() => {
                var requestResult = mockedJquery.getLastRequest();

                expect(requestResult.url).to.equal(defaultExpectedUrl);
                expect(requestResult.method).to.equal(expectedPostMethod);
                expect(requestResult.headers).to.equal(defaultExpectedHeaders);
                expect(requestResult.data).to.equal(JSON.stringify(defaultExpectedData));
            });
        });

        it('Expect postJSON to return a promise.', function () {
            var result = requester.postJSON(defaultExpectedUrl);

            expect(result instanceof Promise).to.be.true;
        });
    });

    describe("getJSON tests", function () {
        it('Expect getJSON to exist and be a function.', function () {
            var result = typeof requester.getJSON;

            expect(requester.getJSON).to.exist;
            expect(result).to.equal(expectedFunctionType);
        });

        it('Expect getJSON to call ajax method with correct parameters.', function () {
            return requester.getJSON(defaultExpectedUrl, defaultExpectedHeaders).then(() => {
                var requestResult = mockedJquery.getLastRequest();

                expect(requestResult.url).to.equal(defaultExpectedUrl);
                expect(requestResult.method).to.equal(expectedGetMethod);
                expect(requestResult.headers).to.equal(defaultExpectedHeaders);
            });
        });

        it('Expect getJSON to return a promise.', function () {
            var result = requester.getJSON(defaultExpectedUrl);

            expect(result instanceof Promise).to.be.true;
        });
    });
});