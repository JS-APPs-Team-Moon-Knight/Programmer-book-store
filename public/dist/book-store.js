class Book {
    constructor(title, author, category, imgUrl, price, pages, description) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.imgUrl = imgUrl;
        this.price = price;
        this.pages = pages;
        this.description = description;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        this._author = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get imgUrl() {
        return this._imgUrl;
    }

    set imgUrl(value) {
        this._imgUrl = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get pages() {
        return this._pages;
    }

    set pages(value) {
        this._pages = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }
}

class User {
    constructor(username, password, firstName, lastName, email, address, phoneNumber) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        value = _formatInputData(value);
        if (/[^A-Za-z0-9-_.]/g.test(value)) {
            throw new Error('Username can only contain only latin letters, numbers, dash, underscore or a dot!');
        }

        this._username = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        value = _formatInputData(value);
        this._password = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        value = _formatInputData(value);
        _validateName(value);
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        value = _formatInputData(value);
        _validateName(value);
        this._lastName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        value = _formatInputData(value);
        let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (value.match(pattern).length < 1) {
            throw new Error('Invalid email address!');
        }

        this._email = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        value = _formatInputData(value);
        this._address = value;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    set phoneNumber(value) {
        value = _formatInputData(value);

        if (/[^0-9]/g.test(value)) {
            throw new Error('Invalid telephone number!');
        }

        this._phoneNumber = value;
    }

    _formatInputData(value) {
        value = value.trim();
        var illegalSymbolsMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };

        function escapeHtml(str) {
            return String(str).replace(/[&<>"'\/]/g, function (s) {
                return entityMap[s];
            });
        }

        value = escapeHtml(value);
        return value;
    }

    _validateName(name) {
        if (/^[^A-Z]/.test(name)) {
            throw new Error('Name must begin with a capital letter!');
        }

        for (let i = 1; i < name.length; i += 1) {
            if (/^a-z-/g.test(name[i])) {
                throw new Error('Disallowed characters! A name must begin with a capital letter and continue with lower case latin symbols!');
            }

            if (name[i - 1] === '-' && name[i] === '-') {
                throw new Error('There cannot be two or more successive dashes in a name!');
            }
        }
    }
}
class Author {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this._books = [];
    }

    get name() {
        return this._name;
    }

    set name(name) {
        if (typeof name !== "string") {
            throw new Error("Name must be a string.");
        }
        this._name = name;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        if (typeof description !== "string") {
            throw new Error("Description must be a string.");
        }
        if (description.length <= 10 && description.length > 50) {
            throw new Error("Description must be between 10 and 50 symbols long.");
        }
        this._description = description;
    }

    get books() {
        return this._books;
    }

    set books(value) {
        throw new Error("Books cannot be changed.Use add remove or removeAll methods instead.");
    }

    add(book) {
        if (!(book instanceof Book)) {
            throw new Error("Only books can be added.");
        }
        else this.books.push(book);
    }

    remove(book) {
        var index = this.books.indexOf(book);
        if (index < 0) {
            throw new Error("Book not found.");
        }
        this.books.splice(index, 1);
    }

    removeAll() {
        this._books = [];
    }
}

if (typeof window === 'undefined') {
    module.exports = {Book, User, Author}
}

/* globals requester localStorage */
"use strict";
var dataService = {
    getInstance(requester) {
        const HTTP_HEADER_KEY = "x-auth-key",
            KEY_STORAGE_USERNAME = "username",
            KEY_STORAGE_AUTH_KEY = "authKey",
            CURRENT_USER_ID = "userID",
            APP_ID = "kid_SkGEDPt6",
            APP_SECRET = "1ddc36c888904211906588c736731c4d",
            APP_KEY = "2c9b407d779742d18a5e4afef9700855";

        var cachedBooks = {};

        function _cacheBook(book) {
            cachedBooks[book._id] = new Book(book.title, book.author, book.category, book.imgUrl, book.price, book.pages, book.description)
        }

        function _unCacheBook(book) {
            cachedBooks[book._id] = undefined;
        }

        function login(user) {
            let encodedAppKey = btoa(`${APP_ID}:${APP_SECRET}`),
                headers = {
                    'Authorization': `Basic ${encodedAppKey}`
                };

            return requester.postJSON(`https://baas.kinvey.com/user/${APP_ID}/login`, user, headers)
                .then(response => {
                    localStorage.setItem(KEY_STORAGE_USERNAME, response.username);
                    localStorage.setItem(KEY_STORAGE_AUTH_KEY, response._kmd.authtoken);
                    localStorage.setItem(CURRENT_USER_ID, response._id);
                });
        }

        function register(user) {
            let encodedAppKey = btoa(`${APP_ID}:${APP_SECRET}`),
                headers = {
                    'Authorization': `Basic ${encodedAppKey}`
                };

            return requester.postJSON(`https://baas.kinvey.com/user/${APP_ID}/`, user, headers);
        }

        function logout() {
            let body = {},
                headers = {
                    'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
                };

            return requester.postJSON(`https://baas.kinvey.com/user/${APP_ID}/_logout`, body, headers)
                .then((response) => {
                    console.log(response);
                    localStorage.removeItem(KEY_STORAGE_USERNAME);
                    localStorage.removeItem(KEY_STORAGE_AUTH_KEY);
                    localStorage.removeItem(CURRENT_USER_ID);
                });
        }

        function isLoggedIn() {
            return Promise.resolve()
                .then(() => {
                    return !!localStorage.getItem(KEY_STORAGE_USERNAME);
                });
        }

        function getCart() {
            let headers = {
                'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
            };

            return requester.getJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, headers)
                .then((response) => {
                    return response.books;
                })
        }

        function addToCart(book) {
            return getCart()
                .then(((cart) => {
                    cart.push(book);
                    let headers = {
                        'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
                    };

                    return requester.getJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, headers)
                        .then(response => {
                            var body = {
                                books: cart,
                                username: response.username,
                                address: response.address,
                                phone: response.phone,
                                email: response.email
                            };
                            return requester.putJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, body, headers);
                        });
                }));
        }

        function removeFromCart(book) {
            return getCart()
                .then(((cart) => {
                    for (let i = 0; i < cart.length; i += 1) {
                        if (book._id == cart[i]._id) {
                            cart.splice(i, 1);
                            break;
                        }
                    }
                    let headers = {
                        'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
                    };

                    return requester.getJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, headers)
                        .then(response => {
                            var body = {
                                books: cart,
                                username: response.username,
                                address: response.address,
                                phone: response.phone,
                                email: response.email
                            };
                            return requester.putJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, body, headers);
                        });
                }));
        }

        function clearCart() {
            let headers = {
                'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
            };

            return requester.getJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, headers)
                .then(response => {
                    var body = {
                        books: [],
                        username: response.username,
                        address: response.address,
                        phone: response.phone,
                        email: response.email
                    };

                    return requester.putJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, body, headers);
                });
        }

        function getAllBooks() {
            let encodedAppKey = btoa(`${APP_ID}:${APP_KEY}`),
                headers = {
                    'Authorization': `Basic ${encodedAppKey}`
                };

            return requester.getJSON(`https://baas.kinvey.com/appdata/${APP_ID}/booksDataBase`, headers)
                .then(response => {
                    response.forEach(book => {
                        cachedBooks[book._id] = new Book(book.title, book.author, book.category, book.imgUrl, book.price, book.pages, book.description);
                    });
                    return cachedBooks;
                });
        }

        function getBookById(id) {
            if (cachedBooks[id]) {
                return Promise.resolve(cachedBooks[id]);
            }
            else {
                let headers = {
                    'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
                };

                return requester.getJSON(`https://baas.kinvey.com/appdata/${APP_ID}/booksDataBase/${id}`, headers)
                    .then(book => {
                        _cacheBook(book);
                        return book;
                    });
            }
        }

        function placeOrder(totalPrice) {
            return getCart().then(cart => {
                let body = {
                        userId: localStorage.getItem(CURRENT_USER_ID),
                        books: cart,
                        status: "open",
                        totalPrice: totalPrice
                    },
                    headers = {
                        'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
                    };

                return requester.postJSON(`https://baas.kinvey.com/appdata/${APP_ID}/orders`, body, headers);
            });
        }

        function getOrdersByUserId() {
            let headers = {
                'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
            };

            return requester.getJSON(`https://baas.kinvey.com/appdata/${APP_ID}/orders/?query={"userId":"${localStorage.getItem(CURRENT_USER_ID)}"}`, headers);
        }

        function getCurrentUserData() {
            let headers = {
                'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
            };

            return requester.getJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, headers);
        }

        function updateUserData(body) {
            let headers = {
                'Authorization': `Kinvey ${localStorage.getItem(KEY_STORAGE_AUTH_KEY)}`
            };
            return requester.putJSON(`https://baas.kinvey.com/user/${APP_ID}/${localStorage.getItem(CURRENT_USER_ID)}`, body, headers);
        }

        return {
            login,
            register,
            logout,
            isLoggedIn,
            getCart,
            addToCart,
            removeFromCart,
            getAllBooks,
            getBookById,
            placeOrder,
            clearCart,
            getCurrentUserData,
            getOrdersByUserId,
            updateUserData
        }
    }
};

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
            //TODO: use requester object & move to data.js

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
                    toastr.error(err);
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

/* globals $ Promise */
"use strict";
let requester = {
    getInstance(asyncEngine){
        return {
            get(url) {
                return new Promise((resolve, reject) => {
                    asyncEngine.ajax({
                        url: url,
                        method: "GET",
                        success(response) {
                            resolve(response);
                        },
                        error(err) {
                            reject(err);
                        }
                    });
                });
            },
            putJSON(url, body, headers = {}) {
                return new Promise((resolve, reject) => {
                    asyncEngine.ajax({
                        url: url,
                        headers: headers,
                        method: "PUT",
                        contentType: "application/json",
                        data: JSON.stringify(body),
                        success(response) {
                            resolve(response);
                        },
                        error(err) {
                            reject(err);
                        }
                    });
                });
            },
            postJSON(url, body, headers = {}) {
                return new Promise((resolve, reject) => {
                    asyncEngine.ajax({
                        url: url,
                        headers: headers,
                        method: "POST",
                        contentType: "application/json",
                        data: JSON.stringify(body),
                        success(response) {
                            resolve(response);
                        },
                        error(err) {
                            reject(err);
                        }
                    });
                });
            },
            getJSON(url, headers = {}) {
                return new Promise((resolve, reject) => {
                    asyncEngine.ajax({
                        url: url,
                        method: "GET",
                        headers: headers,
                        contentType: "application/json",
                        success(response) {
                            resolve(response);
                        },
                        error(err) {
                            reject(err);
                        }
                    });
                });
            }
        }
    }
};

if (typeof window === 'undefined') {
    module.exports = requester.getInstance;
}
// export { requester }

let templates = {
    getInstance(requester, templateEngine) {
        "use strict";
        var cachedTemplates = {};

        function _get(name) {
            if (cachedTemplates[name]) {
                return Promise.resolve(cachedTemplates[name]);
            }
            else {
                let url = `./templates/${name}.handlebars`;

                return requester.get(url)
                    .then(template => {
                        cachedTemplates[name] = template;
                        return Promise.resolve(template);
                    });
            }
        }

        function compile(templateName, data) {
            var result = _get(templateName).then(template => {
                var templateFunction = templateEngine.compile(template);
                return templateFunction(data);
            });

            return result;
        }

        return {
            compile
        }
    }
};

if (typeof window === 'undefined') {
    module.exports = templates;
}

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

                    $('#btn-register').on('click', function (ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        if (!$('#register-form')[0].checkValidity || $('#register-form')[0].checkValidity()) {
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
                                    toastr.success('User registered!');
                                    $(location).attr('href', '#/login');
                                })
                                .catch(err => {
                                    toastr.error(err.responseJSON.description);
                                });
                        }
                        else {
                            toastr.error("Please fill out all fields correctly!")
                        }
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
                    return {user: userData, orders: orderData}
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
/* globals Navigo controllers $ dataService document templates requester*/
"use strict";
// import {templates} from 'templates';
// import {dataService} from 'dataService';
// import {controllers} from 'controllers';
// import {requester} from 'requester';

let requesterInstance = requester.getInstance($);
let templateInstance = templates.getInstance(requesterInstance, Handlebars);
let dataServiceInstance = dataService.getInstance(requesterInstance);
let router = new Navigo(null, true);

let userControllerInstance = userController.getInstance(dataServiceInstance, templateInstance, $);
let pageControllerInstance = pageController.getInstance(dataServiceInstance, templateInstance, $);

router
    .on('/products', pageControllerInstance.home)
    .on("/login", userControllerInstance.login)
    .on('/register', userControllerInstance.register)
    .on("/logout", userControllerInstance.logout)
    .on("/profile", userControllerInstance.profile)
    .on("/cart", userControllerInstance.cart)
    .on("/search/:productName", pageControllerInstance.search)
    .on("/products/:category", pageControllerInstance.categories)
    .on("/products/review/:id", pageControllerInstance.productById)
    // .on("/authors", pageControllerInstance.authors)
    .on("/about", pageControllerInstance.about)
    .on("/contacts", pageControllerInstance.contacts)
    .on("/home", () => {
        router.navigate("/products");
    })
    .on("/", () => {
        router.navigate("/products");
    })
    .on("", () => {
        router.navigate("/products");
    })
    .resolve();

$('#btn-search').on('click', () => {
    let searchBar = $('#search-bar'),
        searchValue = encodeURI(searchBar.val().trim());
    if (!searchValue) {
        return;
    }
    router.navigate(`/search/${searchValue}`)
    searchBar.val('');
});

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "300",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

//export {controllers}