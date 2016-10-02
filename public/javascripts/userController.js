/* globals dataService templates $ Handlebars console */
"use strict";
let userController = {
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

        function cart() {
            var totalPrice = 0;
            dataService.getCart()
                .then(booksInCart => {
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
                        dataService.placeOrder(totalPrice)
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
                            username: $('#tb-username').val().trim(),
                            password: $('#tb-password').val().trim()
                        };
                        dataService.login(user)
                            .then(function () {
                                toastr.success('User Logged in!');
                                $(location).attr('href', '#/products');
                            })
                            .catch(err => {
                                toastr.error(err.responseJSON.description);
                                $('#tb-username').val('');
                                $('#tb-password').val(''); 
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
            dataService.logout()
                .then(function () {
                    toastr.success('User Logged out!')
                    $(location).attr('href', '#/products')
                });
        }

        function profile() {
            let userData,
                orderData;

            Promise.all([dataService.getCurrentUserData(), dataService.getOrdersByUserId()])
                .then(values => {
                    userData = values[0],
                        orderData = values[1];
                    return { user: userData, orders: orderData }
                })
                .then(data => {
                    return templates.compile('profile', data);
                })
                .then(html => {
                    _changePageHtml(html);

                    $('#submit-user-data').click(ev => {
                        var $form = $('#profile-form')[0];
                        if (!$form.checkValidity || $form.checkValidity()) {
                            userData.address = $('#user-address-input').val();
                            userData.phone = $('#user-phone-input').val();
                            console.log(userData);
                            dataService.updateUserData(userData).then(() => {
                                $(location).attr('href', '#/products');
                                toastr.success('Your profile information has been updated!');
                            }).catch(err => {
                                toastr.error(err.responseJSON.description);
                            })
                        }
                    });
                })
                .catch(err => {
                    toastr.error(err.responseJSON.description);
                });
        }

        return {
            login,
            register,
            logout,
            profile,
            cart
        };
    }
};

//export {controllers}