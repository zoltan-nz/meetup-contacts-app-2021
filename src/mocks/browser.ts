import { RestHandler, setupWorker } from 'msw';
import { defaultHandlers } from './default-handlers';
import * as contactsHandlers from './handlers/contacts';

const SCENARIOS_QUERY_PARAM = 's';

const urlSearchParams = new URLSearchParams(window.location.search);
const requestedScenarios = urlSearchParams.get(SCENARIOS_QUERY_PARAM)?.split(',');

// @ts-ignore
const scenarioHandlers: RestHandler[] = requestedScenarios?.map(s => contactsHandlers[s]) || [];

export const worker = setupWorker(...scenarioHandlers, ...defaultHandlers);
