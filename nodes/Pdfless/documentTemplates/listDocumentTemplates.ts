import type {
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';
import { pdflessApiRequest } from '../shared/transport';

type DocumentTemplateItem = {
	id: string;
	name: string;
	imagePreviewUrl: string;
	pdfPreviewUrl: string;
	created: Date;
	modified: Date;
};

export async function listDocumentTemplates(
	this: ILoadOptionsFunctions
	): Promise<INodePropertyOptions[]> {

	const responseData: DocumentTemplateItem[] = await pdflessApiRequest.call(this, 'GET', '/v1/document-templates', {
		page: 1, 
		pageSize: 100
	});

	return responseData.map((item: DocumentTemplateItem) => ({
		name: item.name,
		value: item.id
	}));
}
