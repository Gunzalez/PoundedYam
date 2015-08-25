(function ($, window) {

    var pydMenu = {};

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
        initialButtonPos: 20,
        spaceOnLeft: 80,
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
                left: pydMenu.props.winWidth - pydMenu.menu.$list.width()
            });
            pydMenu.menu.$button.css({
                right: pydMenu.menu.$list.width() + pydMenu.props.initialButtonPos
            });

            var activeTemplate = $('ul', pydMenu.menu.$list).attr('class');
            console.log(activeTemplate);
            $('.active', pydMenu.menu.$list).removeClass('active');
            $('a.'+activeTemplate, pydMenu.menu.$list).addClass('active');
        },

        menuSlideIn: function(){
            $('body').removeClass(pydMenu.props.cssClass);
            pydMenu.menu.$list.css({
                left: pydMenu.props.winWidth + pydMenu.props.initialButtonPos
            });
            pydMenu.menu.$button.css({
                right: pydMenu.props.initialButtonPos
            })
        },

        clickToClose: function(flag){
            if(flag){
                var $clickSheet = $('<a href="#" class="clickToClose"></a>');
                $("#wrap").before($clickSheet);
            } else {
                $('.clickToClose').remove();
            }
        },


        menuReset: function(){
            var $icon = $('span', pydMenu.menu.$button);
            pydMenu.actions.positionMenu();
            pydMenu.actions.menuSlideIn();
            pydMenu.props.isOpen = false;
            pydMenu.utils.swapClass($icon, 'icon-cancel', 'icon-menu');
            pydMenu.actions.clickToClose(false);

            var $contentBox = $('.detail-container .box');
            if($contentBox.length > 0){
                $contentBox.height($(window).height() - 184);
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
                pydMenu.actions.clickToClose(true);
            } else {
                pydMenu.actions.menuSlideIn();
                pydMenu.props.isOpen = false;
                pydMenu.utils.swapClass($icon, 'icon-cancel', 'icon-menu');
                pydMenu.actions.clickToClose(false);
            }
        });

        $('body').on('click', '.clickToClose', function(evt){
            evt.preventDefault();
            pydMenu.menu.$button.trigger('click');
        });


        $(window).on('resize', function(){
            pydMenu.actions.menuReset();
        });

        $(window).on('scroll', function(){
            pydMenu.actions.menuReset();
        })

    };

    pydMenu.init();

}(jQuery, window));
