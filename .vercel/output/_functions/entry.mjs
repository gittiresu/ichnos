import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CgbTbvzE.mjs';
import { manifest } from './manifest_BqdkjNAT.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/contact.astro.mjs');
const _page2 = () => import('./pages/contact-us.astro.mjs');
const _page3 = () => import('./pages/cookie-policy.astro.mjs');
const _page4 = () => import('./pages/documentation.astro.mjs');
const _page5 = () => import('./pages/facilities.astro.mjs');
const _page6 = () => import('./pages/privacy-policy.astro.mjs');
const _page7 = () => import('./pages/terms-of-service.astro.mjs');
const _page8 = () => import('./pages/use-cases.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/contact.js", _page1],
    ["src/pages/contact-us.astro", _page2],
    ["src/pages/cookie-policy.astro", _page3],
    ["src/pages/documentation.astro", _page4],
    ["src/pages/facilities.astro", _page5],
    ["src/pages/privacy-policy.astro", _page6],
    ["src/pages/terms-of-service.astro", _page7],
    ["src/pages/use-cases.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "04c17f9f-0eba-45a7-bcde-b24f22182f4f",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
