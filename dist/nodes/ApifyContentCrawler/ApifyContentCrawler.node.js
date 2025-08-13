"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApifyContentCrawler = exports.ACTOR_ID = void 0;
const ApifyContentCrawler_properties_1 = require("./ApifyContentCrawler.properties");
const ApifyContentCrawler_methods_1 = require("./ApifyContentCrawler.methods");
const router_1 = require("./resources/actors/router");
exports.ACTOR_ID = 'aYG0l9s7dbB7j3gbS';
class ApifyContentCrawler {
    constructor() {
        this.description = {
            displayName: 'Apify Scraper for AI Crawling',
            name: 'apifyContentCrawler',
            icon: 'file:apify.svg',
            group: ['transform'],
            version: [1],
            defaultVersion: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Crawl any website and extract text content to feed AI Workflows or LLM applications.',
            defaults: {
                name: 'Apify Scraper for AI Crawling',
            },
            inputs: ["main"],
            outputs: ["main"],
            usableAsTool: true,
            credentials: [
                {
                    displayName: 'Apify API key connection',
                    name: 'apifyApi',
                    required: false,
                    displayOptions: {
                        show: {
                            authentication: ['apifyApi'],
                        },
                    },
                },
                {
                    displayName: 'Apify OAuth2 connection',
                    name: 'apifyOAuth2Api',
                    required: false,
                    displayOptions: {
                        show: {
                            authentication: ['apifyOAuth2Api'],
                        },
                    },
                },
            ],
            properties: ApifyContentCrawler_properties_1.properties,
        };
        this.methods = ApifyContentCrawler_methods_1.methods;
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const data = await router_1.actorsRouter.call(this, i);
            if (Array.isArray(data)) {
                returnData.push(...data);
            }
            else {
                returnData.push(data);
            }
        }
        return [returnData];
    }
}
exports.ApifyContentCrawler = ApifyContentCrawler;
//# sourceMappingURL=ApifyContentCrawler.node.js.map