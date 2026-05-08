import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_YSBzpR73.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_ZpHkZyQi.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/kelsi/ichnos/","cacheDir":"file:///C:/Users/kelsi/ichnos/node_modules/.astro/","outDir":"file:///C:/Users/kelsi/ichnos/dist/","srcDir":"file:///C:/Users/kelsi/ichnos/src/","publicDir":"file:///C:/Users/kelsi/ichnos/public/","buildClientDir":"file:///C:/Users/kelsi/ichnos/dist/client/","buildServerDir":"file:///C:/Users/kelsi/ichnos/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"contact-us/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact-us","isIndex":false,"type":"page","pattern":"^\\/contact-us\\/?$","segments":[[{"content":"contact-us","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact-us.astro","pathname":"/contact-us","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"cookie-policy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cookie-policy","isIndex":false,"type":"page","pattern":"^\\/cookie-policy\\/?$","segments":[[{"content":"cookie-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cookie-policy.astro","pathname":"/cookie-policy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"documentation/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/documentation","isIndex":false,"type":"page","pattern":"^\\/documentation\\/?$","segments":[[{"content":"documentation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/documentation.astro","pathname":"/documentation","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"facilities/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/facilities","isIndex":false,"type":"page","pattern":"^\\/facilities\\/?$","segments":[[{"content":"facilities","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/facilities.astro","pathname":"/facilities","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"privacy-policy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy-policy","isIndex":false,"type":"page","pattern":"^\\/privacy-policy\\/?$","segments":[[{"content":"privacy-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy-policy.astro","pathname":"/privacy-policy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"terms-of-service/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms-of-service","isIndex":false,"type":"page","pattern":"^\\/terms-of-service\\/?$","segments":[[{"content":"terms-of-service","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms-of-service.astro","pathname":"/terms-of-service","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"use-cases/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/use-cases","isIndex":false,"type":"page","pattern":"^\\/use-cases\\/?$","segments":[[{"content":"use-cases","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/use-cases.astro","pathname":"/use-cases","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.js","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/kelsi/ichnos/src/pages/contact-us.astro",{"propagation":"none","containsHead":true}],["C:/Users/kelsi/ichnos/src/pages/cookie-policy.astro",{"propagation":"none","containsHead":true}],["C:/Users/kelsi/ichnos/src/pages/documentation.astro",{"propagation":"none","containsHead":true}],["C:/Users/kelsi/ichnos/src/pages/facilities.astro",{"propagation":"none","containsHead":true}],["C:/Users/kelsi/ichnos/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/kelsi/ichnos/src/pages/privacy-policy.astro",{"propagation":"none","containsHead":true}],["C:/Users/kelsi/ichnos/src/pages/terms-of-service.astro",{"propagation":"none","containsHead":true}],["C:/Users/kelsi/ichnos/src/pages/use-cases.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@js":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/contact-us@_@astro":"pages/contact-us.astro.mjs","\u0000@astro-page:src/pages/cookie-policy@_@astro":"pages/cookie-policy.astro.mjs","\u0000@astro-page:src/pages/documentation@_@astro":"pages/documentation.astro.mjs","\u0000@astro-page:src/pages/facilities@_@astro":"pages/facilities.astro.mjs","\u0000@astro-page:src/pages/privacy-policy@_@astro":"pages/privacy-policy.astro.mjs","\u0000@astro-page:src/pages/terms-of-service@_@astro":"pages/terms-of-service.astro.mjs","\u0000@astro-page:src/pages/use-cases@_@astro":"pages/use-cases.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BqdkjNAT.mjs","C:/Users/kelsi/ichnos/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_xFiQXiSo.mjs","C:/Users/kelsi/ichnos/src/components/react/ImageReveal":"_astro/ImageReveal.DuKIn5na.js","C:/Users/kelsi/ichnos/src/components/react/FacilityStats":"_astro/FacilityStats.bI0P4DDA.js","@components/react/UseCaseTabs":"_astro/UseCaseTabs.C1L8o3PK.js","@components/react/StatsCards":"_astro/StatsCards.DmEgS4gH.js","@components/react/RFQForm":"_astro/RFQForm.CclO3T_T.js","C:/Users/kelsi/ichnos/src/components/react/FeatureShowcase":"_astro/FeatureShowcase.jKoOeLbb.js","C:/Users/kelsi/ichnos/src/components/react/AnimatedStats":"_astro/AnimatedStats.Babf-WRA.js","@components/react/MobileMenu":"_astro/MobileMenu.C9gwfYPK.js","@astrojs/react/client.js":"_astro/client.BMLm8bxW.js","C:/Users/kelsi/ichnos/src/components/ScrollToTopButton.astro?astro&type=script&index=0&lang.ts":"_astro/ScrollToTopButton.astro_astro_type_script_index_0_lang.C-cNB84R.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/kelsi/ichnos/src/components/ScrollToTopButton.astro?astro&type=script&index=0&lang.ts","const o=document.getElementById(\"scrollToTopBtn\");o&&(window.onscroll=()=>{document.body.scrollTop>100||document.documentElement.scrollTop>100?o.style.display=\"block\":o.style.display=\"none\"},o.onclick=()=>{window.scrollTo({top:0,behavior:\"smooth\"})});"]],"assets":["/_astro/banner-cookie-policy.CjL6q-sJ.webp","/_astro/banner-terms-of-service.EEjptjbm.webp","/_astro/photo-1494790108377-be9c29b29330.wjjISa03.jpg","/_astro/privacy-policy.DrUO7XfD.jpg","/_astro/photo-1551288049-bebda4e38f71.BNUgqogU.jpg","/_astro/photo-1558618666-fcd25c85cd64.CWUx_HYx.jpg","/_astro/photo-1559839734-2b71ea197ec2.DUDH7j0t.jpg","/_astro/photo-1586528116311-ad8dd3c8310d.sDBXY35T.jpg","/_astro/photo-1566576721346-d4a3b4eaeb55.o2VYBXsg.jpg","/_astro/photo-1542838132-92c53300491e.BXis2OHU.jpg","/_astro/photo-1587854692152-cbe660dbde88.-LBX3gny.jpg","/_astro/photo-1507003211169-0a1dd7228f2d.BaQLhsf9.jpg","/_astro/photo-1553413077-190dd305871c.DbeahUQb.jpg","/_astro/photo-1565043589221-1a6fd9ae45c7.DrysXggN.jpg","/_astro/photo-1454165804606-c3d57bc86b40.6GW7JLmf.jpg","/_astro/photo-1518770660439-4636190af475.CJTN5tOe.jpg","/_astro/photo-1607082349566-187342175e2f.BJyGldWu.jpg","/_astro/photo-1601584115197-04ecc0da31d7.Buiz47Qb.jpg","/_astro/logo_tr_mini_no_border.D4sJqY2L.png","/_astro/photo-1552664730-d307ca884978.DYKRtiXr.jpg","/_astro/photo-1581091226825-a6a2a5aee158.BRlYC63s.jpg","/_astro/photo-1522071820081-009f0129c71c.CvoreHAb.jpg","/_astro/photo-1451187580459-43490279c0fa.pVPH3inX.jpg","/_astro/photo-1486406146926-c627a92ad1ab.DbD5IDFI.jpg","/_astro/photo-1450101499163-c8848c66ca85.BySpJ1Ki.jpg","/_astro/photo-1550751827-4bd374c3f58b.D3xExHx6.jpg","/_astro/photo-1521737604893-d14cc237f11d.Cjq8dsZn.jpg","/_astro/contact-us.Dl_ny4zK.css","/AstroFlow - Astrojs Logistics & Manufacturing Website Template.png","/backend-dev.jpg","/customer-support.jpg","/cyber-security-specialist.jpg","/favicon.svg","/frontend-dev.webp","/logo_tr_mini_no_border.png","/seo-specialist.jpg","/speed-metrics.png","/sys-admin.jpg","/_astro/AnimatedStats.Babf-WRA.js","/_astro/circle-check.Cj4BQMfO.js","/_astro/client.BMLm8bxW.js","/_astro/createLucideIcon.Dn4G9wGR.js","/_astro/FacilityStats.bI0P4DDA.js","/_astro/FeatureShowcase.jKoOeLbb.js","/_astro/ImageReveal.DuKIn5na.js","/_astro/index.CPmIgwol.js","/_astro/index.DhY--VwN.js","/_astro/index.DT7B91cg.js","/_astro/index.npjtCNTr.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/MobileMenu.C9gwfYPK.js","/_astro/package.DjBq3rou.js","/_astro/positions.BxS__qN2.js","/_astro/proxy.CkszQvBj.js","/_astro/RFQForm.CclO3T_T.js","/_astro/site.DB_yhfGc.js","/_astro/StatsCards.DmEgS4gH.js","/_astro/UseCaseTabs.C1L8o3PK.js","/_astro/users.B_FVtKLn.js","/contact-us/index.html","/cookie-policy/index.html","/documentation/index.html","/facilities/index.html","/privacy-policy/index.html","/terms-of-service/index.html","/use-cases/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"gwHT8thf4McLBS0AwJPn4tiI9WFHk3ENJjSB+qNKnug="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
