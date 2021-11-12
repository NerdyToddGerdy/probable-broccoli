/*

 Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
 For more information see LICENSE.txt or http://www.wtfpl.net/
 For more information, the home page:
 http://pieroxy.net/blog/pages/lz-string/testing.html
 LZ-based compression algorithm, version 1.3.3
*/
"use strict";
let e,
  m = {
    Mb: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    Sc: String.fromCharCode,
    hg: function (a) {
      if (null == a) return "";
      let b = "",
        c,
        d,
        f,
        g,
        h,
        l,
        k = 0;
      for (a = m.wf(a); k < 2 * a.length; )
        0 === k % 2
          ? ((c = a.charCodeAt(k / 2) >> 8),
            (d = a.charCodeAt(k / 2) & 255),
            (f = k / 2 + 1 < a.length ? a.charCodeAt(k / 2 + 1) >> 8 : NaN))
          : ((c = a.charCodeAt((k - 1) / 2) & 255),
            (k + 1) / 2 < a.length
              ? ((d = a.charCodeAt((k + 1) / 2) >> 8),
                (f = a.charCodeAt((k + 1) / 2) & 255))
              : (d = f = NaN)),
          (k += 3),
          (g = c >> 2),
          (c = ((c & 3) << 4) | (d >> 4)),
          (h = ((d & 15) << 2) | (f >> 6)),
          (l = f & 63),
          isNaN(d) ? (h = l = 64) : isNaN(f) && (l = 64),
          (b =
            b +
            m.Mb.charAt(g) +
            m.Mb.charAt(c) +
            m.Mb.charAt(h) +
            m.Mb.charAt(l));
      return b;
    },
    ig: function (a) {
      if (null == a) return "";
      let b = "",
        c = 0,
        d,
        f,
        g,
        h,
        l,
        k,
        s = 0,
        n = m.Sc;
      for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); s < a.length; )
        (f = m.Mb.indexOf(a.charAt(s++))),
          (g = m.Mb.indexOf(a.charAt(s++))),
          (l = m.Mb.indexOf(a.charAt(s++))),
          (k = m.Mb.indexOf(a.charAt(s++))),
          (f = (f << 2) | (g >> 4)),
          (g = ((g & 15) << 4) | (l >> 2)),
          (h = ((l & 3) << 6) | k),
          0 === c % 2
            ? ((d = f << 8),
              64 !== l && (b += n(d | g)),
              64 !== k && (d = h << 8))
            : ((b += n(d | f)),
              64 !== l && (d = g << 8),
              64 !== k && (b += n(d | h))),
          (c += 3);
      return m.xf(b);
    },
    vg: function (a) {
      if (null == a) return "";
      var b = "",
        c,
        d,
        f,
        g = 0,
        h = m.Sc;
      a = m.wf(a);
      for (c = 0; c < a.length; c++)
        switch (((d = a.charCodeAt(c)), g++)) {
          case 0:
            b += h((d >> 1) + 32);
            f = (d & 1) << 14;
            break;
          case 1:
            b += h(f + (d >> 2) + 32);
            f = (d & 3) << 13;
            break;
          case 2:
            b += h(f + (d >> 3) + 32);
            f = (d & 7) << 12;
            break;
          case 3:
            b += h(f + (d >> 4) + 32);
            f = (d & 15) << 11;
            break;
          case 4:
            b += h(f + (d >> 5) + 32);
            f = (d & 31) << 10;
            break;
          case 5:
            b += h(f + (d >> 6) + 32);
            f = (d & 63) << 9;
            break;
          case 6:
            b += h(f + (d >> 7) + 32);
            f = (d & 127) << 8;
            break;
          case 7:
            b += h(f + (d >> 8) + 32);
            f = (d & 255) << 7;
            break;
          case 8:
            b += h(f + (d >> 9) + 32);
            f = (d & 511) << 6;
            break;
          case 9:
            b += h(f + (d >> 10) + 32);
            f = (d & 1023) << 5;
            break;
          case 10:
            b += h(f + (d >> 11) + 32);
            f = (d & 2047) << 4;
            break;
          case 11:
            b += h(f + (d >> 12) + 32);
            f = (d & 4095) << 3;
            break;
          case 12:
            b += h(f + (d >> 13) + 32);
            f = (d & 8191) << 2;
            break;
          case 13:
            b += h(f + (d >> 14) + 32);
            f = (d & 16383) << 1;
            break;
          case 14:
            (b += h(f + (d >> 15) + 32, (d & 32767) + 32)), (g = 0);
        }
      return b + h(f + 32);
    },
    wg: function (a) {
      if (null == a) return "";
      for (var b = "", c, d, f = 0, g = 0, h = m.Sc; g < a.length; ) {
        d = a.charCodeAt(g) - 32;
        switch (f++) {
          case 0:
            c = d << 1;
            break;
          case 1:
            b += h(c | (d >> 14));
            c = (d & 16383) << 2;
            break;
          case 2:
            b += h(c | (d >> 13));
            c = (d & 8191) << 3;
            break;
          case 3:
            b += h(c | (d >> 12));
            c = (d & 4095) << 4;
            break;
          case 4:
            b += h(c | (d >> 11));
            c = (d & 2047) << 5;
            break;
          case 5:
            b += h(c | (d >> 10));
            c = (d & 1023) << 6;
            break;
          case 6:
            b += h(c | (d >> 9));
            c = (d & 511) << 7;
            break;
          case 7:
            b += h(c | (d >> 8));
            c = (d & 255) << 8;
            break;
          case 8:
            b += h(c | (d >> 7));
            c = (d & 127) << 9;
            break;
          case 9:
            b += h(c | (d >> 6));
            c = (d & 63) << 10;
            break;
          case 10:
            b += h(c | (d >> 5));
            c = (d & 31) << 11;
            break;
          case 11:
            b += h(c | (d >> 4));
            c = (d & 15) << 12;
            break;
          case 12:
            b += h(c | (d >> 3));
            c = (d & 7) << 13;
            break;
          case 13:
            b += h(c | (d >> 2));
            c = (d & 3) << 14;
            break;
          case 14:
            b += h(c | (d >> 1));
            c = (d & 1) << 15;
            break;
          case 15:
            (b += h(c | d)), (f = 0);
        }
        g++;
      }
      return m.xf(b);
    },
    wf: function (a) {
      if (null == a) return "";
      var b,
        c,
        d = {},
        f = {},
        g = "",
        h = "",
        l = "",
        k = 2,
        s = 3,
        n = 2,
        u = "",
        t = 0,
        v = 0,
        B,
        I = m.Sc;
      for (B = 0; B < a.length; B += 1)
        if (
          ((g = a.charAt(B)),
          Object.prototype.hasOwnProperty.call(d, g) ||
            ((d[g] = s++), (f[g] = !0)),
          (h = l + g),
          Object.prototype.hasOwnProperty.call(d, h))
        )
          l = h;
        else {
          if (Object.prototype.hasOwnProperty.call(f, l)) {
            if (256 > l.charCodeAt(0)) {
              for (b = 0; b < n; b++)
                (t <<= 1), 15 == v ? ((v = 0), (u += I(t)), (t = 0)) : v++;
              c = l.charCodeAt(0);
              for (b = 0; 8 > b; b++)
                (t = (t << 1) | (c & 1)),
                  15 == v ? ((v = 0), (u += I(t)), (t = 0)) : v++,
                  (c >>= 1);
            } else {
              c = 1;
              for (b = 0; b < n; b++)
                (t = (t << 1) | c),
                  15 == v ? ((v = 0), (u += I(t)), (t = 0)) : v++,
                  (c = 0);
              c = l.charCodeAt(0);
              for (b = 0; 16 > b; b++)
                (t = (t << 1) | (c & 1)),
                  15 == v ? ((v = 0), (u += I(t)), (t = 0)) : v++,
                  (c >>= 1);
            }
            k--;
            0 == k && ((k = Math.pow(2, n)), n++);
            delete f[l];
          } else
            for (c = d[l], b = 0; b < n; b++)
              (t = (t << 1) | (c & 1)),
                15 == v ? ((v = 0), (u += I(t)), (t = 0)) : v++,
                (c >>= 1);
          k--;
          0 == k && ((k = Math.pow(2, n)), n++);
          d[h] = s++;
          l = String(g);
        }
      if ("" !== l) {
        if (Object.prototype.hasOwnProperty.call(f, l)) {
          if (256 > l.charCodeAt(0)) {
            for (b = 0; b < n; b++)
              (t <<= 1), 15 == v ? ((v = 0), (u += I(t)), (t = 0)) : v++;
            c = l.charCodeAt(0);
            for (b = 0; 8 > b; b++)
              (t = (t << 1) | (c & 1)),
                15 == v ? ((v = 0), (u += I(t)), (t = 0)) : v++,
                (c >>= 1);
          } else {
            c = 1;
            for (b = 0; b < n; b++)
              (t = (t << 1) | c),
                15 == v ? ((v = 0), (u += I(t)), (t = 0)) : v++,
                (c = 0);
            c = l.charCodeAt(0);
            for (b = 0; 16 > b; b++)
              (t = (t << 1) | (c & 1)),
                15 == v ? ((v = 0), (u += I(t)), (t = 0)) : v++,
                (c >>= 1);
          }
          k--;
          0 == k && ((k = Math.pow(2, n)), n++);
          delete f[l];
        } else
          for (c = d[l], b = 0; b < n; b++)
            (t = (t << 1) | (c & 1)),
              15 == v ? ((v = 0), (u += I(t)), (t = 0)) : v++,
              (c >>= 1);
        k--;
        0 == k && n++;
      }
      c = 2;
      for (b = 0; b < n; b++)
        (t = (t << 1) | (c & 1)),
          15 == v ? ((v = 0), (u += I(t)), (t = 0)) : v++,
          (c >>= 1);
      for (;;)
        if (((t <<= 1), 15 == v)) {
          u += I(t);
          break;
        } else v++;
      return u;
    },
    xf: function (a) {
      if (null == a) return "";
      if ("" == a) return null;
      for (
        var b = [],
          c = 4,
          d = 4,
          f = 3,
          g = "",
          h = "",
          l,
          k,
          s,
          n,
          u,
          t = m.Sc,
          v = a.charCodeAt(0),
          B = 32768,
          I = 1,
          h = 0;
        3 > h;
        h += 1
      )
        b[h] = h;
      g = 0;
      s = Math.pow(2, 2);
      for (n = 1; n != s; )
        (k = v & B),
          (B >>= 1),
          0 == B && ((B = 32768), (v = a.charCodeAt(I++))),
          (g |= (0 < k ? 1 : 0) * n),
          (n <<= 1);
      switch (g) {
        case 0:
          g = 0;
          s = Math.pow(2, 8);
          for (n = 1; n != s; )
            (k = v & B),
              (B >>= 1),
              0 == B && ((B = 32768), (v = a.charCodeAt(I++))),
              (g |= (0 < k ? 1 : 0) * n),
              (n <<= 1);
          u = t(g);
          break;
        case 1:
          g = 0;
          s = Math.pow(2, 16);
          for (n = 1; n != s; )
            (k = v & B),
              (B >>= 1),
              0 == B && ((B = 32768), (v = a.charCodeAt(I++))),
              (g |= (0 < k ? 1 : 0) * n),
              (n <<= 1);
          u = t(g);
          break;
        case 2:
          return "";
      }
      for (l = h = b[3] = u; ; ) {
        if (I > a.length) return "";
        g = 0;
        s = Math.pow(2, f);
        for (n = 1; n != s; )
          (k = v & B),
            (B >>= 1),
            0 == B && ((B = 32768), (v = a.charCodeAt(I++))),
            (g |= (0 < k ? 1 : 0) * n),
            (n <<= 1);
        switch ((u = g)) {
          case 0:
            g = 0;
            s = Math.pow(2, 8);
            for (n = 1; n != s; )
              (k = v & B),
                (B >>= 1),
                0 == B && ((B = 32768), (v = a.charCodeAt(I++))),
                (g |= (0 < k ? 1 : 0) * n),
                (n <<= 1);
            b[d++] = t(g);
            u = d - 1;
            c--;
            break;
          case 1:
            g = 0;
            s = Math.pow(2, 16);
            for (n = 1; n != s; )
              (k = v & B),
                (B >>= 1),
                0 == B && ((B = 32768), (v = a.charCodeAt(I++))),
                (g |= (0 < k ? 1 : 0) * n),
                (n <<= 1);
            b[d++] = t(g);
            u = d - 1;
            c--;
            break;
          case 2:
            return h;
        }
        0 == c && ((c = Math.pow(2, f)), f++);
        if (b[u]) g = b[u];
        else if (u === d) g = l + l.charAt(0);
        else return null;
        h += g;
        b[d++] = l + g.charAt(0);
        c--;
        l = g;
        0 == c && ((c = Math.pow(2, f)), f++);
      }
    },
  };
"undefined" !== typeof module && null != module && (module.xg = m);
function get_date() {
  return Date.now ? Date.now() : new Date().valueOf();
}
function q(a) {
  return 2147483648 > a ? a | 0 : Math.floor(a);
}
function randomize(a) {
  return q(Math.random() * a);
}
function aa(a) {
  return 1e4 > a
    ? "" + q(a)
    : 1e5 > a
    ? (a / 1e3).toFixed(1) + "get_element_by_id"
    : 1e6 > a
    ? q(a / 1e3) + "get_element_by_id"
    : 1e7 > a
    ? (a / 1e6).toFixed(2) + "M"
    : 1e8 > a
    ? (a / 1e6).toFixed(1) + "M"
    : 1e9 > a
    ? q(a / 1e6) + "M"
    : 1e10 > a
    ? (a / 1e9).toFixed(2) + "B"
    : 1e11 > a
    ? (a / 1e9).toFixed(1) + "B"
    : 1e12 > a
    ? q(a / 1e9) + "B"
    : 1e13 > a
    ? (a / 1e12).toFixed(2) + "create_table_header"
    : 1e14 > a
    ? (a / 1e12).toFixed(1) + "create_table_header"
    : 1e15 > a
    ? q(a / 1e12) + "create_table_header"
    : 1e16 > a
    ? (a / 1e15).toFixed(2) + "P"
    : 1e17 > a
    ? (a / 1e15).toFixed(1) + "P"
    : 1e18 > a
    ? q(a / 1e15) + "P"
    : 1e19 > a
    ? (a / 1e18).toFixed(2) + "P"
    : 1e20 > a
    ? (a / 1e18).toFixed(1) + "P"
    : 1e21 > a
    ? q(a / 1e18) + "P"
    : 1e22 > a
    ? (a / 1e21).toFixed(2) + "Z"
    : 9.999999999999999e22 > a
    ? (a / 1e21).toFixed(1) + "Z"
    : 1e24 > a
    ? q(a / 1e21) + "Z"
    : 1e25 > a
    ? (a / 1e24).toFixed(2) + "Y"
    : 1e26 > a
    ? (a / 1e24).toFixed(1) + "Y"
    : 1e27 > a
    ? q(a / 1e24) + "Y"
    : a.toFixed(0);
}
function w(a) {
  return 0 <= a ? aa(a) : "-" + aa(-a);
}
function string_replace(a) {
  if (!a) return "";
  a = a.replace("&", "&amp;");
  a = a.replace("<", "&lt;");
  a = a.replace(">", "&gt;");
  a = a.replace('"', "&quot;");
  a = a.replace("'", "&#x27;");
  return (a = a.replace("/", "&#x2F;"));
}
function send_google_event(a, b) {
  "undefined" != typeof ganal && ganal("send", "event", a, b);
}
function get_max(a, b) {
  return Math.max(0.1, 1 - (Math.abs(a.za - a.e) + Math.abs(b.oa - b.e)));
}
function ba(a, b) {
  this.ee = a;
  this.fe = b;
}
function ca() {
  this.fb = [];
  this.mb = null;
  this.qc = -1;
}
function da(a, b) {
  a.mb = null;
  a.qc = get_date();
  if (b) (a.fb.length = 0), ea();
  else {
    var c = Math.min(a.fb.length, A.a.P.ja * fa);
    if (a.fb.length > c) {
      for (; a.fb.length > c; ) a.fb.splice(randomize(a.fb.length), 1);
      ea();
      ga(a);
    }
  }
}
ca.prototype.W = function () {
  da(this, !1);
};
ca.prototype.We = function () {
  if (this.mb) {
    var a = this.mb;
    this.fb.push(a);
    ha(a);
    this.mb = null;
    this.qc = get_date();
  }
};
function ia() {
  return A.a.qa.fb;
}
function ga(a) {
  var b;
  for (b = 0; b < a.fb.length; b++) ha(a.fb[b]);
}
function ha(a) {
  a = C[a.fe];
  a.e += a.ta;
  0 > a.ta && a.e < a.fd && (a.e = a.fd);
}
function ea() {
  var a, b;
  for (a = 0; a < C.length; a++) (b = C[a]), (b.e = b.oa);
}
ca.prototype.Te = function () {
  if (this.mb || get_date() - this.qc < ja) return !1;
  if (Math.random() < ka) {
    var a = A.bg;
    this.mb = new ba(
      a.bf[randomize(a.bf.length)] + " " + a.ef[randomize(a.ef.length)],
      randomize(C.length)
    );
    return !0;
  }
  return !1;
};
function la() {
  this.Vb = this.ya = this.Bd = this.yd = this.Sd = this.Kd = 0;
  this.Ia = -1;
}
function D() {
  var a = A.a.M;
  if (-1 === a.Ia) {
    var b;
    for (b = 0; b < A.a.c.length; b++)
      a.Ia < A.a.c[b].ra && (a.Ia = A.a.c[b].ra);
  }
  return a.Ia;
}
la.prototype.Le = function (a) {
  this.Ia < a && (this.Ia = a);
};
la.prototype.gd = function () {
  this.Ia = -1;
};
function ma() {
  var a = A.a.na;
  a.level = 1;
  a.Yb = !1;
  a.lair_name = set_location_name(a.Ae);
}
function oa(a) {
  var b = A.a.na;
  b.lair_name = a ? a : set_location_name(b.Ae);
}
var E = 7;
function pa() {
  this.tb = this.w = "";
  this.dd = 0;
  this.H = "";
  this.ub = 0;
  this.ed = E;
  this.Ie = this.j = this.ca = 0;
  this.Pd = !1;
}
pa.prototype.Ha = function () {
  return this.ed;
};
function qa() {
  this.O = this.wa = "";
  this.Bc = this.Fa = this.nf = this.ra = 0;
  this.Fb = 100;
  this.items = [];
  this.Aa = {};
  this.Ea = null;
  this.i = 0;
}
qa.prototype.ld = function (a) {
  this.i = a;
};
function ra(a) {
  return a.nf * (barb_rage.e + ta.e + (1 + A.a.P.ja * ua) - 2);
}
qa.prototype.getItem = function (a) {
  return a >= this.items.length ? null : this.items[a];
};
function F(a, b) {
  var c = b.w,
    d = a.Aa[c];
  d
    ? ((d = a.items.indexOf(d)),
      -1 !== d ? (a.items[d] = b) : a.items.push(b),
      delete a.Aa[c])
    : a.items.push(b);
  a.Aa[c] = b;
  G(a);
}
function G(a) {
  var b = 0,
    c;
  for (c = 0; c < a.items.length; c++) b += a.items[c].j;
  a.nf = b;
}
function va() {
  this.items = [];
  this.gear_quality = {};
  this.Zf = function (a, b) {
    var c = b.j - a.j;
    return 0 === c ? a.ca - b.ca : c;
  };
  this.sg = function (a, b) {
    var c = A.a.R[a.H].Aa[a.w],
      d = A.a.R[b.H].Aa[b.w],
      c = (b.j - (d ? d.j : 0)) / b.ca - (a.j - (c ? c.j : 0)) / a.ca;
    return 0 === c ? a.ca - b.ca : c;
  };
}
function wa(a) {
  a.items.length = 0;
  a.uc = {};
}
function xa(a, b) {
  var c = 0,
    d,
    f = b.O;
  for (delete a.uc[f]; c < a.items.length; )
    (d = a.items[c]), d.H === f ? a.items.splice(c, 1) : c++;
}
function ya(a, b) {
  a.items.push(b);
  var c = a.items;
  !c || 2 > c.length || c.sort(a.Zf);
  c = a.uc[b.H];
  c || ((c = []), (a.uc[b.H] = c));
  c.push(b);
  !c || 2 > c.length || c.sort(a.Zf);
}
va.prototype.removeItem = function (a) {
  za(this, this.items.indexOf(a));
};
function za(a, b) {
  if (-1 !== b) {
    var c = a.items[b];
    a.items.splice(b, 1);
    var d = a.uc[c.H];
    d && ((c = d.indexOf(c)), -1 !== c && d.splice(c, 1));
  }
}
function Aa(a) {
  var b,
    c = 0;
  for (b = 0; b < a.items.length; b++) -1 > a.items[b].j && (c = b);
  return c;
}
function Ba(a) {
  for (var b = 0; b < a.items.length; ) Ca(a.items[b]) ? b++ : za(a, b);
}
function Ca(a) {
  var b = A.a.R[a.H];
  if (!b) return !1;
  b = b.Aa[a.w];
  return !b || b.j < a.j;
}
function Da() {}
Da.prototype = new va();
function Ea(a) {
  var b = A.a.Va;
  if (Ca(a)) {
    var c = b.items;
    if (c.length < Fa + A.a.P.ja * Ga) ya(b, a);
    else {
      var d = Aa(b);
      a.j > c[d].j && (za(b, d), ya(b, a));
    }
  }
}
function Ha() {}
Ha.prototype = new va();
function Ia(a) {
  var b = A.a.nb,
    c = b.items;
  c.length >= Ja && Ba(b);
  if (c.length < Ja) ya(b, a), (a.Ie = Ka(a));
  else if (Ca(a)) {
    var d = Aa(b),
      c = c[d];
    a.j > c.j ? (za(b, d), Ea(c), ya(b, a), (a.Ie = Ka(a))) : Ea(a);
  }
}
function Ka(a) {
  var b = get_date(),
    c = A.a.R[a.H].Aa[a.w];
  return (b = c && c.j >= a.j ? b + La : b + Ma);
}
function Na() {
  this.Zd = this.$d = this.vb = -1;
}
Na.prototype = new va();
function Oa() {
  var a = A.a.Y,
    b = get_max(Pa, Qa);
  (-1 === a.vb || get_date() - a.vb > Ra * b) && Sa(a);
  b = get_max(Pa, Qa);
  b = (Ra * b - (get_date() - a.vb)) / 1e3;
  a.Zd = q(b / 60);
  a.$d = q(b % 60);
}
function Sa(a) {
  if (0 !== A.a.c.length) {
    wa(a);
    a.vb = get_date();
    var b,
      c,
      d,
      f = D(),
      g = Ta * A.a.c.length + improved_roads.e + Va.e;
    for (b = 0; b < g; b++)
      (c = A.a.c[randomize(A.a.c.length)]), (d = get_max(Wa, Xa)), ya(a, Ya(c, d, f));
  }
}
function Za() {
  this.Bf = this.Ge = 1;
  this.fc = null;
  this.Ce = "";
  this.Ee = this.lc = this.ag = this.He = this.Rc = this.Df = this.Ff = 0;
  this.Dd = this.Hd = !1;
}
function $a(a, b, c, d, f, g, h, l) {
  var k = A.a.Eb;
  k.baseName = a;
  k.Ce = b;
  k.Bf = c;
  k.Ge = d;
  k.Ff = f * get_max(stealt_attack, bb);
  k.Df = g;
  k.fc = l;
  k.Rc = f * d;
  k.He = k.Rc;
  k.ag = h;
  k.lc = f;
  k.Ee = 0;
  k.Hd = !1;
  k.Dd = !1;
}
Za.prototype.Md = function () {
  return this.Bf;
};
function cb() {
  this.Ia = -1;
  this.Cb = 0;
}
function db() {
  var a = A.a.Cb;
  a.Cb = 0;
  a.Ia = -1;
}
cb.prototype.Le = function (a) {
  this.Ia < a && ((this.Ia = a), (this.Cb = eb()));
};
function fb() {
  var a = A.a.Cb;
  if (0 === a.Cb || -1 === a.Ia) (a.Ia = D()), (a.Cb = eb());
  return a.Cb * (click_attack.e + hb.e - 1);
}
function ib() {
  this.Na = this.Da = !1;
  this.Uc = -1;
}
ib.prototype.W = function () {
  this.Na = this.Da = !1;
  this.Uc = get_date();
};
function jb() {
  this.xc = this.cc = !1;
}
jb.prototype.W = function () {
  this.xc = this.cc = !1;
};
jb.prototype.Re = function () {
  this.xc = this.cc = !1;
};
function kb(a, b, c, d) {
  this.kf = a;
  this.hf = b;
  this.jf = c;
  this.Tf = d;
}
function lb() {
  this.ja = 0;
  this.Wc = [];
}
function mb(a, b) {
  this.Wa = a;
  this.Oc = b;
  this.Xb = 0;
  this.wb = !1;
}
function nb() {
  this.Nc = [];
  this.yb = [];
  this.Nb = {};
  this.Oa = 0;
  this.Bb = null;
  this.Pb = -1;
}
e = nb.prototype;
e.Re = function () {
  this.Nc.length = 0;
  this.yb.length = 0;
  this.Nb = {};
  this.Bb = null;
  this.Pb = get_date();
};
e.W = function () {
  this.Nc.length = 0;
  this.yb.length = 0;
  this.Nb = {};
  this.Bb = null;
  this.Pb = get_date();
};
e.ce = function () {
  this.Bb && (ob(this, this.Bb), (this.Bb = null), (this.Pb = get_date()));
};
function pb() {
  return A.a.S.Bb;
}
function qb() {
  return A.a.S.Nc;
}
function ob(a, b) {
  a.Nb[b.Wa] || (a.Nc.push(b), b.wb ? a.Oa++ : (a.Nb[b.Wa] = b));
}
e.Ue = function () {
  if (this.Bb || get_date() - this.Pb < rb) return !1;
  if (Math.random() < sb) {
    for (var a = tb(), b = this.Nb[a]; b && !b.wb; )
      (a = tb()), (b = this.Nb[a]);
    this.Bb = new mb(a, ub + randomize(vb) * wb);
    return !0;
  }
  return !1;
};
e.Me = function (a) {
  var b = a.Wa;
  for (a = 0; a < this.yb.length; a++)
    if (b === this.yb[a].Wa) {
      this.yb.splice(a, 1);
      break;
    }
};
function xb() {
  this.jd = !1;
  this.sb = [];
  this.Ta = -1;
  this.Pc = this.Hc = !1;
  this.Zb = -1;
}
xb.prototype.W = function () {
  this.jd = !1;
  this.sb.length = 0;
  this.Ta = -1;
  this.Pc = this.Hc = !1;
  this.Zb = get_date();
};
function yb() {
  return A.a.K.Hc;
}
function zb() {
  return A.a.K.Pc;
}
function H() {
  return A.a.K.jd;
}
function Ab(a) {
  return 0 > a.Ta || a.Ta >= robot_parts.length ? null : robot_parts[a.Ta].name;
}
function Cb(a) {
  var b = A.a.K;
  a ? (b.sb = a) : (b.sb.length = 0);
}
function Db() {
  var a = A.a.K;
  if (a.jd || a.Pc) return !1;
  if (a.sb.length === robot_parts.length) {
    if (a.Hc || get_date() - a.Zb < Eb) return !1;
    if (Math.random() < Fb) return (a.Hc = !0);
  } else {
    if (-1 < a.Ta || get_date() - a.Zb < Eb) return !1;
    if (Math.random() < Fb)
      return (a.Ta = a.sb.length), (a = Ab(a)) && send_google_event("Machine Part", a), !0;
  }
  return !1;
}
function Gb() {
  this.ic = !1;
  this.Dc = -1;
}
Gb.prototype.W = function () {
  this.ic = !1;
  this.Dc = get_date();
};
function Hb() {
  var a = A.a.bc;
  return a.ic || get_date() - a.Dc < Ib ? !1 : Math.random() < Jb ? (a.ic = !0) : !1;
}
function Kb(a, b, c, d) {
  this.gf = a;
  this.eg = b;
  this.fg = c;
  this.Ve = d;
}
Kb.prototype.rc = function () {
  return this.eg;
};
function Lb() {
  this.hb = [];
}
Lb.prototype.W = function () {
  this.hb.length = 0;
};
function Mb() {
  this.Rb = this.i = -1;
  this.va = [];
  this.ab = [];
  this.eb = 0;
}
Mb.prototype.W = function () {
  this.eb = 0;
  this.i = -1;
  this.Rb = get_date();
  this.va = Nb(this);
  this.ab = Ob();
};
Mb.prototype.ld = function (a) {
  this.i = a;
};
Mb.prototype.gd = function () {
  this.eb--;
};
function Nb(a) {
  var b = [],
    c;
  for (c = 0; c < A.character_classes.length; c++) A.character_classes[c].ma || a.Nd(c) || b.push(c);
  return b;
}
function Ob() {
  var a = [],
    b,
    c;
  for (c = 0; c < A.a.c.length; c++) (b = A.a.c[c].i), A.character_classes[b].Qc || a.push(b);
  return a;
}
function Pb(a, b) {
  var c;
  for (c = 0; c < a.va.length; c++)
    if (a.va[c] === b) {
      a.va.splice(c, 1);
      break;
    }
}
Mb.prototype.Nd = function (a) {
  var b;
  for (b = 0; b < A.a.c.length; b++) if (A.a.c[b].i === a) return !0;
  return !1;
};
function Qb() {
  this.G = !1;
  this.N = !0;
  this.qb = -1;
  this.qd = 18e4;
  this.Tc = 3e5;
}
Qb.prototype.Ua = function () {};
Qb.prototype.cd = function () {};
function Rb(a, b) {
  return Math.max(0, a.qb + Math.max(Sb, a.Tc - A.a.P.ja * Tb) - b);
}
Qb.prototype.sd = function () {};
Qb.prototype.Ed = function () {};
function Ub(a) {
  a.G = !0;
  a.N = !1;
  a.qb = get_date() + a.qd;
  a.sd();
  var b = A.jb;
  b.Ab.push(a);
  b.Qb.splice(b.Qb.indexOf(a), 1);
  b.bb++;
  send_google_event("Ability", a.Ua());
}
function Vb(a) {
  a.G = !1;
  a.Ed();
  var b = A.jb;
  a = b.Ab.indexOf(a);
  -1 !== a && b.Ab.splice(a, 1);
  b.bb++;
}
function J(a) {
  this.yc = a;
  var b = a.Ga;
  this.qd = a.duration;
  this.Tc = b;
}
J.prototype = new Qb();
J.prototype.Ua = function () {
  return this.yc.name;
};
J.prototype.cd = function () {
  return this.yc.description;
};
J.prototype.sd = function () {
  this.yc.e = this.yc.Ca;
};
J.prototype.Ed = function () {
  this.yc.e = this.yc.za;
};
function Wb() {
  var a = Xb;
  this.qd = Yb;
  this.Tc = a;
}
Wb.prototype = new Qb();
Wb.prototype.Ua = function () {
  return Zb;
};
Wb.prototype.cd = function () {
  return $b;
};
Wb.prototype.sd = function () {
  Sa(A.a.Y);
};
Wb.prototype.Ed = function () {};
function ac() {
  var a = bc;
  this.Prestige_button_container = cc;
  this.Tc = a;
}
ac.prototype = new Qb();
ac.prototype.Ua = function () {
  return dc;
};
ac.prototype.cd = function () {
  return ec;
};
ac.prototype.sd = function () {
  A.a.aa.Da = !0;
};
ac.prototype.Ed = function () {};
function fc() {
  this.hc = [];
  this.Ab = [];
  this.Qb = [];
  this.bb = 0;
}
function gc(a) {
  var b, c;
  for (b = 0; b < A.character_classes.length; b++)
    if ((c = A.character_classes[b].ea)) Vb(c), (c.G = !1), (c.N = !0), (c.qb = -1);
  a.Ab.length = 0;
}
function hc(a) {
  var b, c;
  a.bb = 0;
  a.hc.length = 0;
  a.Qb.length = 0;
  for (b = a.Ab.length = 0; b < A.a.c.length; b++)
    (c = A.a.c[b].Ea), a.hc.push(c), c.N ? a.Qb.push(c) : c.G && a.Ab.push(c);
}
function ic(a) {
  var b = A.jb;
  a = a.Ea;
  b.hc.push(a);
  a.N ? b.Qb.push(a) : a.G && b.Ab.push(a);
  b.bb++;
}
fc.prototype.gd = function (a) {
  a = a.Ea;
  var b = this.hc.indexOf(a),
    c = this.Qb.indexOf(a),
    d = this.Ab.indexOf(a);
  a.G && Vb(a);
  -1 !== b && this.hc.splice(b, 1);
  -1 !== c && this.Qb.splice(c, 1);
  -1 !== d && this.Ab.splice(d, 1);
  this.bb++;
};
function get_element_by_id(a) {
  return document.getElementById(a);
}
function create_element(a, b, c, d) {
  a = document.createElement(a);
  d && (a.className = d);
  c && (a.id = c);
  b && b.appendChild(a);
  return a;
}
function M(a) {
  if ((a = get_element_by_id(a))) for (; a.firstChild; ) a.removeChild(a.firstChild);
}
function N(a, b) {
  if (a) for (var c = b ? 1 : 0; a.rows.length > c; ) a.deleteRow(c);
}
function O(a) {
  a && (a.style.display = "none");
}
function P(a) {
  a && (a.style.display = "block");
}
function Q(a) {
  O(get_element_by_id(a));
}
function R(a) {
  P(get_element_by_id(a));
}
function jc(a, b) {
  var c = get_element_by_id(a);
  c && (c.className = b);
}
function S(a, b) {
  var c = get_element_by_id(a);
  c && (c.innerHTML = b);
}
function create_table_header(a, b) {
  var c = document.createElement("th");
  b && (c.className = b);
  a.appendChild(c);
  return c;
}
function kc() {
  this.pa = -1;
  this.tab_ids =
    "mainTabContainer machinePartsTabContainer artifactsTabContainer questsTabContainer defeatedBossesTabContainer championsTabContainer partyManagementTabContainer versionTabContainer".split(
      " "
    );
  this.tab_class =
    "mainTab machinePartsTab artifactsTab questsTab defeatedBossesTab championsTab partyManagementTab versionTab".split(
      " "
    );
  this.kd = null;
}
function lc() {
  return -1 === A.input.pa;
}
kc.prototype.setSelectedTabId = function (a) {
  this.kd !== a &&
    (this.kd && jc(this.kd, ""), (this.kd = a), jc(this.kd, "selectedTab"));
};
kc.prototype.displayCharacter = function (a) {
  this.pa !== a &&
    ((this.pa = a),
    -1 === a
      ? this.setSelectedTabId("tabParty")
      : this.setSelectedTabId("tabChar" + a));
};
function U(a) {
  var b = A.input,
    c;
  for (c = 0; c < b.tab_ids.length; c++)
    c === a
      ? (R(b.tab_ids[c]), jc(b.tab_class[c], "selectedTab"))
      : (Q(b.tab_ids[c]), jc(b.tab_class[c], ""));
}
kc.prototype.onAttackButtonPress = function () {
  A.a.M.Bd++;
  mc(A.ke, null, fb(), !0);
};
kc.prototype.handleKeyPress = function (a) {
  if (0 !== A.a.c.length)
    if (37 === a.keyCode)
      (a = this.pa - 1),
        -1 > a && (a = A.a.c.length - 1),
        this.displayCharacter(a);
    else if (39 === a.keyCode)
      (a = this.pa + 1),
        a === A.a.c.length && (a = -1),
        this.displayCharacter(a);
    else this.onAttackButtonPress();
};
function partyButtonTable() {
  this.pb = this.Ud = null;
  this.ng = "partyButtonTable";
  this.Sf = !1;
  this.pa = -1;
  this.ie = [];
}
partyButtonTable.prototype.f = function () {};
partyButtonTable.prototype.g = function () {
  var a = 0 === A.a.c.length;
  this.Sf !== a &&
    (a
      ? (this.Ud || ((this.Ud = get_element_by_id("partyCreationDiv")), oc(this)),
        R("partyCreationDisabledBackground"),
        P(this.Ud))
      : (Q("partyCreationDisabledBackground"), O(this.Ud)),
    (this.Sf = a));
};
function oc(a) {
  var b = get_element_by_id(a.ng),
    c = 0,
    d,
    f;
  for (f = 0; f < A.character_classes.length; f += 2)
    A.character_classes[f].ma ||
      ((d = b.insertRow(c++)),
      pc(a, d.insertCell(0), f),
      pc(a, d.insertCell(1), f + 1));
  a.pb = c("a", get_element_by_id("startQuestButtonDiv"), null, "startQuestButton");
  a.pb.innerHTML = "Start the Quest!";
  a.pb.onclick = function () {
    if (-1 < a.pa) {
      var b = [a.pa],
        c,
        d;
      for (c = 0; c < b.length; c++)
        (d = qc(b[c])),
          A.a.c.push(d),
          (A.a.R[d.O] = d),
          send_google_event("Character", "Main Character: " + d.O);
      db();
      A.a.aa.W();
      ma();
      A.a.bc.W();
      A.a.K.W();
      A.a.kb.W();
      A.a.qa.W();
      A.a.S.W();
      A.a.t.W();
      Sa(A.a.Y);
      wa(A.a.Va);
      A.dc.f();
      b = A.jb;
      gc(b);
      hc(b);
      rc();
    }
  };
  a.pb.style.display = -1 === a.pa ? "none" : "inline";
}
function pc(a, b, c) {
  if (!(c >= A.character_classes.length)) {
    b.className = "unselectedPartyCharacterCell";
    a.ie.push(b);
    b.onclick = function () {
      sc(a, c);
    };
    b = c("div", b, null, "partyCharacterContainer");
    b.onclick = function () {
      sc(a, c);
    };
    var d = c("div", b, null, "partyCharacterNameDiv");
    d.onclick = function () {
      sc(a, c);
    };
    var f = c("input", d, null, null);
    f.type = "text";
    f.size = 15;
    f.value = A.character_classes[c].Name;
    f.onkeyup = function () {
      A.character_classes[c].Name = string_replace(f.value);
      f.value && "" !== f.value
        ? ((a.pb.style.display = "inline-block"), tc(a))
        : (a.pb.style.display = "none");
    };
    f.onchange = function () {
      A.character_classes[c].Name = string_replace(f.value);
      f.value && "" !== f.value
        ? ((a.pb.style.display = "inline-block"), tc(a))
        : (a.pb.style.display = "none");
    };
    d.appendChild(document.createTextNode(" the " + A.character_classes[c].className));
    b = c("div", b, null, "partyCharacterDescriptionDiv");
    b.innerHTML = A.character_classes[c].description;
    b.onclick = function () {
      sc(a, c);
    };
  }
}
function sc(a, b) {
  a.pa = b;
  var c;
  for (c = 0; c < a.ie.length; c++)
    a.ie[c].className =
      c !== a.pa
        ? "unselectedPartyCharacterCell"
        : "selectedPartyCharacterCell";
  -1 === a.pa
    ? (a.pb.style.display = "none")
    : (tc(a), (a.pb.style.display = "inline-block"));
}
function tc(a) {
  if (-1 !== a.pa) {
    var b = A.character_classes[a.pa];
    a.pb.innerHTML =
      b.Name +
      " the " +
      b.className +
      ", young and naive, foolishly steps through the dungeon entrance...";
  }
}
function V() {
  this.ua = -1;
  this.Fd = this.l = this.m = this.u = this.D = null;
}
V.prototype.f = function () {};
V.prototype.g = function (a) {
  var b = !this.Fd || a != this.Fd;
  this.Fd = a;
  this.wc(a, b);
};
V.prototype.wc = function () {};
function gear_quality(a) {
  if (a.Pd) return "Empty";
  switch (a.Ha()) {
    case 0:
      return "Wretched";
    case 1:
      return "Garbage";
    case 2:
      return "Pathetic";
    case 3:
      return "Flawed";
    case 4:
      return "Lesser";
    case 5:
      return "Inferior";
    case 6:
      return "Plain";
    case 7:
      return "Common";
    case 8:
      return "Standard";
    case 9:
      return "Refined";
    case 10:
      return "Premium";
    case 11:
      return "Superior";
    case 12:
      return "Pristine";
    case 13:
      return "Perfect";
    case 14:
      return "Flawless";
    case 15:
      return "Heroic";
    case 16:
      return "Historic";
    case 17:
      return "Fabled";
    case 18:
      return "Mythical";
    case 19:
      return "Sublime";
    case 20:
      return "Sacred";
    case 21:
      return "Glorious";
    case 22:
      return "Divine";
    case 23:
      return "Godlike";
    case 24:
      return "Immortal";
    case 25:
      return "Eternal";
    case 26:
      return "Ethereal";
    case 27:
      return "Astral";
    case 28:
      return "Celestial";
    case 29:
      return "Cosmic";
    case 30:
      return "Galactic";
    case 31:
      return "Transcendent";
    case 40:
      return "Unique";
    default:
      return "BUG FOUND: " + a.Ha();
  }
}
function W(a, b) {
  return b
    ? a
      ? "alt itemValueBetter"
      : "itemValueBetter"
    : a
    ? "alt itemValueWorse"
    : "itemValueWorse";
}
function set_item_class_text(a, b) {
  var class_text;
  switch (b) {
    case 0:
      class_text = "itemQualityWretched";
      break;
    case 1:
      class_text = "itemQualityGarbage";
      break;
    case 2:
      class_text = "itemQualityPathetic";
      break;
    case 3:
      class_text = "itemQualityFlawed";
      break;
    case 4:
      class_text = "itemQualityLesser";
      break;
    case 5:
      class_text = "itemQualityInferior";
      break;
    case 6:
      class_text = "itemQualityPlain";
      break;
    case E:
      class_text = "itemQualityCommon";
      break;
    case 8:
      class_text = "itemQualityStandard";
      break;
    case 9:
      class_text = "itemQualityRefined";
      break;
    case 10:
      class_text = "itemQualityPremium";
      break;
    case 11:
      class_text = "itemQualitySuperior";
      break;
    case 12:
      class_text = "itemQualityPristine";
      break;
    case 13:
      class_text = "itemQualityPerfect";
      break;
    case 14:
      class_text = "itemQualityFlawless";
      break;
    case 15:
      class_text = "itemQualityHeroic";
      break;
    case 16:
      class_text = "itemQualityHistoric";
      break;
    case 17:
      class_text = "itemQualityFabled";
      break;
    case 18:
      class_text = "itemQualityMythical";
      break;
    case 19:
      class_text = "itemQualitySublime";
      break;
    case 20:
      class_text = "itemQualitySacred";
      break;
    case 21:
      class_text = "itemQualityGlorious";
      break;
    case 22:
      class_text = "itemQualityDivine";
      break;
    case 23:
      class_text = "itemQualityGodlike";
      break;
    case 24:
      class_text = "itemQualityImmortal";
      break;
    case 25:
      class_text = "itemQualityEternal";
      break;
    case 26:
      class_text = "itemQualityEthereal";
      break;
    case 27:
      class_text = "itemQualityAstral";
      break;
    case 28:
      class_text = "itemQualityCelestial";
      break;
    case 29:
      class_text = "itemQualityCosmic";
      break;
    case 30:
      class_text = "itemQualityGalactic";
      break;
    case 31:
      class_text = "itemQualityTranscendent";
      break;
    case 40:
      class_text = "itemQualityUnique";
      break;
    default:
      class_text = "itemQualityCommon";
  }
  return a ? "alt " + class_text : class_text;
}
function vc(a, b) {
  var c = b.indexOf(a);
  return -1 === c
    ? b
    : b.substring(0, c) +
        '<span style="color:#00A;">' +
        a +
        "</span>" +
        b.substring(c + a.length);
}
function wc() {
  this.container_id = "party_statistics_container";
  this.h = !1;
  this.Vf = "party_statistics_table";
  this.Mc = null;
  this.qf = "character_statistics_table";
  this.Cc = null;
  this.Ad = [];
  this.tf = this.ff = this.sf = this.$f = this.Hb = this.Kc = null;
  this.ue = this.se = this.te = this.ze = this.rb = this.oc = -1;
}
wc.prototype.f = function () {
  this.se = this.ue = this.te = this.ze = this.rb = this.oc = -1;
  var a = get_element_by_id(this.b);
  (this.Mc = get_element_by_id(this.Vf))
    ? N(this.Mc, !1)
    : (this.Mc = c("table", a, this.Vf, "cleanTable"));
  var b = this.Mc.insertRow(0),
    a = this.Mc.insertRow(1),
    c = create_table_header(b, "firstColumn"),
    d = create_table_header(b, null),
    f = create_table_header(b, null),
    g = create_table_header(b, null),
    h = create_table_header(b, null),
    b = create_table_header(b, null);
  c.innerHTML = "GOLD";
  d.innerHTML = "KILLS";
  f.innerHTML = "TOTAL CPS";
  g.innerHTML = "CLICK DMG";
  h.innerHTML = "BOSS KILLS";
  b.innerHTML = "CLICKS";
  c.title =
    "The money taken from the corpses of your enemies. Gold can be used to improve your weapons, thus converting even more enemies into corpses.";
  d.title =
    "The number of living beings murdered by you. Many of them were nice and wanted to be friends. They had families.";
  h.title = "The number of victories you have had over boss monsters.";
  b.title = "Carpal Tunnel Syndrome begins at 10,000 clicks.";
  this.Kc = a.insertCell(0);
  this.Hb = a.insertCell(1);
  this.$f = a.insertCell(2);
  this.sf = a.insertCell(3);
  this.ff = a.insertCell(4);
  this.tf = a.insertCell(5);
  this.Kc.className = "firstColumn";
  a = get_element_by_id(this.b);
  (this.Cc = get_element_by_id(this.qf))
    ? N(this.Cc, !0)
    : ((this.Cc = c("table", a, this.qf, "cleanTable")),
      (h = this.Cc.insertRow(0)),
      (a = create_table_header(h, "noBackground")),
      (c = create_table_header(h, null)),
      (d = create_table_header(h, null)),
      (f = create_table_header(h, null)),
      (g = create_table_header(h, null)),
      (h = create_table_header(h, null)),
      (a.innerHTML = "CHARACTER STATISTICS"),
      (c.innerHTML = "CLASS"),
      (d.innerHTML = "LVL"),
      (f.innerHTML = "CPS"),
      (g.innerHTML = "EXP"),
      (h.innerHTML = "KILLS"));
  for (a = this.Ad.length = 0; a < A.a.c.length; a++)
    (c = this.Cc.insertRow(a + 1)), (c = new xc(a, c)), c.f(), this.Ad.push(c);
  Q(this.b);
  this.h = !1;
};
wc.prototype.g = function () {
  if (0 !== A.a.c.length) {
    var a = lc();
    this.h !== a && ((this.h = a) ? R(this.b) : Q(this.b));
    if (a) {
      var b = A.a.M,
        a = b.Sd,
        c,
        d = 0;
      for (c = 0; c < A.a.c.length; c++) d += ra(A.a.c[c]);
      c = d;
      var d = fb(),
        f = b.yd,
        g = b.Bd,
        b = b.ya;
      b !== this.oc && ((this.Kc.innerHTML = w(b)), (this.oc = b));
      a !== this.rb && ((this.Hb.innerHTML = w(a)), (this.rb = a));
      c !== this.ze && ((this.$f.innerHTML = w(c)), (this.ze = c));
      d !== this.te && ((this.sf.innerHTML = w(d)), (this.te = d));
      f !== this.se && ((this.ff.innerHTML = w(f)), (this.se = f));
      g !== this.ue && ((this.tf.innerHTML = w(g)), (this.ue = g));
      for (a = 0; a < this.Ad.length; a++) this.Ad[a].g();
    }
  }
};
function xc(a, b) {
  this.randomize = a;
  this.set_item_class_text = b;
  this.Hb = this.Ic = this.l = this.m = this.D = null;
  this.Gc = "";
  this.rb = this.Ec = this.zf = this.Db = -1;
}
xc.prototype.f = function () {
  this.Pa();
};
xc.prototype.g = function () {
  var a = A.a.c[this.r];
  if (a) {
    var b = a.wa,
      c = a.ra,
      d = ra(a),
      f = a.Fa,
      a = a.Bc;
    b !== this.Gc && (this.Gc = this.D.innerHTML = b);
    c !== this.Db && ((this.m.innerHTML = w(c)), (this.Db = c));
    d !== this.zf && ((this.l.innerHTML = w(d)), (this.zf = d));
    f !== this.Ec && ((this.Ic.innerHTML = w(f)), (this.Ec = f));
    a !== this.rb && ((this.Hb.innerHTML = w(a)), (this.rb = a));
  }
};
xc.prototype.Pa = function () {
  this.D = this.X.insertCell(0);
  var a = this.X.insertCell(1);
  this.m = this.X.insertCell(2);
  this.l = this.X.insertCell(3);
  this.Ic = this.X.insertCell(4);
  this.Hb = this.X.insertCell(5);
  var b = 0 != (this.X.rowIndex + 1) % 2;
  this.D.className = b ? "firstColAlt" : "firstCol";
  b &&
    ((a.className = "alt"),
    (this.m.className = "alt"),
    (this.l.className = "alt"),
    (this.Ic.className = "alt"),
    (this.Hb.className = "alt"));
  if ((b = A.a.c[this.r])) (this.D.innerHTML = b.wa), (a.innerHTML = b.O);
};
function yc(a, b) {
  this.ua = a;
  this.I = this.l = this.m = this.u = this.V = this.lb = this.D = null;
  this.Ra = -1e5;
  this.Pa(b);
  this.xa = E;
  this.gb = this.Gb = !1;
}
yc.prototype = new V();
yc.prototype.wc = function (a, b) {
  var c = A.a.R[a.H];
  if (c) {
    var d = c.Aa[a.w],
      f = d ? d.j : 0,
      d = a.j > f,
      f = a.j - f,
      g = 0 != this.ua % 2,
      h = a.Ha();
    b &&
      ((this.D.innerHTML = vc(a.w, a.tb)),
      (this.V.innerHTML = a.H),
      (this.u.innerHTML = gear_quality(a)),
      (this.m.innerHTML = w(a.ub)),
      (this.l.innerHTML = w(a.j)),
      (this.Gb = !d),
      (this.xa = null),
      (this.gb = !d));
    d !== this.Gb &&
      ((this.Gb = d)
        ? ((this.V.className = "buyButton"),
          (this.V.onclick = function () {
            F(c, a);
            A.a.nb.removeItem(a);
            G(c);
            return !1;
          }))
        : ((this.V.className = "disabledBuyButton"),
          (this.V.onclick = function () {
            return !1;
          })));
    h != this.xa && ((this.xa = h), (this.u.className = set_item_class_text(g, h)));
    d != this.gb && ((this.gb = d), (this.l.className = W(g, d)));
    this.Ra !== f &&
      ((this.I.innerHTML = w(f)),
      (this.I.className = W(g, 0 < f)),
      (this.Ra = f));
  }
};
yc.prototype.Pa = function (a) {
  var b = 0 != this.ua % 2;
  this.D = a.insertCell(0);
  this.D.className = b ? "firstColAlt" : "firstCol";
  this.lb = a.insertCell(1);
  this.u = a.insertCell(2);
  this.m = a.insertCell(3);
  this.l = a.insertCell(4);
  this.I = a.insertCell(5);
  this.lb.style.width = "75px";
  this.lb.style.lineHeight = "18px";
  this.u.style.width = "60px";
  this.m.style.width = "30px";
  this.l.style.width = "30px";
  this.I.style.width = "40px";
  this.V = create_element("a", this.lb, null, "buyButton");
  this.V.href = "#";
  this.V.style.minWidth = "75px";
  this.V.onclick = function () {
    return !1;
  };
  b && ((this.lb.className = "alt"), (this.m.className = "alt"));
  this.u.className = set_item_class_text(b, E);
  this.l.className = W(b, !1);
  this.I.className = W(b, !0);
};
function zc(a, b) {
  this.ua = a;
  this.I = this.l = this.m = this.u = this.V = this.lb = this.D = null;
  this.Ra = -1e5;
  this.Pa(b);
  this.xa = E;
  this.gb = this.Gb = !1;
}
zc.prototype = new V();
zc.prototype.wc = function (a, b) {
  var c = A.a.R[a.H],
    d = c.Aa[a.w],
    f = d ? d.j : 0,
    d = a.j > f,
    f = a.j - f,
    g = 0 != this.ua % 2,
    h = a.Ha();
  b &&
    ((this.D.innerHTML = vc(a.w, a.tb)),
    (this.V.innerHTML = a.H),
    (this.u.innerHTML = gear_quality(a)),
    (this.m.innerHTML = w(a.ub)),
    (this.l.innerHTML = w(a.j)),
    (this.Gb = !d),
    (this.xa = null),
    (this.gb = !d));
  d !== this.Gb &&
    ((this.Gb = d)
      ? ((this.V.className = "buyButton"),
        (this.V.onclick = function () {
          F(c, a);
          A.a.Va.removeItem(a);
          G(c);
          return !1;
        }))
      : ((this.V.className = "disabledBuyButton"),
        (this.V.onclick = function () {
          return !1;
        })));
  h != this.xa && ((this.xa = h), (this.u.className = set_item_class_text(g, h)));
  d != this.gb && ((this.gb = d), (this.l.className = W(g, d)));
  this.Ra !== f &&
    ((this.I.innerHTML = w(f)),
    (this.I.className = W(g, 0 < f)),
    (this.Ra = f));
};
zc.prototype.Pa = function (a) {
  var b = 0 != this.ua % 2;
  this.D = a.insertCell(0);
  this.D.className = b ? "firstColAlt" : "firstCol";
  this.lb = a.insertCell(1);
  this.u = a.insertCell(2);
  this.m = a.insertCell(3);
  this.l = a.insertCell(4);
  this.I = a.insertCell(5);
  this.lb.style.width = "75px";
  this.lb.style.lineHeight = "18px";
  this.u.style.width = "60px";
  this.m.style.width = "30px";
  this.l.style.width = "30px";
  this.I.style.width = "40px";
  this.V = create_element("a", this.lb, null, "buyButton");
  this.V.href = "#";
  this.V.style.minWidth = "75px";
  this.V.onclick = function () {
    return !1;
  };
  b && ((this.lb.className = "alt"), (this.m.className = "alt"));
  this.u.className = set_item_class_text(b, E);
  this.l.className = W(b, !1);
  this.I.className = W(b, !0);
};
function Ac() {
  this.b = "item_drop_container";
  this.C = "item_drop_table";
  this.sa = [];
  this.Gd = [];
  this.table = null;
  this.lg = 6;
  this.$c = -1;
}
e = Ac.prototype;
e.f = function () {};
e.g = function () {
  var a = A.a.nb.items,
    b,
    c;
  this.table || (this.ba(), R(this.b));
  if (this.$c !== a.length) {
    N(this.table, !0);
    this.sa.length = 0;
    this.Gd.length = 0;
    this.$c = a.length;
    for (c = 0; c < a.length; c++)
      (b = this.table.insertRow(c + 1)),
        this.sa.push(a[c]),
        this.Gd.push(new yc(c, b));
    for (c = a.length; c < this.lg; c++) this.de(c + 1);
  }
  for (c = 0; c < this.Gd.length; c++) this.Gd[c].g(a[c]);
};
e.de = function (a) {
  var b = this.table.insertRow(a);
  a = 0 != (a + 1) % 2;
  var c = b.insertCell(0),
    d = b.insertCell(1),
    f = b.insertCell(2),
    g = b.insertCell(3),
    h = b.insertCell(4),
    b = b.insertCell(4);
  c.className = a ? "firstColAlt" : "firstCol";
  a &&
    ((d.className = "alt"),
    (f.className = "alt"),
    (g.className = "alt"),
    (h.className = "alt"),
    (b.className = "alt"));
  c.innerHTML = "&nbsp;";
  d.innerHTML = "&nbsp;";
  f.innerHTML = "&nbsp;";
  g.innerHTML = "&nbsp;";
  h.innerHTML = "&nbsp;";
  b.innerHTML = "&nbsp;";
  d.style.width = "80px";
  d.style.lineHeight = "21px";
  f.style.width = "60px";
  g.style.width = "30px";
  h.style.width = "30px";
  b.style.width = "40px";
};
e.ba = function () {
  var a = get_element_by_id(this.b);
  this.table = get_element_by_id(this.C);
  this.table || (this.table = create_element("table", a, this.C, "cleanTable"));
  var a = this.table.insertRow(0),
    b = create_table_header(a, "noBackground");
  this.qe(b);
  create_table_header(a, null).innerHTML = "EQUIP";
  create_table_header(a, null).innerHTML = "QUALITY";
  create_table_header(a, null).innerHTML = "LVL";
  create_table_header(a, null).innerHTML = "CPS";
  create_table_header(a, null).innerHTML = "\u0394CPS";
};
e.qe = function (a) {
  var b = c("table", a, null, null),
    c = b.insertRow(0),
    d = c.insertCell(0),
    c = c.insertCell(1);
  a.style.padding = 0;
  b.style.width = "100%";
  d.innerHTML = "RECENT ITEM DROPS";
  d.className = "clearCell";
  d.style.verticalAlign = "bottom";
  d.style.textAlign = "left";
  c.className = "clearCell";
  c.style.verticalAlign = "bottom";
  c.style.textAlign = "right";
  a = c("a", c, null, "buyButton");
  a.href = "#";
  a.title = "Clear all junk items, equip all good items.";
  a.style.minWidth = "95px";
  a.style.fontWeight = "normal";
  a.innerHTML = "Equip / Clear";
  a.onclick = function () {
    Ba(A.a.nb);
    for (var a, b; 0 !== A.a.nb.items.length; )
      (a = A.a.nb.items[0]),
        Ca(a)
          ? ((b = A.a.R[a.H]), F(b, a), A.a.nb.removeItem(a), G(b))
          : A.a.nb.removeItem(a);
    return !1;
  };
};
function Bc() {
  this.b = "item_cache_container";
  this.C = "item_cache_table";
  this.sa = [];
  this.zd = [];
  this.table = null;
  this.$c = -1;
}
e = Bc.prototype;
e.f = function () {};
e.g = function () {
  var a = A.a.Va.items,
    b,
    c;
  this.table || (this.ba(), R(this.b));
  if (this.$c !== a.length) {
    N(this.table, !0);
    this.sa.length = 0;
    this.zd.length = 0;
    this.$c = a.length;
    for (c = 0; c < a.length; c++)
      (b = this.table.insertRow(c + 1)),
        this.sa.push(a[c]),
        this.zd.push(new zc(c, b));
    b = Fa + A.a.P.ja * Ga;
    for (c = a.length; c < b; c++) this.de(c + 1);
  }
  for (c = 0; c < this.zd.length; c++) this.zd[c].g(a[c]);
};
e.de = function (a) {
  var b = this.table.insertRow(a);
  a = 0 != (a + 1) % 2;
  var c = b.insertCell(0),
    d = b.insertCell(1),
    f = b.insertCell(2),
    g = b.insertCell(3),
    h = b.insertCell(4),
    b = b.insertCell(5);
  c.className = a ? "firstColAlt" : "firstCol";
  a &&
    ((d.className = "alt"),
    (f.className = "alt"),
    (g.className = "alt"),
    (h.className = "alt"),
    (b.className = "alt"));
  c.innerHTML = "&nbsp;";
  d.innerHTML = "&nbsp;";
  f.innerHTML = "&nbsp;";
  g.innerHTML = "&nbsp;";
  h.innerHTML = "&nbsp;";
  b.innerHTML = "&nbsp;";
  d.style.width = "80px";
  d.style.lineHeight = "21px";
  f.style.width = "60px";
  g.style.width = "30px";
  h.style.width = "30px";
  b.style.width = "40px";
};
e.ba = function () {
  var a = get_element_by_id(this.b);
  this.table = get_element_by_id(this.C);
  this.table || (this.table = create_element("table", a, this.C, "cleanTable"));
  var a = this.table.insertRow(0),
    b = create_table_header(a, "noBackground");
  this.qe(b);
  create_table_header(a, null).innerHTML = "EQUIP";
  create_table_header(a, null).innerHTML = "QUALITY";
  create_table_header(a, null).innerHTML = "LVL";
  create_table_header(a, null).innerHTML = "CPS";
  create_table_header(a, null).innerHTML = "\u0394CPS";
};
e.qe = function (a) {
  var b = c("table", a, null, null),
    c = b.insertRow(0),
    d = c.insertCell(0),
    c = c.insertCell(1);
  a.style.padding = 0;
  b.style.width = "100%";
  d.innerHTML = "CACHED ITEMS";
  d.className = "clearCell";
  d.style.verticalAlign = "bottom";
  d.style.textAlign = "left";
  c.className = "clearCell";
  c.style.verticalAlign = "bottom";
  c.style.textAlign = "right";
  a = c("a", c, null, "buyButton");
  a.href = "#";
  a.title = "Equip all cached items";
  a.style.minWidth = "95px";
  a.style.fontWeight = "normal";
  a.innerHTML = "Equip All";
  a.onclick = function () {
    for (var a, b; 0 !== A.a.Va.items.length; )
      (a = A.a.Va.items[0]),
        Ca(a)
          ? ((b = A.a.R[a.H]), F(b, a), A.a.Va.removeItem(a), G(b))
          : A.a.Va.removeItem(a);
    return !1;
  };
};
function Cc(a, b, c) {
  this.ua = b;
  this.r = a;
  this.l = this.m = this.u = this.Gf = this.Mf = this.D = null;
  this.Pa(c);
  this.Fd = null;
  this.xa = E;
}
Cc.prototype = new V();
Cc.prototype.wc = function (a, b) {
  b &&
    ((this.Mf.innerHTML = vc(a.w, a.tb)),
    (this.u.innerHTML = gear_quality(a)),
    (this.m.innerHTML = w(a.ub)),
    (this.l.innerHTML = w(a.j)));
  var c = a.Ha();
  if (b || c != this.xa)
    (this.xa = c), (this.u.className = set_item_class_text(0 != this.ua % 2, c));
};
Cc.prototype.Pa = function (a) {
  var b = 0 != this.ua % 2;
  this.D = a.insertCell(0);
  this.D.className = b ? "firstColAlt" : "firstCol";
  this.Gf = create_element("div", this.D, null, "hoveredIndicator");
  this.Gf.innerHTML = "&#149;";
  this.Mf = create_element("span", this.D, null, null);
  this.u = a.insertCell(1);
  this.m = a.insertCell(2);
  this.l = a.insertCell(3);
  this.u.style.width = "60px";
  this.m.style.width = "30px";
  this.l.style.width = "30px";
  b && ((this.m.className = "alt"), (this.l.className = "alt"));
  this.u.className = set_item_class_text(b, E);
};
function Dc(a) {
  this.r = a;
  this.b = "char" + a + "_inventory_container";
  this.C = "char" + a + "_inventory_table";
  this.Lc = !1;
  this.sa = [];
  this.Xc = [];
  this.table = null;
}
Dc.prototype.f = function () {};
Dc.prototype.g = function () {
  var a = A.a.c[this.r],
    b;
  if (a)
    if (lc()) this.Lc && (Q(this.b), (this.Lc = !1));
    else {
      var c = a.items;
      if (c && 0 !== c.length) {
        this.Lc || (R(this.b), (this.Lc = !0));
        this.table || this.ba();
        if (this.sa.length !== c.length)
          for (
            this.table && N(this.table, !0),
              this.sa.length = 0,
              b = this.Xc.length = 0;
            b < c.length;
            b++
          )
            (a = this.table.insertRow(b + 1)),
              this.sa.push(c[b]),
              this.Xc.push(new Cc(this.r, b, a));
        for (b = 0; b < this.Xc.length; b++) this.Xc[b].g(c[b]);
      } else
        this.table && 1 < this.table.rows.length && N(this.table, !0),
          this.Lc && (Q(this.b), (this.Lc = !1)),
          (this.sa.length = 0),
          (this.Xc.length = 0);
    }
};
Dc.prototype.ba = function () {
  var a = get_element_by_id(this.b);
  this.table = get_element_by_id(this.C);
  this.table || (this.table = create_element("table", a, this.C, "cleanTable"));
  a = this.table.insertRow(0);
  create_table_header(a, "noBackground").innerHTML = "CURRENT INVENTORY";
  create_table_header(a, null).innerHTML = "QUALITY";
  create_table_header(a, null).innerHTML = "LVL";
  create_table_header(a, null).innerHTML = "CPS";
};
function Ec(a, b, c) {
  this.ua = b;
  this.r = a;
  this.I = this.l = this.m = this.u = this.la = this.ib = this.D = null;
  this.Ra = -1e5;
  this.Pa(c);
  this.gb = this.Qd = this.wd = !1;
  this.xa = E;
}
Ec.prototype = new V();
Ec.prototype.wc = function (a, b) {
  var c = A.a.c[this.r];
  if (c) {
    var d = c.Aa[a.w],
      c = A.a.M.ya >= a.ca,
      f = d ? d.j : 0,
      d = a.j > f,
      f = a.j - f,
      g = c && d,
      h = a.Ha(),
      l = 0 != this.ua % 2,
      k = this.r;
    b &&
      ((this.D.innerHTML = vc(a.w, a.tb)),
      (this.la.innerHTML = "$" + w(a.ca)),
      (this.u.innerHTML = gear_quality(a)),
      (this.m.innerHTML = w(a.ub)),
      (this.l.innerHTML = w(a.j)));
    b && ((this.Qd = !g), (this.wd = !c), (this.gb = !d), (this.xa = null));
    g != this.Qd
      ? ((this.Qd = g),
        (this.wd = c),
        this.Qd
          ? ((this.la.className = "buyButton"),
            (this.la.onclick = function () {
              Fc(k, a);
              return !1;
            }))
          : ((this.la.className = c
              ? "disabledBuyButton"
              : "unaffordableBuyButton"),
            (this.la.onclick = function () {
              return !1;
            })))
      : g ||
        c == this.wd ||
        ((this.wd = c),
        (this.la.className = c
          ? "disabledBuyButton"
          : "unaffordableBuyButton"));
    h != this.xa && ((this.xa = h), (this.u.className = set_item_class_text(l, h)));
    d != this.gb && ((this.gb = d), (this.l.className = W(l, d)));
    this.Ra !== f &&
      ((this.I.innerHTML = w(f)),
      (this.I.className = W(l, 0 < f)),
      (this.Ra = f));
  }
};
Ec.prototype.Pa = function (a) {
  var b = 0 != this.ua % 2;
  this.D = a.insertCell(0);
  this.D.className = b ? "firstColAlt" : "firstCol";
  this.ib = a.insertCell(1);
  this.u = a.insertCell(2);
  this.m = a.insertCell(3);
  this.l = a.insertCell(4);
  this.I = a.insertCell(5);
  this.ib.style.width = "50px";
  this.u.style.width = "60px";
  this.m.style.width = "30px";
  this.l.style.width = "30px";
  this.I.style.width = "40px";
  this.la = create_element("a", this.ib, null, "buyButton");
  this.la.href = "#";
  this.la.onclick = function () {
    return !1;
  };
  b && ((this.ib.className = "alt"), (this.m.className = "alt"));
  this.u.className = set_item_class_text(b, E);
  this.l.className = W(b, !1);
  this.I.className = W(b, !0);
};
function Gc(a) {
  this.r = a;
  this.b = "char" + a + "_store_container";
  this.C = "char" + a + "_shop_table";
  this.Vc = "char" + a + "_shop_caption";
  this.Ma = !1;
  this.sa = [];
  this.Yc = [];
  this.caption = this.table = null;
  this.nc = this.mc = -1;
}
Gc.prototype.f = function () {
  A.a.c.length > this.r && this.ba();
  this.nc = this.mc = -1;
};
Gc.prototype.g = function () {
  var a = A.a.c[this.r],
    b;
  if (a)
    if (lc()) this.Ma && (Q(this.b), (this.Ma = !1));
    else {
      var c = A.a.Y.uc[a.O];
      if (c && 0 !== c.length) {
        this.Ma || (R(this.b), (this.Ma = !0));
        if (this.sa.length !== c.length)
          for (
            this.table && N(this.table, !0),
              this.sa.length = 0,
              b = this.Yc.length = 0;
            b < c.length;
            b++
          )
            (a = this.table.insertRow(b + 1)),
              this.sa.push(c[b]),
              this.Yc.push(new Ec(this.r, b, a));
        for (b = 0; b < this.Yc.length; b++) this.Yc[b].g(c[b]);
      } else
        this.table && 1 < this.table.rows.length && N(this.table, !0),
          this.Ma && (Q(this.b), (this.Ma = !1)),
          (this.sa.length = 0),
          (this.Yc.length = 0);
      a = A.a.Y.Zd;
      b = A.a.Y.$d;
      if (a != this.mc || b != this.nc)
        (this.mc = a),
          (this.nc = b),
          (this.caption.innerHTML =
            1 === a
              ? "Shop items restocked in " + a + " minute and " + b + " seconds"
              : 0 < a
              ? "Shop items restocked in " +
                a +
                " minutes and " +
                b +
                " seconds"
              : "Shop items restocked in " + b + " seconds");
    }
};
Gc.prototype.ba = function () {
  if (A.a.c[this.r]) {
    var a = get_element_by_id(this.b);
    (this.table = get_element_by_id(this.C))
      ? N(this.table, !1)
      : (this.table = create_element("table", a, this.C, "cleanTable"));
    this.caption = get_element_by_id(this.Vc);
    this.caption || (this.caption = create_element("caption", this.table, this.Vc, null));
    var a = this.table.insertRow(0),
      b = create_table_header(a, "noBackground");
    this.oe(b);
    create_table_header(a, null).innerHTML = "BUY";
    create_table_header(a, null).innerHTML = "QUALITY";
    create_table_header(a, null).innerHTML = "LVL";
    create_table_header(a, null).innerHTML = "CPS";
    create_table_header(a, null).innerHTML = "\u0394CPS";
  }
};
Gc.prototype.oe = function (a) {
  var b = A.a.c[this.r],
    c = create_element("table", a, null, null),
    d = c.insertRow(0),
    f = d.insertCell(0),
    d = d.insertCell(1);
  a.style.padding = 0;
  c.style.width = "100%";
  f.innerHTML = b.O.toUpperCase() + " ITEM SHOP";
  f.className = "clearCell";
  f.style.verticalAlign = "bottom";
  f.style.textAlign = "left";
  d.className = "clearCell";
  d.style.verticalAlign = "bottom";
  d.style.textAlign = "right";
  a = c("a", d, null, "buyButton");
  a.href = "#";
  a.title =
    "Buys as many items as possible, ordered by best value (\u0394CPS / price).";
  a.style.minWidth = "85px";
  a.style.fontWeight = "normal";
  a.innerHTML = "Buy All";
  a.onclick = function () {
    Hc(A.a.Y.uc[b.O]);
    return !1;
  };
};
function Ic(a) {
  this.r = a;
  this.b = "char" + a + "_statistics_container";
  this.C = "char" + a + "_statistics_table";
  this.ae = !1;
  this.Hb = this.Nf = this.Ic = this.l = this.m = this.Kc = this.table = null;
  this.rb = this.we = this.Ec = this.ve = this.Db = this.oc = -1;
}
Ic.prototype.f = function () {
  A.a.c.length > this.r && this.ba();
};
Ic.prototype.g = function () {
  if (0 !== A.a.c.length) {
    var a = A.a.c[this.r];
    if (a)
      if (lc()) this.ae && (Q(this.b), (this.ae = !1));
      else {
        this.ae || (R(this.b), (this.ae = !0));
        var b = A.a.M.ya;
        this.oc != b && ((this.oc = b), (this.Kc.innerHTML = w(this.oc)));
        this.Db != a.ra && ((this.Db = a.ra), (this.m.innerHTML = w(this.Db)));
        this.ve != ra(a) &&
          ((this.ve = ra(a)), (this.l.innerHTML = w(this.ve)));
        this.Ec != a.Fa && ((this.Ec = a.Fa), (this.Ic.innerHTML = w(this.Ec)));
        b = a.Fb - a.Fa;
        this.we != b && ((this.we = b), (this.Nf.innerHTML = w(this.we)));
        this.rb != a.Bc && ((this.rb = a.Bc), (this.Hb.innerHTML = w(this.rb)));
      }
  }
};
Ic.prototype.ba = function () {
  var a = A.a.c[this.r];
  if (a) {
    var b = get_element_by_id(this.b);
    (this.table = get_element_by_id(this.C))
      ? N(this.table, !1)
      : (this.table = c("table", b, this.C, "cleanTable"));
    var c = this.table.insertRow(0),
      b = this.table.insertRow(1);
    create_table_header(c, "noBackground").innerHTML = "STATISTICS";
    var d = create_table_header(c, null);
    d.innerHTML = "PARTY GOLD";
    d.title =
      "The money taken from the corpses of your enemies. Gold can be used to purchase better items, thus converting even more enemies into corpses.";
    create_table_header(c, null).innerHTML = "LVL";
    create_table_header(c, null).innerHTML = "CPS";
    d = create_table_header(c, null);
    d.innerHTML = "EXP";
    d.title =
      "The number that represents how much this character has grown as an individual by killing those who are less fortunate.";
    d = create_table_header(c, null);
    d.innerHTML = "REQ EXP";
    d.title = "The experience needed to reach the next level.";
    c = create_table_header(c, null);
    c.innerHTML = "KILLS";
    c.title =
      "The number of living beings murdered by this character. Many of them were nice and wanted to be friends. They had families.";
    c = b.insertCell(0);
    c.className = "firstCol";
    c.innerHTML = a.O;
    this.Kc = b.insertCell(1);
    this.m = b.insertCell(2);
    this.l = b.insertCell(3);
    this.Ic = b.insertCell(4);
    this.Nf = b.insertCell(5);
    this.Hb = b.insertCell(6);
  }
};
function Jc(a) {
  this.r = a;
  this.b = "char" + a + "_ability_container";
  this.C = "char" + a + "_abilities_table";
  this.table = null;
  this.cb = this.zb = this.ob = !1;
  this.Tb = -1;
  this.jc = this.td = null;
}
e = Jc.prototype;
e.f = function () {
  A.a.c[this.r] &&
    ((this.cb = this.zb = !1),
    (this.jc = this.Champions_table_container = null),
    (this.Tb = -1),
    this.ba());
};
e.g = function () {
  var a = A.a.c[this.r];
  if (a) {
    var b = this.r === A.input.pa;
    this.ob !== b && ((this.ob = b) ? R(this.b) : Q(this.b));
    if (b) {
      a = a.Ea;
      a.N != this.zb
        ? ((this.zb = a.N),
          (this.cb = a.G),
          a.N
            ? (O(this.jc), P(this.td))
            : ((this.jc.className = a.G
                ? "activeCharacterAbilityTableButton"
                : "disabledCharacterAbilityTableButton"),
              P(this.jc),
              O(this.td)))
        : a.G != this.cb &&
          ((this.cb = a.G),
          (this.jc.className = a.G
            ? "activeCharacterAbilityTableButton"
            : "disabledCharacterAbilityTableButton"));
      var c,
        b = get_date();
      a.N ||
        ((c = a.G ? Math.max(0, a.qb - b) / 1e3 : Rb(a, b) / 1e3),
        (b = q(c % 60)),
        this.Tb !== b &&
          ((this.Tb = b),
          (c = q(c / 60)),
          (this.jc.innerHTML =
            10 > b
              ? a.Ua() + " (" + c + ":0" + b + ")"
              : a.Ua() + " (" + c + ":" + b + ")")));
    }
  }
};
e.ba = function () {
  var a = A.a.c[this.r];
  if (a) {
    var b = get_element_by_id(this.b);
    (this.table = get_element_by_id(this.C))
      ? N(this.table, !1)
      : (this.table = create_element("table", b, this.C, "cleanTable"));
    b = this.table.insertRow(0);
    create_table_header(b, "noBackground").innerHTML = "CHARACTER ABILITY";
    create_table_header(b, null).innerHTML = "DESCRIPTION";
    this.me(this.table.insertRow(1), 0, a.Ea);
  }
};
e.me = function (a, b, c) {
  b = 0 != b % 2;
  var d = a.insertCell(0);
  a = a.insertCell(1);
  d.className = b ? "firstColAlt" : "firstCol";
  d.style.width = "220px";
  b && (a.className = "alt");
  this.Champions_table_container = this.ne(d, c);
  this.jc = this.pe(d, c);
  a.innerHTML = c.cd();
  this.zb = c.N;
  this.cb = c.G;
};
e.ne = function (a, b) {
  var c = create_element("a", a, null, "characterAbilityTableButton");
  c.innerHTML = b.Ua();
  c.onclick = function () {
    Ub(b);
  };
  b.N ? P(c) : O(c);
  return c;
};
e.pe = function (a, b) {
  var c = create_element(
    "a",
    a,
    null,
    b.G
      ? "activeCharacterAbilityTableButton"
      : "disabledCharacterAbilityTableButton"
  );
  c.innerHTML = "countdown goes here";
  b.N ? O(c) : P(c);
  return c;
};
function Kc(a) {
  this.r = a;
  this.mg = "char" + a + "_level";
  this.lf = "char" + this.r + "_name";
  this.Gc = "";
  this.Db = -1;
  this.b = "char" + a + "_section";
  this.ob = !0;
  this.mf = new Jc(a);
  this.pf = new Ic(a);
  this.of = new Dc(a);
  this.rf = new Gc(a);
}
Kc.prototype.f = function () {
  var a = A.a.c[this.r];
  a
    ? (S("tabLink" + this.r, a.O),
      S(this.lf, a.wa),
      (this.Gc = a.wa),
      R("tabChar" + this.r))
    : Q("tabChar" + this.r);
  this.mf.f();
  this.pf.f();
  this.of.f();
  this.rf.f();
};
Kc.prototype.g = function () {
  var a = this.r === A.input.pa;
  this.ob !== a && ((this.ob = a) ? R(this.b) : Q(this.b));
  var b = A.a.c[this.r];
  b &&
    (a &&
      ((a = b.ra),
      a !== this.Db && (S(this.mg, "Level " + a + " " + b.O), (this.Db = a))),
    (a = b.wa),
    this.Gc !== a && (S(this.lf, b.wa), (this.Gc = a)),
    this.mf.g(),
    this.pf.g(),
    this.of.g(),
    this.rf.g());
};
function Lc() {
  this.b = "party_section";
  this.ob = !1;
  this.Rf = new Mc();
  this.$b = new Nc();
  this.Uf = new wc();
}
Lc.prototype.f = function () {
  this.Rf.f();
  this.$b.f();
  this.Uf.f();
};
Lc.prototype.g = function () {
  var a = lc();
  this.ob !== a && ((this.ob = a) ? R(this.b) : Q(this.b));
  a && (this.Rf.g(), this.Uf.g(), this.$b.g());
};
function Mc() {
  this.b = "party_abilities_container";
  this.C = "party_abilities_table";
  this.table = null;
  this.ob = !1;
  this.bb = -1;
  this.zb = [];
  this.cb = [];
  this.Tb = [];
  this.ud = [];
  this.kc = [];
}
e = Mc.prototype;
e.f = function () {
  this.zb.length = 0;
  this.cb.length = 0;
  this.ud.length = 0;
  this.kc.length = 0;
  this.Tb.length = 0;
  this.ba();
  var a;
  for (a = 0; a < A.a.c.length; a++) this.Tb[a] = -1;
  this.bb = -1;
};
e.g = function () {
  var a = lc();
  this.ob !== a && ((this.ob = a) ? R(this.b) : Q(this.b));
  if (a) {
    var b,
      a = A.jb.bb;
    if (a != this.bb)
      for (this.bb = a, a = 0; a < A.a.c.length; a++)
        (b = A.a.c[a].Ea),
          b.N != this.zb[a]
            ? ((this.zb[a] = b.N),
              (this.cb[a] = b.G),
              b.N
                ? (O(this.kc[a]), P(this.ud[a]))
                : ((this.kc[a].className = b.G
                    ? "activeCharacterAbilityTableButton"
                    : "disabledCharacterAbilityTableButton"),
                  P(this.kc[a]),
                  O(this.ud[a])))
            : b.G != this.cb[a] &&
              ((this.cb[a] = b.G),
              (this.kc[a].className = b.G
                ? "activeCharacterAbilityTableButton"
                : "disabledCharacterAbilityTableButton"));
    for (var c, d, f = get_date(), a = 0; a < A.a.c.length; a++)
      (b = A.a.c[a].Ea),
        b.N ||
          ((c = b.G ? Math.max(0, b.qb - f) / 1e3 : Rb(b, f) / 1e3),
          (d = q(c % 60)),
          this.Tb[a] !== d &&
            ((this.Tb[a] = d),
            (c = q(c / 60)),
            (this.kc[a].innerHTML =
              10 > d
                ? b.Ua() + " (" + c + ":0" + d + ")"
                : b.Ua() + " (" + c + ":" + d + ")")));
  }
};
e.ba = function () {
  var a = get_element_by_id(this.b);
  (this.table = get_element_by_id(this.C))
    ? N(this.table, !1)
    : (this.table = create_element("table", a, this.C, "cleanTable"));
  var a = this.table.insertRow(0),
    b = create_table_header(a, "noBackground");
  Oc(b);
  create_table_header(a, null).innerHTML = "DESCRIPTION";
  for (a = 0; a < A.a.c.length; a++)
    this.me(this.table.insertRow(a + 1), a, A.a.c[a].Ea);
};
function Oc(a) {
  var b = c("table", a, null, null),
    c = b.insertRow(0),
    d = c.insertCell(0),
    c = c.insertCell(1);
  a.style.padding = 0;
  b.style.width = "100%";
  d.innerHTML = "CHARACTER ABILITIES";
  d.className = "clearCell";
  d.style.verticalAlign = "bottom";
  d.style.textAlign = "left";
  c.className = "clearCell";
  c.style.verticalAlign = "bottom";
  c.style.textAlign = "right";
  a = c("a", c, null, "buyButton");
  a.href = "#";
  a.title = "Activates all available character abilities";
  a.style.minWidth = "65px";
  a.style.fontWeight = "normal";
  a.innerHTML = "All";
  a.onclick = function () {
    var a,
      b,
      c = null,
      d = null;
    for (a = 0; a < A.a.c.length; a++)
      (b = A.a.c[a].Ea),
        b.N && (b.Ua() === Zb ? (c = b) : b.Ua() === dc ? (d = b) : Ub(b));
    c && Ub(c);
    d && ((a = A.a.aa), (b = A.a.Eb), a.Da || a.Na || null !== b.fc || Ub(d));
    return !1;
  };
}
e.me = function (a, b, c) {
  var d = 0 != b % 2,
    f = a.insertCell(0);
  a = a.insertCell(1);
  f.className = d ? "firstColAlt" : "firstCol";
  f.style.width = "220px";
  d && (a.className = "alt");
  this.ud[b] = this.ne(f, c);
  this.kc[b] = this.pe(f, c);
  a.innerHTML = c.cd();
  this.zb[b] = c.N;
  this.cb[b] = c.G;
};
e.ne = function (a, b) {
  var c = create_element("a", a, null, "characterAbilityTableButton");
  c.innerHTML = b.Ua();
  c.onclick = function () {
    Ub(b);
  };
  b.N ? P(c) : O(c);
  return c;
};
e.pe = function (a, b) {
  var c = create_element(
    "a",
    a,
    null,
    b.G
      ? "activeCharacterAbilityTableButton"
      : "disabledCharacterAbilityTableButton"
  );
  c.innerHTML = "countdown goes here";
  b.N ? O(c) : P(c);
  return c;
};
function Pc(a, b, c) {
  this.ua = b;
  this.$b = a;
  this.X = null;
  this.item = c;
  this.I =
    this.l =
    this.m =
    this.u =
    this.Ac =
    this.la =
    this.ib =
    this.D =
      null;
  this.Ra = -1e4;
  this.Fc = !1;
}
Pc.prototype = new V();
Pc.prototype.wc = function (a, b) {
  if (this.X) {
    var c = A.a.R[a.H],
      d = c ? c.Aa[a.w] : null,
      f = d ? d.j : 0,
      d = a.j > f,
      f = a.j - f,
      g = 0 != (this.X.rowIndex - 1) % 2,
      h = a.Ha();
    if (!d) Qc(this.$b, this);
    else if (b) {
      this.D.innerHTML = vc(a.w, a.tb);
      this.la.innerHTML = "$" + w(a.ca);
      this.Ac.innerHTML = a.H;
      this.u.innerHTML = gear_quality(a);
      this.m.innerHTML = w(a.ub);
      this.l.innerHTML = w(a.j);
      this.I.innerHTML = w(f);
      this.Ra = f;
      var l = this;
      this.la.className = "buyButton";
      this.la.onclick = function () {
        Fc(A.a.c.indexOf(c), a);
        Qc(l.$b, l);
        return !1;
      };
      this.u.className = set_item_class_text(g, h);
      this.l.className = W(g, d);
      this.I.className = W(g, 0 < f);
    }
  }
};
Pc.prototype.Pa = function (a) {
  var b = 0 != (a.rowIndex - 1) % 2;
  this.D = a.insertCell(0);
  this.D.className = b ? "firstColAlt" : "firstCol";
  this.ib = a.insertCell(1);
  this.Ac = a.insertCell(2);
  this.u = a.insertCell(3);
  this.m = a.insertCell(4);
  this.l = a.insertCell(5);
  this.I = a.insertCell(6);
  this.D.style.width = "250px";
  this.ib.style.width = "50px";
  this.Ac.style.width = "60px";
  this.u.style.width = "60px";
  this.m.style.width = "30px";
  this.l.style.width = "30px";
  this.I.style.width = "40px";
  this.la = create_element("a", this.ib, null, "buyButton");
  this.la.href = "#";
  this.la.onclick = function () {
    return !1;
  };
  b &&
    ((this.ib.className = "alt"),
    (this.Ac.className = "alt"),
    (this.m.className = "alt"));
  this.u.className = set_item_class_text(b, E);
  this.l.className = W(b, !1);
  this.I.className = W(b, !0);
};
function Nc() {
  this.container_id = "party_store_container";
  this.table_id = "party_shop_table";
  this.no_items_id = "party_shop_no_items";
  this.table_caption_id = "party_shop_table_caption";
  this.Xf = null;
  this.h = this.Ma = !1;
  this.Ja = [];
  this.caption = this.$a = this.table = null;
  this.vb = this.nc = this.mc = -1;
}
Nc.prototype.f = function () {
  this.ba();
  var a = get_element_by_id(this.container_id);
  this.$a = get_element_by_id(this.no_items_id);
  if (!this.$a) {
    this.$a = create_element("div", a, this.no_items_id, null);
    this.$a.style.marginTop = "15px";
    var a = create_element("div", this.$a, null, "sectionTitle"),
      b = create_element("div", this.$a, null, null);
    this.Xf = create_element("div", this.$a, null, null);
    a.innerHTML = "PURCHASABLE SHOP ITEMS";
    b.innerHTML = "There are currently no purchasable items in the shop.";
  }
  O(this.table);
  P(this.$a);
  this.Ma = !1;
  this.Ja.length = 0;
  Q(this.container_id);
  this.h = !1;
  this.vb = this.nc = this.mc = -1;
};
Nc.prototype.g = function () {
  var a = lc();
  this.h !== a && ((this.h = a) ? R(this.container_id) : Q(this.container_id));
  if (a && 0 !== A.a.c.length) {
    var b = A.a.Y.items,
      a = A.a.Y.vb;
    if (this.vb !== a) {
      this.vb = a;
      N(this.table, !0);
      for (a = this.Ja.length = 0; a < b.length; a++) {
        var c = b[a],
          d = A.a.R[c.H].Aa[c.w];
        (!d || c.j > d.j) && this.Ja.push(new Pc(this, a, b[a]));
      }
      0 === this.Ja.length && (O(this.table), P(this.$a), (this.Ma = !1));
    }
    a = 0;
    for (b = !1; a < this.Ja.length; ) {
      c = this.Ja[a];
      if ((d = A.a.R[c.item.H])) {
        var f = d.Aa[c.item.w],
          d = f ? f.j : 0,
          g = A.a.M.ya >= c.item.ca,
          h = !f || c.item.j > d;
        if (f !== c.item && h) {
          f = 0;
          if (g && !c.Fc) {
            b: {
              for (
                var g = c.$b,
                  h = c,
                  l = h.ua,
                  k = void 0,
                  s = void 0,
                  f = void 0,
                  k = 0;
                k < g.Ja.length;
                k++
              )
                if (((s = g.Ja[k]), s !== h && (f = s.X) && l < s.ua)) {
                  g = g.table.insertRow(f.rowIndex);
                  (h.X = g) && h.Pa(g);
                  break b;
                }
              f = h;
              g = g.table.insertRow(g.table.rows.length);
              (f.X = g) && f.Pa(g);
            }
            c.Fc = !0;
            c.wc(c.item, !0);
            f = 1;
          } else if (!g && c.Fc) {
            g = c;
            if ((f = g.X)) c.$b.table.deleteRow(f.rowIndex), (g.X = null);
            c.Fc = !1;
            f = 1;
          }
          c.Fc &&
            ((d = c.item.j - d),
            c.Ra !== d &&
              ((c.I.innerHTML = w(d)),
              (c.I.className = W(0 != (c.X.rowIndex - 1) % 2, 0 < d)),
              (c.Ra = d)));
          c = f;
        } else (c.Fc = !1), Qc(c.$b, c), (c = -1);
      } else c = 0;
      -1 !== c && a++;
      0 !== c && (b = !0);
    }
    if (b)
      for (a = 0; a < this.Ja.length; a++)
        (b = this.Ja[a]),
          b.X &&
            ((c = 0 != (b.X.rowIndex - 1) % 2),
            (b.D.className = c ? "firstColAlt" : "firstCol"),
            c
              ? ((b.ib.className = "alt"),
                (b.Ac.className = "alt"),
                (b.m.className = "alt"))
              : ((b.ib.className = ""),
                (b.Ac.className = ""),
                (b.m.className = "")),
            (b.u.className = set_item_class_text(c, b.item.Ha())),
            (b.l.className = W(c, !0)),
            (b.I.className = W(c, !0)));
    this.table || this.ba();
    a = this.table.rows && 1 < this.table.rows.length;
    if (this.Ma != a)
      if ((this.Ma = a)) {
        if ((a = this.table)) a.style.display = "table";
        O(this.$a);
      } else O(this.table), P(this.$a);
    a = A.a.Y.Zd;
    b = A.a.Y.$d;
    if (a != this.mc || b != this.nc)
      (this.mc = a),
        (this.nc = b),
        (a =
          1 === a
            ? "Shop items restocked in " + a + " minute and " + b + " seconds"
            : 0 < a
            ? "Shop items restocked in " + a + " minutes and " + b + " seconds"
            : "Shop items restocked in " + b + " seconds"),
        this.Ma ? (this.caption.innerHTML = a) : (this.Xf.innerHTML = a);
  }
};
Nc.prototype.ba = function () {
  var a = get_element_by_id(this.container_id);
  (this.table = get_element_by_id(this.table_id))
    ? N(this.table, !1)
    : (this.table = buy_column_header("table", a, this.table_id, "cleanTable"));
  this.caption = get_element_by_id(this.table_caption_id);
  this.caption || (this.caption = buy_column_header("caption", this.table, this.table_caption_id, null));
  var b = this.table.insertRow(0),
    a = create_table_header(b, "noBackground"),
    buy_column_header = create_table_header(b, null),
    character_header_column = create_table_header(b, null),
    quality_header_column = create_table_header(b, null),
    level_header_column = create_table_header(b, null),
    cps_column_header = create_table_header(b, null),
    cps_diff_column_header = create_table_header(b, null);
  a.style.width = "250px";
  buy_column_header.style.width = "50px";
  character_header_column.style.width = "60px";
  quality_header_column.style.width = "60px";
  level_header_column.style.width = "30px";
  cps_column_header.style.width = "30px";
  cps_diff_column_header.style.width = "40px";
  this.oe(a);
  buy_column_header.innerHTML = "BUY";
  character_header_column.innerHTML = "CHARACTER";
  quality_header_column.innerHTML = "QUALITY";
  level_header_column.innerHTML = "LVL";
  cps_column_header.innerHTML = "CPS";
  cps_diff_column_header.innerHTML = "\u0394CPS";
};
Nc.prototype.oe = function (a) {
  var b = c("table", a, null, null),
    c = b.insertRow(0),
    d = c.insertCell(0),
    c = c.insertCell(1);
  a.style.padding = 0;
  b.style.width = "100%";
  d.innerHTML = "PURCHASABLE ITEMS";
  d.className = "clearCell";
  d.style.verticalAlign = "bottom";
  d.style.textAlign = "left";
  c.className = "clearCell";
  c.style.verticalAlign = "bottom";
  c.style.textAlign = "right";
  a = c("a", c, null, "buyButton");
  a.href = "#";
  a.title =
    "Buys as many items as possible, ordered by best value (\u0394CPS / price).";
  a.style.minWidth = "85px";
  a.style.fontWeight = "normal";
  a.innerHTML = "Buy All";
  a.onclick = function () {
    Hc(A.a.Y.items);
    return !1;
  };
};
function Qc(a, b) {
  var c = b.X;
  c && a.table.deleteRow(c.rowIndex);
  a.Ja.splice(a.Ja.indexOf(b), 1);
  0 === a.Ja.length && (O(a.table), P(a.$a), (a.Ma = !1));
}
function Rc() {
  this.ye = this.Vb = -1;
  this.ge = !1;
  this.If = new Ac();
  this.Hf = new Bc();
}
Rc.prototype.f = function () {
  this.ye = this.Vb = -1;
  this.ge = !1;
  this.Hf.f();
  this.If.f();
};
Rc.prototype.g = function () {
  var a = A.a.M.Vb,
    b;
  b = A.a.Eb.Ee;
  var c = A.a.Eb.fc,
    d = null !== c;
  d !== this.ge &&
    ((this.ge = d),
    c
      ? (Q("encounter_name"),
        c.Ve
          ? (R("boss_job_title_storyline"), Q("boss_job_title_non_storyline"))
          : (Q("boss_job_title_storyline"), R("boss_job_title_non_storyline")),
        R("boss_encounter_name"))
      : (R("encounter_name"),
        Q("boss_job_title_storyline"),
        Q("boss_job_title_non_storyline"),
        Q("boss_encounter_name")));
  this.Vb != a &&
    (c
      ? (c.Ve
          ? S("boss_job_title_storyline", "STORYLINE BOSS: " + c.rc())
          : S("boss_job_title_non_storyline", "RANDOM BOSS"),
        S("boss_encounter_name", A.a.Eb.Ce))
      : S("encounter_name", A.a.Eb.Ce),
    (this.Vb = a));
  this.ye != b &&
    ((get_element_by_id("encounter_progress").style.width = b + "%"), (this.ye = b));
  this.If.g();
  this.Hf.g();
};
function Sc() {
  this.b = "dungeon_container";
  this.gc = "next_level_button_container";
  this.nd = "dungeon_title_div";
  this.yf = -1;
  this.Od = !1;
}
Sc.prototype.f = function () {
  this.La();
};
Sc.prototype.g = function () {
  var a = A.a.na.level,
    b = A.a.na.Yb;
  this.yf !== a &&
    (S(this.nd, "DUNGEON LEVEL " + a + ": " + A.a.na.lair_name), (this.yf = a));
  this.Od !== b && (b ? R(this.gc) : Q(this.gc), (this.Od = b));
};
Sc.prototype.La = function () {
  var a = get_element_by_id(this.b);
  if (a) {
    M(this.b);
    create_element("div", a, this.nd, "sectionTitle").innerHTML =
      "DUNGEON LEVEL " + A.a.na.level;
    a = create_element("div", a, this.gc, null);
    a.style.textAlign = "center";
    a.style.margin = "0";
    A.a.na.Yb ? (this.Od = !0) : ((this.Od = !1), O(a));
    var b = create_element("div", a, null, null);
    b.style.marginTop = "10px";
    b.innerHTML =
      "Behind the corpse of the boss, you see stairs leading down to a lower level of the dungeon.";
    a = create_element("a", a, null, "dungeonStairsButton");
    a.title = "Dare you descend into the darkness?.";
    a.innerHTML = "DESCEND TO THE NEXT LEVEL";
    a.onclick = function () {
      var a = A.a.na;
      a.level++;
      a.Yb = !1;
      a.lair_name = set_location_name(a.Ae);
      A.a.aa.Uc = get_date();
      send_google_event("Dungeon", "Level: " + A.a.na.level);
      return !1;
    };
  }
};
function Tc() {
  this.b = "boss_lair_container";
  this.gc = "enterBossLairButtonContainer";
  this.he = "bossLairNote";
  this.Na = this.Da = !1;
}
Tc.prototype.f = function () {
  Q(this.b);
  this.Na = this.Da = !1;
  Uc(this);
};
Tc.prototype.g = function () {
  var a = A.a.aa.Da,
    b = A.a.aa.Na;
  this.Da !== a && ((this.Da = a) ? R(this.b) : Q(this.b));
  this.Na !== b &&
    ((this.Na = b) ? (Q(this.gc), R(this.he)) : (R(this.gc), Q(this.he)));
};
function Uc(a) {
  var b = get_element_by_id(a.container_id);
  if (b) {
    M(a.container_id);
    c("div", b, null, "sectionTitle").innerHTML = "BOSS LAIR";
    var c = create_element("div", b, a.gc, null);
    c.style.textAlign = "center";
    c.style.margin = "0";
    var d = c("div", c, null, null);
    d.style.marginTop = "10px";
    d.innerHTML =
      "You have battled through the hordes of minions and arrived at the entrance of a boss lair.";
    c = c("a", c, null, "bossLairButton");
    c.title = "Enter into the depths of carnage and mayhem.";
    c.innerHTML = "ENTER BOSS LAIR";
    c.onclick = function () {
      A.a.aa.Na = !0;
      return !1;
    };
    a = c("div", b, a.he, null);
    a.style.marginTop = "10px";
    a.style.display = "none";
    a.innerHTML =
      "You will enter the boss lair just as soon as you take care of your current encounter.";
  }
}
function Vc() {
  this.b = "end_game_container";
  this.h = !1;
}
Vc.prototype.f = function () {
  M(this.b);
  Q(this.b);
  this.h = !1;
};
Vc.prototype.g = function () {
  var a = A.a.Sa.cc && !A.a.Sa.xc;
  this.h != a &&
    ((this.h = a)
      ? (Wc(this), R("endGameDisabledBackground"), R(this.b))
      : (Q("endGameDisabledBackground"), M(this.b), Q(this.b)));
};
function Wc(a) {
  var b = get_element_by_id(a.container_id);
  if (b) {
    M(a.container_id);
    c("div", b, null, "sectionTitle").innerHTML = "VICTORY!";
    a = c("div", b, null, null);
    a.style.marginTop = "10px";
    a.innerHTML =
      "You have defeated the boss of all bosses, and toppled the organization that has been running the dungeon so efficiently. ";
    a = c("div", b, null, null);
    a.style.marginTop = "10px";
    a.innerHTML =
      "It is only a matter of time before the effects of chaos and disorder put an end to what had been an unending flow of monsters to destroy.";
    a = c("div", b, null, null);
    a.style.marginTop = "10px";
    a.innerHTML =
      "You may 'prestige' your game (restart with a bonus) or continue on through the never ending depths of this dungeon.";
    a = c("div", b, null, null);
    a.style.marginTop = "10px";
    a.appendChild(document.createTextNode("Your prestige rewards will be:"));
    a = c("ul", a, null, null);
    c("li", a, null, null).innerHTML = "Extra item cache slots.";
    c("li", a, null, null).innerHTML = "Quicker character ability cool-downs.";
    c("li", a, null, null).innerHTML =
      "You get to keep some of your artifacts.";
    c("li", a, null, null).innerHTML = "A smallish CPS bonus.";
    c("li", a, null, null).innerHTML =
      "The characters in your party will be honored as champions.";
    a = c("div", b, null, null);
    a.style.marginTop = "10px";
    a.innerHTML =
      "If you continue your adventure, you can prestige later if you change your mind. A new 'prestige' button has been unlocked next to the save/reset buttons.";
    var c = create_element("a", b, null, "prestigeButton"),
      d = c("div", b, null, null);
    c.innerHTML = "PRESTIGE";
    c.onclick = function () {
      c.style.display = "none";
      d.style.display = "block";
      return !1;
    };
    d.style.marginTop = "10px";
    d.style.display = "none";
    a = c("span", d, null, null);
    a.innerHTML =
      "Are you positive? Prestige will end the game and start you over with a brand new party. You will be finding 'Garbage' items again.";
    a.style.fontWeight = "bold";
    a = c("a", d, null, "prestigeButton");
    a.innerHTML = "PRESTIGE!";
    a.onclick = function () {
      Xc();
      return !1;
    };
    b = c("a", b, null, "prestigeButton");
    b.innerHTML = "CONTINUE THE ADVENTURE";
    b.onclick = function () {
      A.a.Sa.xc = !0;
      return !1;
    };
  }
}
function Yc() {
  this.b = "treasure_chest_container";
  this.Td = null;
  this.h = !1;
}
Yc.prototype.f = function () {
  this.h = !1;
  this.La();
};
Yc.prototype.g = function () {
  var a = A.a.bc.ic;
  this.h !== a && ((this.h = a) ? R(this.b) : Q(this.b));
};
Yc.prototype.La = function () {
  var a = get_element_by_id(this.b);
  if (a) {
    M(this.b);
    create_element("div", a, null, "sectionTitle").innerHTML = "TREASURE CHEST FOUND!";
    var b = create_element("div", a, null, null);
    b.style.textAlign = "center";
    b.style.margin = "0";
    this.Td = create_element("a", b, null, "openTreasureChestButton");
    this.Td.title = "This will probably contain things that you want.";
    this.Td.innerHTML = "OPEN TREASURE CHEST";
    this.Td.onclick = function () {
      var a = Zc + randomize($c - Zc),
        b,
        f = D() + ad,
        g;
      for (g = 0; g < a; g++)
        (b = A.a.c[randomize(A.a.c.length)]), (b = Ya(b, bd, f)), Ia(b);
      a = A.a.bc;
      a.ic = !1;
      a.Dc = get_date();
      send_google_event("Treasure Chest", "Opened");
      return !1;
    };
    O(a);
  }
};
function cd() {
  this.container_id = "quest_container";
  this.PrestigeScreen = this.Z = null;
  this.h = !1;
}
cd.prototype.f = function () {
  this.La();
  this.h = !1;
  Q(this.b);
};
cd.prototype.g = function () {
  var a = pb(),
    b = null !== a;
  this.h !== b &&
    ((this.h = b),
    a
      ? ((this.Z.innerHTML =
          "You come across an old man who pleads with you to kill <strong>" +
          a.Oc +
          " " +
          a.Wa +
          "</strong> because they are such a scourge to what is, for the most part, a fairly nice dungeon.  He promises to give you something nice if you do what bosses asks."),
        R(this.b))
      : Q(this.b));
};
cd.prototype.La = function () {
  var a = get_element_by_id(this.b);
  a &&
    (M(this.b),
    (create_element("div", a, null, "sectionTitle").innerHTML = "QUEST AVAILABLE"),
    (this.Z = create_element("div", a, null, null)),
    (this.Z.style.marginTop = "10px"),
    (this.Z.innerHTML = ""),
    (a = create_element("div", a, null, null)),
    (a.style.textAlign = "center"),
    (a.style.margin = "0"),
    (this.rd = create_element("a", a, null, "acceptQuestButton")),
    (this.rd.title = "Accept the quest. Do it."),
    (this.rd.innerHTML = "Accept Quest"),
    (this.rd.onclick = function () {
      A.Fe.ce();
      return !1;
    }));
};
function dd() {
  this.container_id = "active_quests_container";
  this.h = !1;
  this.Qe = this.Oa = -1;
  this.ad = [];
  this.Rd = [];
}
dd.prototype.f = function () {
  this.h = !1;
  this.Qe = this.Oa = -1;
  this.ad.length = 0;
  this.Rd.length = 0;
  M(this.b);
};
dd.prototype.g = function () {
  var a = A.a.S.Oa,
    b = qb().length;
  if (this.Oa !== a || this.Qe !== b) {
    this.Oa = a;
    this.Qe = b;
    var a = qb(),
      b = 0,
      c;
    for (c = 0; c < a.length; c++) a[c].wb || b++;
    if (0 === b) (this.h = !1), M(this.b);
    else {
      if ((a = get_element_by_id(this.b))) {
        this.Rd.length = 0;
        this.ad.length = 0;
        M(this.b);
        a = c("table", a, null, "cleanTable");
        c = a.insertRow(0);
        b = create_table_header(c, "firstColumn");
        c = create_table_header(c, null);
        b.innerHTML = "ACTIVE QUEST";
        c.innerHTML = "KILLS";
        for (var d, f, g = 1, h = qb(), b = 0; b < h.length; b++)
          (c = h[b]),
            c.wb ||
              ((d = a.insertRow(g)),
              g++,
              (f = d.insertCell(0)),
              (f.innerHTML = "Kill " + c.Oc + " " + c.Wa),
              (d = d.insertCell(1)),
              (d.innerHTML = c.Xb),
              this.Rd.push(d),
              this.ad.push(c.Xb),
              0 == g % 2
                ? (f.className = "firstCol")
                : ((f.className = "firstColAlt"), (d.className = "alt")));
      }
      this.h || ((this.h = !0), R(this.b));
    }
  } else
    for (a = qb(), g = b = 0; g < a.length; g++)
      a[g].wb ||
        ((c = a[g].Xb),
        (f = this.ad[b]),
        f !== c && ((this.ad[b] = c), (this.Rd[b].innerHTML = "" + c)),
        b++);
};
function ed() {
  this.container_id = "completed_quests_container";
  this.h = !1;
  this.Oa = -1;
}
ed.prototype.f = function () {
  this.h = !1;
  this.Oa = -1;
  M(this.b);
};
ed.prototype.g = function () {
  var a = A.a.S.Oa;
  if (this.Oa !== a)
    if (((this.Oa = a), 0 === a)) (this.h = !1), M(this.b);
    else {
      if ((a = get_element_by_id(this.b))) {
        M(this.b);
        var a = c("table", a, null, "cleanTable"),
          b = a.insertRow(0);
        create_table_header(b, "firstColumn").innerHTML = "COMPLETED QUESTS";
        for (var c = 1, d, f, g = qb(), b = 0; b < g.length; b++)
          (d = g[b]),
            d.wb &&
              ((f = a.insertRow(c)),
              c++,
              (f = f.insertCell(0)),
              (f.innerHTML = "Kill " + d.Oc + " " + d.Wa),
              (f.className = 0 == c % 2 ? "firstCol" : "firstColAlt"));
      }
      this.h || ((this.h = !0), R(this.b));
    }
};
function fd() {
  this.container_id = "questsTabContainer";
  this.tab_id = "questsTab";
  this.v = !1;
  this.vf = new ed();
  this.$e = new dd();
}
fd.prototype.f = function () {
  this.v = !1;
  Q(this.U);
  Q(this.b);
  this.vf.f();
  this.$e.f();
};
fd.prototype.g = function () {
  0 === qb().length
    ? this.v && ((this.v = !1), Q(this.U))
    : this.v || ((this.v = !0), R(this.U));
  this.v && (this.vf.g(), this.$e.g());
};
function gd() {
  this.container_id = "quest_complete_container";
  this.be = 0;
}
gd.prototype.f = function () {
  M(this.b);
  this.be = 0;
  this.h = !1;
  Q(this.b);
};
gd.prototype.g = function () {
  var a = A.a.S.yb;
  this.be != a.length &&
    ((this.be = a.length), 0 === this.be ? Q(this.b) : (this.La(), R(this.b)));
};
gd.prototype.La = function () {
  var a = get_element_by_id(this.b);
  if (a) {
    M(this.b);
    var b,
      c = A.a.S.yb;
    c("div", a, null, "sectionTitle").innerHTML =
      1 === c.length ? "QUEST COMPLETED" : "QUESTS COMPLETED";
    for (b = 0; b < c.length; b++) hd(a, c[b]);
  }
};
function hd(a, b) {
  var c = c("div", a, null, null),
    c = c("div", c, null, null),
    d = c("div", a, null, null);
  c.style.marginTop = "10px";
  c.innerHTML =
    "You have completed a quest! You have killed the <strong>" +
    b.Oc +
    " " +
    b.Wa +
    "</strong> that the old man requested! Well done.";
  d.style.textAlign = "center";
  d.style.margin = "0";
  c = c("a", d, null, "collectRewardButton");
  c.title = "Collect the reward.";
  c.innerHTML = "Collect Reward";
  c.onclick = function () {
    A.Fe.Me(b);
    return !1;
  };
}
function id() {
  this.container_id = "artifact_container";
  this.md = null;
  this.h = !1;
}
id.prototype.f = function () {
  this.La();
  this.h = !1;
  Q(this.b);
};
id.prototype.g = function () {
  var a = A.a.qa.mb,
    b = null !== a;
  this.h !== b &&
    ((this.h = b),
    a ? ((this.md.innerHTML = "Take " + a.ee), R(this.b)) : Q(this.b));
};
id.prototype.La = function () {
  var a = get_element_by_id(this.b);
  if (a) {
    M(this.b);
    create_element("div", a, null, "sectionTitle").innerHTML = "ARTIFACT FOUND";
    var b = create_element("div", a, null, null);
    b.style.marginTop = "10px";
    b.innerHTML = "You have found a powerful artifact from the distant past.";
    a = create_element("div", a, null, null);
    a.style.textAlign = "center";
    a.style.margin = "0";
    this.md = create_element("a", a, null, "takeArtifactButton");
    this.md.title = "Take ancient artifact.";
    this.md.innerHTML = "Take artifact";
    this.md.onclick = function () {
      A.Fe.We();
      return !1;
    };
  }
};
function jd() {
  this.container_id = "artifact_effects_container";
  this.h = !1;
  this.ec = -1;
}
jd.prototype.f = function () {
  this.h = !1;
  this.ec = -1;
  M(this.b);
};
jd.prototype.g = function () {
  var a = ia().length;
  if (this.ec !== a)
    if (((this.ec = a), 0 === a)) (this.h = !1), M(this.b);
    else {
      if ((a = get_element_by_id(this.b))) {
        M(this.b);
        var a = c("table", a, null, "cleanTable"),
          b = a.insertRow(0),
          c = create_table_header(b, "firstColumn"),
          b = create_table_header(b, null);
        c.innerHTML = "SUMMARIZED ARTIFACT EFFECTS";
        b.innerHTML = "BONUS";
        for (var b = 1, d, f, g, c = 0; c < C.length; c++)
          if (((d = C[c]), d.e !== d.oa)) {
            f = a.insertRow(b);
            b++;
            g = f.insertCell(0);
            f = f.insertCell(1);
            g.innerHTML = d.description;
            var h = d.e,
              l = d.oa;
            f.innerHTML = d.Ka
              ? 0 < d.ta
                ? w(100 * Math.abs(h - l)) + "%"
                : w(Math.ceil(100 * Math.abs(l - h))) + "%"
              : w(h);
            0 == b % 2
              ? (g.className = "firstCol")
              : ((g.className = "firstColAlt"), (f.className = "alt"));
          }
      }
      this.h || ((this.h = !0), R(this.b));
    }
};
function kd() {
  this.container_id = "artifact_collection_container";
  this.table = null;
  this.ec = -1;
}
kd.prototype.f = function () {
  this.h = !1;
  this.ec = -1;
  M(this.b);
};
kd.prototype.g = function () {
  var a = ia().length;
  this.ec !== a &&
    ((this.ec = a),
    0 === a
      ? ((this.h = !1), M(this.b))
      : (this.hd(), this.h || ((this.h = !0), R(this.b))));
};
kd.prototype.hd = function () {
  var a = get_element_by_id(this.b);
  if (a) {
    M(this.b);
    var a = c("table", a, null, "cleanTable"),
      b = a.insertRow(0),
      c = create_table_header(b, "firstColumn"),
      b = create_table_header(b, null);
    c.innerHTML = "ARTIFACTS";
    b.innerHTML = "EFFECT";
    for (var d, f, g = ia(), c = 0; c < g.length; c++)
      (b = g[c]),
        (d = a.insertRow(c + 1)),
        (f = d.insertCell(0)),
        (f.innerHTML = b.ee),
        (d = d.insertCell(1)),
        (d.innerHTML = C[b.fe].description),
        0 == c % 2
          ? (f.className = "firstCol")
          : ((f.className = "firstColAlt"), (d.className = "alt"));
  }
};
function ld() {
  this.container_id = "artifactsTabContainer";
  this.tab_id = "artifactsTab";
  this.v = !1;
  this.df = new jd();
  this.cf = new kd();
}
ld.prototype.f = function () {
  this.v = !1;
  Q(this.U);
  Q(this.b);
  this.df.f();
  this.cf.f();
};
ld.prototype.g = function () {
  0 === ia().length
    ? this.v && ((this.v = !1), Q(this.U))
    : this.v || ((this.v = !0), R(this.U));
  this.v && (this.df.g(), this.cf.g());
};
function md() {
  this.container_id = "machine_part_container";
  this.Z = null;
  this.nd = "machine_part_title";
  this.Ya = this.Za = this.fa = this.Ob = this.Kb = this.xb = null;
  this.vd = this.xd = this.Vd = this.h = !1;
}
md.prototype.f = function () {
  this.vd = this.Vd = this.xd = this.h = !1;
  this.La();
};
md.prototype.g = function () {
  var a = Ab(A.a.K),
    b = null !== a,
    c = zb(),
    d = H(),
    f = yb() && !c,
    g = !d && (b || f || c);
  this.h !== g &&
    ((this.h = g)
      ? (R(this.b), P(this.xb), P(this.Z))
      : ((this.vd = this.Vd = this.xd = !1),
        O(this.xb),
        O(this.Z),
        d ? M(this.b) : (O(this.Kb), O(this.Ob), O(this.fa)),
        Q(this.b)));
  g &&
    (this.Vd !== b &&
      ((this.Vd = b)
        ? ((this.xb.innerHTML = "MACHINE PART FOUND"),
          (b = A.a.K),
          (this.Z.innerHTML = 0 > b.Ta ? null : robot_parts[b.Ta].description),
          (this.Kb.innerHTML = "TAKE " + a),
          P(this.Kb))
        : O(this.Kb)),
    f != this.xd &&
      ((this.xd = f)
        ? ((this.xb.innerHTML = "ENGINEER ENCOUNTERED"),
          (this.Z.innerHTML =
            "You encounter an engineer. For some reason, you do not immediately kill him (like you typically do).  He notices the mechanical parts sticking out of your pack and mentions that bosses could probably assemble them into something."),
          P(this.Ob))
        : O(this.Ob)),
    c &&
      !this.vd &&
      ((this.vd = c)
        ? ((this.xb.innerHTML = "ROBOT CREATED"),
          (this.Z.innerHTML =
            "You feel slightly embarrassed to observe the engineer snap the parts together with ease. Soon, a robot stands where there was once a pile of mechanical junk. Unfortunately for the engineer, the first order of business for the robot is to chop up its creator into little pieces. Reflecting on this, you conclude that its prime directive must be the death of all living creatures.  You welcome it into your party."),
          P(this.Za),
          P(this.fa))
        : (O(this.Za), O(this.fa))));
};
md.prototype.La = function () {
  var a = get_element_by_id(this.b);
  if (a) {
    M(this.b);
    this.xb = get_element_by_id(this.nd);
    this.xb || (this.xb = create_element("div", a, this.nd, "sectionTitle"));
    this.xb.innerHTML = "";
    this.xb.style.display = "none";
    this.Z = create_element("div", a, null, null);
    this.Z.style.marginTop = "10px";
    this.Z.innerHTML = "";
    this.Z.style.display = "none";
    this.Kb = create_element("a", a, null, "takeMachinePartButton");
    this.Kb.title = "Pick up the machine part.";
    this.Kb.innerHTML = "Take machine part";
    this.Kb.onclick = function () {
      var a = A.a.K,
        b = Ab(a);
      b && (a.sb.push(b), (a.Ta = -1), (a.Zb = get_date()));
      return !1;
    };
    this.Ob = create_element("a", a, null, "takeMachinePartButton");
    this.Ob.title = "Assemble Mechanical Parts";
    this.Ob.innerHTML = "Assemble Mechanical Parts";
    this.Ob.onclick = function () {
      A.a.K.Pc = !0;
      return !1;
    };
    this.Za = create_element("div", a, null, null);
    this.Za.style.marginTop = "5px";
    this.Za.style.marginLeft = "auto";
    this.Za.style.marginRight = "auto";
    this.Za.style.border = "1px solid #444";
    this.Za.style.padding = "5px";
    this.Za.style.width = "450px";
    this.Za.appendChild(document.createTextNode("Name Your Robot: "));
    this.Ya = create_element("input", this.Za, null, null);
    this.Ya.type = "text";
    this.Ya.size = 25;
    this.Ya.value = "SlaughterBot-7";
    var b = this;
    this.fa = create_element("a", a, null, "takeMachinePartButton");
    this.fa.title = "Add Robot To Party";
    this.fa.innerHTML = "Add Robot To Party";
    this.fa.onclick = function () {
      var a = string_replace(b.Ya.value),
        d,
        f = -1;
      for (d = 0; d < A.character_classes.length; d++)
        if (A.character_classes[d].Qc) {
          f = d;
          break;
        }
      d = qc(f);
      d.wa = a;
      A.a.c.push(d);
      A.a.R[d.O] = d;
      ic(d);
      A.dc.f();
      a = A.a.K;
      a.jd = !0;
      a.Hc = !1;
      a.Pc = !1;
      a.Zb = -1;
      a.sb.length = 0;
      a.Ta = -1;
      send_google_event("Robot", "Creation");
      return !1;
    };
    O(this.Kb);
    O(this.Ob);
    O(this.fa);
    O(this.Za);
    O(a);
  }
};
function nd() {
  this.container_id = "machinePartsTabContainer";
  this.tab_id = "machinePartsTab";
  this.table_id = "found_machine_parts_table";
  this.table = null;
  this.Ke = -1;
  this.v = !1;
}
nd.prototype.f = function () {
  this.v = "none" !== get_element_by_id(this.U).style.display;
  var a = get_element_by_id(this.b);
  a &&
    (M(this.b),
    (this.table = get_element_by_id(this.C))
      ? N(this.table, !1)
      : (this.table = create_element("table", a, this.C, "cleanTable")),
    (a = this.table.insertRow(0)),
    (create_table_header(a, "firstColumn").innerHTML = "DISCOVERED MACHINE PARTS"));
  this.Ke = -1;
};
nd.prototype.g = function () {
  var a = A.a.K.sb;
  0 === a.length
    ? this.v && ((this.v = !1), Q(this.U))
    : (this.v || ((this.v = !0), R(this.U)),
      this.Ke !== a.length && (this.hd(), (this.Ke = a.length)));
};
nd.prototype.hd = function () {
  var a,
    b = A.a.K.sb,
    c;
  N(this.table, !0);
  for (a = 0; a < b.length; a++)
    (c = this.table.insertRow(a + 1)),
      (c = c.insertCell(0)),
      (c.innerHTML = b[a]),
      (c.className = 0 == a % 2 ? "firstCol" : "firstColAlt");
};
function Boss_tab() {
  this.container_id = "defeatedBossesTabContainer";
  this.tab_id = "defeatedBossesTab";
  this.table_id = "defeated_boss_table";
  this.table = null;
  this.re = -1;
  this.v = !1;
}
Boss_tab.prototype.f = function () {
  this.v = "none" !== get_element_by_id(this.tab_id).style.display;
  this.ba();
  this.re = -1;
};
Boss_tab.prototype.g = function () {
  var a = A.a.kb.hb;
  0 === a.length
    ? this.v && ((this.v = !1), Q(this.tab_id))
    : (this.v || ((this.v = !0), R(this.tab_id)),
      this.re !== a.length && (this.hd(), (this.re = a.length)));
};
Boss_tab.prototype.hd = function () {
  var a,
    b = A.a.kb.hb,
    c,
    d;
  N(this.table, !0);
  for (a = 0; a < b.length; a++)
    (c = this.table.insertRow(a + 1)),
      (d = c.insertCell(0)),
      (d.innerHTML = b[a].gf),
      (d.className = "firstCol"),
      (c = c.insertCell(1)),
      (c.innerHTML = b[a].rc()),
      0 == a % 2
        ? (d.className = "firstCol")
        : ((d.className = "firstColAlt"), (c.className = "alt"));
};
Boss_tab.prototype.ba = function () {
  var a = get_element_by_id(this.b);
  a &&
    (M(this.b),
    (this.table = get_element_by_id(this.C))
      ? N(this.table, !1)
      : (this.table = create_element("table", a, this.C, "cleanTable")),
    (a = this.table.insertRow(0)),
    (create_table_header(a, "firstColumn").innerHTML = "BOSS"),
    (create_table_header(a, null).innerHTML = "RANK"));
};
function pd() {
  this.Ib = -1;
}
pd.prototype.f = function () {};
pd.prototype.g = function () {
  var a;
  a = A.Lb.Ib;
  this.Ib !== a &&
    0 < a &&
    ((this.Ib = a),
    S(
      "lastSaveDiv",
      "Last Saved at: " + new Date(this.Ib).toLocaleTimeString()
    ));
};
function Prestige_button_container() {
  this.container_id = "prestigeButtonContainer";
  this.Cd = "prestigeConfirmationContainer";
  this.Pe = !1;
}
Prestige_button_container.prototype.f = function () {
  M(this.b);
  Q(this.b);
  this.Pe = !1;
};
Prestige_button_container.prototype.g = function () {
  var a = A.a.Sa.cc;
  this.Pe !== a &&
    ((this.Pe = a)
      ? (PrestigeScreen(this), R(this.b), Q(this.Cd))
      : (M(this.b), M(this.Cd), Q(this.b)));
};
function PrestigeScreen(a) {
  var b = get_element_by_id(a.container_id),
    c = get_element_by_id(a.Cd);
  if (b && c) {
    M(a.container_id);
    M(a.Cd);
    var d = c("a", b, null, "saveButton");
    d.innerHTML = "Prestige";
    d.onclick = function () {
      d.style.display = "none";
      c.style.display = "block";
      return !1;
    };
    a = c("div", c, null, null);
    a.style.marginBottom = "5px";
    a = c("span", a, null, null);
    a.innerHTML =
      "Are you positive? Prestige will end the game and start you over with a brand new party.";
    a.style.fontWeight = "bold";
    a = c("a", c, null, "saveButton");
    a.innerHTML = "Prestige!";
    a.onclick = function () {
      Xc();
      O(d);
      O(c);
      return !1;
    };
    a = c("a", c, null, "saveButton");
    a.innerHTML = "Close";
    a.style.marginLeft = "5px";
    a.onclick = function () {
      P(d);
      O(c);
      return !1;
    };
  }
}
function Prestige_info_container() {
  this.container_id = "prestige_info_container";
}
Prestige_info_container.prototype.f = function () {
  var container = get_element_by_id(this.b);
  if (container && (M(this.b), 0 !== A.a.P.ja)) {
    var table = c("table", container, null, "cleanTable"),
      b = table.insertRow(0),
      c = table.insertRow(1),
      d = table.insertRow(2),
      f = table.insertRow(3),
      g = table.insertRow(4),
      a = table.insertRow(5),
      h = create_table_header(b, "firstColumn"),
      b = create_table_header(b, null);
    h.innerHTML = "PRESTIGE INFO";
    b.innerHTML = "VALUE";
    b = c.insertCell(0);
    c = c.insertCell(1);
    b.innerHTML = "Prestige count";
    b.className = "firstColumn";
    c.innerHTML = A.a.P.ja;
    c = d.insertCell(0);
    d = d.insertCell(1);
    c.innerHTML = "Cache size bonus";
    c.className = "firstColumn";
    d.innerHTML = A.a.P.ja * Ga;
    d = f.insertCell(0);
    f = f.insertCell(1);
    d.innerHTML = "CPS bonus";
    d.className = "firstColumn";
    f.innerHTML = q(100 * (1 + A.a.P.ja * ua) - 100) + "%";
    f = g.insertCell(0);
    g = g.insertCell(1);
    f.innerHTML = "Ability cool down reduction";
    f.className = "firstColumn";
    g.innerHTML = q((A.a.P.ja * Tb) / 1e3) + " seconds";
    g = table.insertCell(0);
    table = table.insertCell(1);
    g.innerHTML = "Maximum number of artifacts kept during prestige";
    g.className = "firstColumn";
    table.innerHTML = q(A.a.P.ja * fa);
  }
};
Prestige_info_container.prototype.g = function () {};
function Champions_table_container() {
  this.container_id = "champions_table_container";
}
Champions_table_container.prototype.f = function () {
  var champ_container_element = get_element_by_id(this.b);
  if (champ_container_element) {
    M(this.b);
    var b = A.a.P.Wc;
    if (b && 0 !== b.length)
      for (let c = 1, d = ud(b, c); 0 !== d.length; ) {
        var f = c("table", champ_container_element, null, "cleanTable"),
          g = f.insertRow(0),
          champion_column = create_table_header(g, "noBackground"),
          class_column = create_table_header(g, null),
          level_column = create_table_header(g, null);
        champion_column.innerHTML = "CHAMPION";
        class_column.innerHTML = "CLASS";
        level_column.innerHTML = "LEVEL";
        for (var s = (level_column = g = void 0), g = 0; g < d.length; g++)
          (s = d[g]),
            (level_column = f.insertRow(g + 1)),
            (champion_column = level_column.insertCell(0)),
            (class_column = level_column.insertCell(1)),
            (level_column = level_column.insertCell(2)),
            0 == g % 2
              ? (champion_column.className = "firstCol")
              : ((champion_column.className = "firstColAlt"),
                (class_column.className = "alt"),
                (level_column.className = "alt")),
            (champion_column.innerHTML = s.kf),
            (class_column.innerHTML = s.hf),
            (level_column.innerHTML = s.jf);
        c++;
        d = ud(b, c);
      }
  }
};
Champions_table_container.prototype.g = function () {};
function ud(a, b) {
  var c,
    d,
    f = [];
  for (c = 0; c < a.length; c++) (d = a[c]), d.Tf === b && f.push(d);
  return f;
}
function vd() {
  this.container_id = "championsTabContainer";
  this.tab_id = "championsTab";
  this.v = !1;
  this.qg = new Prestige_info_container();
  this.gg = new Champions_table_container();
}
vd.prototype.f = function () {
  this.v = "none" !== get_element_by_id(this.U).style.display;
  this.qg.f();
  this.gg.f();
};
vd.prototype.g = function () {
  0 === A.a.P.Wc.length
    ? this.v && ((this.v = !1), Q(this.U))
    : this.v || ((this.v = !0), R(this.U));
};
function wd() {
  this.container_id = "encountered_character_container";
  this.Ya =
    this.je =
    this.Xa =
    this.vc =
    this.pd =
    this.Z =
    this.Jb =
    this.ac =
    this.fa =
      null;
  this.h = !1;
  this.i = this.Sb = -1;
}
wd.prototype.f = function () {
  this.h = !1;
  this.i = -1;
  this.La();
};
wd.prototype.g = function () {
  var a;
  a = -1 < A.a.t.i;
  var b, c;
  this.h !== a
    ? (this.h = a)
      ? ((this.i = A.a.t.i),
        (a = A.character_classes[this.i].className),
        (b = A.character_classes[this.i].description),
        (c = Math.max(0, A.a.t.va.length - 1)),
        (this.Sb = xd - A.a.t.eb),
        (this.je.innerHTML = "the " + a),
        (this.Z.innerHTML =
          "You encounter a friendly <strong>" +
          a +
          "</strong> who wishes to join your party."),
        (this.pd.innerHTML = "Ability: " + b),
        0 < this.Sb
          ? ((this.fa.style.display = "inline-block"),
            (this.ac.style.display = "inline-block"),
            (this.Jb.style.display = "none"),
            (this.vc.innerHTML =
              "Your party has room for " +
              this.Sb +
              " more members, and there are " +
              c +
              " more characters to encounter after the " +
              a))
          : ((this.fa.style.display = "none"),
            (this.ac.style.display = "none"),
            (this.Jb.style.display = "inline-block"),
            (this.vc.innerHTML =
              "Your party is full. You can only add this character to your party by first removing somebody in the 'MGMT' (Party Management) tab.")),
        (this.Ya.value = A.character_classes[this.i].Name),
        R(this.b))
      : Q(this.b)
    : this.h &&
      ((b = xd - A.a.t.eb),
      this.Sb !== b &&
        (0 === this.Sb && 0 < b
          ? ((this.fa.style.display = "inline-block"),
            (this.ac.style.display = "inline-block"),
            (this.Jb.style.display = "none"),
            (this.i = A.a.t.i),
            (a = A.character_classes[this.i].className),
            (c = Math.max(0, A.a.t.va.length - 1)),
            (this.vc.innerHTML =
              "Your party has room for " +
              this.Sb +
              " more members, and there are " +
              c +
              " more characters to encounter after the " +
              a))
          : 0 === b &&
            0 < this.Sb &&
            ((this.fa.style.display = "none"),
            (this.ac.style.display = "none"),
            (this.Jb.style.display = "inline-block"),
            (this.vc.innerHTML =
              "Your party is full. You can only add this character to your party by first removing somebody in the 'MGMT' (Party Management) tab.")),
        (this.Sb = b)));
};
wd.prototype.La = function () {
  var a = get_element_by_id(this.b);
  if (a) {
    M(this.b);
    c("div", a, null, "sectionTitle").innerHTML = "ADVENTURER FOUND!";
    this.Z = c("div", a, null, null);
    this.Z.style.marginTop = "10px";
    this.Z.innerHTML = "";
    this.Xa = c("div", a, null, null);
    this.Xa.style.marginTop = "5px";
    this.Xa.style.marginLeft = "auto";
    this.Xa.style.marginRight = "auto";
    this.Xa.style.border = "1px solid #444";
    this.Xa.style.padding = "5px";
    this.Xa.style.width = "450px";
    this.Xa.appendChild(document.createTextNode("Name: "));
    this.Ya = c("input", this.Xa, null, null);
    this.Ya.type = "text";
    this.Ya.size = 25;
    this.Ya.value = "";
    this.je = c("span", this.Xa, null, null);
    this.je.style.marginLeft = "5px";
    this.pd = c("div", this.Xa, null, null);
    this.pd.style.marginTop = "5px";
    this.pd.innerHTML = "";
    this.vc = c("div", this.Xa, null, null);
    this.vc.style.marginTop = "5px";
    this.vc.innerHTML = "";
    var b = c("div", a, null, null);
    b.style.textAlign = "center";
    b.style.margin = "0";
    var c = this;
    this.fa = c("a", b, null, "addToPartyButton");
    this.fa.title = "This individual could be useful.";
    this.fa.innerHTML = "WELCOME TO THE PARTY!";
    this.fa.onclick = function () {
      A.character_classes[c.i].Name = string_replace(c.Ya.value);
      yd(c.i);
      c.i = -1;
      return !1;
    };
    this.ac = c("a", b, null, "rejectCharacterButton");
    this.ac.title = "Thanks, but no thanks.";
    this.ac.innerHTML = "NO THANKS, MOVE ALONG.";
    this.ac.onclick = function () {
      zd(c.i);
      c.i = -1;
      return !1;
    };
    this.Jb = c("a", b, null, "rejectCharacterButton");
    this.Jb.title = "Thanks, but no thanks.";
    this.Jb.innerHTML = "SORRY, MAYBE NEXT TIME";
    this.Jb.style.display = "none";
    this.Jb.onclick = function () {
      zd(c.i);
      c.i = -1;
      return !1;
    };
    O(a);
  }
};
function Ad() {
  this.b = "party_management_container";
  this.U = "partyManagementTab";
  this.Ne = "party_management_view_members";
  this.Xe = "party_management_view_unlocked";
  this.zc = [];
  this.xe = this.Ye = 0;
  this.Oe = !1;
}
Ad.prototype.f = function () {
  this.xe = this.Ye = 0;
  this.Oe = !1;
  M(this.b);
};
Ad.prototype.g = function () {
  if (this.xe !== A.a.c.length) {
    this.xe = A.a.c.length;
    var a = get_element_by_id(this.b);
    if (a) {
      var b = get_element_by_id(this.Ne);
      b ? M(this.Ne) : (b = c("div", a, this.Ne, "sectionDiv"));
      c("div", b, null, "sectionTitle").innerHTML = "PARTY MEMBERS";
      for (a = 0; a < A.a.c.length; a++) Bd(b, A.a.c[a], a);
    }
  }
  b = A.a.t.ab.length;
  H() && b++;
  if (this.Ye !== b && ((this.Ye = b), (this.zc.length = 0), (a = get_element_by_id(this.b)))) {
    (b = get_element_by_id(this.Xe)) ? M(this.Xe) : (b = c("div", a, this.Xe, "sectionDiv"));
    c("div", b, null, "sectionTitle").innerHTML = "UNLOCKED CHARACTERS";
    var a = A.a.t.ab,
      c,
      d;
    a: {
      for (c = 0; c < A.character_classes.length; c++)
        if (A.character_classes[c].Qc) {
          d = c;
          break a;
        }
      d = -1;
    }
    var f;
    for (f = 0; f < a.length; f++)
      (c = a[f]), this.Nd(c) || c === d || Cd(this, b, c);
    H() && (this.Nd(d) || Cd(this, b, d));
  }
  b = 1 > (H() ? Dd : Ed) - A.a.c.length;
  if (this.Oe !== b)
    if ((this.Oe = b))
      for (b = 0; b < this.zc.length; b++) this.zc[b].style.display = "none";
    else
      for (b = 0; b < this.zc.length; b++)
        this.zc[b].style.display = "inline-block";
};
function Bd(a, b, c) {
  var d = b.i,
    f = b.wa,
    g = b.O;
  a = c("div", a, null, null);
  a.style.marginTop = "5px";
  a.style.marginLeft = "auto";
  a.style.marginRight = "auto";
  a.style.border = "1px solid #444";
  a.style.padding = "5px";
  a.style.width = "450px";
  a.appendChild(document.createTextNode("Name: "));
  var h = c("input", a, null, null);
  h.type = "text";
  h.size = 25;
  h.value = f;
  h.onkeyup = function () {
    A.character_classes[d].Name = string_replace(h.value);
    b.wa = h.value;
  };
  h.onchange = function () {
    A.character_classes[d].Name = string_replace(h.value);
    b.wa = h.value;
  };
  f = c("span", a, null, null);
  f.innerHTML = "the " + g;
  f.style.marginLeft = "5px";
  g = c("div", a, null, null);
  g.style.marginTop = "5px";
  g.innerHTML = A.character_classes[d].description;
  0 === c
    ? ((c = c("div", a, null, null)),
      (c.style.marginTop = "5px"),
      (c.innerHTML = "The primary character cannot be removed."))
    : ((c = c("div", a, null, null)),
      (c.style.textAlign = "center"),
      (c.style.margin = "0"),
      (c = c("a", c, null, "removeCharacterButton")),
      (c.title = "Get out of my party."),
      (c.innerHTML = "REMOVE FROM PARTY"),
      (c.onclick = function () {
        var a = A.a.c.indexOf(b);
        -1 !== a &&
          (xa(A.a.nb, b),
          xa(A.a.Va, b),
          xa(A.a.Y, b),
          A.a.c.splice(a, 1),
          delete A.a.R[b.O],
          A.jb.gd(b),
          A.a.M.gd(),
          A.a.t.gd(),
          A.dc.f(),
          send_google_event("Character", "Removed: " + b.O));
        return !1;
      }));
}
function Cd(a, b, c) {
  var d = A.character_classes[c].Name,
    f = A.character_classes[c].className;
  b = c("div", b, null, null);
  b.style.marginTop = "5px";
  b.style.marginLeft = "auto";
  b.style.marginRight = "auto";
  b.style.border = "1px solid #444";
  b.style.padding = "5px";
  b.style.width = "450px";
  b.appendChild(document.createTextNode("Name: "));
  var g = c("input", b, null, null);
  g.type = "text";
  g.size = 25;
  g.value = d;
  g.onkeyup = function () {
    A.character_classes[c].Name = string_replace(g.value);
  };
  g.onchange = function () {
    A.character_classes[c].Name = string_replace(g.value);
  };
  d = c("span", b, null, null);
  d.innerHTML = "the " + f;
  d.style.marginLeft = "5px";
  f = c("div", b, null, null);
  f.style.marginTop = "5px";
  f.innerHTML = A.character_classes[c].description;
  f = c("div", b, null, null);
  f.style.textAlign = "center";
  f.style.margin = "0";
  f = c("a", f, null, "addCharacterButton");
  f.title = "This individual could be useful.";
  f.innerHTML = "ADD TO PARTY";
  f.onclick = function () {
    A.character_classes[c].Name = string_replace(g.value);
    yd(c);
    return !1;
  };
  1 > xd - A.a.t.eb && (f.style.display = "none");
  a.zc.push(f);
}
Ad.prototype.Nd = function (a) {
  var b;
  for (b = 0; b < A.a.c.length; b++) if (A.a.c[b].i === a) return !0;
  return !1;
};
function Fd() {
  this.od = [];
}
function Y(a) {
  A.dc.od.push(a);
}
Fd.prototype.f = function () {
  var a;
  for (a = 0; a < this.od.length; a++) this.od[a].f();
};
function Gd() {
  this.locations =
    "Asylum;Abattoir;Burrow;Basement;Cave;Catacombs;Crypt;Crawlway;Chamber;Cavern;Cavity;Cellar;Den;Furnace;Grotto;Hollow;Hole;Inferno;Labyrinth;Maze;Mine;Mausoleum;Morass;Necropolis;Oubliette;Pit;Polyandrium;Passage;Realm;Sepulcher;Subway;Slaughterhouse;Sub-basement;Subterrane;Substratum;Shambles;Torture chamber;Tunnels;Tomb;Underpass;Underground;Understructure;Vault".split(
      ";"
    );
  this.adjectives =
    "Abhorrent Abominable Accursed Bloody Cursed Damned Decrepit Dark Dingy Derelict Demented Foul Grimy Grim Hellish Hateful Horrible Infested Infernal Lightless Loathsome Mildewed Nauseating Nasty Odious Obnoxious Poisonous Putrid Ruined Rotten Repellent Reeking Revolting Smelly Stinking Sickening Shadowed Wicked".split(
      " "
    );
}
function set_location_name(a) {
  return "The " + a.adjectives[randomize(a.adjectives.length)] + " " + a.locations[randomize(a.locations.length)];
}
function tb() {
  var a = A.Adjectives;
  return a.enemy_nouns[randomize(a.enemy_nouns.length)];
}
function Z(a) {
  return a[randomize(a.length)];
}
function Hd() {
  this.ga =
    "Affordable;Amusing;Amateur;Addled;Bargain;Budget;Bad;Blistered;Busted;Beginners;Blemished;Burdensome;Cardboard;Coarse;Cheap;Cruddy;Crude;Cute;Cracked;Cheesy;Cut-Rate;Childish;Children's;Discount;Dinged;Dinky;Deficient;Decomposed;Discontinued;Dirty;Economical;Entry Level;Feeble;Frugal;Flawed;Fouled;Foolish;Forgettable;Garish ;Gaudy;Grubby;Gangrenous;Humorous;Inferior;Impaired;Imperfect;Kitsch;Lesser;Lousy;Lackluster;Itchy;Ignoble;Inadequate;Inconsequential;Inexpensive;Insufficient;Intolerable;Insignificant;Mediocre;Marred;Minor;Moldy;Markdown;Miserly;Novice;Novelty;Negligible;Origami;Oxidised;Paltry;Petty;Puny;Pitiful;Putrid;Problematic;Paper Mache;Plastic;Pedestrian;Putrefied;Putrid;Rusty;Ruined;Run Down;Rough;Runty;Rank;Rotted;Ruined;Ratty;Repulsive;Splintered;Sinners;Scabby;Speckled;Spoiled;Screwed Up;Scummy;Second Class;Second Rate;Shoddy;Sordid;Squalid;Sorry;Sham;Sour;Stained;Styrofoam;Tacky;Taxing;Tattered;Thrifty;Third Party;Tarnished;Trivial;Trifling;Toy;Unwieldy;Unbearable;Unattractive;Unimportant;Used;Unprofessional;Unfit;Unsuitable;Unworthy;Useless;Worn;Worn Out;Wooden;Wasted;Withered;Worthless;Wholesale;Weak".split(
      ";"
    );
  this.Ba =
    "Agitation;Annoyance;Bother;Awkwardness;Confusion;Discomfort;Difficulty;Dearth;Destitution;Distress;Embarrassment;Feebleness;Heaviness;Heartache;Humiliation;Inconvenience;Irritation;Lethargy;Loss;Low CPS;Low Value;Mediocrity;Nuisance;Pity;Poor Quality;Repulsiveness;Slowness;Scarcity;Shortage;Simplicity;Ruin;Sorrow;Splinters;Tedium;Waste;Want".split(
      ";"
    );
  this.ha =
    "Amateur Damned Drunken Mundane Miserable Mediocre Noob Novice Newbie Needy Newcomer Pitiful Sorrowful Uninspired".split(
      " "
    );
}
Hd.prototype.Jc = function () {
  var a = Math.random();
  return 0.1 > a
    ? 0
    : 0.7 > a
    ? 1
    : 0.85 > a
    ? 0.5 > Math.random()
      ? 2
      : 3
    : 0.5 > Math.random()
    ? 4
    : 5;
};
Hd.prototype.Wb = function () {
  return this.ga[randomize(this.ga.length)];
};
Hd.prototype.sc = function () {
  return this.Ba[randomize(this.Ba.length)];
};
Hd.prototype.tc = function () {
  return this.ha[randomize(this.ha.length)];
};
function Id() {
  this.ga =
    "Acceptable;Adequate;Agreeable;Appropriate;All Right;Average;Bearable;Bronze;Basic;Conventional;Common;Copper;Commonplace;Customary;Decent;Diminished;Everyday;Fine;Fair;Good;General;Garden Variety;Intermediate;Imperfect;Iron;Okay;Ordinary;Moderate;Modest;Normal;Nice;Ordinary;Passable;Proper;Pleasant;Plain;Quaint;Respectable;Run of the Mill;Regular;Relevant;Reputable;Requisite;Reasonable;Routine;Satisfactory;Stock;Simple;Standard;Suitable;Seemly;Sufficient;Standard-Issue;Serviceable;Tolerable;Toned;Typical;Unexceptional;Unremarkable;Useful;Usual;Up-To-Snuff;Vanilla;Worthy".split(
      ";"
    );
  this.Ba =
    "Acceptability Adequacy Decency Familiarity Imperfection Normality Value Regularity Routine Suitability Simplicity Serviceability Usefulness".split(
      " "
    );
  this.ha = ["Average", "Masses", "Ordinary", "People"];
}
Id.prototype.Jc = function () {
  var a = Math.random();
  return 0.3 > a
    ? 1
    : 0.6 > a
    ? 0.5 > Math.random()
      ? 2
      : 3
    : 0.5 > Math.random()
    ? 4
    : 5;
};
Id.prototype.Wb = function () {
  return this.ga[randomize(this.ga.length)];
};
Id.prototype.sc = function () {
  return this.Ba[randomize(this.Ba.length)];
};
Id.prototype.tc = function () {
  return this.ha[randomize(this.ha.length)];
};
function Jd() {
  this.ga =
    "Admirable;Balanced;Chrome;Choice;Commendable;Desirable;Distinctive;Fine;Fancy;Firm;First Class;First Rate;Ferocious;Formidable;Good;Gallant;Hard;Heavy;Handsome;Honest;Keen;Name Brand;Marvelous;Polished;Prime;Praiseworthy;Quality;Refined;Remarkable;Royal;Shiny;Steel;Severe;Select;Special;Stout;Swank;Stalwart;Superior;Sharp;Tasteful;Top Notch;Uncommon;Wholesome".split(
      ";"
    );
  this.Ba =
    "Adventure Bravery Courage Confidence Determination Demolition Fear Fright Frost Friendship Foreboding Heaviness Intensity Impartiality Keenness Revenge Persistence Perseverance Peace Predictability Piercing Pain Mirth Mettle Malevolence Stardom Spirit Victory Violence Wounding".split(
      " "
    );
  this.ha =
    "Adventurous Bold Blistered Courageous Daring Doomed Dashing Dauntless Darkness Intoxicated Just Rain Tortured Terrorized Vain Vanquished Willing".split(
      " "
    );
}
Jd.prototype.Jc = function () {
  var a = Math.random();
  return 0.3 > a
    ? 1
    : 0.5 > a
    ? 0.5 > Math.random()
      ? 2
      : 3
    : 0.5 > Math.random()
    ? 4
    : 5;
};
Jd.prototype.Wb = function () {
  return this.ga[randomize(this.ga.length)];
};
Jd.prototype.sc = function () {
  return this.Ba[randomize(this.Ba.length)];
};
Jd.prototype.tc = function () {
  return this.ha[randomize(this.ha.length)];
};
function Kd() {
  this.ga =
    "Awesome;Amazing;Astonishing;Beautiful;Blessed;Classic;Elegant;Exquisite;Extravagant;Extraordinary;Excellent;Faultless;Fierce;Fearsome;Golden;Glorious;High Grade;Highborn;High Class;Lovely;Luxury;Mystical;Noble;Ornate;Precious;Perfect;Premier;Premium;Preeminent;Quintessential;Rare;Singular;Seminal;Striking;Sensational;Supreme;Superlative;Wonderful".split(
      ";"
    );
  this.Ba =
    "Amazement;Dread;Explosions;Ease;Extra Clicks;Extra Damage;Fire;Frost;Flames;Ferocity;Fascination;Fred's Bane;Glory;Glamour;Glitz;Greatness;Happiness;Ice;Joy;Punishment;Purity;Pleasure;Perfection;Terror;Torture;Wonder;Wonderment".split(
      ";"
    );
  this.ha =
    "Deep Dawn Earth Feared Fearless Forgotten Hardy Intrepid Infirm Valiant".split(
      " "
    );
}
Kd.prototype.Jc = function () {
  var a = Math.random();
  return 0.25 > a
    ? 1
    : 0.5 > a
    ? 0.5 > Math.random()
      ? 2
      : 3
    : 0.5 > Math.random()
    ? 4
    : 5;
};
Kd.prototype.Wb = function () {
  return this.ga[randomize(this.ga.length)];
};
Kd.prototype.sc = function () {
  return this.Ba[randomize(this.Ba.length)];
};
Kd.prototype.tc = function () {
  return this.ha[randomize(this.ha.length)];
};
function Ld() {
  this.ga =
    "Anointed Almighty Angelic Celestial Consecrated Deific Ethereal Exalted Forbidden Heavenly Heroic Incomparable Impossible Immaculate Immortal Kingly Laudable Murderous Miraculous Peerless Righteous Sacred Sanctified Translucent Transcendent Unsurpassed Unearthly Unmerciful Ungodly Virtuous Wondrous".split(
      " "
    );
  this.Ba =
    "Awe Armageddon Annihilation Catastrophe Devastation Decimation Faith Freedom Fortune Fantasy Havoc Heaven Immortality Salvation Stardust Vengeance Valor".split(
      " "
    );
  this.ha =
    "Ages;Ancients;Apocalypse;Audacious;Almighty;Blessed Ones;Chosen One;Cataclysm;Forgotten Ones;Forbidden Ones;Gods;Goddess;Holocaust;Mists;Moon;Moonlight;Pale Moon;Pure;Righteous;Sky;Sun;Stars;Sacred Ones;Shadows;Starlight;Undaunted;Undeterred;Unflinching;Virtuous;Wind".split(
      ";"
    );
}
Ld.prototype.Jc = function () {
  var a = Math.random();
  return 0.25 > a
    ? 1
    : 0.5 > a
    ? 0.5 > Math.random()
      ? 2
      : 3
    : 0.5 > Math.random()
    ? 4
    : 5;
};
Ld.prototype.Wb = function () {
  return this.ga[randomize(this.ga.length)];
};
Ld.prototype.sc = function () {
  return this.Ba[randomize(this.Ba.length)];
};
Ld.prototype.tc = function () {
  return this.ha[randomize(this.ha.length)];
};
function Md() {
  this.ga =
    "Astounding;Atypical;Brilliant;Custom;Cunning;Clever;Courageous;Daring;Distinctive;Exclusive;Genius;Heroic;Hand Crafted;Incomparable;Lone;Murderous;Miraculous;One of a Kind;Peerless;Righteous;Smart;Special;Singular;Ungodly;Valiant;Vain".split(
      ";"
    );
  this.Pf =
    "Absolute Astonishing Courageous Dominating Extraordinary Innate Incredible Intoxicating Impossible Massive Mysterious Perfect Preeminent Quintessential Super Total Unbelievable Unimaginable Unmatched Unrivaled Unending Unconventional Unprecedented Unequaled Unparalleled Unstoppable Unsurpassed".split(
      " "
    );
  this.Qf =
    "Attitude Adventure Bravery Confidence Coolness Destruction Devastation Effectiveness Ferocity Glory Glamour Greatness Intensity Power Perfection Persistence Perseverance Quality Smoothness Style Spirit Victory Violence Wonder".split(
      " "
    );
  this.ha = ["Savant"];
}
Md.prototype.Jc = function () {
  return 4;
};
Md.prototype.Wb = function () {
  return this.ga[randomize(this.ga.length)];
};
Md.prototype.sc = function () {
  return this.Pf[randomize(this.Pf.length)] + " " + this.Qf[randomize(this.Qf.length)];
};
Md.prototype.tc = function () {
  return this.ha[randomize(this.ha.length)];
};
function Nd() {
  this.kg = new Hd();
  this.uf = new Id();
  this.tg = new Jd();
  this.og = new Kd();
  this.Ef = new Ld();
  this.ug = new Md();
}
function Od(a, b) {
  var c;
  switch (b.Ha()) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      c = a.kg;
      break;
    case 6:
    case E:
    case 8:
      c = a.uf;
      break;
    case 9:
    case 10:
    case 11:
      c = a.tg;
      break;
    case 12:
    case 13:
    case 14:
      c = a.og;
      break;
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
      c = a.Ef;
      break;
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
      c = a.Ef;
      break;
    case 40:
      c = a.ug;
      break;
    default:
      c = a.uf;
  }
  return Pd(b, c);
}
function Pd(a, b) {
  switch (b.Jc()) {
    case 0:
      return a.w;
    case 1:
      return b.Wb() + " " + a.w;
    case 2:
      return a.w + " of " + b.sc();
    case 3:
      return a.w + " of the " + b.tc();
    case 4:
      return b.Wb() + " " + a.w + " of " + b.sc();
    case 5:
      return b.Wb() + " " + a.w + " of the " + b.tc();
    default:
      return a.w;
  }
}
function Qd() {
  this.Kf = new Nd();
}
function Ya(a, b, c) {
  var d = A.Jf,
    f = Math.random();
  c = 0.15 > f ? c + 1 : 0.3 > f ? Math.max(1, c - 1) : c;
  var f = a.i,
    g = randomize(A.character_classes[f].T.length);
  (0 !== litigious_nature.e || 0 !== Sd.e) && Math.random() < litigious_nature.e + Sd.e && c++;
  a = new pa();
  var h = d.Ha(c, b);
  b = Td(h);
  a.w = A.character_classes[f].T[g].d;
  a.dd = g;
  a.H = A.character_classes[f].className;
  a.ub = c;
  a.ed = h;
  h = get_max(shop_intimidation, Vd);
  f = b.n * Math.pow(b.o, c - 1);
  g = 1.05 - 0.1 * Math.random();
  c = Math.max(
    1,
    q(b.p * Math.pow(b.q, c - 1) * h * (1.05 - 0.1 * Math.random()))
  );
  a.ca = c;
  c = Math.max(1, q(f * g));
  a.j = c;
  a.tb = Od(d.Kf, a);
  return a;
}
function Td(a) {
  var b, c;
  for (b = 0; b < Wd.length; b++) if (((c = Wd[b]), c.s === a)) return c;
  return Wd[0];
}
Qd.prototype.Ha = function (a, b) {
  var c,
    d = null,
    f = null,
    g = 0,
    h = Math.random() * b;
  for (c = 0; c < Xd.length; c++)
    if (a <= Xd[c].A) {
      d = Xd[c];
      break;
    }
  if (d)
    for (f = d.B, c = f.length - 1; 0 <= c; c--)
      if (((g = f[c]), 0 !== g)) {
        if (h < g) return c;
        h -= g;
      }
  return 0;
};
function Yd() {}
function Zd(a) {
  a = a.Md();
  var b = $d + randomize(15),
    c = tb(),
    d = A.Adjectives;
  $a(
    c,
    b +
      " " +
      (5 > a
        ? 0.5 > Math.random()
          ? c
          : 0.75 > Math.random()
          ? c + " of the " + d.location_adjectives[randomize(d.location_adjectives.length)] + " " + d.location_nouns[randomize(d.location_nouns.length)]
          : d.enemy_adjectives[randomize(d.enemy_adjectives.length)] + " " + c
        : 0.5 > Math.random()
        ? d.enemy_adjectives[randomize(d.enemy_adjectives.length)] + " " + c
        : c + " of the " + d.location_adjectives[randomize(d.location_adjectives.length)] + " " + d.location_nouns[randomize(d.location_nouns.length)]) +
      " (Lvl. " +
      a +
      ")",
    a,
    b,
    q((ae + ae * Math.pow(a, be)) * Math.pow(ce, a)),
    q(de * Math.pow(ee, a)),
    b * q(fe * Math.pow(ge, a)),
    null
  );
}
Yd.prototype.rc = function (a) {
  return 0 > a ? "Random Boss" : bosses[a].name;
};
Yd.prototype.Md = function () {
  var a = D(),
    a = q(0.5 + (a - 1.5) + 3 * Math.random());
  (0 !== tracking_skill.e || 0 !== je.e) && Math.random() < tracking_skill.e + je.e && a++;
  return Math.max(a, 1);
};
function ke() {
  this.Qa = 0;
  this.Ub = this.da = !1;
}
ke.prototype.Te = function () {
  this.da
    ? A.a.qa.mb || ((this.da = !1), le(this))
    : A.a.qa.Te() && (this.da = !0);
};
ke.prototype.Ue = function () {
  this.da ? pb() || ((this.da = !1), le(this)) : A.a.S.Ue() && (this.da = !0);
};
function le(a) {
  a.Ub || (a.Ub = H() || zb() || yb());
  var b = Math.random();
  a.Ub
    ? 0.333 > b
      ? ((a.Qa = 1), (A.a.bc.Dc = get_date()))
      : 0.666 > b
      ? ((a.Qa = 2), (A.a.qa.qc = get_date()))
      : ((a.Qa = 3), (A.a.S.Pb = get_date()))
    : 0.4 > b
    ? ((a.Qa = 0), (A.a.K.Zb = get_date()))
    : 0.6 > b
    ? ((a.Qa = 1), (A.a.bc.Dc = get_date()))
    : 0.8 > b
    ? ((a.Qa = 2), (A.a.qa.qc = get_date()))
    : ((a.Qa = 3), (A.a.S.Pb = get_date()));
}
function rc() {
  var a = A.ke;
  Zd(a.Be);
  a = a.Yf;
  a.da = !1;
  a.Ub = !1;
  Ab(A.a.K)
    ? ((a.Qa = 0), (a.da = !0))
    : yb() && !zb()
    ? ((a.Qa = 0), (a.da = !0))
    : A.a.qa.mb
    ? ((a.Qa = 2), (a.da = !0))
    : pb()
    ? ((a.Qa = 3), (a.da = !0))
    : le(a);
}
function mc(a, b, c, d) {
  if (!(0 >= c))
    for (var f = A.a.Eb; 0 < c; ) {
      var g = f,
        h = 0;
      g.Rc -= c;
      g.lc < c && (h = c - g.lc);
      g.lc -= c;
      g.Ee = q((100 * (g.He - g.Rc)) / g.He);
      g.Hd = 0 >= g.Rc;
      g.Hd || 0 >= g.lc ? ((g.Dd = !0), (g.lc = g.Ff)) : (g.Dd = !1);
      c = h;
      if (f.Dd) {
        h = f;
        g = b;
        A.a.M.Sd++;
        if ((h = h.fc))
          if ((A.a.M.yd++, (A.a.na.Yb = !0), h.Ve)) {
            var l = A.a.kb;
            h && l.hb.push(h);
            send_google_event("Boss Victory", h.rc());
            h = A.a.kb;
            (0 === h.hb.length ? 0 : h.hb.length === bosses.length) &&
              !A.a.Sa.cc &&
              ((h = A.a.Sa), (h.cc = !0), (h.xc = !1));
          }
        g && g.Bc++;
        var h = g,
          l = A.a.Eb,
          g = q(l.Df * (holy_blessing.e + ne.e - 1)),
          k = A.a.M;
        k.Kd += g;
        if (null === l.fc && h) (h.Fa += g), h.Fa > h.Fb && oe(h);
        else
          for (
            h = void 0, g = Math.max(1, q(g / A.a.c.length)), h = 0;
            h < A.a.c.length;
            h++
          )
            (l = A.a.c[h]),
              (l.Fa += g),
              A.a.c[h].Fa > A.a.c[h].Fb && oe(A.a.c[h]);
      }
      if (f.Hd) {
        g = a;
        h = f;
        l = d;
        k = A.a.M;
        k.ya += h.ag * (pe.e + qe.e - 1);
        A.a.M.Vb++;
        null === h.fc && (k = A.a.S.Nb[h.baseName]) && (k.Xb += h.Ge);
        k = g.Yf;
        switch (k.Qa) {
          case 0:
            a: if (k.da)
              H() || zb()
                ? ((k.Ub = !0), (k.da = !1), le(k))
                : yb() || Ab(A.a.K) || ((k.da = !1), le(k));
            else {
              if (!k.Ub && ((k.Ub = H() || zb() || yb()), k.Ub)) {
                le(k);
                break a;
              }
              Db() && (k.da = !0);
            }
            break;
          case 1:
            k.da ? A.a.bc.ic || ((k.da = !1), le(k)) : Hb() && (k.da = !0);
            break;
          case 2:
            k.Te();
            break;
          case 3:
            k.Ue();
        }
        k = A.a.t;
        !(-1 < k.i || 0 === k.va.length || get_date() - k.Rb < re * (k.eb + 1)) &&
          Math.random() < se &&
          (k.i = k.va[randomize(k.va.length)]);
        if (null !== h.fc) {
          var s = (k = void 0),
            h = h.Md(),
            n = (s = void 0),
            u = te + randomize(ue - te);
          if (1 < ve.e || 1 < we.e) u = q(u * (ve.e + we.e - 1));
          for (k = 0; k < u; k++)
            (s = A.a.c[randomize(A.a.c.length)]),
              (n = xe * ye.e * ze.e),
              (s = Ya(s, n, h)),
              l ? Ia(s) : Ea(s);
        } else
          for (
            k = q(Math.round(h.Ge * Ae * (ve.e + we.e - 1))),
              n = u = u = s = void 0,
              h = h.Md(),
              s = 0;
            s < k;
            s++
          )
            (u = A.a.c[randomize(A.a.c.length)]),
              (n = get_max(ye, ze)),
              (u = Ya(u, n, h)),
              l ? Ia(u) : Ea(u);
        if (A.a.aa.Na) {
          g = g.Be;
          a: {
            k = void 0;
            h = D();
            k = void 0;
            l = A.a.kb;
            k = 0 === l.hb.length ? null : l.hb[l.hb.length - 1];
            s = void 0;
            l = -1;
            s = void 0;
            if (k)
              for (s = k.rc(), k = 0; k < bosses.length; k++) {
                if (bosses[k].name === s) {
                  l = k + 1;
                  break;
                }
              }
            else l = 0;
            if (-1 !== l && l < bosses.length && ((s = bosses[l]), h >= s.L)) break a;
            l = -1;
          }
          h = 0 <= l;
          g = g.rc(l);
          l = D() + 2;
          h && l++;
          (0 !== tracking_skill.e || 0 !== je.e) && Math.random() < tracking_skill.e + je.e && l++;
          k = A.Adjectives;
          k =
            (0.5 > Math.random()
              ? Z(k.consanants).toUpperCase() +
                Z(k.vowels) +
                Z(k.consanants) +
                Z(k.vowels) +
                Z(k.consanants) +
                Z(k.Af)
              : Z(k.consanants).toUpperCase() + Z(k.vowels) + Z(k.consanants) + Z(k.Af)) +
            " the " +
            Z(k.boss_adjectives) +
            " (Lvl. " +
            l +
            ")";
          $a(
            k,
            k,
            l,
            1,
            q((Be + Be * Math.pow(l, Ce)) * Math.pow(ce, l)),
            q(De * Math.pow(ee, l)),
            1 * q(Ee * Math.pow(ge, l)),
            new Kb(k, g, l, h)
          );
          g = A.a.aa;
          g.Da = !1;
          g.Na = !1;
        } else
          (h = A.a.aa),
            !(h.Da || A.a.na.Yb || get_date() - h.Uc < Fe) &&
              Math.random() < Ge &&
              (h.Da = !0),
            Zd(g.Be);
      }
    }
}
var hb = {
    description: "Increased click damage",
    e: 1,
    ta: 0.1,
    oa: 1,
    Ka: !0,
  },
  ta = { description: "Increased party CPS", e: 1, ta: 0.1, oa: 1, Ka: !0 },
  ne = {
    description: "Increased combat experience",
    e: 1,
    ta: 0.1,
    oa: 1,
    Ka: !0,
  },
  je = {
    description: "Encounters more likely to be of a higher level",
    e: 0,
    ta: 0.1,
    oa: 0,
    Ka: !0,
  },
  bb = {
    description: "Reduced enemy defences",
    e: 1,
    ta: -0.1,
    oa: 1,
    fd: 0.3,
    Ka: !0,
  },
  qe = { description: "Extra gold found", e: 1, ta: 0.1, oa: 1, Ka: !0 },
  ze = {
    description: "Higher chance of rare item drops",
    e: 1,
    ta: 0.1,
    oa: 1,
    Ka: !0,
  },
  we = {
    description: "Monsters more likely to drop items.",
    e: 1,
    ta: 0.1,
    oa: 1,
    Ka: !0,
  },
  Sd = {
    description: "Item drops more likely to be of a higher level",
    e: 0,
    ta: 0.1,
    oa: 0,
    Ka: !0,
  },
  Qa = {
    description: "Shop restocks more frequently",
    e: 1,
    ta: -0.1,
    oa: 1,
    fd: 0.3,
    Ka: !0,
  },
  Vd = {
    description: "Cheaper items in the shop",
    e: 1,
    ta: -0.1,
    oa: 1,
    fd: 0.3,
    Ka: !0,
  },
  Va = { description: "More items in the shop", e: 0, ta: 10, oa: 0, Ka: !1 },
  Xa = {
    description: "Higher chance of rare items in the shop",
    e: 1,
    ta: -0.1,
    oa: 1,
    fd: 0.3,
    Ka: !0,
  },
  C = [hb, ta, ne, qe, ze, we, Qa, Vd, bb, Va, Xa, je, Sd];
var click_attack = {
    name: "Click Attack",
    description: "200% attack button damage.",
    e: 1,
    Ca: 2,
    za: 1,
    duration: 12e4,
    Ga: 3e5,
  },
  barb_rage = {
    name: "Barbarian Rage",
    description: "Barbarian rage raises party CPS by 100%.",
    e: 1,
    Ca: 2,
    za: 1,
    duration: 6e4,
    Ga: 3e5,
  },
  holy_blessing = {
    name: "Holy Blessing",
    description: "Increased experience gained from combat by 50%.",
    e: 1,
    Ca: 1.5,
    za: 1,
    duration: 18e4,
    Ga: 3e5,
  },
  treasure_sense = {
    name: "Treasure Sense",
    description: "Finds 40% extra gold dropped by enemies",
    e: 1,
    Ca: 1.4,
    za: 1,
    duration: 18e4,
    Ga: 48e4,
  },
  thieving_ways = {
    name: "Thieving Ways",
    description: "Increases odds of enemies dropping rare items by 15%.",
    e: 1,
    Ca: 0.85,
    za: 1,
    duration: 18e4,
    Ga: 3e5,
  },
  groin_kick = {
    name: "Groin Kick",
    description: "Monsters 30% more likely to drop items.",
    e: 1,
    Ca: 1.3,
    za: 1,
    duration: 18e4,
    Ga: 3e5,
  },
  charismatic_aura = {
    name: "Charismatic Aura",
    description: "Increased frequency of new items in the shop.",
    e: 1,
    Ca: 0.5,
    za: 1,
    duration: 36e4,
    Ga: 9e5,
  },
  shop_intimidation = {
    name: "Shop Intimidation",
    description: "New items in the shop will be 15% cheaper.",
    e: 1,
    Ca: 0.85,
    za: 1,
    duration: 18e4,
    Ga: 3e5,
  },
  stealt_attack = {
    name: "Stealth Attack",
    description: "Stealth attack reduces enemy defenses by 25%.",
    e: 1,
    Ca: 0.75,
    za: 1,
    duration: 6e4,
    Ga: 3e5,
  },
  improved_roads = {
    name: "Improved Roads",
    description: "More items in the shop at next restocking.",
    e: 0,
    Ca: 50,
    za: 0,
    duration: 36e4,
    Ga: 6e5,
  },
  charming_smile = {
    name: "Charming Smile",
    description: "Increases odds of the shop selling rare items by 15%.",
    e: 1,
    Ca: 0.85,
    za: 1,
    duration: 36e4,
    Ga: 6e5,
  },
  tracking_skill = {
    name: "Tracking Skill",
    description: "Increases the odds of high level encounters.",
    e: 0,
    Ca: 0.35,
    za: 0,
    duration: 18e4,
    Ga: 3e5,
  },
  litigious_nature = {
    name: "Litigious Nature",
    description: "Odds of finding a higher level item raised by 15%.",
    e: 0,
    Ca: 0.15,
    za: 0,
    duration: 18e4,
    Ga: 3e5,
  },
  dc = "Victim Scan",
  ec = "Kill-Scope 6000 locates nearest boss lair.",
  cc = 5e3,
  bc = 48e4,
  Zb = "Sorcerous Enchantment",
  $b = "Shop items immediately restocked.",
  Yb = 5e3,
  Xb = 48e4;
function He() {
  this.Xd = -1;
  window.rg = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (a) {
        window.setTimeout(a, 1e3 / 60);
      }
    );
  })();
  var a = this;
  this.jg = function () {
    a.Ld();
  };
}
He.prototype.Ld = function () {
  var a = get_date();
  -1 === this.Xd && (this.Xd = a);
  var b = a - this.Xd;
  this.Xd = a;
  var c = A.jb,
    d,
    f,
    g = !1;
  for (d = 0; d < c.hc.length; d++)
    (f = c.hc[d]),
      f.G
        ? f.qb < a && (Vb(f), (g = !0))
        : !f.N &&
          f.qb + Math.max(Sb, f.Tc - A.a.P.ja * Tb) < a &&
          ((f.N = !0), c.Qb.push(f), (g = !0));
  g && c.bb++;
  if (0 < b && ((a = b / 1e3), (b = A.ke), !(0 >= a))) {
    c = A.a.c;
    if (b.le) for (d = 0; d < c.length; d++) mc(b, c[d], ra(c[d]) * a, 2 > a);
    else for (d = c.length - 1; 0 <= d; d--) mc(b, c[d], ra(c[d]) * a, 2 > a);
    b.le = !b.le;
  }
  a = A.a.S;
  for (b = 0; b < a.Nc.length; b++)
    (c = a.Nc[b]),
      !c.wb &&
        c.Xb >= c.Oc &&
        ((c.wb = !0), a.yb.push(c), delete a.Nb[c.Wa], a.Oa++);
  a = A.Lb;
  (-1 === a.Ib || get_date() - a.Ib > a.cg) && Ie(a);
  Oa();
  Ba(A.a.Va);
  a = A.a.nb;
  b = a.items;
  c = 0;
  for (f = get_date(); c < b.length; ) (d = b[c]), d.Ie <= f ? (za(a, c), Ea(d)) : c++;
  a = A.dc;
  for (b = 0; b < a.od.length; b++) a.od[b].g();
  window.rg(this.jg);
};
function Je() {}
function Xc() {
  A.a.P.ja++;
  var a;
  for (a = 0; a < A.a.c.length; a++) {
    var b = A.a.c[a],
      c = A.a.P;
    c.Wc.push(new kb(b.wa, b.O, b.ra, c.ja));
  }
  send_google_event("Prestige", "" + A.a.P.ja);
  A.Yd(!1);
  Ie(A.Lb);
}
function yd(a) {
  var b = qc(a);
  A.a.c.push(b);
  A.a.R[b.O] = b;
  ic(b);
  A.dc.f();
  var c = A.a.t;
  Pb(c, a);
  -1 !== c.ab.indexOf(a) || A.character_classes[a].Qc || c.ab.push(a);
  c.i === a && ((c.i = -1), (c.Rb = get_date()));
  c.eb++;
  send_google_event("Character", "Added: " + b.O);
}
function zd(a) {
  a = qc(a);
  var b = A.a.t;
  -1 !== b.i &&
    (Pb(b, b.i),
    -1 !== b.ab.indexOf(b.i) || A.character_classes[b.i].Qc || b.ab.push(b.i),
    (b.i = -1),
    (b.Rb = get_date()));
  send_google_event("Character", "Rejected: " + a.O);
}
Je.prototype.ce = function () {
  var a = pb();
  A.a.S.ce();
  a && send_google_event("Quest Accepted", a.Wa);
};
Je.prototype.Me = function (a) {
  A.a.S.Me(a);
  var b = Ke + randomize(Le - Ke),
    c;
  c = D();
  var d = c + Me,
    f;
  f = A.Jf;
  var g = c + Ne,
    h = A.a.c[randomize(A.a.c.length)].i,
    l = randomize(A.character_classes[h].T.length);
  c = new pa();
  var k = Td(f.Ha(g, 0.01));
  c.w = A.character_classes[h].T[l].d;
  c.dd = l;
  c.H = A.character_classes[h].className;
  c.ub = g;
  c.ed = 40;
  var s = get_max(shop_intimidation, Vd),
    h = Oe * k.n * Math.pow(k.o, g - 1),
    l = 1.05 - 0.1 * Math.random(),
    g = Math.max(
      1,
      q(k.p * Math.pow(k.q, g - 1) * s * (1.05 - 0.1 * Math.random()))
    );
  c.ca = g;
  g = Math.max(1, q(h * l));
  c.j = g;
  c.tb = Od(f.Kf, c);
  Ia(c);
  for (f = 0; f < b; f++)
    (c = A.a.c[randomize(A.a.c.length)]), (c = Ya(c, bd, d)), Ia(c);
  send_google_event("Quest Reward", a.Wa);
};
Je.prototype.We = function () {
  A.a.qa.We();
};
function qc(a) {
  var b = new qa(),
    c = A.character_classes[a];
  b.Ea = c.ea;
  b.wa = c.Name;
  b.O = c.className;
  b.ra = 1;
  b.ld(a);
  b.Fb = Pe;
  a = A.character_classes[b.i];
  for (c = 0; c < a.T.length; c++) {
    var d = b,
      f = a,
      g = c,
      h = f.T[g],
      l = new pa();
    l.w = h.d;
    l.tb = "&lt;Empty " + h.d + " Slot&gt;";
    l.j = 0;
    l.ub = 0;
    l.dd = g;
    l.Pd = !0;
    l.ca = 0;
    l.ed = 0;
    l.H = f.className;
    F(d, l);
  }
  return b;
}
function oe(a) {
  for (var b = a.Fa; b >= a.Fb; )
    (a.Fb += q(Pe * Math.pow(Qe, a.ra))),
      a.ra++,
      A.a.M.Le(a.ra),
      A.a.Cb.Le(a.ra),
      send_google_event("Level Up", a.O + " (Lvl. " + a.ra + ")");
}
function eb() {
  var a = D();
  return q((Re + Re * Math.pow(a - 1, Se)) * Math.pow(Te, a - 1));
}
function Hc(a) {
  if (a && 0 !== a.length) {
    var b,
      c,
      d = A.a.M.ya,
      f,
      g = [];
    for (b = 0; b < a.length; b++)
      ((c = a[b]), c.ca > d || !(f = A.a.R[c.H])) ||
        ((f = f.Aa[c.w]) && f.j >= c.j) ||
        g.push(c);
    if (0 < g.length)
      if (1 === g.length)
        (c = g[0]),
          Ca(c) && ((f = A.a.R[c.H]), (d = A.a.c.indexOf(f)), Fc(d, c));
      else
        for (
          c = A.a.Y, !g || 2 > g.length || g.sort(c.sg);
          0 < g.length && 0 < d;

        )
          (c = g[0]),
            d >= c.ca &&
              Ca(c) &&
              ((f = A.a.R[c.H]),
              (d = A.a.c.indexOf(f)),
              Fc(d, c),
              (d = A.a.M.ya)),
            g.splice(0, 1);
  }
}
function Fc(a, b) {
  var c = A.a.c[a];
  F(c, b);
  var d = A.a.M;
  d.ya -= b.ca;
  0 > d.ya && (d.ya = 0);
  A.a.Y.removeItem(b);
  G(c);
}
function Ue() {
  var a = A.Lb;
  "undefined" != typeof localStorage && localStorage.removeItem(a.Se);
  a.Ib = -1;
  send_google_event("SaveManager", "Delete");
}
function Ie(a) {
  var b = Ve();
  b &&
    ("undefined" != typeof localStorage && localStorage.setItem(a.Se, b),
    (a.Ib = get_date()));
}
function We(a) {
  if (a && (a = m.ig(a)) && (a = JSON.parse(a))) {
    A.Yd(!0);
    var b;
    if ((b = a.characters)) {
      A.a.c.length = 0;
      A.a.R = {};
      var c, d;
      for (c = 0; c < b.length; c++) {
        var f = (d = new qa()),
          g = b[c];
        f.wa = g.name;
        f.O = g.className;
        f.ra = g.level;
        f.Bc = g.kills;
        f.ld(g.descriptionIndex);
        f.Fb = g.experienceForNextLevel;
        f.Fa = g.experience;
        var h = g.items;
        if (h) for (var l = void 0, l = 0; l < h.length; l++) F(f, Xe(h[l]));
        f.Ea = A.character_classes[f.i].ea;
        var h = f.Ea,
          k = g.ability;
        h &&
          k &&
          ((g = k.active),
          (l = k.available),
          (k = k.endTime),
          g || (g = !1),
          l || (l = !1),
          k || (k = -1),
          (h.G = g),
          (h.N = l),
          (h.qb = k),
          -1 !== h.qb || h.G || (h.N = !0));
        G(f);
        A.a.c.push(d);
        A.a.R[d.O] = d;
      }
      b = !0;
    } else b = !1;
    if (b) {
      if ((l = a.partyStatistics))
        (b = A.a.M),
          (c = l.gold),
          (d = l.clicks),
          (f = l.encountersWon),
          (h = l.kills),
          (g = l.bossKills),
          (l = l.experience),
          c && (b.ya = c),
          d && (b.Bd = d),
          f && (b.Vb = f),
          h && (b.Sd = h),
          g && (b.yd = g),
          l && (b.Kd = l);
      if ((c = a.store))
        (b = c.minutes),
          (c = c.seconds),
          b || (b = 0),
          c || (c = 0),
          (A.a.Y.vb = get_date() + q(6e4 * b + 1e3 * c) - Ra);
      if ((b = a.itemCache))
        for (c = 0; c < b.length; c++) (d = Xe(b[c])) && Ea(d);
      (b = a.bossLair)
        ? ((c = b.bossStartTime),
          (A.a.aa.Uc = c ? c : get_date()),
          (c = b.bossLairFound),
          (A.a.aa.Da = c ? c : !1),
          (b = b.bossLairEntered),
          (A.a.aa.Na = b ? b : !1))
        : A.a.aa.W();
      (b = a.dungeon)
        ? ((c = b.dungeonLevel),
          (A.a.na.level = c ? c : 1),
          (c = b.levelBossDefeated),
          (A.a.na.Yb = c ? c : !1),
          (b = b.levelName) ? oa(b) : oa(null))
        : ma();
      (b = a.machinePartCollection)
        ? ((c = b.robotInParty),
          (A.a.K.jd = c ? c : !1),
          (c = b.robotAssembled),
          (A.a.K.Pc = c ? c : !1),
          (c = b.foundPartIndex),
          (A.a.K.Ta = c ? c : -1),
          (c = b.foundParts) ? Cb(c) : Cb([]),
          (c = b.engineerFound),
          (A.a.K.Hc = c ? c : !1),
          (b = b.machinePartTime),
          (A.a.K.Zb = b ? b : get_date()))
        : A.a.K.W();
      if ((b = a.defeatedBossCollection)) {
        if ((b = b.bosses)) {
          c = [];
          for (d = 0; d < b.length; d++)
            (g = b[d])
              ? ((f = g.name),
                (h = g.title),
                (g = g.level),
                (f = f && h && g ? new Kb(f, h, g, !0) : null))
              : (f = null),
              f && c.push(f);
          b = c;
        } else b = [];
        b ? (A.a.kb.hb = b) : A.a.kb.W();
      } else A.a.kb.W();
      (b = a.endGame)
        ? ((c = b.victorious),
          (A.a.Sa.cc = c ? c : !1),
          (b = b.victoryAcknowledged),
          (A.a.Sa.xc = b ? b : !1))
        : A.a.Sa.W();
      if ((b = a.prestige)) {
        if ((c = b.prestigeCount)) A.a.P.ja = c;
        b = b.champions;
        c = [];
        if (b && 0 < b.length)
          for (d = 0; d < b.length; d++)
            (l = b[d]),
              (f = l.championName),
              (h = l.championClass),
              (g = l.championLevel),
              (l = l.partyNumber),
              f && h
                ? (g || (g = 0), l || (l = 0), (f = new kb(f, h, g, l)))
                : (f = null),
              f && c.push(f);
        c && (A.a.P.Wc = c);
      }
      if ((b = a.artifactCollection)) {
        if ((c = b.artifacts)) {
          d = [];
          for (h = 0; h < c.length; h++) (f = Ye(c[h])) && d.push(f);
          c = d;
        } else c = [];
        c && ((d = A.a.qa), (d.fb = c), ga(d));
        c = Ye(b.foundArtifact);
        A.a.qa.mb = c ? c : null;
        b = b.foundArtifactTime;
        A.a.qa.qc = b ? b : get_date();
      }
      if ((b = a.questCollection)) {
        if ((c = Ze(b.quests)))
          for (d = A.a.S, f = 0; f < c.length; f++) ob(d, c[f]);
        c = $e(b.assignedQuest);
        A.a.S.Bb = c ? c : null;
        c = b.assignedQuestTime;
        A.a.S.Pb = c ? c : get_date();
        if ((b = Ze(b.unrewardedQuests))) A.a.S.yb = b;
      }
      if ((a = a.encounteredCharacter))
        (b = a.characterDescriptionIndex) ? A.a.t.ld(b) : A.a.t.ld(0),
          (b = a.characterFoundTime),
          (A.a.t.Rb = b ? b : get_date()),
          (b = a.addedCharacterCount),
          (A.a.t.eb = b ? b : 0),
          (b = a.availableCharacterIndices) || (b = Nb(A.a.t)),
          (A.a.t.va = b),
          (a = a.unlockedCharacterIndices) || (a = Ob()),
          (A.a.t.ab = a);
      else {
        a = A.a.t;
        a.i = -1;
        a.Rb = get_date();
        a.va = Nb(a);
        b = 0;
        for (d = 1; d < A.a.c.length; d++) (c = A.a.c[d].i), A.character_classes[c].Qc || b++;
        a.eb = b;
        a.ab = Ob();
      }
      a = !0;
    } else a = !1;
    return a;
  }
  return !1;
}
function Ve() {
  var a = JSON.stringify(af());
  return a ? m.hg(a) : null;
}
function af() {
  var a = {
      gold: A.a.M.ya,
      clicks: A.a.M.Bd,
      encountersWon: A.a.M.Vb,
      kills: A.a.M.Sd,
      bossKills: A.a.M.yd,
      experience: A.a.M.Kd,
    },
    b,
    c = [];
  for (b = 0; b < A.a.c.length; b++) c.push(bf(A.a.c[b]));
  b = { minutes: A.a.Y.Zd, seconds: A.a.Y.$d };
  var d = A.a.Va.items,
    f,
    g = [];
  for (f = 0; f < d.length; f++) g.push(cf(d[f]));
  d = {
    bossStartTime: A.a.aa.Uc,
    bossLairFound: A.a.aa.Da,
    bossLairEntered: A.a.aa.Na,
  };
  f = {
    dungeonLevel: A.a.na.level,
    levelBossDefeated: A.a.na.Yb,
    levelName: A.a.na.lair_name,
  };
  var h = {
      robotInParty: H(),
      robotAssembled: zb(),
      foundPartIndex: A.a.K.Ta,
      foundParts: A.a.K.sb,
      engineerFound: yb(),
      machinePartTime: A.a.K.Zb,
    },
    l = A.a.kb.hb,
    k = [],
    s;
  for (s = 0; s < l.length; s++) {
    var n = l[s];
    k.push({ name: n.gf, title: n.rc(), level: n.fg });
  }
  l = { bosses: k };
  k = { victorious: A.a.Sa.cc, victoryAcknowledged: A.a.Sa.xc };
  s = A.a.P.ja;
  var n = A.a.P.Wc,
    u = [],
    t;
  if (n && 0 < n.length)
    for (t = 0; t < n.length; t++) {
      var v = n[t];
      u.push({
        championName: v.kf,
        championClass: v.hf,
        championLevel: v.jf,
        partyNumber: v.Tf,
      });
    }
  s = { prestigeCount: s, champions: u };
  if ((n = ia())) {
    t = [];
    for (u = 0; u < n.length; u++) t.push(df(n[u]));
    n = t;
  } else n = [];
  n = {
    artifacts: n,
    foundArtifact: df(A.a.qa.mb),
    foundArtifactTime: A.a.qa.qc,
  };
  u = {
    quests: ef(qb()),
    assignedQuest: ff(pb()),
    assignedQuestTime: A.a.S.Pb,
    unrewardedQuests: ef(A.a.S.yb),
  };
  return {
    partyStatistics: a,
    characters: c,
    store: b,
    itemCache: g,
    bossLair: d,
    dungeon: f,
    machinePartCollection: h,
    defeatedBossCollection: l,
    endGame: k,
    prestige: s,
    artifactCollection: n,
    questCollection: u,
    encounteredCharacter: {
      characterDescriptionIndex: A.a.t.i,
      characterFoundTime: A.a.t.Rb,
      addedCharacterCount: A.a.t.eb,
      availableCharacterIndices: A.a.t.va,
      unlockedCharacterIndices: A.a.t.ab,
    },
  };
}
function ef(a) {
  var b = [],
    c;
  for (c = 0; c < a.length; c++) b.push(ff(a[c]));
  return b;
}
function Ze(a) {
  if (!a) return [];
  var b = [],
    c,
    d;
  for (d = 0; d < a.length; d++) (c = $e(a[d])) && b.push(c);
  return b;
}
function ff(a) {
  return a
    ? {
        baseName: a.Wa,
        requiredKills: a.Oc,
        killCount: a.Xb,
        questComplete: a.wb,
      }
    : null;
}
function $e(a) {
  if (!a) return null;
  var b = a.baseName,
    c = a.requiredKills,
    d = a.killCount;
  a = a.questComplete;
  if (!b) return null;
  c || (c = ub);
  d || (d = 0);
  a || (a = !1);
  b = new mb(b, c);
  b.Xb = d;
  b.wb = a;
  return b;
}
function df(a) {
  return a ? { artifactName: a.ee, artifactSettingsIndex: a.fe } : null;
}
function Ye(a) {
  if (!a) return null;
  var b = a.artifactName;
  a = a.artifactSettingsIndex;
  if (!b) return null;
  a || (a = 0);
  return new ba(b, a);
}
function bf(a) {
  var b = a.wa,
    c = a.O,
    d = a.ra,
    f = a.Bc,
    g = a.Fa,
    h = a.Fb,
    l = a.i,
    k = [],
    s = a.items,
    n;
  for (n = 0; n < s.length; n++) k.push(cf(s[n]));
  a = a.Ea;
  return {
    name: b,
    className: c,
    level: d,
    kills: f,
    experience: g,
    experienceForNextLevel: h,
    descriptionIndex: l,
    items: k,
    ability: { active: a.G, available: a.N, endTime: a.qb },
  };
}
function Xe(a) {
  var b = new pa();
  b.w = a.baseName;
  b.tb = a.generatedName;
  b.dd = a.descriptionIndex;
  b.H = a.characterClassName;
  b.j = a.cps;
  b.ed = a.itemQuality;
  b.ub = a.itemLevel;
  b.ca = a.purchaseCost;
  b.Pd = a.placeholder;
  return b;
}
function cf(a) {
  return {
    baseName: a.w,
    generatedName: a.tb,
    descriptionIndex: a.dd,
    characterClassName: a.H,
    cps: a.j,
    itemQuality: a.Ha(),
    itemLevel: a.ub,
    purchaseCost: a.ca,
    placeholder: a.Pd,
  };
}
var Re = 60,
  Te = 1.02,
  Se = 1.6,
  Ta = 20,
  Ra = 3e5,
  Sb = 0,
  Ga = 2,
  Tb = 3e4,
  ua = 0.1,
  fa = 3,
  Fa = 6,
  ja = 6e4,
  ka = 0.3,
  rb = 6e4,
  sb = 0.3,
  ub = 100,
  wb = 20,
  vb = 5,
  Me = 3,
  Ke = 10,
  Le = 15,
  Ib = 6e4,
  Jb = 0.3,
  bd = 0.5,
  ad = 3,
  Zc = 10,
  $c = 20,
  La = 6e3,
  Ma = 45e3,
  Ja = 20,
  Dd = 7,
  Ed = 6,
  Pe = 230,
  Qe = 1.17,
  xd = 5,
  re = 24e4,
  se = 0.3,
  $d = 5,
  fe = 1.5,
  ge = 1.05,
  ae = 100,
  be = 1.9,
  ce = 1.015,
  de = 2,
  ee = 1.133,
  Ae = 0.1,
  Fe = 24e4,
  Ge = 0.2,
  xe = 0.35,
  Ee = 50,
  Be = 5e3,
  Ce = 2.2,
  De = 100,
  te = 15,
  ue = 30,
  bosses = [
    { name: "Minion Supervisor Boss", L: 5 },
    { name: "Dungeon Foreman Boss", L: 7 },
    { name: "Project Manager Boss", L: 9 },
    { name: "Office Manager Boss", L: 11 },
    { name: "Middle Management Boss", L: 13 },
    { name: "District Manager Boss", L: 15 },
    { name: "Corporate Flunky Boss", L: 17 },
    { name: "Regional Manager Boss", L: 19 },
    { name: "Director of Monster Affairs", L: 21 },
    { name: "Director of Gold Mining", L: 23 },
    { name: "Director of Monster Resources", L: 25 },
    { name: "Director of Item Manufacturing", L: 27 },
    { name: "Director of Item Engineering", L: 29 },
    { name: "Director of R&D Boss", L: 31 },
    { name: "Director of Public Relations", L: 33 },
    { name: "Vice President of Sales", L: 35 },
    { name: "Vice President of Marketing", L: 37 },
    { name: "Vice President of Gold Acquisition", L: 39 },
    { name: "Vice President of Communication", L: 41 },
    { name: "Chief Financial Officer", L: 43 },
    { name: "Chief Operating Officer", L: 45 },
    { name: "President", L: 47 },
    { name: "Chief Executive Officer", L: 49 },
    { name: "Board of Directors", L: 51 },
    { name: "Chairman of the Board", L: 53 },
  ],
  Xd = [
    { A: 2, B: [0.55, 0.365, 0.05, 0.02, 0.01, 0.005] },
    { A: 5, B: [0.45, 0.395, 0.07, 0.05, 0.02, 0.01, 0.005] },
    { A: 8, B: [0.35, 0.345, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005] },
    { A: 11, B: [0.2, 0.295, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005] },
    { A: 14, B: [0.15, 0.195, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005] },
    {
      A: 17,
      B: [0.1, 0.145, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005],
    },
    {
      A: 20,
      B: [0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005],
    },
    {
      A: 23,
      B: [
        0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005,
      ],
    },
    {
      A: 26,
      B: [
        0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01,
        0.005,
      ],
    },
    {
      A: 29,
      B: [
        0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01,
        0.005,
      ],
    },
    {
      A: 32,
      B: [
        0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02,
        0.01, 0.005,
      ],
    },
    {
      A: 35,
      B: [
        0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02,
        0.01, 0.005,
      ],
    },
    {
      A: 38,
      B: [
        0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05,
        0.02, 0.01, 0.005,
      ],
    },
    {
      A: 41,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05,
        0.02, 0.01, 0.005,
      ],
    },
    {
      A: 44,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07,
        0.05, 0.02, 0.01, 0.005,
      ],
    },
    {
      A: 47,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07,
        0.05, 0.02, 0.01, 0.005,
      ],
    },
    {
      A: 50,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15,
        0.07, 0.05, 0.02, 0.01, 0.005,
      ],
    },
    {
      A: 53,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15,
        0.07, 0.05, 0.02, 0.01, 0.005,
      ],
    },
    {
      A: 56,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2,
        0.15, 0.07, 0.05, 0.02, 0.01, 0.005,
      ],
    },
    {
      A: 59,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2,
        0.15, 0.07, 0.05, 0.02, 0.01, 0.005,
      ],
    },
    {
      A: 62,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15,
        0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005,
      ],
    },
    {
      A: 65,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15,
        0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005,
      ],
    },
    {
      A: 68,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1,
        0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005,
      ],
    },
    {
      A: 71,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1,
        0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005,
      ],
    },
    {
      A: 74,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1,
        0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005,
      ],
    },
    {
      A: 77,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1,
        0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005,
      ],
    },
    {
      A: 80,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1,
        0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005,
      ],
    },
    {
      A: 80,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.05,
        0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01,
      ],
    },
    {
      A: Number.MAX_VALUE,
      B: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.06,
        0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02,
      ],
    },
  ],
  Wd = [
    { s: 0, n: 3, o: 1.015, q: 1.015, p: 3 },
    { s: 1, n: 27, o: 1.015, q: 1.015, p: 27 },
    { s: 2, n: 71, o: 1.015, q: 1.015, p: 71 },
    { s: 3, n: 143, o: 1.015, q: 1.015, p: 143 },
    { s: 4, n: 241, o: 1.015, q: 1.015, p: 241 },
    { s: 5, n: 403, o: 1.015, q: 1.015, p: 403 },
    { s: 6, n: 607, o: 1.015, q: 1.015, p: 607 },
    { s: E, n: 871, o: 1.015, q: 1.015, p: 871 },
    { s: 8, n: 1203, o: 1.015, q: 1.015, p: 1203 },
    { s: 9, n: 1611, o: 1.015, q: 1.015, p: 1611 },
    { s: 10, n: 2103, o: 1.015, q: 1.015, p: 2103 },
    { s: 11, n: 2687, o: 1.015, q: 1.015, p: 2687 },
    { s: 12, n: 3371, o: 1.015, q: 1.015, p: 3371 },
    { s: 13, n: 4163, o: 1.015, q: 1.015, p: 4163 },
    { s: 14, n: 5071, o: 1.015, q: 1.015, p: 5071 },
    { s: 15, n: 6103, o: 1.015, q: 1.015, p: 6103 },
    { s: 16, n: 7267, o: 1.015, q: 1.015, p: 7267 },
    { s: 17, n: 8571, o: 1.015, q: 1.015, p: 8571 },
    { s: 18, n: 10023, o: 1.015, q: 1.015, p: 10023 },
    { s: 19, n: 11631, o: 1.015, q: 1.015, p: 11631 },
    { s: 20, n: 13403, o: 1.015, q: 1.015, p: 13403 },
    { s: 21, n: 15347, o: 1.015, q: 1.015, p: 15347 },
    { s: 22, n: 17471, o: 1.015, q: 1.015, p: 17471 },
    { s: 23, n: 19783, o: 1.015, q: 1.015, p: 19783 },
    { s: 24, n: 22291, o: 1.015, q: 1.015, p: 22291 },
    { s: 25, n: 25003, o: 1.015, q: 1.015, p: 25003 },
    { s: 26, n: 27927, o: 1.015, q: 1.015, p: 27927 },
    { s: 27, n: 31071, o: 1.015, q: 1.015, p: 31071 },
    { s: 28, n: 34443, o: 1.015, q: 1.015, p: 34443 },
    { s: 29, n: 38051, o: 1.015, q: 1.015, p: 38051 },
    { s: 30, n: 41903, o: 1.015, q: 1.015, p: 41903 },
    { s: 31, n: 46007, o: 1.015, q: 1.015, p: 46007 },
  ],
  Ne = 6,
  Oe = 1.3,
  Eb = 6e4,
  Fb = 0.3,
  robot_parts = [
    {
      name: "Complicated Mechanism",
      description: "Beneath the pile of broken bodies, gold, and precious items, you find a mechanism far too complicated for you to understand.",
    },
    {
      name: "Indecipherable Circuitry",
      description: "While digging through the blood and gore of your most recent victim (in search of gold, I assume), you notice a small piece of circuitry of indecipherable purpose.",
    },
    {
      name: "Strange Appendage",
      description: "You notice a strange appendage protruding from the heap of corpses.",
    },
    {
      name: "Lubricated Gears",
      description: "Intermixed with the gold pieces, you discover several gears, slippery with lubrication.",
    },
    {
      name: "Tangled Wires",
      description: "On the floor, behind the beheaded corpses of your fallen foes, you see a tangled mess of wires. Your instincts tell you that you have found roughly a third of something, but what?",
    },
    {
      name: "Viscous Fluid",
      description: "You discover, clutched in the vice-like grip of your dispatched enemy, a vile of viscous fluid.",
    },
    {
      name: "Polished Carapace",
      description: "Placed upon a workbench in the middle of the room, is an object of polished metal that reminds you of a large carapace.",
    },
    {
      name: "Shiny Bolts",
      description: "At the bottom of the chest, formerly guarded by the most recently dispatched foes, are some shiny bolts.",
    },
    {
      name: "Odd Tubes",
      description: "You notice some odd tubes on a shelf in the back of the room. This seems like about half of the things. You are not sure why you feel this way.",
    },
    {
      name: "Cryptic Gauge",
      description: "A device sits forgotten in the corner. It appears to be some form of gauge covered in cryptic markings.  It kind of looks like it could connect with some of the other things you found.",
    },
    {
      name: "Mystifying Adapter",
      description: "While digging through the blood and offal, which is something you appear to do a lot of, you uncover a mystifying adapter.",
    },
    {
      name: "Confounding Motor",
      description: "You are confounded in your attempt to grasp the meaning and purpose of a piece of machine you discover. All you can determine is that it is some kind of motor.",
    },
    {
      name: "Complex Regulator",
      description: "Once again you come across piece of complex machinery. You barely glance at it, knowing that the understanding is beyond you.",
    },
    {
      name: "Connector Brackets",
      description: "You spot a useful looking set of connector brackets on a desk. You sense that you have found nearly all the strange mechanical bits there are to find. Nearly all.",
    },
    {
      name: "Bizarre Sprockets",
      description: "A collection of bizarre looking sprockets are found at the bottom of a chest.",
    },
    {
      name: "Perplexing Sensor",
      description: "You are perplexed as you peer closely at the small device you found that can only be described as some kind of sensor.",
    },
    {
      name: "Heavy Battery",
      description: "You strain with effort to lift the heavy battery found buried beneath the broken limbs and intestines of your fallen enemies.",
    },
  ];
var A = {
  Ld: new He(),
  Jf: new Qd(),
  Adjectives: new (function () {
    this.enemy_nouns =
      "Angels;Adult Maggots;Archers;Accountants;Agents;Arsonists;Anteaters;Bunnies;Badgers;Boars;Baboons;Bears;Bishops;Beetles;Basilisks;Bishops;Brigands;Bandits;Banshee;Beholders;Behemoths;Bugbears;Bigfoots;Barbarians;Chickens;Cyclops;Chimeras;Crocodiles;Crickets;Chameleons;Donkeys;Dwarfs;Devils;Demigods;Demons;Dryads;Executioners;Enchanters;Frogs;Fiends;Giant Ants;Ghosts;Gnomes;Goblins;Gophers;Giants;Gorgons;Griffins;Gargoyles;Ghouls;Golems;Harpies;Hydras;Hell Hounds;Hornets;Hostesses;Hags;Hippies;Iquanas;Kobolds;Kraken;Kelpies;Land Octopi;Lich Kings;Leviathans;Lizards;Librarians;Leeches;Lawyers;Lay Persons;Jabberwockies;Medusas;Manticores;Minotaurs;Mummies;Mimics;Mummies;Morticians;Mermaids;Mud Worms;Man Beasts;Mongrels;Nymphs;Nightshades;Necromancers;Ogres;Orcs;Phasms;Phantoms;Reapers;Snakes;Skeletons;Spiders;Slugs;Students;Serpents;Sasquatch;Slimes;Skinheads;Silkies;Snipers;Sorcerers;Succubi;Sphinx;Toads;Trolls;Thieves;Unicorns;Vampires;Weasels;Wombats;Wolves;Wasps;Weretoads;Werebeavers;Werewombats;Werefruitflies;Wizards;Warlocks;Wargs;Wyverns;Wraiths;Witches;Warriors;Yetis;Zealots;Zombies".split(
        ";"
      );
    this.enemy_adjectives =
      "Addicted;Alarming;Addled;Agile;Aggressive;Apathetic;Angry;Antagonistic;Arch;Astute;Adversarial;Abhorrent;Abominable;Bloody;Brooding;Brave;Brazen;Broken;Base;Baleful;Confrontational;Clever;Cursed;Condemnable;Cryptic;Creepy;Craven;Caustic;Chaotic;Celestial;Dark;Dread;Disgruntled;Disgraced;Destitute;Disguised;Drunk;Dire;Dastardly;Disgusting;Disquieting;Dishonored;Depth Dwelling;Distinguished;Desperate;Detestable;Excommunicated;Excited;Enterprising;Eerie;Frost;Fire;Frightening;Forbidding;Fun-loving;Fiendish;Friendly;Fearsome;Furry;Fallen;Feeble;Frozen;Fabled;Fell;Futuristic;Frantic;Frenzied;Fearsome;Foreboding;Formidable;Forgotten;Ghoulish;Gruesome;Gloom;Horrendous;Hypnotized;Hateful;Improper;Impure;Impeccable;Intoxicated;Intolerable;Intelligent;Impolite;Imperfect;Incarcerated;Inflamed;Loathsome;Monumental;Menacing;Merciless;Massive;Magnanimous;Nightmarish;Organized;Orwellian;Ornery;Odious;Overqualified;Ostentatious;Opportunistic;Perilous;Predatory;Phase;Productive;Playful;Seductive;Scary;Spine-chilling;Special Needs;Soul Devouring;Sultry;Swollen;Serious;Secret;Shadow;Reptilian;Revolting;Repugnant;Threatening;Terrible;Troubling;Towering;Unhappy;Uncooperative;Unhealthy;Unhelpful;Untoward;Unholy;Unethical;Unprincipled;Unscrupulous;Undead;Were;Zombified".split(
        ";"
      );
    this.location_adjectives =
      "Abandoned Baleful Broken Burning Betrayed Barren Bitter Blood Bloody Besieged Corrupted Crystal Cold Dead Deep Dark Dusty Distant Disturbing Desolate Demented Damp Dumpy Disgusting Disturbing Demented Ebony Frozen Friendless Forgotten Forbidden Feared Golden Gloomy Humid Infected Infested Lost Merciless Mystical Misty Nether Nice Nearby Nasty Naughty Normal North Pale Polluted Shattered Shadow Secret Shrouded Suffering Sorrowful Tormented Tortured Unholy Unknown Unnamed Vile Whispered".split(
        " "
      );
    this.location_nouns =
      "Academy;Bog;Barrow;Cavern;Crypt;City;Cave;Canyon;Darkness;Domain;Dungeon;Dimension;District;Dreams;Empire;Forest;Factory;Graveyard;Grotto;Hell;Hollow;Hellscape;Inferno;Kingdom;Land;Library;Marsh;Mausoleum;Mortuary;Mudflats;Neighborhood;Planes;Province;Portal;Planet;Realm;Past;Pit;Palace;River;River Basin;Jungle;Swamp;Slaughterhouse;Suburbs;Tundra;Terrain;Tomb;Temple;Tower;Underground".split(
        ";"
      );
    this.boss_adjectives =
      "Almighty;Arrogant;Annoying;Anemic;Berserker;Brain Eater;Betrayer;Bone Crusher;Broken;Brutish;Blood Drinker;Bloodthirsty;Crusher;Crazed;Destructor;Destroyer;Demented;Disgusting;Disturbed;Dominator;Decimator;Demented;Degenerate;Death Bringer;Feared;Fearsome;Friendless;Forgotten;Ferocious;Fabulous;Gargantuan;Greedy;Grandiose;Great;Heartless;Hurtful;Homicidal;Impure;Impaler;Infected;Inconsiderate;Incontinent;Invincible;Insipid;Intolerable;Impolite;Impossible;Impeccable;Jerk;Jolly;Jeering;Killer;Lazy;Lecherous;Mean Spirited;Maggot;Mighty;Marrow Drinker;Merciless;Murderous;Malicious;Mischievous;Micromanager;Mean;Nasty;Naughty;Oaf;Opulent;Punisher;Pain Bringer;Polluted;Ruthless;Savage;Sadistic;Terrible;Tyrannical;Tyrant;Tedious;Unholy;Unfriendly;Uncooperative;Unkind;Unjust;Uninteresting;Venomous;Vindictive;Vengeful;Violent;Vicious;Vile".split(
        ";"
      );
    this.consanants = "bcdfghjklmnprstvwxyz".split("");
    this.vowels = ["a", "i", "e", "o", "u"];
    this.Af = "ath ar ith or ton on ir ark ion".split(" ");
  })(),
  bg: new (function () {
    this.ef =
      "Amulet;Bones;Bracelet;Book;Coin;Chalice;Claw;Charm;Carving;Diadem;Dagger;Etching;Emblem;Figurine;Gold Tooth;Goblet;Earring;Horn;Idol;Knife;Mask;Necklace;Parchment;Pottery;Scroll;Skull;Stein;Totem;Trinket;Talisman;Vial;Vase".split(
        ";"
      );
    this.bf =
      "Ancient Archaic Astral Aged Antiquated Blessed Corrupt Devilish Evil Hallowed Holy Ethereal Forgotten Forbidden Heirloom Mystic Malevolent Rare Spectral Seraphic Sanctified Treasured Timeworn Unusual Unique Wicked".split(
        " "
      );
  })(),
  Fe: new Je(),
  input: new kc(),
  ke: new (function () {
    this.Be = new Yd();
    this.Yf = new ke();
    this.le = !0;
  })(),
  Lb: new (function () {
    this.Se = "CLICKPOCALYPSE_V0.010";
    this.Ib = -1;
    this.cg = 6e4;
  })(),
  dc: new Fd(),
  jb: new fc(),
  character_classes: [
    {
      className: "Mouse",
      ma: !1,
      F: "Squeak",
      description: "Increases manual (attack button) attack damage.",
      ea: new J(click_attack),
      T: [
        { d: "Left Mouse Button" },
        { d: "Right Mouse Button" },
        { d: "Mouse Wheel" },
        { d: "USB Dongle" },
        { d: "Mouse Pad" },
      ],
    },
    {
      className: "Barbarian",
      ma: !1,
      F: "Largo",
      description: "Barbarian rage raises party CPS for a brief period.",
      ea: new J(barb_rage),
      T: [
        { d: "Axe" },
        { d: "Bracers" },
        { d: "Breastplate" },
        { d: "Helm" },
        { d: "Beard" },
      ],
    },
    {
      className: "Paladin",
      ma: !1,
      F: "Hugo",
      description:
        "Charismatic aura increases frequency of new items in the shop.",
      ea: new J(Pa),
      T: [
        { d: "Sword" },
        { d: "Shield" },
        { d: "Breastplate" },
        { d: "Helm" },
        { d: "Boots" },
      ],
    },
    {
      className: "Ranger",
      ma: !1,
      Name: "Elle",
      description:
        "Tracking skill increases odds of fighting higher level enemies.",
      ea: new J(tracking_skill),
      T: [
        { d: "Bow" },
        { d: "Quiver" },
        { d: "Throwing Knives" },
        { d: "Leather Armor" },
        { d: "Pet Falcon" },
      ],
    },
    {
      className: "Cleric",
      ma: !1,
      F: "Esmeralda",
      description:
        "Invokes holy blessing to increase experience gained from combat.",
      ea: new J(holy_blessing),
      T: [
        { d: "Mace" },
        { d: "Relic" },
        { d: "Amulet" },
        { d: "Scroll" },
        { d: "Cloak" },
      ],
    },
    {
      className: "Wizard",
      ma: !1,
      F: "Kane",
      description:
        "Sorcerous enchantment causes immediate restocking of shop items.",
      ea: new Wb(),
      T: [
        { d: "Staff" },
        { d: "Spell Book" },
        { d: "Ring" },
        { d: "Hat" },
        { d: "Robe" },
      ],
    },
    {
      className: "Pirate",
      ma: !1,
      F: "Slapjaw",
      description: "Treasure sense finds extra gold dropped by enemies.",
      ea: new J(pe),
      T: [
        { d: "Hook" },
        { d: "Cutlass" },
        { d: "Eye Patch" },
        { d: "Parrot" },
        { d: "Flintlock Pistol" },
      ],
    },
    {
      className: "Wiseguy",
      ma: !1,
      F: "Lenny",
      description: "Intimidates shop owners for cheaper item prices.",
      ea: new J(shop_intimidation),
      T: [
        { d: "Pistol" },
        { d: "Italian Suit" },
        { d: "Leather Shoes" },
        { d: "Hair Product" },
        { d: "Wrist Watch" },
      ],
    },
    {
      className: "Thief",
      ma: !1,
      F: "Casey",
      description:
        "Thieving ways increase odds of enemies dropping rare items.",
      ea: new J(ye),
      T: [
        { d: "Lockpicks" },
        { d: "Dagger" },
        { d: "Gloves" },
        { d: "Darts" },
        { d: "Rope" },
      ],
    },
    {
      className: "Ninja",
      ma: !1,
      F: "Meiji",
      description: "Stealth attack reduces enemy defenses.",
      ea: new J(stealt_attack),
      T: [
        { d: "Ninjato" },
        { d: "Throwing Stars" },
        { d: "Grappling Hook" },
        { d: "Hand Claws" },
        { d: "Mask" },
      ],
    },
    {
      className: "Gunslinger",
      ma: !1,
      F: "Kyle",
      description: "Charming smile convinces shop owner to stock better items.",
      ea: new J(Wa),
      T: [
        { d: "Cowboy Hat" },
        { d: "Six Shooter" },
        { d: "Holster" },
        { d: "Duster" },
        { d: "Belt Buckle" },
      ],
    },
    {
      className: "Legionary",
      ma: !1,
      F: "Decimus",
      description: "Improved roads increases number of items in the shops.",
      ea: new J(improved_roads),
      T: [
        { d: "Gladius" },
        { d: "Javelin" },
        { d: "Sandals" },
        { d: "Greaves" },
        { d: "Cassis" },
      ],
    },
    {
      className: "Lawyer",
      ma: !1,
      F: "Peter",
      description:
        "Litigious Nature increases odds of finding higher level items.",
      ea: new J(litigious_nature),
      T: [
        { d: "Tie" },
        { d: "Briefcase" },
        { d: "Waistcoat" },
        { d: "Business Card" },
        { d: "Cigar" },
      ],
    },
    {
      className: "Cheerleader",
      ma: !1,
      F: "Sophie",
      description:
        "Groin kicking ability knocks loose extra items from encounters.",
      ea: new J(ve),
      T: [
        { d: "Pom Poms" },
        { d: "Megaphone" },
        { d: "Hair Tie" },
        { d: "Pleated Skirt" },
        { d: "Cell Phone" },
      ],
    },
    {
      className: "Robot",
      ma: !0,
      Qc: !0,
      F: "SlaughterBot-7",
      description: "Robots love killing all humans (and everything else).",
      ea: new ac(),
      T: [
        { d: "Gatling Gun Attachment" },
        { d: "Chain Saw Attachment" },
        { d: "Mercy Elimination Unit" },
        { d: "Pity Cancellation Module" },
        { d: "Malware" },
      ],
    },
  ],
  a: {
    Eb: new Za(),
    M: new la(),
    c: [],
    R: {},
    Y: new Na(),
    nb: new Ha(),
    Va: new Da(),
    Cb: new cb(),
    aa: new ib(),
    na: new (function () {
      this.level = 1;
      this.lair_name = "Dungeon";
      this.Yb = !1;
      this.Ae = new Gd();
    })(),
    K: new xb(),
    kb: new Lb(),
    bc: new Gb(),
    Sa: new jb(),
    P: new lb(),
    qa: new ca(),
    S: new nb(),
    t: new Mb(),
  },
  handleKeyPress: function (a) {
    A.input.handleKeyPress(a);
  },
  displayEncounterTab: function () {
    U(0);
  },
  displayMachinePartsTab: function () {
    U(1);
  },
  displayArtifactsTab: function () {
    U(2);
  },
  displayQuestsTab: function () {
    U(3);
  },
  displayDefeatedBossesTab: function () {
    U(4);
  },
  displayChampionsTab: function () {
    U(5);
  },
  displayManagementTab: function () {
    U(6);
  },
  displayVersionTab: function () {
    U(7);
  },
  displayCharacter: function (a) {
    A.input.displayCharacter(a);
  },
  onAttackButtonPress: function () {
    A.input.onAttackButtonPress();
  },
  onSaveGameButtonPress: function () {
    Ie(A.Lb);
  },
  onExportSaveButtonPress: function () {
    var a = get_element_by_id("exportSaveInput");
    a.value = Ve();
    R("exportSaveContainer");
    Q("exportSaveButton");
    a.select();
  },
  onImportSaveButtonPress: function () {
    Q("importErrorMessage");
    Q("importSuccessMessage");
    get_element_by_id("importSaveInput").value = "";
    R("importSaveContainer");
    Q("importSaveButton");
  },
  Yd: function (a) {
    A.a.c = [];
    A.a.R = {};
    A.a.M = new la();
    A.a.Eb = new Za();
    db();
    A.a.aa = new ib();
    ma();
    A.a.K = new xb();
    A.a.kb = new Lb();
    var b = A.a.bc;
    b.ic = !1;
    b.Dc = get_date();
    da(A.a.qa, a);
    A.a.S.Re();
    b = A.a.t;
    b.eb = 0;
    b.i = -1;
    b.Rb = get_date();
    b.va = Nb(b);
    b.ab = Ob();
    A.a.Sa.Re();
    wa(A.a.nb);
    wa(A.a.Va);
    wa(A.a.Y);
    a && (A.a.P = new lb());
  },
  onExportCloseButtonPress: function () {
    Q("exportSaveContainer");
    R("exportSaveButton");
    get_element_by_id("exportSaveInput").value = "";
  },
  onImportOkButtonPress: function () {
    var a = get_element_by_id("importSaveInput").value;
    send_google_event("SaveManager", "Import");
    We(a)
      ? (hc(A.jb),
        A.dc.f(),
        Ie(A.Lb),
        Q("importErrorMessage"),
        R("importSuccessMessage"))
      : (R("importErrorMessage"), Q("importSuccessMessage"));
  },
  onImportCloseButtonPress: function () {
    Q("importErrorMessage");
    Q("importSuccessMessage");
    get_element_by_id("importSaveInput").value = "";
    Q("importSaveContainer");
    R("importSaveButton");
  },
  setSelectedTabId: function (a) {
    A.input.setSelectedTabId(a);
  },
  pg: function () {
    Y(new partyButtonTable());
    Y(new Rc());
    Y(new Vc());
    Y(new Lc());
    Y(new Sc());
    Y(new Tc());
    Y(new md());
    Y(new Yc());
    Y(new nd());
    Y(new Boss_tab());
    Y(new vd());
    Y(new id());
    Y(new ld());
    Y(new cd());
    Y(new fd());
    Y(new gd());
    Y(new wd());
    Y(new Ad());
    var a;
    for (a = 0; a < Dd; a++) Y(new Kc(a));
    Y(new pd());
    Y(new Prestige_button_container());
  },
  onFirstResetGameButtonPress: function () {
    R("resetConfirmContainer");
    Q("firstResetButtonContainer");
  },
  onResetCloseButtonPress: function () {
    Q("resetConfirmContainer");
    R("firstResetButtonContainer");
  },
  onResetGameButtonPress: function () {
    A.Yd(!1);
    Ue();
    Ie(A.Lb);
    gc(A.jb);
    Q("resetConfirmContainer");
    R("firstResetButtonContainer");
  },
  onFirstDeleteSaveButtonPress: function () {
    R("deleteSaveConfirmContainer");
    Q("firstDeleteSaveButtonContainer");
  },
  onDeleteCloseButtonPress: function () {
    Q("deleteSaveConfirmContainer");
    R("firstDeleteSaveButtonContainer");
  },
  onDeleteSaveButtonPress: function () {
    A.Yd(!0);
    Ue();
    Ie(A.Lb);
    gc(A.jb);
    Q("deleteSaveConfirmContainer");
    R("firstDeleteSaveButtonContainer");
  },
  onLoad: function () {
    var a = A.Lb;
    "undefined" != typeof localStorage && We(localStorage.getItem(a.Se));
    send_google_event("SaveManager", "Load");
    Oa();
    A.pg();
    0 < A.a.c.length && (hc(A.jb), A.dc.f());
    rc();
    A.Ld.Ld();
  },
};
window.Game = A;
window.$ = "nothing";
