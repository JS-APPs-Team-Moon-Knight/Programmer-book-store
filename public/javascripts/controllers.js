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

// export {controllers}