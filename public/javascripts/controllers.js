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

        function home() {
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
                .then((userCart) => {
                    var booksInCart = [];

                    userCart.forEach(_id => {
                        booksInCart.push(productById({id: _id}));
                    });

                    return Promise.all(booksInCart);
                })
                .then(booksInCart => {
                    var totalPrice = 0;
                    booksInCart.forEach(book => {
                        totalPrice += book.price;
                    });

                    var data = {};
                    if(booksInCart.length > 0) {
                        data ={
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
                        productById({id: bookId}).then(book => {
                            dataService.removeFromCart(book);
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
                            address: $('#tb-address').val()
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

        }

        function user() {

        }

        function search(params) {

        }

        function categories(params) {

        }

        function checkout() {

        }

        function productById(params) {
            return dataService.getBookById(params.id);
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