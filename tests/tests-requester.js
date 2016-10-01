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
        typeOfFunction = 'function',
        typeOfPromise = 'Promise',
        defaultExpectedHeaders = {'x-auth-token': 'OOO'},
        defaultExpectedData = {'name': 'Pesho'},
        expectedPostMethod = 'POST',
        expectedGetMethod = 'GET',
        expectedPutmethod = 'PUT';

    describe("get tests", function () {
        it('Expect get to exist and be a function.', function () {
            expect(requester.get).to.exist;
            expect(requester.get).to.be.a(typeOfFunction);
        });

        it('Expect get to call ajax method with correct parameters.', function (done) {
            requester.get(defaultExpectedUrl)
                .then(() => {
                    var result = mockedJquery.getLastRequest();

                    expect(result.url).to.equal(defaultExpectedUrl);
                    expect(result.method).to.equal(expectedGetMethod);
                })
                .then(done, done);
        });

        it('Expect get to return a promise.', function () {
            var result = requester.get({url: defaultExpectedUrl});

            expect(result).to.be.a(typeOfPromise);
        });
    });


    describe("putJSON tests", function () {
        it('Expect putJSON to exist and be a function.', function () {
            expect(requester.putJSON).to.exist;
            expect(requester.putJSON).to.be.a(typeOfFunction);
        });

        it('Expect putJSON to call ajax method with correct parameters.', function (done) {
            requester.putJSON(defaultExpectedUrl, defaultExpectedData, defaultExpectedHeaders)
                .then(() => {
                    var requestResult = mockedJquery.getLastRequest();

                    expect(requestResult.url).to.equal(defaultExpectedUrl);
                    expect(requestResult.method).to.equal(expectedPutmethod);
                    expect(requestResult.headers).to.equal(defaultExpectedHeaders);
                    expect(requestResult.data).to.equal(JSON.stringify(defaultExpectedData));
                })
                .then(done, done);
        });

        it('Expect putJSON to return a promise.', function () {
            var result = requester.putJSON(defaultExpectedUrl);

            expect(result).to.be.an(typeOfPromise);
        });
    });

    describe("postJSON tests", function () {
        it('Expect postJSON to exist and be a function.', function () {
            expect(requester.postJSON).to.exist;
            expect(requester.postJSON).to.be.a(typeOfFunction);
        });

        it('Expect postJSON to call ajax method with correct parameters.', function (done) {
            requester.postJSON(defaultExpectedUrl, defaultExpectedData, defaultExpectedHeaders)
                .then(() => {
                    var requestResult = mockedJquery.getLastRequest();

                    expect(requestResult.url).to.equal(defaultExpectedUrl);
                    expect(requestResult.method).to.equal(expectedPostMethod);
                    expect(requestResult.headers).to.equal(defaultExpectedHeaders);
                    expect(requestResult.data).to.equal(JSON.stringify(defaultExpectedData));
                })
                .then(done, done);
        });

        it('Expect postJSON to return a promise.', function () {
            var result = requester.postJSON(defaultExpectedUrl);

            expect(result).to.be.a(typeOfPromise);
        });
    });

    describe("getJSON tests", function () {
        it('Expect getJSON to exist and be a function.', function () {
            expect(requester.getJSON).to.exist;
            expect(requester.getJSON).to.be.a(typeOfFunction);
        });

        it('Expect getJSON to call ajax method with correct parameters.', function (done) {
            requester.getJSON(defaultExpectedUrl, defaultExpectedHeaders)
                .then(() => {
                    var requestResult = mockedJquery.getLastRequest();

                    expect(requestResult.url).to.equal(defaultExpectedUrl);
                    expect(requestResult.method).to.equal(expectedGetMethod);
                    expect(requestResult.headers).to.equal(defaultExpectedHeaders);
                })
                .then(done, done);
        });

        it('Expect getJSON to return a promise.', function () {
            var result = requester.getJSON(defaultExpectedUrl);

            expect(result).to.be.a(typeOfPromise);
        });
    });
});