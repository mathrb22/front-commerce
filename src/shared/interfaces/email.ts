export interface IEmailContact {
  id?: number;
  email: string;
  note?: string;
  emailDefault?: boolean;
  exclude?: boolean | undefined;
}
