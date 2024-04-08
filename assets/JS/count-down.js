!function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t) {
    "use strict";
    var e = []
      , s = []
      , i = {
        precision: 100,
        elapse: !1,
        defer: !1
    };
    s.push(/^[0-9]*$/.source),
    s.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    s.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    s = new RegExp(s.join("|"));
    var n = {
        Y: "years",
        m: "months",
        n: "daysToMonth",
        d: "daysToWeek",
        w: "weeks",
        W: "weeksToMonth",
        H: "hours",
        M: "minutes",
        S: "seconds",
        D: "totalDays",
        I: "totalHours",
        N: "totalMinutes",
        T: "totalSeconds"
    };
    function o(t, e) {
        var s = "s"
          , i = "";
        return t && (1 === (t = t.replace(/(:|;|\s)/gi, "").split(/\,/)).length ? s = t[0] : (i = t[0],
        s = t[1])),
        Math.abs(e) > 1 ? s : i
    }
    var a = function(s, n, o) {
        this.el = s,
        this.$el = t(s),
        this.interval = null,
        this.offset = {},
        this.options = t.extend({}, i),
        this.instanceNumber = e.length,
        e.push(this),
        this.$el.data("countdown-instance", this.instanceNumber),
        o && ("function" == typeof o ? (this.$el.on("update.countdown", o),
        this.$el.on("stoped.countdown", o),
        this.$el.on("finish.countdown", o)) : this.options = t.extend({}, i, o)),
        this.setFinalDate(n),
        !1 === this.options.defer && this.start()
    };
    t.extend(a.prototype, {
        start: function() {
            null !== this.interval && clearInterval(this.interval);
            var t = this;
            this.update(),
            this.interval = setInterval(function() {
                t.update.call(t)
            }, this.options.precision)
        },
        stop: function() {
            clearInterval(this.interval),
            this.interval = null,
            this.dispatchEvent("stoped")
        },
        toggle: function() {
            this.interval ? this.stop() : this.start()
        },
        pause: function() {
            this.stop()
        },
        resume: function() {
            this.start()
        },
        remove: function() {
            this.stop.call(this),
            e[this.instanceNumber] = null,
            delete this.$el.data().countdownInstance
        },
        setFinalDate: function(t) {
            this.finalDate = function(t) {
                if (t instanceof Date)
                    return t;
                if (String(t).match(s))
                    return String(t).match(/^[0-9]*$/) && (t = Number(t)),
                    String(t).match(/\-/) && (t = String(t).replace(/\-/g, "/")),
                    new Date(t);
                throw new Error("Couldn't cast `" + t + "` to a date object.")
            }(t)
        },
        update: function() {
            if (0 !== this.$el.closest("html").length) {
                var e, s = void 0 !== t._data(this.el, "events"), i = new Date;
                e = this.finalDate.getTime() - i.getTime(),
                e = Math.ceil(e / 1e3),
                e = !this.options.elapse && e < 0 ? 0 : Math.abs(e),
                this.totalSecsLeft !== e && s && (this.totalSecsLeft = e,
                this.elapsed = i >= this.finalDate,
                this.offset = {
                    seconds: this.totalSecsLeft % 60,
                    minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                    hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                    days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                    daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                    daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                    weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                    weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                    months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                    years: Math.abs(this.finalDate.getFullYear() - i.getFullYear()),
                    totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                    totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                    totalMinutes: Math.floor(this.totalSecsLeft / 60),
                    totalSeconds: this.totalSecsLeft
                },
                this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(),
                this.dispatchEvent("finish")))
            } else
                this.remove()
        },
        dispatchEvent: function(e) {
            var s, i = t.Event(e + ".countdown");
            i.finalDate = this.finalDate,
            i.elapsed = this.elapsed,
            i.offset = t.extend({}, this.offset),
            i.strftime = (s = this.offset,
            function(t) {
                var e, i, a = t.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
                if (a)
                    for (var h = 0, l = a.length; h < l; ++h) {
                        var r = a[h].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/)
                          , c = (e = r[0],
                        i = void 0,
                        i = e.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"),
                        new RegExp(i))
                          , f = r[1] || ""
                          , u = r[3] || ""
                          , p = null;
                        r = r[2],
                        n.hasOwnProperty(r) && (p = n[r],
                        p = Number(s[p])),
                        null !== p && ("!" === f && (p = o(u, p)),
                        "" === f && p < 10 && (p = "0" + p.toString()),
                        t = t.replace(c, p.toString()))
                    }
                return t = t.replace(/%%/, "%")
            }
            ),
            this.$el.trigger(i)
        }
    }),
    t.fn.countdown = function() {
        var s = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            var i = t(this).data("countdown-instance");
            if (void 0 !== i) {
                var n = e[i]
                  , o = s[0];
                a.prototype.hasOwnProperty(o) ? n[o].apply(n, s.slice(1)) : null === String(o).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (n.setFinalDate.call(n, o),
                n.start()) : t.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, o))
            } else
                new a(this,s[0],s[1])
        })
    }
});
