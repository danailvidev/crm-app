export interface IContact {
    $key: string;
    name: string;
    phone?: string;
    contactCompanies: { [key: string]: { name: string } };
}


