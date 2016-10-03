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
