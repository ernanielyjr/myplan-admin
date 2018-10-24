export interface DefaultResponse<T> {
  result: T;
  success: boolean;
}

export namespace AuthPayload {
  export interface Request {
    username: string;
    password: string;
  }

  export interface Response {
    token: string;
  }
}

export namespace CustomerPayload {
  export interface Customer {
    _id: string;
    updatedAt: string;
    createdAt: string;
    name: string;
    documentNumber: string;
    documentType: string;
    responsibleName: string;
    invoiceMaturity: number;
    notes?: string[];
    address: {
      street: string;
      number: string;
      complement?: string;
      neighborhood: string;
      city: string;
      state: string;
      country: string;
    };
    phones: string[];
    emails: string[];
  }
}

export namespace InvoicePayload {
  export interface Invoice {
    _id: string;
    updatedAt: string;
    createdAt: string;
    dueDate?: string;
    month: number;
    year: number;
    _customerId: string;
    closed: boolean;
    amount?: number;
    paymentCode?: string;
    paid: boolean;
    postings?: Posting[];
  }

  export interface Posting {
    _id: string;
    updatedAt: string;
    createdAt: string;
    amount: number;
    type: PostingType;
    description: string;
  }

  export enum PostingType {
    balance = 'balance',
    charges = 'charges',
    income = 'income',
    service = 'service',
  }
}

export namespace EmailPayload {
  export interface Email {
    _id: string;
    updatedAt: string;
    createdAt: string;
    subject: string;
    body: string;
    response?: any;
    sent: boolean;
    attachments: any[];
    bcc: string[];
    cco: string[];
    cc: string[];
  }
}

export namespace ServicePayload {
  export interface Service {
    _id: string;
    updatedAt: string;
    createdAt: string;
    _customerId: string;
    description: string;
    amount: number;
    inactive: boolean;
    recurrenceInterval: number;
    recurrenceType: RecurrenceType;
  }

  export enum RecurrenceType {
    monthly   = 'monthly',
    quarterly = 'quarterly',
    yearly    = 'yearly',
  }
}
