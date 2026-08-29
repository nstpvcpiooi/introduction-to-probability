var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
var BEEKNOEE_ENDPOINT = "https://platform.beeknoee.com/v1/chat/completions";
var RATE_LIMIT = 20;
var RATE_WINDOW_SECONDS = 3600;
var MAX_QUESTION_LENGTH = 6e3;
var MAX_HISTORY_MESSAGES = 20;
var MAX_MODEL_ID_LENGTH = 100;
var FORMAT_RULES = `QUY T\u1EAEC \u0110\u1ECANH D\u1EA0NG:
- Kh\xF4ng d\xF9ng heading Markdown (##, ###).
- Kh\xF4ng in \u0111\u1EADm (**...**) d\u01B0\u1EDBi b\u1EA5t k\u1EF3 h\xECnh th\u1EE9c n\xE0o, k\u1EC3 c\u1EA3 cho \u0111\xE1p s\u1ED1 cu\u1ED1i.
- C\xF4ng th\u1EE9c to\xE1n d\xF9ng LaTeX: $...$ cho c\xF4ng th\u1EE9c trong d\xF2ng, $$...$$ cho c\xF4ng th\u1EE9c kh\u1ED1i k\xE8m m\u1ED9t d\xF2ng tr\u1ED1ng tr\u01B0\u1EDBc v\xE0 sau. Ch\u1EEF ti\u1EBFng Vi\u1EC7t b\xEAn trong c\xF4ng th\u1EE9c ph\u1EA3i b\u1ECDc trong \\text{...} (v\xED d\u1EE5: $P(\\text{c\u1EA3 hai \u0111\u1EC1u \u0111\u1ECF})$).
- C\xF3 th\u1EC3 d\xF9ng danh s\xE1ch c\xF3 th\u1EE9 t\u1EF1 (1. 2. 3.) khi tr\xECnh b\xE0y c\xE1c b\u01B0\u1EDBc, nh\u01B0ng kh\xF4ng d\xF9ng heading hay in \u0111\u1EADm \u0111\u1EC3 \u0111\xE1nh d\u1EA5u b\u01B0\u1EDBc.`;
var HINT_SYSTEM_PROMPT = `B\u1EA1n l\xE0 m\u1ED9t gia s\u01B0 To\xE1n / X\xE1c su\u1EA5t - Th\u1ED1ng k\xEA tr\xECnh \u0111\u1ED9 cao, vi\u1EBFt theo v\u0103n phong h\u1ECDc thu\u1EADt, kh\xE1ch quan, s\xFAc t\xEDch, \u0111\xFAng thu\u1EADt ng\u1EEF chu\u1EA9n \u2014 nh\u01B0 l\u1EDDi gi\u1EA3i trong gi\xE1o tr\xECnh \u0111\u1EA1i h\u1ECDc, kh\xF4ng ph\u1EA3i v\u0103n phong tr\xF2 chuy\u1EC7n.

QUY T\u1EAEC N\u1ED8I DUNG:
- Kh\xF4ng ch\xE0o h\u1ECFi, kh\xF4ng d\u1EABn nh\u1EADp, kh\xF4ng b\xECnh lu\u1EADn ngo\xE0i l\u1EC1 (v\xED d\u1EE5 kh\xF4ng vi\u1EBFt "\u0110\xE2y l\xE0 m\u1ED9t b\xE0i to\xE1n th\xFA v\u1ECB" hay "\u0110\u01B0\u1EE3c r\u1ED3i, h\xE3y c\xF9ng xem x\xE9t"). V\xE0o th\u1EB3ng n\u1ED9i dung g\u1EE3i \xFD.
- M\u1ED7i l\u01B0\u1EE3t CH\u1EC8 \u0111\u01B0a ra M\u1ED8T g\u1EE3i \xFD, ng\u1EAFn g\u1ECDn (2-4 c\xE2u) nh\u01B0ng ph\u1EA3i c\u1EE5 th\u1EC3 v\xE0o ph\u01B0\u01A1ng ph\xE1p/k\u1EF9 thu\u1EADt gi\u1EA3i: n\xEAu r\xF5 nguy\xEAn l\xFD \u0111\u1EBFm n\xE0o, c\xF4ng th\u1EE9c n\xE0o, bi\u1EBFn ng\u1EABu nhi\xEAn ho\u1EB7c kh\xF4ng gian m\u1EABu n\xE0o c\u1EA7n \u0111\u1ECBnh ngh\u0129a, c\xE1ch ph\xE2n ho\u1EA1ch/l\u1EADp lu\u1EADn n\xE0o c\u1EA7n th\u1EF1c hi\u1EC7n ti\u1EBFp theo.
- TUY\u1EC6T \u0110\u1ED0I kh\xF4ng \u0111\u01B0a ra c\xE1c g\u1EE3i \xFD chung chung, hi\u1EC3n nhi\xEAn ki\u1EC3u "\u0111\u1ECDc k\u1EF9 \u0111\u1EC1 b\xE0i", "x\xE1c \u0111\u1ECBnh \u0111\u1EC1 b\xE0i h\u1ECFi g\xEC", "suy ngh\u0129 v\u1EC1 v\u1EA5n \u0111\u1EC1". M\u1ED7i g\u1EE3i \xFD ph\u1EA3i l\xE0 m\u1ED9t b\u01B0\u1EDBc l\u1EADp lu\u1EADn to\xE1n h\u1ECDc th\u1EADt s\u1EF1, \u0111\u1EA9y l\u1EDDi gi\u1EA3i ti\u1EBFn th\xEAm.
- TUY\u1EC6T \u0110\u1ED0I kh\xF4ng \u0111\u01B0a \u0111\xE1p s\u1ED1 cu\u1ED1i c\xF9ng hay l\u1EDDi gi\u1EA3i \u0111\u1EA7y \u0111\u1EE7, tr\u1EEB khi \u0111\xE2y l\xE0 g\u1EE3i \xFD cu\u1ED1i c\xF9ng sau khi \u0111\xE3 d\u1EABn d\u1EAFt \u0111\u1EE7 c\xE1c b\u01B0\u1EDBc l\u1EADp lu\u1EADn v\xE0 ch\u1EC9 c\xF2n ph\xE9p t\xEDnh k\u1EBFt th\xFAc.
- N\u1EBFu h\u1ECDc sinh xin g\u1EE3i \xFD ti\u1EBFp theo, ti\u1EBFp n\u1ED1i \u0111\xFAng m\u1EA1ch l\u1EADp lu\u1EADn c\u1EE7a c\xE1c g\u1EE3i \xFD tr\u01B0\u1EDBc, \u0111i s\xE2u th\xEAm \u0111\xFAng m\u1ED9t b\u01B0\u1EDBc c\u1EE5 th\u1EC3, kh\xF4ng l\u1EB7p l\u1EA1i g\u1EE3i \xFD \u0111\xE3 \u0111\u01B0a.

${FORMAT_RULES}`;
var FULL_SYSTEM_PROMPT = `B\u1EA1n l\xE0 m\u1ED9t gia s\u01B0 To\xE1n / X\xE1c su\u1EA5t - Th\u1ED1ng k\xEA tr\xECnh \u0111\u1ED9 cao. Nhi\u1EC7m v\u1EE5: vi\u1EBFt l\u1EDDi gi\u1EA3i \u0111\u1EA7y \u0111\u1EE7, ch\xEDnh x\xE1c, theo v\u0103n phong h\u1ECDc thu\u1EADt kh\xE1ch quan nh\u01B0 l\u1EDDi gi\u1EA3i ch\xEDnh th\u1EE9c trong gi\xE1o tr\xECnh \u0111\u1EA1i h\u1ECDc, kh\xF4ng ph\u1EA3i v\u0103n phong tr\xF2 chuy\u1EC7n.

QUY T\u1EAEC N\u1ED8I DUNG:
- Kh\xF4ng ch\xE0o h\u1ECFi, kh\xF4ng d\u1EABn nh\u1EADp, kh\xF4ng b\xECnh lu\u1EADn ngo\xE0i l\u1EC1. V\xE0o th\u1EB3ng l\u1EDDi gi\u1EA3i.
- Tr\xECnh b\xE0y l\u1EDDi gi\u1EA3i theo t\u1EEBng b\u01B0\u1EDBc l\u1EADp lu\u1EADn r\xF5 r\xE0ng, c\xF3 \u0111\xE1nh s\u1ED1 (1., 2., 3., ...); m\u1ED7i b\u01B0\u1EDBc l\xE0 m\u1ED9t l\u1EADp lu\u1EADn ho\u1EB7c ph\xE9p bi\u1EBFn \u0111\u1ED5i to\xE1n h\u1ECDc c\u1EE5 th\u1EC3, kh\xF4ng t\xE1ch v\u1EE5n th\xE0nh c\xE1c b\u01B0\u1EDBc hi\u1EC3n nhi\xEAn/th\u1EEBa.
- N\u1EBFu b\xE0i c\xF3 nhi\u1EC1u ph\u1EA7n (a), (b), (c)..., gi\u1EA3i l\u1EA7n l\u01B0\u1EE3t t\u1EEBng ph\u1EA7n, m\u1EDF \u0111\u1EA7u m\u1ED7i ph\u1EA7n b\u1EB1ng k\xFD hi\u1EC7u ph\u1EA7n \u0111\xF3 (v\xED d\u1EE5 "(a)") vi\u1EBFt nh\u01B0 v\u0103n b\u1EA3n th\u01B0\u1EDDng, kh\xF4ng d\xF9ng heading.
- K\u1EBFt th\xFAc m\u1ED7i ph\u1EA7n b\u1EB1ng \u0111\xE1p s\u1ED1, tr\xECnh b\xE0y nh\u01B0 m\u1ED9t c\xE2u v\u0103n ho\u1EB7c c\xF4ng th\u1EE9c b\xECnh th\u01B0\u1EDDng trong d\xF2ng ch\u1EA3y l\u1EDDi gi\u1EA3i, kh\xF4ng in \u0111\u1EADm, kh\xF4ng t\xE1ch ri\xEAng th\xE0nh m\u1EE5c "\u0110\xE1p s\u1ED1".

${FORMAT_RULES}`;
function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin"
  };
}
__name(corsHeaders, "corsHeaders");
function jsonError(message, status, origin) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) }
  });
}
__name(jsonError, "jsonError");
async function isRateLimited(env, ip) {
  const windowIndex = Math.floor(Date.now() / 1e3 / RATE_WINDOW_SECONDS);
  const key = `rl:${ip}:${windowIndex}`;
  const current = await env.RATE_LIMIT_KV.get(key);
  const count = current ? parseInt(current, 10) : 0;
  if (count >= RATE_LIMIT) return true;
  await env.RATE_LIMIT_KV.put(key, String(count + 1), {
    expirationTtl: RATE_WINDOW_SECONDS + 60
  });
  return false;
}
__name(isRateLimited, "isRateLimited");
function buildUserTurn(mode, question, historyLength) {
  if (mode === "full") {
    return `\u0110\xE2y l\xE0 \u0111\u1EC1 b\xE0i:

${question}

H\xE3y tr\xECnh b\xE0y l\u1EDDi gi\u1EA3i \u0111\u1EA7y \u0111\u1EE7.`;
  }
  if (historyLength === 0) {
    return `\u0110\xE2y l\xE0 \u0111\u1EC1 b\xE0i:

${question}

H\xE3y cho t\xF4i g\u1EE3i \xFD \u0111\u1EA7u ti\xEAn.`;
  }
  return "Cho t\xF4i g\u1EE3i \xFD ti\u1EBFp theo.";
}
__name(buildUserTurn, "buildUserTurn");
function validateBody(body) {
  if (typeof body !== "object" || body === null) return null;
  const b = body;
  if (typeof b.question !== "string" || b.question.trim().length === 0) return null;
  if (b.question.length > MAX_QUESTION_LENGTH) return null;
  if (b.mode !== "hint" && b.mode !== "full") return null;
  let history = [];
  if (b.history !== void 0) {
    if (!Array.isArray(b.history) || b.history.length > MAX_HISTORY_MESSAGES) return null;
    for (const item of b.history) {
      if (typeof item !== "object" || item === null) return null;
      const entry = item;
      const hasValidRole = entry.role === "user" || entry.role === "assistant";
      if (!hasValidRole || typeof entry.content !== "string") return null;
    }
    history = b.history;
  }
  let model;
  if (b.model !== void 0) {
    if (typeof b.model !== "string" || b.model.length === 0 || b.model.length > MAX_MODEL_ID_LENGTH) {
      return null;
    }
    model = b.model;
  }
  return { question: b.question, mode: b.mode, history, model };
}
__name(validateBody, "validateBody");
var src_default = {
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN;
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return jsonError("Method not allowed", 405, origin);
    }
    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    if (await isRateLimited(env, ip)) {
      return jsonError("B\u1EA1n \u0111\xE3 g\u1EEDi qu\xE1 nhi\u1EC1u y\xEAu c\u1EA7u. Vui l\xF2ng th\u1EED l\u1EA1i sau.", 429, origin);
    }
    let rawBody;
    try {
      rawBody = await request.json();
    } catch {
      return jsonError("Body kh\xF4ng ph\u1EA3i JSON h\u1EE3p l\u1EC7", 400, origin);
    }
    const body = validateBody(rawBody);
    if (!body) {
      return jsonError("Y\xEAu c\u1EA7u kh\xF4ng h\u1EE3p l\u1EC7", 400, origin);
    }
    const systemPrompt = body.mode === "hint" ? HINT_SYSTEM_PROMPT : FULL_SYSTEM_PROMPT;
    const history = body.history ?? [];
    const userTurn = buildUserTurn(body.mode, body.question, history.length);
    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: userTurn }
    ];
    const upstreamResponse = await fetch(BEEKNOEE_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.BEEKNOEE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: body.model || env.AI_MODEL,
        messages,
        stream: true,
        max_tokens: body.mode === "full" ? 3e3 : 700
      })
    });
    if (!upstreamResponse.ok || !upstreamResponse.body) {
      const detail = await upstreamResponse.text().catch(() => "");
      return jsonError(`L\u1ED7i t\u1EEB d\u1ECBch v\u1EE5 AI (${upstreamResponse.status}): ${detail.slice(0, 300)}`, 502, origin);
    }
    return new Response(upstreamResponse.body, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        ...corsHeaders(origin)
      }
    });
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError2;

// .wrangler/tmp/bundle-zlExYp/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-zlExYp/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
