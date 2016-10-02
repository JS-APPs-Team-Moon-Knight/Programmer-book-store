/* globals dataService templates $ Handlebars console */
"use strict";
var user={
    username: $('#tb-username').val(),
    password: $('#tb-password').val()
};
let controllers = {
    getInstance(dataService, templates) {
        return {
            home() {
                templates.compile('products').then(template => {
                    $('#container').html('');
                    $('#container').html(template);
                });

                dataService.getAllBooks()
                    .then((booksCollection) => {
                        let booksObject = {
                            books: booksCollection
                        }
                        return templates.compile('products', booksObject);
                    })
                    .then((html) => {
                        $('#container').html('');
                        $('#container').html(html);
                    });
            },
            cart() {
                dataService.getCart()
                    .then((userCart) => {
                        return templates.compile('cart', userCart);
                    })
                    .then((html) => {
                        $('#container').html('');
                        $('#container').html(html);
                    });
            },
            login() {
                templates.compile('login')
                    .then(function (template) {
                        $('#container').html('');
                        $('#container').html(template);

                        $('#btn-login').on('click', function () {
                            var user = {
                                username: $('#tb-username').val(),
                                password: $('#tb-password').val()
                            };
                            dataService.login(user)
                                .then(function () {
                                    console.log('User logged in!');
                                    toastr.success('User Logged in!');
                                    $(location).attr('href', '#/products')
                                })

                                .catch(err => {
                                    console.log(err);
                                })
                        });
                    });
            },

            register(){
                templates.compile('register')
                    .then(function (template) {
                        $('#container').html('');
                        $('#container').html(template);

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
                                    toastr.success('User registered');
                                    $(location).attr('href', '#/login')
                                })
                                .catch(err=> {
                                    console.log(err)

                                });
                        });
                    });
            },
            logout() {
                dataService.logout(user)
                    .then(function () {
                        console.log('User logged out!');
                        toastr.success('User Logged out!');
                        $(location).attr('href', '#/products')
                    })

            },
            user() {

            },
            search(params) {

            },
            categories(params) {
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
                    })
                    .catch(console.log);
            },
            checkout() {

            },
            productById(params) {
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
                                dataService.addToCart(targetBook);
                            }
                            else {
                                throw new Error('You must be logged in to add a book to the cart!')
                            }
                        })
                    })
                    .catch(console.log)
            },
            about() {
                templates.compile('about').then(html => {
                    $('#container').html('');
                    $('#container').html(html);
                });
            },
            contacts() {
                templates.compile('contacts').then(html => {
                    $('#container').html('');
                    $('#container').html(html);
                });
            }

        };

    }
};

//export {controllers}
