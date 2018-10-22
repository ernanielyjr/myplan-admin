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
    updatedAt: string; // TODO: date?
    createdAt: string; // TODO: date?
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
    updatedAt: string; // TODO: date?
    createdAt: string; // TODO: date?
    dueDate?: string;  // TODO: date?
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
    updatedAt: string; // TODO: date?
    createdAt: string; // TODO: date?
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
