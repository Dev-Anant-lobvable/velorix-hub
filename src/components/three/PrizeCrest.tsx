import { useEffect, useRef } from "react";

/**
 * Lightweight three.js WebGL crest that sits behind the download CTA.
 *
 * Perf rules for mid-range Androids (Poco F7 class):
 * - three.js is dynamically imported, so it is code-split out of the initial JS.
 * - ~320 triangles total (wireframe icosahedron + point halo).
 * - devicePixelRatio capped at 1.5.
 * - the render loop is paused whenever the section is off-screen or the tab
 *   is hidden, and it never runs for prefers-reduced-motion users.
 */
const PrizeCrest = ({ className }: { className?: string }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const boot = async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        return;
      }
      if (disposed || !mountRef.current) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        });
      } catch {
        return; // no WebGL — the CTA still looks fine without it
      }

      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 6);

      const group = new THREE.Group();
      scene.add(group);

      const crest = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.9, 1),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.28,
        }),
      );
      group.add(crest);

      const inner = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.05, 0),
        new THREE.MeshBasicMaterial({
          color: 0x000000,
          wireframe: true,
          transparent: true,
          opacity: 0.35,
        }),
      );
      group.add(inner);

      const haloGeometry = new THREE.BufferGeometry();
      const haloCount = 90;
      const positions = new Float32Array(haloCount * 3);
      for (let i = 0; i < haloCount; i += 1) {
        const angle = (i / haloCount) * Math.PI * 2;
        const radius = 2.6 + Math.sin(i * 1.7) * 0.35;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = Math.sin(angle * 1.3) * 1.1;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      haloGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      const halo = new THREE.Points(
        haloGeometry,
        new THREE.PointsMaterial({
          color: 0xffffff,
          size: 0.045,
          transparent: true,
          opacity: 0.55,
        }),
      );
      group.add(halo);

      let frame = 0;
      let visible = false;
      let last = performance.now();

      const render = (now: number) => {
        const delta = Math.min((now - last) / 1000, 0.05);
        last = now;
        group.rotation.y += delta * 0.28;
        group.rotation.x = Math.sin(now / 4200) * 0.18;
        halo.rotation.y -= delta * 0.12;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };

      const start = () => {
        if (frame || document.hidden) return;
        last = performance.now();
        frame = requestAnimationFrame(render);
      };
      const stop = () => {
        if (!frame) return;
        cancelAnimationFrame(frame);
        frame = 0;
      };

      const observer = new IntersectionObserver((entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible) start();
        else stop();
      });
      observer.observe(mount);

      const onVisibility = () => {
        if (document.hidden) stop();
        else if (visible) start();
      };
      document.addEventListener("visibilitychange", onVisibility);

      const onResize = () => {
        const w = mount.clientWidth || 1;
        const h = mount.clientHeight || 1;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        if (!frame && visible) renderer.render(scene, camera);
      };
      window.addEventListener("resize", onResize);

      renderer.render(scene, camera);

      cleanup = () => {
        stop();
        observer.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("resize", onResize);
        crest.geometry.dispose();
        (crest.material as import("three").Material).dispose();
        inner.geometry.dispose();
        (inner.material as import("three").Material).dispose();
        haloGeometry.dispose();
        (halo.material as import("three").Material).dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    void boot();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
};

export default PrizeCrest;
