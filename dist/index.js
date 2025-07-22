import an, { useCallback as I, useState as X, useRef as _e, useEffect as te, useMemo as Nt, forwardRef as sn, useImperativeHandle as un } from "react";
var ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ae(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function cn(n) {
  if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
  var s = n.default;
  if (typeof s == "function") {
    var o = function u() {
      var t = !1;
      try {
        t = this instanceof u;
      } catch {
      }
      return t ? Reflect.construct(s, arguments, this.constructor) : s.apply(this, arguments);
    };
    o.prototype = s.prototype;
  } else o = {};
  return Object.defineProperty(o, "__esModule", { value: !0 }), Object.keys(n).forEach(function(u) {
    var t = Object.getOwnPropertyDescriptor(n, u);
    Object.defineProperty(o, u, t.get ? t : {
      enumerable: !0,
      get: function() {
        return n[u];
      }
    });
  }), o;
}
var ye = { exports: {} }, ue = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tt;
function ln() {
  if (tt) return ue;
  tt = 1;
  var n = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function o(u, t, r) {
    var f = null;
    if (r !== void 0 && (f = "" + r), t.key !== void 0 && (f = "" + t.key), "key" in t) {
      r = {};
      for (var i in t)
        i !== "key" && (r[i] = t[i]);
    } else r = t;
    return t = r.ref, {
      $$typeof: n,
      type: u,
      key: f,
      ref: t !== void 0 ? t : null,
      props: r
    };
  }
  return ue.Fragment = s, ue.jsx = o, ue.jsxs = o, ue;
}
var ce = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nt;
function fn() {
  return nt || (nt = 1, process.env.NODE_ENV !== "production" && function() {
    function n(v) {
      if (v == null) return null;
      if (typeof v == "function")
        return v.$$typeof === k ? null : v.displayName || v.name || null;
      if (typeof v == "string") return v;
      switch (v) {
        case E:
          return "Fragment";
        case M:
          return "Profiler";
        case A:
          return "StrictMode";
        case w:
          return "Suspense";
        case T:
          return "SuspenseList";
        case N:
          return "Activity";
      }
      if (typeof v == "object")
        switch (typeof v.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), v.$$typeof) {
          case b:
            return "Portal";
          case R:
            return (v.displayName || "Context") + ".Provider";
          case j:
            return (v._context.displayName || "Context") + ".Consumer";
          case S:
            var x = v.render;
            return v = v.displayName, v || (v = x.displayName || x.name || "", v = v !== "" ? "ForwardRef(" + v + ")" : "ForwardRef"), v;
          case _:
            return x = v.displayName || null, x !== null ? x : n(v.type) || "Memo";
          case g:
            x = v._payload, v = v._init;
            try {
              return n(v(x));
            } catch {
            }
        }
      return null;
    }
    function s(v) {
      return "" + v;
    }
    function o(v) {
      try {
        s(v);
        var x = !1;
      } catch {
        x = !0;
      }
      if (x) {
        x = console;
        var P = x.error, C = typeof Symbol == "function" && Symbol.toStringTag && v[Symbol.toStringTag] || v.constructor.name || "Object";
        return P.call(
          x,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          C
        ), s(v);
      }
    }
    function u(v) {
      if (v === E) return "<>";
      if (typeof v == "object" && v !== null && v.$$typeof === g)
        return "<...>";
      try {
        var x = n(v);
        return x ? "<" + x + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function t() {
      var v = F.A;
      return v === null ? null : v.getOwner();
    }
    function r() {
      return Error("react-stack-top-frame");
    }
    function f(v) {
      if (q.call(v, "key")) {
        var x = Object.getOwnPropertyDescriptor(v, "key").get;
        if (x && x.isReactWarning) return !1;
      }
      return v.key !== void 0;
    }
    function i(v, x) {
      function P() {
        le || (le = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          x
        ));
      }
      P.isReactWarning = !0, Object.defineProperty(v, "key", {
        get: P,
        configurable: !0
      });
    }
    function c() {
      var v = n(this.type);
      return re[v] || (re[v] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), v = this.props.ref, v !== void 0 ? v : null;
    }
    function d(v, x, P, C, U, V, G, oe) {
      return P = V.ref, v = {
        $$typeof: m,
        type: v,
        key: x,
        props: V,
        _owner: U
      }, (P !== void 0 ? P : null) !== null ? Object.defineProperty(v, "ref", {
        enumerable: !1,
        get: c
      }) : Object.defineProperty(v, "ref", { enumerable: !1, value: null }), v._store = {}, Object.defineProperty(v._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(v, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(v, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: G
      }), Object.defineProperty(v, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: oe
      }), Object.freeze && (Object.freeze(v.props), Object.freeze(v)), v;
    }
    function h(v, x, P, C, U, V, G, oe) {
      var L = x.children;
      if (L !== void 0)
        if (C)
          if (H(L)) {
            for (C = 0; C < L.length; C++)
              e(L[C]);
            Object.freeze && Object.freeze(L);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else e(L);
      if (q.call(x, "key")) {
        L = n(v);
        var Y = Object.keys(x).filter(function(we) {
          return we !== "key";
        });
        C = 0 < Y.length ? "{key: someKey, " + Y.join(": ..., ") + ": ...}" : "{key: someKey}", W[L + C] || (Y = 0 < Y.length ? "{" + Y.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          C,
          L,
          Y,
          L
        ), W[L + C] = !0);
      }
      if (L = null, P !== void 0 && (o(P), L = "" + P), f(x) && (o(x.key), L = "" + x.key), "key" in x) {
        P = {};
        for (var ae in x)
          ae !== "key" && (P[ae] = x[ae]);
      } else P = x;
      return L && i(
        P,
        typeof v == "function" ? v.displayName || v.name || "Unknown" : v
      ), d(
        v,
        L,
        V,
        U,
        t(),
        P,
        G,
        oe
      );
    }
    function e(v) {
      typeof v == "object" && v !== null && v.$$typeof === m && v._store && (v._store.validated = 1);
    }
    var l = an, m = Symbol.for("react.transitional.element"), b = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), A = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), j = Symbol.for("react.consumer"), R = Symbol.for("react.context"), S = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), N = Symbol.for("react.activity"), k = Symbol.for("react.client.reference"), F = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = Object.prototype.hasOwnProperty, H = Array.isArray, $ = console.createTask ? console.createTask : function() {
      return null;
    };
    l = {
      "react-stack-bottom-frame": function(v) {
        return v();
      }
    };
    var le, re = {}, ie = l["react-stack-bottom-frame"].bind(
      l,
      r
    )(), fe = $(u(r)), W = {};
    ce.Fragment = E, ce.jsx = function(v, x, P, C, U) {
      var V = 1e4 > F.recentlyCreatedOwnerStacks++;
      return h(
        v,
        x,
        P,
        !1,
        C,
        U,
        V ? Error("react-stack-top-frame") : ie,
        V ? $(u(v)) : fe
      );
    }, ce.jsxs = function(v, x, P, C, U) {
      var V = 1e4 > F.recentlyCreatedOwnerStacks++;
      return h(
        v,
        x,
        P,
        !0,
        C,
        U,
        V ? Error("react-stack-top-frame") : ie,
        V ? $(u(v)) : fe
      );
    };
  }()), ce;
}
var rt;
function dn() {
  return rt || (rt = 1, process.env.NODE_ENV === "production" ? ye.exports = ln() : ye.exports = fn()), ye.exports;
}
var z = dn(), We = hn;
function hn(n, s, o) {
  if (n != null && typeof n != "number")
    throw new Error("start must be a number or null");
  if (s != null && typeof s != "number")
    throw new Error("stop must be a number or null");
  if (o != null && typeof o != "number")
    throw new Error("step must be a number or null");
  s == null && (s = n || 0, n = 0), o == null && (o = s > n ? 1 : -1);
  for (var u = [], t = n < s; t ? n < s : n > s; n += o)
    u.push(n);
  return u;
}
var Re = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
var it;
function pn() {
  return it || (it = 1, function(n) {
    (function() {
      var s = {}.hasOwnProperty;
      function o() {
        for (var r = "", f = 0; f < arguments.length; f++) {
          var i = arguments[f];
          i && (r = t(r, u(i)));
        }
        return r;
      }
      function u(r) {
        if (typeof r == "string" || typeof r == "number")
          return r;
        if (typeof r != "object")
          return "";
        if (Array.isArray(r))
          return o.apply(null, r);
        if (r.toString !== Object.prototype.toString && !r.toString.toString().includes("[native code]"))
          return r.toString();
        var f = "";
        for (var i in r)
          s.call(r, i) && r[i] && (f = t(f, i));
        return f;
      }
      function t(r, f) {
        return f ? r ? r + " " + f : r + f : r;
      }
      n.exports ? (o.default = o, n.exports = o) : window.classNames = o;
    })();
  }(Re)), Re.exports;
}
var vn = pn();
const Ke = /* @__PURE__ */ Ae(vn), mn = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"], gn = ["Db", "Eb", "Gb", "Ab", "Bb"], yn = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11
}, Ee = 12, Ye = Ee, Je = 127, bn = /([a-g])([#b]?)(\d+)/, He = 12;
function _n(n) {
  if (!n)
    throw Error("Invalid note argument");
  const s = bn.exec(n.toLowerCase());
  if (!s)
    throw Error("Invalid note argument");
  const [, o, u, t] = s, r = `${o.toUpperCase()}${u}`, f = yn[r];
  if (f == null)
    throw Error("Invalid note argument");
  return Ee + f + He * parseInt(t, 10);
}
function En(n) {
  const s = (n - Ee) % He, o = Math.floor((n - Ee) / He), u = mn[s];
  return {
    note: `${u}${o}`,
    pitchName: u,
    octave: o,
    midiNumber: n,
    isAccidental: gn.includes(u)
  };
}
function An() {
  return We(Ye, Je + 1).reduce((n, s) => (n[s] = En(s), n), {});
}
const wn = An();
function Mt(n) {
  const s = wn[n];
  if (!s)
    throw Error("Invalid MIDI number");
  return s;
}
const Sn = We(Ye, Je + 1).filter(
  (n) => !Mt(n).isAccidental
), ne = {
  fromNote: _n,
  getAttributes: Mt,
  MIN_MIDI_NUMBER: Ye,
  MAX_MIDI_NUMBER: Je,
  NATURAL_MIDI_NUMBERS: Sn
}, Rn = {
  C: 0,
  Db: 0.55,
  D: 1,
  Eb: 1.8,
  E: 2,
  F: 3,
  Gb: 3.5,
  G: 4,
  Ab: 4.7,
  A: 5,
  Bb: 5.85,
  B: 6
};
function ot(n) {
  return `${n * 100}%`;
}
const Tn = (n) => {
  const {
    midiNumber: s,
    naturalKeyWidth: o,
    gliss: u = !1,
    useTouchEvents: t = !1,
    accidental: r = !1,
    active: f = !1,
    disabled: i = !1,
    onPlayNoteInput: c,
    onStopNoteInput: d,
    accidentalWidthRatio: h = 0.55,
    pitchPositions: e = Rn,
    noteRange: l,
    label: m,
    keyColor: b
  } = n, E = (w) => {
    const { octave: _, pitchName: g } = ne.getAttributes(w), N = e[g], k = 7 * _;
    return N + k;
  }, A = (w) => E(w) - E(l.first), M = I(() => {
    c(s);
  }, [c, s]), j = I(() => {
    d(s);
  }, [d, s]), R = typeof b == "string" ? b : b?.backgroundColor, S = typeof b == "object" && b.color;
  return /* @__PURE__ */ z.jsx(
    "div",
    {
      className: Ke("ReactPiano__Key", {
        "ReactPiano__Key--accidental": r,
        "ReactPiano__Key--natural": !r,
        "ReactPiano__Key--disabled": i,
        "ReactPiano__Key--active": f
      }),
      style: {
        left: ot(A(s) * o),
        width: ot(
          r ? h * o : o
        ),
        backgroundColor: R
      },
      onMouseDown: t ? void 0 : M,
      onMouseUp: t ? void 0 : j,
      onMouseEnter: u ? M : void 0,
      onMouseLeave: j,
      onTouchStart: t ? M : void 0,
      onTouchCancel: t ? j : void 0,
      onTouchEnd: t ? j : void 0,
      children: !i && /* @__PURE__ */ z.jsx("div", { className: "ReactPiano__NoteLabelContainer", children: /* @__PURE__ */ z.jsx(
        "div",
        {
          className: Ke("ReactPiano__NoteLabel", {
            "ReactPiano__NoteLabel--active": f,
            "ReactPiano__NoteLabel--accidental": r,
            "ReactPiano__NoteLabel--natural": !r
          }),
          style: S ? { color: S } : {},
          children: m
        }
      ) })
    }
  );
}, xn = (n) => {
  const {
    noteRange: s,
    activeNotes: o,
    onPlayNoteInput: u,
    onStopNoteInput: t,
    keyWidthToHeight: r = 0.33,
    className: f = "",
    disabled: i = !1,
    gliss: c = !1,
    useTouchEvents: d = !1,
    width: h,
    disableActiveStying: e,
    keyLabels: l = {},
    keyColors: m = {}
  } = n, b = I(() => We(s.first, s.last + 1), [s.first, s.last]), E = I(() => b().filter((w) => {
    const { isAccidental: T } = ne.getAttributes(w);
    return !T;
  }).length, [b]), A = I(() => 1 / E(), [E]), M = I(() => h || "100%", [h]), j = I(() => h ? `${h * A() / (r || 0.33)}px` : "100%", [h, A, r]), R = b(), S = A();
  return /* @__PURE__ */ z.jsx(
    "div",
    {
      className: Ke("ReactPiano__Keyboard", f),
      style: { width: M(), height: j() },
      children: R.map((w) => {
        const { isAccidental: T } = ne.getAttributes(w), _ = !i && o.includes(w);
        return /* @__PURE__ */ z.jsx(
          Tn,
          {
            naturalKeyWidth: S,
            midiNumber: w,
            noteRange: s,
            active: !e && _,
            accidental: T,
            disabled: i,
            onPlayNoteInput: u,
            onStopNoteInput: t,
            gliss: c,
            useTouchEvents: d,
            label: l[w],
            keyColor: m[w]
          },
          w
        );
      })
    }
  );
}, Nn = (n) => {
  const {
    noteRange: s,
    activeNotes: o = [],
    onAddActiveNote: u = () => 0,
    onRemoveActiveNote: t = () => 0,
    className: r,
    disabled: f = !1,
    disableActiveStying: i = !1,
    width: c,
    keyWidthToHeight: d,
    keyLabels: h,
    keyColors: e
  } = n, [l, m] = X(!1), [b, E] = X(!1), A = I((w) => {
    f || u(w);
  }, [f, u]), M = I((w) => {
    f || t(w);
  }, [f, t]), j = () => m(!0), R = () => m(!1), S = () => E(!0);
  return /* @__PURE__ */ z.jsx(
    "div",
    {
      style: { width: "100%", height: "100%" },
      onMouseDown: j,
      onMouseUp: R,
      onTouchStart: S,
      "data-testid": "container",
      children: /* @__PURE__ */ z.jsx(
        xn,
        {
          noteRange: s,
          onPlayNoteInput: A,
          onStopNoteInput: M,
          activeNotes: o,
          className: r,
          disabled: f,
          width: c,
          keyWidthToHeight: d,
          gliss: l,
          useTouchEvents: b,
          disableActiveStying: i,
          keyLabels: h,
          keyColors: e
        }
      )
    }
  );
};
var Te = { exports: {} }, xe = { exports: {} }, Ne, at;
function Mn() {
  if (at) return Ne;
  at = 1;
  function n(o) {
    return o > 64 && o < 91 ? o - 65 : o > 96 && o < 123 ? o - 71 : o > 47 && o < 58 ? o + 4 : o === 43 ? 62 : o === 47 ? 63 : 0;
  }
  function s(o, u) {
    for (var t = o.replace(/[^A-Za-z0-9\+\/]/g, ""), r = t.length, f = u ? Math.ceil((r * 3 + 1 >> 2) / u) * u : r * 3 + 1 >> 2, i = new Uint8Array(f), c, d, h = 0, e = 0, l = 0; l < r; l++)
      if (d = l & 3, h |= n(t.charCodeAt(l)) << 18 - 6 * d, d === 3 || r - l === 1) {
        for (c = 0; c < 3 && e < f; c++, e++)
          i[e] = h >>> (16 >>> c & 24) & 255;
        h = 0;
      }
    return i;
  }
  return Ne = { decode: s }, Ne;
}
var Me, st;
function kn() {
  return st || (st = 1, Me = function(n, s) {
    return new Promise(function(o, u) {
      var t = new XMLHttpRequest();
      s && (t.responseType = s), t.open("GET", n), t.onload = function() {
        t.status === 200 ? o(t.response) : u(Error(t.statusText));
      }, t.onerror = function() {
        u(Error("Network Error"));
      }, t.send();
    });
  }), Me;
}
var ut;
function On() {
  return ut || (ut = 1, function(n) {
    var s = Mn(), o = kn();
    function u(_) {
      return function(g) {
        return typeof g == "string" && _.test(g);
      };
    }
    function t(_, g) {
      return typeof _ == "string" ? _ + g : typeof _ == "function" ? _(g) : g;
    }
    function r(_, g, N, k) {
      var F = (
        // Basic audio loading
        f(g) ? i : c(g) ? d : h(g) ? e : l(g) ? m : b(g) ? E : A(g) ? M : j(g) ? R : S(g) ? w : null
      ), q = N || {};
      return F ? F(_, g, q) : k ? Promise.resolve(k) : Promise.reject("Source not valid (" + g + ")");
    }
    r.fetch = o;
    function f(_) {
      return _ instanceof ArrayBuffer;
    }
    function i(_, g, N) {
      return new Promise(function(k, F) {
        _.decodeAudioData(
          g,
          function(q) {
            k(q);
          },
          function() {
            F("Can't decode audio data (" + g.slice(0, 30) + "...)");
          }
        );
      });
    }
    var c = u(/\.(mp3|wav|ogg)(\?.*)?$/i);
    function d(_, g, N) {
      var k = t(N.from, g);
      return r(_, r.fetch(k, "arraybuffer"), N);
    }
    function h(_) {
      return _ && typeof _.then == "function";
    }
    function e(_, g, N) {
      return g.then(function(k) {
        return r(_, k, N);
      });
    }
    var l = Array.isArray;
    function m(_, g, N) {
      return Promise.all(g.map(function(k) {
        return r(_, k, N, k);
      }));
    }
    function b(_) {
      return _ && typeof _ == "object";
    }
    function E(_, g, N) {
      var k = {}, F = Object.keys(g).map(function(q) {
        if (N.only && N.only.indexOf(q) === -1) return null;
        var H = g[q];
        return r(_, H, N, H).then(function($) {
          k[q] = $;
        });
      });
      return Promise.all(F).then(function() {
        return k;
      });
    }
    var A = u(/\.json(\?.*)?$/i);
    function M(_, g, N) {
      var k = t(N.from, g);
      return r(_, r.fetch(k, "text").then(JSON.parse), N);
    }
    var j = u(/^data:audio/);
    function R(_, g, N) {
      var k = g.indexOf(",");
      return r(_, s.decode(g.slice(k + 1)).buffer, N);
    }
    var S = u(/\.js(\?.*)?$/i);
    function w(_, g, N) {
      var k = t(N.from, g);
      return r(_, r.fetch(k, "text").then(T), N);
    }
    function T(_) {
      var g = _.indexOf("MIDI.Soundfont.");
      if (g < 0) throw Error("Invalid MIDI.js Soundfont format");
      g = _.indexOf("=", g) + 2;
      var N = _.lastIndexOf(",");
      return JSON.parse(_.slice(g, N) + "}");
    }
    n.exports && (n.exports = r), typeof window < "u" && (window.loadAudio = r);
  }(xe)), xe.exports;
}
var ke = { exports: {} }, Oe, ct;
function jn() {
  if (ct) return Oe;
  ct = 1, Oe = n;
  function n(i) {
    var c = i.createGain(), d = c._voltage = u(i), h = t(d), e = t(d), l = t(d);
    return c._startAmount = t(e), c._endAmount = t(l), c._multiplier = t(h), c._multiplier.connect(c), c._startAmount.connect(c), c._endAmount.connect(c), c.value = h.gain, c.startValue = e.gain, c.endValue = l.gain, c.startValue.value = 0, c.endValue.value = 0, Object.defineProperties(c, s), c;
  }
  var s = {
    attack: { value: 0, writable: !0 },
    decay: { value: 0, writable: !0 },
    sustain: { value: 1, writable: !0 },
    release: { value: 0, writable: !0 },
    getReleaseDuration: {
      value: function() {
        return this.release;
      }
    },
    start: {
      value: function(i) {
        var c = this._multiplier.gain, d = this._startAmount.gain, h = this._endAmount.gain;
        this._voltage.start(i), this._decayFrom = this._decayFrom = i + this.attack, this._startedAt = i;
        var e = this.sustain;
        c.cancelScheduledValues(i), d.cancelScheduledValues(i), h.cancelScheduledValues(i), h.setValueAtTime(0, i), this.attack ? (c.setValueAtTime(0, i), c.linearRampToValueAtTime(1, i + this.attack), d.setValueAtTime(1, i), d.linearRampToValueAtTime(0, i + this.attack)) : (c.setValueAtTime(1, i), d.setValueAtTime(0, i)), this.decay && c.setTargetAtTime(e, this._decayFrom, r(this.decay));
      }
    },
    stop: {
      value: function(i, c) {
        c && (i = i - this.release);
        var d = i + this.release;
        if (this.release) {
          var h = this._multiplier.gain, e = this._startAmount.gain, l = this._endAmount.gain;
          h.cancelScheduledValues(i), e.cancelScheduledValues(i), l.cancelScheduledValues(i);
          var m = r(this.release);
          if (this.attack && i < this._decayFrom) {
            var b = f(0, 1, this._startedAt, this._decayFrom, i);
            h.linearRampToValueAtTime(b, i), e.linearRampToValueAtTime(1 - b, i), e.setTargetAtTime(0, i, m);
          }
          l.setTargetAtTime(1, i, m), h.setTargetAtTime(0, i, m);
        }
        return this._voltage.stop(d), d;
      }
    },
    onended: {
      get: function() {
        return this._voltage.onended;
      },
      set: function(i) {
        this._voltage.onended = i;
      }
    }
  }, o = new Float32Array([1, 1]);
  function u(i) {
    var c = i.createBufferSource(), d = i.createBuffer(1, 2, i.sampleRate);
    return d.getChannelData(0).set(o), c.buffer = d, c.loop = !0, c;
  }
  function t(i) {
    var c = i.context.createGain();
    return i.connect(c), c;
  }
  function r(i) {
    return Math.log(i + 1) / Math.log(100);
  }
  function f(i, c, d, h, e) {
    var l = c - i, m = h - d, b = e - d, E = b / m, A = i + E * l;
    return A <= i && (A = i), A >= c && (A = c), A;
  }
  return Oe;
}
var je, lt;
function Pn() {
  if (lt) return je;
  lt = 1;
  var n = jn(), s = {}, o = {
    gain: 1,
    attack: 0.01,
    decay: 0.1,
    sustain: 0.9,
    release: 0.3,
    loop: !1,
    cents: 0,
    loopStart: 0,
    loopEnd: 0
  };
  function u(c, d, h) {
    var e = !1, l = 0, m = {}, b = c.createGain();
    b.gain.value = 1;
    var E = Object.assign({}, o, h), A = { context: c, out: b, opts: E };
    return d instanceof AudioBuffer ? A.buffer = d : A.buffers = d, A.start = function(R, S, w) {
      if (A.buffer && R !== null) return A.start(null, R, S);
      var T = R ? A.buffers[R] : A.buffer;
      if (T) {
        if (!e) {
          console.warn("SamplePlayer not connected to any node.");
          return;
        }
      } else {
        console.warn("Buffer " + R + " not found.");
        return;
      }
      var _ = w || s;
      S = Math.max(c.currentTime, S || 0), A.emit("start", S, R, _);
      var g = j(R, T, _);
      return g.id = M(R, g), g.env.start(S), g.source.start(S), A.emit("started", S, g.id, g), _.duration && g.stop(S + _.duration), g;
    }, A.play = function(R, S, w) {
      return A.start(R, S, w);
    }, A.stop = function(R, S) {
      var w;
      return S = S || Object.keys(m), S.map(function(T) {
        return w = m[T], w ? (w.stop(R), w.id) : null;
      });
    }, A.connect = function(R) {
      return e = !0, b.connect(R), A;
    }, A.emit = function(R, S, w, T) {
      A.onevent && A.onevent(R, S, w, T);
      var _ = A["on" + R];
      _ && _(S, w, T);
    }, A;
    function M(R, S) {
      return S.id = l++, m[S.id] = S, S.source.onended = function() {
        var w = c.currentTime;
        S.source.disconnect(), S.env.disconnect(), S.disconnect(), A.emit("ended", w, S.id, S);
      }, S.id;
    }
    function j(R, S, w) {
      var T = c.createGain();
      return T.gain.value = 0, T.connect(b), T.env = f(c, w, E), T.env.connect(T.gain), T.source = c.createBufferSource(), T.source.buffer = S, T.source.connect(T), T.source.loop = w.loop || E.loop, T.source.playbackRate.value = i(w.cents || E.cents), T.source.loopStart = w.loopStart || E.loopStart, T.source.loopEnd = w.loopEnd || E.loopEnd, T.stop = function(_) {
        var g = _ || c.currentTime;
        A.emit("stop", g, R);
        var N = T.env.stop(g);
        T.source.stop(N);
      }, T;
    }
  }
  function t(c) {
    return typeof c == "number";
  }
  var r = ["attack", "decay", "sustain", "release"];
  function f(c, d, h) {
    var e = n(c), l = d.adsr || h.adsr;
    return r.forEach(function(m, b) {
      l ? e[m] = l[b] : e[m] = d[m] || h[m];
    }), e.value.value = t(d.gain) ? d.gain : t(h.gain) ? h.gain : 1, e;
  }
  function i(c) {
    return c ? Math.pow(2, c / 1200) : 1;
  }
  return je = u, je;
}
var Pe, ft;
function In() {
  if (ft) return Pe;
  ft = 1, Pe = function(s) {
    return s.on = function(o, u) {
      if (arguments.length === 1 && typeof o == "function") return s.on("event", o);
      var t = "on" + o, r = s[t];
      return s[t] = r ? n(r, u) : u, s;
    }, s;
  };
  function n(s, o) {
    return function(u, t, r, f) {
      s(u, t, r, f), o(u, t, r, f);
    };
  }
  return Pe;
}
var Ie, dt;
function Cn() {
  if (dt) return Ie;
  dt = 1;
  var n = /^([a-gA-G])(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)\s*$/;
  function s() {
    return n;
  }
  var o = [0, 2, 4, 5, 7, 9, 11];
  function u(i, c, d) {
    if (typeof i != "string") return null;
    var h = n.exec(i);
    if (!h || !c && h[4]) return null;
    var e = { letter: h[1].toUpperCase(), acc: h[2].replace(/x/g, "##") };
    return e.pc = e.letter + e.acc, e.step = (e.letter.charCodeAt(0) + 3) % 7, e.alt = e.acc[0] === "b" ? -e.acc.length : e.acc.length, e.chroma = o[e.step] + e.alt, h[3] && (e.oct = +h[3], e.midi = e.chroma + 12 * (e.oct + 1), e.freq = t(e.midi, d)), c && (e.tonicOf = h[4]), e;
  }
  function t(i, c) {
    return Math.pow(2, (i - 69) / 12) * (c || 440);
  }
  var r = { parse: u, regex: s, midiToFreq: t }, f = ["letter", "acc", "pc", "step", "alt", "chroma", "oct", "midi", "freq"];
  return f.forEach(function(i) {
    r[i] = function(c) {
      var d = u(c);
      return d && typeof d[i] < "u" ? d[i] : null;
    };
  }), Ie = r, Ie;
}
var Ce, ht;
function Ln() {
  if (ht) return Ce;
  ht = 1;
  var n = Cn(), s = function(t) {
    return t !== null && t !== [] && t >= 0 && t < 129;
  }, o = function(t) {
    return s(t) ? +t : n.midi(t);
  };
  Ce = function(t) {
    if (t.buffers) {
      var r = t.opts.map, f = typeof r == "function" ? r : o, i = function(d) {
        return d ? f(d) || d : null;
      };
      t.buffers = u(t.buffers, i);
      var c = t.start;
      t.start = function(d, h, e) {
        var l = i(d), m = l % 1;
        return m && (l = Math.floor(l), e = Object.assign(e || {}, { cents: Math.floor(m * 100) })), c(l, h, e);
      };
    }
    return t;
  };
  function u(t, r) {
    return Object.keys(t).reduce(function(f, i) {
      return f[r(i)] = t[i], f;
    }, {});
  }
  return Ce;
}
var Le, pt;
function Fn() {
  if (pt) return Le;
  pt = 1;
  var n = Array.isArray, s = function(u) {
    return u && typeof u == "object";
  }, o = {};
  return Le = function(u) {
    return u.schedule = function(t, r) {
      var f = u.context.currentTime, i = t < f ? f : t;
      u.emit("schedule", i, r);
      var c, d, h, e;
      return r.map(function(l) {
        if (l) n(l) ? (c = l[0], d = l[1]) : (c = l.time, d = l);
        else return null;
        return s(d) ? (h = d.name || d.key || d.note || d.midi || null, e = d) : (h = d, e = o), u.start(h, i + (c || 0), e);
      });
    }, u;
  }, Le;
}
function be(n) {
  throw new Error('Could not dynamically require "' + n + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Fe = { exports: {} }, vt;
function Dn() {
  return vt || (vt = 1, function(n, s) {
    (function(o) {
      n.exports = o();
    })(function() {
      return function o(u, t, r) {
        function f(d, h) {
          if (!t[d]) {
            if (!u[d]) {
              var e = typeof be == "function" && be;
              if (!h && e) return e(d, !0);
              if (i) return i(d, !0);
              var l = new Error("Cannot find module '" + d + "'");
              throw l.code = "MODULE_NOT_FOUND", l;
            }
            var m = t[d] = { exports: {} };
            u[d][0].call(m.exports, function(b) {
              var E = u[d][1][b];
              return f(E || b);
            }, m, m.exports, o, u, t, r);
          }
          return t[d].exports;
        }
        for (var i = typeof be == "function" && be, c = 0; c < r.length; c++) f(r[c]);
        return f;
      }({ 1: [function(o, u, t) {
        Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function(r) {
          function f(i) {
            if (this._event = i, this._data = i.data, this.receivedTime = i.receivedTime, this._data && this._data.length < 2) {
              console.warn("Illegal MIDI message of length", this._data.length);
              return;
            }
            switch (this._messageCode = i.data[0] & 240, this.channel = i.data[0] & 15, this._messageCode) {
              case 128:
                this.messageType = "noteoff", this.key = i.data[1] & 127, this.velocity = i.data[2] & 127;
                break;
              case 144:
                this.messageType = "noteon", this.key = i.data[1] & 127, this.velocity = i.data[2] & 127;
                break;
              case 160:
                this.messageType = "keypressure", this.key = i.data[1] & 127, this.pressure = i.data[2] & 127;
                break;
              case 176:
                this.messageType = "controlchange", this.controllerNumber = i.data[1] & 127, this.controllerValue = i.data[2] & 127, this.controllerNumber === 120 && this.controllerValue === 0 ? this.channelModeMessage = "allsoundoff" : this.controllerNumber === 121 ? this.channelModeMessage = "resetallcontrollers" : this.controllerNumber === 122 ? this.controllerValue === 0 ? this.channelModeMessage = "localcontroloff" : this.channelModeMessage = "localcontrolon" : this.controllerNumber === 123 && this.controllerValue === 0 ? this.channelModeMessage = "allnotesoff" : this.controllerNumber === 124 && this.controllerValue === 0 ? this.channelModeMessage = "omnimodeoff" : this.controllerNumber === 125 && this.controllerValue === 0 ? this.channelModeMessage = "omnimodeon" : this.controllerNumber === 126 ? this.channelModeMessage = "monomodeon" : this.controllerNumber === 127 && (this.channelModeMessage = "polymodeon");
                break;
              case 192:
                this.messageType = "programchange", this.program = i.data[1];
                break;
              case 208:
                this.messageType = "channelpressure", this.pressure = i.data[1] & 127;
                break;
              case 224:
                this.messageType = "pitchbendchange";
                var c = i.data[2] & 127, d = i.data[1] & 127;
                this.pitchBend = (c << 8) + d;
                break;
            }
          }
          return new f(r);
        }, u.exports = t.default;
      }, {}] }, {}, [1])(1);
    });
  }(Fe)), Fe.exports;
}
var De, mt;
function qn() {
  if (mt) return De;
  mt = 1;
  var n = Dn();
  return De = function(s) {
    return s.listenToMidi = function(o, u) {
      var t = {}, r = u || {}, f = r.gain || function(i) {
        return i / 127;
      };
      return o.onmidimessage = function(i) {
        var c = i.messageType ? i : n(i);
        if (c.messageType === "noteon" && c.velocity === 0 && (c.messageType = "noteoff"), !(r.channel && c.channel !== r.channel))
          switch (c.messageType) {
            case "noteon":
              t[c.key] = s.play(c.key, 0, { gain: f(c.velocity) });
              break;
            case "noteoff":
              t[c.key] && (t[c.key].stop(), delete t[c.key]);
              break;
          }
      }, s;
    }, s;
  }, De;
}
var gt;
function $n() {
  return gt || (gt = 1, function(n) {
    var s = Pn(), o = In(), u = Ln(), t = Fn(), r = qn();
    function f(i, c, d) {
      return r(t(u(o(s(i, c, d)))));
    }
    n.exports && (n.exports = f), typeof window < "u" && (window.SamplePlayer = f);
  }(ke)), ke.exports;
}
function yt(n, s) {
  return Array(s + 1).join(n);
}
function Xe(n) {
  return typeof n == "number";
}
function Bn(n) {
  return typeof n == "string";
}
function Vn(n) {
  return typeof n < "u";
}
function kt(n, s) {
  return Math.pow(2, (n - 69) / 12) * (s || 440);
}
var Ot = /^([a-gA-G])(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)\s*$/;
function Un() {
  return Ot;
}
var Gn = [0, 2, 4, 5, 7, 9, 11];
function K(n, s, o) {
  if (typeof n != "string") return null;
  var u = Ot.exec(n);
  if (!u || !s && u[4]) return null;
  var t = { letter: u[1].toUpperCase(), acc: u[2].replace(/x/g, "##") };
  t.pc = t.letter + t.acc, t.step = (t.letter.charCodeAt(0) + 3) % 7, t.alt = t.acc[0] === "b" ? -t.acc.length : t.acc.length;
  var r = Gn[t.step] + t.alt;
  return t.chroma = r < 0 ? 12 + r : r % 12, u[3] && (t.oct = +u[3], t.midi = r + 12 * (t.oct + 1), t.freq = kt(t.midi, o)), s && (t.tonicOf = u[4]), t;
}
var Kn = "CDEFGAB";
function Hn(n) {
  return Xe(n) ? n < 0 ? yt("b", -n) : yt("#", n) : "";
}
function Wn(n) {
  return Xe(n) ? "" + n : "";
}
function jt(n, s, o) {
  return n === null || typeof n > "u" ? null : n.step ? jt(n.step, n.alt, n.oct) : n < 0 || n > 6 ? null : Kn.charAt(n) + Hn(s) + Wn(o);
}
function Pt(n) {
  if ((Xe(n) || Bn(n)) && n >= 0 && n < 128) return +n;
  var s = K(n);
  return s && Vn(s.midi) ? s.midi : null;
}
function Yn(n, s) {
  var o = Pt(n);
  return o === null ? null : kt(o, s);
}
function Jn(n) {
  return (K(n) || {}).letter;
}
function Xn(n) {
  return (K(n) || {}).acc;
}
function zn(n) {
  return (K(n) || {}).pc;
}
function Zn(n) {
  return (K(n) || {}).step;
}
function Qn(n) {
  return (K(n) || {}).alt;
}
function er(n) {
  return (K(n) || {}).chroma;
}
function tr(n) {
  return (K(n) || {}).oct;
}
const nr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  acc: Xn,
  alt: Qn,
  build: jt,
  chroma: er,
  freq: Yn,
  letter: Jn,
  midi: Pt,
  oct: tr,
  parse: K,
  pc: zn,
  regex: Un,
  step: Zn
}, Symbol.toStringTag, { value: "Module" })), rr = /* @__PURE__ */ cn(nr);
var qe, bt;
function ir() {
  if (bt) return qe;
  bt = 1;
  var n = rr;
  function s(t, r) {
    if (console.warn("new Soundfont() is deprected"), console.log("Please use Soundfont.instrument() instead of new Soundfont().instrument()"), !(this instanceof s)) return new s(t);
    this.nameToUrl = r || s.nameToUrl, this.ctx = t, this.instruments = {}, this.promises = [];
  }
  s.prototype.onready = function(t) {
    console.warn("deprecated API"), console.log("Please use Promise.all(Soundfont.instrument(), Soundfont.instrument()).then() instead of new Soundfont().onready()"), Promise.all(this.promises).then(t);
  }, s.prototype.instrument = function(t, r) {
    console.warn("new Soundfont().instrument() is deprecated."), console.log("Please use Soundfont.instrument() instead.");
    var f = this.ctx;
    if (t = t || "default", t in this.instruments) return this.instruments[t];
    var i = { name: t, play: u(f, r) };
    if (this.instruments[t] = i, t !== "default") {
      var c = s.instrument(f, t, r).then(function(d) {
        return i.play = d.play, i;
      });
      this.promises.push(c), i.onready = function(d) {
        console.warn("onready is deprecated. Use Soundfont.instrument().then()"), c.then(d);
      };
    } else
      i.onready = function(d) {
        console.warn("onready is deprecated. Use Soundfont.instrument().then()"), d();
      };
    return i;
  };
  function o(t, r, f) {
    return console.warn("Soundfont.loadBuffers is deprecate."), console.log("Use Soundfont.instrument(..) and get buffers properties from the result."), s.instrument(t, r, f).then(function(i) {
      return i.buffers;
    });
  }
  s.loadBuffers = o;
  function u(t, r) {
    return r = r || {}, function(f, i, c, d) {
      console.warn("The oscillator player is deprecated."), console.log("Starting with version 0.9.0 you will have to wait until the soundfont is loaded to play sounds.");
      var h = f > 0 && f < 129 ? +f : n.midi(f), e = h ? n.midiToFreq(h, 440) : null;
      if (e) {
        c = c || 0.2, d = d || {};
        var l = d.destination || r.destination || t.destination, m = d.vcoType || r.vcoType || "sine", b = d.gain || r.gain || 0.4, E = t.createOscillator();
        E.type = m, E.frequency.value = e;
        var A = t.createGain();
        return A.gain.value = b, E.connect(A), A.connect(l), E.start(i), c > 0 && E.stop(i + c), E;
      }
    };
  }
  return s.noteToMidi = n.midi, qe = s, qe;
}
var _t;
function or() {
  return _t || (_t = 1, function(n) {
    var s = On(), o = $n();
    function u(i, c, d) {
      if (arguments.length === 1) return function(b, E) {
        return u(i, b, E);
      };
      var h = d || {}, e = h.isSoundfontURL || t, l = h.nameToUrl || r, m = e(c) ? c : l(c, h.soundfont, h.format);
      return s(i, m, { only: h.only || h.notes }).then(function(b) {
        var E = o(i, b, h).connect(h.destination ? h.destination : i.destination);
        return E.url = m, E.name = c, E;
      });
    }
    function t(i) {
      return /\.js(\?.*)?$/i.test(i);
    }
    function r(i, c, d) {
      return d = d === "ogg" ? d : "mp3", c = c === "FluidR3_GM" ? c : "MusyngKite", "https://gleitz.github.io/midi-js-soundfonts/" + c + "/" + i + "-" + d + ".js";
    }
    var f = ir();
    f.instrument = u, f.nameToUrl = r, n.exports && (n.exports = f), typeof window < "u" && (window.Soundfont = f);
  }(Te)), Te.exports;
}
var It = or();
const ar = /* @__PURE__ */ Ae(It), ee = {
  soundfontHostname: "https://d1pzp51pvbm36p.cloudfront.net",
  soundfont: "MusyngKite",
  instrumentName: "acoustic_grand_piano",
  format: "mp3"
};
function sr(n) {
  const {
    audioContext: s,
    instrumentName: o = ee.instrumentName,
    hostname: u = ee.soundfontHostname,
    format: t = ee.format,
    soundfont: r = ee.soundfont
  } = n, [f, i] = X(), [c, d] = X(!0), [h, e] = X({}), l = _e(void 0);
  l.current = f, te(() => {
    d(!0), i(void 0), ar.instrument(s, o, {
      format: t,
      soundfont: r,
      nameToUrl: (M, j, R) => `${u}/${j}/${M}-${R}.js`
    }).then((M) => {
      i(M), d(!1);
    });
  }, [o, u, t, r, s]);
  const m = I(() => s.state === "suspended" ? s.resume() : Promise.resolve(), [s]), b = I(
    (M) => {
      m().then(() => {
        if (!l.current) return;
        const j = l.current.play(String(M));
        e((R) => ({
          ...R,
          [M]: j
        }));
      });
    },
    [m]
  ), E = I(
    (M) => {
      m().then(() => {
        e((j) => {
          const R = j[M];
          return R && R.stop(), { ...j, [M]: null };
        });
      });
    },
    [m]
  ), A = I(() => {
    m().then(() => {
      e((M) => (Object.values(M).forEach((j) => {
        j && j.stop();
      }), {}));
    });
  }, [m]);
  return {
    isLoading: c,
    playNote: b,
    stopNote: E,
    stopAllNotes: A
  };
}
const Er = (n = ee.soundfontHostname, s = ee.soundfont) => {
  const [o, u] = X([]);
  return te(() => {
    fetch(`${n}/${s}/names.json`).then((t) => t.json()).then((t) => {
      u(t);
    });
  }, [n, s]), { instrumentList: o };
};
function ur({ firstNote: n, lastNote: s, keyboardConfig: o }) {
  let u = n, t = 0;
  const r = {};
  for (
    ;
    // There are still keys to be assigned
    t < o.length && // Note to be assigned does not surpass range
    u <= s;
  ) {
    const f = o[t], { isAccidental: i } = ne.getAttributes(u);
    i ? r[u] = f.flat : (r[u] = f.natural, t++), u++;
  }
  return r;
}
const Et = {
  create: ur,
  // Preset configurations
  BOTTOM_ROW: [
    { natural: "z", flat: "a", sharp: "s" },
    { natural: "x", flat: "s", sharp: "d" },
    { natural: "c", flat: "d", sharp: "f" },
    { natural: "v", flat: "f", sharp: "g" },
    { natural: "b", flat: "g", sharp: "h" },
    { natural: "n", flat: "h", sharp: "j" },
    { natural: "m", flat: "j", sharp: "k" },
    { natural: ",", flat: "k", sharp: "l" },
    { natural: ".", flat: "l", sharp: ";" },
    { natural: "/", flat: ";", sharp: "'" }
  ],
  HOME_ROW: [
    { natural: "a", flat: "q", sharp: "w" },
    { natural: "s", flat: "w", sharp: "e" },
    { natural: "d", flat: "e", sharp: "r" },
    { natural: "f", flat: "r", sharp: "t" },
    { natural: "g", flat: "t", sharp: "y" },
    { natural: "h", flat: "y", sharp: "u" },
    { natural: "j", flat: "u", sharp: "i" },
    { natural: "k", flat: "i", sharp: "o" },
    { natural: "l", flat: "o", sharp: "p" },
    { natural: ";", flat: "p", sharp: "[" },
    { natural: "'", flat: "[", sharp: "]" }
  ],
  QWERTY_ROW: [
    { natural: "q", flat: "1", sharp: "2" },
    { natural: "w", flat: "2", sharp: "3" },
    { natural: "e", flat: "3", sharp: "4" },
    { natural: "r", flat: "4", sharp: "5" },
    { natural: "t", flat: "5", sharp: "6" },
    { natural: "y", flat: "6", sharp: "7" },
    { natural: "u", flat: "7", sharp: "8" },
    { natural: "i", flat: "8", sharp: "9" },
    { natural: "o", flat: "9", sharp: "0" },
    { natural: "p", flat: "0", sharp: "-" },
    { natural: "[", flat: "-", sharp: "=" }
  ]
}, Ct = (n) => ({ noteRange: Nt(() => typeof n.first == "number" ? { first: n.first, last: n.last } : {
  first: ne.fromNote(n.first),
  last: ne.fromNote(n.last)
}, [n.first, n.last]) }), cr = (n) => {
  const {
    noteRange: s,
    initialOffset: o = 0,
    onAddActiveNote: u = () => 0,
    onRemoveActiveNote: t = () => 0
  } = n, { noteRange: r } = Ct(s), [f, i] = X(o), c = Nt(() => Et.create({
    firstNote: r.first + f,
    lastNote: r.last + f,
    keyboardConfig: Et.HOME_ROW
  }), [r, f]), d = I(
    (m) => {
      const b = {
        ArrowLeft: -1,
        ArrowRight: 1
      }[m.key] || 0;
      if (b === 0) return;
      const E = r.last - r.first + 1, A = 0, M = E - Object.keys(c).length, j = Math.max(
        A,
        Math.min(
          M,
          f + b
        )
      );
      i(j);
    },
    [r, f, c]
  ), h = I((m) => {
    if (!c) return null;
    const b = Object.keys(c).find((E) => c[Number(E)] === m);
    return b ? Number(b) : null;
  }, [c]), e = I(
    (m) => {
      if (m.ctrlKey || m.metaKey || m.shiftKey) return;
      const b = h(m.key.toLowerCase());
      b && u(b);
    },
    [h, u]
  ), l = I(
    (m) => {
      const b = h(m.key.toLowerCase());
      b && t(b);
    },
    [h, t]
  );
  return te(() => (window.addEventListener("keydown", e), window.addEventListener("keyup", l), window.addEventListener("keyup", d), () => {
    window.removeEventListener("keydown", e), window.removeEventListener("keyup", l), window.removeEventListener("keyup", d);
  }), [e, l, d]), {
    keyboardShortcuts: c
  };
}, Ar = () => {
  const [n, s] = X([]), o = I((t) => {
    s((r) => r.includes(t) ? r : [...r, t]);
  }, []), u = I((t) => {
    s((r) => r.filter((f) => f !== t));
  }, []);
  return {
    activeNotes: n,
    addActiveNote: o,
    removeActiveNote: u
  };
};
var $e, At;
function lr() {
  if (At) return $e;
  At = 1;
  var n = function() {
    return (/* @__PURE__ */ new Date()).getTime() + Math.floor(Math.random() * 1e6);
  }, s = function(r, f, i, c, d) {
    return r = Math.max(f, Math.min(i, r)) / (i - f), r * (d - c) + c;
  }, o = function(r, f, i) {
    return Math.max(f, Math.min(i, r));
  }, u = function(t, r) {
    var f = function() {
    };
    this.midiLearn = t, this.id = r.id || n(), this.min = parseFloat(r.min || 0), this.max = parseFloat(r.max), this.channel = null, this.activeCallbacks = {}, this.events = {
      change: r.events.change || f,
      bind: r.events.bind || f,
      unbind: r.events.unbind || f,
      cancel: r.events.cancel || f,
      listen: r.events.listen || f
    }, this.setValue(o(parseFloat(r.value || 0), this.min, this.max));
  };
  return u.prototype.id = null, u.prototype.min = null, u.prototype.max = null, u.prototype.value = null, u.prototype.channel = null, u.prototype.activeCallbacks = null, u.prototype.events = null, u.prototype.unbind = function() {
    this.midiLearn.removeBinding(this);
  }, u.prototype.startListening = function() {
    this.midiLearn.startListeningForBinding(this);
  }, u.prototype.stopListening = function() {
    this.midiLearn.startListeningForBinding(this);
  }, u.prototype.setValue = function(t, r) {
    var f;
    t && r ? f = s(t[r], 0, 127, this.min, this.max) : typeof t == "number" ? f = t : f = this.min, f !== this.value && (this.value = f, this.events.change(this.id, f));
  }, $e = u, $e;
}
var Be, wt;
function fr() {
  if (wt) return Be;
  wt = 1;
  var n = lr(), s = function(o) {
    this.smi = o, this.bindings = {};
  };
  return s.prototype.smi = null, s.prototype.currentMidiLearning = null, s.prototype.bindings = null, s.prototype.getMidiLearning = function(o) {
    return new n(this, o);
  }, s.prototype.listenerForBinding = function(o) {
    if (this.currentMidiLearning && o) {
      var u = this.currentMidiLearning;
      u.events.bind(o), this.stopListeningForBinding(), this.addBinding(u, o);
    }
  }, s.prototype.startListeningForBinding = function(o) {
    this.stopListeningForBinding(), this.currentMidiLearning = o, o.listener = this.listenerForBinding.bind(this), o.events.listen(o), this.smi.on("global", o.listener);
  }, s.prototype.stopListeningForBinding = function(o) {
    this.currentMidiLearning !== null && (!o || this.currentMidiLearning === o) && (this.smi.off("global", this.currentMidiLearning.listener), this.currentMidiLearning.events.cancel(), this.currentMidiLearning = null);
  }, s.prototype.setCallback = function(o, u, t) {
    o.activeCallbacks[u] = t, this.smi.on(u, o.channel, t);
  }, s.prototype.removeBinding = function(o) {
    if (o && o.activeCallbacks) {
      var u = o.activeCallbacks;
      for (var t in u)
        u.hasOwnProperty(t) && this.smi.off(t, o.channel, u[t]);
      o.activeCallbacks = {};
    }
    delete this.bindings[o.id];
  }, s.prototype.addBinding = function(o, u) {
    this.removeBinding(o), this.bindings[o.id] = o, u.event === "cc" ? this.addCCBinding(o, u) : u.event === "noteOn" && this.addNoteBinding(o, u);
  }, s.prototype.addNoteBinding = function(o, u) {
    o.channel = u.channel, this.setCallback(o, "noteOn", function(t) {
      t.key === u.key && o.setValue(t, "velocity");
    }), this.setCallback(o, "noteOff", function(t) {
      t.key === u.key && o.setValue();
    }), this.setCallback(o, "polyphonicAftertouch", function(t) {
      t.key === u.key && o.setValue(t, "pressure");
    });
  }, s.prototype.addCCBinding = function(o, u) {
    o.channel = u.channel, this.setCallback(o, "cc" + u.cc, function(t) {
      o.setValue(t, "value");
    });
  }, Be = s, Be;
}
var Ve, St;
function dr() {
  if (St) return Ve;
  St = 1;
  var n = fr(), s = function(e) {
    return !isNaN(parseFloat(e)) && isFinite(e);
  }, o = function(e) {
    return Object.prototype.toString.call(e) === "[object Array]";
  }, u = function(e) {
    return Object.prototype.toString.call(e) === "[object MIDIInputMap]";
  }, t = function(e) {
    return Object.prototype.toString.call(e) === "[object MIDIInput]";
  }, r = function(e) {
    return Object.prototype.toString.call(e) === "[object MIDIAccess]";
  }, f = function(e) {
    return typeof e == "function";
  }, i = function(e) {
    var l = Object.prototype.toString.call(e);
    return l === "[object Iterator]" || !!l.match(/^\[object( | [^ ]+ )Iterator\]$/);
  }, c = function(e) {
    var l = [], m;
    if (t(e))
      l.push(e);
    else if (r(e) && (e = e.inputs), f(e) ? e = e() : u(e) && (e = e.values()), o(e))
      l = e;
    else if (i(e))
      for (; m = e.next().value; )
        l.push(m);
    return l;
  }, d = function(e, l) {
    return (l << 7) + (e & 127);
  }, h = function(e) {
    this.events = {}, this.innerEventListeners = {}, e && this.attach(e);
  };
  return h.prototype.filter = null, h.prototype.events = null, h.prototype.innerEventListeners = null, h.prototype.attach = function(e) {
    for (var l = c(e), m = 0; m < l.length; m++)
      this.attachIndividual(l[m]);
    return this;
  }, h.prototype.attachIndividual = function(e) {
    if (!this.innerEventListeners[e.id]) {
      var l = e.onmidimessage, m, b = this;
      typeof l == "function" ? m = function(E) {
        l(E), b.processMidiMessage(E.data);
      } : m = function(E) {
        b.processMidiMessage(E.data);
      }, e.onmidimessage = m, this.innerEventListeners[e.id] = {
        input: e,
        listener: m
      };
    }
  }, h.prototype.detach = function(e) {
    for (var l = c(e), m = 0; m < l.length; m++)
      this.detachIndividual(l[m]);
    return this;
  }, h.prototype.detachIndividual = function(e) {
    if (this.innerEventListeners[e.id]) {
      var l = this.innerEventListeners[e.id].listener;
      e = this.innerEventListeners[e.id].input, e.removeEventListener("midimessage", l), delete this.innerEventListeners[e.id];
    }
  }, h.prototype.detachAll = function() {
    for (var e in this.innerEventListeners)
      if (this.innerEventListeners.hasOwnProperty(e)) {
        var l = this.innerEventListeners[l.id].input, m = this.innerEventListeners[l.id].listener;
        l.removeEventListener("midimessage", m);
      }
    return this.innerEventListeners = {}, this;
  }, h.prototype.parseMidiMessage = function(e) {
    var l;
    switch (e[0]) {
      case 0:
        return null;
      case 242:
        l = {
          event: "songPosition",
          position: d(e[1], e[2]),
          data: e
        };
        break;
      case 243:
        l = {
          event: "songSelect",
          song: e[1],
          data: e
        };
        break;
      case 246:
        l = {
          event: "tuneRequest",
          data: e
        };
        break;
      case 248:
        l = {
          event: "clock",
          command: "clock",
          data: e
        };
        break;
      case 250:
        l = {
          event: "clock",
          command: "start",
          data: e
        };
        break;
      case 251:
        l = {
          event: "clock",
          command: "continue",
          data: e
        };
        break;
      case 252:
        l = {
          event: "clock",
          command: "stop",
          data: e
        };
        break;
      case 254:
        l = {
          event: "activeSensing",
          data: e
        };
        break;
      case 255:
        l = {
          event: "reset",
          data: e
        };
        break;
    }
    return e[0] >= 224 && e[0] < 240 ? l = {
      event: "pitchWheel",
      channel: 1 + e[0] - 224,
      value: d(e[1], e[2]) - 8192,
      data: e
    } : e[0] >= 208 && e[0] < 224 ? l = {
      event: "channelAftertouch",
      channel: 1 + e[0] - 208,
      pressure: e[1],
      data: e
    } : e[0] >= 192 && e[0] < 208 ? l = {
      event: "programChange",
      channel: 1 + e[0] - 192,
      program: e[1],
      data: e
    } : e[0] >= 176 && e[0] < 192 ? l = {
      event: "cc",
      channel: 1 + e[0] - 176,
      cc: e[1],
      value: e[2],
      data: e
    } : e[0] >= 160 && e[0] < 176 ? l = {
      event: "polyphonicAftertouch",
      channel: 1 + e[0] - 160,
      key: e[1],
      pressure: e[2],
      data: e
    } : e[0] >= 144 && e[0] < 160 ? (l = {
      event: "noteOn",
      channel: 1 + e[0] - 144,
      key: e[1],
      velocity: e[2],
      data: e
    }, l.velocity === 0 && (l.velocity = 127, l.event = "noteOff")) : e[0] >= 128 && e[0] < 144 && (l = {
      event: "noteOff",
      channel: 1 + e[0] - 128,
      key: e[1],
      velocity: e[2],
      data: e
    }), l || (l = {
      event: "unknown",
      data: e
    }), l;
  }, h.prototype.processMidiMessage = function(e) {
    var l = this.parseMidiMessage(e);
    if (l) {
      if (this.filter && this.filter(l) === !1)
        return this;
      l.cc ? (this.trigger(l.event + l.cc, l), this.trigger(l.channel + "." + l.event + l.cc, l)) : (this.trigger(l.event, l), l.channel && this.trigger(l.channel + "." + l.event, l)), this.trigger("global", l);
    }
    return this;
  }, h.prototype.setFilter = function(e) {
    return f(e) ? this.filter = e : delete this.filter, this;
  }, h.prototype.on = function(e, l, m) {
    return f(l) ? m = l : s(l) && (e = l + "." + e), this.events[e] || (this.events[e] = []), this.events[e].push(m), this;
  }, h.prototype.off = function(e, l, m) {
    if (f(l) ? m = l : s(l) && (e = l + "." + e), !m)
      delete this.events[e];
    else {
      var b = this.events[e].indexOf(m);
      b >= 0 && this.events[e].splice(b, 1);
    }
    return this;
  }, h.prototype.trigger = function(e, l) {
    if (this.events[e] && this.events[e].length)
      for (var m = this.events[e].length; m--; )
        this.events[e][m].call(this, l);
    return this;
  }, h.prototype.getMidiLearnInstance = function() {
    return this.midiLearn || (this.midiLearn = new n(this)), this.midiLearn;
  }, h.prototype.getMidiLearning = function(e) {
    return this.getMidiLearnInstance().getMidiLearning(e);
  }, Ve = h, Ve;
}
var Ue, Rt;
function hr() {
  return Rt || (Rt = 1, Ue = dr()), Ue;
}
var pr = hr();
const vr = /* @__PURE__ */ Ae(pr), mr = (n) => {
  const {
    enableMidiInput: s = !0,
    onAddActiveNote: o = () => 0,
    onRemoveActiveNote: u = () => 0
  } = n, t = _e(new vr()), r = _e([]);
  te(() => {
    const f = t.current, i = (h) => {
      r.current.includes(h.key) || (r.current.push(h.key), o(h.key));
    }, c = (h) => {
      r.current = r.current.filter((e) => e !== h.key), u(h.key);
    }, d = () => {
      try {
        f.off("noteOn", i), f.off("noteOff", c), f.detach();
      } catch {
      }
    };
    return s && (f.on("noteOn", i), f.on("noteOff", c), navigator.requestMIDIAccess().then((h) => f.attach(h))), d;
  }, [s, o, u]);
};
var Ge, Tt;
function gr() {
  if (Tt) return Ge;
  Tt = 1;
  var n = 200, s = "__lodash_hash_undefined__", o = 9007199254740991, u = "[object Arguments]", t = "[object Function]", r = "[object GeneratorFunction]", f = /[\\^$.*+?()[\]{}|]/g, i = /^\[object .+?Constructor\]$/, c = typeof ge == "object" && ge && ge.Object === Object && ge, d = typeof self == "object" && self && self.Object === Object && self, h = c || d || Function("return this")();
  function e(a, p, y) {
    switch (y.length) {
      case 0:
        return a.call(p);
      case 1:
        return a.call(p, y[0]);
      case 2:
        return a.call(p, y[0], y[1]);
      case 3:
        return a.call(p, y[0], y[1], y[2]);
    }
    return a.apply(p, y);
  }
  function l(a, p) {
    var y = a ? a.length : 0;
    return !!y && E(a, p, 0) > -1;
  }
  function m(a, p) {
    for (var y = -1, O = p.length, D = a.length; ++y < O; )
      a[D + y] = p[y];
    return a;
  }
  function b(a, p, y, O) {
    for (var D = a.length, B = y + -1; ++B < D; )
      if (p(a[B], B, a))
        return B;
    return -1;
  }
  function E(a, p, y) {
    if (p !== p)
      return b(a, A, y);
    for (var O = y - 1, D = a.length; ++O < D; )
      if (a[O] === p)
        return O;
    return -1;
  }
  function A(a) {
    return a !== a;
  }
  function M(a, p) {
    return a.has(p);
  }
  function j(a, p) {
    return a?.[p];
  }
  function R(a) {
    var p = !1;
    if (a != null && typeof a.toString != "function")
      try {
        p = !!(a + "");
      } catch {
      }
    return p;
  }
  var S = Array.prototype, w = Function.prototype, T = Object.prototype, _ = h["__core-js_shared__"], g = function() {
    var a = /[^.]+$/.exec(_ && _.keys && _.keys.IE_PROTO || "");
    return a ? "Symbol(src)_1." + a : "";
  }(), N = w.toString, k = T.hasOwnProperty, F = T.toString, q = RegExp(
    "^" + N.call(k).replace(f, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), H = h.Symbol, $ = T.propertyIsEnumerable, le = S.splice, re = H ? H.isConcatSpreadable : void 0, ie = Math.max, fe = ze(h, "Map"), W = ze(Object, "create");
  function v(a) {
    var p = -1, y = a ? a.length : 0;
    for (this.clear(); ++p < y; ) {
      var O = a[p];
      this.set(O[0], O[1]);
    }
  }
  function x() {
    this.__data__ = W ? W(null) : {};
  }
  function P(a) {
    return this.has(a) && delete this.__data__[a];
  }
  function C(a) {
    var p = this.__data__;
    if (W) {
      var y = p[a];
      return y === s ? void 0 : y;
    }
    return k.call(p, a) ? p[a] : void 0;
  }
  function U(a) {
    var p = this.__data__;
    return W ? p[a] !== void 0 : k.call(p, a);
  }
  function V(a, p) {
    var y = this.__data__;
    return y[a] = W && p === void 0 ? s : p, this;
  }
  v.prototype.clear = x, v.prototype.delete = P, v.prototype.get = C, v.prototype.has = U, v.prototype.set = V;
  function G(a) {
    var p = -1, y = a ? a.length : 0;
    for (this.clear(); ++p < y; ) {
      var O = a[p];
      this.set(O[0], O[1]);
    }
  }
  function oe() {
    this.__data__ = [];
  }
  function L(a) {
    var p = this.__data__, y = he(p, a);
    if (y < 0)
      return !1;
    var O = p.length - 1;
    return y == O ? p.pop() : le.call(p, y, 1), !0;
  }
  function Y(a) {
    var p = this.__data__, y = he(p, a);
    return y < 0 ? void 0 : p[y][1];
  }
  function ae(a) {
    return he(this.__data__, a) > -1;
  }
  function we(a, p) {
    var y = this.__data__, O = he(y, a);
    return O < 0 ? y.push([a, p]) : y[O][1] = p, this;
  }
  G.prototype.clear = oe, G.prototype.delete = L, G.prototype.get = Y, G.prototype.has = ae, G.prototype.set = we;
  function Z(a) {
    var p = -1, y = a ? a.length : 0;
    for (this.clear(); ++p < y; ) {
      var O = a[p];
      this.set(O[0], O[1]);
    }
  }
  function Lt() {
    this.__data__ = {
      hash: new v(),
      map: new (fe || G)(),
      string: new v()
    };
  }
  function Ft(a) {
    return pe(this, a).delete(a);
  }
  function Dt(a) {
    return pe(this, a).get(a);
  }
  function qt(a) {
    return pe(this, a).has(a);
  }
  function $t(a, p) {
    return pe(this, a).set(a, p), this;
  }
  Z.prototype.clear = Lt, Z.prototype.delete = Ft, Z.prototype.get = Dt, Z.prototype.has = qt, Z.prototype.set = $t;
  function de(a) {
    var p = -1, y = a ? a.length : 0;
    for (this.__data__ = new Z(); ++p < y; )
      this.add(a[p]);
  }
  function Bt(a) {
    return this.__data__.set(a, s), this;
  }
  function Vt(a) {
    return this.__data__.has(a);
  }
  de.prototype.add = de.prototype.push = Bt, de.prototype.has = Vt;
  function he(a, p) {
    for (var y = a.length; y--; )
      if (Zt(a[y][0], p))
        return y;
    return -1;
  }
  function Ut(a, p, y, O) {
    var D = -1, B = l, J = !0, se = a.length, ve = [], on = p.length;
    if (!se)
      return ve;
    p.length >= n && (B = M, J = !1, p = new de(p));
    e:
      for (; ++D < se; ) {
        var Q = a[D], me = Q;
        if (Q = Q !== 0 ? Q : 0, J && me === me) {
          for (var et = on; et--; )
            if (p[et] === me)
              continue e;
          ve.push(Q);
        } else B(p, me, O) || ve.push(Q);
      }
    return ve;
  }
  function Gt(a, p, y, O, D) {
    var B = -1, J = a.length;
    for (y || (y = Wt), D || (D = []); ++B < J; ) {
      var se = a[B];
      y(se) && m(D, se);
    }
    return D;
  }
  function Kt(a) {
    if (!Qe(a) || Jt(a))
      return !1;
    var p = Ze(a) || R(a) ? q : i;
    return p.test(Xt(a));
  }
  function Ht(a, p) {
    return p = ie(p === void 0 ? a.length - 1 : p, 0), function() {
      for (var y = arguments, O = -1, D = ie(y.length - p, 0), B = Array(D); ++O < D; )
        B[O] = y[p + O];
      O = -1;
      for (var J = Array(p + 1); ++O < p; )
        J[O] = y[O];
      return J[p] = B, e(a, this, J);
    };
  }
  function pe(a, p) {
    var y = a.__data__;
    return Yt(p) ? y[typeof p == "string" ? "string" : "hash"] : y.map;
  }
  function ze(a, p) {
    var y = j(a, p);
    return Kt(y) ? y : void 0;
  }
  function Wt(a) {
    return en(a) || Qt(a) || !!(re && a && a[re]);
  }
  function Yt(a) {
    var p = typeof a;
    return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? a !== "__proto__" : a === null;
  }
  function Jt(a) {
    return !!g && g in a;
  }
  function Xt(a) {
    if (a != null) {
      try {
        return N.call(a);
      } catch {
      }
      try {
        return a + "";
      } catch {
      }
    }
    return "";
  }
  var zt = Ht(function(a, p) {
    return Se(a) ? Ut(a, Gt(p, 1, Se)) : [];
  });
  function Zt(a, p) {
    return a === p || a !== a && p !== p;
  }
  function Qt(a) {
    return Se(a) && k.call(a, "callee") && (!$.call(a, "callee") || F.call(a) == u);
  }
  var en = Array.isArray;
  function tn(a) {
    return a != null && nn(a.length) && !Ze(a);
  }
  function Se(a) {
    return rn(a) && tn(a);
  }
  function Ze(a) {
    var p = Qe(a) ? F.call(a) : "";
    return p == t || p == r;
  }
  function nn(a) {
    return typeof a == "number" && a > -1 && a % 1 == 0 && a <= o;
  }
  function Qe(a) {
    var p = typeof a;
    return !!a && (p == "object" || p == "function");
  }
  function rn(a) {
    return !!a && typeof a == "object";
  }
  return Ge = zt, Ge;
}
var yr = gr();
const xt = /* @__PURE__ */ Ae(yr), br = sn((n, s) => {
  const {
    activeNotes: o = [],
    onAddActiveNote: u = () => 0,
    onRemoveActiveNote: t = () => 0,
    width: r,
    instrumentName: f,
    noteRange: i,
    audioContext: c,
    soundfontHostname: d,
    disabled: h = !1,
    onPlayNote: e = () => 0,
    onStopNote: l = () => 0,
    keyLabels: m,
    keyboardShortcutInitialOffset: b = 0,
    enableKeyboardShortcuts: E = !0,
    enableMidiInput: A = !1,
    muted: M = !1,
    audioOnly: j = !1
  } = n, { noteRange: R } = Ct(i), S = _e(o), { playNote: w, stopNote: T, isLoading: _, stopAllNotes: g } = sr({
    audioContext: c,
    instrumentName: f,
    hostname: d
  });
  un(s, () => ({
    playNote: w,
    stopNote: T,
    stopAllNotes: g
  }), [w, T, g]);
  const { keyboardShortcuts: N } = cr({
    noteRange: R,
    initialOffset: b,
    onAddActiveNote: u,
    onRemoveActiveNote: t
  });
  return mr({
    enableMidiInput: A,
    onAddActiveNote: u,
    onRemoveActiveNote: t
  }), te(() => {
    g(), S.current = [];
  }, [f, R, N, g]), te(() => {
    if (h) return;
    const k = S.current || [], F = [...new Set(o)];
    S.current = F;
    const q = xt(k, F);
    xt(F, k).forEach(($) => {
      e($), M || w($);
    }), q.forEach(($) => {
      l($), M || T($);
    });
  }, [o, h, M, e, w, l, T]), /* @__PURE__ */ z.jsx(
    Nn,
    {
      ...n,
      activeNotes: o,
      onAddActiveNote: u,
      onRemoveActiveNote: t,
      noteRange: R,
      keyLabels: m || (E ? N : void 0),
      disabled: _ || h,
      disableActiveStying: j,
      width: r
    }
  );
});
br.displayName = "SoundfontPiano";
const wr = It.InstrumentName;
export {
  Nn as ControlledPiano,
  wr as InstrumentName,
  xn as Keyboard,
  Et as KeyboardShortcuts,
  ne as MidiNumbers,
  br as SoundfontPiano,
  Ar as useActiveNotes,
  Er as useInstrumentList,
  cr as useKeyboardShortcuts,
  mr as useMidiInput,
  Ct as useNoteRange,
  sr as useSoundfont
};
