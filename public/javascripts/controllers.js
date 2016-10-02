/* globals dataService templates $ Handlebars console */
"use strict";
let controllers = {
    getInstance(dataService, templates) {
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

        function cart() {
            dataService.getCart()
                .then(booksInCart => {
                    console.log(booksInCart);
                    var totalPrice = 0;
                    booksInCart.forEach(book => {
                        totalPrice += book._price;
                    });

                    var data = {};
                    if (booksInCart.length > 0) {
                        totalPrice = Math.round(totalPrice * 100) / 100;
                        data = {
                            books: booksInCart,
                            totalPrice: totalPrice
                        }
                    }
                    return templates.compile('cart', data);
                })
                .then((html) => {
                    _changePageHtml(html);

                    $('.remove-from-cart').click((ev) => {
                        var bookId = $(ev.target).attr('data-book-id');
                        dataService.getBookById(bookId).then(book => {
                            return dataService.removeFromCart(book);
                        }).then(() => {
                            cart();
                        })
                    });

                    $('#checkout-btn').click((ev) => {
                        dataService.placeOrder()
                            .then(() => {
                                toastr.success("Order has been successfully placed!");
                                return dataService.clearCart();
                            })
                            .then(() => {
                                $(location).attr('href', '#/products');
                            })
                            .catch(err => {
                                toastr.error(err.responseJSON.description);
                            });
                    });
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
                            });
                    });
                });
        }

        function register() {
            templates.compile('register')
                .then(function (html) {
                    _changePageHtml(html);

                    $('#btn-register').on('click', function () {
                        var user = {
                            username: $('#tb-username').val(),
                            password: $('#tb-password').val(),
                            email: $('#tb-email').val(),
                            phone: $('#tb-phone').val(),
                            address: $('#tb-address').val(),
                            books: []
                        };

                        dataService.register(user)
                            .then(function () {
                                console.log('User registered!');
                                toastr.success('User registered')
                            })
                            .catch(err => {
                                toastr.error(err.responseJSON.description);
                            });
                    });
                });
        }

        function logout() {
            dataService.logout(user)
                .then(function () {
                    toastr.success('User Logged out!')
                    $(location).attr('href', '#/products')
                });
        }

        function user() {

        }

        function search(params) {

        }

        function categories(params) {
            dataService.getAllBooks()
                .then((booksObj) => {
                    let filteredBooks = [];
                    if (params.category == 'all-categories') {
                        for (let bookID in booksObj) {
                            filteredBooks.push(booksObj[bookID])
                            filteredBooks[filteredBooks.length - 1]._id = bookID;
                        }
                    }
                    else {
                        for (let bookID in booksObj) {
                            if (booksObj[bookID].category.toLowerCase() == params.category) {
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
                        books.sectionCategory = params.category.substr(0, 1).toUpperCase() + params.category.substr(1);
                    }

                    return templates.compile('category', books);
                })
                .then((html) => {
                    _changePageHtml(html);
                });
        }

        function checkout() {

        }

        function productById(params) {
            let targetBook;
            dataService.getBookById(params.id)
                .then((book) => {
                    targetBook = book;
                    return templates.compile('book-instance', book);
                })
                .then((html) => {
                    _changePageHtml(html);
                    $('#btn-add-to-cart').on('click', () => {
                        if (dataService.isLoggedIn()) {
                            dataService.addToCart(targetBook)
                                .catch(err => {
                                    toastr.error(err.responseJSON.description + ". Please log in!")
                                });
                        }
                        else {
                            throw new Error('You must be logged in to add a book to the cart!')
                        }
                    })
                })
                .catch(console.log)
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
            cart,
            login,
            register,
            logout,
            user,
            search,
            categories,
            checkout,
            productById,
            about,
            contacts
        };
    }
};

//export {controllers}