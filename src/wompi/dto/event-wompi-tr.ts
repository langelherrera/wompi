export class TransactionUpdatedDto {
    event: string;
    data: {
      transaction: {
        id: string;
        amount_in_cents: number;
        reference: string;
        customer_email: string;
        currency: string;
        payment_method_type: string;
        redirect_url: string;
        status: string;
        shipping_address: string | null;
        payment_link_id: string | null;
        payment_source_id: string | null;
      };
    };
    environment: string;
    signature: {
      properties: string[];
      checksum: string;
    };
    timestamp: number;
    sent_at: string;
  }