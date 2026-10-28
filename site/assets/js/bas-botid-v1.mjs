// BotID voor de Bas-koppeling: beschermt alleen de POST naar /api/bas-aanvraag/, met dezelfde checkLevel als de server.
// Met de slash, omdat trailingSlash op alle sites aanstaat. Wordt pas bij de eerste leadinzending geladen (53-ONTWERP v5 §9).
import { initBotId } from './botid-core-1.5.11.mjs';
initBotId({ protect: [{ path: '/api/bas-aanvraag/', method: 'POST', advancedOptions: { checkLevel: 'deepAnalysis' } }] });
