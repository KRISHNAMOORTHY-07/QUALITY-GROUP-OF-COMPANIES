!function(e) {
    "use strict";
    e(window).on("load", function() {
        e(".preloader").fadeOut(1e3)
    }),
    e(document).ready(function() {
        e("a[data-rel^=lightcase]").lightcase();
        var i = e(".bg-white");
        e(window).on("scroll", function() {
            e(this).scrollTop() > 10 ? (i.addClass("menu-fixed animated fadeInDown"),
            i.removeClass("slideInUp"),
            e("body").addClass("body-padding")) : (i.removeClass("menu-fixed fadeInDown"),
            i.addClass("slideInUp"),
            e("body").removeClass("body-padding"))
        }),
        e(window).on("scroll", function() {
            e(this).scrollTop() > 200 ? e(".scrollToTop").fadeIn() : e(".scrollToTop").fadeOut()
        }),
        e(".scrollToTop").on("click", function() {
            return e("html, body").animate({
                scrollTop: 0
            }, 700),
            !1
        }),
        e(document).on("click", ".search-cart .search a, .search-close", function() {
            e(".search-area").toggleClass("open")
        }),
        e(".main-menu>li>.submenu, .mega-menu").parent("li").children("a").addClass("dd-icon-down"),
        e(".m-menu>li>.m-submenu").parent("li").children("a").addClass("dd-icon-down"),
        e(".main-menu>li>.submenu .submenu").parent("li").children("a").addClass("dd-icon-right"),
        e(".m-menu>li>.m-submenu .m-submenu").parent("li").children("a").addClass("dd-icon-down"),
        e(".shop-menu>li .shop-submenu").parent("li").children("a").addClass("dd-icon-down"),
        e(document).on("click", ".header-bar", function() {
            e(".header-bar").toggleClass("close"),
            e(".menu").toggleClass("open")
        }),
        e(".mobile-menu-area .m-menu li a").on("click", function(i) {
            var n = e(this).parent("li");
            n.hasClass("open") ? (n.removeClass("open"),
            n.find("li").removeClass("open"),
            n.find("ul").slideUp(1e3, "swing")) : (n.addClass("open"),
            n.children("ul").slideDown(1e3, "swing"),
            n.siblings("li").children("ul").slideUp(1e3, "swing"),
            n.siblings("li").removeClass("open"),
            n.siblings("li").find("li").removeClass("open"),
            n.siblings("li").find("ul").slideUp(1e3, "swing"))
        }),
        e("ul").parent().on("hover", function() {
            var i = e(this).find("ul");
            if (e(i).offset().left + i.width() > e(window).width()) {
                var n = -e(i).width();
                i.css({
                    left: n
                })
            }
        }),
        e(".scrollToTop").on("click", function() {
            return e("html, body").animate({
                scrollTop: 0
            }, 1e3),
            !1
        });
        new Swiper(".portfolio-container",{
            slidesPerView: 3,
            spaceBetween: 25,
            freeMode: !0,
            loop: !0,
            autoplay: {
                delay: 2e3,
                disableOnInteraction: !1
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: !0
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3
                },
                768: {
                    slidesPerView: 2
                },
                575: {
                    slidesPerView: 1
                }
            }
        }),
        new Swiper(".testimonial-slider",{
            spaceBetween: 300,
            navigation: {
                nextEl: ".testi-next",
                prevEl: ".testi-prev"
            },
            pagination: {
                el: ".testi-pagination",
                clickable: !0
            },
            speed: 500,
            autoplay: {
                delay: 5e3,
                disableOnInteraction: !0
            },
            loop: !0
        }),
        new Swiper(".clients-container",{
            autoplay: !0,
            navigation: {
                nextEl: ".client-button-next",
                prevEl: ".client-button-prev"
            }
        }),
        new Swiper(".sponsor-container",{
            slidesPerView: 6,
            speed: 1e3,
            autoplay: 1e3,
            autoplay: !0,
            loop: !0,
            freeMode: !0,
            breakpoints: {
                1024: {
                    slidesPerView: 5
                },
                768: {
                    slidesPerView: 4
                },
                576: {
                    slidesPerView: 3
                },
                425: {
                    slidesPerView: 2
                }
            }
        });
        e(window).on("scroll", function() {
            var e = new Swiper(".gallery-thumbs",{
                slidesPerView: 5,
                freeMode: !0,
                autoplay: !0,
                loop: !0,
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                breakpoints: {
                    1100: {
                        slidesPerView: 5
                    },
                    1024: {
                        slidesPerView: 4
                    },
                    768: {
                        slidesPerView: 4
                    },
                    576: {
                        slidesPerView: 6
                    },
                    575: {
                        slidesPerView: 6
                    },
                    425: {
                        slidesPerView: 4
                    },
                    375: {
                        slidesPerView: 4
                    },
                    320: {
                        slidesPerView: 3
                    }
                }
            });
            new Swiper(".gallery-top",{
                autoplay: !0,
                loop: !0,
                spaceBetween: 10,
                navigation: {
                    nextEl: ".product-button-next",
                    prevEl: ".product-button-prev"
                },
                thumbs: {
                    swiper: e
                }
            })
        }),
        e(".container").imagesLoaded(function() {
            e(".portfolio-menu").on("click", ".button", function() {
                var n = e(this).attr("data-filter");
                i.isotope({
                    filter: n
                })
            }),
            e(".button-group").each(function(i, n) {
                var s = e(n);
                s.on("click", ".button", function() {
                    s.find(".is-checked").removeClass("is-checked"),
                    e(this).addClass("is-checked")
                })
            });
            var i = e(".grid").isotope({
                itemSelector: ".grid-item",
                percentPosition: !0,
                masonry: {
                    columnWidth: 1
                }
            })
        }),
        e(".counter").counterUp({
            delay: 10,
            time: 1e3
        }),
        e(".countdown-list").each(function() {
            e("[data-countdown]").each(function() {
                var i = e(this)
                  , n = e(this).data("countdown");
                i.countdown(n, function(i) {
                    e(this).html(i.strftime('<li class="timer-item days"><strong>%D</strong><small>days</small></li><li class="timer-item hours"><strong>%H</strong><small>hours</small></li><li class="timer-item mins"><strong>%M</strong><small>mins</small></li><li class="timer-item sec"><strong>%S</strong><small>sec</small></li>'))
                })
            })
        }),
        e(function() {
            e(".product-view-mode").on("click", "a", function(i) {
                i.preventDefault();
                var n = e(".shop-product-wrap")
                  , s = e(this).data("target");
                e(".product-view-mode a").removeClass("active"),
                e(this).addClass("active"),
                n.removeClass("grid list").addClass(s)
            })
        }),
        e(function() {
            e(".view-modal").on("click", function() {
                e(".modal").addClass("show")
            }),
            e(".close").on("click", function() {
                e(".modal").removeClass("show")
            })
        }),
        e(function() {
            e(".shop-widget .shop-menu li a").on("click", function(i) {
                var n = e(this).parent("li");
                n.hasClass("open") ? (n.removeClass("open"),
                n.find("li").removeClass("open"),
                n.find("ul").slideUp(1e3, "swing")) : (n.addClass("open"),
                n.children("ul").slideDown(1e3, "swing"),
                n.siblings("li").children("ul").slideUp(1e3, "swing"),
                n.siblings("li").removeClass("open"),
                n.siblings("li").find("li").removeClass("open"),
                n.siblings("li").find("ul").slideUp(1e3, "swing"))
            })
        }),
        e(function() {
            var i = e(".cart-plus-minus");
            i.prepend('<div class="dec qtybutton">-</div>'),
            i.append('<div class="inc qtybutton">+</div>'),
            e(".qtybutton").on("click", function() {
                var i = e(this)
                  , n = i.parent().find("input").val();
                if ("+" === i.text())
                    var s = parseFloat(n) + 1;
                else if (n > 0)
                    s = parseFloat(n) - 1;
                else
                    s = 1;
                i.parent().find("input").val(s)
            })
        }),
        e("ul.review-nav").on("click", "li", function(i) {
            i.preventDefault();
            var n = e(".review-content")
              , s = e(this).data("target");
            e("ul.review-nav li").removeClass("active"),
            e(this).addClass("active"),
            n.removeClass("review-content-show description-show").addClass(s)
        }),
        e(function() {
            e(".sticky-widget").theiaStickySidebar()
        }),
        (new WOW).init(),
        e(window).width() <= 991 && e(".wow").removeClass("wow")
    })
}(jQuery);
