// 15-10-2026 (GO264 ronde B7): oude URL's zonder opvolger op de site (rewrites in vercel.json naar /api/vervallen).
// Stuurt de bestaande 404-pagina byte-gelijk terug, maar met status 410 (Gone): de pagina is bewust vervallen.
// Byte-gelijk houdt de CSP-hashes van de inline scripts geldig en voegt geen nieuwe tekst toe. Zelfde mechanisme als Brocken.
const fs = require("fs");
const path = require("path");

const pagina = fs.readFileSync(path.join(__dirname, "..", "404.html"));

module.exports = (req, res) => {
  res.statusCode = 410;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(pagina);
};
