"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runActor = runActor;
const ApifyContentCrawler_node_1 = require("../../../ApifyContentCrawler.node");
const executeActor_1 = require("../../executeActor");
async function runActor(i) {
    var _a;
    const entries = this.getNodeParameter('entries', i, {});
    const crawlerType = this.getNodeParameter('crawlerType', i);
    const build = await executeActor_1.getDefaultBuild.call(this, ApifyContentCrawler_node_1.ACTOR_ID);
    const defaultInput = (0, executeActor_1.getDefaultInputsFromBuild)(build);
    const mergedInput = {
        ...defaultInput,
        crawlerType,
    };
    if ((_a = entries === null || entries === void 0 ? void 0 : entries.entry) === null || _a === void 0 ? void 0 : _a.length) {
        mergedInput.startUrls = entries.entry.map((e) => ({
            url: e.value,
            method: 'GET',
        }));
    }
    return await executeActor_1.executeActorRunFlow.call(this, ApifyContentCrawler_node_1.ACTOR_ID, mergedInput);
}
//# sourceMappingURL=execute.js.map