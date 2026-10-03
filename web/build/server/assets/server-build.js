import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { PassThrough } from 'node:stream';
import { createReadableStreamFromReadable } from '@react-router/node';
import { ServerRouter, UNSAFE_withComponentProps, Outlet, useNavigate, useLocation, Meta, Links, ScrollRestoration, Scripts, useRouteError, useAsyncError, useParams } from 'react-router';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import * as React from 'react';
import { forwardRef, useEffect, createElement, useRef, useState, Component, useCallback } from 'react';
import { useButton } from '@react-aria/button';
import { f as fetchWithHeaders } from './index-CFG3mxXh.js';
import { SessionProvider } from '@hono/auth-js/react';
import { toPng } from 'html-to-image';
import { serializeError } from 'serialize-error';
import { Toaster, toast } from 'sonner';
import { useIdleTimer } from 'react-idle-timer';
import { QueryClient, QueryClientProvider, useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { ChevronDown, ChevronRight, ArrowRight, Quote, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, CheckCircle2, UserRound, Users, Briefcase, Award, TrendingUp, ArrowLeft, AlertCircle, Lock, User, Sun, Moon, Upload, Download, LogOut, Search, ChevronUp, GraduationCap, BadgeCheck, MessageSquare, Send, Trash2, X, List, Shield, Calendar, Globe, Handshake, CheckCircle, Camera, Heart, Sparkles, Play, Star, Video, FileText, ExternalLink, BookOpen, ShieldCheck, Building2 } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useParams as useParams$1 } from 'react-router-dom';
import fg from 'fast-glob';
import 'dotenv/config';
import 'node:async_hooks';
import 'node:process';
import 'node:console';
import 'better-sqlite3';
import 'argon2';
import 'hono';
import 'hono/context-storage';
import 'hono/cors';
import 'hono/proxy';
import 'hono/body-limit';
import 'hono/request-id';
import 'hono/factory';
import '@hono/node-server';
import '@hono/node-server/serve-static';
import 'hono/logger';
import '@auth/core/jwt';
import 'node:path';
import 'node:fs';
import 'node:url';
import '@react-router/dev/routes';
import '@neondatabase/serverless';
import '@auth/core/providers/credentials';
import '@auth/core/providers/google';
import 'node:fs/promises';
import 'hono/cookie';
import 'node:crypto';
import 'qrcode';

const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}

const entryServer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: 'Module' }));

const JSX_RENDER_ID_ATTRIBUTE_NAME = "data-render-id";
function buildGridPlaceholder(w, h) {
  const size = Math.max(w, h);
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 895 895" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="895" height="895" fill="#E9E7E7"/>
<g>
<line x1="447.505" y1="-23" x2="447.505" y2="901" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="447.505" x2="5.66443" y2="447.505" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="278.068" x2="5.66443" y2="278.068" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="57.1505" x2="5.66443" y2="57.1504" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="61.8051" y1="883.671" x2="61.8051" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="282.495" y1="907" x2="282.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="611.495" y1="907" x2="611.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="832.185" y1="883.671" x2="832.185" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="827.53" x2="5.66443" y2="827.53" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="606.613" x2="5.66443" y2="606.612" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="4.3568" y1="4.6428" x2="889.357" y2="888.643" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="-0.3568" y1="894.643" x2="894.643" y2="0.642772" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.5" cy="441.5" r="163.995" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.911" cy="447.911" r="237.407" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="448" cy="442" r="384.495" stroke="#C0C0C0" stroke-width="1.00975"/>
</g>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
function useOptionalRef(ref) {
  const fallbackRef = useRef(null);
  if (ref && "instance" in ref) return fallbackRef;
  return ref ?? fallbackRef;
}
const CreatePolymorphicComponent = /* @__PURE__ */ forwardRef(function CreatePolymorphicComponentRender({
  as,
  children,
  renderId,
  onError,
  ...rest
}, forwardedRef) {
  const props = as === "img" ? {
    ...rest,
    onError: (e) => {
      if (typeof onError === "function") onError(e);
      const img = e.currentTarget;
      const {
        width,
        height
      } = img.getBoundingClientRect();
      img.dataset.hasFallback = "1";
      img.onerror = null;
      img.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
      img.style.objectFit = "cover";
    }
  } : rest;
  const ref = useOptionalRef(forwardedRef);
  useEffect(() => {
    const el = ref && "current" in ref ? ref.current : null;
    if (!el) return;
    if (as !== "img") {
      const placeholder = () => {
        const {
          width,
          height
        } = el.getBoundingClientRect();
        return buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
      };
      const applyBgFallback = () => {
        el.dataset.hasFallback = "1";
        el.style.backgroundImage = `url("${placeholder()}")`;
        el.style.backgroundSize = "cover";
      };
      const probeBg = () => {
        const bg = getComputedStyle(el).backgroundImage;
        const match = /url\(["']?(.+?)["']?\)/.exec(bg);
        const src = match?.[1];
        if (!src) return;
        const probe = new Image();
        probe.onerror = applyBgFallback;
        probe.src = src;
      };
      probeBg();
      const ro2 = new ResizeObserver(([entry]) => {
        if (!el.dataset.hasFallback) return;
        const {
          width,
          height
        } = entry.contentRect;
        el.style.backgroundImage = `url("${buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128)}")`;
      });
      ro2.observe(el);
      const mo = new MutationObserver(probeBg);
      mo.observe(el, {
        attributes: true,
        attributeFilter: ["style", "class"]
      });
      return () => {
        ro2.disconnect();
        mo.disconnect();
      };
    }
    if (!el.dataset.hasFallback) return;
    const ro = new ResizeObserver(([entry]) => {
      const {
        width,
        height
      } = entry.contentRect;
      el.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [as, ref]);
  return /* @__PURE__ */ createElement(as, Object.assign({}, props, {
    ref,
    ...renderId ? {
      [JSX_RENDER_ID_ATTRIBUTE_NAME]: renderId
    } : void 0
  }), children);
});

const globalCssUrl = "/assets/global-COjJ-hwy.css";

function LoadFonts() {
  return /* @__PURE__ */ jsx(Fragment, {});
}

function useDevServerHeartbeat() {
  useIdleTimer({
    throttle: 6e4 * 3,
    timeout: 6e4,
    onAction: () => {
      fetch("/", {
        method: "GET"
      }).catch((error) => {
      });
    }
  });
}

const links = () => [{
  rel: "stylesheet",
  href: globalCssUrl
}];
if (globalThis.window && globalThis.window !== void 0) {
  globalThis.window.fetch = fetchWithHeaders;
}
const LoadFontsSSR = LoadFonts ;
function InternalErrorBoundary({
  error: errorArg
}) {
  const routeError = useRouteError();
  const asyncError = useAsyncError();
  const error = errorArg ?? asyncError ?? routeError;
  const [isOpen, setIsOpen] = useState(false);
  const shouldScale = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const scaleFactor = shouldScale ? 1.02 : 1;
  const copyButtonTextClass = shouldScale ? "text-sm" : "text-xs";
  const copyButtonPaddingClass = shouldScale ? "px-[10px] py-[5px]" : "px-[6px] py-[3px]";
  const postCountRef = useRef(0);
  const lastPostTimeRef = useRef(0);
  const lastErrorKeyRef = useRef(null);
  const MAX_ERROR_POSTS_PER_ERROR = 5;
  const THROTTLE_MS = 1e3;
  useEffect(() => {
    const serialized = serializeError(error);
    const errorKey = JSON.stringify(serialized);
    if (errorKey !== lastErrorKeyRef.current) {
      lastErrorKeyRef.current = errorKey;
      postCountRef.current = 0;
    }
    if (postCountRef.current >= MAX_ERROR_POSTS_PER_ERROR) {
      return;
    }
    const now = Date.now();
    const timeSinceLastPost = now - lastPostTimeRef.current;
    const post = () => {
      if (postCountRef.current >= MAX_ERROR_POSTS_PER_ERROR) {
        return;
      }
      postCountRef.current += 1;
      lastPostTimeRef.current = Date.now();
      window.parent.postMessage({
        type: "sandbox:error:detected",
        error: serialized
      }, "*");
    };
    if (timeSinceLastPost < THROTTLE_MS) {
      const timer = setTimeout(post, THROTTLE_MS - timeSinceLastPost);
      return () => clearTimeout(timer);
    }
    post();
  }, [error]);
  useEffect(() => {
    const animateTimer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(animateTimer);
  }, []);
  const {
    buttonProps: copyButtonProps
  } = useButton({
    onPress: useCallback(() => {
      const toastScale = shouldScale ? 1.2 : 1;
      const toastStyle = {
        padding: `${16 * toastScale}px`,
        background: "#18191B",
        border: "1px solid #2C2D2F",
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: `${280 * toastScale}px`,
        fontSize: `${13 * toastScale}px`,
        display: "flex",
        alignItems: "center",
        gap: `${6 * toastScale}px`,
        justifyContent: "flex-start",
        margin: "0 auto"
      };
      navigator.clipboard.writeText(JSON.stringify(serializeError(error)));
      toast.custom(() => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        style: toastStyle,
        renderId: "render-7ea76a52",
        as: "div",
        children: [/* @__PURE__ */ jsxs("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor",
          height: "20",
          width: "20",
          children: [/* @__PURE__ */ jsx("title", {
            children: "Success"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            fillRule: "evenodd",
            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
            clipRule: "evenodd",
            renderId: "render-3529d5f5",
            as: "path"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-36b576ae",
          as: "span",
          children: "Copied successfully!"
        })]
      }), {
        id: "copy-error-success",
        duration: 3e3
      });
    }, [error, shouldScale])
  }, useRef(null));
  function isInIframe() {
    try {
      return window.parent !== window;
    } catch {
      return true;
    }
  }
  return /* @__PURE__ */ jsx(Fragment, {
    children: !isInIframe() && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: `fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-md z-50 transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`,
      style: {
        width: "75vw"
      },
      renderId: "render-82ce41ab",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-[#18191B] text-[#F2F2F2] rounded-lg p-4 shadow-lg w-full",
        style: scaleFactor !== 1 ? {
          transform: `scale(${scaleFactor})`,
          transformOrigin: "bottom center"
        } : void 0,
        renderId: "render-42de4dfe",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-start gap-3",
          renderId: "render-5cb85da3",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex-shrink-0",
            renderId: "render-fac22f0a",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center",
              renderId: "render-a4ad75e3",
              as: "div",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-black text-[1.125rem] leading-none",
                renderId: "render-638e4040",
                as: "span",
                children: "!"
              })
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-2 flex-1",
            renderId: "render-028f31cd",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex flex-col gap-1",
              renderId: "render-03fb7cee",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "font-light text-[#F2F2F2] text-sm",
                renderId: "render-981cac2b",
                as: "p",
                children: "App Error Detected"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-[#959697] text-sm font-light",
                renderId: "render-96b687bb",
                as: "p",
                children: "It looks like an error occurred while trying to use your app."
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white ${copyButtonTextClass} ${copyButtonPaddingClass} w-fit`,
              type: "button",
              ...copyButtonProps,
              renderId: "render-6dda29c1",
              as: "button",
              children: "Copy error"
            })]
          })]
        })
      })
    })
  });
}
class ErrorBoundaryWrapper extends Component {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx(InternalErrorBoundary, {
        error: this.state.error,
        params: {}
      });
    }
    return this.props.children;
  }
}
function LoaderWrapper({
  loader
}) {
  return /* @__PURE__ */ jsx(Fragment, {
    children: loader()
  });
}
const ClientOnly = ({
  loader
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return /* @__PURE__ */ jsx(ErrorBoundaryWrapper, {
    children: /* @__PURE__ */ jsx(LoaderWrapper, {
      loader
    })
  });
};
function useHmrConnection() {
  const [connected, setConnected] = useState(() => false);
  useEffect(() => {
    return;
  }, []);
  return connected;
}
const healthyResponseType = "sandbox:web:healthcheck:response";
const useHandshakeParent = () => {
  const isHmrConnected = useHmrConnection();
  useEffect(() => {
    const healthyResponse = {
      type: healthyResponseType,
      healthy: isHmrConnected,
      supportsErrorDetected: true
    };
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:web:healthcheck") {
        window.parent.postMessage(healthyResponse, "*");
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage(healthyResponse, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isHmrConnected]);
};
const waitForScreenshotReady = async () => {
  const images = Array.from(document.images);
  await Promise.all(["fonts" in document ? document.fonts.ready : Promise.resolve(), ...images.map((img) => new Promise((resolve) => {
    img.crossOrigin = "anonymous";
    if (img.complete) {
      resolve(true);
      return;
    }
    img.onload = () => resolve(true);
    img.onerror = () => resolve(true);
  }))]);
  await new Promise((resolve) => setTimeout(resolve, 250));
};
const useHandleScreenshotRequest = () => {
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data.type === "sandbox:web:screenshot:request") {
        try {
          await waitForScreenshotReady();
          const width = window.innerWidth;
          const aspectRatio = 16 / 9;
          const height = Math.floor(width / aspectRatio);
          const dataUrl = await toPng(document.body, {
            cacheBust: true,
            skipFonts: false,
            width,
            height,
            style: {
              width: `${width}px`,
              height: `${height}px`,
              margin: "0"
            }
          });
          window.parent.postMessage({
            type: "sandbox:web:screenshot:response",
            dataUrl
          }, "*");
        } catch (error) {
          window.parent.postMessage({
            type: "sandbox:web:screenshot:error",
            error: error instanceof Error ? error.message : String(error)
          }, "*");
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
};
function Layout({
  children
}) {
  useHandshakeParent();
  useHandleScreenshotRequest();
  useDevServerHeartbeat();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname;
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:navigation") {
        navigate(event.data.pathname);
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({
      type: "sandbox:web:ready"
    }, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);
  useEffect(() => {
    if (pathname) {
      window.parent.postMessage({
        type: "sandbox:web:navigation",
        pathname
      }, "*");
    }
  }, [pathname]);
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
        type: "module",
        src: "/src/__create/dev-error-overlay.js"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "/src/__create/favicon.png"
      }), LoadFontsSSR ? /* @__PURE__ */ jsx(LoadFontsSSR, {}) : null]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(ClientOnly, {
        loader: () => children
      }), /* @__PURE__ */ jsx(Toaster, {
        position: isMobile ? "top-center" : "bottom-right"
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx("script", {
        src: "https://kit.fontawesome.com/2c15cc0cc7.js",
        crossOrigin: "anonymous",
        async: true
      })]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(SessionProvider, {
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});

const route0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ClientOnly,
  Layout,
  default: root,
  links,
  useHandleScreenshotRequest,
  useHmrConnection
}, Symbol.toStringTag, { value: 'Module' }));

function RootLayout({
  children
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1e3 * 60 * 5,
        cacheTime: 1e3 * 60 * 30,
        retry: 1,
        refetchOnWindowFocus: false
      }
    }
  }));
  return /* @__PURE__ */ jsx(QueryClientProvider, {
    client: queryClient,
    children
  });
}

const logoSrc = "/assets/yef-logo-cWM50o7q.jpg";

function OptimizedImage({
  loading = "lazy",
  fetchPriority = "auto",
  ...props
}) {
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    ...props,
    loading,
    decoding: "async",
    fetchpriority: fetchPriority,
    renderId: "render-17d5f2bf",
    as: "img"
  });
}

function Header({
  hideUntilScroll = false
}) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [{
    name: "About Us",
    href: "/about"
  }, {
    name: "Gallery",
    href: "/gallery"
  }, {
    name: "Lessons",
    href: "/lessons"
  }];
  const resourcesLinks = [{
    name: "Community",
    href: "/community"
  }, {
    name: "Resources",
    href: "/resources"
  }, {
    name: "FAQ",
    href: "/faq"
  }];
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: `fixed top-0 left-0 right-0 z-50 px-4 pt-4 pb-2 transition-[opacity,transform] duration-300 md:px-0 md:pt-0 md:pb-0 ${hideUntilScroll && !isScrolled ? "pointer-events-none -translate-y-full opacity-0 md:pointer-events-auto md:translate-y-0 md:opacity-100" : "translate-y-0 opacity-100"}`,
      renderId: "render-f695db38",
      as: "header",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: `w-full mx-auto flex flex-col justify-center rounded-3xl border border-transparent transition-all duration-300 max-w-[1600px] ${isScrolled ? `md:max-w-5xl md:h-20 md:px-5 ${isMenuOpen ? "bg-transparent shadow-none backdrop-blur-none" : "bg-slate-950/45 shadow-xl backdrop-blur-xl"} md:border md:border-white/10` : "md:h-24 bg-transparent md:border-0 md:px-4 lg:px-4"}`,
        renderId: "render-a8cd357d",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-between bg-transparent md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:justify-items-stretch rounded-3xl md:rounded-none px-5 py-3 md:px-0 md:py-0 w-full",
          renderId: "render-33b5af30",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            href: "/",
            className: "flex items-center gap-2 group",
            renderId: "render-6b4d0219",
            as: "a",
            children: [/* @__PURE__ */ jsx(OptimizedImage, {
              loading: "eager",
              fetchPriority: "high",
              src: logoSrc,
              alt: "YEF Logo",
              className: "w-10 h-10 md:w-12 md:h-12 rounded-xl object-contain bg-white shadow-none md:shadow-lg group-hover:scale-105 transition-transform"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-white font-bold text-xl md:text-2xl tracking-tight",
              style: {
                fontFamily: "'Dela Gothic One', sans-serif"
              },
              renderId: "render-229f2a03",
              as: "span",
              children: "YEMC"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            onClick: () => setIsMenuOpen(!isMenuOpen),
            type: "button",
            className: "relative flex h-11 w-11 items-center justify-center text-white md:hidden",
            "aria-label": isMenuOpen ? "Close menu" : "Open menu",
            "aria-expanded": isMenuOpen,
            "aria-controls": "mobile-menu",
            renderId: "render-81d31ef9",
            as: "button",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `absolute h-[2.5px] w-6 rounded-full bg-white transition-transform duration-200 ease-out ${isMenuOpen ? "rotate-45" : "-translate-y-[7px]"}`,
              renderId: "render-4cd8100a",
              as: "span"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `absolute h-[2.5px] w-6 rounded-full bg-white transition-all duration-200 ease-out ${isMenuOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`,
              renderId: "render-8609f9bf",
              as: "span"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `absolute h-[2.5px] w-6 rounded-full bg-white transition-transform duration-200 ease-out ${isMenuOpen ? "-rotate-45" : "translate-y-[7px]"}`,
              renderId: "render-e4338d00",
              as: "span"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "hidden md:flex items-center justify-self-center gap-8",
            renderId: "render-c193f23b",
            as: "nav",
            children: [navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                href: link.href,
                className: `font-medium text-sm transition-colors ${isActive ? "text-violet-400 font-bold" : "text-slate-300 hover:text-white"}`,
                renderId: "render-e7393ca3",
                as: "a",
                children: link.name
              }, link.name);
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative group",
              onMouseEnter: () => setIsResourcesOpen(true),
              onMouseLeave: () => setIsResourcesOpen(false),
              renderId: "render-3bba797e",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: `flex items-center gap-1 font-medium text-sm transition-colors ${resourcesLinks.some((r) => r.href === location.pathname) ? "text-violet-400 font-bold" : "text-slate-300 hover:text-white"}`,
                renderId: "render-d17813bd",
                as: "button",
                children: ["Resources", /* @__PURE__ */ jsx(ChevronDown, {
                  size: 16,
                  className: `transition-transform ${isResourcesOpen ? "rotate-180" : ""}`
                })]
              }), isResourcesOpen && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "absolute top-full left-0 pt-2 w-48",
                renderId: "render-c1556585",
                as: "div",
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl",
                  renderId: "render-845d954e",
                  as: "div",
                  children: resourcesLinks.map((link) => {
                    const isActive = location.pathname === link.href;
                    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      href: link.href,
                      className: `block px-6 py-3 transition-colors ${isActive ? "text-white bg-violet-600 font-semibold" : "text-slate-300 hover:text-white hover:bg-slate-800"}`,
                      renderId: "render-f0efc66d",
                      as: "a",
                      children: link.name
                    }, link.name);
                  })
                })
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            href: "/contact",
            className: "hidden md:flex items-center justify-self-end gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-violet-100 group",
            renderId: "render-383083d5",
            as: "a",
            children: ["Contact Us", /* @__PURE__ */ jsx(ChevronRight, {
              size: 16,
              className: "group-hover:translate-x-1 transition-transform"
            })]
          })]
        }), isMenuOpen && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          id: "mobile-menu",
          "aria-label": "Mobile navigation",
          className: "mobile-menu-enter md:hidden mt-2 rounded-3xl border border-white/10 bg-slate-950/45 p-6 flex flex-col gap-4 text-center shadow-xl backdrop-blur-xl",
          renderId: "render-c1f72796",
          as: "nav",
          children: [navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              href: link.href,
              onClick: () => setIsMenuOpen(false),
              className: `font-medium text-base py-2 px-3 rounded-lg transition-all ${isActive ? "text-white bg-violet-600 font-bold" : "text-slate-300 hover:text-white hover:bg-slate-800/50"}`,
              renderId: "render-bc7aeba0",
              as: "a",
              children: link.name
            }, link.name);
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-ed04b43a",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              onClick: () => setIsResourcesOpen(!isResourcesOpen),
              className: `flex items-center justify-center gap-2 w-full font-medium text-base py-2 px-3 rounded-lg transition-all ${resourcesLinks.some((r) => r.href === location.pathname) ? "text-white bg-violet-600 font-bold" : "text-slate-300 hover:text-white hover:bg-slate-800/50"}`,
              renderId: "render-00c10cdc",
              as: "button",
              children: ["Resources", /* @__PURE__ */ jsx(ChevronDown, {
                size: 20,
                className: `transition-transform ${isResourcesOpen ? "rotate-180" : ""}`
              })]
            }), isResourcesOpen && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "mt-2 ml-3 space-y-2",
              renderId: "render-ece4784b",
              as: "div",
              children: resourcesLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  href: link.href,
                  onClick: () => setIsMenuOpen(false),
                  className: `block font-medium py-2 px-3 rounded-lg transition-all ${isActive ? "text-white bg-violet-600 font-semibold" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`,
                  renderId: "render-e07ea64a",
                  as: "a",
                  children: link.name
                }, link.name);
              })
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            href: "/contact",
            onClick: () => setIsMenuOpen(false),
            className: "bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold text-center mt-2",
            renderId: "render-2b3e180f",
            as: "a",
            children: "Contact Us"
          })]
        })]
      })
    })
  });
}

const card1Src = "/assets/632A81(464)%20-%20Copy-DD56OjiC.jpg";

const card2Src = "/assets/632A81(323)%20-%20Copy-D79tYnkW.jpg";

const card3Src = "/assets/632A81(198)%20-%20Copy-C_PCcRao.jpg";

const card4Src = "/assets/632A81(415)%20-%20Copy-45hA0feZ.jpg";

const card5Src = "/assets/632A81(260)%20-%20Copy-D-PHD8aY.jpg";

const people = [{
  src: card1Src,
  alt: "Young executive learning",
  position: "object-center",
  zoom: "scale-[1.6]"
}, {
  src: card2Src,
  alt: "Young executive leader",
  position: "object-center"
}, {
  src: card3Src,
  alt: "YEMC executive speaker",
  position: "object-center",
  zoom: "scale-[1.3]"
}, {
  src: card4Src,
  alt: "YEMC community member",
  position: "object-center",
  zoom: "scale-[1.3]"
}, {
  src: card5Src,
  alt: "YEMC executive speaker",
  position: "object-center",
  zoom: "scale-[1.3]"
}];
const mobileCardPositions = [{
  left: "10%",
  top: "55%",
  width: "clamp(7.5rem, 38vw, 8.5rem)",
  height: "clamp(10rem, 44vw, 10.5rem)",
  rotation: -15,
  zIndex: 1,
  opacity: 0.48
}, {
  left: "32%",
  top: "51%",
  width: "clamp(9.5rem, 48vw, 11rem)",
  height: "clamp(13rem, 58vw, 14rem)",
  rotation: -8,
  zIndex: 2,
  opacity: 0.86
}, {
  left: "50%",
  top: "47%",
  width: "clamp(12rem, 62vw, 14rem)",
  height: "clamp(13rem, 61vw, 15rem)",
  rotation: 0,
  zIndex: 4,
  opacity: 1
}, {
  left: "68%",
  top: "51%",
  width: "clamp(9.5rem, 48vw, 11rem)",
  height: "clamp(13rem, 58vw, 14rem)",
  rotation: 8,
  zIndex: 2,
  opacity: 0.86
}, {
  left: "90%",
  top: "55%",
  width: "clamp(7.5rem, 38vw, 8.5rem)",
  height: "clamp(10rem, 44vw, 10.5rem)",
  rotation: 15,
  zIndex: 1,
  opacity: 0.48
}];
function PortraitCard({
  person,
  index,
  className = "",
  style,
  animated = true
}) {
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: `${animated ? "hero-card-slide hero-card-enter" : ""} relative aspect-[0.76] shrink-0 overflow-hidden rounded-[22px] border border-slate-700/80 bg-slate-900 shadow-2xl transition-transform duration-500 hover:-translate-y-3 md:rounded-[28px] ${className}`,
    style: {
      "--hero-card-pop-delay": `${index * 150}ms`,
      ...style
    },
    renderId: "render-f84bbfa3",
    as: "div",
    children: [/* @__PURE__ */ jsx(OptimizedImage, {
      src: person.src,
      alt: person.alt,
      loading: person === people[2] ? "eager" : "lazy",
      fetchPriority: person === people[2] ? "high" : "auto",
      className: `h-full w-full object-cover ${person.position} ${person.zoom || ""}`
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-white/5",
      renderId: "render-140e16b9",
      as: "div"
    })]
  });
}
function MobileCarouselCard({
  person,
  index,
  position
}) {
  return /* @__PURE__ */ jsx(PortraitCard, {
    person,
    index,
    animated: false,
    className: "mobile-carousel-card-enter absolute border-slate-300/70 shadow-2xl",
    style: {
      position: "absolute",
      "--mobile-card-delay": `${350 + Math.abs(index - 2) * 100}ms`,
      left: position.left,
      top: position.top,
      width: position.width,
      height: position.height,
      zIndex: position.zIndex,
      opacity: position.opacity,
      transform: `translate(-50%, calc(-50% + 100svh - 45rem)) rotate(${position.rotation}deg)`,
      transition: "left 600ms cubic-bezier(0.22, 1, 0.36, 1), top 600ms cubic-bezier(0.22, 1, 0.36, 1), width 600ms cubic-bezier(0.22, 1, 0.36, 1), height 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease, transform 600ms cubic-bezier(0.22, 1, 0.36, 1)"
    }
  });
}
function ZigzagRail({
  side
}) {
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    "aria-hidden": "true",
    className: `pointer-events-none absolute top-[22%] hidden h-[390px] w-28 opacity-75 lg:block ${side === "left" ? "left-2 xl:left-8" : "right-2 xl:right-8"}`,
    renderId: "render-2de0e372",
    as: "div",
    children: /* @__PURE__ */ jsxs("svg", {
      className: `hero-zigzag-svg h-full w-full ${side === "right" ? "scale-x-[-1]" : ""}`,
      viewBox: "0 0 112 390",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        renderId: "render-e16f84e2",
        as: "defs",
        children: /* @__PURE__ */ jsxs("linearGradient", {
          id: `zigzag-${side}`,
          x1: "0",
          y1: "0",
          x2: "112",
          y2: "390",
          gradientUnits: "userSpaceOnUse",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            stopColor: "#8B5CF6",
            stopOpacity: "0.15",
            renderId: "render-9c46e905",
            as: "stop"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            offset: "0.5",
            stopColor: "#C4B5FD",
            renderId: "render-b78118cb",
            as: "stop"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            offset: "1",
            stopColor: "#60A5FA",
            stopOpacity: "0.35",
            renderId: "render-28309881",
            as: "stop"
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "hero-zigzag-line",
        d: "M94 4L20 58L94 112L20 166L94 220L20 274L94 328L52 358",
        stroke: `url(#zigzag-${side})`,
        strokeWidth: "3",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        renderId: "render-a6b6a3ca",
        as: "path"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "hero-zigzag-glow",
        d: "M94 4L20 58L94 112L20 166L94 220L20 274L94 328L52 358",
        stroke: `url(#zigzag-${side})`,
        strokeOpacity: "0.2",
        strokeWidth: "10",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        renderId: "render-46d956cf",
        as: "path"
      })]
    })
  });
}
function Hero() {
  const [activeMobileCard, setActiveMobileCard] = useState(2);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let nextCardTimeout;
    const advanceCard = () => {
      setActiveMobileCard((current) => (current + 1) % people.length);
      nextCardTimeout = window.setTimeout(advanceCard, 2600);
    };
    const initialHoldTimeout = window.setTimeout(advanceCard, 2e3);
    return () => {
      window.clearTimeout(initialHoldTimeout);
      window.clearTimeout(nextCardTimeout);
    };
  }, []);
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "relative overflow-hidden bg-slate-950 pt-28 text-white md:pt-36",
    renderId: "render-59f95627",
    as: "section",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(124,58,237,0.16),transparent_34%),linear-gradient(180deg,#020617_0%,#0f172a_70%,#020617_100%)]",
      renderId: "render-94b504a7",
      as: "div"
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative z-10 mx-auto max-w-[1500px] px-5 md:px-10 lg:px-16",
      renderId: "render-cd765d62",
      as: "div",
      children: [/* @__PURE__ */ jsx(ZigzagRail, {
        side: "left"
      }), /* @__PURE__ */ jsx(ZigzagRail, {
        side: "right"
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mx-auto max-w-4xl text-center",
        renderId: "render-aad29f4a",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "hero-title-enter mx-auto max-w-[56rem] font-plus-jakarta text-[clamp(2.75rem,6.4vw,7rem)] font-extrabold leading-[0.94] tracking-tight text-white",
          renderId: "render-a5b0a81f",
          as: "h1",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block",
            renderId: "render-c22b7d05",
            as: "span",
            children: "Young Executive"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400",
            renderId: "render-2c86a8bf",
            as: "span",
            children: "Master Class"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "hero-description-enter mx-auto mt-6 max-w-[42rem] font-plus-jakarta text-[clamp(1.05rem,2vw,1.5rem)] font-semibold leading-[1.35] tracking-[-0.01em] text-violet-200 md:mt-7",
          renderId: "render-26c55790",
          as: "h2",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block",
            renderId: "render-9da72cb4",
            as: "span",
            children: "Empowering the next generation"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block",
            renderId: "render-f8948029",
            as: "span",
            children: "of young business executives"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          href: "/join",
          className: "hero-button-enter group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-violet-950/30 transition-all hover:scale-105 hover:bg-violet-100 md:mt-9 md:px-7 md:py-3.5",
          renderId: "render-c4706ec6",
          as: "a",
          children: ["Register Now", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-white transition-transform group-hover:translate-x-1",
            renderId: "render-deafb0e8",
            as: "span",
            children: /* @__PURE__ */ jsx(ArrowRight, {
              size: 14
            })
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "relative left-1/2 mx-auto mt-10 h-[300px] w-screen max-w-none -translate-x-1/2 sm:h-[320px] md:left-auto md:mt-12 md:h-[410px] md:w-full md:max-w-[1450px] md:translate-x-0 lg:h-[475px]",
        renderId: "render-3d440c5b",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          "aria-label": "YEMC community photos",
          className: "absolute inset-0 overflow-visible md:hidden",
          renderId: "render-0189290d",
          as: "div",
          children: people.map((person, index) => {
            const rawOffset = (index - activeMobileCard + people.length) % people.length;
            const offset = rawOffset > 2 ? rawOffset - people.length : rawOffset;
            return /* @__PURE__ */ jsx(MobileCarouselCard, {
              person,
              index,
              position: mobileCardPositions[offset + 2]
            }, index);
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "absolute left-1/2 top-1/2 hidden w-[112%] -translate-x-1/2 -translate-y-1/2 items-end justify-center gap-2 md:flex sm:gap-3 md:w-[118%] md:gap-5 lg:gap-7",
          renderId: "render-6c23d2a6",
          as: "div",
          children: [/* @__PURE__ */ jsx(PortraitCard, {
            person: people[0],
            index: 0,
            className: "hidden w-[18%] -rotate-[10deg] translate-y-5 md:block"
          }), /* @__PURE__ */ jsx(PortraitCard, {
            person: people[1],
            index: 1,
            className: "w-[22%] -rotate-[6deg] translate-y-3 sm:w-[20%] md:w-[18%]"
          }), /* @__PURE__ */ jsx(PortraitCard, {
            person: people[2],
            index: 2,
            className: "w-[25%] -translate-y-1 border-violet-400/70 shadow-violet-950/40 sm:w-[22%] md:w-[20%]"
          }), /* @__PURE__ */ jsx(PortraitCard, {
            person: people[3],
            index: 3,
            className: "w-[22%] translate-y-3 rotate-[6deg] sm:w-[20%] md:w-[18%]"
          }), /* @__PURE__ */ jsx(PortraitCard, {
            person: people[4],
            index: 4,
            className: "hidden w-[18%] rotate-[10deg] translate-y-5 md:block"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent md:h-32",
          renderId: "render-f200f755",
          as: "div"
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mx-auto grid max-w-4xl border-t border-slate-800/80 pb-12 pt-7 text-center sm:grid-cols-3 sm:text-left md:pb-16",
        renderId: "render-0af69ed8",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "border-slate-800/80 px-5 py-3 sm:border-r",
          renderId: "render-75ee1bd5",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-plus-jakarta text-base font-bold text-white md:text-lg",
            renderId: "render-c67fc7e8",
            as: "h2",
            children: "Executive Leadership"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "mt-2 text-xs leading-5 text-slate-400",
            renderId: "render-b33fcbab",
            as: "p",
            children: "Learn from leaders shaping business, faith, and culture."
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "border-slate-800/80 px-5 py-3 sm:border-r",
          renderId: "render-82fc9c94",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-plus-jakarta text-base font-bold text-white md:text-lg",
            renderId: "render-9eef0561",
            as: "h2",
            children: "Practical Growth"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "mt-2 text-xs leading-5 text-slate-400",
            renderId: "render-5cc6a5ff",
            as: "p",
            children: "Build the skills and clarity to move your work forward."
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "px-5 py-3",
          renderId: "render-9f525bca",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-plus-jakarta text-base font-bold text-white md:text-lg",
            renderId: "render-ef775595",
            as: "h2",
            children: "Purposeful Community"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "mt-2 text-xs leading-5 text-slate-400",
            renderId: "render-6ebd866e",
            as: "p",
            children: "Connect, collaborate, and grow with the next generation."
          })]
        })]
      })]
    })]
  });
}

function Testimonials() {
  const testimonials = [{
    name: "Larry Glover",
    role: "IT head at YEMC",
    image: "https://ucarecdn.com/b4eaf79a-b87d-4810-b811-098932f52071/-/format/auto/",
    content: "YEMC has revolutionized my approach to business leadership. The Christian perspective combined with practical business insights has given me a unique edge in my career development."
  }, {
    name: "Benedicta Afi",
    role: "Community Member",
    image: "https://ucarecdn.com/785f0d16-77f9-4520-8b7b-572a606afa18/-/format/auto/",
    content: "The mentorship program at YEMC has been transformative. The blend of spiritual wisdom and business acumen has helped me make more balanced and ethical decisions in my leadership role."
  }, {
    name: "Nana Efua",
    role: "Community Member",
    image: "https://ucarecdn.com/8b9b1c65-6693-4ae8-8b75-8d886d22c137/-/format/auto/",
    content: "As a young entrepreneur, YEMC provided me with the foundation I needed. The practical resources and spiritual guidance have been instrumental in building my business with integrity."
  }];
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    id: "testimonials",
    className: "py-12 md:py-16 lg:py-24 bg-slate-900 overflow-hidden",
    renderId: "render-0694b928",
    as: "section",
    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-10",
      renderId: "render-8ec8b9c6",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-center",
        renderId: "render-0ee11a8e",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "lg:col-span-1",
          renderId: "render-5f48a432",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-violet-500 font-bold uppercase tracking-widest text-[10px] md:text-xs lg:text-sm mb-2 md:mb-3 lg:mb-4",
            renderId: "render-7a6fd1dc",
            as: "h2",
            children: "Success Stories"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-5 lg:mb-6 font-plus-jakarta",
            renderId: "render-b52fb1cc",
            as: "h3",
            children: "What Our Fellows Say"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-slate-400 text-sm md:text-base lg:text-lg mb-6 md:mb-7 lg:mb-8 leading-relaxed",
            renderId: "render-007ccbf4",
            as: "p",
            children: "Join hundreds of Christian professionals who have transformed their careers and business practices through our masterclass."
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "lg:col-span-2 grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 relative",
          renderId: "render-b056af66",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full",
            renderId: "render-f612a499",
            as: "div"
          }), testimonials.map((t, i) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: `p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl bg-slate-800 border border-slate-700 relative group transition-all duration-300 hover:bg-slate-700/50 ${i === 2 ? "md:col-span-2 lg:col-span-1" : ""}`,
            renderId: "render-f1b0641d",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "absolute top-4 md:top-5 lg:top-6 right-4 md:right-5 lg:right-6 text-violet-500/20 group-hover:text-violet-500 transition-colors",
              renderId: "render-9ac58488",
              as: "div",
              children: /* @__PURE__ */ jsx(Quote, {
                className: "w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10"
              })
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-slate-300 mb-5 md:mb-6 lg:mb-8 italic leading-relaxed relative z-10 text-xs md:text-sm lg:text-base",
              renderId: "render-f0c47452",
              as: "p",
              children: ['"', t.content, '"']
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-slate-500 text-[10px] md:text-xs tracking-wide",
              renderId: "render-74fd6b85",
              as: "p",
              children: t.name
            })]
          }, i))]
        })]
      })
    })
  });
}

function Footer() {
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "bg-slate-950 pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10 border-t border-slate-900 text-center md:text-left",
    renderId: "render-3db11b26",
    as: "footer",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-10",
      renderId: "render-dca3f96a",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-10 md:mb-12 lg:mb-16",
        renderId: "render-2056f458",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "col-span-1 lg:col-span-1",
          renderId: "render-09075bd4",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            href: "/",
            className: "flex items-center justify-center gap-2 mb-4 md:mb-5 lg:mb-6 md:justify-start",
            renderId: "render-d383c913",
            as: "a",
            children: [/* @__PURE__ */ jsx(OptimizedImage, {
              src: "https://ucarecdn.com/9442830f-b64a-4b7c-9724-5bfdf0161590/-/format/auto/",
              alt: "YEMC Logo",
              className: "w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg md:rounded-xl"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-white font-bold text-xl md:text-2xl tracking-tight",
              renderId: "render-5fcdc740",
              as: "span",
              children: "YEMC"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-slate-400 mb-5 md:mb-6 lg:mb-8 leading-relaxed text-sm md:text-base",
            renderId: "render-98c26223",
            as: "p",
            children: "Raising the next generation of Christian business executives."
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex justify-center gap-3 md:gap-4 md:justify-start",
            renderId: "render-5b1e0d0b",
            as: "div",
            children: [Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              href: "#",
              className: "w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500 transition-all",
              renderId: "render-fa4ecc6e",
              as: "a",
              children: /* @__PURE__ */ jsx(Icon, {
                className: "w-4 h-4 md:w-[18px] md:h-[18px]"
              })
            }, i))
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-83998012",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-white font-bold mb-4 md:mb-5 lg:mb-6 text-base md:text-lg",
            renderId: "render-8a5751b3",
            as: "h4",
            children: "Quick Links"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "space-y-2 md:space-y-3 lg:space-y-4",
            renderId: "render-767ef39c",
            as: "ul",
            children: ["About Us", "Our Programs", "Resource Library", "Testimonials", "Privacy Policy"].map((link) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              renderId: "render-8a1a0e20",
              as: "li",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                href: "#",
                className: "text-slate-400 hover:text-violet-400 transition-colors text-sm md:text-base",
                renderId: "render-d951a254",
                as: "a",
                children: link
              })
            }, link))
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-c7fc9a31",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-white font-bold mb-4 md:mb-5 lg:mb-6 text-base md:text-lg",
            renderId: "render-36852884",
            as: "h4",
            children: "Contact Us"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-3 md:space-y-4",
            renderId: "render-dd883546",
            as: "ul",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-start justify-center gap-2 text-center text-slate-400 text-sm md:gap-3 md:text-base md:justify-start md:text-left",
              renderId: "render-3b8e1379",
              as: "li",
              children: [/* @__PURE__ */ jsx(MapPin, {
                className: "w-[18px] h-[18px] md:w-5 md:h-5 text-violet-500 flex-shrink-0 mt-1"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                renderId: "render-4c04f1fd",
                as: "span",
                children: "123 Business Ave, Suite 100, City, ST 12345"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center justify-center gap-2 md:gap-3 text-slate-400 text-sm md:text-base md:justify-start",
              renderId: "render-e434d849",
              as: "li",
              children: [/* @__PURE__ */ jsx(Phone, {
                className: "w-[18px] h-[18px] md:w-5 md:h-5 text-violet-500 flex-shrink-0"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                renderId: "render-3c7b00af",
                as: "span",
                children: "(+233) 26 885-1285"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center justify-center gap-2 md:gap-3 text-slate-400 text-sm md:text-base md:justify-start",
              renderId: "render-29b6aa4b",
              as: "li",
              children: [/* @__PURE__ */ jsx(Mail, {
                className: "w-[18px] h-[18px] md:w-5 md:h-5 text-violet-500 flex-shrink-0"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                renderId: "render-52cf892f",
                as: "span",
                children: "theyoungexecutivemasterclass.com"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-deb5cf98",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-white font-bold mb-4 md:mb-5 lg:mb-6 text-base md:text-lg",
            renderId: "render-87870a0a",
            as: "h4",
            children: "Newsletter"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-slate-400 mb-3 md:mb-4 text-xs md:text-sm",
            renderId: "render-5018f45f",
            as: "p",
            children: "Get executive insights and program updates delivered to your inbox."
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "relative",
            renderId: "render-1de4aad0",
            as: "form",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "email",
              placeholder: "Your email",
              className: "w-full bg-slate-900 border border-slate-800 rounded-lg md:rounded-xl py-2.5 md:py-3 px-3 md:px-4 text-white text-sm md:text-base focus:outline-none focus:border-violet-500 transition-colors",
              renderId: "render-074405bb",
              as: "input"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "absolute right-1 top-1 bottom-1 bg-violet-600 hover:bg-violet-500 text-white px-3 md:px-4 rounded-lg transition-colors font-bold text-xs md:text-sm",
              renderId: "render-a5eff816",
              as: "button",
              children: "Join"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "pt-6 md:pt-7 lg:pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4",
        renderId: "render-e7fba719",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-slate-500 text-xs md:text-sm",
          renderId: "render-06566ac7",
          as: "p",
          children: "© 2025 Young Executive Master Class. All rights reserved."
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-slate-500 text-xs md:text-sm flex items-center gap-1",
          renderId: "render-ac348e1c",
          as: "p",
          children: "Made for the next generation of leaders."
        })]
      })]
    })
  });
}

function HomePage() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }
    const sections = document.querySelectorAll("main > section:not(:first-child)");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -24px 0px"
    });
    sections.forEach((section) => {
      section.classList.add("scroll-reveal");
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  const highlights = [{
    src: "https://ucarecdn.com/4056e7a1-fe00-48dc-8088-7f1082e7a6d5/-/format/auto/",
    title: "Executive Leadership Training",
    description: "Learn from industry veterans in an immersive masterclass session"
  }, {
    src: "https://ucarecdn.com/e44e0eaa-125a-48a9-9d31-91307512c9ad/-/format/auto/",
    title: "Empowering Your Career Growth",
    description: "Access valuable resources and keep growing"
  }, {
    src: "https://ucarecdn.com/fffc5bfd-68fa-474d-94ee-ef5c3f24132b/-/format/auto/",
    title: "Spiritual Foundation",
    description: "Faith-centered leadership"
  }, {
    src: "https://ucarecdn.com/d6e99419-ab1b-45c7-a407-f99dd278a583/-/format/auto/",
    title: "One-on-One Mentorship",
    description: "Personal guidance from experts"
  }, {
    src: "https://ucarecdn.com/2f088fea-7487-4da9-8076-4afcec7d18d1/-/format/auto/",
    title: "Strategic Planning",
    description: "Develop market-ready business plans"
  }];
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200",
    renderId: "render-842349bf",
    as: "div",
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "text-center md:text-left",
      renderId: "render-933a5aaa",
      as: "main",
      children: [/* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        id: "about",
        className: "overflow-x-clip py-8 md:py-16 lg:py-24 bg-slate-950 border-y border-slate-900",
        renderId: "render-ab3264c1",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-10",
          renderId: "render-f48aee9a",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center",
            renderId: "render-0de95694",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative isolate overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-[40px] border border-slate-800 shadow-2xl",
              renderId: "render-d6f38144",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "absolute -top-6 -right-6 z-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-violet-600/20 blur-[100px] rounded-full",
                renderId: "render-94a4dbdb",
                as: "div"
              }), /* @__PURE__ */ jsx(OptimizedImage, {
                src: "/IMG_7335.JPG.jpeg?v=2",
                alt: "YEMC Team Meeting",
                style: {
                  objectPosition: "center 18%"
                },
                className: "relative z-10 w-full h-[250px] md:h-[300px] lg:h-[500px] object-cover"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "absolute inset-x-3 bottom-3 z-20 text-center md:inset-x-5 md:bottom-5 lg:inset-x-8 lg:bottom-8",
                renderId: "render-d7cf14af",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "font-plus-jakarta text-lg font-bold leading-tight tracking-[-0.04em] text-violet-100 drop-shadow-[0_8px_20px_rgba(15,23,42,0.9)] md:text-2xl lg:text-3xl",
                  renderId: "render-f28f19c8",
                  as: "h4",
                  children: "Apostle Ali Asomah Isaac"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "mt-1.5 flex items-center justify-center gap-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-orange-800 md:text-[9px] lg:text-[12px]",
                  renderId: "render-5bf1db16",
                  as: "p",
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    renderId: "render-f8f15d30",
                    as: "span",
                    children: "Founder & CEO"
                  })
                })]
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-0af2930e",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-violet-500 font-bold uppercase tracking-widest text-[10px] md:text-xs lg:text-sm mb-2 md:mb-3 lg:mb-4",
                renderId: "render-5666d9b3",
                as: "h2",
                children: "Our Mission"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-extrabold text-white mb-4 md:mb-6 lg:mb-8 font-plus-jakarta leading-tight",
                renderId: "render-1408117a",
                as: "h3",
                children: ["Empowering Young Leaders to", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400",
                  renderId: "render-a38d038d",
                  as: "span",
                  children: "Transform"
                }), " ", "their Career and Business."]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm md:text-base lg:text-lg xl:text-xl text-slate-400 leading-relaxed mb-4 md:mb-6",
                renderId: "render-9b82a645",
                as: "p",
                children: "Young Executive Master Class started with a simple mission: raising the next generation business executives through mentorship programs and conferences. Founded in 2024, we've gained deep expertise from our team of seasoned executives who have been in the business for over 10 years."
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center justify-center gap-3 md:gap-4 lg:gap-6 md:justify-start",
                renderId: "render-c17a2e21",
                as: "div",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex -space-x-2",
                  renderId: "render-328ceed0",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-slate-950 bg-violet-600 flex items-center justify-center text-white font-bold text-xs md:text-sm lg:text-base",
                    renderId: "render-1479c061",
                    as: "div",
                    children: "ZL"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-slate-950 bg-blue-600 flex items-center justify-center text-white font-bold text-xs md:text-sm lg:text-base",
                    renderId: "render-46c80011",
                    as: "div",
                    children: "E"
                  })]
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-slate-500 italic text-xs md:text-sm lg:text-base",
                  renderId: "render-fae47a7b",
                  as: "p",
                  children: '"Our mentors are CEOs of leading businesses and organizations."'
                })]
              })]
            })]
          })
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-8 md:py-16 lg:py-24 bg-slate-950",
        renderId: "render-630a0184",
        as: "section",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-10",
          renderId: "render-96313da9",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center mb-8 md:mb-12 lg:mb-16",
            renderId: "render-e6023f72",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-violet-500 font-bold uppercase tracking-widest text-[10px] md:text-xs lg:text-sm mb-2 md:mb-3 lg:mb-4",
              renderId: "render-acf1b501",
              as: "h2",
              children: "Experience YEMC"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white font-plus-jakarta px-2",
              renderId: "render-cc6f0eab",
              as: "h3",
              children: "Where Faith Meets Excellence"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8",
            renderId: "render-cbe2bad5",
            as: "div",
            children: highlights.map((item, index) => {
              const isLarge = index === 0;
              return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: `${isLarge ? "md:col-span-2 lg:col-span-2" : ""} relative group overflow-hidden rounded-2xl md:rounded-3xl border border-slate-800 hover:border-violet-500/50 transition-all h-[200px] md:h-auto`,
                renderId: "render-8af02d09",
                as: "div",
                children: [/* @__PURE__ */ jsx(OptimizedImage, {
                  src: item.src,
                  alt: item.title,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent",
                  renderId: "render-d5e7a09d",
                  as: "div"
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "absolute bottom-3 md:bottom-4 lg:bottom-6 left-3 md:left-4 lg:left-6 right-3 md:right-4 lg:right-6",
                  renderId: "render-cee687c3",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: `text-white font-bold mb-1 md:mb-2 font-plus-jakarta ${isLarge ? "text-lg md:text-xl lg:text-2xl xl:text-3xl" : "text-sm md:text-base lg:text-lg"}`,
                    renderId: "render-4e5cb70e",
                    as: "h4",
                    children: item.title
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-slate-300 text-xs md:text-sm lg:text-base",
                    renderId: "render-4e918dcb",
                    as: "p",
                    children: item.description
                  })]
                })]
              }, index);
            })
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-8 md:py-16 lg:py-24 bg-slate-950 relative",
        renderId: "render-b751d596",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-10",
          renderId: "render-dc5b82b7",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center",
            renderId: "render-ec87c722",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative order-2 lg:order-1",
              renderId: "render-0934a5e0",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "absolute -top-10 -left-10 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-violet-600/10 blur-[100px] rounded-full",
                renderId: "render-d8d3407d",
                as: "div"
              }), /* @__PURE__ */ jsx(OptimizedImage, {
                src: "https://ucarecdn.com/e14beff5-d58b-41f7-96a2-7fd11feb0cc0/-/format/auto/",
                alt: "YEMC Impact",
                className: "w-full h-[300px] md:h-[400px] lg:h-[600px] object-cover rounded-2xl md:rounded-3xl lg:rounded-[40px] border border-slate-800 shadow-2xl"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "order-1 lg:order-2",
              renderId: "render-8eba9ba3",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-violet-500 font-bold uppercase tracking-widest text-[10px] md:text-xs lg:text-sm mb-2 md:mb-3 lg:mb-4",
                renderId: "render-5b1341ad",
                as: "h2",
                children: "With YEMC"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-6 lg:mb-8 font-plus-jakarta leading-tight",
                renderId: "render-48375851",
                as: "h3",
                children: ["Unlock endless possibilities for professional", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400",
                  renderId: "render-b36831db",
                  as: "span",
                  children: "growth"
                }), " ", "with the Young Executive Master Class platform."]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-slate-400 text-sm md:text-base lg:text-lg mb-4 md:mb-6 lg:mb-8 leading-relaxed",
                renderId: "render-bff9f7ef",
                as: "p",
                children: "Access a carefully curated collection of resources and materials from our previous master classes, empowering you to continually enhance your skills and stay informed on vital industry insights."
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "space-y-2 md:space-y-3 lg:space-y-4 mb-6 md:mb-8 lg:mb-10",
                renderId: "render-fd2f2a58",
                as: "div",
                children: ["Get the latest updates directly to your inbox", "Career-building resources, free and accessible", "Practical Ethical Leadership Frameworks", "Network, collaborate, and grow"].map((item, i) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-center justify-center gap-2 text-center md:gap-3 md:justify-start md:text-left",
                  renderId: "render-8ebb021e",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CheckCircle2, {
                    className: "w-4 h-4 md:w-5 md:h-5 text-violet-500 flex-shrink-0"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-slate-200 font-medium text-xs md:text-sm lg:text-base",
                    renderId: "render-fa57f52d",
                    as: "span",
                    children: item
                  })]
                }, i))
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                href: "/about",
                className: "group inline-flex items-center gap-2 text-white font-bold text-sm md:text-base lg:text-lg hover:text-violet-400 transition-colors",
                renderId: "render-f3ad9d8d",
                as: "a",
                children: ["Learn more about our mission", /* @__PURE__ */ jsx(ArrowRight, {
                  className: "w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                })]
              })]
            })]
          })
        })
      }), /* @__PURE__ */ jsx(Testimonials, {}), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-8 md:py-12 lg:py-20 px-4 md:px-6 bg-slate-950",
        renderId: "render-5e64afcf",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-5xl mx-auto",
          renderId: "render-2117f212",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-gradient-to-r from-violet-900/40 to-blue-900/40 border border-violet-500/20 rounded-2xl md:rounded-3xl lg:rounded-[40px] p-6 md:p-8 lg:p-12 text-center relative overflow-hidden",
            renderId: "render-f00f6826",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "absolute inset-0",
              renderId: "render-03a89819",
              as: "div",
              children: [/* @__PURE__ */ jsx(OptimizedImage, {
                src: "https://ucarecdn.com/aae1fc13-686a-4f0e-948e-6fc67f0f2a53/-/format/auto/",
                alt: "Background",
                className: "w-full h-full object-cover opacity-20"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "absolute inset-0 bg-gradient-to-r from-violet-900/60 to-blue-900/60",
                renderId: "render-5f5dda58",
                as: "div"
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-violet-500/10 blur-3xl rounded-full",
              renderId: "render-0aa3b998",
              as: "div"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative z-10",
              renderId: "render-cb9bd701",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-3 lg:mb-4 font-plus-jakarta px-2",
                renderId: "render-9c008383",
                as: "h3",
                children: "Ready to Transform Your Leadership?"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-slate-300 text-sm md:text-base lg:text-lg mb-4 md:mb-6 lg:mb-8 max-w-2xl mx-auto px-2",
                renderId: "render-389cd839",
                as: "p",
                children: "Join hundreds of young executives who are growing in faith, strategy, and influence."
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                href: "/contact",
                className: "bg-white text-slate-950 px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-xl md:rounded-2xl font-extrabold text-sm md:text-base lg:text-lg hover:bg-violet-100 transition-all hover:scale-105 shadow-xl inline-flex items-center gap-2",
                renderId: "render-cb45e922",
                as: "a",
                children: ["Get Started", /* @__PURE__ */ jsx(ArrowRight, {
                  className: "w-4 h-4 md:w-5 md:h-5"
                })]
              })]
            })]
          })
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-6 md:py-12 lg:py-16 border-y border-slate-900",
        renderId: "render-514fb5d9",
        as: "section",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto px-4 md:px-6",
          renderId: "render-22359ad8",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-center text-slate-500 font-bold uppercase tracking-widest text-[10px] md:text-xs lg:text-sm mb-4 md:mb-6 lg:mb-8",
            renderId: "render-5d2c9333",
            as: "p",
            children: "Distinguished Sponsors"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12 xl:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500",
            renderId: "render-4d7a8385",
            as: "div",
            children: ["ZoomLion", "Eagles", "Jospon Group", "Benat Auto", "Ivas"].map((brand) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-white tracking-tighter",
              renderId: "render-f8ba4a85",
              as: "span",
              children: brand
            }, brand))
          })]
        })
      })]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
}

const page$g = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(HomePage, {
      ...props
    })
  });
});

const route1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$g
}, Symbol.toStringTag, { value: 'Module' }));

const aboutImage1 = "/assets/632A81(296)%20-%20Copy-BarkfJPD.jpg";

const conferenceImage = "/assets/632A81(264)%20-%20Copy-DzIR4sH_.jpg";

const aboutImage3 = "/assets/632A81(316)%20-%20Copy-_yyo2kml.jpg";

function AboutPage() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }
    const revealTargets = document.querySelectorAll("main > section, main > section img, footer");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -24px 0px"
    });
    revealTargets.forEach((target) => {
      target.classList.add(target instanceof HTMLImageElement ? "scroll-reveal-image" : "scroll-reveal");
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);
  const stats = [{
    value: "500+",
    label: "Alumni",
    icon: /* @__PURE__ */ jsx(Users, {
      size: 28
    })
  }, {
    value: "120+",
    label: "Masterclass Sessions",
    icon: /* @__PURE__ */ jsx(Briefcase, {
      size: 28
    })
  }, {
    value: "50+",
    label: "Mentors",
    icon: /* @__PURE__ */ jsx(Award, {
      size: 28
    })
  }, {
    value: "95%",
    label: "Participant Satisfaction",
    icon: /* @__PURE__ */ jsx(TrendingUp, {
      size: 28
    })
  }];
  const features = [{
    title: "Executive Leadership Training",
    description: "Practical sessions that build confidence, clarity, and strategic leadership for career growth."
  }, {
    title: "Faith-Centered Mentorship",
    description: "Guidance from seasoned leaders who help members navigate business with integrity and purpose."
  }, {
    title: "Career & Business Growth",
    description: "Actionable frameworks for building teams, scaling organizations, and leading with excellence."
  }];
  const team = [{
    name: "Apostle Isaac Ali Asomah",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
  }, {
    name: "Rev. Nora Ali",
    role: "Spiritual Director",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
  }, {
    name: "Mr. C.B Asante",
    role: "Chief Strategy Officer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"
  }, {
    name: "Esther Mensah",
    role: "Program Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80"
  }, {
    name: "Daniel Owusu",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
  }, {
    name: "Grace Boateng",
    role: "Community Director",
    image: "https://images.unsplash.com/photo-1531124136-2c7f6f7d8c09?auto=format&fit=crop&w=800&q=80"
  }, {
    name: "Kwame Mensah",
    role: "Partnerships Lead",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
  }, {
    name: "Adwoa Asante",
    role: "Finance Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80"
  }];
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200",
    renderId: "render-d9252c1f",
    as: "div",
    children: [/* @__PURE__ */ jsx(Header, {
      hideUntilScroll: true
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "lg:pt-24",
      renderId: "render-92e257e1",
      as: "main",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "overflow-hidden bg-slate-950 text-white lg:hidden",
        renderId: "render-1ff14653",
        as: "section",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "relative h-[50svh] min-h-[320px] max-h-[520px] md:h-[56svh] md:max-h-[680px]",
          renderId: "render-c1c43b3e",
          as: "div",
          children: [/* @__PURE__ */ jsx(OptimizedImage, {
            src: conferenceImage,
            alt: "YEMC leadership session",
            loading: "eager",
            fetchPriority: "high",
            className: "about-hero-photo-enter h-full w-full object-cover object-[center_35%]"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "absolute inset-0 bg-gradient-to-b from-slate-950/15 via-transparent to-violet-950/30",
            renderId: "render-1ed8c4ca",
            as: "div"
          }), /* @__PURE__ */ jsx("svg", {
            "aria-hidden": "true",
            className: "pointer-events-none absolute inset-x-0 bottom-0 h-[65%] w-full",
            viewBox: "0 0 1000 400",
            preserveAspectRatio: "none",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              d: "M0 0C120 75 180 370 470 398C650 418 735 340 820 275C884 226 944 210 1000 210V400H0V0Z",
              fill: "#020617",
              renderId: "render-29978e3c",
              as: "path"
            })
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "relative mx-auto -mt-1 max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 md:px-10 lg:pb-24",
          renderId: "render-be5c47e6",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "max-w-3xl",
            renderId: "render-04a4dc47",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "mb-4 text-xs font-semibold uppercase tracking-wide text-violet-300",
              renderId: "render-3e758fbb",
              as: "p",
              children: "About YEMC"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "max-w-2xl font-plus-jakarta text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl",
              renderId: "render-5d81d1db",
              as: "h1",
              children: ["Empowering the", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent",
                renderId: "render-351e9219",
                as: "span",
                children: "Next Generation"
              }), " ", "of Young Business Executives"]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:mt-5 sm:text-base md:text-lg",
              renderId: "render-0a46d313",
              as: "p",
              children: "Young Executive Master Class started with a simple mission: raising the next generation of business executives through mentorship programs and conferences. Founded in 2024, we've gained deep expertise from our team of seasoned executives who have been in the business for over 10 years."
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "mt-5 space-y-3 sm:mt-6",
              renderId: "render-f658a1f1",
              as: "div",
              children: ["Faith-led leadership training for young professionals", "Mentorship and community that strengthen character and business skill", "Practical resources for growing your influence and income"].map((item) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-start gap-2.5 text-sm leading-relaxed text-slate-300 sm:text-base",
                renderId: "render-9647bb29",
                as: "div",
                children: [/* @__PURE__ */ jsx(CheckCircle2, {
                  className: "mt-0.5 h-4 w-4 shrink-0 text-violet-400 sm:h-5 sm:w-5"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-c88782b4",
                  as: "p",
                  children: item
                })]
              }, item))
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "mt-6 flex flex-col gap-3 sm:flex-row sm:items-center",
              renderId: "render-8c0431e2",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                href: "/join",
                className: "inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:from-violet-500 hover:to-blue-500",
                renderId: "render-607ff695",
                as: "a",
                children: ["Apply to YEMC ", /* @__PURE__ */ jsx(ArrowRight, {
                  size: 16
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                href: "/lessons",
                className: "inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-violet-500/60 hover:bg-slate-800",
                renderId: "render-636cd1a6",
                as: "a",
                children: "Explore Lessons"
              })]
            })]
          })
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "relative hidden overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.15),_transparent_30%)] px-6 py-24 text-white lg:block",
        renderId: "render-9eedcc2f",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "mx-auto max-w-7xl",
          renderId: "render-cd696fdb",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]",
            renderId: "render-2427d73d",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "space-y-8",
              renderId: "render-23a61012",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm font-semibold uppercase tracking-[0.35em] text-violet-400",
                renderId: "render-3ea7dadd",
                as: "p",
                children: "About Us"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "max-w-3xl font-plus-jakarta text-5xl font-extrabold leading-tight tracking-tight text-white xl:text-6xl",
                renderId: "render-47b74d21",
                as: "h1",
                children: ["Empowering the", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent",
                  renderId: "render-2ee29703",
                  as: "span",
                  children: "Next Generation"
                }), " ", "of Young Business Executives"]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "max-w-2xl text-lg leading-relaxed text-slate-300",
                renderId: "render-7d734d23",
                as: "p",
                children: "At Young Executive Master Class (YEMC), we are dedicated to raising the next generation of Christian business executives. Our goal is to provide you with the tools, resources, and community support needed to excel in your career while staying grounded in your faith."
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "space-y-4",
                renderId: "render-31ff8805",
                as: "div",
                children: ["Faith-led leadership training for young professionals", "Mentorship and community that strengthen character and business skill", "Practical resources for growing your influence and income"].map((item) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-start gap-4",
                  renderId: "render-e42a8ece",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400",
                    renderId: "render-0919a078",
                    as: "div",
                    children: /* @__PURE__ */ jsx(CheckCircle2, {
                      className: "h-5 w-5"
                    })
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "leading-relaxed text-slate-300",
                    renderId: "render-12fc3841",
                    as: "p",
                    children: item
                  })]
                }, item))
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex gap-4",
                renderId: "render-42b95887",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  href: "/join",
                  className: "inline-flex items-center justify-center rounded-full bg-violet-500 px-8 py-4 text-sm font-semibold text-slate-950 transition hover:bg-violet-400",
                  renderId: "render-669fe42b",
                  as: "a",
                  children: "Apply to YEMC"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  href: "/lessons",
                  className: "inline-flex items-center justify-center rounded-full border border-slate-800 bg-slate-900 px-8 py-4 text-sm font-semibold text-white transition hover:border-violet-500",
                  renderId: "render-c840051b",
                  as: "a",
                  children: "Explore Lessons"
                })]
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "grid h-[540px] grid-cols-2 grid-rows-2 gap-6",
              renderId: "render-82c54b8b",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "relative row-span-2 overflow-hidden rounded-[32px] bg-slate-900 shadow-xl",
                renderId: "render-4b6501d0",
                as: "div",
                children: /* @__PURE__ */ jsx(OptimizedImage, {
                  src: aboutImage1,
                  alt: "YEMC members working together",
                  className: "h-full w-full object-cover transition duration-500 hover:scale-105"
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "overflow-hidden rounded-[32px] bg-slate-900 shadow-xl",
                renderId: "render-4899bf7c",
                as: "div",
                children: /* @__PURE__ */ jsx(OptimizedImage, {
                  src: conferenceImage,
                  alt: "YEMC leadership session",
                  className: "h-full w-full object-cover transition duration-500 hover:scale-105"
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "overflow-hidden rounded-[32px] bg-slate-900 shadow-xl",
                renderId: "render-837d6cc8",
                as: "div",
                children: /* @__PURE__ */ jsx(OptimizedImage, {
                  src: aboutImage3,
                  alt: "YEMC team at work",
                  className: "h-full w-full object-cover transition duration-500 hover:scale-105"
                })
              })]
            })]
          })
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "overflow-x-clip bg-slate-950 px-4 py-12 sm:px-6 sm:py-16 lg:py-20",
        renderId: "render-e4895076",
        as: "section",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12",
          renderId: "render-44b9ef15",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "relative min-w-0",
            renderId: "render-cbed3a42",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "pointer-events-none absolute inset-x-0 top-9 flex h-16 items-center justify-start overflow-hidden px-4 sm:px-6 md:top-16 md:h-20",
              renderId: "render-8a5df480",
              as: "div",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "select-none whitespace-nowrap text-6xl font-extrabold uppercase leading-none tracking-wide text-transparent sm:text-8xl md:text-[clamp(5rem,8.5vw,7.5rem)]",
                style: {
                  WebkitTextStroke: "1px rgba(99,102,241,0.16)"
                },
                renderId: "render-9ff517d7",
                as: "h2",
                children: "MISSION"
              })
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative z-10 px-4 py-10 text-left sm:px-6 md:py-16",
              renderId: "render-273c95ce",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "mb-6 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 sm:text-4xl md:text-5xl lg:text-6xl",
                renderId: "render-92bc1e00",
                as: "h3",
                children: "Mission"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "max-w-3xl text-base leading-relaxed text-slate-400",
                renderId: "render-6cfce803",
                as: "p",
                children: "To raise Next Generation Business Executives through mentorship programs and conferences. We are committed to equipping young professionals with the confidence, strategy, and spiritual values needed to lead with excellence in today’s marketplace."
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "relative min-w-0",
            renderId: "render-d75dfc2a",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "pointer-events-none absolute inset-x-0 top-9 flex h-16 items-center justify-end overflow-hidden px-4 sm:px-6 md:top-16 md:h-20",
              renderId: "render-241a4caf",
              as: "div",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "select-none whitespace-nowrap text-6xl font-extrabold uppercase leading-none tracking-wide text-transparent sm:text-8xl md:text-[clamp(5rem,8.5vw,7.5rem)]",
                style: {
                  WebkitTextStroke: "1px rgba(59,130,246,0.16)"
                },
                renderId: "render-81783cd6",
                as: "h2",
                children: "VISION"
              })
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative z-10 px-4 py-10 text-right sm:px-6 md:py-16",
              renderId: "render-7040ccd0",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "mb-6 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 sm:text-4xl md:text-5xl lg:text-6xl",
                renderId: "render-55320d72",
                as: "h3",
                children: "Vision"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "ml-auto max-w-3xl text-base leading-relaxed text-right text-slate-400",
                renderId: "render-11450320",
                as: "p",
                children: "To roll out mentorship programs aimed at raising Next Generation Business Executives. Our vision is to expand our mentorship network, support emerging leaders, and create a community where faith and competency grow together."
              })]
            })]
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "border-t border-slate-900 bg-slate-950 px-4 py-16 sm:px-6 sm:py-20 lg:py-24",
        renderId: "render-99d3559e",
        as: "section",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16",
          renderId: "render-3d337725",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-6 text-center lg:space-y-8 lg:text-left",
            renderId: "render-7e3c7ef2",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs font-semibold uppercase tracking-[0.22em] text-violet-400 sm:text-sm sm:tracking-[0.35em]",
              renderId: "render-27253dd6",
              as: "p",
              children: "Company Overview"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "mx-auto max-w-3xl text-3xl font-bold leading-tight text-white tracking-tight sm:text-4xl md:text-5xl lg:mx-0",
              renderId: "render-98698cdb",
              as: "h2",
              children: "Developing Young leaders for marketplace success"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "mx-auto max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0",
              renderId: "render-4b62e4fe",
              as: "p",
              children: "YEMC combines expert-led masterclasses, faith-centered mentorship, and an active alumni network to accelerate your professional journey."
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "grid gap-4 sm:grid-cols-2",
              renderId: "render-9731badb",
              as: "div",
              children: features.map((item) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "rounded-2xl border border-slate-800 bg-slate-900 p-5 text-center sm:p-6",
                renderId: "render-870f8eed",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "flex items-center justify-between gap-4",
                  renderId: "render-a1f28839",
                  as: "div",
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-slate-400 text-xs uppercase tracking-[0.25em]",
                    renderId: "render-05d2943b",
                    as: "span",
                    children: "Focus"
                  })
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "mt-4 text-lg font-semibold text-white sm:mt-6 sm:text-xl",
                  renderId: "render-4080a590",
                  as: "h3",
                  children: item.title
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "mt-3 text-slate-400 text-sm leading-relaxed",
                  renderId: "render-5bcb4cfc",
                  as: "p",
                  children: item.description
                })]
              }, item.title))
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "relative mx-auto h-[280px] w-full max-w-2xl sm:h-[360px] lg:h-[540px]",
            renderId: "render-6b438ea6",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "absolute inset-0 rounded-[40px] bg-gradient-to-br from-violet-500/10 to-blue-500/10 blur-3xl",
              renderId: "render-0528d70b",
              as: "div"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "relative overflow-hidden rounded-[40px] border border-slate-800 shadow-xl",
              renderId: "render-c430c382",
              as: "div",
              children: /* @__PURE__ */ jsx(OptimizedImage, {
                src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
                alt: "IT solutions",
                className: "h-full w-full object-cover"
              })
            })]
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "border-t border-slate-900 bg-slate-950 px-4 py-16 sm:px-6 lg:py-20",
        renderId: "render-942ce56b",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto",
          renderId: "render-86b23d23",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4",
            renderId: "render-016c3b03",
            as: "div",
            children: stats.map((item) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center sm:p-6 lg:p-8",
              renderId: "render-9dbe3f08",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400 sm:mb-6 sm:h-14 sm:w-14",
                renderId: "render-de0426b5",
                as: "div",
                children: item.icon
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-3xl font-bold text-white sm:text-4xl",
                renderId: "render-d4a783e4",
                as: "p",
                children: item.value
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "mt-3 text-slate-400 text-sm",
                renderId: "render-7f01eb6d",
                as: "p",
                children: item.label
              })]
            }, item.label))
          })
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "border-t border-slate-900 bg-slate-950 px-4 py-16 sm:px-6 sm:py-20 lg:py-24",
        renderId: "render-46d93696",
        as: "section",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto",
          renderId: "render-f31a15b6",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center mb-16",
            renderId: "render-3f3af31e",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm uppercase tracking-[0.35em] text-violet-400 font-semibold mb-3",
              renderId: "render-bf97f4c7",
              as: "p",
              children: "Leadership Team"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "mx-auto max-w-3xl text-3xl font-bold leading-tight text-white tracking-tight sm:text-4xl md:text-5xl",
              renderId: "render-5bb09e4d",
              as: "h2",
              children: "Meet the leaders guiding YEMC forward"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4",
            renderId: "render-dbc9d6c5",
            as: "div",
            children: team.map((member) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl",
              renderId: "render-88e103bb",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "flex h-56 items-center justify-center overflow-hidden bg-slate-800 sm:h-64 lg:h-80",
                renderId: "render-d3a09691",
                as: "div",
                children: /* @__PURE__ */ jsx(UserRound, {
                  "aria-hidden": "true",
                  className: "h-20 w-20 text-slate-600",
                  strokeWidth: 1.25
                })
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "p-3 sm:p-5 lg:p-6",
                renderId: "render-7f72a198",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-base font-semibold leading-snug text-white sm:text-lg lg:text-xl",
                  renderId: "render-d39365e8",
                  as: "h3",
                  children: member.name
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "mt-2 text-sm text-violet-400 sm:text-base",
                  renderId: "render-69028744",
                  as: "p",
                  children: member.role
                })]
              })]
            }, member.name))
          })]
        })
      })]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
}

const page$f = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(AboutPage, {
      ...props
    })
  });
});

const route2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$f
}, Symbol.toStringTag, { value: 'Module' }));

function useAuth() {
  const callbackUrl = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('callbackUrl') : null;
  const signInWithCredentials = useCallback(async options => {
    const {
      email,
      password,
      redirect,
      callbackUrl: destUrl
    } = options;
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to sign in');
    }
    if (redirect) {
      window.location.href = destUrl || callbackUrl || '/';
    }
    return res;
  }, [callbackUrl]);
  const signUpWithCredentials = useCallback(async options => {
    const {
      email,
      password,
      name,
      redirect,
      callbackUrl: destUrl
    } = options;
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        name
      })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to sign up');
    }
    if (redirect) {
      window.location.href = destUrl || callbackUrl || '/';
    }
    return res;
  }, [callbackUrl]);
  const signOut = useCallback(async options => {
    const {
      callbackUrl: destUrl
    } = options || {};
    await fetch('/api/auth/signout', {
      method: 'POST'
    });
    window.location.href = destUrl || '/';
  }, []);

  // Placeholders to prevent breaking the UI (disabled as requested)
  const signInWithGoogle = useCallback(() => {
    alert("Google Sign in is temporarily disabled.");
  }, []);
  const signInWithFacebook = useCallback(() => {
    alert("Facebook Sign in is temporarily disabled.");
  }, []);
  const signInWithTwitter = useCallback(() => {
    alert("Twitter Sign in is temporarily disabled.");
  }, []);
  const signInWithApple = useCallback(() => {
    alert("Apple Sign in is temporarily disabled.");
  }, []);
  return {
    signInWithCredentials,
    signUpWithCredentials,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signInWithApple,
    signOut
  };
}

function LogoutPage() {
  const {
    signOut
  } = useAuth();
  useEffect(() => {
    const logout = async () => {
      await signOut({
        callbackUrl: "/",
        redirect: true
      });
    };
    logout();
  }, [signOut]);
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "min-h-screen bg-slate-950 flex items-center justify-center",
    renderId: "render-a173bda1",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "text-center",
      renderId: "render-00d50f54",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-4",
        renderId: "render-860413a6",
        as: "div"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-white text-lg",
        renderId: "render-4695122e",
        as: "p",
        children: "Signing out..."
      })]
    })
  });
}

const page$e = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(LogoutPage, {
      ...props
    })
  });
});

const route3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$e
}, Symbol.toStringTag, { value: 'Module' }));

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    signInWithCredentials,
    signInWithGoogle
  } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/admin/applications",
        redirect: true
      });
    } catch (err) {
      console.error("Sign in error:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200 flex items-center justify-center p-6",
    renderId: "render-b32ff78e",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "fixed inset-0 pointer-events-none",
      renderId: "render-4bce52ed",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full",
        renderId: "render-ab9df778",
        as: "div"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full",
        renderId: "render-a0a8e2f6",
        as: "div"
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative z-10 w-full max-w-md",
      renderId: "render-07fbb873",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-8",
        renderId: "render-fdad6402",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          href: "/",
          className: "inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group",
          renderId: "render-d9423f85",
          as: "a",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center group-hover:border-violet-500 transition-all",
            renderId: "render-d3c90c01",
            as: "div",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              size: 18
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-medium",
            renderId: "render-839c0e56",
            as: "span",
            children: "Back to Home"
          })]
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-slate-900 border border-slate-800 rounded-3xl p-8",
        renderId: "render-66f57032",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center mb-8",
          renderId: "render-43e3e5c1",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-3xl md:text-4xl font-extrabold text-white mb-2 font-plus-jakarta",
            renderId: "render-d4cbb832",
            as: "h1",
            children: "Admin Sign In"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-slate-400",
            renderId: "render-1aee4b8c",
            as: "p",
            children: "Access the YEMC admin dashboard"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          onSubmit: handleSubmit,
          className: "space-y-6",
          renderId: "render-b80966a2",
          as: "form",
          children: [error && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-red-500/10 border border-red-500 rounded-xl p-4 flex items-start gap-3",
            renderId: "render-9a09dbbf",
            as: "div",
            children: [/* @__PURE__ */ jsx(AlertCircle, {
              size: 20,
              className: "text-red-400 flex-shrink-0 mt-0.5"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-red-400",
              renderId: "render-fa441a71",
              as: "p",
              children: error
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-6fcf6c77",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              htmlFor: "email",
              className: "block text-white font-bold mb-3 text-sm",
              renderId: "render-33b82e4f",
              as: "label",
              children: "Email Address"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative",
              renderId: "render-1b212c96",
              as: "div",
              children: [/* @__PURE__ */ jsx(Mail, {
                className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500",
                size: 18
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "email",
                id: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                className: "w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors",
                placeholder: "admin@example.com",
                required: true,
                renderId: "render-b54d96a3",
                as: "input"
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-d00461dc",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center justify-between mb-3",
              renderId: "render-d78eb2b6",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                htmlFor: "password",
                className: "block text-white font-bold text-sm",
                renderId: "render-4310748b",
                as: "label",
                children: "Password"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                href: "/forgot-password",
                className: "text-xs text-violet-400 hover:text-violet-300 font-semibold",
                renderId: "render-f5de8913",
                as: "a",
                children: "Forgot password?"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative",
              renderId: "render-a7d98b9e",
              as: "div",
              children: [/* @__PURE__ */ jsx(Lock, {
                className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500",
                size: 18
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "password",
                id: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                className: "w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors",
                placeholder: "••••••••",
                required: true,
                renderId: "render-d5a0e9cc",
                as: "input"
              })]
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            type: "submit",
            disabled: isLoading,
            className: "w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-violet-600/50 disabled:to-blue-600/50 text-white px-8 py-4 rounded-xl font-extrabold text-base shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2",
            renderId: "render-3e3832f7",
            as: "button",
            children: isLoading ? /* @__PURE__ */ jsxs(Fragment, {
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin",
                renderId: "render-a087098c",
                as: "div"
              }), "Signing in..."]
            }) : "Sign In"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "mt-8 mb-6 flex items-center justify-center gap-4",
          renderId: "render-638fee62",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "h-px bg-slate-800 flex-1",
            renderId: "render-30da0792",
            as: "div"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-slate-500 text-sm font-medium",
            renderId: "render-470cf413",
            as: "span",
            children: "or continue with"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "h-px bg-slate-800 flex-1",
            renderId: "render-08116967",
            as: "div"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          onClick: () => signInWithGoogle({
            callbackUrl: "/admin/applications"
          }),
          type: "button",
          className: "w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] flex items-center justify-center gap-3",
          renderId: "render-845f8728",
          as: "button",
          children: [/* @__PURE__ */ jsxs("svg", {
            className: "w-5 h-5",
            viewBox: "0 0 24 24",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
              fill: "#4285F4",
              renderId: "render-70ad4c0f",
              as: "path"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
              fill: "#34A853",
              renderId: "render-d3205289",
              as: "path"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
              fill: "#FBBC05",
              renderId: "render-af9960a3",
              as: "path"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
              fill: "#EA4335",
              renderId: "render-fa7be888",
              as: "path"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              d: "M1 1h22v22H1z",
              fill: "none",
              renderId: "render-4d5c24d1",
              as: "path"
            })]
          }), "Sign in with Google"]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "mt-8 text-center",
          renderId: "render-c94acaab",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-slate-500 text-sm",
            renderId: "render-ce268e32",
            as: "p",
            children: ["Don't have an account?", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              href: "/account/signup",
              className: "text-violet-400 hover:text-violet-300 font-semibold",
              renderId: "render-32745c1b",
              as: "a",
              children: "Create one"
            })]
          })
        })]
      })]
    })]
  });
}

const page$d = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(SignInPage, {
      ...props
    })
  });
});

const route4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$d
}, Symbol.toStringTag, { value: 'Module' }));

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    signUpWithCredentials
  } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    setIsLoading(true);
    try {
      await signUpWithCredentials({
        name: name.trim(),
        email,
        password,
        callbackUrl: "/admin/applications",
        redirect: true
      });
    } catch (err) {
      console.error("Sign up error:", err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200 flex items-center justify-center p-6",
    renderId: "render-3a095277",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "fixed inset-0 pointer-events-none",
      renderId: "render-0ae88169",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full",
        renderId: "render-794823f7",
        as: "div"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full",
        renderId: "render-f919ac74",
        as: "div"
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative z-10 w-full max-w-md",
      renderId: "render-24d6eb84",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-8",
        renderId: "render-68823362",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          href: "/",
          className: "inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group",
          renderId: "render-2936310d",
          as: "a",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center group-hover:border-violet-500 transition-all",
            renderId: "render-9c25637a",
            as: "div",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              size: 18
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-medium",
            renderId: "render-58798c3b",
            as: "span",
            children: "Back to Home"
          })]
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-slate-900 border border-slate-800 rounded-3xl p-8",
        renderId: "render-6acaa875",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center mb-8",
          renderId: "render-515e7e17",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-3xl md:text-4xl font-extrabold text-white mb-2 font-plus-jakarta",
            renderId: "render-33e5cc5c",
            as: "h1",
            children: "Create Admin Account"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-slate-400",
            renderId: "render-83b9eaa5",
            as: "p",
            children: "Set up your YEMC admin dashboard access"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          onSubmit: handleSubmit,
          className: "space-y-6",
          renderId: "render-b549ded7",
          as: "form",
          children: [error && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-red-500/10 border border-red-500 rounded-xl p-4 flex items-start gap-3",
            renderId: "render-915423d3",
            as: "div",
            children: [/* @__PURE__ */ jsx(AlertCircle, {
              size: 20,
              className: "text-red-400 flex-shrink-0 mt-0.5"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-red-400",
              renderId: "render-1e3b1835",
              as: "p",
              children: error
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-03b3dfe6",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              htmlFor: "name",
              className: "block text-white font-bold mb-3 text-sm",
              renderId: "render-3beeb522",
              as: "label",
              children: "Full Name"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative",
              renderId: "render-b7309880",
              as: "div",
              children: [/* @__PURE__ */ jsx(User, {
                className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500",
                size: 18
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                id: "name",
                value: name,
                onChange: (e) => setName(e.target.value),
                className: "w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors",
                placeholder: "John Doe",
                required: true,
                renderId: "render-00be68c2",
                as: "input"
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-29e16b58",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              htmlFor: "email",
              className: "block text-white font-bold mb-3 text-sm",
              renderId: "render-936f596c",
              as: "label",
              children: "Email Address"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative",
              renderId: "render-2372746d",
              as: "div",
              children: [/* @__PURE__ */ jsx(Mail, {
                className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500",
                size: 18
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "email",
                id: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                className: "w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors",
                placeholder: "admin@example.com",
                required: true,
                renderId: "render-30acb1e2",
                as: "input"
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-e2c6e3be",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              htmlFor: "password",
              className: "block text-white font-bold mb-3 text-sm",
              renderId: "render-71f16325",
              as: "label",
              children: "Password"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative",
              renderId: "render-0beff38d",
              as: "div",
              children: [/* @__PURE__ */ jsx(Lock, {
                className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500",
                size: 18
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "password",
                id: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                className: "w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors",
                placeholder: "••••••••",
                required: true,
                minLength: 8,
                renderId: "render-055f0586",
                as: "input"
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "mt-2 text-xs text-slate-500",
              renderId: "render-ca66e6ed",
              as: "p",
              children: "Must be at least 8 characters"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-2648d2ae",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              htmlFor: "confirmPassword",
              className: "block text-white font-bold mb-3 text-sm",
              renderId: "render-2f60a0eb",
              as: "label",
              children: "Confirm Password"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative",
              renderId: "render-b6a3f312",
              as: "div",
              children: [/* @__PURE__ */ jsx(Lock, {
                className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500",
                size: 18
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "password",
                id: "confirmPassword",
                value: confirmPassword,
                onChange: (e) => setConfirmPassword(e.target.value),
                className: "w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors",
                placeholder: "••••••••",
                required: true,
                minLength: 8,
                renderId: "render-3dbcf843",
                as: "input"
              })]
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            type: "submit",
            disabled: isLoading,
            className: "w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-violet-600/50 disabled:to-blue-600/50 text-white px-8 py-4 rounded-xl font-extrabold text-base shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2",
            renderId: "render-73818185",
            as: "button",
            children: isLoading ? /* @__PURE__ */ jsxs(Fragment, {
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin",
                renderId: "render-256fd1a5",
                as: "div"
              }), "Creating account..."]
            }) : "Create Account"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "mt-6 text-center",
          renderId: "render-aa6d044d",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-slate-500 text-sm",
            renderId: "render-df3ee55f",
            as: "p",
            children: ["Already have an account?", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              href: "/account/signin",
              className: "text-violet-400 hover:text-violet-300 font-semibold",
              renderId: "render-e5f97106",
              as: "a",
              children: "Sign in"
            })]
          })
        })]
      })]
    })]
  });
}

const page$c = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(SignUpPage, {
      ...props
    })
  });
});

const route5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$c
}, Symbol.toStringTag, { value: 'Module' }));

const useUser = () => {
  const [user, setUser] = React.useState(null);
  const [status, setStatus] = React.useState('loading');
  const fetchUser = React.useCallback(async () => {
    try {
      const res = await fetch('/api/auth/session');
      if (res.ok) {
        const data = await res.json();
        return data.user || null;
      }
      return null;
    } catch {
      return null;
    }
  }, []);
  const refetchUser = React.useCallback(() => {
    if (process.env.NEXT_PUBLIC_CREATE_ENV === "PRODUCTION") ;
    setStatus('loading');
    fetchUser().then(userData => {
      setUser(userData);
      setStatus(userData ? 'authenticated' : 'unauthenticated');
    });
  }, [fetchUser]);
  React.useEffect(refetchUser, [refetchUser]);
  return {
    user,
    data: user,
    loading: status === 'loading',
    refetch: refetchUser
  };
};

function useApplications(searchQuery) {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["applications", searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      const response = await fetch(`/api/applications/list?${params}`);
      if (!response.ok) throw new Error("Failed to fetch applications");
      return response.json();
    },
    refetchInterval: 30000
  });
  const deleteMutation = useMutation({
    mutationFn: async id => {
      const response = await fetch("/api/applications/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id
        })
      });
      if (!response.ok) throw new Error("Failed to delete application");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
    },
    onError: error => {
      console.error("Error deleting application:", error);
      alert("Failed to delete application. Please try again.");
    }
  });
  return {
    applications: data?.applications || [],
    total: data?.total || 0,
    isLoading,
    error,
    deleteMutation
  };
}

function useTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme") || "dark";
    setTheme(savedTheme);
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("admin-theme", newTheme);
  };
  return {
    theme,
    toggleTheme,
    isDark: theme === "dark"
  };
}

const formatDate = dateString => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};
const formatPhone = phone => {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};
const getFirstName = fullName => {
  if (!fullName) return "Admin";
  return fullName.split(" ")[0];
};

const exportToCSV = applications => {
  if (!applications || applications.length === 0) {
    alert("No applications to export");
    return;
  }
  const headers = ["Full Name", "Email", "Phone", "Status", "Institution", "Message", "Submitted At"];
  const csvRows = [headers.join(",")];
  applications.forEach(app => {
    const row = [`"${app.full_name?.replace(/"/g, '""') || ""}"`, `"${app.email?.replace(/"/g, '""') || ""}"`, `"${app.phone?.replace(/"/g, '""') || ""}"`, `"${app.status?.replace(/"/g, '""') || ""}"`, `"${app.institution?.replace(/"/g, '""') || ""}"`, `"${app.message?.replace(/"/g, '""') || ""}"`, `"${formatDate(app.created_at)}"`];
    csvRows.push(row.join(","));
  });
  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;"
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `yemc-applications-${new Date().toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function AdminHeader({
  user,
  total,
  searchQuery,
  onSearchChange,
  onExport,
  onUpload,
  hasApplications,
  theme,
  onToggleTheme
}) {
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: `${isDark ? "bg-slate-900/50 border-b border-slate-800" : "bg-white/40"} backdrop-blur-md sticky top-0 z-20`,
    renderId: "render-72b8fac3",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-7xl mx-auto px-6 py-8",
      renderId: "render-068fa709",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-start justify-between mb-8",
        renderId: "render-3f8eee98",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-6",
          renderId: "render-db7637ca",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            href: "/",
            className: "flex items-center gap-2 group",
            renderId: "render-f060c3d6",
            as: "a",
            children: [/* @__PURE__ */ jsx(OptimizedImage, {
              src: "https://ucarecdn.com/dcbe7a42-7e7a-473b-96c1-4a135fdecc95/-/format/auto/",
              alt: "YEMC Logo",
              className: "w-12 h-12 rounded-xl shadow-lg group-hover:scale-105 transition-transform"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `font-bold text-2xl tracking-tight ${isDark ? "text-white" : "text-gray-800"}`,
              style: {
                fontFamily: "'Dela Gothic One', sans-serif"
              },
              renderId: "render-ed36bd1e",
              as: "span",
              children: "YEMC"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: `hidden md:block w-px h-12 ${isDark ? "bg-slate-700" : "bg-gray-300"}`,
            renderId: "render-1fe2b4f7",
            as: "div"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "hidden md:block",
            renderId: "render-8b2b58f9",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: `text-3xl font-extrabold mb-1 ${isDark ? "text-white" : "text-gray-800"}`,
              renderId: "render-cef4e6d8",
              as: "h1",
              children: [getGreeting(), ", ", getFirstName(user?.name), "! 👋"]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: `text-base ${isDark ? "text-slate-400" : "text-gray-600"}`,
              renderId: "render-ad213a7f",
              as: "p",
              children: ["Manage your ", total, " application", total !== 1 ? "s" : ""]
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "md:hidden",
          renderId: "render-2cb6d66e",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: `text-2xl font-extrabold mb-1 ${isDark ? "text-white" : "text-gray-800"}`,
            renderId: "render-82ffae1e",
            as: "h1",
            children: [getGreeting(), "! 👋"]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: `text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`,
            renderId: "render-d916ff65",
            as: "p",
            children: [total, " application", total !== 1 ? "s" : ""]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2",
          renderId: "render-d2dc1b0e",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: onToggleTheme,
            className: `p-3 rounded-xl transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`,
            title: `Switch to ${isDark ? "light" : "dark"} mode`,
            renderId: "render-e61a3a32",
            as: "button",
            children: isDark ? /* @__PURE__ */ jsx(Sun, {
              size: 20
            }) : /* @__PURE__ */ jsx(Moon, {
              size: 20
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: `p-3 rounded-xl transition-all cursor-pointer ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`,
            title: "Upload CSV",
            renderId: "render-f29845b6",
            as: "label",
            children: [/* @__PURE__ */ jsx(Upload, {
              size: 20
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "file",
              accept: ".csv",
              onChange: onUpload,
              className: "hidden",
              renderId: "render-31682e2f",
              as: "input"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: onExport,
            disabled: !hasApplications,
            className: `p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`,
            title: "Export to CSV",
            renderId: "render-18ded589",
            as: "button",
            children: /* @__PURE__ */ jsx(Download, {
              size: 20
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            href: "/admin/users",
            className: `p-3 rounded-xl transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`,
            title: "Manage Users",
            renderId: "render-0ad069e0",
            as: "a",
            children: /* @__PURE__ */ jsx(Users, {
              size: 20
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            href: "/account/logout",
            className: `p-3 rounded-xl transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`,
            title: "Logout",
            renderId: "render-809680f1",
            as: "a",
            children: /* @__PURE__ */ jsx(LogOut, {
              size: 20
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            href: "/",
            className: `p-3 rounded-xl transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`,
            title: "Back to Home",
            renderId: "render-e50babde",
            as: "a",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              size: 20
            })
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "relative",
        renderId: "render-a244e053",
        as: "div",
        children: [/* @__PURE__ */ jsx(Search, {
          className: `absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-500" : "text-gray-400"}`,
          size: 20
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          type: "text",
          placeholder: "Search by name, email, or phone...",
          value: searchQuery,
          onChange: (e) => onSearchChange(e.target.value),
          className: `w-full rounded-2xl pl-12 pr-4 py-4 focus:outline-none transition-all ${isDark ? "bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-violet-500" : "bg-white/60 backdrop-blur-sm border border-purple-200/50 text-gray-900 placeholder-gray-400 focus:border-purple-400 shadow-sm"}`,
          renderId: "render-8658c240",
          as: "input"
        })]
      })]
    })
  });
}

function ApplicationCard({
  application,
  onEmail,
  onDelete,
  isDark
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: `rounded-2xl overflow-hidden transition-all ${isDark ? "bg-slate-900 border border-slate-800 hover:border-violet-500/50" : "bg-white/60 backdrop-blur-sm border border-purple-200/50 hover:border-purple-400/70 shadow-sm hover:shadow-md"}`,
    renderId: "render-8d384caa",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      onClick: () => setIsExpanded(!isExpanded),
      className: "w-full p-6 text-left",
      renderId: "render-b4b4f46c",
      as: "button",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center justify-between gap-4",
        renderId: "render-606b230a",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-4 flex-1 min-w-0",
          renderId: "render-e3d74e47",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: `w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-violet-500/10" : "bg-purple-100"}`,
            renderId: "render-2b59f38c",
            as: "div",
            children: /* @__PURE__ */ jsx(User, {
              size: 24,
              className: isDark ? "text-violet-400" : "text-purple-600"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex-1 min-w-0",
            renderId: "render-37716c75",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `font-bold text-lg mb-1 truncate ${isDark ? "text-white" : "text-gray-800"}`,
              renderId: "render-b54be0b8",
              as: "p",
              children: application.full_name
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `text-sm truncate ${isDark ? "text-blue-400" : "text-blue-600"}`,
              renderId: "render-44ffc035",
              as: "p",
              children: application.email
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "hidden md:flex items-center gap-6",
          renderId: "render-a5f9e9a3",
          as: "div",
          children: [application.status && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-right",
            renderId: "render-710204f6",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`,
              renderId: "render-b066300c",
              as: "p",
              children: "Status"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `font-semibold ${isDark ? "text-slate-300" : "text-gray-700"}`,
              renderId: "render-79335ea7",
              as: "p",
              children: application.status
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-right",
            renderId: "render-b56217eb",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`,
              renderId: "render-530fecbf",
              as: "p",
              children: "Submitted"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`,
              renderId: "render-0fbe40ea",
              as: "p",
              children: formatDate(application.created_at)
            })]
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex-shrink-0",
          renderId: "render-631f40a0",
          as: "div",
          children: isExpanded ? /* @__PURE__ */ jsx(ChevronUp, {
            size: 24,
            className: isDark ? "text-slate-400" : "text-gray-400"
          }) : /* @__PURE__ */ jsx(ChevronDown, {
            size: 24,
            className: isDark ? "text-slate-400" : "text-gray-400"
          })
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "md:hidden flex items-center gap-4 mt-3 ml-16",
        renderId: "render-2509a304",
        as: "div",
        children: [application.status && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-eac0488e",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: `text-xs ${isDark ? "text-slate-500" : "text-gray-500"}`,
            renderId: "render-b6966c51",
            as: "p",
            children: ["Status:", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `font-semibold ${isDark ? "text-slate-300" : "text-gray-700"}`,
              renderId: "render-f6258e01",
              as: "span",
              children: application.status
            })]
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-3527a796",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: `text-xs ${isDark ? "text-slate-500" : "text-gray-500"}`,
            renderId: "render-24aa5c45",
            as: "p",
            children: formatDate(application.created_at)
          })
        })]
      })]
    }), isExpanded && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: `px-6 pb-6 ${isDark ? "border-t border-slate-800/50" : "border-t border-purple-100"}`,
      renderId: "render-63060fe8",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid md:grid-cols-2 gap-6 pt-6",
        renderId: "render-9ecbc1a2",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-4",
          renderId: "render-c530e8f3",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-start gap-3",
            renderId: "render-38dd3d76",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-green-500/10" : "bg-green-100"}`,
              renderId: "render-b87abb39",
              as: "div",
              children: /* @__PURE__ */ jsx(Phone, {
                size: 20,
                className: isDark ? "text-green-400" : "text-green-600"
              })
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex-1",
              renderId: "render-cf3853f5",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: `text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`,
                renderId: "render-de136d73",
                as: "p",
                children: "Phone"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                href: `tel:${application.phone}`,
                className: `transition-colors ${isDark ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"}`,
                renderId: "render-d8880a77",
                as: "a",
                children: formatPhone(application.phone)
              })]
            })]
          }), application.status && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-start gap-3",
            renderId: "render-557afd9b",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-purple-500/10" : "bg-purple-100"}`,
              renderId: "render-04c1cbb1",
              as: "div",
              children: /* @__PURE__ */ jsx(Briefcase, {
                size: 20,
                className: isDark ? "text-purple-400" : "text-purple-600"
              })
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex-1",
              renderId: "render-8d4960c2",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: `text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`,
                renderId: "render-7a246d46",
                as: "p",
                children: "Status"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: `font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`,
                renderId: "render-80e3b48a",
                as: "p",
                children: application.status
              })]
            })]
          }), application.institution && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-start gap-3",
            renderId: "render-af3a7295",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-cyan-500/10" : "bg-cyan-100"}`,
              renderId: "render-5eb3e2a6",
              as: "div",
              children: /* @__PURE__ */ jsx(GraduationCap, {
                size: 20,
                className: isDark ? "text-cyan-400" : "text-cyan-600"
              })
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex-1",
              renderId: "render-a0307cfe",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: `text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`,
                renderId: "render-6c902baa",
                as: "p",
                children: application.status === "Student" ? "School" : application.status === "Working" ? "Company" : "Institution"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: `font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`,
                renderId: "render-a0deadda",
                as: "p",
                children: application.institution
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-start gap-3",
            renderId: "render-2e9e9903",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${application.consent_given ? isDark ? "bg-green-500/10" : "bg-green-100" : isDark ? "bg-slate-800" : "bg-gray-100"}`,
              renderId: "render-2b666aea",
              as: "div",
              children: /* @__PURE__ */ jsx(BadgeCheck, {
                size: 20,
                className: application.consent_given ? isDark ? "text-green-400" : "text-green-600" : isDark ? "text-slate-400" : "text-gray-500"
              })
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex-1",
              renderId: "render-c386e6ff",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: `text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`,
                renderId: "render-b0ee52a9",
                as: "p",
                children: "YEMC Forum Consent"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: `font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`,
                renderId: "render-70ce93de",
                as: "p",
                children: application.consent_given ? "Confirmed" : "Not recorded"
              }), application.consent_given && application.consent_given_at && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: `mt-1 text-xs ${isDark ? "text-slate-500" : "text-gray-500"}`,
                renderId: "render-0bd00a58",
                as: "p",
                children: formatDate(application.consent_given_at)
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-3",
          renderId: "render-7a2fa5bb",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center gap-2",
            renderId: "render-68dc80bc",
            as: "div",
            children: [/* @__PURE__ */ jsx(MessageSquare, {
              size: 18,
              className: isDark ? "text-slate-500" : "text-gray-500"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `text-xs font-semibold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-gray-500"}`,
              renderId: "render-bd51244b",
              as: "p",
              children: "Message"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: `rounded-xl p-4 max-h-48 overflow-y-auto ${isDark ? "bg-slate-950 border border-slate-800" : "bg-purple-50/50 border border-purple-100"}`,
            renderId: "render-9dbd7076",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `whitespace-pre-wrap leading-relaxed ${isDark ? "text-slate-300" : "text-gray-700"}`,
              renderId: "render-7faf382d",
              as: "p",
              children: application.message
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex gap-2 pt-2",
            renderId: "render-869642e3",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              onClick: (e) => {
                e.stopPropagation();
                onEmail({
                  id: application.id,
                  name: application.full_name,
                  email: application.email
                });
              },
              className: `flex-1 rounded-xl px-4 py-3 flex items-center justify-center gap-2 font-semibold transition-all ${isDark ? "bg-violet-600 hover:bg-violet-700 text-white" : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg"}`,
              renderId: "render-0df2cd55",
              as: "button",
              children: [/* @__PURE__ */ jsx(Send, {
                size: 18
              }), "Email"]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              onClick: (e) => {
                e.stopPropagation();
                onDelete(application);
              },
              className: `rounded-xl px-4 py-3 flex items-center justify-center gap-2 font-semibold transition-all ${isDark ? "bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30" : "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"}`,
              title: "Delete application",
              renderId: "render-c11650a9",
              as: "button",
              children: /* @__PURE__ */ jsx(Trash2, {
                size: 18
              })
            })]
          })]
        })]
      })
    })]
  });
}

function ApplicationsList({
  applications,
  isLoading,
  error,
  searchQuery,
  onEmail,
  onDelete,
  isDark
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex items-center justify-center py-20",
      renderId: "render-94eda948",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: `w-12 h-12 border-4 rounded-full animate-spin ${isDark ? "border-violet-500/30 border-t-violet-500" : "border-purple-300 border-t-purple-600"}`,
        renderId: "render-68d4c099",
        as: "div"
      })
    });
  }
  if (error) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: `rounded-2xl p-6 text-center ${isDark ? "bg-red-500/10 border border-red-500" : "bg-red-50 border border-red-200"}`,
      renderId: "render-d67c19b7",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: isDark ? "text-red-400" : "text-red-600",
        renderId: "render-e6e019d8",
        as: "p",
        children: "Failed to load applications. Please try again."
      })
    });
  }
  if (applications.length === 0) {
    return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: `rounded-2xl p-12 text-center ${isDark ? "bg-slate-900/50 border border-slate-800" : "bg-white/60 backdrop-blur-sm border border-purple-200/50 shadow-sm"}`,
      renderId: "render-880b5b09",
      as: "div",
      children: [/* @__PURE__ */ jsx(MessageSquare, {
        size: 48,
        className: `mx-auto mb-4 ${isDark ? "text-slate-600" : "text-purple-300"}`
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: `text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`,
        renderId: "render-10c21f3c",
        as: "h3",
        children: "No Applications Yet"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: isDark ? "text-slate-400" : "text-gray-600",
        renderId: "render-32cc4f33",
        as: "p",
        children: searchQuery ? "No applications match your search." : "Applications will appear here when people submit the join form."
      })]
    });
  }
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "space-y-4",
    renderId: "render-a6bcefe5",
    as: "div",
    children: applications.map((application) => /* @__PURE__ */ jsx(ApplicationCard, {
      application,
      onEmail,
      onDelete,
      isDark
    }, application.id))
  });
}

function EmailModal({
  emailModal,
  onClose,
  isDark
}) {
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const sendEmailToApplicant = async () => {
    if (!emailSubject.trim() || !emailMessage.trim()) {
      alert("Please fill in both subject and message");
      return;
    }
    setIsSending(true);
    try {
      const response = await fetch("/api/applications/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          to: emailModal.email,
          subject: emailSubject,
          message: emailMessage,
          applicantName: emailModal.name
        })
      });
      if (!response.ok) throw new Error("Failed to send email");
      alert(`Email sent successfully to ${emailModal.name}!`);
      handleClose();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };
  const handleClose = () => {
    setEmailSubject("");
    setEmailMessage("");
    onClose();
  };
  if (!emailModal) return null;
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4",
    renderId: "render-a3cb2728",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: `w-full max-w-2xl rounded-2xl p-8 relative ${isDark ? "bg-slate-900 border border-slate-800" : "bg-white border border-purple-200 shadow-2xl"}`,
      renderId: "render-cc3edf92",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        onClick: handleClose,
        className: `absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDark ? "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-violet-500" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
        renderId: "render-c9c0349d",
        as: "button",
        children: /* @__PURE__ */ jsx(X, {
          size: 20
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mb-6",
        renderId: "render-d9cbfa54",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: `text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`,
          renderId: "render-d436d6c0",
          as: "h2",
          children: "Send Email"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: `text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`,
          renderId: "render-4f9fc0fd",
          as: "p",
          children: ["To: ", emailModal.name, " (", emailModal.email, ")"]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "space-y-4",
        renderId: "render-ceb2037f",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-f98c1cd9",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: `block text-sm font-semibold mb-2 ${isDark ? "text-slate-300" : "text-gray-700"}`,
            renderId: "render-33f89c22",
            as: "label",
            children: "Subject"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            type: "text",
            value: emailSubject,
            onChange: (e) => setEmailSubject(e.target.value),
            placeholder: "Enter email subject...",
            className: `w-full rounded-xl px-4 py-3 focus:outline-none transition-all ${isDark ? "bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-violet-500" : "bg-purple-50/50 border border-purple-200 text-gray-900 placeholder-gray-400 focus:border-purple-400"}`,
            renderId: "render-39f52842",
            as: "input"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-01f5e84a",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: `block text-sm font-semibold mb-2 ${isDark ? "text-slate-300" : "text-gray-700"}`,
            renderId: "render-6f60815c",
            as: "label",
            children: "Message"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            value: emailMessage,
            onChange: (e) => setEmailMessage(e.target.value),
            placeholder: `Hi ${emailModal.name.split(" ")[0]},

Thank you for applying to YEMC...`,
            rows: 12,
            className: `w-full rounded-xl px-4 py-3 focus:outline-none transition-all resize-none ${isDark ? "bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-violet-500" : "bg-purple-50/50 border border-purple-200 text-gray-900 placeholder-gray-400 focus:border-purple-400"}`,
            renderId: "render-c323fbcb",
            as: "textarea"
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mt-6 flex items-center justify-end gap-3",
        renderId: "render-fe457c4b",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: handleClose,
          disabled: isSending,
          className: `px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
          renderId: "render-90e11f14",
          as: "button",
          children: "Cancel"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: sendEmailToApplicant,
          disabled: isSending || !emailSubject.trim() || !emailMessage.trim(),
          className: `px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${isDark ? "bg-violet-600 hover:bg-violet-500 text-white" : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md"}`,
          renderId: "render-134cca08",
          as: "button",
          children: isSending ? /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin",
              renderId: "render-829192d0",
              as: "div"
            }), "Sending..."]
          }) : /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx(Send, {
              size: 18
            }), "Send Email"]
          })
        })]
      })]
    })
  });
}

function DeleteConfirmModal({
  deleteConfirm,
  onClose,
  onConfirm,
  isDeleting,
  isDark
}) {
  if (!deleteConfirm) return null;
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4",
    renderId: "render-eeeeaf23",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: `w-full max-w-md rounded-2xl p-8 relative ${isDark ? "bg-slate-900 border border-slate-800" : "bg-white border border-red-200 shadow-2xl"}`,
      renderId: "render-c9d36584",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        onClick: onClose,
        disabled: isDeleting,
        className: `absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-red-500" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
        renderId: "render-bf9ccbf7",
        as: "button",
        children: /* @__PURE__ */ jsx(X, {
          size: 20
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mb-6",
        renderId: "render-43afd9b8",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: `w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? "bg-red-500/10" : "bg-red-50"}`,
          renderId: "render-29bc8997",
          as: "div",
          children: /* @__PURE__ */ jsx(Trash2, {
            size: 32,
            className: isDark ? "text-red-400" : "text-red-600"
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: `text-2xl font-bold mb-2 text-center ${isDark ? "text-white" : "text-gray-800"}`,
          renderId: "render-bcd09bb9",
          as: "h2",
          children: "Delete Application?"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: `text-sm text-center ${isDark ? "text-slate-400" : "text-gray-600"}`,
          renderId: "render-44cbefa2",
          as: "p",
          children: ["Are you sure you want to delete the application from", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-semibold",
            renderId: "render-0810e63b",
            as: "span",
            children: deleteConfirm.full_name
          }), "? This action cannot be undone."]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center justify-end gap-3",
        renderId: "render-853c60b5",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: onClose,
          disabled: isDeleting,
          className: `px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
          renderId: "render-d921756f",
          as: "button",
          children: "Cancel"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: onConfirm,
          disabled: isDeleting,
          className: `px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${isDark ? "bg-red-600 hover:bg-red-500 text-white" : "bg-red-600 hover:bg-red-700 text-white shadow-md"}`,
          renderId: "render-da26d359",
          as: "button",
          children: isDeleting ? /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin",
              renderId: "render-abe5dd82",
              as: "div"
            }), "Deleting..."]
          }) : /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx(Trash2, {
              size: 18
            }), "Delete"]
          })
        })]
      })]
    })
  });
}

function LoadingScreen({
  isDark
}) {
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: `min-h-screen flex items-center justify-center ${isDark ? "bg-slate-950" : "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100"}`,
    renderId: "render-68a493b8",
    as: "div",
    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: `w-12 h-12 border-4 rounded-full animate-spin ${isDark ? "border-violet-500/30 border-t-violet-500" : "border-purple-300 border-t-purple-600"}`,
      renderId: "render-299f06f3",
      as: "div"
    })
  });
}

function AdminApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [emailModal, setEmailModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const {
    theme,
    toggleTheme,
    isDark
  } = useTheme();
  const {
    applications,
    total,
    isLoading,
    error,
    deleteMutation,
    refetch
  } = useApplications(searchQuery);
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  const handleDelete = (application) => {
    setDeleteConfirm(application);
  };
  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteMutation.mutate(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };
  const handleExport = () => {
    exportToCSV(applications);
  };
  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploadSuccess(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/applications/upload", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload CSV");
      }
      setUploadSuccess(`Successfully imported ${data.inserted} of ${data.total} applications`);
      refetch();
      setTimeout(() => setUploadSuccess(null), 5e3);
    } catch (error2) {
      console.error("Upload error:", error2);
      setUploadError(error2.message);
    }
    event.target.value = "";
  };
  if (userLoading) {
    return /* @__PURE__ */ jsx(LoadingScreen, {
      isDark
    });
  }
  if (!user) return null;
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: `min-h-screen font-sans ${isDark ? "bg-slate-950" : "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100"}`,
    renderId: "render-8ae1b74e",
    as: "div",
    children: [isDark && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "fixed inset-0 pointer-events-none",
      renderId: "render-11d71c19",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full",
        renderId: "render-8201551c",
        as: "div"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full",
        renderId: "render-5b48942d",
        as: "div"
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative z-10",
      renderId: "render-48ceaad9",
      as: "div",
      children: [/* @__PURE__ */ jsx(AdminHeader, {
        user,
        total,
        searchQuery,
        onSearchChange: setSearchQuery,
        onExport: handleExport,
        onUpload: handleUpload,
        hasApplications: applications.length > 0,
        theme,
        onToggleTheme: toggleTheme
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-7xl mx-auto px-6 py-8",
        renderId: "render-287cfb03",
        as: "div",
        children: [uploadError && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: `mb-6 p-4 rounded-xl ${isDark ? "bg-red-900/20 border border-red-500/30 text-red-400" : "bg-red-50 border border-red-200 text-red-700"}`,
          renderId: "render-aed615e5",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-semibold",
            renderId: "render-cf0f2cc9",
            as: "p",
            children: "Upload Error"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm mt-1",
            renderId: "render-981a3259",
            as: "p",
            children: uploadError
          })]
        }), uploadSuccess && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: `mb-6 p-4 rounded-xl ${isDark ? "bg-green-900/20 border border-green-500/30 text-green-400" : "bg-green-50 border border-green-200 text-green-700"}`,
          renderId: "render-bddbe6c9",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-semibold",
            renderId: "render-066f6e7a",
            as: "p",
            children: "Upload Successful"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm mt-1",
            renderId: "render-2f7cc7c6",
            as: "p",
            children: uploadSuccess
          })]
        }), /* @__PURE__ */ jsx(ApplicationsList, {
          applications,
          isLoading,
          error,
          searchQuery,
          onEmail: setEmailModal,
          onDelete: handleDelete,
          isDark
        })]
      })]
    }), /* @__PURE__ */ jsx(EmailModal, {
      emailModal,
      onClose: () => setEmailModal(null),
      isDark
    }), /* @__PURE__ */ jsx(DeleteConfirmModal, {
      deleteConfirm,
      onClose: () => setDeleteConfirm(null),
      onConfirm: confirmDelete,
      isDeleting: deleteMutation.isPending,
      isDark
    })]
  });
}

const page$b = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(AdminApplicationsPage, {
      ...props
    })
  });
});

const route6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$b
}, Symbol.toStringTag, { value: 'Module' }));

function AdminUsersPage() {
  const {
    data: currentUser,
    loading: userLoading
  } = useUser();
  const queryClient = useQueryClient();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme") || "dark";
    setTheme(savedTheme);
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("admin-theme", newTheme);
  };
  useEffect(() => {
    if (!userLoading && !currentUser) {
      window.location.href = "/account/signin";
    }
  }, [currentUser, userLoading]);
  const {
    data: users,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json();
    },
    enabled: !!currentUser
  });
  const deleteMutation = useMutation({
    mutationFn: async (userId) => {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete user");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-users"]);
      setDeleteConfirm(null);
    }
  });
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(date);
  };
  const handleDelete = (user) => {
    if (user.id === currentUser?.id) {
      alert("You cannot delete your own account");
      return;
    }
    setDeleteConfirm(user);
  };
  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteMutation.mutate(deleteConfirm.id);
    }
  };
  const getGreeting = () => {
    const hour = (/* @__PURE__ */ new Date()).getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  const getFirstName = () => {
    if (!currentUser?.name) return "Admin";
    return currentUser.name.split(" ")[0];
  };
  if (userLoading) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: `min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-slate-950" : "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100"}`,
      renderId: "render-1895bb80",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: `w-12 h-12 border-4 rounded-full animate-spin ${theme === "dark" ? "border-violet-500/30 border-t-violet-500" : "border-purple-300 border-t-purple-600"}`,
        renderId: "render-22204e89",
        as: "div"
      })
    });
  }
  if (!currentUser) return null;
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: `min-h-screen font-sans ${isDark ? "bg-slate-950" : "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100"}`,
    renderId: "render-19c17a40",
    as: "div",
    children: [isDark && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "fixed inset-0 pointer-events-none",
      renderId: "render-0dafedf9",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full",
        renderId: "render-ca16d3df",
        as: "div"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full",
        renderId: "render-e9415e28",
        as: "div"
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative z-10",
      renderId: "render-53c29f9b",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: `${isDark ? "bg-slate-900/50 border-b border-slate-800" : "bg-white/40"} backdrop-blur-md sticky top-0 z-20`,
        renderId: "render-6cb76bff",
        as: "div",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto px-6 py-8",
          renderId: "render-f4e7bcaf",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-start justify-between mb-6",
            renderId: "render-af48a1d8",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-a9e806fc",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: `text-4xl md:text-5xl font-extrabold mb-2 ${isDark ? "text-white" : "text-gray-800"}`,
                renderId: "render-e089a691",
                as: "h1",
                children: [getGreeting(), ", ", getFirstName(), "! 👋"]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: `text-lg ${isDark ? "text-slate-400" : "text-gray-600"}`,
                renderId: "render-5a831d12",
                as: "p",
                children: ["Manage your ", users?.users?.length || 0, " user", users?.users?.length !== 1 ? "s" : ""]
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center gap-2",
              renderId: "render-285ad670",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                onClick: toggleTheme,
                className: `p-3 rounded-xl transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`,
                title: `Switch to ${isDark ? "light" : "dark"} mode`,
                renderId: "render-92bcf79c",
                as: "button",
                children: isDark ? /* @__PURE__ */ jsx(Sun, {
                  size: 20
                }) : /* @__PURE__ */ jsx(Moon, {
                  size: 20
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                href: "/admin/applications",
                className: `p-3 rounded-xl transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`,
                title: "View Applications",
                renderId: "render-ea945643",
                as: "a",
                children: /* @__PURE__ */ jsx(List, {
                  size: 20
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                href: "/account/logout",
                className: `p-3 rounded-xl transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`,
                title: "Logout",
                renderId: "render-55590253",
                as: "a",
                children: /* @__PURE__ */ jsx(LogOut, {
                  size: 20
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                href: "/",
                className: `p-3 rounded-xl transition-all ${isDark ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300" : "bg-white/60 hover:bg-white text-gray-700 shadow-sm"}`,
                title: "Back to Home",
                renderId: "render-b8efe6d4",
                as: "a",
                children: /* @__PURE__ */ jsx(ArrowLeft, {
                  size: 20
                })
              })]
            })]
          })
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "max-w-7xl mx-auto px-6 py-8",
        renderId: "render-2423fb3e",
        as: "div",
        children: isLoading ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex items-center justify-center py-20",
          renderId: "render-8e2447fe",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: `w-12 h-12 border-4 rounded-full animate-spin ${isDark ? "border-violet-500/30 border-t-violet-500" : "border-purple-300 border-t-purple-600"}`,
            renderId: "render-3c0beb94",
            as: "div"
          })
        }) : error ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: `rounded-2xl p-6 text-center ${isDark ? "bg-red-500/10 border border-red-500" : "bg-red-50 border border-red-200"}`,
          renderId: "render-c6b19ce4",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: isDark ? "text-red-400" : "text-red-600",
            renderId: "render-ec999c52",
            as: "p",
            children: "Failed to load users. Please try again."
          })
        }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "space-y-4",
          renderId: "render-23cb0f04",
          as: "div",
          children: users?.users?.map((user) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: `rounded-2xl p-6 transition-all ${isDark ? "bg-slate-900 border border-slate-800 hover:border-violet-500/50" : "bg-white/60 backdrop-blur-sm border border-purple-200/50 hover:border-purple-400/70 shadow-sm hover:shadow-md"}`,
            renderId: "render-37f62abe",
            as: "div",
            children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-start justify-between gap-4",
              renderId: "render-369ea04e",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex-1 grid md:grid-cols-3 gap-6",
                renderId: "render-9ad21e37",
                as: "div",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-start gap-3",
                  renderId: "render-8b9ada35",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-violet-500/10" : "bg-purple-100"}`,
                    renderId: "render-6ccdd94b",
                    as: "div",
                    children: /* @__PURE__ */ jsx(User, {
                      size: 20,
                      className: isDark ? "text-violet-400" : "text-purple-600"
                    })
                  }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    renderId: "render-d0d442da",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: `text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`,
                      renderId: "render-a0695d01",
                      as: "p",
                      children: "Name"
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: `font-bold ${isDark ? "text-white" : "text-gray-800"}`,
                      renderId: "render-e529dde8",
                      as: "p",
                      children: user.name || "No name set"
                    }), user.id === currentUser?.id && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                      className: `inline-flex items-center gap-1 mt-1 text-xs ${isDark ? "text-violet-400" : "text-purple-600"}`,
                      renderId: "render-9b4f1847",
                      as: "span",
                      children: [/* @__PURE__ */ jsx(Shield, {
                        size: 12
                      }), "You"]
                    })]
                  })]
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-start gap-3",
                  renderId: "render-87389020",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-blue-500/10" : "bg-blue-100"}`,
                    renderId: "render-ed18a27d",
                    as: "div",
                    children: /* @__PURE__ */ jsx(Mail, {
                      size: 20,
                      className: isDark ? "text-blue-400" : "text-blue-600"
                    })
                  }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    renderId: "render-cd90f5e5",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: `text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`,
                      renderId: "render-7d4c00c7",
                      as: "p",
                      children: "Email"
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: `break-all ${isDark ? "text-slate-300" : "text-gray-700"}`,
                      renderId: "render-866ac808",
                      as: "p",
                      children: user.email
                    })]
                  })]
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-start gap-3",
                  renderId: "render-73c68be4",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-green-500/10" : "bg-green-100"}`,
                    renderId: "render-eef448a1",
                    as: "div",
                    children: /* @__PURE__ */ jsx(Calendar, {
                      size: 20,
                      className: isDark ? "text-green-400" : "text-green-600"
                    })
                  }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    renderId: "render-e624ccb6",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: `text-xs mb-1 ${isDark ? "text-slate-500" : "text-gray-500"}`,
                      renderId: "render-daa5ac98",
                      as: "p",
                      children: "Created"
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: isDark ? "text-slate-300" : "text-gray-700",
                      renderId: "render-f100c64e",
                      as: "p",
                      children: formatDate(user.created_at)
                    })]
                  })]
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                onClick: () => handleDelete(user),
                disabled: user.id === currentUser?.id,
                className: `w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "bg-red-500/10 hover:bg-red-500/20 text-red-400" : "bg-red-100 hover:bg-red-200 text-red-600"}`,
                title: user.id === currentUser?.id ? "Cannot delete yourself" : "Delete user",
                renderId: "render-61dcb619",
                as: "button",
                children: /* @__PURE__ */ jsx(Trash2, {
                  size: 18
                })
              })]
            })
          }, user.id))
        })
      })]
    }), deleteConfirm && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50",
      renderId: "render-b64e2d2f",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: `rounded-2xl p-8 max-w-md w-full ${isDark ? "bg-slate-900 border border-slate-800" : "bg-white border border-purple-200 shadow-2xl"}`,
        renderId: "render-77763cea",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-3 mb-4",
          renderId: "render-96d4c7b1",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: `w-12 h-12 rounded-full flex items-center justify-center ${isDark ? "bg-red-500/10" : "bg-red-100"}`,
            renderId: "render-f7c9d011",
            as: "div",
            children: /* @__PURE__ */ jsx(AlertCircle, {
              size: 24,
              className: isDark ? "text-red-400" : "text-red-600"
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: `text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-800"}`,
            renderId: "render-f1bd0f37",
            as: "h2",
            children: "Delete User?"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: `mb-6 ${isDark ? "text-slate-400" : "text-gray-600"}`,
          renderId: "render-e8054abb",
          as: "p",
          children: ["Are you sure you want to delete", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: isDark ? "text-white" : "text-gray-800",
            renderId: "render-f8576c6f",
            as: "strong",
            children: deleteConfirm.email
          }), "? This action cannot be undone."]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex gap-3",
          renderId: "render-ac6486d6",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => setDeleteConfirm(null),
            className: `flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${isDark ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`,
            renderId: "render-e5ae0429",
            as: "button",
            children: "Cancel"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: confirmDelete,
            disabled: deleteMutation.isPending,
            className: `flex-1 px-6 py-3 rounded-xl font-semibold transition-all disabled:cursor-not-allowed ${isDark ? "bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white" : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md disabled:opacity-50"}`,
            renderId: "render-af434fba",
            as: "button",
            children: deleteMutation.isPending ? "Deleting..." : "Delete"
          })]
        })]
      })
    })]
  });
}

const page$a = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(AdminUsersPage, {
      ...props
    })
  });
});

const route7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$a
}, Symbol.toStringTag, { value: 'Module' }));

function CommunityPage() {
  const benefits = [{
    icon: /* @__PURE__ */ jsx(Users, {
      size: 28
    }),
    title: "Exclusive Network",
    description: "Connect with 500+ young executives across various industries and sectors."
  }, {
    icon: /* @__PURE__ */ jsx(MessageSquare, {
      size: 28
    }),
    title: "Peer Mentorship",
    description: "Learn from fellow alumni and share experiences in a supportive environment."
  }, {
    icon: /* @__PURE__ */ jsx(Calendar, {
      size: 28
    }),
    title: "Regular Events",
    description: "Access monthly meetups, workshops, and networking sessions."
  }, {
    icon: /* @__PURE__ */ jsx(Award, {
      size: 28
    }),
    title: "Continuous Learning",
    description: "Ongoing access to resources, masterclasses, and industry insights."
  }, {
    icon: /* @__PURE__ */ jsx(Globe, {
      size: 28
    }),
    title: "Global Connections",
    description: "Build relationships with Christian business leaders worldwide."
  }, {
    icon: /* @__PURE__ */ jsx(Handshake, {
      size: 28
    }),
    title: "Collaboration Opportunities",
    description: "Partner on projects, ventures, and initiatives with community members."
  }];
  const events = [{
    title: "Monthly Leadership Roundtable",
    date: "First Friday of Every Month",
    description: "Interactive discussions on current business challenges and opportunities.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
  }, {
    title: "Alumni Networking Mixer",
    date: "Quarterly",
    description: "Casual meet-and-greet sessions to strengthen community bonds.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80"
  }, {
    title: "Faith & Business Summit",
    date: "Annual",
    description: "Our flagship event bringing together leaders for inspiration and growth.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80"
  }];
  const testimonials = [{
    name: "Emmanuel Kwarteng",
    role: "Tech Entrepreneur",
    content: "The YEMC community has been instrumental in my growth. The connections I've made here have opened doors I never imagined.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  }, {
    name: "Grace Mensah",
    role: "Corporate Executive",
    content: "Being part of this community means having a support system that truly understands the unique challenges of faith-based leadership.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  }, {
    name: "David Osei",
    role: "Business Consultant",
    content: "The mentorship and accountability I've found here has accelerated my career in ways I couldn't have achieved alone.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }];
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200",
    renderId: "render-73af95da",
    as: "div",
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "pt-24",
      renderId: "render-82e7f470",
      as: "main",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "py-20 px-6 relative overflow-hidden",
        renderId: "render-64d63e43",
        as: "section",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full",
          renderId: "render-79499e80",
          as: "div"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto relative z-10",
          renderId: "render-56f31e26",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center max-w-4xl mx-auto",
            renderId: "render-badb7e08",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-5xl md:text-7xl font-extrabold text-white mb-6 font-plus-jakarta leading-tight",
              renderId: "render-639c9340",
              as: "h1",
              children: ["Join Our", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400",
                renderId: "render-5eb9fdef",
                as: "span",
                children: "Community"
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl text-slate-400 mb-8 leading-relaxed",
              renderId: "render-2a25fcec",
              as: "p",
              children: "Connect with a vibrant network of faith-driven executives who are transforming industries and impacting lives across Africa and beyond."
            })]
          })
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-12 px-6 bg-slate-950",
        renderId: "render-44e3f762",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto",
          renderId: "render-b44dfd4a",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "grid md:grid-cols-4 gap-8",
            renderId: "render-61645b02",
            as: "div",
            children: [{
              number: "500+",
              label: "Active Members"
            }, {
              number: "50+",
              label: "Industries"
            }, {
              number: "15+",
              label: "Countries"
            }, {
              number: "100+",
              label: "Events Hosted"
            }].map((stat, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:border-violet-500/50 transition-all",
              renderId: "render-7b85007e",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 mb-2",
                renderId: "render-67ba54cb",
                as: "div",
                children: stat.number
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-slate-400 font-medium",
                renderId: "render-35c71482",
                as: "div",
                children: stat.label
              })]
            }, index))
          })
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950 border-t border-slate-900",
        renderId: "render-3fb3eef1",
        as: "section",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto",
          renderId: "render-15215079",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center mb-16",
            renderId: "render-e1da1cfd",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-violet-500 font-bold uppercase tracking-widest text-sm mb-4",
              renderId: "render-ead85d1a",
              as: "h2",
              children: "Member Benefits"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-4xl md:text-5xl font-bold text-white font-plus-jakarta",
              renderId: "render-276e2ed6",
              as: "h3",
              children: "Why Join Us?"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
            renderId: "render-cf9432e3",
            as: "div",
            children: benefits.map((benefit, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-violet-500/50 transition-all group",
              renderId: "render-9e4687e4",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "w-14 h-14 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-violet-500/20 transition-colors text-violet-500",
                renderId: "render-6bc2a901",
                as: "div",
                children: benefit.icon
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-white font-bold text-xl mb-3",
                renderId: "render-f16a0b92",
                as: "h4",
                children: benefit.title
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-slate-400 leading-relaxed text-sm",
                renderId: "render-80f6d3ee",
                as: "p",
                children: benefit.description
              })]
            }, index))
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950 border-t border-slate-900",
        renderId: "render-ee940f1a",
        as: "section",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto",
          renderId: "render-823919cd",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center mb-16",
            renderId: "render-22a37189",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-violet-500 font-bold uppercase tracking-widest text-sm mb-4",
              renderId: "render-adfdf106",
              as: "h2",
              children: "Community Activities"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-4xl md:text-5xl font-bold text-white font-plus-jakarta",
              renderId: "render-3c87ba6a",
              as: "h3",
              children: "Regular Events"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "grid md:grid-cols-3 gap-8",
            renderId: "render-939310de",
            as: "div",
            children: events.map((event, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-violet-500/50 transition-all group",
              renderId: "render-548e8026",
              as: "div",
              children: [/* @__PURE__ */ jsx(OptimizedImage, {
                src: event.image,
                alt: event.title,
                className: "w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "p-8",
                renderId: "render-999516c8",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-violet-400 text-sm font-bold mb-2",
                  renderId: "render-b8de2177",
                  as: "div",
                  children: event.date
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-white font-bold text-xl mb-3",
                  renderId: "render-6a5f3a08",
                  as: "h4",
                  children: event.title
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-slate-400 text-sm leading-relaxed",
                  renderId: "render-dd37b604",
                  as: "p",
                  children: event.description
                })]
              })]
            }, index))
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950 border-t border-slate-900",
        renderId: "render-42697b3e",
        as: "section",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto",
          renderId: "render-ed3657f0",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center mb-16",
            renderId: "render-fcb63bee",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-violet-500 font-bold uppercase tracking-widest text-sm mb-4",
              renderId: "render-d2b11119",
              as: "h2",
              children: "Member Stories"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-4xl md:text-5xl font-bold text-white font-plus-jakarta",
              renderId: "render-b3ac22f2",
              as: "h3",
              children: "What Our Community Says"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "grid md:grid-cols-3 gap-8",
            renderId: "render-a8fabd5e",
            as: "div",
            children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-violet-500/50 transition-all",
              renderId: "render-c1cac697",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-4 mb-6",
                renderId: "render-aaa4cc28",
                as: "div",
                children: [/* @__PURE__ */ jsx(OptimizedImage, {
                  src: testimonial.image,
                  alt: testimonial.name,
                  className: "w-14 h-14 rounded-2xl object-cover border-2 border-violet-500"
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  renderId: "render-ed16991c",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-white font-bold",
                    renderId: "render-5b9e8186",
                    as: "h4",
                    children: testimonial.name
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-violet-400 text-sm",
                    renderId: "render-f1347271",
                    as: "p",
                    children: testimonial.role
                  })]
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "text-slate-300 leading-relaxed text-sm italic",
                renderId: "render-150e4647",
                as: "p",
                children: ['"', testimonial.content, '"']
              })]
            }, index))
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950",
        renderId: "render-33f010db",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-5xl mx-auto",
          renderId: "render-3d12cbda",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-gradient-to-r from-violet-900/40 to-blue-900/40 border border-violet-500/20 rounded-[40px] p-12 text-center relative overflow-hidden",
            renderId: "render-097c5694",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-violet-500/10 blur-3xl rounded-full",
              renderId: "render-d3da11fb",
              as: "div"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative z-10",
              renderId: "render-7e817e94",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-4xl md:text-5xl font-bold text-white mb-4 font-plus-jakarta",
                renderId: "render-f3192a23",
                as: "h3",
                children: "Ready to Join?"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-slate-300 text-lg mb-8 max-w-2xl mx-auto",
                renderId: "render-2501ea97",
                as: "p",
                children: "Become part of Africa's premier community of faith-driven business leaders."
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                href: "/contact",
                className: "bg-white text-slate-950 px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-violet-100 transition-all hover:scale-105 shadow-xl inline-block",
                renderId: "render-7af7d90c",
                as: "a",
                children: "Apply Now"
              })]
            })]
          })
        })
      })]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
}

const page$9 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(CommunityPage, {
      ...props
    })
  });
});

const route8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$9
}, Symbol.toStringTag, { value: 'Module' }));

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: ""
      });
      setTimeout(() => {
        setStatus("");
      }, 3e3);
    }, 1500);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const contactInfo = [{
    icon: /* @__PURE__ */ jsx(Mail, {
      size: 24,
      className: "text-violet-500"
    }),
    title: "Email",
    value: "theyoungexecutivemasterclass@gmail.com",
    link: "mailto:theyoungexecutivemasterclass@gmail.com"
  }, {
    icon: /* @__PURE__ */ jsx(Phone, {
      size: 24,
      className: "text-violet-500"
    }),
    title: "Phone",
    value: "(+233) 26 885-1285",
    link: "tel:+233268851285"
  }, {
    icon: /* @__PURE__ */ jsx(MapPin, {
      size: 24,
      className: "text-violet-500"
    }),
    title: "Location",
    value: "AH Hotel - East Legon, Accra",
    link: null
  }];
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200",
    renderId: "render-7d0cdc68",
    as: "div",
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "pt-24",
      renderId: "render-0eaf97c8",
      as: "main",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "py-20 px-6 relative overflow-hidden",
        renderId: "render-21bf67ab",
        as: "section",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full",
          renderId: "render-d1261c5a",
          as: "div"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto relative z-10",
          renderId: "render-5e232ddb",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center max-w-3xl mx-auto",
            renderId: "render-9fb98358",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-5xl md:text-7xl font-extrabold text-white mb-6 font-plus-jakarta leading-tight",
              renderId: "render-0c7e64cd",
              as: "h1",
              children: ["Get In", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400",
                renderId: "render-ff900b76",
                as: "span",
                children: "Touch"
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl text-slate-400 leading-relaxed",
              renderId: "render-505c3965",
              as: "p",
              children: "Have questions about YEMC? We're here to help! Fill out the form and our team will get back to you shortly."
            })]
          })
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950",
        renderId: "render-a65b4e24",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto",
          renderId: "render-7a96c142",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "grid lg:grid-cols-2 gap-16",
            renderId: "render-09355c3a",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "space-y-8",
              renderId: "render-f0b09eeb",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-158b917a",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-violet-500 font-bold uppercase tracking-widest text-sm mb-4",
                  renderId: "render-1b9c5a22",
                  as: "h2",
                  children: "Contact Information"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-4xl md:text-5xl font-bold text-white font-plus-jakarta mb-6",
                  renderId: "render-352b70a3",
                  as: "h3",
                  children: "Let's Connect"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-slate-400 text-lg leading-relaxed",
                  renderId: "render-cdf33242",
                  as: "p",
                  children: "Whether you're interested in joining our next masterclass, have questions about our programs, or want to learn more about becoming a speaker, we'd love to hear from you."
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "space-y-6",
                renderId: "render-a0ba458f",
                as: "div",
                children: contactInfo.map((info, index) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-violet-500/50 transition-all group",
                  renderId: "render-6aabd527",
                  as: "div",
                  children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    className: "flex items-start gap-4",
                    renderId: "render-4eaa378f",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center group-hover:bg-violet-500/20 transition-colors",
                      renderId: "render-57969e2e",
                      as: "div",
                      children: info.icon
                    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                      className: "flex-1",
                      renderId: "render-591e557b",
                      as: "div",
                      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        className: "text-white font-bold mb-1",
                        renderId: "render-6a220d1e",
                        as: "h4",
                        children: info.title
                      }), info.link ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        href: info.link,
                        className: "text-slate-400 hover:text-violet-400 transition-colors break-all",
                        renderId: "render-c8f22344",
                        as: "a",
                        children: info.value
                      }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        className: "text-slate-400",
                        renderId: "render-d36a55ba",
                        as: "p",
                        children: info.value
                      })]
                    })]
                  })
                }, index))
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "hidden lg:block relative",
                renderId: "render-336e8e26",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full",
                  renderId: "render-4b600373",
                  as: "div"
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "bg-gradient-to-br from-violet-900/40 to-blue-900/40 border border-violet-500/20 rounded-3xl p-8",
                  renderId: "render-628329e5",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-white text-lg font-medium mb-2",
                    renderId: "render-92bc0463",
                    as: "p",
                    children: "Office Hours"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-slate-400 text-sm",
                    renderId: "render-df35b315",
                    as: "p",
                    children: "Monday - Friday: 9:00 AM - 6:00 PM (GMT)"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-slate-400 text-sm",
                    renderId: "render-62c2d1a9",
                    as: "p",
                    children: "Saturday: 10:00 AM - 2:00 PM (GMT)"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-slate-400 text-sm",
                    renderId: "render-6130aaab",
                    as: "p",
                    children: "Sunday: Closed"
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "bg-slate-900 border border-slate-800 rounded-[40px] p-8 md:p-12",
              renderId: "render-769dd32e",
              as: "div",
              children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                onSubmit: handleSubmit,
                className: "space-y-6",
                renderId: "render-990fa5ce",
                as: "form",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  renderId: "render-39b05bc6",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    htmlFor: "fullName",
                    className: "block text-white font-medium mb-2 text-sm",
                    renderId: "render-9dbc3863",
                    as: "label",
                    children: "Full Name"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    type: "text",
                    id: "fullName",
                    name: "fullName",
                    value: formData.fullName,
                    onChange: handleChange,
                    required: true,
                    className: "w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition-colors",
                    placeholder: "John Doe",
                    renderId: "render-eb47984f",
                    as: "input"
                  })]
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  renderId: "render-1a98b28d",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    htmlFor: "email",
                    className: "block text-white font-medium mb-2 text-sm",
                    renderId: "render-b3a382db",
                    as: "label",
                    children: "Email Address"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    type: "email",
                    id: "email",
                    name: "email",
                    value: formData.email,
                    onChange: handleChange,
                    required: true,
                    className: "w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition-colors",
                    placeholder: "john@example.com",
                    renderId: "render-d0bdba0b",
                    as: "input"
                  })]
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  renderId: "render-8ae02834",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    htmlFor: "phone",
                    className: "block text-white font-medium mb-2 text-sm",
                    renderId: "render-fbd9f58b",
                    as: "label",
                    children: "Phone Number"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    type: "tel",
                    id: "phone",
                    name: "phone",
                    value: formData.phone,
                    onChange: handleChange,
                    className: "w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition-colors",
                    placeholder: "+233 XX XXX XXXX",
                    renderId: "render-ef3ac235",
                    as: "input"
                  })]
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  renderId: "render-3c1b1858",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    htmlFor: "message",
                    className: "block text-white font-medium mb-2 text-sm",
                    renderId: "render-ea0f666a",
                    as: "label",
                    children: "Message"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    id: "message",
                    name: "message",
                    value: formData.message,
                    onChange: handleChange,
                    required: true,
                    rows: 6,
                    className: "w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition-colors resize-none",
                    placeholder: "Tell us how we can help you...",
                    renderId: "render-8c15940e",
                    as: "textarea"
                  })]
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "submit",
                  disabled: status === "sending",
                  className: "w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-5 rounded-2xl font-extrabold text-lg hover:from-violet-700 hover:to-blue-700 transition-all hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed",
                  renderId: "render-e53c8d24",
                  as: "button",
                  children: status === "sending" ? "Sending..." : status === "success" ? "Message Sent!" : /* @__PURE__ */ jsxs(Fragment, {
                    children: [/* @__PURE__ */ jsx(Send, {
                      size: 20
                    }), "Send Message"]
                  })
                }), status === "success" && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center",
                  renderId: "render-1e5e902a",
                  as: "div",
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-green-400 font-medium",
                    renderId: "render-95ba20f0",
                    as: "p",
                    children: "Thank you! We'll get back to you soon."
                  })
                })]
              })
            })]
          })
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950 border-t border-slate-900",
        renderId: "render-16b01b0a",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto",
          renderId: "render-ee3c9e9d",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-gradient-to-br from-violet-900/40 to-blue-900/40 border border-violet-500/20 rounded-[40px] p-12 md:p-16 text-center relative overflow-hidden",
            renderId: "render-ee11047f",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-violet-500/10 blur-3xl rounded-full",
              renderId: "render-e3e203e5",
              as: "div"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative z-10 max-w-3xl mx-auto",
              renderId: "render-ff9def2a",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-4xl md:text-5xl font-bold text-white mb-6 font-plus-jakarta",
                renderId: "render-94921db3",
                as: "h3",
                children: "Ready to Transform Your Career?"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-slate-300 text-lg mb-8 leading-relaxed",
                renderId: "render-09928a12",
                as: "p",
                children: "Join hundreds of young executives who have elevated their leadership skills and deepened their faith through our transformative programs."
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex flex-col sm:flex-row gap-4 justify-center",
                renderId: "render-0e3c5a25",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  href: "/lessons",
                  className: "bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold hover:bg-violet-100 transition-all",
                  renderId: "render-7eee2bab",
                  as: "a",
                  children: "View Programs"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  href: "/#about",
                  className: "bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold border border-slate-800 hover:border-violet-500 transition-all",
                  renderId: "render-4744df09",
                  as: "a",
                  children: "Learn More"
                })]
              })]
            })]
          })
        })
      })]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
}

const page$8 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(ContactPage, {
      ...props
    })
  });
});

const route9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$8
}, Symbol.toStringTag, { value: 'Module' }));

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [{
    category: "General",
    questions: [{
      q: "What is the Young Executive Master Class (YEMC)?",
      a: "YEMC is a comprehensive leadership development program designed specifically for young professionals who want to excel in their careers while maintaining their Christian values. We offer masterclasses, mentorship, and a supportive community of faith-driven executives."
    }, {
      q: "Who can join YEMC?",
      a: "YEMC is open to young professionals, entrepreneurs, and aspiring executives who are committed to integrating their Christian faith with their professional development. Whether you're just starting your career or already in a leadership position, our programs are designed to meet you where you are."
    }, {
      q: "Where are YEMC programs held?",
      a: "Our flagship in-person events are held at the AH Hotel in East Legon, Accra, Ghana. We also offer virtual programs and masterclasses that can be accessed from anywhere in the world."
    }]
  }, {
    category: "Programs & Registration",
    questions: [{
      q: "How do I register for a program?",
      a: "You can register by visiting our Lessons page, selecting the program you're interested in, and filling out the registration form. You can also contact us directly for personalized assistance with the registration process."
    }, {
      q: "What is the cost of YEMC programs?",
      a: "Program costs vary depending on the specific masterclass or event. We offer different pricing tiers to accommodate various budgets and provide early bird discounts. Contact us for detailed pricing information for your program of interest."
    }, {
      q: "How long do the programs last?",
      a: "Our programs range from one-day intensive workshops to multi-week masterclasses. The Young Executive Master Class flagship program typically runs for 6-8 weeks with weekly sessions."
    }, {
      q: "Are there payment plans available?",
      a: "Yes, we offer flexible payment plans to make our programs accessible. Contact our team to discuss payment options that work for your situation."
    }]
  }, {
    category: "Content & Learning",
    questions: [{
      q: "What topics are covered in the masterclasses?",
      a: "Our curriculum covers leadership development, strategic thinking, ethical business practices, spiritual integration in the workplace, networking, innovation, and personal branding. Each program is designed to provide both theoretical knowledge and practical skills."
    }, {
      q: "Are the sessions recorded?",
      a: "Yes, all sessions are recorded and made available to registered participants. You'll have access to session recordings and materials through our online platform."
    }, {
      q: "Do I get a certificate upon completion?",
      a: "Yes, participants who complete the full program receive a certificate of completion from YEMC, recognizing their commitment to professional and spiritual development."
    }]
  }, {
    category: "Community & Support",
    questions: [{
      q: "What happens after I complete a program?",
      a: "Upon completion, you become part of our alumni network with continued access to resources, networking events, and ongoing learning opportunities. We foster a lifelong community of support and growth."
    }, {
      q: "Can I access materials after the program ends?",
      a: "Yes, all registered participants retain access to course materials, recordings, and resources even after the program concludes."
    }, {
      q: "How can I connect with other YEMC members?",
      a: "We have an active community platform where members can connect, share experiences, and collaborate. We also host regular networking events, both virtual and in-person."
    }]
  }, {
    category: "Speakers & Mentorship",
    questions: [{
      q: "Who are the speakers and instructors?",
      a: "Our faculty includes accomplished business leaders, seasoned executives, and spiritual mentors who have extensive experience in their fields. You can learn more about our speakers on the Lessons page."
    }, {
      q: "Is one-on-one mentorship available?",
      a: "Yes, we offer mentorship opportunities as part of select programs. Our mentorship program pairs participants with experienced leaders for personalized guidance and support."
    }]
  }];
  const toggleFAQ = (categoryIndex, questionIndex) => {
    const flatIndex = faqs.slice(0, categoryIndex).reduce((sum, cat) => sum + cat.questions.length, 0) + questionIndex;
    setOpenIndex(openIndex === flatIndex ? null : flatIndex);
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200",
    renderId: "render-ec14f2a3",
    as: "div",
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "pt-24",
      renderId: "render-b6406104",
      as: "main",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "py-20 px-6 relative overflow-hidden",
        renderId: "render-bee301a5",
        as: "section",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full",
          renderId: "render-53ba87bc",
          as: "div"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto relative z-10",
          renderId: "render-ef2f5307",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center max-w-3xl mx-auto",
            renderId: "render-27656dfb",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-5xl md:text-7xl font-extrabold text-white mb-6 font-plus-jakarta leading-tight",
              renderId: "render-dc24b4d1",
              as: "h1",
              children: ["Frequently Asked", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400",
                renderId: "render-ef4f268e",
                as: "span",
                children: "Questions"
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl text-slate-400 leading-relaxed",
              renderId: "render-4b2fe52c",
              as: "p",
              children: "Everything you need to know about YEMC programs, community, and how to get started."
            })]
          })
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950",
        renderId: "render-323cdb23",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-4xl mx-auto",
          renderId: "render-28473af5",
          as: "div",
          children: faqs.map((category, categoryIndex) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "mb-12",
            renderId: "render-654183f1",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-violet-500 font-bold uppercase tracking-widest text-sm mb-6",
              renderId: "render-09a3306f",
              as: "h2",
              children: category.category
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "space-y-4",
              renderId: "render-48a17e9a",
              as: "div",
              children: category.questions.map((faq, questionIndex) => {
                const flatIndex = faqs.slice(0, categoryIndex).reduce((sum, cat) => sum + cat.questions.length, 0) + questionIndex;
                const isOpen = openIndex === flatIndex;
                return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-violet-500/50 transition-all",
                  renderId: "render-7b064e4b",
                  as: "div",
                  children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    onClick: () => toggleFAQ(categoryIndex, questionIndex),
                    className: "w-full flex items-center justify-between p-6 text-left",
                    renderId: "render-96517b16",
                    as: "button",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "text-white font-bold text-lg pr-4",
                      renderId: "render-cc815927",
                      as: "h3",
                      children: faq.q
                    }), /* @__PURE__ */ jsx(ChevronDown, {
                      size: 24,
                      className: `text-violet-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`
                    })]
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: `transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`,
                    renderId: "render-ebc73889",
                    as: "div",
                    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "px-6 pb-6",
                      renderId: "render-b63aa2c9",
                      as: "div",
                      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        className: "text-slate-400 leading-relaxed",
                        renderId: "render-b6bbcb45",
                        as: "p",
                        children: faq.a
                      })
                    })
                  })]
                }, questionIndex);
              })
            })]
          }, categoryIndex))
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950 border-t border-slate-900",
        renderId: "render-cdd891db",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-5xl mx-auto",
          renderId: "render-f88f983d",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-gradient-to-r from-violet-900/40 to-blue-900/40 border border-violet-500/20 rounded-[40px] p-12 text-center relative overflow-hidden",
            renderId: "render-b3323e64",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-violet-500/10 blur-3xl rounded-full",
              renderId: "render-c2dcda03",
              as: "div"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative z-10",
              renderId: "render-78b0cb1d",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-4xl md:text-5xl font-bold text-white mb-4 font-plus-jakarta",
                renderId: "render-ce2c0fd7",
                as: "h3",
                children: "Still Have Questions?"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-slate-300 text-lg mb-8 max-w-2xl mx-auto",
                renderId: "render-540b8faf",
                as: "p",
                children: "Our team is here to help! Get in touch and we'll respond as soon as possible."
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                href: "/contact",
                className: "bg-white text-slate-950 px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-violet-100 transition-all hover:scale-105 shadow-xl inline-block",
                renderId: "render-76c4705d",
                as: "a",
                children: "Contact Us"
              })]
            })]
          })
        })
      })]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
}

const page$7 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(FAQPage, {
      ...props
    })
  });
});

const route10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$7
}, Symbol.toStringTag, { value: 'Module' }));

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send reset email");
      }
      setSuccess(true);
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200 flex items-center justify-center p-6",
    renderId: "render-3d732bd0",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "fixed inset-0 pointer-events-none",
      renderId: "render-c2c89e4c",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full",
        renderId: "render-e4e061a7",
        as: "div"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full",
        renderId: "render-667d47bb",
        as: "div"
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative z-10 w-full max-w-md",
      renderId: "render-da22fddc",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-8",
        renderId: "render-7b4ec116",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          href: "/account/signin",
          className: "inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group",
          renderId: "render-f190f97d",
          as: "a",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center group-hover:border-violet-500 transition-all",
            renderId: "render-524ee6e0",
            as: "div",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              size: 18
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-medium",
            renderId: "render-975fd44a",
            as: "span",
            children: "Back to Sign In"
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-slate-900 border border-slate-800 rounded-3xl p-8",
        renderId: "render-56a5c9aa",
        as: "div",
        children: success ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center space-y-6",
          renderId: "render-1875c48f",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto",
            renderId: "render-3ea0a1ed",
            as: "div",
            children: /* @__PURE__ */ jsx(CheckCircle, {
              size: 32,
              className: "text-green-400"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-c8d43128",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-2xl font-extrabold text-white mb-2 font-plus-jakarta",
              renderId: "render-64c3abb9",
              as: "h1",
              children: "Check Your Email"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-slate-400",
              renderId: "render-9926ee91",
              as: "p",
              children: ["We've sent a password reset link to", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-white",
                renderId: "render-84443689",
                as: "strong",
                children: email
              })]
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "bg-slate-950 border border-slate-800 rounded-xl p-4",
            renderId: "render-e7fe25e1",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-slate-400",
              renderId: "render-5f781469",
              as: "p",
              children: "Click the link in the email to reset your password. The link will expire in 1 hour."
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            href: "/account/signin",
            className: "inline-block text-violet-400 hover:text-violet-300 font-semibold",
            renderId: "render-b0efaa3c",
            as: "a",
            children: "Return to Sign In"
          })]
        }) : /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center mb-8",
            renderId: "render-00d0ab49",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-3xl md:text-4xl font-extrabold text-white mb-2 font-plus-jakarta",
              renderId: "render-8e47521a",
              as: "h1",
              children: "Reset Password"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-slate-400",
              renderId: "render-56073a44",
              as: "p",
              children: "Enter your email and we'll send you a reset link"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            onSubmit: handleSubmit,
            className: "space-y-6",
            renderId: "render-2f4b7e87",
            as: "form",
            children: [error && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "bg-red-500/10 border border-red-500 rounded-xl p-4 flex items-start gap-3",
              renderId: "render-580238b1",
              as: "div",
              children: [/* @__PURE__ */ jsx(AlertCircle, {
                size: 20,
                className: "text-red-400 flex-shrink-0 mt-0.5"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm text-red-400",
                renderId: "render-509a9cb7",
                as: "p",
                children: error
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-06918c4b",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                htmlFor: "email",
                className: "block text-white font-bold mb-3 text-sm",
                renderId: "render-7516e77c",
                as: "label",
                children: "Email Address"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "relative",
                renderId: "render-fde0c59b",
                as: "div",
                children: [/* @__PURE__ */ jsx(Mail, {
                  className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500",
                  size: 18
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "email",
                  id: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors",
                  placeholder: "admin@example.com",
                  required: true,
                  renderId: "render-901a51cd",
                  as: "input"
                })]
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "submit",
              disabled: isLoading,
              className: "w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-violet-600/50 disabled:to-blue-600/50 text-white px-8 py-4 rounded-xl font-extrabold text-base shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2",
              renderId: "render-b50c8092",
              as: "button",
              children: isLoading ? /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin",
                  renderId: "render-57cefca5",
                  as: "div"
                }), "Sending..."]
              }) : "Send Reset Link"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "mt-6 text-center",
            renderId: "render-73ac2685",
            as: "div",
            children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-slate-500 text-sm",
              renderId: "render-6ca52dd2",
              as: "p",
              children: ["Remember your password?", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                href: "/account/signin",
                className: "text-violet-400 hover:text-violet-300 font-semibold",
                renderId: "render-8f89e9a1",
                as: "a",
                children: "Sign in"
              })]
            })
          })]
        })
      })]
    })]
  });
}

const page$6 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(ForgotPasswordPage, {
      ...props
    })
  });
});

const route11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$6
}, Symbol.toStringTag, { value: 'Module' }));

const galleryImages = [{
  src: "https://ucarecdn.com/e14beff5-d58b-41f7-96a2-7fd11feb0cc0/-/format/auto/",
  title: "YEMC Leadership Team",
  category: "Team"
}, {
  src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
  title: "Executive Leadership Session",
  category: "Training"
}, {
  src: "https://ucarecdn.com/e44e0eaa-125a-48a9-9d31-91307512c9ad/-/format/auto/",
  title: "Career Development Workshop",
  category: "Workshop"
}, {
  src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
  title: "Prayer & Worship",
  category: "Spiritual"
}, {
  src: "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=800&q=80",
  title: "One-on-One Mentorship",
  category: "Mentorship"
}, {
  src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
  title: "Strategic Planning Session",
  category: "Strategy"
}, {
  src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  title: "Collaborative Networking",
  category: "Community"
}, {
  src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  title: "Team Brainstorming",
  category: "Team"
}, {
  src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
  title: "Business Conference",
  category: "Training"
}, {
  src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
  title: "Executive Mastermind",
  category: "Workshop"
}, {
  src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80",
  title: "Worship & Reflection",
  category: "Spiritual"
}, {
  src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
  title: "Leadership Training",
  category: "Training"
}];
function MasonryCard({
  image,
  index
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px"
  });
  return /* @__PURE__ */ jsx(motion.div, {
    ref,
    initial: {
      opacity: 0,
      y: 40,
      scale: 0.98
    },
    animate: isInView ? {
      opacity: 1,
      y: 0,
      scale: 1
    } : {
      opacity: 0,
      y: 40,
      scale: 0.98
    },
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: index % 6 * 0.1
    },
    className: "group relative w-full overflow-hidden rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm cursor-pointer",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative overflow-hidden w-full h-full",
      renderId: "render-e131c2c1",
      as: "div",
      children: [/* @__PURE__ */ jsx(OptimizedImage, {
        src: image.src,
        alt: image.title,
        loading: "lazy",
        className: "w-full h-auto block object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out"
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end translate-y-4 group-hover:translate-y-0",
        renderId: "render-90a49ee0",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-fit px-3 py-1 bg-violet-600/80 backdrop-blur-md text-white text-xs font-semibold rounded-full mb-2 uppercase tracking-wide",
          renderId: "render-95287a2e",
          as: "span",
          children: image.category
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-white font-bold text-xl md:text-2xl leading-tight",
          renderId: "render-a1aecfc3",
          as: "h3",
          children: image.title
        })]
      })]
    })
  });
}
function ParallaxSection() {
  const ref = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 0.95]);
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    ref,
    className: "relative h-[400px] md:h-[600px] overflow-hidden my-16 rounded-[40px] shadow-2xl border border-white/10 mx-4 md:mx-6 lg:mx-10",
    renderId: "render-ae2be92c",
    as: "div",
    children: [/* @__PURE__ */ jsxs(motion.div, {
      style: {
        y,
        scale
      },
      className: "absolute inset-0 z-0",
      children: [/* @__PURE__ */ jsx(OptimizedImage, {
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
        alt: "Parallax Background",
        className: "w-full h-full object-cover opacity-60 mix-blend-luminosity"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950",
        renderId: "render-a1cfb5f9",
        as: "div"
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "relative z-10 flex flex-col items-center justify-center h-full px-6 text-center",
      renderId: "render-d7a96439",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-3xl glass-panel p-8 md:p-12 rounded-3xl bg-slate-950/40 backdrop-blur-lg border border-white/10 shadow-[0_0_30px_rgba(124,58,237,0.15)]",
        renderId: "render-3d693847",
        as: "div",
        children: [/* @__PURE__ */ jsxs(motion.h2, {
          initial: {
            opacity: 0,
            y: 30
          },
          whileInView: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.6,
            ease: "easeOut"
          },
          className: "text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 font-plus-jakarta",
          children: ["Moments of", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400",
            renderId: "render-aa1ef4c3",
            as: "span",
            children: "Transformation"
          })]
        }), /* @__PURE__ */ jsx(motion.p, {
          initial: {
            opacity: 0,
            y: 20
          },
          whileInView: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut"
          },
          className: "text-slate-300 text-lg md:text-2xl font-medium",
          children: "Every image tells a story of faith, growth, and excellence at YEMC."
        })]
      })
    })]
  });
}
function StatsBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px"
  });
  const stats = [{
    icon: Camera,
    value: "1000+",
    label: "Moments Captured"
  }, {
    icon: Users,
    value: "200+",
    label: "Youth Trained"
  }, {
    icon: Heart,
    value: "100%",
    label: "Faith-Centered"
  }, {
    icon: Sparkles,
    value: "10+",
    label: "Years Impact"
  }];
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    ref,
    className: "py-20 relative border-y border-white/5 bg-slate-900/40",
    renderId: "render-b295c85d",
    as: "div",
    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "max-w-7xl mx-auto px-6 lg:px-10",
      renderId: "render-28592ae4",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12",
        renderId: "render-46aa68fb",
        as: "div",
        children: stats.map((stat, index) => /* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: isInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 20
          },
          transition: {
            duration: 0.5,
            delay: index * 0.1
          },
          className: "flex flex-col items-center justify-center text-center group",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-16 h-16 md:w-20 md:h-20 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-5 border border-white/10 group-hover:bg-violet-600/20 group-hover:border-violet-500/50 transition-colors duration-300",
            renderId: "render-f58efb53",
            as: "div",
            children: /* @__PURE__ */ jsx(stat.icon, {
              size: 32,
              className: "text-violet-400 group-hover:text-white transition-colors"
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-3xl md:text-5xl font-extrabold text-white mb-2 font-plus-jakarta",
            renderId: "render-4cb535aa",
            as: "div",
            children: stat.value
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-slate-400 text-sm md:text-base font-semibold uppercase tracking-wider",
            renderId: "render-7336cd48",
            as: "div",
            children: stat.label
          })]
        }, index))
      })
    })
  });
}
function GalleryPage() {
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-[#070914] relative selection:bg-violet-500/30 selection:text-white",
    renderId: "render-cc83305d",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden",
      renderId: "render-6089667a",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-violet-600/10 blur-[100px] rounded-full mix-blend-screen opacity-60",
        renderId: "render-ad015f1b",
        as: "div"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-blue-600/10 blur-[100px] rounded-full mix-blend-screen opacity-60",
        renderId: "render-ff0e8b31",
        as: "div"
      })]
    }), /* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "pt-32 md:pt-40 relative z-10 w-full overflow-hidden",
      renderId: "render-30d587c7",
      as: "main",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "px-6 lg:px-10 pb-16 relative",
        renderId: "render-3b238548",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-4xl mx-auto text-center",
          renderId: "render-f070cb45",
          as: "div",
          children: /* @__PURE__ */ jsxs(motion.div, {
            initial: {
              opacity: 0,
              y: 30
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              duration: 0.8,
              ease: "easeOut"
            },
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 font-plus-jakarta tracking-tight",
              renderId: "render-459fbff3",
              as: "h1",
              children: ["Our", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400",
                renderId: "render-93bebcba",
                as: "span",
                children: "Gallery"
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed",
              renderId: "render-3e74e605",
              as: "p",
              children: "A vivid visual journey through leadership development, spiritual growth, and community excellence."
            })]
          })
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "px-4 md:px-6 lg:px-10 pb-24",
        renderId: "render-0bbe2bd1",
        as: "section",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-screen-2xl mx-auto",
          renderId: "render-6c1e2628",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex sm:hidden flex-col gap-6",
            renderId: "render-2e269ac9",
            as: "div",
            children: galleryImages.map((image, index) => /* @__PURE__ */ jsx(MasonryCard, {
              image,
              index
            }, `mobile-${index}`))
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "hidden sm:flex lg:hidden gap-6 w-full",
            renderId: "render-00204f5e",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex flex-col gap-6 flex-1",
              renderId: "render-397382b2",
              as: "div",
              children: galleryImages.filter((_, i) => i % 2 === 0).map((image, index) => /* @__PURE__ */ jsx(MasonryCard, {
                image,
                index: index * 2
              }, `tablet-0-${index}`))
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex flex-col gap-6 flex-1",
              renderId: "render-34604c76",
              as: "div",
              children: galleryImages.filter((_, i) => i % 2 === 1).map((image, index) => /* @__PURE__ */ jsx(MasonryCard, {
                image,
                index: index * 2 + 1
              }, `tablet-1-${index}`))
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "hidden lg:flex gap-6 w-full",
            renderId: "render-4ec28896",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex flex-col gap-6 flex-1",
              renderId: "render-c702d3d7",
              as: "div",
              children: galleryImages.filter((_, i) => i % 3 === 0).map((image, index) => /* @__PURE__ */ jsx(MasonryCard, {
                image,
                index: index * 3
              }, `desktop-0-${index}`))
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex flex-col gap-6 flex-1",
              renderId: "render-5dce7e76",
              as: "div",
              children: galleryImages.filter((_, i) => i % 3 === 1).map((image, index) => /* @__PURE__ */ jsx(MasonryCard, {
                image,
                index: index * 3 + 1
              }, `desktop-1-${index}`))
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex flex-col gap-6 flex-1",
              renderId: "render-74d60244",
              as: "div",
              children: galleryImages.filter((_, i) => i % 3 === 2).map((image, index) => /* @__PURE__ */ jsx(MasonryCard, {
                image,
                index: index * 3 + 2
              }, `desktop-2-${index}`))
            })]
          })]
        })
      }), /* @__PURE__ */ jsx(ParallaxSection, {}), /* @__PURE__ */ jsx(StatsBanner, {}), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "px-6 lg:px-10 py-24",
        renderId: "render-08c51e8f",
        as: "section",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto",
          renderId: "render-cd8b6474",
          as: "div",
          children: [/* @__PURE__ */ jsx(motion.h2, {
            initial: {
              opacity: 0,
              y: 20
            },
            whileInView: {
              opacity: 1,
              y: 0
            },
            viewport: {
              once: true
            },
            className: "text-4xl md:text-5xl font-extrabold text-white mb-12 text-center font-plus-jakarta",
            children: "Featured Moments"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "grid grid-cols-1 md:grid-cols-2 gap-8",
            renderId: "render-2f20d2aa",
            as: "div",
            children: galleryImages.slice(0, 4).map((image, index) => /* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                scale: 0.95
              },
              whileInView: {
                opacity: 1,
                scale: 1
              },
              whileHover: {
                scale: 1.02
              },
              transition: {
                duration: 0.5,
                delay: index * 0.1
              },
              viewport: {
                once: true
              },
              className: "group relative rounded-3xl overflow-hidden border border-white/5 bg-slate-900/50 aspect-[4/3] shadow-lg cursor-pointer",
              children: [/* @__PURE__ */ jsx(OptimizedImage, {
                src: image.src,
                alt: image.title,
                className: "w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "absolute inset-0 bg-gradient-to-t from-[#070914] via-transparent to-transparent opacity-90",
                renderId: "render-3e96f3a5",
                as: "div"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "absolute bottom-0 left-0 p-8",
                renderId: "render-a572ae16",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "inline-block px-4 py-1.5 bg-violet-600/30 backdrop-blur-md border border-violet-500/50 text-white text-xs font-bold rounded-full mb-3 tracking-wide",
                  renderId: "render-637d79f5",
                  as: "span",
                  children: image.category
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-white font-bold text-2xl md:text-3xl leading-snug",
                  renderId: "render-b3869494",
                  as: "h3",
                  children: image.title
                })]
              })]
            }, index))
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-24 px-6 relative flex justify-center",
        renderId: "render-33cf11ca",
        as: "section",
        children: /* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 40
          },
          whileInView: {
            opacity: 1,
            y: 0
          },
          viewport: {
            once: true
          },
          className: "w-full max-w-4xl bg-gradient-to-br from-violet-900/40 to-blue-900/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-12 md:p-16 text-center shadow-2xl",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-4xl md:text-5xl font-extrabold text-white mb-6 font-plus-jakarta",
            renderId: "render-8c80111a",
            as: "h3",
            children: "Ready to Join the Master Class?"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto",
            renderId: "render-8575f299",
            as: "p",
            children: "Create your own moments of transformation, growth, and unparalleled impact alongside our leadership team."
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            href: "/join",
            className: "inline-block px-10 py-5 bg-white text-slate-950 font-extrabold text-lg rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:bg-violet-50 hover:scale-105 transition-all duration-300 uppercase tracking-widest",
            renderId: "render-3cddc95a",
            as: "a",
            children: "Get Started Today"
          })]
        })
      })]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
}

const page$5 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(GalleryPage, {
      ...props
    })
  });
});

const route12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$5
}, Symbol.toStringTag, { value: 'Module' }));

function JoinPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    status: "",
    otherStatus: "",
    institution: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const emailErrorFor = (value) => {
    if (!value.trim()) return "Please enter a valid email address";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Please enter a valid email address";
  };
  const phoneErrorFor = (value) => {
    if (!value.trim()) return "Phone number is required";
    if (!/^[\d\s()+-]+$/.test(value)) return "Please enter a valid phone number";
    return value.replace(/\D/g, "").length === 10 ? "" : "Phone number must be exactly 10 digits";
  };
  const validateForm = () => {
    const errors = {};
    const emailError = emailErrorFor(formData.email);
    if (emailError) errors.email = emailError;
    const phoneError = phoneErrorFor(formData.phoneNumber);
    if (phoneError) errors.phoneNumber = phoneError;
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!formData.status) {
      errors.status = "Please select your status";
    }
    if (formData.status === "Other" && !formData.otherStatus.trim()) {
      errors.otherStatus = "Please specify your status";
    }
    if (!formData.institution.trim() && formData.status !== "Other" && formData.status !== "Unemployed") {
      errors.institution = "Please enter your school or place of work";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }
    if (!consentChecked) {
      errors.consent = "Please confirm your membership in the YEMC Forum.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setValidationErrors((prev) => {
      const next = {
        ...prev
      };
      if (name === "email") next.email = value.trim() ? emailErrorFor(value) : "";
      else if (name === "phoneNumber") next.phoneNumber = value.trim() ? phoneErrorFor(value) : "";
      else if (prev[name]) next[name] = "";
      return next;
    });
    setSubmitError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/join-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          consentGiven: consentChecked
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          status: "",
          otherStatus: "",
          institution: "",
          message: ""
        });
        setConsentChecked(false);
        setSubmitted(false);
      }, 5e3);
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError(error.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200",
    renderId: "render-211291b7",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "fixed inset-0 pointer-events-none",
      renderId: "render-074fecba",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full",
        renderId: "render-56f3b9d3",
        as: "div"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full",
        renderId: "render-83a02eac",
        as: "div"
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative z-10",
      renderId: "render-d046f895",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "pt-8 px-6 md:px-10 max-w-7xl mx-auto",
        renderId: "render-10c60954",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          href: "/",
          className: "inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group",
          renderId: "render-ef094d68",
          as: "a",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center group-hover:border-violet-500 transition-all",
            renderId: "render-ad0b81b4",
            as: "div",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              size: 18
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-medium",
            renderId: "render-15f22390",
            as: "span",
            children: "Back to Home"
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 md:px-10",
        renderId: "render-2c97073a",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-3xl mx-auto",
          renderId: "render-9d0fb401",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-center mb-12",
            renderId: "render-0e2f315c",
            as: "div",
            children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-4xl md:text-6xl font-extrabold text-white mb-4 font-plus-jakarta leading-tight",
              renderId: "render-2d008cc5",
              as: "h1",
              children: ["Register for", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400",
                renderId: "render-55b70c2c",
                as: "span",
                children: "YEMC 2026"
              })]
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl md:rounded-[40px] p-8 md:p-12",
            renderId: "render-eb0b2857",
            as: "div",
            children: submitted ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-center py-12",
              renderId: "render-91bff66e",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6",
                renderId: "render-74a5cbde",
                as: "div",
                children: /* @__PURE__ */ jsx("svg", {
                  width: "40",
                  height: "40",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "3",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "text-green-500",
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    points: "20 6 9 17 4 12",
                    renderId: "render-13fed481",
                    as: "polyline"
                  })
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-2xl md:text-3xl font-bold text-white mb-3",
                renderId: "render-7f408c8f",
                as: "h3",
                children: "Welcome to the Team!"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-slate-400 text-lg",
                renderId: "render-916b15a9",
                as: "p",
                children: "We've sent a confirmation email to your inbox. We'll be in touch soon!"
              })]
            }) : /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              onSubmit: handleSubmit,
              className: "space-y-6",
              renderId: "render-debd1235",
              as: "form",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "-mx-8 -mt-8 md:-mx-12 md:-mt-12 overflow-hidden border-b border-slate-800",
                renderId: "render-8297cf27",
                as: "div",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "relative isolate h-52 md:h-64",
                  renderId: "render-9ec2bc92",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(OptimizedImage, {
                    src: conferenceImage,
                    alt: "A YEMC conference attendee speaking to the audience",
                    loading: "eager",
                    className: "absolute inset-0 h-full w-full object-cover object-[center_42%]"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/5",
                    renderId: "render-b678767f",
                    as: "div"
                  }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    className: "absolute inset-x-5 bottom-5 md:inset-x-8 md:bottom-7",
                    renderId: "render-5afa073c",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-200",
                      renderId: "render-807e9cc4",
                      as: "p",
                      children: "Young Executive Master Class"
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "font-plus-jakarta text-2xl font-extrabold text-white md:text-4xl",
                      renderId: "render-027f2b17",
                      as: "h2",
                      children: "2026 Conference"
                    })]
                  })]
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "grid gap-4 px-8 py-5 text-center text-sm md:grid-cols-3 md:gap-6 md:px-12 md:text-left md:text-base",
                  renderId: "render-c2d725bc",
                  as: "dl",
                  children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    renderId: "render-b827498b",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "mb-1 text-xs font-bold uppercase tracking-wider text-violet-300",
                      renderId: "render-a221ec77",
                      as: "dt",
                      children: "Date"
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "text-slate-200",
                      renderId: "render-88331511",
                      as: "dd",
                      children: "Saturday, 24th October 2026"
                    })]
                  }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    renderId: "render-7397df40",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "mb-1 text-xs font-bold uppercase tracking-wider text-violet-300",
                      renderId: "render-87a66c76",
                      as: "dt",
                      children: "Venue"
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "text-slate-200",
                      renderId: "render-d5f0b6ba",
                      as: "dd",
                      children: "Palms by Eagles (formerly Holiday Inn)"
                    })]
                  }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    renderId: "render-0acb7bb1",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "mb-1 text-xs font-bold uppercase tracking-wider text-violet-300",
                      renderId: "render-b430a487",
                      as: "dt",
                      children: "Theme"
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "text-slate-200",
                      renderId: "render-d38288ee",
                      as: "dd",
                      children: "AI for the next Gen of career and business executives"
                    })]
                  })]
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-72d5c140",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  htmlFor: "fullName",
                  className: "block text-white font-bold mb-3 text-sm md:text-base",
                  renderId: "render-60cf556d",
                  as: "label",
                  children: "Full Name"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "text",
                  id: "fullName",
                  name: "fullName",
                  value: formData.fullName,
                  onChange: handleChange,
                  className: `w-full bg-slate-950 border ${validationErrors.fullName ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors text-sm md:text-base`,
                  placeholder: "Enter your full name",
                  renderId: "render-6161a82f",
                  as: "input"
                }), validationErrors.fullName && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "mt-2 text-sm text-red-400",
                  renderId: "render-13e78fa5",
                  as: "p",
                  children: validationErrors.fullName
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-d9706511",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  htmlFor: "email",
                  className: "block text-white font-bold mb-3 text-sm md:text-base",
                  renderId: "render-dba8cee2",
                  as: "label",
                  children: "Email Address"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "email",
                  id: "email",
                  name: "email",
                  value: formData.email,
                  onChange: handleChange,
                  className: `w-full bg-slate-950 border ${validationErrors.email ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors text-sm md:text-base`,
                  placeholder: "your.email@example.com",
                  renderId: "render-9c65ee5f",
                  as: "input"
                }), validationErrors.email && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "mt-2 text-sm text-red-400",
                  renderId: "render-d0d317fd",
                  as: "p",
                  children: validationErrors.email
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-925b5ed9",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  htmlFor: "phoneNumber",
                  className: "block text-white font-bold mb-3 text-sm md:text-base",
                  renderId: "render-57233d50",
                  as: "label",
                  children: "Phone Number"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "tel",
                  id: "phoneNumber",
                  name: "phoneNumber",
                  value: formData.phoneNumber,
                  onChange: handleChange,
                  className: `w-full bg-slate-950 border ${validationErrors.phoneNumber ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors text-sm md:text-base`,
                  placeholder: "1234567890 (10 digits)",
                  renderId: "render-2f95d815",
                  as: "input"
                }), validationErrors.phoneNumber && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "mt-2 text-sm text-red-400",
                  renderId: "render-63959cc6",
                  as: "p",
                  children: validationErrors.phoneNumber
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-f810eafd",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  htmlFor: "status",
                  className: "block text-white font-bold mb-3 text-sm md:text-base",
                  renderId: "render-ed8cb641",
                  as: "label",
                  children: "Status"
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  id: "status",
                  name: "status",
                  value: formData.status,
                  onChange: handleChange,
                  className: `w-full bg-slate-950 border ${validationErrors.status ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white focus:outline-none focus:border-violet-500 transition-colors text-sm md:text-base appearance-none cursor-pointer`,
                  style: {
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.25rem"
                  },
                  renderId: "render-95e18a6d",
                  as: "select",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: "",
                    disabled: true,
                    className: "bg-slate-950 text-slate-500",
                    renderId: "render-d9679d26",
                    as: "option",
                    children: "Select your status"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: "Student",
                    className: "bg-slate-950 text-white",
                    renderId: "render-9f6129d3",
                    as: "option",
                    children: "Student"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: "Working",
                    className: "bg-slate-950 text-white",
                    renderId: "render-57b44f75",
                    as: "option",
                    children: "Working"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: "Unemployed",
                    className: "bg-slate-950 text-white",
                    renderId: "render-5757efeb",
                    as: "option",
                    children: "Unemployed"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: "Other",
                    className: "bg-slate-950 text-white",
                    renderId: "render-e45bddd5",
                    as: "option",
                    children: "Other"
                  })]
                }), validationErrors.status && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "mt-2 text-sm text-red-400",
                  renderId: "render-eecb9fef",
                  as: "p",
                  children: validationErrors.status
                }), formData.status === "Other" && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "mt-4",
                  renderId: "render-49846ba7",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    htmlFor: "otherStatus",
                    className: "block text-white font-bold mb-3 text-sm md:text-base",
                    renderId: "render-29f95228",
                    as: "label",
                    children: "Please specify your status"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    type: "text",
                    id: "otherStatus",
                    name: "otherStatus",
                    value: formData.otherStatus,
                    onChange: handleChange,
                    className: `w-full bg-slate-950 border ${validationErrors.otherStatus ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors text-sm md:text-base`,
                    placeholder: "Enter your status",
                    renderId: "render-bec937f2",
                    as: "input"
                  }), validationErrors.otherStatus && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "mt-2 text-sm text-red-400",
                    renderId: "render-7e607a45",
                    as: "p",
                    children: validationErrors.otherStatus
                  })]
                })]
              }), formData.status !== "Other" && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-aa8ff2c6",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  htmlFor: "institution",
                  className: "block text-white font-bold mb-3 text-sm md:text-base",
                  renderId: "render-40bf3e1e",
                  as: "label",
                  children: "School or Place of Work"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "text",
                  id: "institution",
                  name: "institution",
                  value: formData.institution,
                  onChange: handleChange,
                  className: `w-full bg-slate-950 border ${validationErrors.institution ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors text-sm md:text-base`,
                  placeholder: "Enter your school or company name",
                  renderId: "render-803e34df",
                  as: "input"
                }), validationErrors.institution && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "mt-2 text-sm text-red-400",
                  renderId: "render-0db507fd",
                  as: "p",
                  children: validationErrors.institution
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-ff2bc55a",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  htmlFor: "message",
                  className: "block text-white font-bold mb-3 text-sm md:text-base",
                  renderId: "render-29e55516",
                  as: "label",
                  children: "Message"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  id: "message",
                  name: "message",
                  value: formData.message,
                  onChange: handleChange,
                  rows: 6,
                  className: `w-full bg-slate-950 border ${validationErrors.message ? "border-red-500" : "border-slate-800"} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors resize-none text-sm md:text-base`,
                  placeholder: "Tell us about your goals and what you hope to achieve with YEMC...",
                  renderId: "render-9526308b",
                  as: "textarea"
                }), validationErrors.message && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "mt-2 text-sm text-red-400",
                  renderId: "render-ea4567b3",
                  as: "p",
                  children: validationErrors.message
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "rounded-2xl border border-slate-800 bg-slate-950/60 p-4",
                renderId: "render-4f99ff3c",
                as: "div",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-start gap-3 text-sm md:text-base text-slate-200 cursor-pointer",
                  renderId: "render-14b8d7e6",
                  as: "label",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    type: "checkbox",
                    checked: consentChecked,
                    onChange: (e) => {
                      setConsentChecked(e.target.checked);
                      if (validationErrors.consent) {
                        setValidationErrors((prev) => ({
                          ...prev,
                          consent: ""
                        }));
                      }
                      setSubmitError("");
                    },
                    className: "mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-violet-500 focus:ring-violet-500",
                    renderId: "render-3c22b24a",
                    as: "input"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    renderId: "render-119fe5a5",
                    as: "span",
                    children: "Please tick to confirm your membership in the YEMC Forum. By joining, you will have access to information on YEMC events, webinars, opportunities, and other engagements."
                  })]
                }), validationErrors.consent && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "mt-2 text-sm text-red-400",
                  renderId: "render-1094a3b8",
                  as: "p",
                  children: validationErrors.consent
                })]
              }), submitError && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "bg-red-500/10 border border-red-500 rounded-xl p-4",
                renderId: "render-3d72b465",
                as: "div",
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-sm text-red-400",
                  renderId: "render-43800412",
                  as: "p",
                  children: submitError
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "submit",
                disabled: isSubmitting,
                className: "w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-violet-600/50 disabled:to-blue-600/50 text-white px-8 py-4 md:py-5 rounded-xl md:rounded-2xl font-extrabold text-base md:text-lg shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                renderId: "render-b2ae4c3b",
                as: "button",
                children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, {
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin",
                    renderId: "render-a1270892",
                    as: "div"
                  }), "Submitting..."]
                }) : /* @__PURE__ */ jsxs(Fragment, {
                  children: ["Submit Application", /* @__PURE__ */ jsx(Send, {
                    size: 18
                  })]
                })
              })]
            })
          })]
        })
      })]
    })]
  });
}

const page$4 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(JoinPage, {
      ...props
    })
  });
});

const route13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$4
}, Symbol.toStringTag, { value: 'Module' }));

function LessonsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const speakers = [{
    name: "Apostle Isaac Ali Asomah",
    title: "CEO & Founder",
    bio: "Visionary leader and founder of the Young Executive Master Class program with over 20 years of executive experience.",
    tags: ["Leadership", "Strategy"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    materials: [{
      type: "video",
      title: "Leadership Fundamentals Masterclass",
      duration: "45 min"
    }, {
      type: "pdf",
      title: "Executive Leadership Framework",
      pages: "24 pages"
    }, {
      type: "video",
      title: "Building High-Performance Teams",
      duration: "38 min"
    }]
  }, {
    name: "Mr. C.B Asante",
    title: "Business Strategist",
    bio: "Renowned business strategist specializing in market expansion and corporate growth strategies.",
    tags: ["Business", "Strategy"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    materials: [{
      type: "pdf",
      title: "Strategic Planning Guide",
      pages: "32 pages"
    }, {
      type: "video",
      title: "Market Expansion Strategies",
      duration: "52 min"
    }, {
      type: "pdf",
      title: "Growth Frameworks for Executives",
      pages: "18 pages"
    }]
  }, {
    name: "Rev. Nora Ali",
    title: "Spiritual Leadership",
    bio: "Inspirational speaker on ethical leadership and integrating spiritual values in business.",
    tags: ["Ethics", "Spirituality"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    materials: [{
      type: "video",
      title: "Faith in the Marketplace",
      duration: "41 min"
    }, {
      type: "pdf",
      title: "Ethical Leadership Principles",
      pages: "22 pages"
    }, {
      type: "video",
      title: "Leading with Integrity",
      duration: "35 min"
    }]
  }, {
    name: "Mr. Oliver Detty",
    title: "Innovation Expert",
    bio: "Leading expert in business innovation and digital transformation strategies.",
    tags: ["Innovation", "Technology"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    materials: [{
      type: "video",
      title: "Digital Transformation Essentials",
      duration: "48 min"
    }, {
      type: "pdf",
      title: "Innovation Toolkit for Leaders",
      pages: "28 pages"
    }, {
      type: "video",
      title: "Emerging Tech Trends 2026",
      duration: "44 min"
    }]
  }, {
    name: "Mr. Alex Boateng Atakorah",
    title: "Networking Specialist",
    bio: "Master of professional networking and relationship building in corporate environments.",
    tags: ["Networking", "Relationships"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    materials: [{
      type: "video",
      title: "Building Your Professional Network",
      duration: "39 min"
    }, {
      type: "pdf",
      title: "Networking Strategies That Work",
      pages: "20 pages"
    }, {
      type: "video",
      title: "Relationship Capital in Business",
      duration: "42 min"
    }]
  }];
  const galleryItems = [{
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    title: "Opening Keynote",
    description: "Apostle Isaac Ali Asomah delivering the opening address",
    category: "Keynote"
  }, {
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    title: "Signing In",
    description: "All participants keying in their credentials",
    category: "Workshops"
  }, {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    title: "Spiritual Leadership",
    description: "Rev. Nora Ali leading the opening prayer",
    category: "Keynote"
  }, {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    title: "Innovation Workshop",
    description: "Mr. Oliver Detty demonstrating new technologies",
    category: "Workshops"
  }, {
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    title: "Networking Session",
    description: "Mr. Alex Boateng Atakorah facilitating connections",
    category: "Networking"
  }, {
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    title: "Photo Shoots",
    description: "Young participants taking photos before and after event",
    category: "Awards"
  }, {
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    title: "Questions and Answers",
    description: "Young executives ask questions during sessions held by speakers",
    category: "Workshops"
  }, {
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    title: "Group Photo",
    description: "Participants applauding speakers",
    category: "Networking"
  }];
  const testimonials = [{
    name: "Larry Glover",
    role: "Software Developer at YEMC",
    content: "YEMC has revolutionized my approach to business leadership. The Christian perspective combined with practical business insights has given me a unique edge in my career development.",
    rating: 5
  }, {
    name: "Pastor Esther",
    role: "Startup Sponsor",
    content: "Mr. Asante's strategic frameworks are game-changers. I've already implemented three of his models in our expansion plan.",
    rating: 5
  }, {
    name: "Mrs. Amuzu",
    role: "Community Member",
    content: "The networking opportunities were incredible. Thanks to Mr. Atakorah's session, I secured two potential investors for my venture.",
    rating: 5
  }];
  const filters = ["All", "Keynote", "Workshops", "Networking", "Awards"];
  const filteredGallery = activeFilter === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter);
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200",
    renderId: "render-6edd0a22",
    as: "div",
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "pt-24",
      renderId: "render-b16cb6ee",
      as: "main",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "py-20 px-6 relative overflow-hidden",
        renderId: "render-46050a92",
        as: "section",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full",
          renderId: "render-d457ae53",
          as: "div"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto relative z-10",
          renderId: "render-937b3f3f",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center max-w-4xl mx-auto",
            renderId: "render-25d5eb70",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-5xl md:text-7xl font-extrabold text-white mb-6 font-plus-jakarta leading-tight",
              renderId: "render-11e20e36",
              as: "h1",
              children: ["Learn From The", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400",
                renderId: "render-314dff92",
                as: "span",
                children: "Best"
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl text-slate-400 mb-8 leading-relaxed",
              renderId: "render-e7cecbfe",
              as: "p",
              children: "Access world-class resources, engage with distinguished speakers, and explore past sessions that shaped the careers of hundreds of young executives."
            })]
          })
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950",
        renderId: "render-a8925ac9",
        as: "section",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto",
          renderId: "render-5e66dc3d",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "mb-12",
            renderId: "render-490d30fb",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-violet-500 font-bold uppercase tracking-widest text-sm mb-4",
              renderId: "render-c0cb45c5",
              as: "h2",
              children: "Our Faculty"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-4xl md:text-5xl font-bold text-white font-plus-jakarta",
              renderId: "render-e80b3732",
              as: "h3",
              children: "Distinguished Speakers"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
            renderId: "render-1aa82a59",
            as: "div",
            children: speakers.map((speaker, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-violet-500/50 transition-all group",
              renderId: "render-6e32620e",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-4 mb-6",
                renderId: "render-b17c7688",
                as: "div",
                children: [/* @__PURE__ */ jsx(OptimizedImage, {
                  src: speaker.image,
                  alt: speaker.name,
                  className: "w-20 h-20 rounded-2xl object-cover border-2 border-violet-500"
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  renderId: "render-37ec0225",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-white font-bold text-lg mb-1",
                    renderId: "render-6474f860",
                    as: "h4",
                    children: speaker.name
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-violet-400 text-sm font-medium",
                    renderId: "render-49a69ca8",
                    as: "p",
                    children: speaker.title
                  })]
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-slate-400 text-sm leading-relaxed mb-6",
                renderId: "render-b828911f",
                as: "p",
                children: speaker.bio
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "flex flex-wrap gap-2 mb-6",
                renderId: "render-215dce79",
                as: "div",
                children: speaker.tags.map((tag) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-3 py-1 bg-violet-500/10 text-violet-400 rounded-full text-xs font-medium",
                  renderId: "render-bdbb359f",
                  as: "span",
                  children: tag
                }, tag))
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                onClick: () => setSelectedSpeaker(speaker),
                className: "flex items-center gap-2 text-white font-bold hover:text-violet-400 transition-colors group",
                renderId: "render-6dba7781",
                as: "button",
                children: [/* @__PURE__ */ jsx(Play, {
                  size: 16
                }), "View Materials"]
              })]
            }, index))
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950 border-t border-slate-900",
        renderId: "render-3b8089b1",
        as: "section",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto",
          renderId: "render-bcc100ef",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "mb-12",
            renderId: "render-fa9d7417",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-violet-500 font-bold uppercase tracking-widest text-sm mb-4",
              renderId: "render-183a7019",
              as: "h2",
              children: "Past Events"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-4xl md:text-5xl font-bold text-white font-plus-jakarta mb-8",
              renderId: "render-a9b8698f",
              as: "h3",
              children: "Event Gallery"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex flex-wrap gap-3",
              renderId: "render-dae2dc73",
              as: "div",
              children: filters.map((filter) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                onClick: () => setActiveFilter(filter),
                className: `px-6 py-2.5 rounded-full font-medium text-sm transition-all ${activeFilter === filter ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"}`,
                renderId: "render-04b08c3f",
                as: "button",
                children: filter
              }, filter))
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
            renderId: "render-b16c735a",
            as: "div",
            children: filteredGallery.map((item, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 transition-all",
              renderId: "render-b138b877",
              as: "div",
              children: [/* @__PURE__ */ jsx(OptimizedImage, {
                src: item.image,
                alt: item.title,
                className: "w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "p-6",
                renderId: "render-f2d3901c",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-white font-bold text-lg mb-2",
                  renderId: "render-a93a35fc",
                  as: "h4",
                  children: item.title
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-slate-400 text-sm",
                  renderId: "render-337b04a0",
                  as: "p",
                  children: item.description
                })]
              })]
            }, index))
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-center mt-12",
            renderId: "render-ada2f90d",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold border border-slate-800 hover:border-violet-500 transition-all",
              renderId: "render-c858f89b",
              as: "button",
              children: "Load More Photos"
            })
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950 border-t border-slate-900",
        renderId: "render-cc6f482a",
        as: "section",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto",
          renderId: "render-b0c3d2dd",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "mb-12 text-center",
            renderId: "render-03726f5b",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-violet-500 font-bold uppercase tracking-widest text-sm mb-4",
              renderId: "render-2554b840",
              as: "h2",
              children: "Success Stories"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-4xl md:text-5xl font-bold text-white font-plus-jakarta",
              renderId: "render-eec5e32d",
              as: "h3",
              children: "What Participants Said"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "grid md:grid-cols-3 gap-8",
            renderId: "render-5b34f81e",
            as: "div",
            children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-violet-500/50 transition-all",
              renderId: "render-4a657dc2",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "flex gap-1 mb-4",
                renderId: "render-5bfa418f",
                as: "div",
                children: [...Array(testimonial.rating)].map((_, i) => /* @__PURE__ */ jsx(Star, {
                  size: 18,
                  className: "fill-yellow-500 text-yellow-500"
                }, i))
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "text-slate-300 leading-relaxed mb-6 text-sm italic",
                renderId: "render-cdb28fd1",
                as: "p",
                children: ['"', testimonial.content, '"']
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-8440a538",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-white font-bold",
                  renderId: "render-34a62fa7",
                  as: "h4",
                  children: testimonial.name
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-violet-400 text-sm",
                  renderId: "render-36984f13",
                  as: "p",
                  children: testimonial.role
                })]
              })]
            }, index))
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950",
        renderId: "render-9e9e14d9",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-5xl mx-auto",
          renderId: "render-c1a95c8b",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-gradient-to-r from-violet-900/40 to-blue-900/40 border border-violet-500/20 rounded-[40px] p-12 text-center relative overflow-hidden",
            renderId: "render-638bd4a6",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-violet-500/10 blur-3xl rounded-full",
              renderId: "render-f3b34943",
              as: "div"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative z-10",
              renderId: "render-3d129f44",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-4xl md:text-5xl font-bold text-white mb-4 font-plus-jakarta",
                renderId: "render-6df08299",
                as: "h3",
                children: "Join Us Next Year!"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-slate-300 text-lg mb-8 max-w-2xl mx-auto",
                renderId: "render-4ebe63d0",
                as: "p",
                children: "The Young Executive Master Class 2026 will be even bigger and better. Be the first to know when registration opens."
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "bg-white text-slate-950 px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-violet-100 transition-all hover:scale-105 shadow-xl",
                renderId: "render-e115c9c5",
                as: "button",
                children: "Notify Me"
              })]
            })]
          })
        })
      })]
    }), /* @__PURE__ */ jsx(Footer, {}), selectedSpeaker && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",
      renderId: "render-052b6479",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-slate-900 border border-slate-800 rounded-[40px] max-w-3xl w-full max-h-[90vh] overflow-y-auto",
        renderId: "render-5610fbce",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex items-center justify-between rounded-t-[40px]",
          renderId: "render-6271efff",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center gap-4",
            renderId: "render-3a415b79",
            as: "div",
            children: [/* @__PURE__ */ jsx(OptimizedImage, {
              src: selectedSpeaker.image,
              alt: selectedSpeaker.name,
              className: "w-16 h-16 rounded-2xl object-cover border-2 border-violet-500"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-f68ef2a2",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-white font-bold text-xl",
                renderId: "render-3f3facfb",
                as: "h3",
                children: selectedSpeaker.name
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-violet-400 text-sm",
                renderId: "render-838f860c",
                as: "p",
                children: selectedSpeaker.title
              })]
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => setSelectedSpeaker(null),
            className: "w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition-colors",
            renderId: "render-10d85809",
            as: "button",
            children: /* @__PURE__ */ jsx(X, {
              size: 20,
              className: "text-white"
            })
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "p-8",
          renderId: "render-ce840562",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-slate-400 mb-8 leading-relaxed",
            renderId: "render-91bf800b",
            as: "p",
            children: selectedSpeaker.bio
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex flex-wrap gap-2 mb-8",
            renderId: "render-7d1f2ab2",
            as: "div",
            children: selectedSpeaker.tags.map((tag) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "px-4 py-2 bg-violet-500/10 text-violet-400 rounded-full text-sm font-medium",
              renderId: "render-c7f22283",
              as: "span",
              children: tag
            }, tag))
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-white font-bold text-lg mb-6",
            renderId: "render-75e55291",
            as: "h4",
            children: "Available Materials"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "space-y-4",
            renderId: "render-9ab7abb9",
            as: "div",
            children: selectedSpeaker.materials.map((material, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-violet-500/50 transition-all group flex items-center justify-between",
              renderId: "render-360d9ab1",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-4",
                renderId: "render-c97b3b00",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center",
                  renderId: "render-9b2718e0",
                  as: "div",
                  children: material.type === "video" ? /* @__PURE__ */ jsx(Video, {
                    size: 20,
                    className: "text-violet-500"
                  }) : /* @__PURE__ */ jsx(FileText, {
                    size: 20,
                    className: "text-violet-500"
                  })
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  renderId: "render-cf47cad1",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-white font-bold mb-1",
                    renderId: "render-e014c6d6",
                    as: "h5",
                    children: material.title
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-slate-500 text-sm",
                    renderId: "render-6e3cacc2",
                    as: "p",
                    children: material.duration || material.pages
                  })]
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-2 text-violet-400 font-bold hover:text-violet-300 transition-colors",
                renderId: "render-85a3c9e1",
                as: "button",
                children: [/* @__PURE__ */ jsx(Download, {
                  size: 18
                }), "Access"]
              })]
            }, index))
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "mt-8 p-6 bg-gradient-to-br from-violet-900/20 to-blue-900/20 border border-violet-500/20 rounded-2xl",
            renderId: "render-e4122d27",
            as: "div",
            children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-slate-400 text-sm text-center",
              renderId: "render-8a0edbf3",
              as: "p",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-white",
                renderId: "render-2e9d05c4",
                as: "strong",
                children: "Note:"
              }), " Materials are available exclusively to registered YEMC participants.", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                href: "/contact",
                className: "text-violet-400 hover:text-violet-300 ml-1",
                renderId: "render-b8d037a0",
                as: "a",
                children: "Contact us"
              }), " ", "to get access."]
            })
          })]
        })]
      })
    })]
  });
}

const page$3 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(LessonsPage, {
      ...props
    })
  });
});

const route14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$3
}, Symbol.toStringTag, { value: 'Module' }));

function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenParam = urlParams.get("token");
      if (tokenParam) {
        setToken(tokenParam);
      } else {
        setError("Invalid reset link. Please request a new password reset.");
      }
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token,
          password
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password");
      }
      setSuccess(true);
    } catch (err) {
      console.error("Reset password error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200 flex items-center justify-center p-6",
    renderId: "render-1f2d36f5",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "fixed inset-0 pointer-events-none",
      renderId: "render-cae7f72f",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full",
        renderId: "render-5a38325a",
        as: "div"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full",
        renderId: "render-b8a58b8b",
        as: "div"
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative z-10 w-full max-w-md",
      renderId: "render-bbf7bb28",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-8",
        renderId: "render-992080d3",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          href: "/account/signin",
          className: "inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group",
          renderId: "render-9abfe137",
          as: "a",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center group-hover:border-violet-500 transition-all",
            renderId: "render-792ec22f",
            as: "div",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              size: 18
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-medium",
            renderId: "render-5253fca7",
            as: "span",
            children: "Back to Sign In"
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-slate-900 border border-slate-800 rounded-3xl p-8",
        renderId: "render-13920341",
        as: "div",
        children: success ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center space-y-6",
          renderId: "render-9a9fbcac",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto",
            renderId: "render-75c2685d",
            as: "div",
            children: /* @__PURE__ */ jsx(CheckCircle, {
              size: 32,
              className: "text-green-400"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-422077c5",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-2xl font-extrabold text-white mb-2 font-plus-jakarta",
              renderId: "render-f418f6bc",
              as: "h1",
              children: "Password Reset Successful"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-slate-400",
              renderId: "render-7ce39744",
              as: "p",
              children: "Your password has been updated successfully"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            href: "/account/signin",
            className: "inline-block bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-3 rounded-xl font-extrabold shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-[1.02]",
            renderId: "render-04637bcb",
            as: "a",
            children: "Sign In Now"
          })]
        }) : /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center mb-8",
            renderId: "render-077c390e",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-3xl md:text-4xl font-extrabold text-white mb-2 font-plus-jakarta",
              renderId: "render-0679f9af",
              as: "h1",
              children: "Set New Password"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-slate-400",
              renderId: "render-cc285016",
              as: "p",
              children: "Enter your new password below"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            onSubmit: handleSubmit,
            className: "space-y-6",
            renderId: "render-20c19f9f",
            as: "form",
            children: [error && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "bg-red-500/10 border border-red-500 rounded-xl p-4 flex items-start gap-3",
              renderId: "render-7d7db194",
              as: "div",
              children: [/* @__PURE__ */ jsx(AlertCircle, {
                size: 20,
                className: "text-red-400 flex-shrink-0 mt-0.5"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm text-red-400",
                renderId: "render-242e0f8b",
                as: "p",
                children: error
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-c79ac431",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                htmlFor: "password",
                className: "block text-white font-bold mb-3 text-sm",
                renderId: "render-1a92d3c4",
                as: "label",
                children: "New Password"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "relative",
                renderId: "render-8535a63a",
                as: "div",
                children: [/* @__PURE__ */ jsx(Lock, {
                  className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500",
                  size: 18
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "password",
                  id: "password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  className: "w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors",
                  placeholder: "••••••••",
                  required: true,
                  minLength: 8,
                  disabled: !token,
                  renderId: "render-1fdcd53b",
                  as: "input"
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "mt-2 text-xs text-slate-500",
                renderId: "render-1a703672",
                as: "p",
                children: "Must be at least 8 characters"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-231598f3",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                htmlFor: "confirmPassword",
                className: "block text-white font-bold mb-3 text-sm",
                renderId: "render-1dff9818",
                as: "label",
                children: "Confirm New Password"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "relative",
                renderId: "render-295c84cf",
                as: "div",
                children: [/* @__PURE__ */ jsx(Lock, {
                  className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500",
                  size: 18
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "password",
                  id: "confirmPassword",
                  value: confirmPassword,
                  onChange: (e) => setConfirmPassword(e.target.value),
                  className: "w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors",
                  placeholder: "••••••••",
                  required: true,
                  minLength: 8,
                  disabled: !token,
                  renderId: "render-f109a352",
                  as: "input"
                })]
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "submit",
              disabled: isLoading || !token,
              className: "w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-violet-600/50 disabled:to-blue-600/50 text-white px-8 py-4 rounded-xl font-extrabold text-base shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2",
              renderId: "render-3acd0411",
              as: "button",
              children: isLoading ? /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin",
                  renderId: "render-f6faa1cc",
                  as: "div"
                }), "Resetting..."]
              }) : "Reset Password"
            })]
          })]
        })
      })]
    })]
  });
}

const page$2 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(ResetPasswordPage, {
      ...props
    })
  });
});

const route15 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$2
}, Symbol.toStringTag, { value: 'Module' }));

function ResourcesPage() {
  const resourceCategories = [{
    title: "Leadership Guides",
    icon: /* @__PURE__ */ jsx(BookOpen, {
      size: 28
    }),
    resources: [{
      title: "Executive Leadership Framework 2026",
      type: "PDF Guide",
      description: "Comprehensive guide to modern leadership principles for Christian executives.",
      pages: "45 pages",
      locked: false
    }, {
      title: "Building High-Performance Teams",
      type: "eBook",
      description: "Practical strategies for creating and managing exceptional teams.",
      pages: "78 pages",
      locked: true
    }, {
      title: "Faith in the Workplace",
      type: "Study Guide",
      description: "Navigate the intersection of faith and professional life.",
      pages: "32 pages",
      locked: false
    }]
  }, {
    title: "Video Masterclasses",
    icon: /* @__PURE__ */ jsx(Video, {
      size: 28
    }),
    resources: [{
      title: "Strategic Thinking for Executives",
      type: "Video Series",
      description: "5-part masterclass on developing strategic mindsets.",
      duration: "4.5 hours",
      locked: true
    }, {
      title: "Networking That Works",
      type: "Workshop Recording",
      description: "Learn proven techniques for building meaningful professional relationships.",
      duration: "2 hours",
      locked: true
    }, {
      title: "Digital Transformation Essentials",
      type: "Keynote",
      description: "Understanding and leading digital change in your organization.",
      duration: "1.5 hours",
      locked: true
    }]
  }, {
    title: "Templates & Tools",
    icon: /* @__PURE__ */ jsx(FileText, {
      size: 28
    }),
    resources: [{
      title: "Personal Development Plan Template",
      type: "Excel Template",
      description: "Structured template for mapping your career growth journey.",
      size: "2.4 MB",
      locked: false
    }, {
      title: "Business Strategy Canvas",
      type: "PDF Worksheet",
      description: "Visual tool for developing and refining business strategies.",
      size: "1.8 MB",
      locked: false
    }, {
      title: "Leadership Assessment Tool",
      type: "Interactive PDF",
      description: "Evaluate your leadership strengths and development areas.",
      size: "3.1 MB",
      locked: true
    }]
  }];
  const featuredResources = [{
    title: "YEMC Alumni Success Stories",
    description: "Inspiring journeys of transformation from our community members.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    type: "Case Studies",
    locked: false
  }, {
    title: "Annual Leadership Report 2025",
    description: "Key trends and insights shaping executive leadership in Africa.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    type: "Research",
    locked: false
  }, {
    title: "Exclusive Member Podcast Series",
    description: "Conversations with industry leaders and faith-driven entrepreneurs.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80",
    type: "Audio",
    locked: true
  }];
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 selection:text-violet-200",
    renderId: "render-ce086103",
    as: "div",
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "pt-24",
      renderId: "render-4eeb65a7",
      as: "main",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "py-20 px-6 relative overflow-hidden",
        renderId: "render-db926f7d",
        as: "section",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full",
          renderId: "render-132533ee",
          as: "div"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto relative z-10",
          renderId: "render-04f47e61",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center max-w-4xl mx-auto",
            renderId: "render-78f67e92",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-5xl md:text-7xl font-extrabold text-white mb-6 font-plus-jakarta leading-tight",
              renderId: "render-07fd8e51",
              as: "h1",
              children: ["Resource", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400",
                renderId: "render-95057a8f",
                as: "span",
                children: "Library"
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl text-slate-400 mb-8 leading-relaxed",
              renderId: "render-a7d1a43a",
              as: "p",
              children: "Access curated resources, tools, and content designed to accelerate your leadership journey and spiritual growth."
            })]
          })
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950",
        renderId: "render-61e3abed",
        as: "section",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto",
          renderId: "render-86526f9d",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "mb-12",
            renderId: "render-86d4d814",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-violet-500 font-bold uppercase tracking-widest text-sm mb-4",
              renderId: "render-5f57e913",
              as: "h2",
              children: "Featured"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-4xl md:text-5xl font-bold text-white font-plus-jakarta",
              renderId: "render-06fda495",
              as: "h3",
              children: "Top Resources"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "grid md:grid-cols-3 gap-8",
            renderId: "render-db4b6d77",
            as: "div",
            children: featuredResources.map((resource, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-violet-500/50 transition-all group",
              renderId: "render-b4775696",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "relative",
                renderId: "render-8fe84171",
                as: "div",
                children: [/* @__PURE__ */ jsx(OptimizedImage, {
                  src: resource.image,
                  alt: resource.title,
                  className: "w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                }), resource.locked && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "absolute top-4 right-4 bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2",
                  renderId: "render-2276be42",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(Lock, {
                    size: 14,
                    className: "text-violet-400"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-violet-400 text-xs font-bold",
                    renderId: "render-28b56aeb",
                    as: "span",
                    children: "Members Only"
                  })]
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "p-6",
                renderId: "render-2d08bb3d",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-violet-400 text-sm font-bold mb-2",
                  renderId: "render-2745162d",
                  as: "div",
                  children: resource.type
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-white font-bold text-xl mb-3",
                  renderId: "render-82ced746",
                  as: "h4",
                  children: resource.title
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-slate-400 text-sm leading-relaxed mb-4",
                  renderId: "render-47379142",
                  as: "p",
                  children: resource.description
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "flex items-center gap-2 text-white font-bold hover:text-violet-400 transition-colors",
                  renderId: "render-4c122e57",
                  as: "button",
                  children: resource.locked ? /* @__PURE__ */ jsxs(Fragment, {
                    children: [/* @__PURE__ */ jsx(Lock, {
                      size: 16
                    }), "Join to Access"]
                  }) : /* @__PURE__ */ jsxs(Fragment, {
                    children: [/* @__PURE__ */ jsx(ExternalLink, {
                      size: 16
                    }), "View Resource"]
                  })
                })]
              })]
            }, index))
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950 border-t border-slate-900",
        renderId: "render-d6980736",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-7xl mx-auto",
          renderId: "render-ec93b18d",
          as: "div",
          children: resourceCategories.map((category, categoryIndex) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "mb-20 last:mb-0",
            renderId: "render-3415caf9",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center gap-4 mb-8",
              renderId: "render-a0521435",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "w-14 h-14 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-500",
                renderId: "render-c2c77cd4",
                as: "div",
                children: category.icon
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-3xl md:text-4xl font-bold text-white font-plus-jakarta",
                renderId: "render-6720f1e1",
                as: "h3",
                children: category.title
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
              renderId: "render-016d31d8",
              as: "div",
              children: category.resources.map((resource, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-violet-500/50 transition-all group",
                renderId: "render-f41185e4",
                as: "div",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-start justify-between mb-4",
                  renderId: "render-ae5c78a2",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-violet-400 text-sm font-bold",
                    renderId: "render-eb3fa3e4",
                    as: "div",
                    children: resource.type
                  }), resource.locked && /* @__PURE__ */ jsx(Lock, {
                    size: 16,
                    className: "text-slate-600"
                  })]
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-white font-bold text-lg mb-2",
                  renderId: "render-c2272a2a",
                  as: "h4",
                  children: resource.title
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-slate-400 text-sm leading-relaxed mb-4",
                  renderId: "render-fe288577",
                  as: "p",
                  children: resource.description
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-center justify-between",
                  renderId: "render-3bacdbb7",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-slate-500 text-xs",
                    renderId: "render-5f3f5478",
                    as: "span",
                    children: resource.pages || resource.duration || resource.size
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "flex items-center gap-2 text-violet-400 font-bold hover:text-violet-300 transition-colors text-sm",
                    renderId: "render-d0f3dc01",
                    as: "button",
                    children: resource.locked ? /* @__PURE__ */ jsxs(Fragment, {
                      children: [/* @__PURE__ */ jsx(Lock, {
                        size: 14
                      }), "Locked"]
                    }) : /* @__PURE__ */ jsxs(Fragment, {
                      children: [/* @__PURE__ */ jsx(Download, {
                        size: 14
                      }), "Download"]
                    })
                  })]
                })]
              }, index))
            })]
          }, categoryIndex))
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "py-20 px-6 bg-slate-950 border-t border-slate-900",
        renderId: "render-1866f5b0",
        as: "section",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "max-w-5xl mx-auto",
          renderId: "render-c03edbbb",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-gradient-to-r from-violet-900/40 to-blue-900/40 border border-violet-500/20 rounded-[40px] p-12 text-center relative overflow-hidden",
            renderId: "render-c9da6997",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-violet-500/10 blur-3xl rounded-full",
              renderId: "render-ecf91244",
              as: "div"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "relative z-10",
              renderId: "render-65097090",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6",
                renderId: "render-6f7a0587",
                as: "div",
                children: /* @__PURE__ */ jsx(Lock, {
                  size: 32,
                  className: "text-violet-400"
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-4xl md:text-5xl font-bold text-white mb-4 font-plus-jakarta",
                renderId: "render-6e5a1688",
                as: "h3",
                children: "Unlock Full Access"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-slate-300 text-lg mb-8 max-w-2xl mx-auto",
                renderId: "render-37506099",
                as: "p",
                children: "Join YEMC to access our complete library of exclusive resources, masterclasses, templates, and tools designed for your success."
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex flex-col sm:flex-row gap-4 justify-center",
                renderId: "render-abe16ef6",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  href: "/lessons",
                  className: "bg-white text-slate-950 px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-violet-100 transition-all hover:scale-105 shadow-xl",
                  renderId: "render-58c0fa23",
                  as: "a",
                  children: "View Programs"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  href: "/contact",
                  className: "bg-slate-900 text-white px-10 py-5 rounded-2xl font-extrabold text-lg border border-slate-800 hover:border-violet-500 transition-all",
                  renderId: "render-4fdb2e79",
                  as: "a",
                  children: "Learn More"
                })]
              })]
            })]
          })
        })
      })]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
}

const page$1 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(ResourcesPage, {
      ...props
    })
  });
});

const route16 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$1
}, Symbol.toStringTag, { value: 'Module' }));

const activeCheckIns = /* @__PURE__ */ new Map();
function requestCheckIn(token) {
  let request = activeCheckIns.get(token);
  if (!request) {
    request = fetch(`/api/conference-pass/${encodeURIComponent(token)}/check-in`, {
      method: "POST"
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "This conference pass could not be verified.");
      }
      return data;
    });
    activeCheckIns.set(token, request);
    const clearRequest = () => {
      if (activeCheckIns.get(token) === request) activeCheckIns.delete(token);
    };
    request.then(clearRequest, clearRequest);
  }
  return request;
}
function ConferencePassPage() {
  const {
    token
  } = useParams();
  const [result, setResult] = useState({
    status: "loading",
    attendee: null
  });
  useEffect(() => {
    let isMounted = true;
    requestCheckIn(token).then((attendee2) => {
      if (isMounted) setResult({
        status: "confirmed",
        attendee: attendee2
      });
    }).catch((error) => {
      if (isMounted) {
        setResult({
          status: "error",
          message: error.message || "Unable to verify this conference pass. Check your connection and try again."
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, [token]);
  const isLoading = result.status === "loading";
  const attendee = result.attendee;
  const alreadyCheckedIn = attendee?.alreadyCheckedIn;
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white",
    renderId: "render-c2338330",
    as: "main",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl",
      renderId: "render-8def57cc",
      as: "section",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: `px-6 py-8 text-center sm:px-10 ${result.status === "error" ? "bg-red-950/50" : "bg-emerald-950/40"}`,
        renderId: "render-0c682b69",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: `mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${result.status === "error" ? "bg-red-500/10 text-red-400" : "bg-emerald-400/10 text-emerald-300"}`,
          renderId: "render-ef975c52",
          as: "div",
          children: isLoading ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "h-8 w-8 animate-spin rounded-full border-2 border-current/30 border-t-current",
            renderId: "render-cbdeafe4",
            as: "div"
          }) : result.status === "error" ? /* @__PURE__ */ jsx(ShieldCheck, {
            size: 32
          }) : /* @__PURE__ */ jsx(BadgeCheck, {
            size: 36
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-xs font-bold uppercase tracking-[0.18em] text-slate-400",
          renderId: "render-c5a191c7",
          as: "p",
          children: "YEMC 2026 Conference"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "mt-2 font-plus-jakarta text-2xl font-extrabold sm:text-3xl",
          renderId: "render-9777d28e",
          as: "h1",
          children: isLoading ? "Verifying pass" : result.status === "error" ? "Pass not verified" : alreadyCheckedIn ? "Already checked in" : "Entry confirmed"
        }), result.status === "error" ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          role: "alert",
          className: "mx-auto mt-3 max-w-sm text-sm leading-relaxed text-red-200",
          renderId: "render-c2f17e5d",
          as: "p",
          children: result.message
        }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "mt-3 text-sm text-slate-300",
          renderId: "render-9acb82d6",
          as: "p",
          children: isLoading ? "Checking this attendee's registration…" : alreadyCheckedIn ? "This pass has already been used to check in." : "This registration is valid. The attendee has been checked in."
        })]
      }), attendee && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "space-y-5 px-6 py-7 sm:px-10",
        renderId: "render-ce70d139",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "border-b border-slate-800 pb-5 text-center sm:text-left",
          renderId: "render-36b6a1e1",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
            renderId: "render-6f98ddb9",
            as: "p",
            children: "Attendee"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "mt-1 break-words text-2xl font-bold",
            renderId: "render-74abff27",
            as: "h2",
            children: attendee.fullName
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-4",
          renderId: "render-40b1782b",
          as: "dl",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-start gap-3",
            renderId: "render-be28ac99",
            as: "div",
            children: [/* @__PURE__ */ jsx(Mail, {
              size: 19,
              className: "mt-0.5 shrink-0 text-emerald-300"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "min-w-0",
              renderId: "render-c0d7a05c",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-slate-500",
                renderId: "render-93078b9d",
                as: "dt",
                children: "Email"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "break-all text-sm text-slate-100",
                renderId: "render-daaab7b5",
                as: "dd",
                children: attendee.email
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-start gap-3",
            renderId: "render-78f75de4",
            as: "div",
            children: [/* @__PURE__ */ jsx(Phone, {
              size: 19,
              className: "mt-0.5 shrink-0 text-emerald-300"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-fadbc71b",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-slate-500",
                renderId: "render-e47f23e7",
                as: "dt",
                children: "Phone"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm text-slate-100",
                renderId: "render-b5943e94",
                as: "dd",
                children: attendee.phoneNumber
              })]
            })]
          }), attendee.institution && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-start gap-3",
            renderId: "render-c0d27b60",
            as: "div",
            children: [/* @__PURE__ */ jsx(Building2, {
              size: 19,
              className: "mt-0.5 shrink-0 text-emerald-300"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "min-w-0",
              renderId: "render-a8d54b44",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-slate-500",
                renderId: "render-3d1c1b97",
                as: "dt",
                children: "School / Place of Work / Business"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "break-words text-sm text-slate-100",
                renderId: "render-901f473d",
                as: "dd",
                children: attendee.institution
              })]
            })]
          })]
        })]
      })]
    })
  });
}

const page = UNSAFE_withComponentProps(function WrappedPage(props) {
  const params = useParams$1();
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(ConferencePassPage, {
      ...props,
      token: params.token
    })
  });
});

const route17 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page
}, Symbol.toStringTag, { value: 'Module' }));

async function loader({
  params
}) {
  const matches = await fg("src/**/page.{js,jsx,ts,tsx}");
  return {
    path: `/${params["*"]}`,
    pages: matches.sort((a, b) => a.length - b.length).map(match => {
      const url = match.replace("src/app", "").replace(/\/page\.(js|jsx|ts|tsx)$/, "") || "/";
      const path = url.replaceAll("[", "").replaceAll("]", "");
      const displayPath = path === "/" ? "Homepage" : path;
      return {
        url,
        path: displayPath
      };
    })
  };
}
const notFound = UNSAFE_withComponentProps(function CreateDefaultNotFoundPage({
  loaderData
}) {
  const [siteMap, setSitemap] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent && window.parent !== window) {
      const handler = event => {
        if (event.data.type === "sandbox:sitemap") {
          window.removeEventListener("message", handler);
          setSitemap(event.data.sitemap);
        }
      };
      window.parent.postMessage({
        type: "sandbox:sitemap"
      }, "*");
      window.addEventListener("message", handler);
      return () => {
        window.removeEventListener("message", handler);
      };
    }
  }, []);
  const missingPath = loaderData.path.replace(/^\//, "");
  const existingRoutes = loaderData.pages.map(page => ({
    path: page.path,
    url: page.url
  }));
  const handleBack = () => {
    navigate("/");
  };
  const handleSearch = value => {
    if (!siteMap) {
      const path = `/${value}`;
      navigate(path);
    } else {
      navigate(value);
    }
  };
  const handleCreatePage = useCallback(() => {
    window.parent.postMessage({
      type: "sandbox:web:create",
      path: missingPath,
      view: "web"
    }, "*");
  }, [missingPath]);
  return /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
    className: "flex sm:w-full w-screen sm:min-w-[850px] flex-col",
    renderId: "render-240d4ee2",
    as: "div",
    children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex w-full items-center gap-2 p-5",
      renderId: "render-8e3bac78",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        type: "button",
        onClick: handleBack,
        className: "flex items-center justify-center w-10 h-10 rounded-md",
        renderId: "render-da5ccd64",
        as: "button",
        children: /* @__PURE__ */jsxs("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 18 18",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-label": "Back",
          role: "img",
          children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
            d: "M8.5957 2.65435L2.25005 9L8.5957 15.3457",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-e86f3b0b",
            as: "path"
          }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            d: "M2.25007 9L15.75 9",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-5d08d6da",
            as: "path"
          })]
        })
      }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "flex flex-row divide-x divide-gray-200 rounded-[8px] h-8 w-[300px] border border-gray-200 bg-gray-50 text-gray-500",
        renderId: "render-497a41a5",
        as: "div",
        children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center px-[14px] py-[5px]",
          renderId: "render-21191575",
          as: "div",
          children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            renderId: "render-1739bc2f",
            as: "span",
            children: "/"
          })
        }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center min-w-0",
          renderId: "render-28eb5d10",
          as: "div",
          children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "border-0 bg-transparent px-3 py-2 focus:outline-none truncate max-w-[300px]",
            style: {
              minWidth: 0
            },
            title: missingPath,
            renderId: "render-1096c3b0",
            as: "p",
            children: missingPath
          })
        })]
      })]
    }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex flex-grow flex-col items-center justify-center pt-[100px] text-center gap-[20px]",
      renderId: "render-414532c7",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "text-4xl font-medium text-gray-900 px-2",
        renderId: "render-ba67c69f",
        as: "h1",
        children: "Uh-oh! This page doesn't exist (yet)."
      }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "pt-4 pb-12 px-2 text-gray-500",
        renderId: "render-61c7f8e0",
        as: "p",
        children: ['Looks like "', /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "font-bold",
          renderId: "render-2d433f40",
          as: "span",
          children: ["/", missingPath]
        }), `" isn't part of your project. But no worries, you've got options!`]
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "px-[20px] w-full",
        renderId: "render-0188df3b",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "flex flex-row justify-center items-center w-full max-w-[800px] mx-auto border border-gray-200 rounded-lg p-[20px] mb-[40px] gap-[20px]",
          renderId: "render-71e9c133",
          as: "div",
          children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-[5px] items-start self-start w-1/2",
            renderId: "render-857165fa",
            as: "div",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "text-sm text-black text-left",
              renderId: "render-41488b0e",
              as: "p",
              children: "Build it from scratch"
            }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
              className: "text-sm text-gray-500 text-left",
              renderId: "render-7325ebdf",
              as: "p",
              children: ['Create a new page to live at "', /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
                renderId: "render-f3e3045c",
                as: "span",
                children: ["/", missingPath]
              }), '"']
            })]
          }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "flex flex-row items-center justify-end w-1/2",
            renderId: "render-9e337ffb",
            as: "div",
            children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              type: "button",
              className: "bg-black text-white px-[10px] py-[5px] rounded-md",
              onClick: () => handleCreatePage(),
              renderId: "render-ffdf445b",
              as: "button",
              children: "Create Page"
            })
          })]
        })
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "pb-20 lg:pb-[80px]",
        renderId: "render-3712ed87",
        as: "div",
        children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center text-gray-500",
          renderId: "render-edaf774f",
          as: "p",
          children: "Check out all your project's routes here ↓"
        })
      }), siteMap ? /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex flex-col justify-center items-center w-full px-[50px]",
        renderId: "render-116f734c",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "flex flex-col justify-between items-center w-full max-w-[600px] gap-[10px]",
          renderId: "render-45a52195",
          as: "div",
          children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "text-sm text-gray-300 pb-[10px] self-start p-4",
            renderId: "render-d6440b6b",
            as: "p",
            children: "PAGES"
          }), siteMap.webPages?.map(route => /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            type: "button",
            onClick: () => handleSearch(route.cleanRoute || ""),
            className: "flex flex-row justify-between text-center items-center p-4 rounded-lg bg-white shadow-sm w-full hover:bg-gray-50",
            renderId: "render-c1279e2d",
            as: "button",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "font-medium text-gray-900",
              renderId: "render-6ee26b3c",
              as: "h3",
              children: route.name
            }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-400",
              renderId: "render-019716f4",
              as: "p",
              children: route.cleanRoute
            })]
          }, route.id))]
        })
      }) : /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-3 w-full max-w-[80rem] mx-auto pb-5 px-2",
        renderId: "render-4894aebe",
        as: "div",
        children: existingRoutes.map(route => /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex flex-col flex-grow basis-full sm:basis-[calc(50%-0.375rem)] xl:basis-[calc(33.333%-0.5rem)]",
          renderId: "render-8ac3ab26",
          as: "div",
          children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            className: "w-full flex-1 flex flex-col items-center ",
            renderId: "render-d376c341",
            as: "div",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "relative w-full max-w-[350px] h-48 sm:h-56 lg:h-64 overflow-hidden rounded-[8px] border border-comeback-gray-75 transition-all group-hover:shadow-md",
              renderId: "render-12ebda2d",
              as: "div",
              children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
                type: "button",
                onClick: () => handleSearch(route.url.replace(/^\//, "")),
                className: "h-full w-full rounded-[8px] bg-gray-50 bg-cover",
                renderId: "render-ac1529ef",
                as: "button"
              })
            }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "pt-3 text-left text-gray-500 w-full max-w-[350px]",
              renderId: "render-009c222f",
              as: "p",
              children: route.path
            })]
          })
        }, route.path))
      })]
    })]
  });
});

const route18 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: notFound,
  loader
}, Symbol.toStringTag, { value: 'Module' }));

const serverManifest = {'entry':{'module':'/assets/entry.client-ChnoaYKm.js','imports':['/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/index-CpuTRb_f.js'],'css':[]},'routes':{'root':{'id':'root','parentId':undefined,'path':'','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/root-DrLyUbwd.js','imports':['/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/index-CpuTRb_f.js','/assets/PolymorphicComponent-CgohBQRL.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'page':{'id':'page','parentId':'root','path':undefined,'index':true,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-DoV7De49.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/Footer-BT7WOzTk.js','/assets/OptimizedImage-COLNpGhM.js','/assets/circle-check-eKIPi04j.js','/assets/createLucideIcon-CIIuNeoi.js','/assets/chevron-down-CHWldOhk.js','/assets/phone-7cPo3jQY.js','/assets/mail-CRjWmCH2.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'about/page':{'id':'about/page','parentId':'root','path':'about','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-B7Di8iaT.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/Footer-BT7WOzTk.js','/assets/OptimizedImage-COLNpGhM.js','/assets/632A81(264) - Copy-BVDETUQE.js','/assets/circle-check-eKIPi04j.js','/assets/createLucideIcon-CIIuNeoi.js','/assets/users-C2p3447k.js','/assets/briefcase-BT2UZY2_.js','/assets/award-BI-dYvp-.js','/assets/chevron-down-CHWldOhk.js','/assets/phone-7cPo3jQY.js','/assets/mail-CRjWmCH2.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'account/logout/page':{'id':'account/logout/page','parentId':'root','path':'account/logout','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-BGzJ3t7x.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/useAuth-BVS4H6nn.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'account/signin/page':{'id':'account/signin/page','parentId':'root','path':'account/signin','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-kzM6oaxw.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/useAuth-BVS4H6nn.js','/assets/arrow-left-CW124a3z.js','/assets/circle-alert-Kt4PfEMW.js','/assets/mail-CRjWmCH2.js','/assets/lock-BSk8lcAC.js','/assets/createLucideIcon-CIIuNeoi.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'account/signup/page':{'id':'account/signup/page','parentId':'root','path':'account/signup','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-B0crSSkp.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/useAuth-BVS4H6nn.js','/assets/arrow-left-CW124a3z.js','/assets/circle-alert-Kt4PfEMW.js','/assets/user-C2XU59vk.js','/assets/mail-CRjWmCH2.js','/assets/lock-BSk8lcAC.js','/assets/createLucideIcon-CIIuNeoi.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'admin/applications/page':{'id':'admin/applications/page','parentId':'root','path':'admin/applications','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-J1z38v4P.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/useUser-Bpa6esn9.js','/assets/OptimizedImage-COLNpGhM.js','/assets/createLucideIcon-CIIuNeoi.js','/assets/download-TOwF3vCj.js','/assets/users-C2p3447k.js','/assets/arrow-left-CW124a3z.js','/assets/user-C2XU59vk.js','/assets/chevron-down-CHWldOhk.js','/assets/phone-7cPo3jQY.js','/assets/briefcase-BT2UZY2_.js','/assets/badge-check-B7jF0VYD.js','/assets/message-square-CPsboc2z.js','/assets/send-5WuU_ivn.js','/assets/x-ZQ5dMI2W.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'admin/users/page':{'id':'admin/users/page','parentId':'root','path':'admin/users','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-vRpZ21Y8.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/useUser-Bpa6esn9.js','/assets/createLucideIcon-CIIuNeoi.js','/assets/arrow-left-CW124a3z.js','/assets/user-C2XU59vk.js','/assets/mail-CRjWmCH2.js','/assets/calendar-Drj54W10.js','/assets/circle-alert-Kt4PfEMW.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'community/page':{'id':'community/page','parentId':'root','path':'community','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-C9BI59_N.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/Footer-BT7WOzTk.js','/assets/OptimizedImage-COLNpGhM.js','/assets/users-C2p3447k.js','/assets/message-square-CPsboc2z.js','/assets/calendar-Drj54W10.js','/assets/award-BI-dYvp-.js','/assets/createLucideIcon-CIIuNeoi.js','/assets/chevron-down-CHWldOhk.js','/assets/phone-7cPo3jQY.js','/assets/mail-CRjWmCH2.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'contact/page':{'id':'contact/page','parentId':'root','path':'contact','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-Cw_ENc3h.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/Footer-BT7WOzTk.js','/assets/send-5WuU_ivn.js','/assets/mail-CRjWmCH2.js','/assets/phone-7cPo3jQY.js','/assets/OptimizedImage-COLNpGhM.js','/assets/chevron-down-CHWldOhk.js','/assets/createLucideIcon-CIIuNeoi.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'faq/page':{'id':'faq/page','parentId':'root','path':'faq','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-CXvQx4A8.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/Footer-BT7WOzTk.js','/assets/chevron-down-CHWldOhk.js','/assets/OptimizedImage-COLNpGhM.js','/assets/createLucideIcon-CIIuNeoi.js','/assets/phone-7cPo3jQY.js','/assets/mail-CRjWmCH2.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'forgot-password/page':{'id':'forgot-password/page','parentId':'root','path':'forgot-password','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-DSi9oaLA.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/arrow-left-CW124a3z.js','/assets/circle-check-big-BhdGjCAh.js','/assets/circle-alert-Kt4PfEMW.js','/assets/mail-CRjWmCH2.js','/assets/createLucideIcon-CIIuNeoi.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'gallery/page':{'id':'gallery/page','parentId':'root','path':'gallery','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-CxIdWes5.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/Footer-BT7WOzTk.js','/assets/OptimizedImage-COLNpGhM.js','/assets/createLucideIcon-CIIuNeoi.js','/assets/users-C2p3447k.js','/assets/chevron-down-CHWldOhk.js','/assets/phone-7cPo3jQY.js','/assets/mail-CRjWmCH2.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'join/page':{'id':'join/page','parentId':'root','path':'join','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-DhJqGffB.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/OptimizedImage-COLNpGhM.js','/assets/632A81(264) - Copy-BVDETUQE.js','/assets/arrow-left-CW124a3z.js','/assets/send-5WuU_ivn.js','/assets/createLucideIcon-CIIuNeoi.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'lessons/page':{'id':'lessons/page','parentId':'root','path':'lessons','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-AUNgEgiR.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/Footer-BT7WOzTk.js','/assets/OptimizedImage-COLNpGhM.js','/assets/createLucideIcon-CIIuNeoi.js','/assets/x-ZQ5dMI2W.js','/assets/video-UL5jq_Bm.js','/assets/download-TOwF3vCj.js','/assets/chevron-down-CHWldOhk.js','/assets/phone-7cPo3jQY.js','/assets/mail-CRjWmCH2.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'reset-password/page':{'id':'reset-password/page','parentId':'root','path':'reset-password','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-fZxNCklA.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/arrow-left-CW124a3z.js','/assets/circle-check-big-BhdGjCAh.js','/assets/circle-alert-Kt4PfEMW.js','/assets/lock-BSk8lcAC.js','/assets/createLucideIcon-CIIuNeoi.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'resources/page':{'id':'resources/page','parentId':'root','path':'resources','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-CsXEHLQf.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/Footer-BT7WOzTk.js','/assets/OptimizedImage-COLNpGhM.js','/assets/lock-BSk8lcAC.js','/assets/createLucideIcon-CIIuNeoi.js','/assets/download-TOwF3vCj.js','/assets/video-UL5jq_Bm.js','/assets/chevron-down-CHWldOhk.js','/assets/phone-7cPo3jQY.js','/assets/mail-CRjWmCH2.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'scan/[token]/page':{'id':'scan/[token]/page','parentId':'root','path':'scan/:token','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-BQT9q-SI.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js','/assets/layout-D8yImOhY.js','/assets/createLucideIcon-CIIuNeoi.js','/assets/badge-check-B7jF0VYD.js','/assets/mail-CRjWmCH2.js','/assets/phone-7cPo3jQY.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'__create/not-found':{'id':'__create/not-found','parentId':'root','path':'*?','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/not-found-DxJjdzOu.js','imports':['/assets/PolymorphicComponent-CgohBQRL.js','/assets/chunk-LFPYN7LY-CrJJCYDh.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined}},'url':'/assets/manifest-174d7681.js','version':'174d7681','sri':undefined};

const assetsBuildDirectory = "build\\client";
      const basename = "/";
      const future = {"unstable_optimizeDeps":false,"unstable_subResourceIntegrity":false,"unstable_trailingSlashAwareDataRequests":false,"unstable_previewServerPrerendering":false,"v8_middleware":false,"v8_splitRouteModules":false,"v8_viteEnvironmentApi":false};
      const ssr = true;
      const isSpaMode = false;
      const prerender = [];
      const routeDiscovery = {"mode":"lazy","manifestPath":"/__manifest"};
      const publicPath = "/";
      const entry = { module: entryServer };
      const routes = {
        "root": {
          id: "root",
          parentId: undefined,
          path: "",
          index: undefined,
          caseSensitive: undefined,
          module: route0
        },
  "page": {
          id: "page",
          parentId: "root",
          path: undefined,
          index: true,
          caseSensitive: undefined,
          module: route1
        },
  "about/page": {
          id: "about/page",
          parentId: "root",
          path: "about",
          index: undefined,
          caseSensitive: undefined,
          module: route2
        },
  "account/logout/page": {
          id: "account/logout/page",
          parentId: "root",
          path: "account/logout",
          index: undefined,
          caseSensitive: undefined,
          module: route3
        },
  "account/signin/page": {
          id: "account/signin/page",
          parentId: "root",
          path: "account/signin",
          index: undefined,
          caseSensitive: undefined,
          module: route4
        },
  "account/signup/page": {
          id: "account/signup/page",
          parentId: "root",
          path: "account/signup",
          index: undefined,
          caseSensitive: undefined,
          module: route5
        },
  "admin/applications/page": {
          id: "admin/applications/page",
          parentId: "root",
          path: "admin/applications",
          index: undefined,
          caseSensitive: undefined,
          module: route6
        },
  "admin/users/page": {
          id: "admin/users/page",
          parentId: "root",
          path: "admin/users",
          index: undefined,
          caseSensitive: undefined,
          module: route7
        },
  "community/page": {
          id: "community/page",
          parentId: "root",
          path: "community",
          index: undefined,
          caseSensitive: undefined,
          module: route8
        },
  "contact/page": {
          id: "contact/page",
          parentId: "root",
          path: "contact",
          index: undefined,
          caseSensitive: undefined,
          module: route9
        },
  "faq/page": {
          id: "faq/page",
          parentId: "root",
          path: "faq",
          index: undefined,
          caseSensitive: undefined,
          module: route10
        },
  "forgot-password/page": {
          id: "forgot-password/page",
          parentId: "root",
          path: "forgot-password",
          index: undefined,
          caseSensitive: undefined,
          module: route11
        },
  "gallery/page": {
          id: "gallery/page",
          parentId: "root",
          path: "gallery",
          index: undefined,
          caseSensitive: undefined,
          module: route12
        },
  "join/page": {
          id: "join/page",
          parentId: "root",
          path: "join",
          index: undefined,
          caseSensitive: undefined,
          module: route13
        },
  "lessons/page": {
          id: "lessons/page",
          parentId: "root",
          path: "lessons",
          index: undefined,
          caseSensitive: undefined,
          module: route14
        },
  "reset-password/page": {
          id: "reset-password/page",
          parentId: "root",
          path: "reset-password",
          index: undefined,
          caseSensitive: undefined,
          module: route15
        },
  "resources/page": {
          id: "resources/page",
          parentId: "root",
          path: "resources",
          index: undefined,
          caseSensitive: undefined,
          module: route16
        },
  "scan/[token]/page": {
          id: "scan/[token]/page",
          parentId: "root",
          path: "scan/:token",
          index: undefined,
          caseSensitive: undefined,
          module: route17
        },
  "__create/not-found": {
          id: "__create/not-found",
          parentId: "root",
          path: "*?",
          index: undefined,
          caseSensitive: undefined,
          module: route18
        }
      };
      
      const allowedActionOrigins = false;

export { allowedActionOrigins, serverManifest as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
