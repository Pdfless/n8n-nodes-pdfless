![Pdfless Logo](pdfless-logo.png)

# n8n-nodes-pdfless

This is an [n8n](https://n8n.io/) community node for [Pdfless](https://pdfless.com) – a scalable and easy way to generate PDFs from HTML and CSS.

Create your templates and generate high-quality PDFs directly from your n8n workflows.

# Prerequisites 
Pdfless account is required, [sign up for free](https://www.pdfless.com) for free to create up to 50 pdfs/month. 

## Installation

Follow the [n8n community node installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).

In your n8n instance:
1. Go to **Settings** > **Community Nodes**
2. Enter `@pdfless/n8n-nodes-pdfless`
3. Click **Install**

## Operations

### Generate PDF

Generate a PDF file based on a template identifier.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template_id` | string (GUID) | Yes | Unique identifier of the template used to generate the PDF |
| `reference_id` | string | No | Identifier that correlates with data from your own system |
| `payload` | JSON | No | Data in JSON format used to populate the template |

#### Example

```json
{
  "template_id": "d9b1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f",
  "reference_id": "invoice-2024-0042",
  "payload": {
    "customer_name": "Acme Corp",
    "invoice_number": "INV-0042",
    "due_date": "2024-06-30",
    "items": [
      { "description": "Consulting", "quantity": 5, "unit_price": 150 },
      { "description": "Support", "quantity": 10, "unit_price": 75 }
    ],
    "total": 1500
  }
}
```

### Generate PDF with encryption

Generate a PDF file based on a template identifier, with optional encryption to protect and restrict access to the document.

#### Encryption options

| Parameter | Type | Description |
|-----------|------|-------------|
| `encryption_user_password` | string | If defined, the document will be encrypted and this password will be required to open it |
| `encryption_owner_password` | string | Owner (permission) password that restricts access to certain document functionalities |
| `encryption_allow_printing` | boolean | Allows the document to be printed |
| `encryption_allow_modifying` | boolean | Allows the document to be modified |
| `encryption_allow_modify_annotations` | boolean | Allows annotations to be added or edited |
| `encryption_allow_content_copying` | boolean | Allows content to be copied from the document |
| `encryption_allow_screenreaders` | boolean | Allows screen readers to access the document content |
| `encryption_allow_form_filling` | boolean | Allows form fields to be filled in |
| `encryption_allow_document_assembly` | boolean | Allows cross-document operations (page insertion, rotation, etc.) |

All encryption parameters are optional. When `encryption_user_password` or `encryption_owner_password` is set, the PDF will be encrypted and permissions can be fine-tuned using the boolean flags above.

#### Example

```json
{
  "template_id": "d9b1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f",
  "reference_id": "invoice-2024-0042",
  "payload": {
    "customer_name": "Acme Corp",
    "invoice_number": "INV-0042",
    "due_date": "2024-06-30",
    "total": 1500
  },
  "encryption_user_password": "<open_secret>",
  "encryption_owner_password": "<owner_secret>",
  "encryption_allow_printing": true,
  "encryption_allow_modifying": false,
  "encryption_allow_modify_annotations": false,
  "encryption_allow_content_copying": false,
  "encryption_allow_screenreaders": true,
  "encryption_allow_form_filling": false,
  "encryption_allow_document_assembly": false
}
```

## Credentials

You need a Pdfless API key. Get one at [app.pdfless.com](https://docs.pdfless.com/authentication).

## Resources

- [Pdfless Website](https://pdfless.com)
- [Pdfless API Documentation](https://docs.pdfless.com/pdfs)
- [Native features](https://docs.pdfless.com/native-features)
- [Smart widgets](https://docs.pdfless.com/widgets)
- [PDFless Dashboard](https://app.pdfless.com)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE)