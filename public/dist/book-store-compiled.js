'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Book = function () {
    function Book(title, author, category, imgUrl, price, pages, description) {
        _classCallCheck(this, Book);

        this.title = title;
        this.author = author;
        this.category = category;
        this.imgUrl = imgUrl;
        this.price = price;
        this.pages = pages;
        this.description = description;
    }

    _createClass(Book, [{
        key: 'title',
        get: function get() {
            return this._title;
        },
        set: function set(value) {
            this._title = value;
        }
    }, {
        key: 'author',
        get: function get() {
            return this._author;
        },
        set: function set(value) {
            this._author = value;
        }
    }, {
        key: 'category',
        get: function get() {
            return this._category;
        },
        set: function set(value) {
            this._category = value;
        }
    }, {
        key: 'imgUrl',
        get: function get() {
            return this._imgUrl;
        },
        set: function set(value) {
            this._imgUrl = value;
        }
    }, {
        key: 'price',
        get: function get() {
            return this._price;
        },
        set: function set(value) {
            this._price = value;
        }
    }, {
        key: 'pages',
        get: function get() {
            return this._pages;
        },
        set: function set(value) {
            this._pages = value;
        }
    }, {
        key: 'description',
        get: function get() {
            return this._description;
        },
        set: function set(value) {
            this._description = value;
        }
    }]);

    return Book;
}();

var User = function () {
    function User(username, password, firstName, lastName, email, address, phoneNumber) {
        _classCallCheck(this, User);

        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    _createClass(User, [{
        key: '_formatInputData',
        value: function _formatInputData(value) {
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
    }, {
        key: '_validateName',
        value: function _validateName(name) {
            if (/^[^A-Z]/.test(name)) {
                throw new Error('Name must begin with a capital letter!');
            }

            for (var i = 1; i < name.length; i += 1) {
                if (/^a-z-/g.test(name[i])) {
                    throw new Error('Disallowed characters! A name must begin with a capital letter and continue with lower case latin symbols!');
                }

                if (name[i - 1] === '-' && name[i] === '-') {
                    throw new Error('There cannot be two or more successive dashes in a name!');
                }
            }
        }
    }, {
        key: 'username',
        get: function get() {
            return this._username;
        },
        set: function set(value) {
            value = _formatInputData(value);
            if (/[^A-Za-z0-9-_.]/g.test(value)) {
                throw new Error('Username can only contain only latin letters, numbers, dash, underscore or a dot!');
            }

            this._username = value;
        }
    }, {
        key: 'password',
        get: function get() {
            return this._password;
        },
        set: function set(value) {
            value = _formatInputData(value);
            this._password = value;
        }
    }, {
        key: 'firstName',
        get: function get() {
            return this._firstName;
        },
        set: function set(value) {
            value = _formatInputData(value);
            _validateName(value);
            this._firstName = value;
        }
    }, {
        key: 'lastName',
        get: function get() {
            return this._lastName;
        },
        set: function set(value) {
            value = _formatInputData(value);
            _validateName(value);
            this._lastName = value;
        }
    }, {
        key: 'email',
        get: function get() {
            return this._email;
        },
        set: function set(value) {
            value = _formatInputData(value);
            var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if (value.match(pattern).length < 1) {
                throw new Error('Invalid email address!');
            }

            this._email = value;
        }
    }, {
        key: 'address',
        get: function get() {
            return this._address;
        },
        set: function set(value) {
            value = _formatInputData(value);
            this._address = value;
        }
    }, {
        key: 'phoneNumber',
        get: function get() {
            return this._phoneNumber;
        },
        set: function set(value) {
            value = _formatInputData(value);

            if (/[^0-9]/g.test(value)) {
                throw new Error('Invalid telephone number!');
            }

            this._phoneNumber = value;
        }
    }]);

    return User;
}();

var Author = function () {
    function Author(name, description) {
        _classCallCheck(this, Author);

        this.name = name;
        this.description = description;
        this._books = [];
    }

    _createClass(Author, [{
        key: 'add',
        value: function add(book) {
            if (!(book instanceof Book)) {
                throw new Error("Only books can be added.");
            } else this.books.push(book);
        }
    }, {
        key: 'remove',
        value: function remove(book) {
            var index = this.books.indexOf(book);
            if (index < 0) {
                throw new Error("Book not found.");
            }
            this.books.splice(index, 1);
        }
    }, {
        key: 'removeAll',
        value: function removeAll() {
            this._books = [];
        }
    }, {
        key: 'name',
        get: function get() {
            return this._name;
        },
        set: function set(name) {
            if (typeof name !== "string") {
                throw new Error("Name must be a string.");
            }
            this._name = name;
        }
    }, {
        key: 'description',
        get: function get() {
            return this._description;
        },
        set: function set(description) {
            if (typeof description !== "string") {
                throw new Error("Description must be a string.");
            }
            if (description.length <= 10 && description.length > 50) {
                throw new Error("Description must be between 10 and 50 symbols long.");
            }
            this._description = description;
        }
    }, {
        key: 'books',
        get: function get() {
            return this._books;
        },
        set: function set(value) {
            throw new Error("Books cannot be changed.Use add remove or removeAll methods instead.");
        }
    }]);

    return Author;
}();

if (typeof window === 'undefined') {
    module.exports = { Book: Book, User: User, Author: Author };
}

/* globals requester localStorage */
"use strict";
var dataService = {
    getInstance: function getInstance(requester) {
        var HTTP_HEADER_KEY = "x-auth-key",
            KEY_STORAGE_USERNAME = "username",
            KEY_STORAGE_AUTH_KEY = "authKey",
            CURRENT_USER_ID = "userID",
            APP_ID = "kid_SkGEDPt6",
            APP_SECRET = "1ddc36c888904211906588c736731c4d",
            APP_KEY = "2c9b407d779742d18a5e4afef9700855";

        var cachedBooks = {};

        function _cacheBook(book) {
            cachedBooks[book._id] = new Book(book.title, book.author, book.category, book.imgUrl, book.price, book.pages, book.description);
        }

        function _unCacheBook(book) {
            cachedBooks[book._id] = undefined;
        }

        function login(user) {
            var encodedAppKey = btoa(APP_ID + ':' + APP_SECRET),
                headers = {
                'Authorization': 'Basic ' + encodedAppKey
            };

            return requester.postJSON('https://baas.kinvey.com/user/' + APP_ID + '/login', user, headers).then(function (response) {
                localStorage.setItem(KEY_STORAGE_USERNAME, response.username);
                localStorage.setItem(KEY_STORAGE_AUTH_KEY, response._kmd.authtoken);
                localStorage.setItem(CURRENT_USER_ID, response._id);
            });
        }

        function register(user) {
            var encodedAppKey = btoa(APP_ID + ':' + APP_SECRET),
                headers = {
                'Authorization': 'Basic ' + encodedAppKey
            };

            return requester.postJSON('https://baas.kinvey.com/user/' + APP_ID + '/', user, headers);
        }

        function logout() {
            var body = {},
                headers = {
                'Authorization': 'Kinvey ' + localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            };

            return requester.postJSON('https://baas.kinvey.com/user/' + APP_ID + '/_logout', body, headers).then(function (response) {
                console.log(response);
                localStorage.removeItem(KEY_STORAGE_USERNAME);
                localStorage.removeItem(KEY_STORAGE_AUTH_KEY);
                localStorage.removeItem(CURRENT_USER_ID);
            });
        }

        function isLoggedIn() {
            return Promise.resolve().then(function () {
                return !!localStorage.getItem(KEY_STORAGE_USERNAME);
            });
        }

        function getCart() {
            var headers = {
                'Authorization': 'Kinvey ' + localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            };

            return requester.getJSON('https://baas.kinvey.com/user/' + APP_ID + '/' + localStorage.getItem(CURRENT_USER_ID), headers).then(function (response) {
                return response.books;
            });
        }

        function addToCart(book) {
            return getCart().then(function (cart) {
                cart.push(book);
                var headers = {
                    'Authorization': 'Kinvey ' + localStorage.getItem(KEY_STORAGE_AUTH_KEY)
                };

                return requester.getJSON('https://baas.kinvey.com/user/' + APP_ID + '/' + localStorage.getItem(CURRENT_USER_ID), headers).then(function (response) {
                    var body = {
                        books: cart,
                        username: response.username,
                        address: response.address,
                        phone: response.phone,
                        email: response.email
                    };
                    return requester.putJSON('https://baas.kinvey.com/user/' + APP_ID + '/' + localStorage.getItem(CURRENT_USER_ID), body, headers);
                });
            });
        }

        function removeFromCart(book) {
            return getCart().then(function (cart) {
                for (var i = 0; i < cart.length; i += 1) {
                    if (book._id == cart[i]._id) {
                        cart.splice(i, 1);
                        break;
                    }
                }
                var headers = {
                    'Authorization': 'Kinvey ' + localStorage.getItem(KEY_STORAGE_AUTH_KEY)
                };

                return requester.getJSON('https://baas.kinvey.com/user/' + APP_ID + '/' + localStorage.getItem(CURRENT_USER_ID), headers).then(function (response) {
                    var body = {
                        books: cart,
                        username: response.username,
                        address: response.address,
                        phone: response.phone,
                        email: response.email
                    };
                    return requester.putJSON('https://baas.kinvey.com/user/' + APP_ID + '/' + localStorage.getItem(CURRENT_USER_ID), body, headers);
                });
            });
        }

        function clearCart() {
            var headers = {
                'Authorization': 'Kinvey ' + localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            };

            return requester.getJSON('https://baas.kinvey.com/user/' + APP_ID + '/' + localStorage.getItem(CURRENT_USER_ID), headers).then(function (response) {
                var body = {
                    books: [],
                    username: response.username,
                    address: response.address,
                    phone: response.phone,
                    email: response.email
                };

                return requester.putJSON('https://baas.kinvey.com/user/' + APP_ID + '/' + localStorage.getItem(CURRENT_USER_ID), body, headers);
            });
        }

        function getAllBooks() {
            var encodedAppKey = btoa(APP_ID + ':' + APP_KEY),
                headers = {
                'Authorization': 'Basic ' + encodedAppKey
            };

            return requester.getJSON('https://baas.kinvey.com/appdata/' + APP_ID + '/booksDataBase', headers).then(function (response) {
                response.forEach(function (book) {
                    cachedBooks[book._id] = new Book(book.title, book.author, book.category, book.imgUrl, book.price, book.pages, book.description);
                });
                return cachedBooks;
            });
        }

        function getBookById(id) {
            if (cachedBooks[id]) {
                return Promise.resolve(cachedBooks[id]);
            } else {
                var headers = {
                    'Authorization': 'Kinvey ' + localStorage.getItem(KEY_STORAGE_AUTH_KEY)
                };

                return requester.getJSON('https://baas.kinvey.com/appdata/' + APP_ID + '/booksDataBase/' + id, headers).then(function (book) {
                    _cacheBook(book);
                    return book;
                });
            }
        }

        function placeOrder(totalPrice) {
            return getCart().then(function (cart) {
                var body = {
                    userId: localStorage.getItem(CURRENT_USER_ID),
                    books: cart,
                    status: "open",
                    totalPrice: totalPrice
                },
                    headers = {
                    'Authorization': 'Kinvey ' + localStorage.getItem(KEY_STORAGE_AUTH_KEY)
                };

                return requester.postJSON('https://baas.kinvey.com/appdata/' + APP_ID + '/orders', body, headers);
            });
        }

        function getOrdersByUserId() {
            var headers = {
                'Authorization': 'Kinvey ' + localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            };

            return requester.getJSON('https://baas.kinvey.com/appdata/' + APP_ID + '/orders/?query={"userId":"' + localStorage.getItem(CURRENT_USER_ID) + '"}', headers);
        }

        function getCurrentUserData() {
            var headers = {
                'Authorization': 'Kinvey ' + localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            };

            return requester.getJSON('https://baas.kinvey.com/user/' + APP_ID + '/' + localStorage.getItem(CURRENT_USER_ID), headers);
        }

        function updateUserData(body) {
            var headers = {
                'Authorization': 'Kinvey ' + localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            };
            return requester.putJSON('https://baas.kinvey.com/user/' + APP_ID + '/' + localStorage.getItem(CURRENT_USER_ID), body, headers);
        }

        return {
            login: login,
            register: register,
            logout: logout,
            isLoggedIn: isLoggedIn,
            getCart: getCart,
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            getAllBooks: getAllBooks,
            getBookById: getBookById,
            placeOrder: placeOrder,
            clearCart: clearCart,
            getCurrentUserData: getCurrentUserData,
            getOrdersByUserId: getOrdersByUserId,
            updateUserData: updateUserData
        };
    }
};

/* globals dataService templates $ Handlebars console */
"use strict";
var pageController = {
    getInstance: function getInstance(dataService, templates, $) {
        var $mainContainer = $('#container');

        if ($mainContainer.length < 1) {
            throw new Error("No #container found on page!");
        }

        function _changePageHtml(html) {
            $mainContainer.html(html);
        }

        function _toggleButtonsIfLoggedIn() {
            dataService.isLoggedIn().then(function (isLoggedIn) {
                if (isLoggedIn) {
                    $("#logged-in").removeClass('hidden');
                    $("#logged-out").addClass('hidden');
                } else {
                    $("#logged-in").addClass('hidden');
                    $("#logged-out").removeClass('hidden');
                }
            });
        }

        _toggleButtonsIfLoggedIn();

        function home() {
            _toggleButtonsIfLoggedIn();

            templates.compile('products').then(function (html) {
                _changePageHtml(html);
            });

            dataService.getAllBooks().then(function (booksCollection) {
                var booksObject = {
                    books: booksCollection
                };

                return templates.compile('products', booksObject);
            }).then(function (html) {
                _changePageHtml(html);
            });
        }

        function login() {
            templates.compile('login').then(function (html) {
                _changePageHtml(html);

                $('#btn-login').on('click', function () {
                    var user = {
                        username: $('#tb-username').val(),
                        password: $('#tb-password').val()
                    };
                    dataService.login(user).then(function () {
                        toastr.success('User Logged in!');
                        $(location).attr('href', '#/products');
                    }).catch(function (err) {
                        toastr.error(err.responseJSON.description);
                        $(location).attr('href', '#/register');
                    });
                });
            });
        }

        function getAuthors() {
            //TODO: use requester object & move to data.js

            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: url,
                    type: "GET",
                    contentType: "application/json"
                }).done(resolve).fail(reject);
            });
        }

        function search(params) {
            dataService.getAllBooks().then(function (booksObj) {
                var tempBooks = [],
                    searchPattern = decodeURI(params.productName).toLowerCase();

                for (var bookID in booksObj) {
                    tempBooks.push(booksObj[bookID]);
                    tempBooks[tempBooks.length - 1]._id = bookID;
                }

                var filteredBooks = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = tempBooks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var book = _step.value;

                        if (book.title.toLowerCase().indexOf(searchPattern) > 0 || book.author.toLowerCase().indexOf(searchPattern) > 0 || book.category.toLowerCase().indexOf(searchPattern) > 0 || book.description.toLowerCase().indexOf(searchPattern) > 0) {
                            filteredBooks.push(book);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                console.log(tempBooks);
                console.log(filteredBooks);

                var body = {
                    searchValue: decodeURI(params.productName)
                };
                if (filteredBooks.length > 0) {
                    body.books = filteredBooks;
                }

                return templates.compile('search', body);
            }).then(function (html) {
                _changePageHtml(html);
            });
        }

        function categories(params) {
            dataService.getAllBooks().then(function (booksObj) {
                var filteredBooks = [];
                var label = decodeURI(params.category);
                if (params.category == 'all-categories') {
                    for (var bookID in booksObj) {
                        filteredBooks.push(booksObj[bookID]);
                        filteredBooks[filteredBooks.length - 1]._id = bookID;
                    }
                } else {
                    for (var _bookID in booksObj) {
                        if (booksObj[_bookID].category.toLowerCase() == label.toLowerCase()) {
                            filteredBooks.push(booksObj[_bookID]);
                            filteredBooks[filteredBooks.length - 1]._id = _bookID;
                        }
                    }
                }

                var books = {};
                if (filteredBooks.length > 0) {
                    books = {
                        books: filteredBooks
                    };
                }

                if (params.category == 'all-categories') {
                    books.sectionCategory = 'All Categories';
                } else {
                    books.sectionCategory = label.substr(0, 1).toUpperCase() + label.substr(1);
                }

                return templates.compile('category', books);
            }).then(function (html) {
                _changePageHtml(html);
            });
        }

        function productById(params) {
            var targetBook = void 0;
            dataService.getBookById(params.id).then(function (book) {
                targetBook = book;
                book.pageUrl = encodeURIComponent(window.location.href);
                return templates.compile('book-instance', book);
            }).then(function (html) {
                _changePageHtml(html);
                $('#btn-add-to-cart').on('click', function () {
                    if (dataService.isLoggedIn()) {
                        dataService.addToCart(targetBook).then(function (res, err) {
                            if (!err) {
                                toastr.success('Book added to cart!');
                            }
                        }).catch(function (err) {
                            toastr.error(err.responseJSON.description + ". Please log in!");
                        });
                    } else {
                        throw new Error('You must be logged in to add a book to the cart!');
                    }
                });
            }).catch(function (err) {
                toastr.error(err);
            });
        }

        function about() {
            templates.compile('about').then(function (html) {
                _changePageHtml(html);
            });
        }

        function contacts() {
            templates.compile('contacts').then(function (html) {
                _changePageHtml(html);
            });
        }

        return {
            home: home,
            search: search,
            categories: categories,
            productById: productById,
            about: about,
            contacts: contacts
        };
    }
};

if (typeof window === 'undefined') {
    module.exports = pageController.getInstance;
}

/* globals $ Promise */
"use strict";
var requester = {
    getInstance: function getInstance(asyncEngine) {
        return {
            get: function get(url) {
                return new Promise(function (resolve, reject) {
                    asyncEngine.ajax({
                        url: url,
                        method: "GET",
                        success: function success(response) {
                            resolve(response);
                        },
                        error: function error(err) {
                            reject(err);
                        }
                    });
                });
            },
            putJSON: function putJSON(url, body) {
                var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                return new Promise(function (resolve, reject) {
                    asyncEngine.ajax({
                        url: url,
                        headers: headers,
                        method: "PUT",
                        contentType: "application/json",
                        data: JSON.stringify(body),
                        success: function success(response) {
                            resolve(response);
                        },
                        error: function error(err) {
                            reject(err);
                        }
                    });
                });
            },
            postJSON: function postJSON(url, body) {
                var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                return new Promise(function (resolve, reject) {
                    asyncEngine.ajax({
                        url: url,
                        headers: headers,
                        method: "POST",
                        contentType: "application/json",
                        data: JSON.stringify(body),
                        success: function success(response) {
                            resolve(response);
                        },
                        error: function error(err) {
                            reject(err);
                        }
                    });
                });
            },
            getJSON: function getJSON(url) {
                var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                return new Promise(function (resolve, reject) {
                    asyncEngine.ajax({
                        url: url,
                        method: "GET",
                        headers: headers,
                        contentType: "application/json",
                        success: function success(response) {
                            resolve(response);
                        },
                        error: function error(err) {
                            reject(err);
                        }
                    });
                });
            }
        };
    }
};

if (typeof window === 'undefined') {
    module.exports = requester.getInstance;
}
// export { requester }

var templates = {
    getInstance: function getInstance(requester, templateEngine) {
        "use strict";

        var cachedTemplates = {};

        function _get(name) {
            if (cachedTemplates[name]) {
                return Promise.resolve(cachedTemplates[name]);
            } else {
                var _url = './templates/' + name + '.handlebars';

                return requester.get(_url).then(function (template) {
                    cachedTemplates[name] = template;
                    return Promise.resolve(template);
                });
            }
        }

        function compile(templateName, data) {
            var result = _get(templateName).then(function (template) {
                var templateFunction = templateEngine.compile(template);
                return templateFunction(data);
            });

            return result;
        }

        return {
            compile: compile
        };
    }
};

if (typeof window === 'undefined') {
    module.exports = templates;
}

/* globals dataService templates $ Handlebars console */
"use strict";
var userController = {
    getInstance: function getInstance(dataService, templates, $) {
        var $mainContainer = $('#container');

        if ($mainContainer.length < 1) {
            throw new Error("No #container found on page!");
        }

        function _changePageHtml(html) {
            $mainContainer.html(html);
        }

        function _toggleButtonsIfLoggedIn() {
            dataService.isLoggedIn().then(function (isLoggedIn) {
                if (isLoggedIn) {
                    $("#logged-in").removeClass('hidden');
                    $("#logged-out").addClass('hidden');
                } else {
                    $("#logged-in").addClass('hidden');
                    $("#logged-out").removeClass('hidden');
                }
            });
        }

        _toggleButtonsIfLoggedIn();

        function cart() {
            var totalPrice = 0;
            dataService.getCart().then(function (booksInCart) {
                booksInCart.forEach(function (book) {
                    totalPrice += book._price;
                });

                var data = {};
                if (booksInCart.length > 0) {
                    totalPrice = Math.round(totalPrice * 100) / 100;
                    data = {
                        books: booksInCart,
                        totalPrice: totalPrice
                    };
                }
                return templates.compile('cart', data);
            }).then(function (html) {
                _changePageHtml(html);

                $('.remove-from-cart').click(function (ev) {
                    var bookId = $(ev.target).attr('data-book-id');
                    dataService.getBookById(bookId).then(function (book) {
                        return dataService.removeFromCart(book);
                    }).then(function () {
                        cart();
                    });
                });

                $('#checkout-btn').click(function (ev) {
                    dataService.placeOrder(totalPrice).then(function () {
                        toastr.success("Order has been successfully placed!");
                        return dataService.clearCart();
                    }).then(function () {
                        $(location).attr('href', '#/products');
                    }).catch(function (err) {
                        toastr.error(err.responseJSON.description);
                    });
                });
            });
        }

        function login() {
            templates.compile('login').then(function (html) {
                _changePageHtml(html);

                $('#btn-login').on('click', function () {
                    var user = {
                        username: $('#tb-username').val().trim(),
                        password: $('#tb-password').val().trim()
                    };
                    dataService.login(user).then(function () {
                        toastr.success('User Logged in!');
                        $(location).attr('href', '#/products');
                    }).catch(function (err) {
                        toastr.error(err.responseJSON.description);
                        $('#tb-username').val('');
                        $('#tb-password').val('');
                    });
                });
            });
        }

        function register() {
            templates.compile('register').then(function (html) {
                _changePageHtml(html);

                $('#btn-register').on('click', function (ev) {

                    if (!$('#register-form')[0].checkValidity || $('#register-form')[0].checkValidity()) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        var user = {
                            username: $('#tb-username').val(),
                            password: $('#tb-password').val(),
                            email: $('#tb-email').val(),
                            phone: $('#tb-phone').val(),
                            address: $('#tb-address').val(),
                            books: []
                        };

                        dataService.register(user).then(function () {
                            toastr.success('User registered!');
                            $(location).attr('href', '#/login');
                        }).catch(function (err) {
                            toastr.error(err.responseJSON.description);
                        });
                    } else {
                        toastr.error("Please fill out all fields correctly!");
                    }
                });
            });
        }

        function logout() {
            dataService.logout().then(function () {
                toastr.success('User Logged out!');
                $(location).attr('href', '#/products');
            });
        }

        function profile() {
            var userData = void 0,
                orderData = void 0;

            Promise.all([dataService.getCurrentUserData(), dataService.getOrdersByUserId()]).then(function (values) {
                userData = values[0], orderData = values[1];
                return { user: userData, orders: orderData };
            }).then(function (data) {
                return templates.compile('profile', data);
            }).then(function (html) {
                _changePageHtml(html);

                $('#submit-user-data').click(function (ev) {
                    var $form = $('#profile-form')[0];
                    if (!$form.checkValidity || $form.checkValidity()) {
                        userData.address = $('#user-address-input').val();
                        userData.phone = $('#user-phone-input').val();

                        dataService.updateUserData(userData).then(function () {
                            $(location).attr('href', '#/products');
                            toastr.success('Your profile information has been updated!');
                        }).catch(function (err) {
                            toastr.error(err.responseJSON.description);
                        });
                    }
                });
            }).catch(function (err) {
                toastr.error(err.responseJSON.description);
            });
        }

        return {
            login: login,
            register: register,
            logout: logout,
            profile: profile,
            cart: cart
        };
    }
};
/* globals Navigo controllers $ dataService document templates requester*/
"use strict";
// import {templates} from 'templates';
// import {dataService} from 'dataService';
// import {controllers} from 'controllers';
// import {requester} from 'requester';

var requesterInstance = requester.getInstance($);
var templateInstance = templates.getInstance(requesterInstance, Handlebars);
var dataServiceInstance = dataService.getInstance(requesterInstance);
var router = new Navigo(null, true);

var userControllerInstance = userController.getInstance(dataServiceInstance, templateInstance, $);
var pageControllerInstance = pageController.getInstance(dataServiceInstance, templateInstance, $);

router.on('/products', pageControllerInstance.home).on("/login", userControllerInstance.login).on('/register', userControllerInstance.register).on("/logout", userControllerInstance.logout).on("/profile", userControllerInstance.profile).on("/cart", userControllerInstance.cart).on("/search/:productName", pageControllerInstance.search).on("/products/:category", pageControllerInstance.categories).on("/products/review/:id", pageControllerInstance.productById)
// .on("/authors", pageControllerInstance.authors)
.on("/about", pageControllerInstance.about).on("/contacts", pageControllerInstance.contacts).on("/home", function () {
    router.navigate("/products");
}).on("/", function () {
    router.navigate("/products");
}).on("", function () {
    router.navigate("/products");
}).resolve();

$('#btn-search').on('click', function () {
    var searchBar = $('#search-bar'),
        searchValue = encodeURI(searchBar.val().trim());
    if (!searchValue) {
        return;
    }
    router.navigate('/search/' + searchValue);
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

//# sourceMappingURL=book-store-compiled.js.map