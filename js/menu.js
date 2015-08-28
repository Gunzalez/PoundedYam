(function ($, window) {

    var pydMenu = pydMenu || {};

    pydMenu.menu = {
        $html: $('#main-navigation'),
        $button: $('.btn-menu', this.html),
        $list: $('.menu', this.html)
    };

    pydMenu.utils = {
        swapClass: function($obj, classOff, classOn){
            $obj.removeClass(classOff).addClass(classOn);
        }
    };

    pydMenu.props = {
        isOpen: false,
        cssClass: 'menu-out',
        winWidth: $(window).width(),
        winHeight: $(window).height(),
        initialButtonPos: 15,
        spaceOnLeft: 70,
        clickDelay: 300
    };

    pydMenu.actions = {

        positionMenu: function(){
            pydMenu.props.winWidth = $(window).width();
            pydMenu.props.winHeight = $(window).height();
            pydMenu.menu.$list.width(pydMenu.props.winWidth - pydMenu.props.spaceOnLeft).height(pydMenu.props.winHeight).css({
                left: pydMenu.props.winWidth + pydMenu.props.initialButtonPos
            });
        },

        menuSlideOut: function(){
            $('body').addClass(pydMenu.props.cssClass);
            pydMenu.menu.$list.css({
                left: pydMenu.props.winWidth - pydMenu.menu.$list.width(),
                height: $(window).height()
            });
            pydMenu.menu.$button.css({
                right: pydMenu.menu.$list.width() + pydMenu.props.initialButtonPos
            });

            // gets active menu option from Angular
            var activeTemplate = $('ul', pydMenu.menu.$list).attr('class');
            $('.active', pydMenu.menu.$list).removeClass('active');
            $('a.'+activeTemplate, pydMenu.menu.$list).addClass('active');

            // Empty the search field
            $('.search', pydMenu.menu.$list).val('');

            $('#wrap').css({
                height: $(window).height(),
                overflow: 'hidden'
            });

        },

        menuSlideIn: function(){
            $('body').removeClass(pydMenu.props.cssClass);
            pydMenu.menu.$list.css({
                left: pydMenu.props.winWidth + pydMenu.props.initialButtonPos
            });
            pydMenu.menu.$button.css({
                right: pydMenu.props.initialButtonPos
            });

            $('#wrap').removeAttr('style');
        },

        clickToCloseDiv: function(flag){
            if(flag){
                var $clickSheet = $('<a href="#" class="clickToClose"></a>');
                $("#wrap").before($clickSheet);
            } else {
                $('.clickToClose').remove();
            }
        },

        menuReset: function(){
            pydMenu.menu.$list.height($(window).height());

            var $icon = $('span', pydMenu.menu.$button);
            pydMenu.actions.positionMenu();
            pydMenu.actions.menuSlideIn();
            pydMenu.props.isOpen = false;
            pydMenu.utils.swapClass($icon, 'icon-cancel', 'icon-menu');
            pydMenu.actions.clickToCloseDiv(false);

            var $contentBox = $('.detail-container .box');
            if($contentBox.length > 0){
                $contentBox.height($(window).height() - 184);
            }
        },

        alertUserOrientation: function(flag){
            if(flag){
                $('.changeOrientationMsg').remove();
                var $changeOrientationMsg = $("<div class='changeOrientationMsg' />"),
                    $imageryDiv = $("<div class='rotateImage' />");
                $changeOrientationMsg.width(window.innerWidth).height(window.innerHeight);
                $changeOrientationMsg.append($imageryDiv.width(window.innerWidth).height(window.innerHeight));
                $('body').append($changeOrientationMsg);
                $changeOrientationMsg.insertAfter("#wrap");
            } else {
                $('.changeOrientationMsg').remove();
            }
        }
    };

    pydMenu.init = function(){

        pydMenu.actions.positionMenu();

        $('a', pydMenu.menu.$list).on('click', function(evt){
            evt.preventDefault();

            var destination = this.href.split('#')[1],
                curLocation = location.hash.split('#')[1];
            if(destination != curLocation){
                pydMenu.menu.$button.trigger('click');
                var delayed = setTimeout(function(){
                    location.hash = destination;
                    clearTimeout(delayed);
                }, pydMenu.props.clickDelay);
            }
        });

        pydMenu.menu.$button.on('click', function (evt) {
            evt.preventDefault();

            var $icon = $('span', pydMenu.menu.$button);
            if(!pydMenu.props.isOpen){
                pydMenu.actions.menuSlideOut();
                pydMenu.props.isOpen = true;
                pydMenu.utils.swapClass($icon, 'icon-menu', 'icon-cancel');
                pydMenu.actions.clickToCloseDiv(true);
            } else {
                pydMenu.actions.menuSlideIn();
                pydMenu.props.isOpen = false;
                pydMenu.utils.swapClass($icon, 'icon-cancel', 'icon-menu');
                pydMenu.actions.clickToCloseDiv(false);
            }
        });

        $('body').on('click', '.clickToClose', function(evt){
            evt.preventDefault();
            pydMenu.menu.$button.trigger('click');
        });

        $('.title', pydMenu.menu.$list).on('click', function(evt){
            evt.preventDefault();
            pydMenu.menu.$button.trigger('click');
        });

        $('body').on('click', '.btn-back', function(evt){
            evt.preventDefault();
            history.back();
        });

        $(window).on('resize', function(){
            pydMenu.actions.menuReset();
            if(window.innerWidth >= window.innerHeight){
                pydMenu.actions.alertUserOrientation(true);
            } else {
                pydMenu.actions.alertUserOrientation(false);
            }
        });

        $(window).on('scroll', function(){
            pydMenu.menu.$list.css({
                height: $(window).height()
            });
        });

        $(window).on("orientationchange", function(){
            if(window.orientation != 0){
                pydMenu.actions.alertUserOrientation(true);
            } else {
                pydMenu.actions.alertUserOrientation(false);
            }
        });

        if(window.innerWidth >= window.innerHeight){
            pydMenu.actions.alertUserOrientation(true);
        } else {
            pydMenu.actions.alertUserOrientation(false);
        }

    };

    pydMenu.init();

}(jQuery, window));
