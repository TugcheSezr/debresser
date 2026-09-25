#!/usr/bin/env python3
"""Onafhankelijke route: haal de pagina's op zoals een bezoeker (HTTP + gzip) en ontleed ze
statisch met html.parser. Geen Chrome, geen CDP, geen DOM. Dit is de tweede bron voor stap 3."""
import gzip, io, json, re, sys, urllib.request
from html.parser import HTMLParser

# Gebruik: python3 _werk/verify_http.py [basis-url]   standaard http://127.0.0.1:4740
# Basis-url meegeven als je in een tweede werkkopie zit. Stond hier hard op een poort, en dan
# toets je stilletjes de kopie van een andere sessie en krijg je groen over andermans werk.
BASIS = (sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:4740").rstrip("/")
PAGINAS = ["/", "/diensten/", "/particulier-verhuizen/", "/contact/", "/m3-calculator/",
           "/veelgestelde-vragen/", "/verhuischecklist/", "/dozencalculator/", "/toegankelijkheid/",
           "/inpaktips/", "/over-ons/", "/werkwijze/", "/duurzaamheid/", "/vacatures/",
           "/erkende-verhuizer/", "/certificeringen/", "/verzekering/", "/klachtenregeling/",
           "/klantervaringen/", "/internationale-verhuizing/", "/seniorenverhuizing/",
           "/spoedverhuizing/", "/inpakservice/", "/montage-demontage/", "/inboedelopslag/",
           "/zorgverhuizing/", "/piano-verhuizen/", "/antiek-en-kunst-verhuizen/",
           "/kantoorverhuizing/", "/algemene-voorwaarden/", "/privacybeleid/", "/cookiebeleid/",
           "/disclaimer/", "/sitemap/"]

def haal(pad):
    req = urllib.request.Request(BASIS + pad, headers={"Accept-Encoding": "gzip"})
    with urllib.request.urlopen(req, timeout=20) as r:
        rauw = r.read()
        gz = r.headers.get("Content-Encoding") == "gzip"
        tekst = gzip.decompress(rauw).decode("utf-8") if gz else rauw.decode("utf-8")
        return r.status, gz, len(rauw), tekst

class Teller(HTMLParser):
    LEEG = {"br","img","input","meta","link","hr","source","use","path","rect","area","col","embed","track","wbr"}
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stapel=[]; self.onbalans=[]; self.telling={}
        self.eerste_focusbaar=None; self.volgorde=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag not in self.LEEG: self.stapel.append(tag)
        cls=a.get("class","")
        if "skiplink" in cls: self.telling["skiplink"]=self.telling.get("skiplink",0)+1
        if a.get("aria-current"): self.telling["aria-current"]=self.telling.get("aria-current",0)+1
        if a.get("id")=="lf-foutlijst": self.telling["foutlijst"]=self.telling.get("foutlijst",0)+1
        if a.get("id")=="heroVideoKnop": self.telling["videoknop"]=self.telling.get("videoknop",0)+1
        if tag=="main": self.telling["main:"+a.get("id","")+":"+a.get("tabindex","GEEN")]=1
        if tag=="form": self.telling["form:novalidate="+("ja" if "novalidate" in a else "nee")]=self.telling.get("form:novalidate="+("ja" if "novalidate" in a else "nee"),0)+1
        if re.search(r"vcl-(tab|chip)(\s|$)", cls):
            k="vcl:aria-pressed="+a.get("aria-pressed","GEEN"); self.telling[k]=self.telling.get(k,0)+1
        if tag=="link" and a.get("rel")=="stylesheet": self.telling["stylesheet"]=self.telling.get("stylesheet",0)+1
        if a.get("id") in ("lf-datum","of-datum"):
            self.telling["datum:"+a["id"]+":aria="+a.get("aria-label","GEEN")]=1
        if tag=="label" and a.get("for"): self.telling["label-for:"+a["for"]]=1
        if tag in ("a","button","input","select","textarea") and self.eerste_focusbaar is None:
            if not (tag=="input" and a.get("type")=="hidden") and a.get("tabindex")!="-1" and a.get("aria-hidden")!="true":
                self.eerste_focusbaar=tag+"."+cls.split(" ")[0]
    def handle_endtag(self, tag):
        if tag in self.LEEG: return
        if self.stapel and self.stapel[-1]==tag: self.stapel.pop()
        elif tag in self.stapel:
            while self.stapel and self.stapel.pop()!=tag: pass
            self.onbalans.append(tag)
        else: self.onbalans.append("los </"+tag+">")

uit={}
for p in PAGINAS:
    st, gz, n, t = haal(p)
    T=Teller(); T.feed(t)
    uit[p]={"status":st,"gzip":gz,"bytes":n,"eerste_focusbaar":T.eerste_focusbaar,
            "onbalans":T.onbalans[:5],"open_aan_eind":T.stapel[:5],"telling":T.telling,
            "heeft_lfForm":'id="lfForm"' in t,"heeft_vcl":"vcl-tab" in t}
print(json.dumps(uit, ensure_ascii=False))
