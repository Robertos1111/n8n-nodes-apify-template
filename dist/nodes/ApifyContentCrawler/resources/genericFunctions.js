"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequest = apiRequest;
exports.apiRequestAllItems = apiRequestAllItems;
exports.isUsedAsAiTool = isUsedAsAiTool;
exports.pollRunStatus = pollRunStatus;
exports.getResults = getResults;
const n8n_workflow_1 = require("n8n-workflow");
async function apiRequest(requestOptions) {
    var _a;
    const { method, qs, uri, ...rest } = requestOptions;
    const query = qs || {};
    const endpoint = `https://api.apify.com${uri}`;
    const options = {
        json: true,
        ...rest,
        method,
        qs: query,
        url: endpoint,
        headers: {
            'x-apify-integration-platform': 'n8n',
            'x-apify-integration-app-id': 'website-content-crawler-app',
        },
    };
    if (method === 'GET') {
        delete options.body;
    }
    try {
        const authenticationMethod = this.getNodeParameter('authentication', 0);
        try {
            await this.getCredentials(authenticationMethod);
        }
        catch {
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `No valid credentials found for ${authenticationMethod}. Please configure them first.`);
        }
        return await this.helpers.requestWithAuthentication.call(this, authenticationMethod, options);
    }
    catch (error) {
        if (((_a = error.constructor) === null || _a === void 0 ? void 0 : _a.name) === 'NodeApiError') {
            throw error;
        }
        if (error.response && error.response.body) {
            throw new n8n_workflow_1.NodeApiError(this.getNode(), error, {
                message: error.response.body,
                description: error.message,
            });
        }
        throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
    }
}
async function apiRequestAllItems(requestOptions) {
    const returnData = [];
    if (!requestOptions.qs)
        requestOptions.qs = {};
    requestOptions.qs.limit = requestOptions.qs.limit || 999;
    let responseData;
    do {
        responseData = await apiRequest.call(this, requestOptions);
        returnData.push(responseData);
    } while (requestOptions.qs.limit <= responseData.length);
    const combinedData = {
        data: {
            total: 0,
            count: 0,
            offset: 0,
            limit: 0,
            desc: false,
            items: [],
        },
    };
    for (const result of returnData) {
        combinedData.data.total += typeof result.total === 'number' ? result.total : 0;
        combinedData.data.count += typeof result.count === 'number' ? result.count : 0;
        combinedData.data.offset += typeof result.offset === 'number' ? result.offset : 0;
        combinedData.data.limit += typeof result.limit === 'number' ? result.limit : 0;
        if (result.data &&
            typeof result.data === 'object' &&
            'items' in result.data &&
            Array.isArray(result.data.items)) {
            combinedData.data.items = [
                ...combinedData.data.items,
                ...result.data.items,
            ];
        }
    }
    return combinedData;
}
function isUsedAsAiTool(nodeType) {
    const parts = nodeType.split('.');
    return parts[parts.length - 1] === 'apifyContentCrawlerTool';
}
async function pollRunStatus(runId) {
    var _a;
    let lastRunData;
    while (true) {
        try {
            const pollResult = await apiRequest.call(this, {
                method: 'GET',
                uri: `/v2/actor-runs/${runId}`,
            });
            const status = (_a = pollResult === null || pollResult === void 0 ? void 0 : pollResult.data) === null || _a === void 0 ? void 0 : _a.status;
            lastRunData = pollResult === null || pollResult === void 0 ? void 0 : pollResult.data;
            if (['SUCCEEDED', 'FAILED', 'TIMED-OUT', 'ABORTED'].includes(status)) {
                break;
            }
        }
        catch (err) {
            throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                message: `Error polling run status: ${err}`,
            });
        }
        await (0, n8n_workflow_1.sleep)(1000);
    }
    return lastRunData;
}
async function getResults(datasetId) {
    let results = await apiRequest.call(this, {
        method: 'GET',
        uri: `/v2/datasets/${datasetId}/items`,
    });
    if (isUsedAsAiTool(this.getNode().type)) {
        results = results.map((item) => ({ markdown: item.markdown }));
    }
    return this.helpers.returnJsonArray(results);
}
//# sourceMappingURL=genericFunctions.js.map