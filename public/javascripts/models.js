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
        this._tilte = value;
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
    constructor(name,description) {
        this.name=name;
        this.description=description;
        this._books=[];
    }
    get name() {
        return this._name;
    }
    set name(name) {
        if(typeof name !=="string") {
            throw new Error("Name must be a string.");
        }
        this._name=name;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        if(typeof description !=="string") {
            throw new Error("Description must be a string.");
        }
        if(description.length <=10 && description.length >50) {
            throw new Error("Description must be between 10 and 50 symbols long.");
        }
        this._description=description;
    }
    get books() {
        return this._books;
    }
    set books(value) {
        throw new Error("Books cannot be changed.Use add remove or removeAll methods instead.");
    }
    add(book) {
        if(!(book instanceof Book)) {
            throw new Error("Only books can be added.");
        }
        else this.books.push(book);
    }
    remove(book) {
        var index = this.books.indexOf(book);
        if(index < 0) {
            throw new Error("Book not found.");
        }
        this.books.splice(index,1);
    }
    removeAll() {
        this._books = [];
    }
}