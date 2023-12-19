export type User = {
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
        password?: string;
        role: string;
    }
}