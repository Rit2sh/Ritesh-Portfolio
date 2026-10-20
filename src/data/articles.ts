export interface EngineeringArticle {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  topic: string;
  abstract: string;
  problem: string;
  constraints: string[];
  alternativesConsidered: {
    option: string;
    pros: string;
    cons: string;
    outcome: string;
  }[];
  decisionAndArchitecture: string;
  tradeoffs: string[];
  implementationEvidence: string;
  lessonsLearned: string[];
}

export const engineeringArticles: EngineeringArticle[] = [
  {
    slug: "payment-workflow-idempotency",
    title: "Designing Idempotent Payment State & Webhook Reconciliation for Merchant POS",
    date: "2026-03-12",
    readTime: "7 min read",
    topic: "Distributed Systems & Fintech",
    abstract:
      "A deep dive into how PayGlow manages payment transitions, dual-screen terminal synchronization, and out-of-order webhook delivery without double-charging or corrupting counter checkout state.",
    problem:
      "In counter hospitality environments, payment confirmation webhooks can arrive multiple times, experience network latency, or fire out of sequence with the customer's physical interaction at the counter. A naïve implementation can cause double-charging, race conditions between cash and digital tenders, or desynchronize the customer display from the cashier terminal.",
    constraints: [
      "Sub-second state reflection on customer-facing screens to prevent awkward counter delays.",
      "Strict zero-tolerance for double-settlement on identical order line items.",
      "Resilience against unreliable counter Wi-Fi connections that drop packets mid-transaction."
    ],
    alternativesConsidered: [
      {
        option: "Pure Client-Side Polling",
        pros: "Simple to implement without maintaining persistent connections.",
        cons: "High HTTP request overhead; latency jitter causes noticeable lag on busy cash registers.",
        outcome: "Rejected for core display sync; retained only as background heartbeat fallback."
      },
      {
        option: "Full Stateful WebSocket Server Cluster",
        pros: "Bidirectional sub-50ms message delivery.",
        cons: "Requires heavy persistent connection state management, socket reconnection state logic, and Redis adapters.",
        outcome: "Over-engineered for single-counter merchant topologies."
      },
      {
        option: "Server-Sent Events (SSE) with Idempotency Key Ledgers",
        pros: "Unidirectional lightweight stream from server to client with automatic reconnection and HTTP/2 multiplexing.",
        cons: "Unidirectional only (cashier mutations still send standard REST POST).",
        outcome: "Adopted as the optimal balance of simplicity, speed, and reliability."
      }
    ],
    decisionAndArchitecture:
      "We implemented a deterministic state machine (PENDING → AUTHORIZING → SETTLED | FAILED | REFUNDED) governed by unique Idempotency Keys generated at order creation. Every payment attempt logs an immutable ledger entry. When a webhook arrives, the backend attempts an atomic SQL update conditioned on the current state. Duplicate webhook deliveries trigger a no-op 200 OK response returning the cached settlement proof, preventing state corruption.",
    tradeoffs: [
      "Slightly increased database write volume for each intermediate transaction state in exchange for complete auditability.",
      "SSE connections require careful proxy timeout configuration on edge platforms (Vercel/Nginx) to avoid abrupt disconnects."
    ],
    implementationEvidence:
      "Tested and verified inside PayGlow's production Next.js route handlers and PostgreSQL Prisma schema, demonstrating robust handling of simulated duplicate webhook payloads.",
    lessonsLearned: [
      "Never compute financial subtotals or tax brackets on the client; always recalculate server-side in minor currency units (cents/paise).",
      "Idempotency keys must be tied to immutable cart revisions; mutating an order after tender display requires generating a fresh child attempt key."
    ]
  },
  {
    slug: "grounded-financial-rag",
    title: "Eliminating Hallucinations in Financial Statement Analysis: Grounded RAG with Deterministic Calculation Boundaries",
    date: "2026-02-18",
    readTime: "9 min read",
    topic: "AI Systems & Data Engineering",
    abstract:
      "How Stockly couples deterministic mathematical verification with Large Language Models to provide reliable, audit-backed financial summaries without probabilistic arithmetic errors.",
    problem:
      "Large Language Models (LLMs) are stochastic token predictors, not calculators. When asked to compute net worth, debt-to-income ratios, or monthly spending variance from financial statements, LLMs frequently make subtle arithmetic errors or invent plausible-sounding investment numbers that have disastrous consequences for personal wealth tracking.",
    constraints: [
      "Zero tolerance for mathematical hallucinations in published summaries.",
      "Complete data privacy: raw personal identification (account numbers, names) must never leak into third-party AI prompts.",
      "Clear explainability: every generated insight must reference verified source ledger line items."
    ],
    alternativesConsidered: [
      {
        option: "End-to-End Generative Analysis (Direct Statement-to-LLM)",
        pros: "Fast to build with single prompt.",
        cons: "LLMs fail basic arithmetic on complex tables, hallucinate balances, and leak PII.",
        outcome: "Strictly rejected due to unacceptable financial inaccuracy."
      },
      {
        option: "Hybrid: Deterministic Parser + Grounded RAG Context Injection",
        pros: "Separates calculation (100% deterministic Python math) from natural language explanation (LLM reasoning over verified numbers).",
        cons: "Requires maintaining strict schema validation models for varied statement layouts.",
        outcome: "Adopted as the gold standard for reliable financial AI."
      }
    ],
    decisionAndArchitecture:
      "Stockly enforces a strict two-stage pipeline. Stage 1: Document parser ingests raw files into typed Pydantic models. A pure Python calculation service verifies accounting invariants (e.g., Opening Balance + Inflows - Outflows == Closing Balance). Stage 2: Only sanitized aggregate metrics and verified category totals are supplied to the LLM system prompt. The model is constrained via JSON schema output and strictly prohibited from performing raw arithmetic.",
    tradeoffs: [
      "Unstructured or poorly scanned statements that fail schema validation require manual user confirmation rather than automated guesswork.",
      "More complex multi-service architecture compared to single-prompt wrappers."
    ],
    implementationEvidence:
      "Implemented in Stockly's FastAPI backend test suite, passing synthetic statement datasets with 100% mathematical consistency across randomized debit/credit streams.",
    lessonsLearned: [
      "Treat LLMs strictly as conversational synthesis engines, never as calculation engines.",
      "Deterministic data validation before LLM context injection is the only robust defense against hallucinated figures."
    ]
  },
  {
    slug: "deepfake-forensics-uncertainty",
    title: "Evaluating Media Provenance and Uncertainty in Multimodal Deepfake Forensics",
    date: "2026-01-24",
    readTime: "8 min read",
    topic: "AI Forensics & Computer Vision",
    abstract:
      "Examining why binary 'Real vs Fake' detectors fail in the wild, and how TrustLens uses frequency-domain artifact analysis and calibrated probability distributions to present honest forensic evidence.",
    problem:
      "Automated deepfake detection tools often claim near-100% accuracy in lab benchmarks but degrade dramatically when exposed to real-world social media compression, noise, and resizing. Furthermore, binary classifications fail to convey epistemic uncertainty, leading users to either blindly trust false positives or dismiss genuine warnings.",
    constraints: [
      "Must operate efficiently without requiring multi-GPU server farms for single image inference.",
      "Must provide interpretable visual heatmaps rather than a black-box percentage score.",
      "Must withstand moderate JPEG compression artifacts common on messaging platforms."
    ],
    alternativesConsidered: [
      {
        option: "Pure Spatial CNN Classifier",
        pros: "Fast inference on standard image grids.",
        cons: "Severely vulnerable to adversarial noise and standard blur filters; treats pixel compression artifacts as generative defects.",
        outcome: "Insufficient as a solitary signal."
      },
      {
        option: "Dual-Domain Analysis (Spatial ViT + Frequency FFT/DCT)",
        pros: "Detects upsampling checkerboard patterns and spectral anomalies invisible in spatial RGB channels.",
        cons: "Higher computational pipeline requirements.",
        outcome: "Adopted for TrustLens's multi-signal forensic aggregator."
      }
    ],
    decisionAndArchitecture:
      "TrustLens combines spatial landmark inspection with Discrete Cosine Transform (DCT) frequency analysis. Generative upsamplers (GANs, Diffusion models) leave characteristic spectral fingerprints in high-frequency bands. By comparing the spectral energy distribution against standard natural image distributions and calibrating predictions using Platt scaling, the system produces a probability interval and highlighted artifact bounding coordinates.",
    tradeoffs: [
      "Cannot definitively declare 100% certainty on heavily compressed media (e.g., 200px thumbnails).",
      "Requires explicit user education that forensic analysis is probabilistic evidence, not legal proof."
    ],
    implementationEvidence:
      "Benchmarked across FaceForensics++ and synthetic Diffusion datasets within the TrustLens prototype, with explicit calibration curves documented in repository evaluations.",
    lessonsLearned: [
      "Engineering integrity requires communicating uncertainty; presenting a false sense of certainty damages user trust when an edge case fails.",
      "Frequency domain analysis provides superior explainability compared to pure pixel-level deep neural networks."
    ]
  },
  {
    slug: "ddos-rate-limiting-ebpf",
    title: "Defending Web Services Against Layer-7 Volumetric Floods: Sliding-Window Algorithms vs Fixed Windows",
    date: "2025-12-05",
    readTime: "6 min read",
    topic: "Cybersecurity & Systems Engineering",
    abstract:
      "A technical comparison of rate-limiting algorithms implemented in Smart DDoS Shield, examining how sliding-window logs prevent traffic burst exploits and how Redis Lua scripts guarantee atomic enforcement.",
    problem:
      "Fixed-window rate limiters count requests per fixed unit of time (e.g., per minute). An attacker can easily exploit this by bursting double the allowable request limit directly at the boundary of two adjacent windows (e.g., 100 requests at 00:59 and another 100 at 01:00), overwhelming backend databases while staying technically under the per-minute limit.",
    constraints: [
      "Sub-millisecond rate check overhead per incoming request.",
      "Atomic operations to prevent race conditions across concurrent application threads.",
      "Memory efficiency when tracking hundreds of thousands of distinct client IP addresses."
    ],
    alternativesConsidered: [
      {
        option: "Fixed-Window Counter",
        pros: "Minimal memory (single integer per IP).",
        cons: "Vulnerable to 2x burst traffic attacks at boundary intervals.",
        outcome: "Rejected for security-critical endpoints."
      },
      {
        option: "Token Bucket / Leaky Bucket",
        pros: "Smooths traffic flow effectively over time.",
        cons: "Requires stateful lock synchronization across distributed worker nodes.",
        outcome: "Useful for steady API smoothing, but less intuitive for strict burst mitigation."
      },
      {
        option: "Redis Sliding-Window Log via Atomic Lua Script",
        pros: "Maintains exact sorted timestamps; completely eliminates boundary exploits with atomic execution.",
        cons: "Slightly higher memory overhead per IP compared to a raw single counter.",
        outcome: "Adopted as the core defense algorithm for Smart DDoS Shield."
      }
    ],
    decisionAndArchitecture:
      "We implemented a Redis sorted set (`ZADD` / `ZREMRANGEBYSCORE`) encapsulated within an atomic Lua script. For every incoming request from an IP, old timestamps older than the sliding window (e.g., `now - 60 seconds`) are pruned atomically, the new timestamp is inserted, and the cardinality (`ZCARD`) is checked against the threshold. If exceeded, the request is rejected immediately with a 429 Too Many Requests status and an informative Retry-After header.",
    tradeoffs: [
      "Storing timestamps in sorted sets consumes roughly 250 bytes per active IP in the window, requiring an automated key TTL eviction policy (e.g., EXPIRE set to window duration + 10s).",
      "Network round-trip to Redis must remain under 1ms via co-located caching instances."
    ],
    implementationEvidence:
      "Tested under simulated traffic loads using Locust up to 15,000 req/sec in Smart DDoS Shield's containerized benchmark environment, verifying 0% boundary leakage.",
    lessonsLearned: [
      "Always encapsulate multi-step Redis operations in Lua scripts to guarantee thread-safe atomicity without distributed locks.",
      "Rate-limiting is only the first line of defense; Layer-7 defenses must be coupled with Layer-4 SYN cookies and connection timeouts for comprehensive protection."
    ]
  }
];
