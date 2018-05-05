define(["jquery", "imageLoader"], function ($, imageLoader) {

    var Gallery = (function () {

        this.imageLoader = null;
        this.sliderIndex = 0;

        function Gallery(imgLoader) {
            this.imageLoader = imgLoader;
        }

        Gallery.prototype.sliderClick = function (direction) {
            if (direction == 'left') {
                this.sliderIndex--;
            }
            else {
                this.sliderIndex++;
            }

            if (this.sliderIndex < 0) {
                this.sliderIndex = 0;
            }
            else if (this.sliderIndex >= this.imageLoader.images.length) {
                this.sliderIndex = this.imageLoader.images.length - 1;
            }
            else {
                this.sliderImageSwap(this.imageLoader.images[this.sliderIndex]);
            }
        };

        Gallery.prototype.sliderImageSwap = function (image) {
            var imageElement = $('#sliderImage');
            var _app = this;

            imageElement.fadeOut('normal', function () {
                imageElement.attr('src', image.filename);
                imageElement.attr('width', image.width);
                imageElement.attr('height', image.height);
                imageElement.attr('alt', image.description);
                imageElement.attr('data-index', _app.sliderIndex);
                imageElement.click(function (event) {
                    _app.loadThumbnails();
                    _app.toggleSlider();
                });
                imageElement.fadeIn('fast');
            });
        };

        Gallery.prototype.loadThumbnails = function () {
            var _app = this;

            $.each(_app.imageLoader.images, function (index, item) {

                var markup = "<img src='" + item.thumbnail +
                                "' width='" + item.thumbnailWidth +
                                "' height='" + item.thumbnailHeight +
                                "' alt='" + item.description + "' />";

                var img = $(markup);
                img.attr('data-index', index);
                img.click(function (event) {
                    var index = event.currentTarget.dataset.index;
                    _app.sliderImageSwap(_app.imageLoader.images[index]);
                    _app.toggleSlider();
                });
                //img.attr('src', responseObject.imgurl);
                //img.appendTo('#imagediv');

                $('#thumbnails').append(img);
            });
        };

        Gallery.prototype.toggleSlider = function () {
            var slider = $('#slider'), thumbnails = $('#thumbnails');

            if (slider.is(':visible')) {
                slider.fadeOut('normal', function () {
                    slider.addClass('hide');
                    slider.css('display', 'none');
                    thumbnails.removeClass('hide');
                    thumbnails.css('display', 'inline-block');
                    thumbnails.fadeIn('fast');
                });
            }
            else {
                thumbnails.fadeOut('normal', function () {
                    thumbnails.addClass('hide');
                    thumbnails.css('display', 'none');
                    slider.removeClass('hide');
                    slider.css('display', 'inline-block');
                    slider.fadeIn('fast');
                });
            }
        };

        Gallery.prototype.show = function () {
            $('#gallery').css('display', 'inline');
        };

        Gallery.prototype.hide = function () {
            $('#gallery').css('display', 'none');
        };

        return Gallery;

    }());

    return new Gallery(imageLoader);
});