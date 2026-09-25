#!/usr/bin/env python3
"""Dev-server zonder cache. Gebruik: python3 devserver.py 4720 .  ->  http://127.0.0.1:4720/verhuizen/"""
import http.server, os, sys

poort = int(sys.argv[1]) if len(sys.argv) > 1 else 4720
map_ = os.path.abspath(sys.argv[2] if len(sys.argv) > 2 else ".")


class GeenCache(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=map_, **kw)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    # gzip voor tekstbestanden, zoals Vercel dat live doet; anders meet Lighthouse lokaal veel te zwart
    def send_head(self):
        p = self.translate_path(self.path)
        import gzip, io, mimetypes
        if os.path.isdir(p):
            for ix in ("index.html", "index.htm"):
                if os.path.isfile(os.path.join(p, ix)):
                    p = os.path.join(p, ix)
                    break
        if os.path.isfile(p) and "gzip" in self.headers.get("Accept-Encoding", "") and p.rsplit(".", 1)[-1] in ("html", "css", "js", "svg", "json", "txt", "xml"):
            data = open(p, "rb").read()
            gz = gzip.compress(data, 6)
            self.send_response(200)
            self.send_header("Content-Type", mimetypes.guess_type(p)[0] or "application/octet-stream")
            self.send_header("Content-Encoding", "gzip")
            self.send_header("Content-Length", str(len(gz)))
            self.send_header("Vary", "Accept-Encoding")
            self.end_headers()
            return io.BytesIO(gz)
        return super().send_head()

    def translate_path(self, path):
        p = super().translate_path(path)
        if not os.path.exists(p) and os.path.isfile(p + ".html"):
            return p + ".html"
        return p

    def log_message(self, *a):
        pass


print(f"http://127.0.0.1:{poort}/  (map {map_})")
http.server.ThreadingHTTPServer(("127.0.0.1", poort), GeenCache).serve_forever()
