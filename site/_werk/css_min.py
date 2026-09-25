#!/usr/bin/env python3
"""Schrijft site/assets/css/style.min.css: dezelfde CSS zonder commentaar en zonder inspringing.

Waarom: style.css is met opzet vol commentaar dat per regel uitlegt WAAROM iets zo is, met
meetwaarden erbij. Dat commentaar moet blijven, maar het hoeft niet over de lijn. Gemeten op
29-08-2026: 148.070 bytes -> 39.664 gzipped, waarvan 42.277 bytes commentaar. Zonder dat
commentaar en zonder inspringing blijft er 104.893 -> 21.475 gzipped over, dus 45,8% minder
over de lijn voor een bestand dat het renderen blokkeert (en dat moet het blijven: layout-CSS
asynchroon laden kostte op oranjelift.nl meteen CLS).

Alleen commentaar en inspringing gaan eruit. Bewust NIET: witruimte rond : { } ; samentrekken.
Dat scheelde bij de meting nog maar 284 gzipped bytes extra en `.a :hover` wordt dan stilletjes
`.a:hover`, een andere selector. De winst weegt niet op tegen dat risico.

Bewijs dat het verliesvrij is: _werk/cssom.mjs vergelijkt de door Chrome GEPARSTE CSSOM van
style.css en style.min.css regel voor regel (selector, elke declaratie, elke !important, door
@media en @supports heen). Uitkomst 29-08-2026: 1006 top-level regels, identiek.
Draai die vergelijking opnieuw na een grote ingreep in style.css.
"""
import pathlib

SITE = pathlib.Path(__file__).resolve().parents[1]
# De bron met commentaar staat in _werk (niet op de site, zie .vercelignore); alleen de min-versie gaat live.
BRON = SITE / "_werk/style.css"
DOEL = SITE / "assets/css/style.min.css"


def zonder_commentaar(css):
    """Haalt /* ... */ weg. Commentaar gaat VOOR strings: in een comment is de apostrof van
    "pagina's" geen string-opener, en in een string is /* geen commentaar-opener."""
    uit, i, n = [], 0, len(css)
    while i < n:
        if css.startswith("/*", i):
            j = css.find("*/", i + 2)
            assert j >= 0, f"onafgesloten /* op positie {i} in {BRON}"
            i = j + 2
            continue
        c = css[i]
        if c in "\"'":
            j = i + 1
            while j < n and css[j] != c and css[j] != "\n":
                j += 2 if css[j] == "\\" else 1
            if j < n and css[j] == c:      # string netjes gesloten: in zijn geheel overnemen
                uit.append(css[i:j + 1])
                i = j + 1
                continue
        uit.append(c)
        i += 1
    return "".join(uit)


def verklein(css):
    kaal = zonder_commentaar(css)
    regels = [r.strip() for r in kaal.split("\n")]
    return "\n".join(r for r in regels if r) + "\n"


def schrijf():
    css = BRON.read_text(encoding="utf-8")
    klein = verklein(css)
    kaal = zonder_commentaar(css)
    # Vangnet: een minifier die stilletjes iets opeet is erger dan geen minifier. Accolades en
    # puntkomma's buiten commentaar moeten een-op-een overkomen.
    for teken in "{};":
        assert klein.count(teken) == kaal.count(teken), (
            f"{teken!r} telt niet meer na verkleinen: {kaal.count(teken)} -> {klein.count(teken)}")
    assert len(klein) > len(css) * 0.4, "verdacht klein resultaat, niet geschreven"
    DOEL.write_text(klein, encoding="utf-8")
    return len(css), len(klein)


def loopt_achter():
    """True als style.min.css niet meer overeenkomt met style.css. Beide bouwers schrijven hem
    altijd, dus dit kan alleen als iemand style.css wijzigt en NIET bouwt. Voor een pre-deploy
    controle: python3 site/_werk/css_min.py --check (afsluitcode 1 als het misgaat)."""
    if not DOEL.exists():
        return True
    return DOEL.read_text(encoding="utf-8") != verklein(BRON.read_text(encoding="utf-8"))


if __name__ == "__main__":
    import sys
    if "--check" in sys.argv:
        achter = loopt_achter()
        print(f"{DOEL.name}: {'LOOPT ACHTER op style.css, draai de bouwers' if achter else 'bij'}")
        sys.exit(1 if achter else 0)
    voor, na = schrijf()
    print(f"geschreven: {DOEL} ({voor:,} -> {na:,} bytes, {100 - 100 * na // voor}% eraf)")
