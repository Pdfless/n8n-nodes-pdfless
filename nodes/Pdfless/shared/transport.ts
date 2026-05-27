import type {
	IHookFunctions,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';

export async function pdflessApiRequest(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	qs: IDataObject = {},
	body: IDataObject | undefined = undefined,
) {

	const options: IHttpRequestOptions = {
		method: method,
		qs,
		body,
		url: `https://api.pdfless.com${resource}`,
		json: true,
	};

	return this.helpers.httpRequestWithAuthentication.call(this, 'pdflessApi', options);
}
