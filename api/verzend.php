<?php
/**
 * De Bresser · formulierverwerking
 *
 * Ontvangt de formulieren van contact.html, offerte.html, vacatures.html en de dienstpagina's
 * (POST vanuit js/main.js) en stuurt ze als e-mail naar info@debresser.nl.
 * Werkt op elke webserver met PHP 7.4+ en een geconfigureerde mail()-functie.
 * Lokaal (bestand geopend via file://) valt js/main.js terug op het e-mailprogramma.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const ONTVANGER   = 'info@debresser.nl';
const AFZENDER    = 'website@debresser.nl';
const MAX_BESTAND = 2 * 1024 * 1024; // 2 MB, zoals op de vacaturepagina's
const TOEGESTAAN  = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];

function antwoord(bool $ok, string $bericht, int $status = 200): void
{
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'bericht' => $bericht], JSON_UNESCAPED_UNICODE);
    exit;
}

function schoon(string $waarde): string
{
    $waarde = trim(strip_tags($waarde));
    return str_replace(["\r", "\0"], '', $waarde);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    antwoord(false, 'Alleen POST is toegestaan.', 405);
}

// Honeypot: dit veld is onzichtbaar voor mensen
if (!empty($_POST['website_url'])) {
    antwoord(true, 'Bedankt.');
}

// Eenvoudige limiet: maximaal 5 aanvragen per 10 minuten per bezoeker
session_start();
$nu = time();
$_SESSION['verzonden'] = array_values(array_filter($_SESSION['verzonden'] ?? [], fn ($t) => $t > $nu - 600));
if (count($_SESSION['verzonden']) >= 5) {
    antwoord(false, 'Te veel aanvragen. Probeer het later opnieuw of bel 013 52 82 372.', 429);
}

$naam     = schoon((string) ($_POST['naam'] ?? ''));
$email    = filter_var(trim((string) ($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$telefoon = schoon((string) ($_POST['telefoon'] ?? ''));

if ($naam === '' || !$email || $telefoon === '') {
    antwoord(false, 'Vul naam, e-mailadres en telefoonnummer in.', 422);
}

$onderwerp = schoon((string) ($_POST['_onderwerp'] ?? 'Aanvraag via de website'));
$pagina    = schoon((string) ($_POST['_pagina'] ?? ''));

// Alle velden netjes onder elkaar
$regels = [];
foreach ($_POST as $sleutel => $waarde) {
    if (in_array($sleutel, ['website_url', '_onderwerp', '_pagina'], true)) {
        continue;
    }
    $label = ucfirst(str_replace(['_', '-'], ' ', (string) $sleutel));
    $tekst = is_array($waarde) ? implode(', ', array_map('schoon', $waarde)) : schoon((string) $waarde);
    if ($tekst !== '') {
        $regels[] = $label . ': ' . $tekst;
    }
}
$regels[] = '';
$regels[] = 'Pagina: ' . $pagina;
$regels[] = 'Verzonden: ' . date('d-m-Y H:i');
$tekstBericht = implode("\n", $regels);

$grens   = 'db-' . bin2hex(random_bytes(12));
$headers = [
    'From: De Bresser website <' . AFZENDER . '>',
    'Reply-To: ' . $naam . ' <' . $email . '>',
    'MIME-Version: 1.0',
];

$bijlage = $_FILES['cv'] ?? null;
if ($bijlage && ($bijlage['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK) {
    $extensie = strtolower(pathinfo((string) $bijlage['name'], PATHINFO_EXTENSION));
    if ($bijlage['size'] > MAX_BESTAND || !in_array($extensie, TOEGESTAAN, true)) {
        antwoord(false, 'Het bestand is te groot of heeft een ongeldig formaat (pdf, doc, docx, jpg, png; max. 2 MB).', 422);
    }
    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $grens . '"';
    $inhoud  = "--$grens\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n" . $tekstBericht . "\r\n";
    $inhoud .= "--$grens\r\nContent-Type: application/octet-stream; name=\"" . basename((string) $bijlage['name']) . "\"\r\n";
    $inhoud .= "Content-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename=\"" . basename((string) $bijlage['name']) . "\"\r\n\r\n";
    $inhoud .= chunk_split(base64_encode((string) file_get_contents($bijlage['tmp_name']))) . "--$grens--";
} else {
    $headers[] = 'Content-Type: text/plain; charset=utf-8';
    $inhoud = $tekstBericht;
}

$verzonden = mail(
    ONTVANGER,
    '=?UTF-8?B?' . base64_encode($onderwerp . ' · ' . $naam) . '?=',
    $inhoud,
    implode("\r\n", $headers)
);

if (!$verzonden) {
    antwoord(false, 'Verzenden is niet gelukt. Mail ons op info@debresser.nl of bel 013 52 82 372.', 500);
}

$_SESSION['verzonden'][] = $nu;
antwoord(true, 'Bedankt! Wij nemen binnen 24 uur contact met u op.');
