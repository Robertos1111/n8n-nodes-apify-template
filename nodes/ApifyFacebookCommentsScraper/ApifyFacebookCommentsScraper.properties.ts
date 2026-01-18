import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		// Facebook URLs (startUrls)
		...((() => {
			const startUrls = context.getNodeParameter('startUrls', itemIndex, {}) as { items?: { value: string }[] };
			return startUrls?.items?.length ? { startUrls: startUrls.items.map(e => e.value) } : {};
		})()),
		// Results amount (resultsLimit)
		resultsLimit: context.getNodeParameter('resultsLimit', itemIndex),
		// Include comment replies (includeNestedComments)
		includeNestedComments: context.getNodeParameter('includeNestedComments', itemIndex),
		// Comments mode (viewOption)
		viewOption: context.getNodeParameter('viewOption', itemIndex),
	};
}

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const actorProperties: INodeProperties[] = [
  {
    "displayName": "Facebook URLs",
    "name": "startUrls",
    "description": "Valid facebook URL",
    "required": true,
    "default": {},
    "type": "fixedCollection",
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "items",
        "displayName": "items",
        "values": [
          {
            "displayName": "item",
            "name": "url",
            "type": "string",
            "default": ""
          }
        ]
      }
    ]
  },
  {
    "displayName": "Results amount",
    "name": "resultsLimit",
    "description": "If this limit is not set as many results as possible are returned",
    "required": false,
    "default": 0,
    "type": "number",
    "typeOptions": {
      "minValue": 1
    }
  },
  {
    "displayName": "Include comment replies",
    "name": "includeNestedComments",
    "description": "If checked, the actor will return up to 3 levels of comments/replies for each post. Note that each reply/comment will be returned as a separate result.",
    "required": false,
    "default": false,
    "type": "boolean"
  },
  {
    "displayName": "Comments mode",
    "name": "viewOption",
    "description": "Choose the way the comments are sorted",
    "required": false,
    "default": "RANKED_UNFILTERED",
    "type": "options",
    "options": [
      {
        "name": "Most relevant",
        "value": "RANKED_THREADED"
      },
      {
        "name": "Newest first",
        "value": "RECENT_ACTIVITY"
      },
      {
        "name": "Non-filtered",
        "value": "RANKED_UNFILTERED"
      }
    ]
  }
];

export const properties: INodeProperties[] = [...actorProperties, ...authenticationProperties];