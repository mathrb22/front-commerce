export interface IPhoneContact {
  id?: number;
  phoneNumber: string;
  note?: string;
  phoneType?: string;
  phoneDefault?: boolean;
  phoneMask?: string;
  exclude?: boolean;
}
