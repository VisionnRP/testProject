interface Phonebook {
  filter(arg0: (arr: any) => boolean): any;
    id: string;
    email: string;
    fullname: string;
    phone: string;
    phoneId: string;
    isSpecial: boolean;
    isDuplicate: boolean;
}
