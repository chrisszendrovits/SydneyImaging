define(["jquery", "preloader", "imageLoader", "gallery"], function ($, preloader, imageLoader, gallery) {

    var NavMenu = (function () {

        this.activeNavItem = null;
        this.gallery = null;
        this.imageLoader = null;

        function NavMenu(loader, gallery) {
            this.imageLoader = loader;
            this.gallery = gallery;
        }

        NavMenu.prototype.init = function () {
            $(".expandable").hover(function () {
                var chevron = $(this).next();
                $(chevron).css('color', '#DCDCDC');
            }, function () {
                var chevron = $(this).next();
                $(chevron).css('color', '#FFF');
            });
        };

        NavMenu.prototype.setActiveNavItem = function (id) {
            $('#' + this.activeNavItem).toggleClass('active');
            this.activeNavItem = id;
            $('#' + this.activeNavItem).toggleClass('active');
        };

        NavMenu.prototype.expandItemClick = function (navItem) {
            var subMenu = $(navItem).siblings('#subMenu');

            if (subMenu != undefined) {
                $(subMenu).toggle('slow');
            }

            var iconDown = "fa-chevron-down", iconUp = "fa-chevron-up";
            var chevronIcon = $(navItem).next().children().first();

            $(chevronIcon).toggleClass(iconDown);
            $(chevronIcon).toggleClass(iconUp);
        };

        NavMenu.prototype.portfolioItemClick = function (itemType, id) {

            this.setActiveNavItem(id);
            var _app = this;
            var promise = _app.imageLoader.loadImagesFromJson("data/" + itemType + "_image_list.json");

            promise.then(
                function (result) {
                    var image = _app.imageLoader.images[_app.gallery.sliderIndex = 0]
                    _app.gallery.sliderImageSwap(image);
                    _app.gallery.show();
                    $('#normalPageItem').css('display', 'none');
                },
                function (result) {
                    alert(result);
                });
        };

        NavMenu.prototype.pageItemClick = function (pageType, id) {
            this.setActiveNavItem(id);
            this.gallery.hide();
            $('#normalPageItem').load(pageType + '.html');
            $('#normalPageItem').css('display', 'inline');
        };

        return NavMenu;
    }());

    return new NavMenu(imageLoader, gallery);
});