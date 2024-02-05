import { defineComponent as E, reactive as h, onMounted as x, watch as S, ref as m, openBlock as P, createElementBlock as j } from "vue";
var w = "https://js.stripe.com/v3", D = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/, _ = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used", R = function() {
  for (var e = document.querySelectorAll('script[src^="'.concat(w, '"]')), n = 0; n < e.length; n++) {
    var i = e[n];
    if (D.test(i.src))
      return i;
  }
  return null;
}, g = function(e) {
  var n = e && !e.advancedFraudSignals ? "?advancedFraudSignals=false" : "", i = document.createElement("script");
  i.src = "".concat(w).concat(n);
  var r = document.head || document.body;
  if (!r)
    throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
  return r.appendChild(i), i;
}, $ = function(e, n) {
  !e || !e._registerWrapper || e._registerWrapper({
    name: "stripe-js",
    version: "2.3.0",
    startTime: n
  });
}, l = null, f = null, p = null, V = function(e) {
  return function() {
    e(new Error("Failed to load Stripe.js"));
  };
}, M = function(e, n) {
  return function() {
    window.Stripe ? e(window.Stripe) : n(new Error("Stripe.js not available"));
  };
}, F = function(e) {
  return l !== null ? l : (l = new Promise(function(n, i) {
    if (typeof window > "u" || typeof document > "u") {
      n(null);
      return;
    }
    if (window.Stripe && e && console.warn(_), window.Stripe) {
      n(window.Stripe);
      return;
    }
    try {
      var r = R();
      if (r && e)
        console.warn(_);
      else if (!r)
        r = g(e);
      else if (r && p !== null && f !== null) {
        var c;
        r.removeEventListener("load", p), r.removeEventListener("error", f), (c = r.parentNode) === null || c === void 0 || c.removeChild(r), r = g(e);
      }
      p = M(n, i), f = V(i), r.addEventListener("load", p), r.addEventListener("error", f);
    } catch (u) {
      i(u);
      return;
    }
  }), l.catch(function(n) {
    return l = null, Promise.reject(n);
  }));
}, N = function(e, n, i) {
  if (e === null)
    return null;
  var r = e.apply(void 0, n);
  return $(r, i), r;
}, d, b = !1, L = function() {
  return d || (d = F(null).catch(function(e) {
    return d = null, Promise.reject(e);
  }), d);
};
Promise.resolve().then(function() {
  return L();
}).catch(function(t) {
  b || console.warn(t);
});
var v = function() {
  for (var e = arguments.length, n = new Array(e), i = 0; i < e; i++)
    n[i] = arguments[i];
  b = !0;
  var r = Date.now();
  return L().then(function(c) {
    return N(c, n, r);
  });
};
const k = "vue-stripe-demi", C = "5.0.0", B = "module", q = [
  "dist"
], U = "./dist/vue-stripe.umd.js", W = "./dist/vue-stripe.es.js", z = {
  ".": {
    import: "./dist/vue-stripe.es.js",
    require: "./dist/vue-stripe.umd.js"
  }
}, G = {
  dev: "vite",
  build: "vite build",
  preview: "vite preview",
  "test:unit": "vitest",
  lint: "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore",
  "docs:dev": "vitepress dev docs",
  "docs:build": "vitepress build docs",
  "docs:preview": "vitepress preview docs"
}, X = {
  "@stripe/stripe-js": "^2.3.0",
  "vue-demi": "^0.14.6"
}, Y = {
  "@rushstack/eslint-patch": "^1.3.3",
  "@vitejs/plugin-vue": "^4.5.2",
  "@vue/test-utils": "^2.4.3",
  eslint: "^8.49.0",
  "eslint-plugin-vue": "^9.17.0",
  jsdom: "^23.0.1",
  postcss: "^8.4.33",
  vite: "^5.0.10",
  vitepress: "^1.0.0-rc.39",
  vitest: "^1.0.4",
  vue: "^3.3.11"
}, H = {
  "@vue/composition-api": "^1.7.2",
  vue: "^2.0.0 || >=3.0.0"
}, K = {
  "@vue/composition-api": {
    optional: !0
  }
}, J = "MIT", Q = {
  name: k,
  version: C,
  type: B,
  files: q,
  main: U,
  module: W,
  exports: z,
  scripts: G,
  dependencies: X,
  devDependencies: Y,
  peerDependencies: H,
  peerDependenciesMeta: K,
  license: J
}, Z = Q.version, A = {
  name: "vue-stripe",
  version: Z,
  url: "https://vuestripe.com",
  partner_id: "pp_partner_IqtOXpBSuz0IE2"
}, ee = "payment", ne = "linkAuthentication", le = E({
  name: "VueStripe",
  props: {
    pk: {
      type: String,
      default: "Vue Stripe Test"
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(t, { slots: e, emit: n, expose: i }) {
    const r = h({
      stripe: null
    });
    x(() => {
      c(t.pk, t.options);
    });
    async function c(u, s) {
      s != null && s.disableAdvancedFraudDetection && v.setLoadParameters({ advancedFraudSignals: !1 });
      const a = {
        stripeAccount: s == null ? void 0 : s.stripeAccount,
        apiVersion: s == null ? void 0 : s.apiVersion,
        locale: s == null ? void 0 : s.locale
      };
      r.stripe = await v(u, a), r.stripe.registerAppInfo(A);
    }
    return () => {
      if (e.default)
        return e.default(r);
    };
  }
}), de = E({
  name: "Elements",
  props: {
    stripe: {
      type: Object
    },
    clientSecret: {
      type: String
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(t, { slots: e, emit: n, expose: i }) {
    const r = h({
      elements: null
    });
    S(t, () => {
      c(t.stripe, t.clientSecret, t.options);
    }, { immediate: !1 });
    async function c(u, s, a) {
      r.elements = u.elements({
        ...a,
        clientSecret: s
      });
    }
    return () => {
      if (e.default)
        return e.default(r);
    };
  }
});
function O(t) {
  const e = m(null);
  m(!1);
  async function n(o, y, I) {
    y && (e.value = y.create(o, I), e.value.on("change", r), e.value.on("ready", c), e.value.on("focus", u), e.value.on("blur", s), e.value.on("escape", a));
  }
  function i(o) {
    e.value && e.value.mount(o);
  }
  function r(o) {
    t("change", o);
  }
  function c(o) {
    t("ready", o);
  }
  function u(o) {
    t("focus", o);
  }
  function s(o) {
    t("blur", o);
  }
  function a(o) {
    t("escape", o);
  }
  return {
    element: e,
    createElement: n,
    mountElement: i,
    handleElementChange: r,
    handleElementReady: c,
    handleElementFocus: u,
    handleElementBlur: s,
    handleElementEscape: a
  };
}
const T = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [i, r] of e)
    n[i] = r;
  return n;
}, te = E({
  name: "PaymentIntent",
  props: {
    stripe: {
      type: Object
    },
    elements: {
      type: Object
    },
    options: {
      type: Object,
      default: () => ({})
    },
    confirmParams: {
      type: Object,
      default: () => ({})
    }
  },
  setup(t, { emit: e, expose: n }) {
    n({
      submit: s
    });
    const i = m(null), { createElement: r, mountElement: c } = O(e);
    S(t, () => {
      u();
    });
    function u() {
      try {
        e("loading", !0), r(ee, t.elements, t.options), c(i.value);
      } catch (a) {
        console.error(a), e("error", error);
      } finally {
        e("loading", !1);
      }
    }
    async function s() {
      try {
        e("loading", !0);
        const { error: a } = t.stripe.confirmPayment({
          elements: t.elements,
          confirmParams: t.confirmParams
        });
        a && (console.error(a), e("error", a));
      } catch (a) {
        e("error", a);
      } finally {
        e("loading", !1);
      }
    }
    return {
      mountPoint: i
    };
  }
}), re = { ref: "mountPoint" };
function ie(t, e, n, i, r, c) {
  return P(), j("div", re, null, 512);
}
const fe = /* @__PURE__ */ T(te, [["render", ie]]), ae = E({
  name: "LinkAuthentication",
  props: {
    stripe: {
      type: Object
    },
    elements: {
      type: Object
    },
    options: {
      type: Object,
      default: () => ({})
    },
    confirmParams: {
      type: Object,
      default: () => ({})
    }
  },
  setup(t, { emit: e, expose: n }) {
    n({
      submit: s
    });
    const i = m(null), { createElement: r, mountElement: c } = O(e);
    S(t, () => {
      u();
    });
    function u() {
      try {
        e("loading", !0), r(ne, t.elements, t.options), c(i.value);
      } catch (a) {
        console.error(a), e("error", error);
      } finally {
        e("loading", !1);
      }
    }
    async function s() {
      try {
        e("loading", !0);
        const { error: a } = t.stripe.confirmPayment({
          elements: t.elements,
          confirmParams: t.confirmParams
        });
        a && (console.error(a), e("error", a));
      } catch (a) {
        e("error", a);
      } finally {
        e("loading", !1);
      }
    }
    return {
      mountPoint: i
    };
  }
}), se = { ref: "mountPoint" };
function ce(t, e, n, i, r, c) {
  return P(), j("div", se, null, 512);
}
const pe = /* @__PURE__ */ T(ae, [["render", ce]]);
var oe = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
function me() {
  console.log("useStripe"), console.log(oe);
  async function t(e, n) {
    n != null && n.disableAdvancedFraudDetection && v.setLoadParameters({ advancedFraudSignals: !1 });
    const i = {
      stripeAccount: n == null ? void 0 : n.stripeAccount,
      apiVersion: n == null ? void 0 : n.apiVersion,
      locale: n == null ? void 0 : n.locale
    }, r = await v(e, i);
    return r.registerAppInfo(A), r;
  }
  return {
    initializeStripe: t
  };
}
function ve() {
  async function t(e, n, i) {
    return e.elements({
      ...i,
      clientSecret: n
    });
  }
  return {
    initializeElements: t
  };
}
export {
  de as Elements,
  pe as LinkAuthentication,
  fe as PaymentIntent,
  le as VueStripe,
  ve as useElements,
  me as useStripe
};
