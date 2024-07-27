export const APPLICATION_CONTEXT = {
    AUTHORIZED: 'authorized',
    UNAUTHORIZED: 'unauthorized',
}
export type ApplicationContext = typeof APPLICATION_CONTEXT[keyof typeof APPLICATION_CONTEXT];
