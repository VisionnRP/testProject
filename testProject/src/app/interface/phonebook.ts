export interface Phonebook {
    id: any;
    loading: boolean;
    fullName: string;
    phoneNumber: string;
    email: string;
    error?: string;
}

export interface Pizza {
    id: number;
    size: string;
    status: string;
}

export interface Post {
    pushKey: string;
    loading: boolean;
    text: string;
    votes: number;
    error?: string;
  }

