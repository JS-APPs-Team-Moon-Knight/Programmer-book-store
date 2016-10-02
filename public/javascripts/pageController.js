/* globals dataService templates $ Handlebars console */
"use strict";
let pageController = {
    getInstance(dataService, templates, $) {
        var $mainContainer = $('#container');

        if ($mainContainer.length < 1) {
            throw new Error("No #container found on page!")
        }

        function _changePageHtml(html) {
            $mainContainer.html(html);
        }

        function _toggleButtonsIfLoggedIn() {
            dataService.isLoggedIn().then(isLoggedIn => {
                if (isLoggedIn) {
                    $("#logged-in").removeClass('hidden');
                    $("#logged-out").addClass('hidden');
                }
                else {
                    $("#logged-in").addClass('hidden');
                    $("#logged-out").removeClass('hidden');
                }
            });
        }

        _toggleButtonsIfLoggedIn();

        function home() {
            _toggleButtonsIfLoggedIn();

            templates.compile('products').then(html => {
                _changePageHtml(html);
            });

            dataService.getAllBooks()
                .then((booksCollection) => {
                    let booksObject = {
                        books: booksCollection
                    };

                    return templates.compile('products', booksObject);
                })
                .then((html) => {
                    _changePageHtml(html);
                });
        }

        function login() {
            templates.compile('login')
                .then(function (html) {
                    _changePageHtml(html);

                    $('#btn-login').on('click', function () {
                        var user = {
                            username: $('#tb-username').val(),
                            password: $('#tb-password').val()
                        };
                        dataService.login(user)
                            .then(function () {
                                toastr.success('User Logged in!');
                                $(location).attr('href', '#/products');
                            })
                            .catch(err => {
                                toastr.error(err.responseJSON.description);
                                $(location).attr('href', '#/register')
                            });
                    });
                });
        }

        function getAuthors() {
            //TODO: use requester object

            return new Promise((resolve, reject) => {
                $.ajax({
                    url: url,
                    type: "GET",
                    contentType: "application/json"
                }).done(resolve).fail(reject)
            });
        }

        function search(params) {
            dataService.getAllBooks()
                .then((booksObj) => {
                    let tempBooks = [],
                        searchPattern = decodeURI(params.productName).toLowerCase();

                    for (let bookID in booksObj) {
                        tempBooks.push(booksObj[bookID])
                        tempBooks[tempBooks.length - 1]._id = bookID;
                    }

                    let filteredBooks = [];
                    for (let book of tempBooks) {
                        if (book.title.toLowerCase().indexOf(searchPattern) > 0 ||
                            book.author.toLowerCase().indexOf(searchPattern) > 0 ||
                            book.category.toLowerCase().indexOf(searchPattern) > 0 ||
                            book.description.toLowerCase().indexOf(searchPattern) > 0) {
                            filteredBooks.push(book);
                        }
                    }

                    console.log(tempBooks);
                    console.log(filteredBooks);

                    let body = {
                        searchValue: decodeURI(params.productName)
                    };
                    if (filteredBooks.length > 0) {
                        body.books = filteredBooks;
                    }

                    return templates.compile('search', body);
                })
                .then((html) => {
                    _changePageHtml(html);
                });
        }

        function categories(params) {
            dataService.getAllBooks()
                .then((booksObj) => {
                    let filteredBooks = [];
                    let label = decodeURI(params.category);
                    if (params.category == 'all-categories') {
                        for (let bookID in booksObj) {
                            filteredBooks.push(booksObj[bookID])
                            filteredBooks[filteredBooks.length - 1]._id = bookID;
                        }
                    }
                    else {
                        for (let bookID in booksObj) {
                            if (booksObj[bookID].category.toLowerCase() == label.toLowerCase()) {
                                filteredBooks.push(booksObj[bookID])
                                filteredBooks[filteredBooks.length - 1]._id = bookID;
                            }
                        }
                    }

                    let books = {};
                    if (filteredBooks.length > 0) {
                        books = {
                            books: filteredBooks
                        }
                    }

                    if (params.category == 'all-categories') {
                        books.sectionCategory = 'All Categories';
                    }
                    else {
                        books.sectionCategory = label.substr(0, 1).toUpperCase() + label.substr(1);
                    }

                    return templates.compile('category', books);
                })
                .then((html) => {
                    _changePageHtml(html);
                });
        }

        function productById(params) {
            let targetBook;
            dataService.getBookById(params.id)
                .then((book) => {
                    targetBook = book;
                    book.pageUrl = encodeURIComponent(window.location.href);
                    return templates.compile('book-instance', book);
                })
                .then((html) => {
                    _changePageHtml(html);
                    $('#btn-add-to-cart').on('click', () => {
                        if (dataService.isLoggedIn()) {
                            dataService.addToCart(targetBook)
                                .then((res, err) => {
                                    if (!err) {
                                        toastr.success('Book added to cart!')
                                    }
                                })
                                .catch(err => {
                                    toastr.error(err.responseJSON.description + ". Please log in!")
                                });
                        }
                        else {
                            throw new Error('You must be logged in to add a book to the cart!')
                        }
                    })
                })
                .catch(err => {
                    toastr.err(err);
                })
        }

        function about() {
            templates.compile('about').then(html => {
                _changePageHtml(html);
            });
        }

        function contacts() {
            templates.compile('contacts').then(html => {
                _changePageHtml(html);
            });
        }

        return {
            home,
            search,
            categories,
            productById,
            about,
            contacts
        };
    }
};

if (typeof window === 'undefined') {
    module.exports = pageController.getInstance;
}