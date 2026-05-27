import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PdflessApi implements ICredentialType {
	name = 'pdflessApi';
	displayName = 'Pdfless API';
	icon: Icon = { light: 'file:../icons/pdfless.svg', dark: 'file:../icons/pdfless.dark.svg' };

	documentationUrl =
		'https://docs.pdfless.com/authentication';

	properties: INodeProperties[] = [
		{
		displayName: 'API Key',
		name: 'apiKey',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		placeholder: 'ak_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
		headers: { apikey: '={{$credentials.apiKey}}' },
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.pdfless.com',
			url: '/v1/workspaces',
			method: 'GET',
		},
	};
}
