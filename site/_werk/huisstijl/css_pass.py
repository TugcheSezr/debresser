#!/usr/bin/env python3
"""Huisstijl-pass: zet site/assets/css/style.css van Heerlijk Thuis (goud/bruin, Josefin/Open Sans) om naar
Top Movers (teal/navy, Poppins/Noto Sans/Zilla Slab). Elke vervanging is exact en telt het aantal treffers,
zodat een niet-gevonden regel meteen opvalt. Draai vanuit de repo-root: python3 site/_werk/huisstijl/css_pass.py"""
import re, sys, pathlib

P = pathlib.Path(__file__).resolve().parents[2] / "assets/css/style.css"
css = P.read_text()
fouten = []

def rep(old, new, n=1):
    global css
    c = css.count(old)
    if c != n:
        fouten.append(f"{c}x (verwacht {n}): {old[:90]!r}")
        return
    css = css.replace(old, new)

LATIN = "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
LATIN_EXT = "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF"

# ---------- kop + fonts + tokens ----------
kop_oud = css[: css.index("@font-face")]
kop_nieuw = """/* De Kievit Verhuizingen (Venlo, lid van Top Movers), homepage in de Top Movers-huisstijl.
   Opzet 1-op-1 van de Heerlijk Thuis Ads-lander (~/mijnheerlijkthuis-landing/verhuizen/): hero met foto van
   rand tot rand plus offerte-pill, dozenkaart met calculator, leadblock-formulier (pro.feitsma.nl),
   verhuischecklist en inpaktips (pro.sprintkoeriers.nl). HTML en klassen zijn ongewijzigd; alleen kleuren,
   fonts en merkbestanden zijn Top Movers (bron: onderzoek/06-merk-huisstijl-en-website.md sectie 2).
   De tokennamen zijn de HT-namen gebleven omdat index.html ze inline gebruikt; hun waarde is nu:
   --goud = teal #00A19B (vlakken, accenten, knoppen met donkere tekst), --goud-diep = donkere teal #006C68
   (gekleurde tekst op licht, AA op wit, creme en lichtteal), --teal-paneel = #00807A (grote panelen met witte
   tekst: offertebox, dozenkaart, leadblock; wit op #00A19B haalt maar 3,2:1), --teal-op-navy = #32B3AF
   (gekleurde tekst op navy, 5,1:1), --bruin = navy #22314E (alle donkere panelen en de footer),
   --creme = warm wit #F6F4EC, --creme-2/--secundair = lichtteal #E5F3F3, --zand/--lijn = #C4E4E4,
   --oranje = #EE7203 (de meest geklikte knop per sectie: .btn--groen en .of-cta, donkere tekst 5,7:1).
   Koppen Poppins 700, tekst/knoppen/labels Noto Sans (variabel 300-700), grote cijfers Zilla Slab 700.
   Contrast: _werk/contrast.txt. */

"""
css = css.replace(kop_oud, kop_nieuw, 1)

ff_oud = css[css.index("@font-face"): css.index(":root{")]
ff_nieuw = (
    f"@font-face{{font-family:'Poppins';font-style:normal;font-weight:700;font-display:swap;src:url(../fonts/poppins-700-latin.woff2) format('woff2');unicode-range:{LATIN}}}\n"
    f"@font-face{{font-family:'Poppins';font-style:normal;font-weight:700;font-display:swap;src:url(../fonts/poppins-700-latin-ext.woff2) format('woff2');unicode-range:{LATIN_EXT}}}\n"
    f"@font-face{{font-family:'Noto Sans';font-style:normal;font-weight:300 700;font-display:swap;src:url(../fonts/notosans-300-700-latin.woff2) format('woff2');unicode-range:{LATIN}}}\n"
    f"@font-face{{font-family:'Noto Sans';font-style:normal;font-weight:300 700;font-display:swap;src:url(../fonts/notosans-300-700-latin-ext.woff2) format('woff2');unicode-range:{LATIN_EXT}}}\n"
    f"@font-face{{font-family:'Zilla Slab';font-style:normal;font-weight:700;font-display:swap;src:url(../fonts/zillaslab-700-latin.woff2) format('woff2');unicode-range:{LATIN}}}\n"
    f"@font-face{{font-family:'Zilla Slab';font-style:normal;font-weight:700;font-display:swap;src:url(../fonts/zillaslab-700-latin-ext.woff2) format('woff2');unicode-range:{LATIN_EXT}}}\n\n"
)
css = css.replace(ff_oud, ff_nieuw, 1)

root_oud = css[css.index(":root{"): css.index("}\n", css.index(":root{")) + 2]
root_nieuw = """:root{
  --creme:#F6F4EC; --creme-2:#E5F3F3; --secundair:#E5F3F3; --bruin:#22314E; --zand:#C4E4E4; --goud-hover:#32B3AF; --licht-hover:#D5ECEB;
  --goud:#00A19B; --goud-licht:#E5F3F3; --goud-diep:#006C68; --goud-donker:#33A39F;
  --teal-paneel:#00807A; --teal-op-navy:#32B3AF; --oranje:#EE7203; --oranje-hover:#D9660A;
  --ant:#1D1D1B; --ant-diep:#1D1D1B; --ant-zacht:#4B4B49; --wit:#FFFFFF; --lijn:#C4E4E4;
  --ok:#2E6B3A; --fout:#A33A2E;
  --font-kop:'Noto Sans','Helvetica Neue',Arial,sans-serif;
  --font-tekst:'Noto Sans','Helvetica Neue',Arial,sans-serif;
  --font-titel:'Poppins','Helvetica Neue',Arial,sans-serif;
  --font-display:'Zilla Slab',Georgia,'Times New Roman',serif;
  --maxw:1200px; --pad:clamp(16px,4vw,40px); --r:18px; --r-boog:999px 999px 18px 18px;
  --ease:cubic-bezier(.22,.61,.36,1);
  --schaduw:0 18px 50px -22px rgba(29,29,27,.35);
  --schaduw-lg:0 40px 90px -40px rgba(29,29,27,.55);
  --schaduw-kaart:0 1px 2px rgba(29,29,27,.05),0 14px 34px -22px rgba(29,29,27,.28);
}
"""
css = css.replace(root_oud, root_nieuw, 1)

# ---------- basis en typografie ----------
rep("html{scroll-behavior:smooth;scroll-padding-top:170px;", "html{scroll-behavior:smooth;scroll-padding-top:100px;")
rep("font:400 1.09rem/1.6 var(--font-kop);overflow-x:clip}", "font:400 1.09rem/1.6 var(--font-tekst);overflow-x:clip}")
rep("h1,h2,h3,h4{font-family:var(--font-titel);font-weight:600;", "h1,h2,h3,h4{font-family:var(--font-titel);font-weight:700;")
rep(".label,.eyebrow{font:400 .8rem/1.3 var(--font-kop);letter-spacing:.22em;", ".label,.eyebrow{font:700 .76rem/1.3 var(--font-kop);letter-spacing:.18em;")

# ---------- knoppen (Noto Sans 700, symmetrische padding: de extra bovenpadding was voor Josefin Sans) ----------
rep("padding:1.05rem 1.6rem .9rem;border-radius:2rem;font:400 .82rem/1.2 var(--font-kop);letter-spacing:.2em;",
    "padding:.98rem 1.6rem;border-radius:2rem;font:700 .8rem/1.2 var(--font-kop);letter-spacing:.1em;")
rep(".btn--ant{background:var(--goud);color:#fff}\n.btn--ant:hover{background:var(--goud-hover);color:#fff}\n.btn--goud{background:var(--goud);color:#fff}\n.btn--goud:hover{background:var(--goud-hover);color:#fff}",
    "/* teal knop: donkere letter, want wit op #00A19B haalt 3,2:1 en dat is te laag voor 13px kapitalen; donker op teal staat op 5,3:1 */\n.btn--ant{background:var(--goud);color:var(--ant)}\n.btn--ant:hover{background:var(--goud-hover);color:var(--ant)}\n.btn--goud{background:var(--goud);color:var(--ant)}\n.btn--goud:hover{background:var(--goud-hover);color:var(--ant)}")
rep("""/* WhatsApp-knop. Wit met het merkteken in WhatsApp-groen: herkenbaar zonder het goud/zand-palet te
   breken, en leesbaar op creme, op de gouden leadblock-kaart en op de donkere footer. Wil je hem
   toch vol groen: background #25D366, border-color #25D366, color #0B3D2C, svg color #fff. */""",
    """/* WhatsApp-knop. Wit met het merkteken in WhatsApp-groen (merk van derden, niet hertinten): leesbaar op
   warm wit, op het teal leadblock-paneel en op de navy footer. */""")
rep("""/* Groene actieknop. Werkt op elke .btn, niet alleen op WhatsApp: hij markeert per sectie de knop
   waarop de meeste kliks worden verwacht. Donkere letter want wit op #25D366 haalt maar 2:1; zo
   staat de tekst op 7,4:1 en blijft de knop onmiskenbaar groen. Staat na de andere .btn--varianten,
   dus hij wint van goud, ant en lijn zonder !important. */
.btn--groen{background:#25D366;border-color:#21BE5C;color:#0A2E1F}
.btn--groen:hover{background:#1FBF5C;border-color:#1AA850;color:#0A2E1F}
.btn--groen svg{color:#0A2E1F}""",
    """/* Actieknop in Top Movers-oranje (klassenaam .btn--groen komt van de HT-lander). Werkt op elke .btn: hij
   markeert per sectie de knop waarop de meeste kliks worden verwacht. Donkere letter want wit op #EE7203
   haalt maar 2,96:1; donker staat op 5,7:1 (hover #D9660A: 4,7:1). Staat na de andere .btn--varianten,
   dus hij wint van goud, ant, lijn en wa zonder !important. */
.btn--groen{background:var(--oranje);border-color:var(--oranje);color:var(--ant)}
.btn--groen:hover{background:var(--oranje-hover);border-color:var(--oranje-hover);color:var(--ant)}
.btn--groen svg{color:var(--ant)}""")
rep(".btn--lg{padding:1.3rem 1.9rem 1.1rem;font-size:.9rem}", ".btn--lg{padding:1.2rem 1.9rem;font-size:.88rem}")

# ---------- topbar: logo 813x387 (ratio 2,1) in plaats van 195x166 ----------
rep(".topbar__logo img{height:166px;", ".topbar__logo img{height:84px;")
rep(".topbar .btn{padding:.78rem 1.15rem .62rem;font-size:.85rem}", ".topbar .btn{padding:.7rem 1.15rem;font-size:.82rem}")
rep(".topbar.is-stuck{background:rgba(253,251,248,.92);", ".topbar.is-stuck{background:rgba(246,244,236,.92);")
rep(".topbar.is-stuck .topbar__logo img,.topbar.is-stuck .topbar__logo img+img{height:109px}", ".topbar.is-stuck .topbar__logo img,.topbar.is-stuck .topbar__logo img+img{height:56px}")
rep("@media(min-width:1200px){.topbar__logo img{height:200px}.topbar.is-stuck .topbar__logo img,.topbar.is-stuck .topbar__logo img+img{height:131px}}",
    "@media(min-width:1200px){.topbar__logo img{height:96px}.topbar.is-stuck .topbar__logo img,.topbar.is-stuck .topbar__logo img+img{height:60px}}")
rep("  .topbar .btn{padding:.7rem .85rem .55rem}\n  .topbar__logo img,.topbar__logo img+img,.topbar.is-stuck .topbar__logo img,.topbar.is-stuck .topbar__logo img+img{height:112px}",
    "  .topbar .btn{padding:.62rem .85rem}\n  .topbar__logo img,.topbar__logo img+img,.topbar.is-stuck .topbar__logo img,.topbar.is-stuck .topbar__logo img+img{height:56px}")

# ---------- hero ----------
rep("rgba(30,29,28,.92)", "rgba(29,29,27,.92)")
rep(".hero .eyebrow{color:var(--goud);", ".hero .eyebrow{color:var(--teal-op-navy);")
rep(".hero .eyebrow::before{background:var(--goud);", ".hero .eyebrow::before{background:var(--teal-op-navy);")

# ---------- offerte-pill ----------
rep("/* ---------- offerte-pill (1-op-1 Feitsma: rode balk -> goud) ---------- */", "/* ---------- offerte-pill (1-op-1 Feitsma: rode balk -> teal-paneel) ---------- */")
rep(".of-box{position:relative;z-index:2;background:var(--goud);color:#fff;border-radius:28px;padding:clamp(28px,3.4vw,44px) clamp(28px,4vw,52px);box-shadow:0 24px 60px -10px rgba(122,95,42,.42)}",
    ".of-box{position:relative;z-index:2;background:var(--teal-paneel);color:#fff;border-radius:28px;padding:clamp(28px,3.4vw,44px) clamp(28px,4vw,52px);box-shadow:0 24px 60px -10px rgba(0,128,122,.42)}")
rep(".of-title{font-family:var(--font-titel);font-weight:800;", ".of-title{font-family:var(--font-titel);font-weight:700;")
rep("stroke='%233D3B3A'", "stroke='%231D1D1B'")
rep(".of-cta{display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#0A2E1F;border:none;border-radius:2rem;padding:16px 26px 14px;font:400 13px/1.2 var(--font-kop);letter-spacing:.2em;",
    ".of-cta{display:inline-flex;align-items:center;gap:10px;background:var(--oranje);color:var(--ant);border:none;border-radius:2rem;padding:15px 26px;font:700 13px/1.2 var(--font-kop);letter-spacing:.1em;")
rep(".of-cta:hover{background:#1FBF5C}", ".of-cta:hover{background:var(--oranje-hover)}")
rep(".of-cta{justify-content:center;border-radius:14px;padding:14px 20px 12px}", ".of-cta{justify-content:center;border-radius:14px;padding:13px 20px}")
rep("/* Keurmerken (Feitsma): witte chips, derdenmerk niet hertinten; hier Trustoo plus twee tekstchips. */",
    "/* Keurmerken (Feitsma): witte chips, derdenmerk niet hertinten; hier Klantenvertellen (tekstchip met cijfer), het logo Erkende Verhuizers en een tekstchip. */")
rep(".keurmerk--score.keurmerk--trustoo img{max-height:15px}\n.keurmerk__cijfer{font:600 1.05rem/1 var(--font-kop);color:var(--ant);padding-top:.1em}",
    ".keurmerk--score.keurmerk--kv img{max-height:21px}\n.keurmerk__cijfer{font:700 1.05rem/1 var(--font-display);color:var(--goud-diep)}")
rep(".keurmerk__kop{font:600 .95rem/1 var(--font-kop);color:var(--ant);letter-spacing:.04em;text-transform:uppercase;padding-top:.1em}",
    ".keurmerk__kop{font:700 .95rem/1 var(--font-kop);color:var(--ant);letter-spacing:.04em;text-transform:uppercase}")
rep("  .keurmerk--score.keurmerk--trustoo img{max-height:11px}\n  .keurmerk__cijfer{font-size:.88rem}",
    "  .keurmerk--score.keurmerk--kv img{max-height:16px}\n  .keurmerk__cijfer{font-size:.95rem}")

# ---------- trust-iconen, werkwijze ----------
rep("--ik-a:#3D3B3A;--ik-b:#C9AB78}", "--ik-a:#1D1D1B;--ik-b:#33A39F}")
rep(".stap__nr{display:block;font:300 3rem/1 var(--font-kop);color:var(--goud);", ".stap__nr{display:block;font:700 3rem/1 var(--font-display);color:var(--goud-diep);")

# ---------- dozenkaart en calculator ----------
rep("/* ---------- dozenkaart (1-op-1 Feitsma: rode kaart -> goud, watermerk = H-beeldmerk) ---------- */", "/* ---------- dozenkaart (1-op-1 Feitsma: rode kaart -> teal-paneel, watermerk = Top Movers-beeldmerk) ---------- */")
rep("grid-template-columns:1.18fr .82fr;background:var(--goud);color:var(--ant);", "grid-template-columns:1.18fr .82fr;background:var(--teal-paneel);color:var(--ant);")
rep(".badge__ab{display:block;font:600 1.5rem/1 var(--font-kop);color:var(--goud)}", ".badge__ab{display:block;font:700 1.5rem/1 var(--font-display);color:var(--teal-op-navy)}")
rep("/* ---------- dozencalculator (1-op-1 Feitsma; uitkomstpaneel ink -> bruin) ---------- */", "/* ---------- dozencalculator (1-op-1 Feitsma; uitkomstpaneel ink -> navy) ---------- */")
rep(".calc__getal{font-family:var(--font-titel);font-weight:800;font-size:clamp(2.2rem,4vw,3rem);line-height:1;color:var(--goud)}",
    ".calc__getal{font-family:var(--font-display);font-weight:700;font-size:clamp(2.2rem,4vw,3rem);line-height:1;color:var(--teal-op-navy)}")

# ---------- reviews ----------
rep("""/* Achtergrond mengt drie huisstijlen: de gouden HT-mark als watermerk, de vier Google-kleuren en het
   Trustoo-koraal als zacht licht op het bruin. De logo's zelf staan in volle kleur op lichte vlakken
   (scorekaart en bronchips), zodat Google en Trustoo hun eigen huisstijl houden. */""",
    """/* Achtergrond: het teal Top Movers-beeldmerk als watermerk, met de vier Google-kleuren en het groen van
   Klantenvertellen als zacht licht op het navy. De keurmerklogo's zelf staan in volle kleur op lichte
   vlakken (scorekaart en bronchips), zodat derdenmerken hun eigen huisstijl houden. */""")
rep("  radial-gradient(28% 34% at 0% 98%,rgba(254,137,94,.10),transparent 68%),\n  radial-gradient(58% 52% at 50% 46%,rgba(219,192,150,.06),transparent 72%)}",
    "  radial-gradient(28% 34% at 0% 98%,rgba(103,181,71,.08),transparent 68%),\n  radial-gradient(58% 52% at 50% 46%,rgba(0,161,155,.08),transparent 72%)}")
rep("url(../img/mark-goud.svg)", "url(../img/mark-teal.svg)", 2)
rep(".reviews .label{color:var(--goud)}\n.reviews .label::before{background:var(--goud)}", ".reviews .label{color:var(--teal-op-navy)}\n.reviews .label::before{background:var(--teal-op-navy)}")
rep("/* scorekaart: cijfer van Trustoo, met beide bronlogo's eronder */", "/* scorekaart: cijfer van Klantenvertellen, met de bronlogo's eronder */")
rep(".score__cijfer{flex:none;font:600 2.9rem/1 var(--font-kop);color:var(--goud-diep);padding-top:.12em}", ".score__cijfer{flex:none;font:700 2.9rem/1 var(--font-display);color:var(--goud-diep)}")
rep(".bronlogo{display:inline-flex;align-items:center;gap:.4rem;font:600 .88rem/1 var(--font-kop);color:var(--ant);text-decoration:none}\n.bronlogo img{height:17px;width:auto}\n.bronlogo svg{width:17px;height:17px;flex:none}\n.bronlogo+.bronlogo::before{content:\"\";width:1px;height:17px;background:var(--lijn);margin-right:.3rem}",
    ".bronlogo{display:inline-flex;align-items:center;gap:.4rem;font:600 .88rem/1 var(--font-kop);color:var(--ant);text-decoration:none;--ik-a:#1D1D1B;--ik-b:#00A19B}\n.bronlogo img{height:24px;width:auto}\n.bronlogo svg{width:17px;height:17px;flex:none}\n.bronlogo+.bronlogo::before{content:\"\";width:1px;height:24px;background:var(--lijn);margin-right:.3rem}")
rep('.review::before{content:"\\201C";position:absolute;top:.55rem;right:1.25rem;font:600 3.6rem/1 var(--font-kop);',
    '.review::before{content:"\\201C";position:absolute;top:.55rem;right:1.25rem;font:700 3.6rem/1 var(--font-display);')
rep(".review--google::after{background:linear-gradient(90deg,#4285F4,#EA4335 34%,#FBBC05 66%,#34A853)}\n.review--trustoo::after{background:linear-gradient(90deg,#FE895E,#10185A)}",
    ".review--kv::after{background:var(--goud)}")
rep("color:var(--goud-licht);font:600 1rem/1 var(--font-kop);text-transform:uppercase;padding-top:.1em}", "color:var(--goud-licht);font:600 1rem/1 var(--font-kop);text-transform:uppercase}")
rep(".bron{flex:none;display:inline-flex;align-items:center;gap:.35rem;background:var(--creme);color:var(--ant);border-radius:999px;padding:.34rem .6rem .3rem;",
    ".bron{flex:none;display:inline-flex;align-items:center;gap:.35rem;background:var(--creme);color:var(--ant);border-radius:999px;padding:.32rem .6rem;")
rep(".bron--trustoo{padding:.34rem .55rem}\n.bron--trustoo img{height:11px;width:auto}", ".bron--kv{--ik-a:#1D1D1B;--ik-b:#00A19B}")
rep("padding-bottom:.35rem;color:var(--goud);font:600 .82rem/1 var(--font-kop);", "padding-bottom:.35rem;color:var(--teal-op-navy);font:600 .82rem/1 var(--font-kop);")

# ---------- blokken, team, plaatsen ----------
rep(".lid img{width:68px;height:82px;object-fit:cover;object-position:top;border-radius:999px 999px 10px 10px;background:var(--zand)}",
    ".lid__ico{flex:none;width:44px;height:44px;border-radius:50%;background:var(--goud-licht);display:grid;place-items:center;color:var(--goud-diep)}\n.lid__ico svg{width:22px;height:22px}")
rep(".plaatsen li{display:inline-flex;align-items:center;gap:.4rem;background:var(--wit);border:1px solid var(--lijn);border-radius:999px;padding:.45rem .85rem .35rem;",
    ".plaatsen li{display:inline-flex;align-items:center;gap:.4rem;background:var(--wit);border:1px solid var(--lijn);border-radius:999px;padding:.4rem .85rem;")
rep("padding:.6rem .9rem .5rem;border-radius:10px;backdrop-filter:blur(4px)}", "padding:.55rem .9rem;border-radius:10px;backdrop-filter:blur(4px)}")

# ---------- checklist, tips, faq ----------
rep(".vcl-chip,.vcl-tab{border:1px solid var(--lijn);background:#fff;border-radius:999px;padding:10px 14px 8px;", ".vcl-chip,.vcl-tab{border:1px solid var(--lijn);background:#fff;border-radius:999px;padding:9px 14px;")
rep(".vcl-chip.aan{background:var(--goud);border-color:var(--goud);color:#fff}", ".vcl-chip.aan{background:var(--goud);border-color:var(--goud);color:var(--ant)}")
rep(".vcl-tab.aan{background:var(--goud);border-color:var(--goud);color:#fff}", ".vcl-tab.aan{background:var(--goud);border-color:var(--goud);color:var(--ant)}")
rep(".vcl-tab .n{font:600 11px/1 var(--font-kop);opacity:.7;margin-left:6px}", ".vcl-tab .n{font:600 11px/1 var(--font-kop);opacity:.7;margin-left:6px}\n.vcl-tab.aan .n{opacity:1}")
rep(".vcl-item.klaar .t{text-decoration:line-through;color:#8a8580}", ".vcl-item.klaar .t{text-decoration:line-through;color:#6B6B68}")
rep("padding:3px 8px 2px;border-radius:999px;margin-left:6px;", "padding:3px 8px;border-radius:999px;margin-left:6px;")
rep(".vcl-knop{border:1px solid var(--secundair);background:var(--secundair);color:#000;border-radius:999px;padding:11px 16px 9px;", ".vcl-knop{border:1px solid var(--secundair);background:var(--secundair);color:#000;border-radius:999px;padding:10px 16px;")
rep(".vcl-nav .btn{padding:.75rem 1.2rem .6rem;font-size:.82rem}", ".vcl-nav .btn{padding:.68rem 1.2rem;font-size:.8rem}")
rep("font:600 14px/1 var(--font-kop);color:var(--goud-diep);padding-top:2px}", "font:600 14px/1 var(--font-kop);color:var(--goud-diep)}")
rep(".faq summary{list-style:none;cursor:pointer;display:grid;grid-template-columns:3.4rem 1fr 1.6rem;align-items:center;gap:0 1.4rem;padding:1.5rem 0 1.35rem;font:600 1.25rem/1.35 var(--font-titel);",
    ".faq summary{list-style:none;cursor:pointer;display:grid;grid-template-columns:3.4rem 1fr 1.6rem;align-items:center;gap:0 1.4rem;padding:1.5rem 0 1.35rem;font:700 1.25rem/1.35 var(--font-titel);")

# ---------- leadblock ----------
rep("/* ---------- leadblock: foto + offerteformulier (1-op-1 Feitsma; rood paneel -> goud) ---------- */", "/* ---------- leadblock: foto + offerteformulier (1-op-1 Feitsma; rood paneel -> teal-paneel) ---------- */")
rep("background:linear-gradient(140deg,#E6D2AE 0%,var(--goud) 60%,#CDB07E 100%)}", "background:linear-gradient(140deg,#00837D 0%,var(--teal-paneel) 60%,#00726E 100%)}")
rep("background:radial-gradient(70% 80% at 95% 0%,rgba(255,255,255,.28),transparent 55%)}", "background:radial-gradient(70% 80% at 95% 0%,rgba(255,255,255,.14),transparent 55%)}")
rep(".lead-google__logo{height:14px;width:auto;flex-shrink:0}", ".lead-google__logo{height:14px;width:14px;flex-shrink:0;--ik-a:#1D1D1B;--ik-b:#00A19B}")
rep(".lead-google strong{font-weight:800}", ".lead-google strong{font-weight:700}")
rep(".lf__field>span{font:400 .74rem/1.3 var(--font-kop);letter-spacing:.14em;", ".lf__field>span{font:700 .72rem/1.3 var(--font-kop);letter-spacing:.1em;")
rep("#9b9b9b", "#767674", 2)
rep("/* Dozenschatting in het formulier: uitklapper op het gouden paneel. */", "/* Dozenschatting in het formulier: uitklapper op het teal paneel; donker getint (niet licht) zodat de witte tekst AA houdt. */")
rep(".lfcalc{margin-top:.2rem;border:1px solid rgba(255,255,255,.45);border-radius:14px;background:rgba(255,255,255,.14);overflow:hidden}",
    ".lfcalc{margin-top:.2rem;border:1px solid rgba(255,255,255,.45);border-radius:14px;background:rgba(0,0,0,.12);overflow:hidden}")
rep("padding:.75rem .9rem .65rem;font:400 .84rem/1.3 var(--font-kop);letter-spacing:.06em;color:#fff}", "padding:.7rem .9rem;font:700 .82rem/1.3 var(--font-kop);letter-spacing:.06em;color:#fff}")
rep(".lfcalc__knop:hover{background:rgba(255,255,255,.18)}", ".lfcalc__knop:hover{background:rgba(0,0,0,.2)}")
rep(".lfcalc__extras legend{float:left;width:100%;font:400 .68rem/1.3 var(--font-kop);", ".lfcalc__extras legend{float:left;width:100%;font:700 .68rem/1.3 var(--font-kop);")
rep(".lfcalc__uit strong{font-weight:800}", ".lfcalc__uit strong{font-weight:700}")
rep(".lfcalc__ok{font:400 .8rem/1.2 var(--font-kop);letter-spacing:.14em;text-transform:uppercase;cursor:pointer;border:0;border-radius:2rem;padding:.75rem 1.1rem .6rem;",
    ".lfcalc__ok{font:700 .78rem/1.2 var(--font-kop);letter-spacing:.1em;text-transform:uppercase;cursor:pointer;border:0;border-radius:2rem;padding:.68rem 1.1rem;")
rep(".lfcalc.is-toegevoegd{border-color:#fff;background:rgba(255,255,255,.22)}", ".lfcalc.is-toegevoegd{border-color:#fff;background:rgba(0,0,0,.2)}")
rep(".lfcalc.is-toegevoegd .lfcalc__ok{background:rgba(255,255,255,.25);color:#fff;cursor:default}\n.lfcalc.is-toegevoegd .lfcalc__ok:hover{background:rgba(255,255,255,.25)}",
    ".lfcalc.is-toegevoegd .lfcalc__ok{background:rgba(0,0,0,.22);color:#fff;cursor:default}\n.lfcalc.is-toegevoegd .lfcalc__ok:hover{background:rgba(0,0,0,.22)}")

# ---------- footer ----------
rep(".footer{position:relative;isolation:isolate;background:#2A1C1C;", ".footer{position:relative;isolation:isolate;background:var(--bruin);")
rep(".footer__claim .eyebrow{color:var(--goud);margin-bottom:1rem}\n.footer__claim .eyebrow::before{background:var(--goud)}",
    ".footer__claim .eyebrow{color:var(--teal-op-navy);margin-bottom:1rem}\n.footer__claim .eyebrow::before{background:var(--teal-op-navy)}")
rep(".footer__tel svg{width:24px;height:24px;color:var(--goud);flex:none}", ".footer__tel svg{width:24px;height:24px;color:var(--teal-op-navy);flex:none}")
rep(".footer__rooster h2{font:600 .85rem/1.3 var(--font-kop);letter-spacing:.22em;text-transform:uppercase;color:var(--goud);",
    ".footer__rooster h2{font:700 .85rem/1.3 var(--font-kop);letter-spacing:.22em;text-transform:uppercase;color:var(--teal-op-navy);")
rep(".footer__logo{height:96px;width:auto;margin-bottom:.9rem}",
    ".footer__logo{height:64px;width:auto;margin-bottom:.9rem}\n.footer__keurmerken{margin:.9rem 0 0!important}\n.footer__keurmerken a{display:inline-block;background:#fff;border-radius:10px;padding:6px 10px}\n.footer__keurmerken img{display:block;height:48px;width:auto}")
rep(".footer__balk{background:#241818;", ".footer__balk{background:#1A2540;")
rep(".footer__knoppen .btn{padding:.8rem 1.3rem .68rem;font-size:.8rem}", ".footer__knoppen .btn{padding:.74rem 1.3rem;font-size:.78rem}")
rep(".mcta .btn{width:100%;padding:.85rem .5rem .7rem;font-size:.85rem}", ".mcta .btn{width:100%;padding:.78rem .5rem;font-size:.82rem}")
rep("background:rgba(253,251,248,.96);backdrop-filter:blur(8px);", "background:rgba(246,244,236,.96);backdrop-filter:blur(8px);")

# ---------- opslag-band: teal naar donkere teal (niet naar lichtteal: daar valt het witte logo weg) ----------
rep("background:linear-gradient(90deg,var(--goud),var(--zand));transform:skewY(-5deg);", "background:linear-gradient(90deg,var(--goud),var(--teal-paneel));transform:skewY(-5deg);")
rep(".opslag__mark{position:absolute;left:3%;top:50%;transform:translateY(-50%);height:90%;width:auto;opacity:.97}",
    ".opslag__mark{position:absolute;left:2%;top:50%;transform:translateY(-50%);height:34%;width:auto;opacity:.97}")
rep(".opslag__script{position:absolute;right:2.5%;top:50%;transform:translateY(-50%);height:98%;width:auto;opacity:.97}",
    ".opslag__script{position:absolute;right:2.5%;top:50%;transform:translateY(-50%);height:46%;width:auto;opacity:.97}")
rep(".opslag__kaart .label{color:var(--goud)}\n.opslag__kaart .label::before,.opslag__kaart .label::after{background:var(--goud);color:var(--goud)}",
    ".opslag__kaart .label{color:var(--teal-op-navy)}\n.opslag__kaart .label::before,.opslag__kaart .label::after{background:var(--teal-op-navy);color:var(--teal-op-navy)}")
rep("@media(min-width:901px) and (max-width:1600px){.opslag__mark{height:74%;left:2%}.opslag__kaart{margin-left:14%}.opslag__script{height:92%}}",
    "@media(min-width:901px) and (max-width:1600px){.opslag__mark{height:30%;left:2%}.opslag__kaart{margin-left:14%}.opslag__script{height:44%}}")
rep("  .opslag__mark{height:80%;left:2%}\n  .opslag__script{height:74%;right:3%}", "  .opslag__mark{height:30%;left:2%}\n  .opslag__script{height:40%;right:3%}")

# ---------- split, venster ----------
rep(".split__tekst .label{color:var(--goud)}\n.split__tekst .label::before,.split__tekst .label::after{background:var(--goud);color:var(--goud)}",
    ".split__tekst .label{color:var(--teal-op-navy)}\n.split__tekst .label::before,.split__tekst .label::after{background:var(--teal-op-navy);color:var(--teal-op-navy)}")
rep(".venster__tekst .label{color:var(--goud)}\n.venster__tekst .label::before,.venster__tekst .label::after{background:var(--goud);color:var(--goud)}",
    ".venster__tekst .label{color:var(--teal-op-navy)}\n.venster__tekst .label::before,.venster__tekst .label::after{background:var(--teal-op-navy);color:var(--teal-op-navy)}")
rep("/* het bruine vlak is een eigen laag", "/* het navy vlak is een eigen laag")

# ---------- topbar gescrold ----------
rep(".topbar.is-stuck .topbar__logo img,.topbar.is-stuck .topbar__logo img+img{height:72px}\n@media(min-width:1200px){.topbar.is-stuck .topbar__logo img,.topbar.is-stuck .topbar__logo img+img{height:80px}}\n.topbar.is-stuck .btn{padding:.64rem 1rem .5rem;font-size:.78rem}",
    ".topbar.is-stuck .topbar__logo img,.topbar.is-stuck .topbar__logo img+img{height:52px}\n@media(min-width:1200px){.topbar.is-stuck .topbar__logo img,.topbar.is-stuck .topbar__logo img+img{height:56px}}\n.topbar.is-stuck .btn{padding:.57rem 1rem;font-size:.76rem}")
rep(".topbar__g{width:22px;height:22px;flex:none}", ".topbar__g{width:22px;height:22px;flex:none;--ik-a:#1D1D1B;--ik-b:#00A19B}")
rep(".topbar__sterren{display:inline-flex;gap:1px;color:var(--goud-donker)}", ".topbar__sterren{display:inline-flex;gap:1px;color:var(--goud-diep)}")
rep(".topbar__rv b{font:600 1rem/1 var(--font-kop);padding-top:.12em}", ".topbar__rv b{font:700 1rem/1 var(--font-display)}")
rep("  .topbar.is-stuck .topbar__logo img,.topbar.is-stuck .topbar__logo img+img{height:64px}\n  .topbar.is-stuck .btn{padding:.6rem .8rem .48rem}",
    "  .topbar.is-stuck .topbar__logo img,.topbar.is-stuck .topbar__logo img+img{height:48px}\n  .topbar.is-stuck .btn{padding:.54rem .8rem}")

# ---------- globale rgba- en fallbackvervangingen (schaduwen, veils, footer-verlopen) ----------
for old, new in [
    ("rgba(43,42,41,", "rgba(29,29,27,"), ("rgba(253,251,248,", "rgba(246,244,236,"), ("rgba(242,241,233,", "rgba(246,244,236,"),
    ("rgba(219,192,150,", "rgba(0,161,155,"), ("rgba(38,25,25,", "rgba(26,37,64,"), ("rgba(85,56,56,", "rgba(34,49,78,"),
    ("rgba(20,10,4,", "rgba(10,16,30,"), (",#FDFBF8)", ",#F6F4EC)"), (",#F2F1E9)", ",#F6F4EC)"),
]:
    c = css.count(old)
    if c == 0:
        fouten.append(f"0x (globaal): {old!r}")
    css = css.replace(old, new)

if fouten:
    print("NIET GEVONDEN / VERKEERD AANTAL:"); print("\n".join(fouten)); sys.exit(1)
P.write_text(css)
print("style.css geschreven:", len(css), "bytes,", css.count("\n") + 1, "regels")
