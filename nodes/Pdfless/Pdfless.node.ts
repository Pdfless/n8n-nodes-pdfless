import { IExecuteFunctions, INodeExecutionData, NodeApiError, NodeConnectionTypes, NodeOperationError, type INodeType, type INodeTypeDescription, type JsonObject } from 'n8n-workflow';
import { listDocumentTemplates } from './documentTemplates/listDocumentTemplates';
import { pdflessApiRequest } from './shared/transport';

export class Pdfless implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pdfless',
		name: 'pdfless',
		icon: { light: 'file:../../icons/pdfless.svg', dark: 'file:../../icons/pdfless.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: 'Generate PDF with Pdfless',
		description: 'Generate PDF documents from HTML/CSS templates using PDFless',
		defaults: {
			name: 'Pdfless',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'pdflessApi',
				required: true,
			}
		],
		requestDefaults: {
			baseURL: 'https://api.pdfless.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Template Name or ID',
				name: 'template',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'listDocumentTemplates',
				},
				default: '',
				required: true,
				description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				noDataExpression: false,
			},
			{
				displayName: 'Payload (JSON)',
				name: 'payload',
				type: 'json',
				default: '{}',
				required: true,
				description: 'JSON data injected into the template variables',
				typeOptions: {
					rows: 5
				}
			}
		],
	};

	methods = {
		loadOptions: {
			listDocumentTemplates
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const templateId = this.getNodeParameter('template', itemIndex) as string;
				const payloadRaw = this.getNodeParameter('payload', itemIndex) as string;

				let payload: object;
				try {
					payload = typeof payloadRaw === 'string' ? JSON.parse(payloadRaw) : payloadRaw;
				} catch {
					throw new NodeOperationError(
						this.getNode(),
						'Payload must be valid JSON',
						{ itemIndex },
					);
				}

				const response = await pdflessApiRequest.call(this, 'POST', '/v1/pdfs', {}, {
					template_id: templateId,
					payload: payload,
				});

				returnData.push({
					json: response,
					pairedItem: { item: itemIndex },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: items[itemIndex].json, pairedItem: { item: itemIndex }, error });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject);
			}
		}

		return [returnData];
	}
}
