declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly PUBLIC_URL: string;

    }
}

declare module '*.png' {
    const src: string;
    export default src
}

declare module '*.gif' {
    const src: string;
    export default src
}

declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVElement>>;
    const src: string;
    export default src;
}
declare module '*.jpg' {
    const src: string;
    export default src
}

declare module '*.jpeg' {
    const src: string;
    export default src
}