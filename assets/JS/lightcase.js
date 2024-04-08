!function(t) {
    "use strict";
    var e = {
        cache: {},
        support: {},
        objects: {},
        init: function(e) {
            return this.each(function() {
                t(this).unbind("click.lightcase").bind("click.lightcase", function(i) {
                    i.preventDefault(),
                    t(this).lightcase("start", e)
                })
            })
        },
        start: function(i) {
            e.origin = lightcase.origin = this,
            e.settings = lightcase.settings = t.extend(!0, {
                idPrefix: "lightcase-",
                classPrefix: "lightcase-",
                attrPrefix: "lc-",
                transition: "elastic",
                transitionOpen: null,
                transitionClose: null,
                transitionIn: null,
                transitionOut: null,
                cssTransitions: !0,
                speedIn: 250,
                speedOut: 250,
                width: null,
                height: null,
                maxWidth: 800,
                maxHeight: 500,
                forceWidth: !1,
                forceHeight: !1,
                liveResize: !0,
                fullScreenModeForMobile: !0,
                mobileMatchExpression: /(iphone|ipod|ipad|android|blackberry|symbian)/,
                disableShrink: !1,
                fixedRatio: !0,
                shrinkFactor: .75,
                overlayOpacity: .9,
                slideshow: !1,
                slideshowAutoStart: !0,
                breakBeforeShow: !1,
                timeout: 5e3,
                swipe: !0,
                useKeys: !0,
                useCategories: !0,
                useAsCollection: !1,
                navigateEndless: !0,
                closeOnOverlayClick: !0,
                title: null,
                caption: null,
                showTitle: !0,
                showCaption: !0,
                showSequenceInfo: !0,
                inline: {
                    width: "auto",
                    height: "auto"
                },
                ajax: {
                    width: "auto",
                    height: "auto",
                    type: "get",
                    dataType: "html",
                    data: {}
                },
                iframe: {
                    width: 800,
                    height: 500,
                    frameborder: 0
                },
                flash: {
                    width: 400,
                    height: 205,
                    wmode: "transparent"
                },
                video: {
                    width: 400,
                    height: 225,
                    poster: "",
                    preload: "auto",
                    controls: !0,
                    autobuffer: !0,
                    autoplay: !0,
                    loop: !1
                },
                attr: "data-rel",
                href: null,
                type: null,
                typeMapping: {
                    image: "jpg,jpeg,gif,png,bmp",
                    flash: "swf",
                    video: "mp4,mov,ogv,ogg,webm",
                    iframe: "html,php",
                    ajax: "json,txt",
                    inline: "#"
                },
                errorMessage: function() {
                    return '<p class="' + e.settings.classPrefix + 'error">' + e.settings.labels.errorMessage + "</p>"
                },
                labels: {
                    errorMessage: "Source could not be found...",
                    "sequenceInfo.of": " of ",
                    close: "Close",
                    "navigator.prev": "Prev",
                    "navigator.next": "Next",
                    "navigator.play": "Play",
                    "navigator.pause": "Pause"
                },
                markup: function() {
                    e.objects.body.append(e.objects.overlay = t('<div id="' + e.settings.idPrefix + 'overlay"></div>'), e.objects.loading = t('<div id="' + e.settings.idPrefix + 'loading" class="' + e.settings.classPrefix + 'icon-spin"></div>'), e.objects.case = t('<div id="' + e.settings.idPrefix + 'case" aria-hidden="true" role="dialog"></div>')),
                    e.objects.case.after(e.objects.close = t('<a href="#" class="' + e.settings.classPrefix + 'icon-close"><span>' + e.settings.labels.close + "</span></a>"), e.objects.nav = t('<div id="' + e.settings.idPrefix + 'nav"></div>')),
                    e.objects.nav.append(e.objects.prev = t('<a href="#" class="' + e.settings.classPrefix + 'icon-prev"><span>' + e.settings.labels["navigator.prev"] + "</span></a>").hide(), e.objects.next = t('<a href="#" class="' + e.settings.classPrefix + 'icon-next"><span>' + e.settings.labels["navigator.next"] + "</span></a>").hide(), e.objects.play = t('<a href="#" class="' + e.settings.classPrefix + 'icon-play"><span>' + e.settings.labels["navigator.play"] + "</span></a>").hide(), e.objects.pause = t('<a href="#" class="' + e.settings.classPrefix + 'icon-pause"><span>' + e.settings.labels["navigator.pause"] + "</span></a>").hide()),
                    e.objects.case.append(e.objects.content = t('<div id="' + e.settings.idPrefix + 'content"></div>'), e.objects.info = t('<div id="' + e.settings.idPrefix + 'info"></div>')),
                    e.objects.content.append(e.objects.contentInner = t('<div class="' + e.settings.classPrefix + 'contentInner"></div>')),
                    e.objects.info.append(e.objects.sequenceInfo = t('<div id="' + e.settings.idPrefix + 'sequenceInfo"></div>'), e.objects.title = t('<h4 id="' + e.settings.idPrefix + 'title"></h4>'), e.objects.caption = t('<p id="' + e.settings.idPrefix + 'caption"></p>'))
                },
                onInit: {},
                onStart: {},
                onBeforeCalculateDimensions: {},
                onAfterCalculateDimensions: {},
                onBeforeShow: {},
                onFinish: {},
                onResize: {},
                onClose: {},
                onCleanup: {}
            }, i, e.origin.data ? e.origin.data("lc-options") : {}),
            e.objects.document = t("html"),
            e.objects.body = t("body"),
            e._callHooks(e.settings.onInit),
            e.objectData = e._setObjectData(this),
            e._addElements(),
            e._open(),
            e.dimensions = e.getViewportDimensions()
        },
        get: function(t) {
            return e.objects[t]
        },
        getObjectData: function() {
            return e.objectData
        },
        _setObjectData: function(i) {
            var s = t(i)
              , n = {
                this: t(i),
                title: e.settings.title || s.attr(e._prefixAttributeName("title")) || s.attr("title"),
                caption: e.settings.caption || s.attr(e._prefixAttributeName("caption")) || s.children("img").attr("alt"),
                url: e._determineUrl(),
                requestType: e.settings.ajax.type,
                requestData: e.settings.ajax.data,
                requestDataType: e.settings.ajax.dataType,
                rel: s.attr(e._determineAttributeSelector()),
                type: e.settings.type || e._verifyDataType(e._determineUrl()),
                isPartOfSequence: e.settings.useAsCollection || e._isPartOfSequence(s.attr(e.settings.attr), ":"),
                isPartOfSequenceWithSlideshow: e._isPartOfSequence(s.attr(e.settings.attr), ":slideshow"),
                currentIndex: t(e._determineAttributeSelector()).index(s),
                sequenceLength: t(e._determineAttributeSelector()).length
            };
            return n.sequenceInfo = n.currentIndex + 1 + e.settings.labels["sequenceInfo.of"] + n.sequenceLength,
            n.prevIndex = n.currentIndex - 1,
            n.nextIndex = n.currentIndex + 1,
            n
        },
        _prefixAttributeName: function(t) {
            return "data-" + e.settings.attrPrefix + t
        },
        _determineLinkTarget: function() {
            return e.settings.href || t(e.origin).attr(e._prefixAttributeName("href")) || t(e.origin).attr("href")
        },
        _determineAttributeSelector: function() {
            var i = t(e.origin)
              , s = "";
            if (void 0 !== e.cache.selector)
                s = e.cache.selector;
            else if (!0 === e.settings.useCategories && i.attr(e._prefixAttributeName("categories"))) {
                var n = i.attr(e._prefixAttributeName("categories")).split(" ");
                t.each(n, function(t, i) {
                    t > 0 && (s += ","),
                    s += "[" + e._prefixAttributeName("categories") + '~="' + i + '"]'
                })
            } else
                s = "[" + e.settings.attr + '="' + i.attr(e.settings.attr) + '"]';
            return e.cache.selector = s,
            s
        },
        _determineUrl: function() {
            var i, s = e._verifyDataUrl(e._determineLinkTarget()), n = 0, a = 0, o = "";
            return t.each(s, function(t, s) {
                switch (e._verifyDataType(s.url)) {
                case "video":
                    var c = document.createElement("video")
                      , r = e._verifyDataType(s.url) + "/" + e._getFileUrlSuffix(s.url);
                    "probably" !== o && o !== c.canPlayType(r) && "" !== c.canPlayType(r) && (o = c.canPlayType(r),
                    i = s.url);
                    break;
                default:
                    e._devicePixelRatio() >= s.density && s.density >= a && e._matchMedia()("screen and (min-width:" + s.width + "px)").matches && s.width >= n && (n = s.width,
                    a = s.density,
                    i = s.url)
                }
            }),
            i
        },
        _normalizeUrl: function(t) {
            var e = /^\d+$/;
            return t.split(",").map(function(t) {
                var i = {
                    width: 0,
                    density: 0
                };
                return t.trim().split(/\s+/).forEach(function(t, s) {
                    if (0 === s)
                        return i.url = t;
                    var n = t.substring(0, t.length - 1)
                      , a = t[t.length - 1]
                      , o = parseInt(n, 10)
                      , c = parseFloat(n);
                    "w" === a && e.test(n) ? i.width = o : "h" === a && e.test(n) ? i.height = o : "x" !== a || isNaN(c) || (i.density = c)
                }),
                i
            })
        },
        _isPartOfSequence: function(i, s) {
            var n = t("[" + e.settings.attr + '="' + i + '"]');
            return new RegExp(s).test(i) && n.length > 1
        },
        isSlideshowEnabled: function() {
            return e.objectData.isPartOfSequence && (!0 === e.settings.slideshow || !0 === e.objectData.isPartOfSequenceWithSlideshow)
        },
        _loadContent: function() {
            e.cache.originalObject && e._restoreObject(),
            e._createObject()
        },
        _createObject: function() {
            var i;
            switch (e.objectData.type) {
            case "image":
                (i = t(new Image)).attr({
                    src: e.objectData.url,
                    alt: e.objectData.title
                });
                break;
            case "inline":
                (i = t('<div class="' + e.settings.classPrefix + 'inlineWrap"></div>')).html(e._cloneObject(t(e.objectData.url))),
                t.each(e.settings.inline, function(t, s) {
                    i.attr(e._prefixAttributeName(t), s)
                });
                break;
            case "ajax":
                i = t('<div class="' + e.settings.classPrefix + 'inlineWrap"></div>'),
                t.each(e.settings.ajax, function(t, s) {
                    "data" !== t && i.attr(e._prefixAttributeName(t), s)
                });
                break;
            case "flash":
                i = t('<embed src="' + e.objectData.url + '" type="application/x-shockwave-flash"></embed>'),
                t.each(e.settings.flash, function(t, e) {
                    i.attr(t, e)
                });
                break;
            case "video":
                (i = t("<video></video>")).attr("src", e.objectData.url),
                t.each(e.settings.video, function(t, e) {
                    i.attr(t, e)
                });
                break;
            default:
                (i = t("<iframe></iframe>")).attr({
                    src: e.objectData.url
                }),
                t.each(e.settings.iframe, function(t, e) {
                    i.attr(t, e)
                })
            }
            e._addObject(i),
            e._loadObject(i)
        },
        _addObject: function(t) {
            e.objects.contentInner.html(t),
            e._loading("start"),
            e._callHooks(e.settings.onStart),
            !0 === e.settings.showSequenceInfo && e.objectData.isPartOfSequence ? (e.objects.sequenceInfo.html(e.objectData.sequenceInfo),
            e.objects.sequenceInfo.show()) : (e.objects.sequenceInfo.empty(),
            e.objects.sequenceInfo.hide()),
            !0 === e.settings.showTitle && void 0 !== e.objectData.title && "" !== e.objectData.title ? (e.objects.title.html(e.objectData.title),
            e.objects.title.show()) : (e.objects.title.empty(),
            e.objects.title.hide()),
            !0 === e.settings.showCaption && void 0 !== e.objectData.caption && "" !== e.objectData.caption ? (e.objects.caption.html(e.objectData.caption),
            e.objects.caption.show()) : (e.objects.caption.empty(),
            e.objects.caption.hide())
        },
        _loadObject: function(i) {
            switch (e.objectData.type) {
            case "inline":
                t(e.objectData.url) ? e._showContent(i) : e.error();
                break;
            case "ajax":
                t.ajax(t.extend({}, e.settings.ajax, {
                    url: e.objectData.url,
                    type: e.objectData.requestType,
                    dataType: e.objectData.requestDataType,
                    data: e.objectData.requestData,
                    success: function(t, s, n) {
                        n.getResponseHeader("X-Ajax-Location") ? (e.objectData.url = n.getResponseHeader("X-Ajax-Location"),
                        e._loadObject(i)) : ("json" === e.objectData.requestDataType ? e.objectData.data = t : i.html(t),
                        e._showContent(i))
                    },
                    error: function(t, i, s) {
                        e.error()
                    }
                }));
                break;
            case "flash":
                e._showContent(i);
                break;
            case "video":
                "function" == typeof i.get(0).canPlayType || 0 === e.objects.case.find("video").length ? e._showContent(i) : e.error();
                break;
            default:
                e.objectData.url ? (i.on("load", function() {
                    e._showContent(i)
                }),
                i.on("error", function() {
                    e.error()
                })) : e.error()
            }
        },
        error: function() {
            e.objectData.type = "error";
            var i = t('<div class="' + e.settings.classPrefix + 'inlineWrap"></div>');
            i.html(e.settings.errorMessage),
            e.objects.contentInner.html(i),
            e._showContent(e.objects.contentInner)
        },
        _calculateDimensions: function(t) {
            if (e._cleanupDimensions(),
            t) {
                var i = {
                    ratio: 1,
                    objectWidth: t.attr("width") ? t.attr("width") : t.attr(e._prefixAttributeName("width")),
                    objectHeight: t.attr("height") ? t.attr("height") : t.attr(e._prefixAttributeName("height"))
                };
                if (!e.settings.disableShrink)
                    switch (i.maxWidth = parseInt(e.dimensions.windowWidth * e.settings.shrinkFactor),
                    i.maxHeight = parseInt(e.dimensions.windowHeight * e.settings.shrinkFactor),
                    i.maxWidth > e.settings.maxWidth && (i.maxWidth = e.settings.maxWidth),
                    i.maxHeight > e.settings.maxHeight && (i.maxHeight = e.settings.maxHeight),
                    i.differenceWidthAsPercent = parseInt(100 / i.maxWidth * i.objectWidth),
                    i.differenceHeightAsPercent = parseInt(100 / i.maxHeight * i.objectHeight),
                    e.objectData.type) {
                    case "image":
                    case "flash":
                    case "video":
                    case "iframe":
                    case "ajax":
                    case "inline":
                        if ("image" === e.objectData.type || !0 === e.settings.fixedRatio) {
                            i.differenceWidthAsPercent > 100 && i.differenceWidthAsPercent > i.differenceHeightAsPercent && (i.objectWidth = i.maxWidth,
                            i.objectHeight = parseInt(i.objectHeight / i.differenceWidthAsPercent * 100)),
                            i.differenceHeightAsPercent > 100 && i.differenceHeightAsPercent > i.differenceWidthAsPercent && (i.objectWidth = parseInt(i.objectWidth / i.differenceHeightAsPercent * 100),
                            i.objectHeight = i.maxHeight),
                            i.differenceHeightAsPercent > 100 && i.differenceWidthAsPercent < i.differenceHeightAsPercent && (i.objectWidth = parseInt(i.maxWidth / i.differenceHeightAsPercent * i.differenceWidthAsPercent),
                            i.objectHeight = i.maxHeight);
                            break
                        }
                    case "error":
                        !isNaN(i.objectWidth) && i.objectWidth > i.maxWidth && (i.objectWidth = i.maxWidth);
                        break;
                    default:
                        (isNaN(i.objectWidth) || i.objectWidth > i.maxWidth) && !e.settings.forceWidth && (i.objectWidth = i.maxWidth),
                        (isNaN(i.objectHeight) && "auto" !== i.objectHeight || i.objectHeight > i.maxHeight) && !e.settings.forceHeight && (i.objectHeight = i.maxHeight)
                    }
                if (e.settings.forceWidth) {
                    try {
                        i.objectWidth = e.settings[e.objectData.type].width
                    } catch (t) {
                        i.objectWidth = e.settings.width || i.objectWidth
                    }
                    i.maxWidth = null
                }
                if (t.attr(e._prefixAttributeName("max-width")) && (i.maxWidth = t.attr(e._prefixAttributeName("max-width"))),
                e.settings.forceHeight) {
                    try {
                        i.objectHeight = e.settings[e.objectData.type].height
                    } catch (t) {
                        i.objectHeight = e.settings.height || i.objectHeight
                    }
                    i.maxHeight = null
                }
                t.attr(e._prefixAttributeName("max-height")) && (i.maxHeight = t.attr(e._prefixAttributeName("max-height"))),
                e._adjustDimensions(t, i)
            }
        },
        _adjustDimensions: function(t, i) {
            t.css({
                width: i.objectWidth,
                height: i.objectHeight,
                "max-width": i.maxWidth,
                "max-height": i.maxHeight
            }),
            e.objects.contentInner.css({
                width: t.outerWidth(),
                height: t.outerHeight(),
                "max-width": "100%"
            }),
            e.objects.case.css({
                width: e.objects.contentInner.outerWidth(),
                "max-width": "100%"
            }),
            e.objects.case.css({
                "margin-top": parseInt(-e.objects.case.outerHeight() / 2),
                "margin-left": parseInt(-e.objects.case.outerWidth() / 2)
            })
        },
        _loading: function(t) {
            "start" === t ? (e.objects.case.addClass(e.settings.classPrefix + "loading"),
            e.objects.loading.show()) : "end" === t && (e.objects.case.removeClass(e.settings.classPrefix + "loading"),
            e.objects.loading.hide())
        },
        getViewportDimensions: function() {
            return {
                windowWidth: t(window).innerWidth(),
                windowHeight: t(window).innerHeight()
            }
        },
        _verifyDataUrl: function(t) {
            return !(!t || void 0 === t || "" === t) && (t.indexOf("#") > -1 && (t = "#" + (t = t.split("#"))[t.length - 1]),
            e._normalizeUrl(t.toString()))
        },
        _getFileUrlSuffix: function(t) {
            return /(?:\.([^.]+))?$/.exec(t.toLowerCase())[1]
        },
        _verifyDataType: function(t) {
            var i = e.settings.typeMapping;
            if (!t)
                return !1;
            for (var s in i)
                if (i.hasOwnProperty(s))
                    for (var n = i[s].split(","), a = 0; a < n.length; a++) {
                        var o = n[a].toLowerCase()
                          , c = new RegExp(".(" + o + ")$","i")
                          , r = t.toLowerCase().split("?")[0].substr(-5);
                        if (!0 === c.test(r) || "inline" === s && t.indexOf(o) > -1)
                            return s
                    }
            return "iframe"
        },
        _addElements: function() {
            void 0 !== e.objects.case && t("#" + e.objects.case.attr("id")).length || e.settings.markup()
        },
        _showContent: function(t) {
            e.objects.document.attr(e._prefixAttributeName("type"), e.objectData.type),
            e.cache.object = t,
            e._callHooks(e.settings.onBeforeShow),
            e.settings.breakBeforeShow || e.show()
        },
        _startInTransition: function() {
            switch (e.transition.in()) {
            case "scrollTop":
            case "scrollRight":
            case "scrollBottom":
            case "scrollLeft":
            case "scrollHorizontal":
            case "scrollVertical":
                e.transition.scroll(e.objects.case, "in", e.settings.speedIn),
                e.transition.fade(e.objects.contentInner, "in", e.settings.speedIn);
                break;
            case "elastic":
                e.objects.case.css("opacity") < 1 && (e.transition.zoom(e.objects.case, "in", e.settings.speedIn),
                e.transition.fade(e.objects.contentInner, "in", e.settings.speedIn));
            case "fade":
            case "fadeInline":
                e.transition.fade(e.objects.case, "in", e.settings.speedIn),
                e.transition.fade(e.objects.contentInner, "in", e.settings.speedIn);
                break;
            default:
                e.transition.fade(e.objects.case, "in", 0)
            }
            e._loading("end"),
            e.isBusy = !1,
            e.cache.firstOpened || (e.cache.firstOpened = e.objectData.this),
            e.objects.info.hide(),
            setTimeout(function() {
                e.transition.fade(e.objects.info, "in", e.settings.speedIn)
            }, e.settings.speedIn),
            e._callHooks(e.settings.onFinish)
        },
        _processContent: function() {
            switch (e.isBusy = !0,
            e.transition.fade(e.objects.info, "out", 0),
            e.settings.transitionOut) {
            case "scrollTop":
            case "scrollRight":
            case "scrollBottom":
            case "scrollLeft":
            case "scrollVertical":
            case "scrollHorizontal":
                e.objects.case.is(":hidden") ? (e.transition.fade(e.objects.contentInner, "out", 0),
                e.transition.fade(e.objects.case, "out", 0, 0, function() {
                    e._loadContent()
                })) : e.transition.scroll(e.objects.case, "out", e.settings.speedOut, function() {
                    e._loadContent()
                });
                break;
            case "fade":
                e.objects.case.is(":hidden") ? e.transition.fade(e.objects.case, "out", 0, 0, function() {
                    e._loadContent()
                }) : e.transition.fade(e.objects.case, "out", e.settings.speedOut, 0, function() {
                    e._loadContent()
                });
                break;
            case "fadeInline":
            case "elastic":
                e.objects.case.is(":hidden") ? e.transition.fade(e.objects.case, "out", 0, 0, function() {
                    e._loadContent()
                }) : e.transition.fade(e.objects.contentInner, "out", e.settings.speedOut, 0, function() {
                    e._loadContent()
                });
                break;
            default:
                e.transition.fade(e.objects.case, "out", 0, 0, function() {
                    e._loadContent()
                })
            }
        },
        _handleEvents: function() {
            e._unbindEvents(),
            e.objects.nav.children().not(e.objects.close).hide(),
            e.isSlideshowEnabled() && (!0 !== e.settings.slideshowAutoStart && !e.isSlideshowStarted || e.objects.nav.hasClass(e.settings.classPrefix + "paused") ? e._stopTimeout() : e._startTimeout()),
            e.settings.liveResize && e._watchResizeInteraction(),
            e.objects.close.click(function(t) {
                t.preventDefault(),
                e.close()
            }),
            !0 === e.settings.closeOnOverlayClick && e.objects.overlay.css("cursor", "pointer").click(function(t) {
                t.preventDefault(),
                e.close()
            }),
            !0 === e.settings.useKeys && e._addKeyEvents(),
            e.objectData.isPartOfSequence && (e.objects.nav.attr(e._prefixAttributeName("ispartofsequence"), !0),
            e.objects.nav.data("items", e._setNavigation()),
            e.objects.prev.click(function(t) {
                t.preventDefault(),
                !0 !== e.settings.navigateEndless && e.item.isFirst() || (e.objects.prev.unbind("click"),
                e.cache.action = "prev",
                e.objects.nav.data("items").prev.click(),
                e.isSlideshowEnabled() && e._stopTimeout())
            }),
            e.objects.next.click(function(t) {
                t.preventDefault(),
                !0 !== e.settings.navigateEndless && e.item.isLast() || (e.objects.next.unbind("click"),
                e.cache.action = "next",
                e.objects.nav.data("items").next.click(),
                e.isSlideshowEnabled() && e._stopTimeout())
            }),
            e.isSlideshowEnabled() && (e.objects.play.click(function(t) {
                t.preventDefault(),
                e._startTimeout()
            }),
            e.objects.pause.click(function(t) {
                t.preventDefault(),
                e._stopTimeout()
            })),
            !0 === e.settings.swipe && (t.isPlainObject(t.event.special.swipeleft) && e.objects.case.on("swipeleft", function(t) {
                t.preventDefault(),
                e.objects.next.click(),
                e.isSlideshowEnabled() && e._stopTimeout()
            }),
            t.isPlainObject(t.event.special.swiperight) && e.objects.case.on("swiperight", function(t) {
                t.preventDefault(),
                e.objects.prev.click(),
                e.isSlideshowEnabled() && e._stopTimeout()
            })))
        },
        _addKeyEvents: function() {
            t(document).bind("keyup.lightcase", function(t) {
                if (!e.isBusy)
                    switch (t.keyCode) {
                    case 27:
                        e.objects.close.click();
                        break;
                    case 37:
                        e.objectData.isPartOfSequence && e.objects.prev.click();
                        break;
                    case 39:
                        e.objectData.isPartOfSequence && e.objects.next.click()
                    }
            })
        },
        _startTimeout: function() {
            e.isSlideshowStarted = !0,
            e.objects.play.hide(),
            e.objects.pause.show(),
            e.cache.action = "next",
            e.objects.nav.removeClass(e.settings.classPrefix + "paused"),
            e.timeout = setTimeout(function() {
                e.objects.nav.data("items").next.click()
            }, e.settings.timeout)
        },
        _stopTimeout: function() {
            e.objects.play.show(),
            e.objects.pause.hide(),
            e.objects.nav.addClass(e.settings.classPrefix + "paused"),
            clearTimeout(e.timeout)
        },
        _setNavigation: function() {
            var i = t(e.cache.selector || e.settings.attr)
              , s = e.objectData.sequenceLength - 1
              , n = {
                prev: i.eq(e.objectData.prevIndex),
                next: i.eq(e.objectData.nextIndex)
            };
            return e.objectData.currentIndex > 0 ? e.objects.prev.show() : n.prevItem = i.eq(s),
            e.objectData.nextIndex <= s ? e.objects.next.show() : n.next = i.eq(0),
            !0 === e.settings.navigateEndless && (e.objects.prev.show(),
            e.objects.next.show()),
            n
        },
        item: {
            isFirst: function() {
                return 0 === e.objectData.currentIndex
            },
            isFirstOpened: function() {
                return e.objectData.this.is(e.cache.firstOpened)
            },
            isLast: function() {
                return e.objectData.currentIndex === e.objectData.sequenceLength - 1
            }
        },
        _cloneObject: function(t) {
            var i = t.clone()
              , s = t.attr("id");
            return t.is(":hidden") ? (e._cacheObjectData(t),
            t.attr("id", e.settings.idPrefix + "temp-" + s).empty()) : i.removeAttr("id"),
            i.show()
        },
        isMobileDevice: function() {
            return !!navigator.userAgent.toLowerCase().match(e.settings.mobileMatchExpression)
        },
        isTransitionSupported: function() {
            var t = e.objects.body.get(0)
              , i = !1
              , s = {
                transition: "",
                WebkitTransition: "-webkit-",
                MozTransition: "-moz-",
                OTransition: "-o-",
                MsTransition: "-ms-"
            };
            for (var n in s)
                s.hasOwnProperty(n) && n in t.style && (e.support.transition = s[n],
                i = !0);
            return i
        },
        transition: {
            in: function() {
                return e.settings.transitionOpen && !e.cache.firstOpened ? e.settings.transitionOpen : e.settings.transitionIn
            },
            fade: function(t, i, s, n, a) {
                var o = "in" === i
                  , c = {}
                  , r = t.css("opacity")
                  , l = {}
                  , d = n || (o ? 1 : 0);
                !e.isOpen && o || (c.opacity = r,
                l.opacity = d,
                t.css(e.support.transition + "transition", "none"),
                t.css(c).show(),
                e.support.transitions ? (l[e.support.transition + "transition"] = s + "ms ease",
                setTimeout(function() {
                    t.css(l),
                    setTimeout(function() {
                        t.css(e.support.transition + "transition", ""),
                        !a || !e.isOpen && o || a()
                    }, s)
                }, 15)) : (t.stop(),
                t.animate(l, s, a)))
            },
            scroll: function(t, i, s, n) {
                var a = "in" === i
                  , o = a ? e.settings.transitionIn : e.settings.transitionOut
                  , c = "left"
                  , r = {}
                  , l = a ? 0 : 1
                  , d = a ? "-50%" : "50%"
                  , u = {}
                  , h = a ? 1 : 0
                  , f = a ? "50%" : "-50%";
                if (e.isOpen || !a) {
                    switch (o) {
                    case "scrollTop":
                        c = "top";
                        break;
                    case "scrollRight":
                        d = a ? "150%" : "50%",
                        f = a ? "50%" : "150%";
                        break;
                    case "scrollBottom":
                        c = "top",
                        d = a ? "150%" : "50%",
                        f = a ? "50%" : "150%";
                        break;
                    case "scrollHorizontal":
                        d = a ? "150%" : "50%",
                        f = a ? "50%" : "-50%";
                        break;
                    case "scrollVertical":
                        c = "top",
                        d = a ? "-50%" : "50%",
                        f = a ? "50%" : "150%"
                    }
                    if ("prev" === e.cache.action)
                        switch (o) {
                        case "scrollHorizontal":
                            d = a ? "-50%" : "50%",
                            f = a ? "50%" : "150%";
                            break;
                        case "scrollVertical":
                            d = a ? "150%" : "50%",
                            f = a ? "50%" : "-50%"
                        }
                    r.opacity = l,
                    r[c] = d,
                    u.opacity = h,
                    u[c] = f,
                    t.css(e.support.transition + "transition", "none"),
                    t.css(r).show(),
                    e.support.transitions ? (u[e.support.transition + "transition"] = s + "ms ease",
                    setTimeout(function() {
                        t.css(u),
                        setTimeout(function() {
                            t.css(e.support.transition + "transition", ""),
                            !n || !e.isOpen && a || n()
                        }, s)
                    }, 15)) : (t.stop(),
                    t.animate(u, s, n))
                }
            },
            zoom: function(t, i, s, n) {
                var a = "in" === i
                  , o = {}
                  , c = t.css("opacity")
                  , r = a ? "scale(0.75)" : "scale(1)"
                  , l = {}
                  , d = a ? 1 : 0
                  , u = a ? "scale(1)" : "scale(0.75)";
                !e.isOpen && a || (o.opacity = c,
                o[e.support.transition + "transform"] = r,
                l.opacity = d,
                t.css(e.support.transition + "transition", "none"),
                t.css(o).show(),
                e.support.transitions ? (l[e.support.transition + "transform"] = u,
                l[e.support.transition + "transition"] = s + "ms ease",
                setTimeout(function() {
                    t.css(l),
                    setTimeout(function() {
                        t.css(e.support.transition + "transform", ""),
                        t.css(e.support.transition + "transition", ""),
                        !n || !e.isOpen && a || n()
                    }, s)
                }, 15)) : (t.stop(),
                t.animate(l, s, n)))
            }
        },
        _callHooks: function(i) {
            "object" == typeof i && t.each(i, function(t, i) {
                "function" == typeof i && i.call(e.origin)
            })
        },
        _cacheObjectData: function(i) {
            t.data(i, "cache", {
                id: i.attr("id"),
                content: i.html()
            }),
            e.cache.originalObject = i
        },
        _restoreObject: function() {
            var i = t('[id^="' + e.settings.idPrefix + 'temp-"]');
            i.attr("id", t.data(e.cache.originalObject, "cache").id),
            i.html(t.data(e.cache.originalObject, "cache").content)
        },
        resize: function(t, i) {
            e.isOpen && (e.isSlideshowEnabled() && e._stopTimeout(),
            "object" == typeof i && null !== i && (i.width && e.cache.object.attr(e._prefixAttributeName("width"), i.width),
            i.maxWidth && e.cache.object.attr(e._prefixAttributeName("max-width"), i.maxWidth),
            i.height && e.cache.object.attr(e._prefixAttributeName("height"), i.height),
            i.maxHeight && e.cache.object.attr(e._prefixAttributeName("max-height"), i.maxHeight)),
            e.dimensions = e.getViewportDimensions(),
            e._calculateDimensions(e.cache.object),
            e._callHooks(e.settings.onResize))
        },
        _watchResizeInteraction: function() {
            t(window).resize(e.resize)
        },
        _unwatchResizeInteraction: function() {
            t(window).off("resize", e.resize)
        },
        _switchToFullScreenMode: function() {
            e.settings.shrinkFactor = 1,
            e.settings.overlayOpacity = 1,
            t("html").addClass(e.settings.classPrefix + "fullScreenMode")
        },
        _open: function() {
            switch (e.isOpen = !0,
            e.support.transitions = !!e.settings.cssTransitions && e.isTransitionSupported(),
            e.support.mobileDevice = e.isMobileDevice(),
            e.support.mobileDevice && (t("html").addClass(e.settings.classPrefix + "isMobileDevice"),
            e.settings.fullScreenModeForMobile && e._switchToFullScreenMode()),
            e.settings.transitionIn || (e.settings.transitionIn = e.settings.transition),
            e.settings.transitionOut || (e.settings.transitionOut = e.settings.transition),
            e.transition.in()) {
            case "fade":
            case "fadeInline":
            case "elastic":
            case "scrollTop":
            case "scrollRight":
            case "scrollBottom":
            case "scrollLeft":
            case "scrollVertical":
            case "scrollHorizontal":
                e.objects.case.is(":hidden") && (e.objects.close.css("opacity", 0),
                e.objects.overlay.css("opacity", 0),
                e.objects.case.css("opacity", 0),
                e.objects.contentInner.css("opacity", 0)),
                e.transition.fade(e.objects.overlay, "in", e.settings.speedIn, e.settings.overlayOpacity, function() {
                    e.transition.fade(e.objects.close, "in", e.settings.speedIn),
                    e._handleEvents(),
                    e._processContent()
                });
                break;
            default:
                e.transition.fade(e.objects.overlay, "in", 0, e.settings.overlayOpacity, function() {
                    e.transition.fade(e.objects.close, "in", 0),
                    e._handleEvents(),
                    e._processContent()
                })
            }
            e.objects.document.addClass(e.settings.classPrefix + "open"),
            e.objects.case.attr("aria-hidden", "false")
        },
        show: function() {
            e._callHooks(e.settings.onBeforeCalculateDimensions),
            e._calculateDimensions(e.cache.object),
            e._callHooks(e.settings.onAfterCalculateDimensions),
            e._startInTransition()
        },
        close: function() {
            switch (e.isOpen = !1,
            e.isSlideshowEnabled() && (e._stopTimeout(),
            e.isSlideshowStarted = !1,
            e.objects.nav.removeClass(e.settings.classPrefix + "paused")),
            e.objects.loading.hide(),
            e._unbindEvents(),
            e._unwatchResizeInteraction(),
            t("html").removeClass(e.settings.classPrefix + "open"),
            e.objects.case.attr("aria-hidden", "true"),
            e.objects.nav.children().hide(),
            e.objects.close.hide(),
            e._callHooks(e.settings.onClose),
            e.transition.fade(e.objects.info, "out", 0),
            e.settings.transitionClose || e.settings.transitionOut) {
            case "fade":
            case "fadeInline":
            case "scrollTop":
            case "scrollRight":
            case "scrollBottom":
            case "scrollLeft":
            case "scrollHorizontal":
            case "scrollVertical":
                e.transition.fade(e.objects.case, "out", e.settings.speedOut, 0, function() {
                    e.transition.fade(e.objects.overlay, "out", e.settings.speedOut, 0, function() {
                        e.cleanup()
                    })
                });
                break;
            case "elastic":
                e.transition.zoom(e.objects.case, "out", e.settings.speedOut, function() {
                    e.transition.fade(e.objects.overlay, "out", e.settings.speedOut, 0, function() {
                        e.cleanup()
                    })
                });
                break;
            default:
                e.cleanup()
            }
        },
        _unbindEvents: function() {
            e.objects.overlay.unbind("click"),
            t(document).unbind("keyup.lightcase"),
            e.objects.case.unbind("swipeleft").unbind("swiperight"),
            e.objects.prev.unbind("click"),
            e.objects.next.unbind("click"),
            e.objects.play.unbind("click"),
            e.objects.pause.unbind("click"),
            e.objects.close.unbind("click")
        },
        _cleanupDimensions: function() {
            var t = e.objects.contentInner.css("opacity");
            e.objects.case.css({
                width: "",
                height: "",
                top: "",
                left: "",
                "margin-top": "",
                "margin-left": ""
            }),
            e.objects.contentInner.removeAttr("style").css("opacity", t),
            e.objects.contentInner.children().removeAttr("style")
        },
        cleanup: function() {
            e._cleanupDimensions(),
            e.objects.loading.hide(),
            e.objects.overlay.hide(),
            e.objects.case.hide(),
            e.objects.prev.hide(),
            e.objects.next.hide(),
            e.objects.play.hide(),
            e.objects.pause.hide(),
            e.objects.document.removeAttr(e._prefixAttributeName("type")),
            e.objects.nav.removeAttr(e._prefixAttributeName("ispartofsequence")),
            e.objects.contentInner.empty().hide(),
            e.objects.info.children().empty(),
            e.cache.originalObject && e._restoreObject(),
            e._callHooks(e.settings.onCleanup),
            e.cache = {}
        },
        _matchMedia: function() {
            return window.matchMedia || window.msMatchMedia
        },
        _devicePixelRatio: function() {
            return window.devicePixelRatio || 1
        },
        _isPublicMethod: function(t) {
            return "function" == typeof e[t] && "_" !== t.charAt(0)
        },
        _export: function() {
            window.lightcase = {},
            t.each(e, function(t) {
                e._isPublicMethod(t) && (lightcase[t] = e[t])
            })
        }
    };
    e._export(),
    t.fn.lightcase = function(i) {
        return e._isPublicMethod(i) ? e[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.lightcase") : e.init.apply(this, arguments)
    }
}(jQuery);
