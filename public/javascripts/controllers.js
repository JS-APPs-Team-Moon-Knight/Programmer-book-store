/* globals dataService templates $ Handlebars console */
"use strict";
let controllers = {
    getInstance(dataService, templates) {
        return {
            home() {
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
                                        console.log('User logged in!')
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            })
                        });
            },
            logout() {

            },
            user() {
                
            },
            search(params) {

            },
            categories(params) {

            },
            checkout() {

            },
            productById(params) {

            }

        };

    }
};

 //export {controllers}