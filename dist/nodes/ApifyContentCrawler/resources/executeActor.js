"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultBuild = getDefaultBuild;
exports.getDefaultInputsFromBuild = getDefaultInputsFromBuild;
exports.runActorApi = runActorApi;
exports.executeActorRunFlow = executeActorRunFlow;
const n8n_workflow_1 = require("n8n-workflow");
const genericFunctions_1 = require("./genericFunctions");
async function getDefaultBuild(actorId) {
    const defaultBuildResp = await genericFunctions_1.apiRequest.call(this, {
        method: 'GET',
        uri: `/v2/acts/${actorId}/builds/default`,
    });
    if (!(defaultBuildResp === null || defaultBuildResp === void 0 ? void 0 : defaultBuildResp.data)) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), {
            message: `Could not fetch default build for actor ${actorId}`,
        });
    }
    return defaultBuildResp.data;
}
function getDefaultInputsFromBuild(build) {
    var _a, _b;
    const buildInputProperties = (_b = (_a = build === null || build === void 0 ? void 0 : build.actorDefinition) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.properties;
    const defaultInput = {};
    if (buildInputProperties && typeof buildInputProperties === 'object') {
        for (const [key, property] of Object.entries(buildInputProperties)) {
            if (property &&
                typeof property === 'object' &&
                'prefill' in property &&
                property.prefill !== undefined &&
                property.prefill !== null) {
                defaultInput[key] = property.prefill;
            }
        }
    }
    return defaultInput;
}
async function runActorApi(actorId, mergedInput, qs) {
    return await genericFunctions_1.apiRequest.call(this, {
        method: 'POST',
        uri: `/v2/acts/${actorId}/runs`,
        body: mergedInput,
        qs,
    });
}
async function executeActorRunFlow(actorId, mergedInput) {
    var _a;
    const run = await runActorApi.call(this, actorId, mergedInput, { waitForFinish: 0 });
    if (!((_a = run === null || run === void 0 ? void 0 : run.data) === null || _a === void 0 ? void 0 : _a.id)) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), {
            message: `Run ID not found after running the actor`,
        });
    }
    const runId = run.data.id;
    const datasetId = run.data.defaultDatasetId;
    const lastRunData = await genericFunctions_1.pollRunStatus.call(this, runId);
    const resultData = await genericFunctions_1.getResults.call(this, datasetId);
    if ((0, genericFunctions_1.isUsedAsAiTool)(this.getNode().type)) {
        return { json: { ...resultData } };
    }
    return { json: { ...lastRunData, ...resultData } };
}
//# sourceMappingURL=executeActor.js.map