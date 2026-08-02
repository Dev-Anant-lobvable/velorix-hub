import { useEffect } from "react";

const BASE_URL = "https://velorix-hub.vercel.app";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>;
};

const setMeta = (selector: string, attr: string, value: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const useSeo = ({ title, description, path, jsonLd }: SeoOptions) => {
  useEffect(() => {
    const previousTitle = document.title;
    const url = `${BASE_URL}${path}`;

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    const canonical =
      document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]') ??
      (() => {
        const link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
        return link;
      })();
    const previousCanonical = canonical.href;
    canonical.href = url;

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.dynamicSeo = "true";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = previousTitle;
      if (previousCanonical) canonical.href = previousCanonical;
      script?.remove();
    };
  }, [title, description, path, jsonLd]);
};

export default useSeo;
