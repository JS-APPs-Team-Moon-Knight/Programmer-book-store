"use strict";
const chai = require('chai');
const expect = chai.expect;
var Book = require('../public/javascripts/models').Book;

describe("Book tests", function () {
    it('Expect Book constructor to be a function.', function () {
        expect(Book).to.be.a('function');
    });

    it('Expect Book constructor to return instance of Book with correct properties.', function () {
        const expectedTitle = "title",
            expectedAuthor = "author",
            expectedCategory = "category",
            expectedImgUrl = "http://www.url.com/",
            expectedPrice = 2,
            expectedPageCount = 250,
            expectedDescription = "description";

        var actual = new Book(expectedTitle, expectedAuthor, expectedCategory, expectedImgUrl, expectedPrice, expectedPageCount, expectedDescription);

        expect(actual.title).to.exist;
        expect(actual.title).to.be.equal(expectedTitle);
        expect(actual.author).to.exist;
        expect(actual.author).to.be.equal(expectedAuthor);
        expect(actual.category).to.exist;
        expect(actual.category).to.be.equal(expectedCategory);
        expect(actual.imgUrl).to.exist;
        expect(actual.imgUrl).to.be.equal(expectedImgUrl);
        expect(actual.price).to.exist;
        expect(actual.price).to.be.equal(expectedPrice);
        expect(actual.pages).to.exist;
        expect(actual.pages).to.be.equal(expectedPageCount);
        expect(actual.description).to.exist;
        expect(actual.description).to.be.equal(expectedDescription);
    });

});