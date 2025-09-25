// https://datafa.st/js/script.js

!(function () {
  "use strict";
  const t = document.currentScript,
    e = "data-",
    n = t.getAttribute.bind(t);
  function o(t) {
    if (!t) return !1;
    const e = t.toLowerCase();
    return (
      !!["localhost", "127.0.0.1", "::1"].includes(e) ||
      !!/^127(\.[0-9]+){0,3}$/.test(e) ||
      !!/^(\[)?::1?\]?$/.test(e) ||
      !(!e.endsWith(".local") && !e.endsWith(".localhost"))
    );
  }
  function a() {
    try {
      if (
        !0 === window.navigator.webdriver ||
        window.callPhantom ||
        window._phantom ||
        window.__nightmare
      )
        return !0;
      if (
        !window.navigator ||
        !window.location ||
        !window.document ||
        "object" != typeof window.navigator ||
        "object" != typeof window.location ||
        "object" != typeof window.document
      )
        return !0;
      const t = window.navigator;
      if (
        !t.userAgent ||
        "" === t.userAgent ||
        "undefined" === t.userAgent ||
        t.userAgent.length < 5
      )
        return !0;
      const e = t.userAgent.toLowerCase();
      if (
        e.includes("headlesschrome") ||
        e.includes("phantomjs") ||
        e.includes("selenium") ||
        e.includes("webdriver") ||
        e.includes("puppeteer") ||
        e.includes("playwright")
      )
        return !0;
      const n = [
        "__webdriver_evaluate",
        "__selenium_evaluate",
        "__webdriver_script_function",
        "__webdriver_unwrapped",
        "__fxdriver_evaluate",
        "__driver_evaluate",
        "_Selenium_IDE_Recorder",
        "_selenium",
        "calledSelenium",
        "$cdc_asdjflasutopfhvcZLmcfl_",
      ];
      for (const t of n) if (void 0 !== window[t]) return !0;
      if (
        document.documentElement &&
        (document.documentElement.getAttribute("webdriver") ||
          document.documentElement.getAttribute("selenium") ||
          document.documentElement.getAttribute("driver"))
      )
        return !0;
      if (
        e.includes("python") ||
        e.includes("curl") ||
        e.includes("wget") ||
        e.includes("java/") ||
        e.includes("go-http") ||
        e.includes("node.js") ||
        e.includes("axios") ||
        e.includes("postman")
      )
        return !0;
    } catch (t) {
      return !1;
    }
    return !1;
  }
  function s(t, e, n) {
    let a = "";
    if (n) {
      const t = new Date();
      t.setTime(t.getTime() + 24 * n * 60 * 60 * 1e3),
        (a = "; expires=" + t.toUTCString());
    }
    let s = t + "=" + (e || "") + a + "; path=/";
    h &&
      !o(window.location.hostname) &&
      "file:" !== window.location.protocol &&
      (s += "; domain=." + h.replace(/^\./, "")),
      (document.cookie = s);
  }
  function r(t) {
    const e = t + "=",
      n = document.cookie.split(";");
    for (let t = 0; t < n.length; t++) {
      let o = n[t];
      for (; " " === o.charAt(0); ) o = o.substring(1, o.length);
      if (0 === o.indexOf(e)) return o.substring(e.length, o.length);
    }
    return null;
  }
  function i() {
    let t = r("datafast_visitor_id");
    return (
      t ||
        ((t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (t) {
            const e = (16 * Math.random()) | 0;
            return ("x" == t ? e : (3 & e) | 8).toString(16);
          }
        )),
        s("datafast_visitor_id", t, 365)),
      t
    );
  }
  function c() {
    let t = r("datafast_session_id");
    return (
      t ||
        ((t = "sxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (t) {
            const e = (16 * Math.random()) | 0;
            return ("x" == t ? e : (3 & e) | 8).toString(16);
          }
        )),
        s("datafast_session_id", t, 1 / 48)),
      t
    );
  }
  let l = [];
  window.datafast &&
    window.datafast.q &&
    Array.isArray(window.datafast.q) &&
    (l = window.datafast.q.map((t) => Array.from(t)));
  let d = !0,
    u = "";
  d && a() && ((d = !1), (u = "Tracking disabled - bot detected"));
  const f = "true" === n(e + "allow-file-protocol"),
    m = "true" === n(e + "allow-localhost");
  d &&
    ((o(window.location.hostname) && !m) ||
      ("file:" === window.location.protocol && !f)) &&
    ((d = !1),
    (u =
      "file:" === window.location.protocol
        ? "Tracking disabled on file protocol (use data-allow-file-protocol='true' to enable)"
        : "Tracking disabled on localhost (use data-allow-localhost='true' to enable)"));
  const g = "true" === n(e + "debug");
  d &&
    window !== window.parent &&
    !g &&
    ((d = !1), (u = "Tracking disabled inside an iframe"));
  const w = n(e + "website-id"),
    h = n(e + "domain");
  !d || (w && h) || ((d = !1), (u = "Missing website ID or domain"));
  const p = !t.src.includes("datafa.st"),
    _ = n(e + "api-url") || window.location.origin,
    x = p ? new URL("/api/events", _).href : "https://datafa.st/api/events";
  function v() {
    const t = window.location.href;
    if (!t)
      return void console.warn(
        "DataFast: Unable to collect href. This may indicate incorrect script implementation or browser issues."
      );
    const e = new URL(t),
      n = {},
      o = e.searchParams.get("fbclid"),
      a = e.searchParams.get("gclid"),
      s = e.searchParams.get("gclsrc"),
      r = e.searchParams.get("wbraid"),
      l = e.searchParams.get("gbraid"),
      d = e.searchParams.get("li_fat_id"),
      u = e.searchParams.get("msclkid"),
      f = e.searchParams.get("ttclid"),
      m = e.searchParams.get("twclid");
    a && (n.gclid = a),
      s && (n.gclsrc = s),
      r && (n.wbraid = r),
      l && (n.gbraid = l),
      d && (n.li_fat_id = d),
      o && (n.fbclid = o),
      u && (n.msclkid = u),
      f && (n.ttclid = f),
      m && (n.twclid = m);
    return {
      websiteId: w,
      domain: h,
      href: t,
      referrer: document.referrer || null,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      visitorId: i(),
      sessionId: c(),
      adClickIds: Object.keys(n).length > 0 ? n : void 0,
    };
  }
  function y(t, e) {
    return "true" === localStorage.getItem("datafast_ignore")
      ? (console.log("DataFast: Tracking disabled via localStorage flag"),
        void (e && e({ status: 200 })))
      : a()
        ? (console.log("DataFast: Bot detected, not sending data"),
          void (e && e({ status: 200 })))
        : void (function (t, e) {
            const n = new XMLHttpRequest();
            n.open("POST", x, !0),
              n.setRequestHeader("Content-Type", "application/json"),
              (n.onreadystatechange = function () {
                if (n.readyState === XMLHttpRequest.DONE) {
                  if (200 === n.status) {
                    console.log("Event data sent successfully");
                    s("datafast_session_id", c(), 1 / 48);
                  } else console.error("Error sending event data:", n.status);
                  e && e({ status: n.status });
                }
              }),
              n.send(JSON.stringify(t));
          })(t, e);
  }
  let b = 0,
    D = "";
  function S(t) {
    if (!d) return void (t && t({ status: 200 }));
    const e = Date.now(),
      n = window.location.href;
    if (n === D && e - b < 6e4)
      return (
        console.log("DataFast: Pageview throttled - too recent"),
        void (t && t({ status: 200 }))
      );
    (b = e),
      (D = n),
      (function (t, e) {
        try {
          sessionStorage.setItem(
            "datafast_pageview_state",
            JSON.stringify({ time: t, url: e })
          );
        } catch (t) {}
      })(e, n);
    const o = v();
    (o.type = "pageview"), y(o, t);
  }
  function E(t, e, n) {
    if (!d) return void (n && n({ status: 200 }));
    const o = v();
    (o.type = "payment"),
      "stripe" === t
        ? (o.extraData = { stripe_session_id: e })
        : "lemonsqueezy" === t
          ? (o.extraData = { lemonsqueezy_order_id: e })
          : "polar" === t && (o.extraData = { polar_checkout_id: e }),
      y(o, n);
  }
  function I(t, e, n) {
    if (!d) return void (n && n({ status: 200 }));
    const o = v();
    (o.type = t), (o.extraData = e), y(o, n);
  }
  function A(t, e) {
    if (d)
      if (t)
        if ("payment" !== t || e?.email)
          if ("identify" !== t || e?.user_id)
            if ("payment" === t) I(t, { email: e.email });
            else if ("identify" === t)
              !(function (t, e, n) {
                if (!d) return void (n && n({ status: 200 }));
                const o = v();
                (o.type = "identify"),
                  (o.extraData = { user_id: t, name: e.name || "", ...e }),
                  y(o, n);
              })(e.user_id, e);
            else {
              const n = k(e || {});
              if (null === n)
                return void console.error(
                  "DataFast: Custom event rejected due to validation errors"
                );
              I("custom", { eventName: t, ...n });
            }
          else console.warn(`DataFast: Missing user_id for ${t} event`);
        else console.warn(`DataFast: Missing email for ${t} event`);
      else console.warn("DataFast: Missing event_name for custom event");
    else console.log(`DataFast: Event '${t}' ignored - ${u}`);
  }
  function k(t) {
    if (!t || "object" != typeof t || Array.isArray(t))
      return console.warn("DataFast: customData must be a non-null object"), {};
    const e = {};
    let n = 0;
    function o(t) {
      if (null == t) return "";
      let e = String(t);
      return (
        e.length > 255 && (e = e.substring(0, 255)),
        (e = e
          .replace(/[<>'"&]/g, "")
          .replace(/javascript:/gi, "")
          .replace(/on\w+=/gi, "")
          .replace(/data:/gi, "")
          .replace(/vbscript:/gi, "")
          .trim()),
        e
      );
    }
    for (const [s, r] of Object.entries(t)) {
      if ("eventName" === s) {
        e[s] = o(r);
        continue;
      }
      if (n >= 10)
        return (
          console.error("DataFast: Maximum 10 custom parameters allowed"), null
        );
      if (
        "string" != typeof (a = s) ||
        0 === a.length ||
        a.length > 32 ||
        !/^[a-z0-9_-]+$/.test(a.toLowerCase())
      )
        return (
          console.error(
            `DataFast: Invalid property name "${s}". Use only lowercase letters, numbers, underscores, and hyphens. Max 32 characters.`
          ),
          null
        );
      const t = s.toLowerCase(),
        i = o(r);
      (e[t] = i), n++;
    }
    var a;
    return e;
  }
  if (
    ((window.datafast = A),
    window.datafast.q && delete window.datafast.q,
    (function () {
      for (; l.length > 0; ) {
        const t = l.shift();
        if (Array.isArray(t) && t.length > 0)
          try {
            A.apply(null, t);
          } catch (e) {
            console.error("DataFast: Error processing queued call:", e, t);
          }
      }
    })(),
    !d)
  )
    return void console.warn(`DataFast: ${u}`);
  function L(t) {
    t &&
      t.href &&
      (function (t) {
        try {
          const e = new URL(t, window.location.origin);
          if ("http:" !== e.protocol && "https:" !== e.protocol) return !1;
          return window.location.hostname !== e.hostname;
        } catch {
          return !1;
        }
      })(t.href) &&
      I("external_link", { url: t.href, text: t.textContent.trim() });
  }
  function F(t) {
    const e = t.getAttribute("data-fast-goal");
    if (e && e.trim()) {
      const n = { eventName: e.trim() };
      for (const e of t.attributes)
        if (
          e.name.startsWith("data-fast-goal-") &&
          "data-fast-goal" !== e.name
        ) {
          const t = e.name.substring(15);
          if (t) {
            n[t.replace(/-/g, "_")] = e.value;
          }
        }
      const o = k(n);
      null !== o && I("custom", o);
    }
  }
  function q(t, e) {
    const n = t.getAttribute("data-fast-scroll");
    if (n && n.trim()) {
      const o = t.getAttribute("data-fast-scroll-delay");
      let a = 0;
      if (null !== o) {
        const t = parseInt(o, 10);
        !isNaN(t) && t >= 0 && (a = t);
      }
      const s = () => {
        const o = t.getBoundingClientRect();
        if (!(o.bottom > 0 && o.top < window.innerHeight))
          return void e.unobserve(t);
        const s = (function () {
            const t = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
              ),
              e = window.innerHeight,
              n = window.pageYOffset || document.documentElement.scrollTop,
              o = t - e;
            return o <= 0 ? 100 : Math.min(100, Math.round((n / o) * 100));
          })(),
          r = t.getAttribute("data-fast-scroll-threshold");
        let i = 0.5;
        if (null !== r) {
          const t = parseFloat(r);
          !isNaN(t) && t >= 0 && t <= 1 && (i = t);
        }
        const c = {
          eventName: n.trim(),
          scroll_percentage: s.toString(),
          threshold: i.toString(),
          delay: a.toString(),
        };
        for (const e of t.attributes)
          if (
            e.name.startsWith("data-fast-scroll-") &&
            "data-fast-scroll" !== e.name &&
            "data-fast-scroll-threshold" !== e.name &&
            "data-fast-scroll-delay" !== e.name
          ) {
            const t = e.name.substring(17);
            if (t) {
              c[t.replace(/-/g, "_")] = e.value;
            }
          }
        const l = k(c);
        null !== l && I("custom", l), e.unobserve(t);
      };
      a > 0 ? setTimeout(s, a) : s();
    }
  }
  function M() {
    if (!window.IntersectionObserver)
      return void console.warn(
        "DataFast: Intersection Observer not supported, scroll tracking disabled"
      );
    const t = document.querySelectorAll("[data-fast-scroll]");
    if (0 === t.length) return;
    const e = new Map();
    t.forEach(function (t) {
      const n = t.getAttribute("data-fast-scroll-threshold");
      let o = 0.5;
      if (null !== n) {
        const t = parseFloat(n);
        !isNaN(t) && t >= 0 && t <= 1
          ? (o = t)
          : console.warn(
              `DataFast: Invalid threshold value "${n}" for element. Using default 0.5. Threshold must be between 0 and 1.`
            );
      }
      e.has(o) || e.set(o, []), e.get(o).push(t);
    }),
      e.forEach(function (t, e) {
        const n = new IntersectionObserver(
          function (t) {
            t.forEach(function (t) {
              t.isIntersecting && q(t.target, n);
            });
          },
          { root: null, rootMargin: "0px", threshold: e }
        );
        t.forEach(function (t) {
          n.observe(t);
        });
      });
  }
  !(function () {
    try {
      const t = sessionStorage.getItem("datafast_pageview_state");
      if (t) {
        const { time: e, url: n } = JSON.parse(t);
        (b = e || 0), (D = n || "");
      }
    } catch (t) {
      (b = 0), (D = "");
    }
  })(),
    document.addEventListener("click", function (t) {
      const e = t.target.closest("[data-fast-goal]");
      e && F(e);
      L(t.target.closest("a"));
    }),
    document.addEventListener("keydown", function (t) {
      if ("Enter" === t.key || " " === t.key) {
        const e = t.target.closest("[data-fast-goal]");
        e && F(e);
        L(t.target.closest("a"));
      }
    }),
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", M)
      : M();
  let P = null;
  function T() {
    S(),
      (function () {
        try {
          const t = new URL(window.location.href).searchParams.get(
            "session_id"
          );
          t &&
            t.startsWith("cs_") &&
            !sessionStorage.getItem("datafast_stripe_payment_sent_" + t) &&
            (E("stripe", t),
            sessionStorage.setItem("datafast_stripe_payment_sent_" + t, "1"));
        } catch (t) {
          console.error("Error auto detecting Stripe session ID:", t);
        }
      })(),
      (function () {
        try {
          const t = new URL(window.location.href).searchParams.get(
            "checkout_id"
          );
          t &&
            !sessionStorage.getItem("datafast_polar_payment_sent_" + t) &&
            (E("polar", t),
            sessionStorage.setItem("datafast_polar_payment_sent_" + t, "1"));
        } catch (t) {
          console.error("Error auto detecting Polar checkout ID:", t);
        }
      })(),
      (function () {
        try {
          const t = new URL(window.location.href).searchParams.get("order_id");
          t &&
            !sessionStorage.getItem(
              "datafast_lemonsqueezy_payment_sent_" + t
            ) &&
            (E("lemonsqueezy", t),
            sessionStorage.setItem(
              "datafast_lemonsqueezy_payment_sent_" + t,
              "1"
            ));
        } catch (t) {
          console.error("Error auto detecting Lemonsqueezy order ID:", t);
        }
      })();
  }
  function j() {
    P && clearTimeout(P), (P = setTimeout(T, 100));
  }
  T();
  let N = window.location.pathname;
  const O = window.history.pushState;
  (window.history.pushState = function () {
    O.apply(this, arguments),
      N !== window.location.pathname && ((N = window.location.pathname), j());
  }),
    window.addEventListener("popstate", function () {
      N !== window.location.pathname && ((N = window.location.pathname), j());
    });
})();
