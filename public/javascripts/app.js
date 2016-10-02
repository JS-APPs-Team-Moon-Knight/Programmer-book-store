/* globals Navigo controllers $ dataService document templates requester*/
"use strict";
// import {templates} from 'templates';
// import {dataService} from 'dataService';
// import {controllers} from 'controllers';
// import {requester} from 'requester';

let requesterInstance = requester.getInstance($);
let templateInstance = templates(requesterInstance, Handlebars);
let dataServiceInstance = dataService.getInstance(requesterInstance);
let router = new Navigo(null, true);

let controller = controllers.getInstance(dataServiceInstance, templateInstance);

router
    .on('/products', controller.home)
    .on("/login", controller.login)
    .on('/register', controller.register)
    .on("/logout", controller.logout)
    .on("/profile", controller.profile)
    .on("/cart", controller.cart)
    .on("/search/:productName", controller.search)
    .on("/products/:category", controller.categories)
    .on("/products/review/:id", controller.productById)
    .on("/about", controller.about)
    .on("/contacts", controller.contacts)
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
})