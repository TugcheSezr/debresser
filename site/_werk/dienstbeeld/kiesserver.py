#!/usr/bin/env python3
"""Keuze-server voor de dienstbeeld-galerij.

Serveert deze map en slaat elke klik op: POST /kies met {"dienst": "par", "id": "...", "aan": true}
schrijft gekozen.json. Zo hoeft Shahab niets over te typen; ik lees gekozen.json.

    python3 kiesserver.py 4750     ->  http://127.0.0.1:4750/galerij.html
"""
import http.server, json, os, pathlib, sys

HIER = pathlib.Path(__file__).resolve().parent
KEUZE = HIER / "gekozen.json"
poort = int(sys.argv[1]) if len(sys.argv) > 1 else 4750


def lees():
    return json.loads(KEUZE.read_text()) if KEUZE.exists() else {}


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(HIER), **kw)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def do_POST(self):
        if self.path != "/kies":
            return self.send_error(404)
        n = int(self.headers.get("Content-Length", 0))
        d = json.loads(self.rfile.read(n) or b"{}")
        keuze = lees()
        lijst = keuze.setdefault(d["dienst"], [])
        if d.get("aan"):
            if d["id"] not in lijst:
                lijst.append(d["id"])
        elif d["id"] in lijst:
            lijst.remove(d["id"])
        KEUZE.write_text(json.dumps(keuze, ensure_ascii=False, indent=1))
        body = json.dumps(keuze).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    print(f"keuzeserver op http://127.0.0.1:{poort}/galerij.html  (keuze -> {KEUZE.name})", flush=True)
    http.server.ThreadingHTTPServer(("127.0.0.1", poort), Handler).serve_forever()
