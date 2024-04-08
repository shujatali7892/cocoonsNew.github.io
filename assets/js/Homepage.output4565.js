var marketingRotator = {
    alreadyInited: !1,
    fixHeight: function() {
        onResizeMethods((function() {
            setTimeout((function() {
                var e = cdnGeneralHelpers.getWindowHeight() - 70,
                    t = cdnGeneralHelpers.getWindowHeight();
                $(".hero-area").css({
                    height: t
                }), cdnGeneralHelpers.getWindowWidth() < 1023 && $(".hero-area").css({
                    height: e
                })
            }), 100)
        }))
    },
    init: function() {
        var e = "<div class='item'><div class='image lazyload' data-parent='item' data-bg='{IMAGE_URL}'></div><div class='image mobile-image lazyload' data-parent='item' data-bg='{IMAGE_MOBILE_URL}&height_1=610'></div><div class='main-title'><h1>{TITLE}</h1><div class='subtitle'>{SUMMARY}</div></div></div>",
            t = cdnGeneralHelpers.shuffle(marketingRotatorCollection);
        if(t.length > 0) {
            for(var i = 0; i < 3; i++) $("#fader-1").append(e.replace(/{IMAGE_URL}/g, cdnGeneralHelpers.getImage(t[i].desktopImage, {
                size: 1920
            })).replace(/{IMAGE_MOBILE_URL}/g, cdnGeneralHelpers.getImage(t[i].mobileImage, {
                size: 2 * $(window).width()
            })).replace(/{TITLE}/g, t[i].title).replace(/{SUMMARY}/g, t[i].summary).replace(/{HASHTAG}/g, t[i].hashTag));
            this.fixHeight(), $("#fader-1").slick({
                dots: !1,
                arrows: !1,
                autoplay: !0,
                autoplaySpeed: rotatorDelay,
                fade: !0,
                mobileFirst: !0,
                responsive: [{
                    breakpoint: 767,
                    settings: {
                        dots: !0,
                        appendDots: $(".main-dots"),
                        customPaging: function() {
                            return '<div class="dot"></div>'
                        }
                    }
                }]
            })
        }
    }
},
progressBar = {
    time: 5,
    $bar: "",
    tick: 0,
    percentTime: "",
    isPause: !1,
    callback: !1,
    offsetSvg: 176,
    resetProgressBar: function(e) {
        var t = this;
        clearTimeout(t.tick), clearInterval(t.tick), e.each((function() {
            $(this).css("stroke-dashoffset", t.offsetSvg)
        }))
    },
    startProgressBar: function() {
        var e = this;
        e.resetProgressBar(e.$bar), e.percentTime = 0, e.tick = setInterval((function() {
            e.interval(e, e.callback)
        }), 10)
    },
    interval: function(e) {
        var t = e;
        if(!t.isPause) {
            t.percentTime += 1 / (t.time + .1);
            var i = (100 * t.offsetSvg - t.offsetSvg * t.percentTime) / 100;
            t.$bar.css("stroke-dashoffset", i), t.percentTime >= 100 && (t.resetProgressBar(t.$bar), t.callback(), t.startProgressBar(t.callback))
        }
    },
    restart: function() {
        var e = this;
        e.resetProgressBar(e.$bar), e.startProgressBar(e.callback)
    },
    pause: function() {
        this.isPause = !0
    },
    resumeFromPause: function() {
        this.isPause = !1
    },
    destroy: function() {
        clearTimeout(this.tick), clearInterval(this.tick)
    },
    init: function(e, t) {
        var i = this;
        i.$bar = e, i.callback = t, i.resetProgressBar(e), i.startProgressBar(t)
    }
},
popupsFunc = function() {
    var e = {
        alreadyGenerated: !1,
        timeout: 0,
        bodyFix: function(e) {
            var t = $("html.no-touch"),
                i = $("html.touch");
            "open" === e ? (t.css({
                overflow: "hidden"
            }), i.css({
                overflow: "hidden"
            })) : "close" === e && (t.css({
                overflow: ""
            }), i.css({
                overflow: "",
                position: ""
            }))
        },
        open: function(e) {
            var t = this;
            if($(".custom-popup[data-open=" + e + "]").length) return t.bodyFix("open"), 0 === t.timeout && void 0 === t.timeout || clearTimeout(t.timeout), $(".custom-popup[data-open=" + e + "]").addClass("opened"), !1
        },
        close: function(e) {
            var t = this,
                i = e.parents(".custom-popup");
            return t.bodyFix("close"), i.removeClass("opened"), t.timeout = setTimeout((function() {
                t.timeout = 0
            }), 600), !1
        }
    };

    function _checkUrl(e, t) {
        return "link" === e ? void 0 !== t && "" !== t ? "<a href='" + t + "' class='popup-card__url' target='{TARGET}'></a>" : "" : void 0 !== t && "" !== t ? "has-url" : "no-url"
    }
    var t = "<div class='popup-item notice-item {HAS_URL} {HAS_IMAGE}'><div class='popup-item__inner'><div class='popup-item__wrapper'><div class='popup-item__content'>{URL}<div class='popup-item__text'><h4>{TITLE}</h4><div class='txt'>{DESCRIPTION}</div><div class='popup-item__update'>Last updated <time>{UPDATED}</time><i class='global-icons global-short-arrow-icon'></i></div></div></div></div><div class='image'>{URL}<div class='img lazyload' data-bg='{IMAGE}'></div></div></div></div>",
    i = "<div class='cp__wrapper'><a href='javascript:void(0);' title='close notifications'><span class='close-popup-js close-button'><i></i></span></a><div class='close-popup-js background-close'></div><div class='cp__scroll'><div class='cp__inner'><div class='cp__noticesList'><div class='cp__title'>Notices</div>{NOTICES}</div></div></div></div>",
        a = {
            generated: !1,
            noticeCardTemplate: function(e) {
                return t.replace(/{IMAGE}/g, cdnGeneralHelpers.getImage(e.image, {
                    template: "{IMAGE_URL}"
                })).replace(/{HAS_IMAGE}/g, (i = e.image, void 0 !== i && "" !== i ? "has-img" : "no-img")).replace(/{URL}/g, _checkUrl("link", e.url)).replace(/{HAS_URL}/g, _checkUrl("class", e.url)).replace(/{TITLE}/g, e.title).replace(/{DESCRIPTION}/g, e.description).replace(/{UPDATED}/g, e.updated).replace(/{TARGET}/g, e.target);
                var i
            },
            noticesTemplate: function() {
                var e = noticesCollection,
                    t = "";
                if(e.length > 0)
                    for(var a = 0; a < e.length; a++) t += this.noticeCardTemplate(e[a]);
                $(".popup-notices").append(i.replace(/{NOTICES}/g, t))
            },
            init: function() {
                this.generated || (this.noticesTemplate(), this.generated = !0)
            }
        };
    return {
        init: function() {
            $(".open-notices").on("click", (function() {
                a.init(), $(this).addClass("hidden"), $(".header .close-button").addClass("active"), $(".popup-notices .noticesListContainer").length || $(".popup-notices .cp__inner").append('<div class="noticesListContainer"><div class="cp__title">Events</div><div class="noticesList"></div><div class="scroll-down-wrapper"><button class="scroll-level-down" title="Scroll Down"><i class="global-icons global-mid-arrow-icon"></i></button></div></div>'), e.bodyFix("open"), "undefined" != typeof MediaPlusFeedsArray && MediaPlusFeedsArray.length > 0 && 0 === $(".noticesListContainer .noticesList").children().length && $.HomepageAsync.AddMediaItems($("#section-2 .carousel"), $(".popup-notices .noticesListContainer"), $(".section_facilities-list")), setTimeout((function() {
                    e.open("notices")
                }), 100), $(".footer.contact-overlay").removeClass("active"), $(".header-links-contact a").html($(".header-links-contact a").attr("title"))
            })), $(".open-alert").on("click", (function() {
                e.open("alert")
            })), $(".custom-popup").on("click", ".close-popup-js", (function() {
                var t = $(this);
                cdnGeneralHelpers.getCookie("homepage-visited") || cdnGeneralHelpers.setCookie("homepage-visited", 1, 31), e.close(t), $(".open-notices").removeClass("hidden")
            })), $(".header .close-popup-js").on("click", (function() {
                e.bodyFix("close")
            })), $(".header .close-button").on("click", (function() {
                $(".popup-notices").removeClass("opened"), $(".open-notices").removeClass("hidden"), $(".header .close-button").removeClass("active")
            }))
        },
        openAtLoad: function() {
            e.open("alert")
        }
    }
}(),
goToHeroArea = {
    init: function() {
        $(".hero-area .goDown").length && $(".hero-area .goDown").on("click tap", (function() {
            var e = $("#content").offset().top;
            return $("html, body").animate({
                scrollTop: e
            }, 500), !1
        }))
    }
},
preloaderHandler = function() {
    var e = {
        init: function() {
            $("html").addClass("loaded visible"), popupsFunc.openAtLoad()
        }
    };
    return {
        init: function() {
            $("html").animate({
                scrollTop: 0
            }, 1), this.loaded || e.init()
        }
    }
}(),
scroller = function() {
    var e = gsap.timeline(),
        t = gsap.timeline(),
        i = {
            init: function() {
                this.setScroller()
            },
            setTimelines: function() {},
            setScroller: function() {
                ScrollTrigger.matchMedia({
                    "(min-width: 1024px) and (max-width: 2299px)": function() {
                        e.to("#two", {
                            xPercent: -100,
                            x: function() {
                                return innerWidth
                            },
                            ease: "none",
                            scrollTrigger: {
                                trigger: "#two",
                                start: "top top",
                                end: $("#two").offsetWidth,
                                scrub: !0,
                                pin: !0
                            }
                        }), gsap.set("#three", {
                            xPercent: -50
                        }), t.to("#three", {
                            xPercent: 0,
                            ease: "none",
                            scrollTrigger: {
                                trigger: "#three",
                                start: "top top",
                                end: $("#three").offsetLeft,
                                scrub: !0,
                                pin: !0
                            }
                        })
                    },
                    "(min-width: 2300px)": function() {
                        gsap.set("#three", {
                            clearProps: !0
                        }), e.kill(!0), t.kill(!0)
                    },
                    "(max-width: 1023px)": function() {}
                })
            }
        };
    return {
        init: function() {
            i.init()
        }
    }
}(),
valuesObject = {
    renderElements: function() {
        var e = "<div class='section_values-item' data-hashtag='{HASHTAG}'><div class='icon'></div><div class='image-container'><div class='image lazyload' data-bg='{IMAGE_URL}'></div></div><div class='section_values-wrap'><div class='title'>{TITLE}</div><div class='subtitle'>{SUBTITLE}</div></div></div>",
            t = valuesCollection;
        if(t.length > 0) {
            for(var i = 0; i < Math.min(5, t.length); i++) $(".section_values-list").append(e.replace(/{IMAGE_URL}/g, cdnGeneralHelpers.getImage(t[i].image, {
                size: 200
            })).replace(/{TITLE}/g, t[i].title).replace(/{HASHTAG}/g, t[i].hashtag).replace(/{SUBTITLE}/g, t[i].subtitle))
        }
    },
    init: function() {
        this.renderElements()
    }
},
pathsObject = {
    renderElements: function() {
        var e = "<a href='{URL}' class='hiddenLink' title='{TITLE}' target='{TARGET}'></a><div class='image-wrapper'><div class='icon'></div><div class='image lazyload' data-bg='{IMAGE_URL}'></div></div><div class='text-wrapper'><div class='title'>{TITLE}</div><div class='subtitle'>{SUBTITLE}</div></div>",
            t = pathsCollection;
        t.length > 0 && ($(".section_path-item.item-1").append(e.replace(/{IMAGE_URL}/g, cdnGeneralHelpers.getImage(t[0].image, {
            size: 400
        })).replace(/{TITLE}/g, t[0].title).replace(/{SUBTITLE}/g, t[0].subtitle).replace(/{URL}/g, t[0].url).replace(/{TARGET}/g, t[0].target)), $(".section_path-item.item-2").append(e.replace(/{IMAGE_URL}/g, cdnGeneralHelpers.getImage(t[1].image, {
            size: 400
        })).replace(/{TITLE}/g, t[1].title).replace(/{SUBTITLE}/g, t[1].subtitle).replace(/{URL}/g, t[1].url).replace(/{TARGET}/g, t[1].target)), $(".section_path-item.item-3").append(e.replace(/{IMAGE_URL}/g, cdnGeneralHelpers.getImage(t[2].image, {
            size: 400
        })).replace(/{TITLE}/g, t[2].title).replace(/{SUBTITLE}/g, t[2].subtitle).replace(/{URL}/g, t[2].url).replace(/{TARGET}/g, t[2].target)))
    },
    init: function() {
        this.renderElements()
    }
},
cardsItem = "<div class='section_values-item card js-cardPopup' data-cardid='{ID}'> <a class='card__link' href='{LINK}' target='{TARGET}'></a><div class='icon'></div><div class='image-container'>{IMAGE}</div><div class='section_values-wrap'><div class='title'>{TITLE}</div><div class='subtitle'>{SUBTITLE}</div></div></div>";

function sharedGenerateCard(e) {
return cardsItem.replace(/{IMAGE}/g, function(e) {
    var t = "./Images/default-thumbs/card-placeholder.jpg",
        i = e.Image;
    if(-1 === window.location.pathname.indexOf("html")) return "<div  class='image lazyload' data-bg='/Images/1px.jpg?command_1=url&url_1=" + encodeURIComponent(i) + "&command_2=resize&width_2=450&command_3=default&default_3=" + t + "'></div>";
    return "<div  class='image lazyload' data-bg='" + t + "'></div>"
}(e)).replace(/{TITLE}/g, e.Title).replace(/{SUBTITLE}/g, e.ShortDescription).replace(/{ID}/g, e.Id).replace(/{LINK}/g, e.Url).replace(/{TARGET}/g, e.UrlTarget)
}
var cards = {
slider: null,
mobileLayout: !1,
desktopLayout: !1,
gridElement: ".section_values",
json: [],
init: function() {
    if($("#PageCardsJson").length && $("#PageCardsJson").val().length > 1) {
        cards.json = JSON.parse($("#PageCardsJson").val());
        for(var e = 0; e < Math.min(cards.json.length, 7); e++) $(cards.gridElement).find(".section_values-list").append(sharedGenerateCard(cards.json[e]))
    }
}
};
! function(e) {
var a = "<div class='popup-item event-item {HAS_URL}'><div class='popup-item__inner'><a href='{URL}' class='popup-card__url'></a><div class='popup-item__wrapper'><div class='popup-item__content'><div class='popup-item__text'><div class='date'>{DATE}</div><h4>{TITLE}</h4><div class='txt'>{DESCRIPTION}</div><div class='popup-item__update'><time>{TIMERANGE}</time><i class='global-icons global-short-arrow-icon'></i></div></div></div></div><div class='image'><a href='{URL}' class='popup-card__url'></a>{IMAGE}</div></div></div>",
    i = "<div class='section_facilities-item' {MT-FOR-MEDIA-POPUP} data-id='{MEDIA-ID}'><div class='icon'></div><div class='image-container'><i class='social-icon {CHANNEL_ICON}'></i><div class='section-social'></div>{IMAGE}</div></div>";

function GenerateEventItem(e) {
    return a.replace(/{IMAGE}/g, cdnMediaHelpers.getImage(e, {
        size: 380
    })).replace(/{TITLE}/g, mpGenerateHelper.getTitle(e)).replace(/{DESCRIPTION}/g, mpGenerateHelper.getDescription(e)).replace(/{TIMERANGE}/g, cdnMediaHelpers.getTimeRange(e, {
        startDateFormat: "hh:mm"
    })).replace(/{DATE}/g, cdnMediaHelpers.getDate(e, {
        format: "MMM dd"
    })).replace(/{URL}/g, cdnMediaHelpers.getFeedUrl(e)).replace(/{HAS_URL}/g, (i = "class", t = cdnMediaHelpers.getFeedUrl(e), "link" === i ? void 0 !== t && "" !== t ? "<a href='" + t + "' class='popup-card__url'></a>" : "" : void 0 !== t && "" !== t ? "has-url" : "no-url"));
    var i, t
}

function GenerateFacilitiesStoryItem(e, a) {
    return i.replace(/{MEDIA-ID}/g, 'data-item="' + a + '"').replace(/{IMAGE}/g, cdnMediaHelpers.getImage(e, {
        size: 200
    })).replace(/{CHANNEL_ICON}/g, mediaCustomHelpers.getIcon(e)).replace(/{MT-FOR-MEDIA-POPUP}/g, "TiarcCalendar" !== e.ItemType ? "data-mediaItemID='" + e.Id + "' data-feedID='" + e.FeedId + "' data-mediatype='" + e.ItemType.toLowerCase() + "'" : "")
}
e.HomepageAsync = function() {}, e.HomepageAsync.AddMediaItems = function(a, i, t) {
    MediaServiceHelper = new e.MediaServiceHelper({
        ServiceUrl: e("#MediaPlusUrl").val(),
        FeedsJson: MediaPlusFeedsArray,
        FeedGroups: sharedFeedGroups,
        InitCallBack: function(a) {
            for(var d, r, s, l = [], n = [], p = 0; p < a.FeedGroups.length; p++)
                for(var c = 0; c < a.FeedGroups[p].FeedIds.length; c++) {
                    var o = a.FeedGroups[p].GroupName;
                    "events" !== o.toLowerCase() && l.push(a.FeedGroups[p].FeedIds[c]), "events" === o.toLowerCase() && n.push(a.FeedGroups[p].FeedIds[c])
                }
            i.length && n.length && (d = i, void 0 !== (s = (r = n).length) || 0 !== s ? e.MediaServiceHelper.GetMediaItemsAdvanced({
                FeedIds: r,
                TakeCount: 10,
                callback: function(e) {
                    var a = e.length;
                    if(0 !== a) {
                        for(var i = 0; i < a; i++) d.find(".noticesList").append(GenerateEventItem(e[i]));
                        d.show()
                    } else d.remove()
                }
            }) : d.remove()), t.length && l.length && function(a, i, t) {
                t = e("#PageStaffJson").length ? JSON.parse(e("#PageStaffJson").val()) : [];
                i.length && e.MediaServiceHelper.GetMediaItemsAdvanced({
                    FeedIds: i,
                    TakeCount: 4,
                    callback: function(e) {
                        if(e.length > 0) {
                            "undefined" != typeof mpHelper && mpHelper.storeInfoForMediaPopup(e);
                            for(var i = 0; i < e.length; i++)
                                if(0 == i && t.length > 0 ? a.append(facilitiesSharedGenerateStaff(t[0])) : 2 == i && t.length > 1 && a.append(facilitiesSharedGenerateStaff(t[1])), a.append(GenerateFacilitiesStoryItem(e[i])), i >= e.length - 1 && t.length > 2)
                                    for(i = 2; i < Math.min(t.length, 3); i++) a.append(facilitiesSharedGenerateStaff(t[i]))
                        } else a.remove()
                    }
                })
            }(t, l)
        }
    })
}
}(jQuery);
! function(i) {
i(document).ready((function() {
    customMenu.init(), goTo.init(), customObjects.init(), contactOverlay.init(), marketingRotator.init(), popupsFunc.init(), preloaderHandler.init(), goToHeroArea.init(), scroller.init(), pathsObject.init(), cards.init()
})), i(window).load((function() {
    i("html").animate({
        scrollTop: 0
    }, 1), "undefined" != typeof MediaPlusFeedsArray && MediaPlusFeedsArray.length > 0 && i.HomepageAsync.AddMediaItems(i("#section-2 .carousel"), i(".popup-notices .noticesListContainer .noticesList"), i(".section_facilities-list"))
}))
}(jQuery);