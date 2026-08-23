import { describe, expect, it } from "vitest";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(__dirname, "..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");

const MD_ROUTES = ["/", "/about", "/contact", "/privacy", "/terms", "/download", "/developers"];

describe("agent-friendly 404s", () => {
  const vercel = JSON.parse(read("vercel.json"));

  it("ships a static 404 document", () => {
    expect(existsSync(resolve(root, "public/404.html"))).toBe(true);
  });

  it("404 body points agents at machine-readable resources", () => {
    const html = read("public/404.html");
    for (const target of ["/llms.txt", "/sitemap.xml", "/.well-known/mcp", "/developers"]) {
      expect(html).toContain(target);
    }
    expect(html).toContain("404");
  });

  it("has no catch-all rewrite that would soft-404 unknown paths", () => {
    const sources: string[] = vercel.rewrites.map((r: { source: string }) => r.source);
    expect(sources).not.toContain("/(.*)");
    expect(sources.some((s) => s.includes("(?!"))).toBe(false);
  });

  it("serves every page route from the router, not from rewrites", () => {
    const routes = readdirSync(resolve(root, "src/routes"));
    for (const file of ["index.tsx", "about.tsx", "contact.tsx", "privacy.tsx", "terms.tsx", "download.tsx", "status.tsx"]) {
      expect(routes, `src/routes/${file} missing`).toContain(file);
    }
    const destinations: string[] = vercel.rewrites.map((r: { destination: string }) => r.destination);
    expect(destinations).not.toContain("/index.html");
  });
});

describe("content without JavaScript", () => {
  const root_tsx = read("src/routes/__root.tsx");

  it("renders a noscript shell for crawlers", () => {
    expect(root_tsx).toContain("<noscript>");
  });

  it("noscript shell carries substantive static text", () => {
    const shell = root_tsx.slice(root_tsx.indexOf("<noscript>"), root_tsx.indexOf("</noscript>"));
    const text = shell.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    expect(text.length).toBeGreaterThan(200);
  });
});

describe("markdown content negotiation", () => {
  const middleware = read("middleware.ts");
  const vercel = JSON.parse(read("vercel.json"));

  it("has a markdown mirror for every negotiated route", () => {
    for (const route of MD_ROUTES) {
      expect(middleware).toContain(`"${route}"`);
    }
    for (const file of ["index", "about", "contact", "privacy", "terms", "download", "developers"]) {
      const p = `public/md/${file}.md`;
      expect(existsSync(resolve(root, p)), `${p} missing`).toBe(true);
      expect(read(p).length).toBeGreaterThan(500);
    }
  });

  it("serves markdown with Vary: Accept", () => {
    expect(middleware).toContain("text/markdown; charset=utf-8");
    expect(middleware).toContain("Accept, Accept-Encoding");
  });

  it("sets Vary: Accept globally via vercel headers", () => {
    const global = vercel.headers.find((h: { source: string }) => h.source === "/(.*)");
    expect(global.headers).toEqual(
      expect.arrayContaining([{ key: "Vary", value: "Accept, Accept-Encoding" }]),
    );
    const md = vercel.headers.find((h: { source: string }) => h.source === "/md/(.*)");
    expect(md.headers.map((h: { key: string }) => h.key)).toContain("Content-Type");
  });
});

describe("developer discoverability and agent instructions", () => {
  const llms = read("public/llms.txt");

  it("publishes a named developer resources page", () => {
    const page = read("public/developers/index.html");
    expect(page).toMatch(/<title>VeloRix[^<]*Developer/);
    expect(page).toContain("<h1>VeloRix Tournaments Developer");
    expect(page).toContain("/.well-known/mcp");
  });

  it("lists developer resources in llms.txt", () => {
    expect(llms).toContain("/developers");
    expect(llms).toContain("/.well-known/mcp");
    expect(llms).toContain("llms-full.txt");
  });

  it("llms.txt has when-to-use guidance and a call path", () => {
    expect(llms).toMatch(/##\s*When to use VeloRix/);
    expect(llms).toContain("Do not use VeloRix for");
    expect(llms).toContain("How an agent should call VeloRix");
  });

  it("developers page is in the sitemap", () => {
    expect(read("public/sitemap.xml")).toContain("/developers</loc>");
  });
});

describe("trust anchor pages", () => {
  it("about, contact and privacy each expose 500+ chars of machine-readable text", () => {
    for (const file of ["about", "contact", "privacy"]) {
      const md = read(`public/md/${file}.md`);
      expect(md.length, `${file}.md too short`).toBeGreaterThan(500);
      expect(md).toContain("service.veloxyra@gmail.com");
    }
  });
});

describe("structured data", () => {
  const root_tsx = read("src/routes/__root.tsx");

  it("emits JSON-LD from the root route", () => {
    const blocks = root_tsx.match(/type: "application\/ld\+json"/g) ?? [];
    expect(blocks.length).toBeGreaterThanOrEqual(4);
  });

  it("Organization schema is complete", () => {
    for (const field of ['"@type": "Organization"', "sameAs", "PostalAddress", "ContactPoint", "logo"]) {
      expect(root_tsx, `Organization missing ${field}`).toContain(field);
    }
    expect(root_tsx).toContain('addressCountry: "IN"');
  });

  it("app schema carries identity fields", () => {
    const idx = root_tsx.indexOf('"@type": "MobileApplication"');
    expect(idx).toBeGreaterThan(-1);
    const block = root_tsx.slice(idx, idx + 1500);
    for (const field of ["name:", "description:", "offers"]) {
      expect(block, `MobileApplication missing ${field}`).toContain(field);
    }
  });
});

describe("MCP manifest", () => {
  const wellKnown = JSON.parse(read("public/.well-known/mcp"));
  const manifest = JSON.parse(read(".lovable/mcp/manifest.json"));

  it("advertises a streamable-http server", () => {
    expect(wellKnown.servers).toHaveLength(1);
    expect(wellKnown.servers[0].transport).toBe("streamable-http");
    expect(wellKnown.servers[0].url).toBe("https://velorix-hub.vercel.app/mcp");
    expect(wellKnown.whenToUse).toBeTruthy();
  });

  it("proxies /mcp to the deployed function", () => {
    const vercel = JSON.parse(read("vercel.json"));
    const proxy = vercel.rewrites.find((r: { source: string }) => r.source === "/mcp");
    expect(proxy.destination).toMatch(/\/functions\/v1\/mcp$/);
  });

  it("well-known tool list matches the built manifest", () => {
    const built = manifest.mcp.tools.map((t: { name: string }) => t.name).sort();
    const advertised = wellKnown.tools.map((t: { name: string }) => t.name).sort();
    expect(advertised).toEqual(built);
    expect(wellKnown.name).toBe(manifest.mcp.server.name);
  });
});

describe("agent-friendly 404 markdown body", () => {
  it("ships a markdown 404 document with recovery links", () => {
    const md = read("public/404.md");
    for (const target of [
      "/llms.txt",
      "/llms-full.txt",
      "/developers",
      "/openapi.json",
      "/api/v1",
      "/.well-known/mcp",
      "/sitemap.xml",
    ]) {
      expect(md).toContain(target);
    }
    expect(md.startsWith("# 404 Not Found")).toBe(true);
  });

  it("leaves unknown-path handling to the framework (no synthetic 404s in middleware)", () => {
    const mw = read("middleware.ts");
    expect(mw).not.toContain("isKnown");
    expect(mw).not.toContain("status: 404");
  });

  it("html 404 links its markdown alternate", () => {
    const html = read("public/404.html");
    expect(html).toContain('type="text/markdown" href="/404.md"');
    expect(html).toContain("/openapi.json");
  });
});

describe("OpenAPI specification", () => {
  const spec = JSON.parse(read("public/openapi.json"));
  const operations = Object.entries(spec.paths).flatMap(([path, item]: [string, any]) =>
    Object.entries(item).map(([method, op]: [string, any]) => ({ path, method, op })),
  );

  it("is OpenAPI 3.1 with server, contact and external docs", () => {
    expect(spec.openapi).toMatch(/^3\.1/);
    expect(spec.servers[0].url).toBe("https://velorix-hub.vercel.app/api/v1");
    expect(spec.info.contact.email).toBeTruthy();
    expect(spec.externalDocs.url).toContain("/developers");
  });

  it("gives every operation a unique operationId, summary and description", () => {
    const ids = operations.map(({ op }) => op.operationId);
    expect(ids.length).toBeGreaterThanOrEqual(5);
    expect(new Set(ids).size).toBe(ids.length);
    for (const { op } of operations) {
      expect(op.operationId).toMatch(/^[a-zA-Z][a-zA-Z0-9]*$/);
      expect(op.summary?.length).toBeGreaterThan(3);
      expect(op.description?.length).toBeGreaterThan(20);
      expect(op.tags?.length).toBeGreaterThan(0);
    }
  });

  it("types every parameter and every response body", () => {
    for (const { op } of operations) {
      for (const raw of op.parameters ?? []) {
        const param = raw.$ref ? spec.components.parameters[raw.$ref.split("/").pop()] : raw;
        expect(param.schema).toBeTruthy();
        expect(param.description).toBeTruthy();
      }
      const success = op.responses["200"];
      expect(success.description).toBeTruthy();
      expect(success.content["application/json"].schema).toBeTruthy();
    }
  });

  it("documents structured JSON errors with code, message and hint", () => {
    const err = spec.components.schemas.Error;
    const props = err.properties.error.properties;
    expect(Object.keys(props).sort()).toEqual(["code", "hint", "message", "retry_after"]);
    expect(props.code.enum).toContain("page_not_found");
    for (const response of Object.values<any>(spec.components.responses)) {
      expect(response.content["application/problem+json"].schema.$ref).toContain("Error");
    }
  });

  it("is reachable at predictable URLs via rewrites", () => {
    const vercel = JSON.parse(read("vercel.json"));
    const sources = vercel.rewrites.map((r: { source: string }) => r.source);
    expect(sources).toContain("/api/openapi.json");
    expect(sources).toContain("/api/v1");
    expect(sources).toContain("/api/v1/:path*");
  });
});

describe("public JSON API implementation", () => {
  const fn = read("supabase/functions/public-api/index.ts");

  it("implements every documented operation path", () => {
    for (const path of ["/pages", "/pages/", "/apk/active", "/status"]) {
      expect(fn).toContain(path);
    }
  });

  it("returns problem+json errors with code, message and hint", () => {
    expect(fn).toContain("application/problem+json");
    expect(fn).toContain("hint");
    expect(fn).toContain("endpoint_not_found");
    expect(fn).toContain("method_not_allowed");
  });

  it("is read-only", () => {
    // No table mutations: only the in-memory rate-limit map is written to.
    expect(fn).not.toMatch(/\b(insert|upsert)\(/);
    expect(fn).not.toMatch(/from\("[a-z_]+"\)[\s\S]{0,80}\.(update|delete)\(/);
    expect(fn).toContain('"Access-Control-Allow-Methods": "GET, HEAD, OPTIONS"');
    expect(fn).not.toContain("SERVICE_ROLE");
  });
});

describe("developer resource discoverability", () => {
  it("llms.txt names the OpenAPI spec and REST API", () => {
    const llms = read("public/llms.txt");
    expect(llms).toContain("/openapi.json");
    expect(llms).toContain("/api/v1");
  });

  it("developers page documents the API surface", () => {
    const html = read("public/developers/index.html");
    const md = read("public/md/developers.md");
    for (const doc of [html, md]) {
      expect(doc).toContain("/openapi.json");
      expect(doc).toContain("listPages");
      expect(doc).toContain("getSiteStatus");
    }
  });

  it("mcp handshake links the OpenAPI spec and REST API", () => {
    const wellKnown = JSON.parse(read("public/.well-known/mcp"));
    expect(wellKnown.openapi).toContain("/openapi.json");
    expect(wellKnown.restApi).toContain("/api/v1");
  });
});

describe("product fact sheets (pricing, features, positioning)", () => {
  it("publishes markdown fact sheets with substantive content", () => {
    for (const file of ["public/md/pricing.md", "public/md/features.md", "public/md/compare.md"]) {
      const doc = read(file);
      expect(doc.length).toBeGreaterThan(800);
      expect(doc).toMatch(/^# /);
    }
  });

  it("pricing sheet states the free app, entry fees and refunds", () => {
    const doc = read("public/md/pricing.md");
    expect(doc).toContain("free to download");
    expect(doc.toLowerCase()).toContain("entry fee");
    expect(doc).toMatch(/refund/i);
  });

  it("comparison sheet states differentiators and limitations", () => {
    const doc = read("public/md/compare.md");
    expect(doc).toMatch(/deliberately differs/i);
    expect(doc).toMatch(/behind larger platforms/i);
  });

  it("fact sheets are discoverable from llms.txt, index.md and developers docs", () => {
    for (const file of ["public/llms.txt", "public/md/index.md", "public/md/developers.md"]) {
      const doc = read(file);
      for (const target of ["/md/pricing.md", "/md/features.md", "/md/compare.md"]) {
        expect(doc).toContain(target);
      }
    }
  });

  it("machine-readable index exposes pricing and positioning text", () => {
    const doc = read("public/md/index.md");
    expect(doc).toContain("/md/pricing.md");
    expect(doc).toContain("/md/compare.md");
  });
});

describe("rate limit, error model, versioning and MCP handshake", () => {
  const spec = JSON.parse(read("public/openapi.json"));
  const fn = read("supabase/functions/public-api/index.ts");
  const ops = Object.values(spec.paths).map((p: any) => p.get);

  it("advertises RFC 9331 rate-limit headers on every API response", () => {
    for (const h of ["RateLimit-Policy", "RateLimit", "X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset"]) {
      expect(fn).toContain(h);
    }
    expect(fn).toContain('"Retry-After"');
    expect(fn).toContain("rate_limited");
    for (const op of ops) {
      expect(Object.keys(op.responses)).toContain("429");
      expect(Object.keys(op.responses["200"].headers)).toEqual(
        expect.arrayContaining(["RateLimit", "RateLimit-Policy", "X-API-Version"]),
      );
    }
    expect(spec.components.responses.RateLimited.headers["Retry-After"]).toBeTruthy();
    for (const op of ops) {
      expect(op.responses["429"].headers["Retry-After"]).toBeTruthy();
    }
  });

  it("gives every operation typed error responses referencing the Error schema", () => {
    for (const op of ops) {
      for (const status of ["400", "405", "429", "500", "502", "503", "default"]) {
        const res = op.responses[status];
        expect(res, `${op.operationId} missing ${status}`).toBeTruthy();
        // Responses are inlined (no $ref indirection) so naive spec readers and
        // function-calling converters still see the typed error schema.
        expect(res.$ref, `${op.operationId} ${status} still uses $ref`).toBeUndefined();
        expect(res.content["application/problem+json"].schema.$ref).toBe("#/components/schemas/Error");
      }
    }
    expect(spec.components.schemas.Error.properties.error.properties.code.enum).toContain("rate_limited");
  });

  it("has unique operationIds and typed parameter schemas on all operations", () => {
    const ids = ops.map((o: any) => o.operationId);
    expect(new Set(ids).size).toBe(ids.length);
    for (const op of ops) {
      expect(op.description.length).toBeGreaterThan(20);
      expect(Array.isArray(op.parameters) && op.parameters.length > 0, `${op.operationId} has no parameters`).toBe(true);
      for (const param of op.parameters) {
        const resolved = param.$ref ? spec.components.parameters[param.$ref.split("/").pop()] : param;
        expect(resolved.schema.type, `${op.operationId} untyped param`).toBeTruthy();
        expect(resolved.description.length).toBeGreaterThan(5);
      }
    }
  });

  it("validates query parameters and returns bad_request", () => {
    expect(fn).toContain("bad_request");
    expect(fn).toContain("'limit' must be an integer between 1 and 100.");
  });

  it("publishes a versioning and deprecation policy", () => {
    const policy = read("public/md/versioning.md");
    for (const token of ["Sunset", "Deprecation", "180", "RateLimit-Policy", "rate_limited"]) {
      expect(policy).toContain(token);
    }
    expect(spec["x-versioning"].policy).toContain("/md/versioning.md");
    expect(fn).toContain('rel="deprecation-policy"');
    expect(fn).toContain('"X-API-Version": API_VERSION');
    expect(read("public/llms.txt")).toContain("/md/versioning.md");
    expect(read("public/sitemap.xml")).toContain("/md/versioning.md");
  });

  it("exposes a live MCP handshake at /.well-known/mcp", () => {
    const mw = read("middleware.ts");
    expect(mw).toContain('"/.well-known/mcp"');
    expect(mw).toContain("MCP_UPSTREAM");
    expect(mw).toContain('request.method === "POST"');
    const manifest = JSON.parse(read("public/.well-known/mcp"));
    expect(manifest.handshake.method).toBe("POST");
    expect(manifest.servers[0].transport).toBe("streamable-http");
    expect(manifest.rateLimit.limit).toBe(120);
  });

  it("publishes developer resources at predictable, name-bearing URLs", () => {
    const vercel = JSON.parse(read("vercel.json"));
    const sources = vercel.rewrites.map((r: { source: string }) => r.source);
    for (const s of ["/docs", "/api-docs", "/.well-known/api-catalog", "/.well-known/openapi.json"]) {
      expect(sources, `${s} rewrite missing`).toContain(s);
    }
    const catalog = JSON.parse(read("public/api-catalog.json"));
    expect(catalog.linkset[0]["service-desc"][0].href).toContain("/openapi.json");
    expect(catalog.linkset[0]["service-desc"][0].title).toContain("VeloRix");
    for (const s of ["/api", "/mcp.json", "/developers.md", "/velorix-openapi.json", "/.well-known/llms.txt"]) {
      expect(sources, `${s} alias missing`).toContain(s);
    }
    const docs = read("public/developers/index.html");
    expect(docs).toContain("VeloRix API rate limits");
    expect(docs).toContain("VeloRix API versioning");
    expect(read("public/md/developers.md")).toContain("VeloRix MCP live handshake");
  });
});

describe("rate-limit and policy headers on document responses", () => {
  const vercel = JSON.parse(read("vercel.json"));
  const globalHeaders = vercel.headers.find((h: { source: string }) => h.source === "/(.*)").headers;
  const byKey = Object.fromEntries(globalHeaders.map((h: { key: string; value: string }) => [h.key, h.value]));

  it("advertises RateLimit headers on every static response", () => {
    for (const key of [
      "RateLimit-Policy",
      "RateLimit",
      "X-RateLimit-Limit",
      "X-RateLimit-Remaining",
      "X-RateLimit-Reset",
      "X-API-Version",
      "Link",
    ]) {
      expect(byKey[key], `${key} missing from global headers`).toBeTruthy();
    }
    expect(byKey["RateLimit-Policy"]).toContain('"default";q=120;w=60');
    expect(byKey["X-API-Version"]).toBe("v1");
    expect(byKey.Link).toContain('rel="deprecation-policy"');
    expect(byKey.Link).toContain('rel="service-desc"');
  });

  it("repeats the same signals from middleware responses", () => {
    const mw = read("middleware.ts");
    expect(mw).toContain("function agentHeaders(");
    expect(mw).toContain('"ratelimit-policy"');
    expect(mw).toContain('rel="deprecation-policy"');
    expect(mw).toMatch(/agentHeaders\(url\.origin/);
  });

  it("documents the static policy alongside the API policy", () => {
    const policy = read("public/md/versioning.md");
    expect(policy).toContain('"static";q=600;w=60');
    expect(policy).toContain("Predictable resource URLs");
    expect(read("public/md/developers.md")).toContain("static-document rate limit headers");
  });
});
