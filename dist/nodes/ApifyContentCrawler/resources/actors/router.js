"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actorsRouter = actorsRouter;
const n8n_workflow_1 = require("n8n-workflow");
const run_actor_standard_1 = require("./run-actor-standard");
const run_actor_advanced_1 = require("./run-actor-advanced");
const execute_1 = require("./run-actor-standard/execute");
const execute_2 = require("./run-actor-advanced/execute");
async function actorsRouter(i) {
    const operation = this.getNodeParameter('operation', i);
    switch (operation) {
        case run_actor_standard_1.name:
            return await execute_1.runActor.call(this, i);
        case run_actor_advanced_1.name:
            return await execute_2.runActor.call(this, i);
        default:
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Operation ${operation} not found. Please use correct operation.`);
    }
}
//# sourceMappingURL=router.js.map