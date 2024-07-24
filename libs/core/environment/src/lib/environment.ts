export interface Environment {
    auth?: {
        baseUrl: string;
        apiPath: string;
        apiVersion: string;
    };
    apiBaseUrl: string;
    apiPath: string;
    apiVersion: string;
}

export const environment: Environment = {
    auth: {
        baseUrl: 'https://api.realworld.io',
        apiPath: '/api',
        apiVersion: '',
    },
    apiBaseUrl: 'http://localhost:3000',
    apiPath: '/api',
    apiVersion: '',
}
