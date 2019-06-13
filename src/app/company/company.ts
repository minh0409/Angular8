export interface ICompany
{
        ID: number;
        Name: string;
        Contacts:
              {
                 FirstName:   string;
                 LastName:    string;
                 Email:       string;
                 PhoneNumber: string;
              };
        Status: string;
        Financial:
              {
                 Profit: number;
                 Orders: number;
              };
        Address:
              {
                Street: string;
                City: string;
                State: string;
                ZipCode: string;
              }
}
