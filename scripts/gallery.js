define(["jquery", "imageLoader"], function ($, imageLoader) {

    var Gallery = (function () {

        this.imageLoader = null;
        this.sliderIndex = 0;
        this.sliderIconSet = false;
        this.autoScale = false;

        function Gallery(imgLoader, autoScale) {
            this.imageLoader = imgLoader;
            this.autoScale = autoScale;
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
            var imageElement = $('#sliderImage'), container = $('#slider');
            container.removeClass("hideSlider");
            var _app = this;

            var dimensions = _app.getImageDimensions(
                parseInt(image.width, 10),
                parseInt(image.height, 10),
                container.width(),
                $(window).height(),
                true);

            dimensions.height -= 10

            var imageWidth = image.width, imageHeight = image.height;

            if (this.autoScale) {
                imageWidth = dimensions.width;
                imageHeight = dimensions.height;
            }

            imageElement.fadeOut('normal', function () {
                imageElement.attr('src', image.filename);
                imageElement.attr('alt', image.description);
                imageElement.attr('width', imageWidth);
                imageElement.attr('height', imageHeight);
                imageElement.css("left", dimensions.targetleft);
                imageElement.css("top", dimensions.targettop);
                imageElement.attr('data-index', _app.sliderIndex);
                imageElement.click(function (event) {
                    _app.loadThumbnails();
                    _app.toggleSlider();
                });
                imageElement.fadeIn('fast');
            });

            if (!this.sliderIconSet) {
                var gallery = $('#gallery'), iconLeft = $('.sliderIconLeft'), iconRight = $('.sliderIconRight');

                iconLeft.css("left", ($(window).width() - gallery.width()) + 10);
                iconLeft.css("top", dimensions.height / 2);
                iconRight.css("left", $(window).width() - 50);
                iconRight.css("top", dimensions.height / 2);

                this.sliderIconSet = true;
            }
        };

        Gallery.prototype.getImageDimensions = function (srcwidth, srcheight, targetwidth, targetheight, fLetterBox) {

            var result = { width: 0, height: 0, fScaleToTargetWidth: true };

            if ((srcwidth <= 0) || (srcheight <= 0) || (targetwidth <= 0) || (targetheight <= 0)) {
                return result;
            }

            // scale to the target width
            var scaleX1 = targetwidth;
            var scaleY1 = (srcheight * targetwidth) / srcwidth;

            // scale to the target height
            var scaleX2 = (srcwidth * targetheight) / srcheight;
            var scaleY2 = targetheight;

            // now figure out which one we should use
            var fScaleOnWidth = (scaleX2 > targetwidth);
            if (fScaleOnWidth) {
                fScaleOnWidth = fLetterBox;
            }
            else {
                fScaleOnWidth = !fLetterBox;
            }

            if (fScaleOnWidth) {
                result.width = Math.floor(scaleX1);
                result.height = Math.floor(scaleY1);
                result.fScaleToTargetWidth = true;
            }
            else {
                result.width = Math.floor(scaleX2);
                result.height = Math.floor(scaleY2);
                result.fScaleToTargetWidth = false;
            }
            result.targetleft = Math.floor((targetwidth - result.width) / 2);
            result.targettop = Math.floor((targetheight - result.height) / 2);

            return result;
        };

        Gallery.prototype.calculateThumbnailHeight = function (imageWidth, imageHeight, thumbnailWidth) {
            return (imageHeight / imageWidth) * thumbnailWidth;
        };

        Gallery.prototype.loadThumbnails = function () {
            var _app = this;

            $.each(_app.imageLoader.images, function (index, item) {
                var thumbnailHeight = _app.calculateThumbnailHeight(item.width, item.height, 400);
                var floatValue = 'left', marginAttr = 'margin-left';

                if (index % 2) {
                    floatValue = 'right';
                    marginAttr = 'margin-right';
                }

                var markup = "<img src='" + item.thumbnail +
                                "' id='thumbnail_" + index +
                                "' class='thumbnailImage'" +
                                "' height='" + thumbnailHeight +
                                "' alt='" + item.description + "' />";

                var img = $(markup);
                img.attr('data-index', index);
                img.css('float', floatValue);
                img.css(marginAttr, '10px');
                img.click(function (event) {
                    var index = event.currentTarget.dataset.index;
                    _app.sliderImageSwap(_app.imageLoader.images[index]);
                    _app.toggleSlider();
                });
                $('#thumbnails').append(img);
            });
        };

        Gallery.prototype.toggleSlider = function () {
            var slider = $('#slider'), thumbnails = $('#thumbnails');

            if (slider.is(':visible')) {
                slider.fadeOut('normal', function () {
                    thumbnails.fadeIn('fast');
                });
            }
            else {
                thumbnails.fadeOut('normal', function () {
                    slider.fadeIn('fast');
                });
            }
        };

        Gallery.prototype.toggleGallery = function (showGallery) { 
            var slider = $('#slider'), thumbnails = $('#thumbnails');

            if (showGallery == true) {
                slider.removeClass('hideSlider');
                slider.addClass('hideThumbnails');
            }
            else {
                slider.addClass('hideSlider');
                slider.addClass('hideThumbnails');
            }
        };

        return Gallery;

    }());

    return new Gallery(imageLoader, true); // autoScale = true
});