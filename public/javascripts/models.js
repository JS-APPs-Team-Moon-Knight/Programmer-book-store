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