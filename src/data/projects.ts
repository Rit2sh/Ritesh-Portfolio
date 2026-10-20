export type ProjectStatus = "Live" | "In Development" | "Prototype" | "Concept";

export type ProjectCategory =
  | "Full-Stack & SaaS"
  | "AI & Machine Learning"
  | "Fintech"
  | "Cybersecurity"
  | "Community & Initiatives";

export interface ProjectArchitectureStep {
  layer: string;
  component: string;
  role: string;
}

export interface ProjectTradeoff {
  decision: string;
  chosen: string;
  alternative: string;
  rationale: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  role: string;
  summary: string;
  technologies: string[];
  demoUrl?: string;
  repositoryUrl?: string;
  initiativeUrl?: string;
  socialUrl?: string;
  
  // Case Study Specifics
  problemStatement: string;
  targetUsers: string[];
  productRequirements: string[];
  architectureSteps: ProjectArchitectureStep[];
  dataModelOverview: string;
  paymentOrCoreFlow?: string;
  securityAndPrivacy: string[];
  testingStrategy: string[];
  tradeoffs: ProjectTradeoff[];
  difficultProblems: string[];
  knownLimitations: string[];
  futureRoadmap: string[];
}

export const projects: Project[] = [
  {
    slug: "payglow",
    name: "PayGlow",
    tagline: "Customer-facing payment display screen and merchant operations terminal for hospitality and retail.",
    category: "Full-Stack & SaaS",
    status: "Live",
    featured: true,
    role: "Founder & Lead Software Engineer",
    summary:
      "A high-availability merchant operations platform and real-time customer payment display built for restaurants and retail counters. Bridges POS orders with dynamic customer screens, live QR payment journeys, and instant cash/digital reconciliation.",
    technologies: [
      "Next.js App Router",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Prisma ORM",
      "PostgreSQL",
      "WebSockets / Polling",
      "Zod Validation"
    ],
    demoUrl: "https://www.payglow.in",
    repositoryUrl: "https://github.com/Rit2sh/PayGlow",
    problemStatement:
      "Small and mid-sized restaurants face a disjointed checkout experience: cashiers quote amounts verbally, customer tablet screens are expensive and locked to proprietary hardware, and split payments or digital QR transactions often cause counter confusion and manual reconciliation errors. Merchants needed an installable, lightweight web application that runs on any tablet or second monitor without dedicated POS vendor lock-in.",
    targetUsers: [
      "Restaurant cashiers and front-of-house staff managing table orders.",
      "Store managers reconciling end-of-shift receipts against digital transactions.",
      "Diners looking for clear line-item breakdowns, tip/round-up options, and immediate QR payment confirmation."
    ],
    productRequirements: [
      "Dual-screen state synchronization: Cashier terminal creates and modifies line items; customer-facing screen renders immediate price updates.",
      "Dynamic payment mode selection: Cash, UPI/Card QR display, and split-tender tracking.",
      "Deterministic payment state machine: PENDING → AUTHORIZING → SETTLED | FAILED with idempotency guarantees.",
      "Installable PWA capability for offline-tolerant counter displays on tablets and touchscreens.",
      "End-of-day settlement reports exporting gross revenue, tax deductions, and payment method breakdowns."
    ],
    architectureSteps: [
      {
        layer: "Client Frontend",
        component: "Next.js Dual Viewport UI",
        role: "Renders Cashier Terminal with fast keyboard hotkeys alongside Customer Display with high-contrast accessibility."
      },
      {
        layer: "API & Validation",
        component: "Next.js Route Handlers + Zod",
        role: "Validates all order line items, tax computations, discount caps, and transaction state transitions."
      },
      {
        layer: "State Synchronization",
        component: "Server-Sent Events / Polling Fallback",
        role: "Broadcasts active cart and payment state changes from cashier terminal to linked customer screen."
      },
      {
        layer: "Data Persistence",
        component: "Prisma ORM + PostgreSQL",
        role: "Stores normalized merchants, terminal devices, active orders, payments, and audit logs with strict foreign keys."
      }
    ],
    dataModelOverview:
      "Relational schema designed around four core entities: Merchant (tenant boundary), TerminalDevice (hardware registration with unique device token), Order (line items, subtotals, tax rates, status), and PaymentTransaction (idempotency key, method, amount, settlement status, timestamp). Enforces cascading integrity and immutable ledger records for settled transactions.",
    paymentOrCoreFlow:
      "1. Cashier punches itemized order → 2. Backend calculates server-side totals (mitigating client tampering) → 3. Customer screen displays itemized list and dynamic QR code → 4. Payment webhook / cashier confirmation triggers state transition to SETTLED → 5. Display flashes verified success animation and triggers receipt generation.",
    securityAndPrivacy: [
      "Strict merchant tenant isolation via server-side session authentication and organization IDs on all database queries.",
      "All monetary calculations performed in integer minor units (cents/paise) to eliminate floating-point rounding hazards.",
      "CSRF protection, HTTP-only secure cookie sessions, and sanitized display strings against XSS injection on customer monitors.",
      "Clear distinction: Demonstration QR flows are explicitly tagged as sandbox simulations and never conflated with live bank settlements."
    ],
    testingStrategy: [
      "Unit tests for monetary calculations, tax brackets, and split-tender math edge cases.",
      "Integration tests for order state transitions ensuring illegal jumps (e.g., SETTLED to PENDING) are rejected with 400 Bad Request.",
      "End-to-end browser smoke tests simulating dual-terminal order creation and payment confirmation."
    ],
    tradeoffs: [
      {
        decision: "Real-time sync mechanism",
        chosen: "Server-Sent Events with fallback HTTP polling",
        alternative: "Heavy dedicated WebSocket cluster (Socket.io / Redis adapter)",
        rationale: "For single-counter merchant topologies, SSE provides zero-config unidirectional pushes with lower operational overhead and instant reconnection resilience."
      },
      {
        decision: "Data Persistence Layer",
        chosen: "PostgreSQL with Prisma ORM",
        alternative: "DynamoDB / MongoDB document store",
        rationale: "Financial and reconciliation records require strict ACID guarantees, foreign-key consistency, and relational constraints between orders and audit logs."
      }
    ],
    difficultProblems: [
      "Handling split-second network dropouts during customer QR scanning without desynchronizing the cashier terminal.",
      "Eliminating floating-point precision drift across multi-item discounts and local municipal tax slabs by adopting integer arithmetic throughout."
    ],
    knownLimitations: [
      "Payment processing in current public demo operates against sandbox simulation providers; real funds settlement requires production merchant acquiring bank keys.",
      "Multilingual voice prompts are currently in architectural planning and not yet active on the live demo build."
    ],
    futureRoadmap: [
      "Hardware ESC/POS thermal printer driver integration over WebUSB.",
      "Offline-first IndexedDB reconciliation for intermittent connectivity in underground dining venues.",
      "Multi-store franchise telemetry dashboard with role-based cashier shift auditing."
    ]
  },
  {
    slug: "stockly",
    name: "Stockly",
    tagline: "AI-assisted financial operating system for document-grounded personal wealth intelligence.",
    category: "Fintech",
    status: "Prototype",
    featured: true,
    role: "Backend & Systems Architect",
    summary:
      "A privacy-first financial intelligence platform that parses user-uploaded bank and investment statements, verifies arithmetic integrity through deterministic schemas, and provides grounded AI explanations without speculative hallucinations.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Python / FastAPI",
      "PostgreSQL",
      "Pydantic Validation",
      "LLM Tool Calling",
      "Tailwind CSS",
      "Docker"
    ],
    repositoryUrl: "https://github.com/Rit2sh/Stockly",
    problemStatement:
      "Most personal finance software forces users to link live bank credentials via scraping services, posing privacy risks, or provides generic generative AI advice that hallucinates calculations. Users need a system that ingests raw statements (PDF/CSV), validates every arithmetic total deterministically, and restricts LLM queries strictly to verified user records.",
    targetUsers: [
      "Disciplined individual investors tracking net worth across diverse portfolios.",
      "Independent contractors needing tax-season liability summaries from multi-source statements.",
      "Privacy-conscious users who reject sharing third-party banking OAuth credentials."
    ],
    productRequirements: [
      "Statement upload and schema-based normalization for bank, brokerage, and credit statements.",
      "Deterministic calculation engine: Net worth, monthly cash flow, asset allocation percentages, and burn rate computed via pure functions.",
      "Grounded AI question answering: LLM prompt injection barriers and retrieval strictly bound to parsed user ledger rows.",
      "Explicit audit trail showing which exact statement lines informed each financial indicator.",
      "Zero automated financial advisory or live trading claims: System acts as an analytical lens, not a fiduciary robot."
    ],
    architectureSteps: [
      {
        layer: "Ingestion Pipeline",
        component: "Document Parser & Sanitizer",
        role: "Extracts tabular data from statements, strips personal identifiers (SSN/account numbers), and normalizes currency."
      },
      {
        layer: "Deterministic Engine",
        component: "Python / Pydantic Math Core",
        role: "Executes pure mathematical calculations for balance verification and net worth aggregation."
      },
      {
        layer: "Context Injection",
        component: "Structured RAG Retriever",
        role: "Supplies verified summary tables to the AI model as strict system context with zero-temperature enforcement."
      },
      {
        layer: "Presentation Layer",
        component: "Next.js Financial Dashboard",
        role: "Visualizes trends, asset-to-liability ratios, and grounded narrative summaries with downloadable reports."
      }
    ],
    dataModelOverview:
      "User, FinancialAccount (Asset, Liability, Equity), StatementDocument (hash, upload timestamp, parsing status), and TransactionEntry (date, merchant, amount, category, confidence). Calculations operate strictly on validated TransactionEntry rows.",
    securityAndPrivacy: [
      "Client-side redaction flags and server-side encryption of stored financial records at rest.",
      "LLM prompts receive only anonymized aggregate numbers, never sensitive account credentials or raw document files.",
      "No live bank integration or automated trading permissions requested or claimed."
    ],
    testingStrategy: [
      "Mathematical property testing asserting that Assets minus Liabilities equals Net Worth across randomized balances.",
      "Synthetic statement parsing test suite evaluating extraction accuracy across distorted CSV/PDF formats.",
      "LLM hallucination adversarial testing verifying that questions about unincluded stocks are answered with 'Information not present in statements'."
    ],
    tradeoffs: [
      {
        decision: "Financial calculation mechanism",
        chosen: "Deterministic Python math service",
        alternative: "Prompting LLM to compute sums and ratios directly",
        rationale: "LLMs are probabilistic and prone to arithmetic hallucination; financial metrics require 100% mathematical certainty."
      },
      {
        decision: "Data Ingestion Approach",
        chosen: "Self-hosted statement parsing",
        alternative: "Third-party bank scraping aggregators (Plaid/Yodlee)",
        rationale: "Maximizes user privacy and sovereignty without exposing bank login credentials to external aggregators."
      }
    ],
    difficultProblems: [
      "Reconciling ambiguous transaction categories across multi-currency statements without manual re-tagging.",
      "Enforcing strict AI grounding boundaries so the model never generates speculative investment forecasts."
    ],
    knownLimitations: [
      "Requires manual statement upload; does not feature automated real-time bank webhook sync.",
      "Parsing complex multi-column scanned PDF statements with irregular OCR requires manual review."
    ],
    futureRoadmap: [
      "Client-side WebAssembly parser for zero-knowledge statement processing in the browser.",
      "Tax liability projection modules tailored for Indian and international freelance income."
    ]
  },
  {
    slug: "trustlens",
    name: "TrustLens",
    tagline: "Multimodal AI platform for digital media authenticity analysis and manipulated content forensics.",
    category: "AI & Machine Learning",
    status: "Prototype",
    featured: true,
    role: "AI & Systems Engineer",
    summary:
      "An automated digital trust platform designed to analyze manipulated imagery, synthetic audio, and deceptive online claims. Employs multimodal forensic analysis while communicating probabilistic uncertainty and false-positive boundaries.",
    technologies: [
      "Python",
      "PyTorch",
      "FastAPI",
      "Next.js",
      "OpenCV",
      "Vision Transformer (ViT)",
      "Docker"
    ],
    repositoryUrl: "https://github.com/Rit2sh/TrustLens",
    problemStatement:
      "The proliferation of generative AI has made convincing visual and audio disinformation accessible to bad actors. Consumers and editorial teams struggle to detect synthetic edits. Automated tools often make reckless binary '100% fake' assertions, leading to false positives that destroy credibility.",
    targetUsers: [
      "Digital journalists and news fact-checkers vetting citizen submissions.",
      "Content moderation teams triaging user-reported synthetic media.",
      "Educated researchers investigating misinformation propagation."
    ],
    productRequirements: [
      "Multi-signal forensic analysis: Frequency domain artifacts (DCT/FFT), facial boundary inconsistencies, and EXIF metadata anomalies.",
      "Transparent confidence calibration: Displays probabilistic likelihood with confidence intervals rather than binary verdicts.",
      "Evidence provenance report detailing which image regions triggered anomaly alerts.",
      "Adversarial robustness evaluation explaining false positive risks under compression and resizing."
    ],
    architectureSteps: [
      {
        layer: "Media Preprocessing",
        component: "OpenCV Pipeline",
        role: "Normalizes dimensions, computes frequency spectra via Discrete Cosine Transform (DCT), and crops facial landmarks."
      },
      {
        layer: "Model Inference",
        component: "Ensemble ViT & CNN Service",
        role: "Extracts spatial and frequency feature vectors to calculate synthetic artifact likelihood."
      },
      {
        layer: "Forensic Aggregator",
        component: "FastAPI Calibration Engine",
        role: "Blends spatial heatmaps, compression history, and model logits into an interpretable forensic dossier."
      },
      {
        layer: "User Interface",
        component: "TrustLens Next.js Workspace",
        role: "Interactive visualizer allowing frame scrubbing, spectral inspection, and audit PDF export."
      }
    ],
    dataModelOverview:
      "AnalysisJob (jobId, mediaHash, mimeType, submittedAt), ForensicSignal (signalType, rawScore, calibratedWeight, heatmapCoords), VerificationReport (overallConfidence, uncertaintyIndex, humanReviewRecommended).",
    securityAndPrivacy: [
      "Uploaded media processed in ephemeral sandboxes and scheduled for automatic purging post-analysis.",
      "Strict upload rate-limiting to prevent server exhaustion via volumetric media bombardment.",
      "Explicit disclaimer stating no automated model can conclusively detect 100% of deepfakes."
    ],
    testingStrategy: [
      "Benchmarking on synthetic datasets (FaceForensics++, DiffusionFace) with rigorous ROC-AUC curve measurement.",
      "Adversarial perturbations testing: Evaluating accuracy degradation under JPEG compression (q=50, 75, 90).",
      "Integration tests asserting that corrupt media formats trigger clean 422 Unprocessable Entity responses."
    ],
    tradeoffs: [
      {
        decision: "Prediction Output Interface",
        chosen: "Probabilistic confidence scale with explicit uncertainty intervals",
        alternative: "Binary 'Real' vs 'Fake' badge",
        rationale: "Binary labels give users a false sense of security; calibrated probabilities reflect real-world forensic reality."
      },
      {
        decision: "Detection Approach",
        chosen: "Spatial artifact analysis combined with frequency domain DCT",
        alternative: "Pure end-to-end black-box classifier",
        rationale: "Frequency analysis detects generative grid patterns invisible in standard pixel space, making evidence explainable."
      }
    ],
    difficultProblems: [
      "Mitigating false positives caused by heavy social media platform re-compression (e.g., WhatsApp and Twitter compression artifacts).",
      "Providing real-time heatmap rendering for high-resolution images without GPU memory exhaustion."
    ],
    knownLimitations: [
      "Advanced diffusion models fine-tuned with post-processing denoisers can bypass frequency artifact detectors.",
      "Video analysis is currently limited to keyframe sampling rather than full temporal video stream processing."
    ],
    futureRoadmap: [
      "Audio spectrogram temporal analysis for clone voice detection.",
      "C2PA cryptographic content credential parsing and validation."
    ]
  },
  {
    slug: "smart-ddos-shield",
    name: "Smart DDoS Shield",
    tagline: "Network traffic ingestion, sliding-window anomaly detection, and defensive rate-limiting engine.",
    category: "Cybersecurity",
    status: "Prototype",
    featured: true,
    role: "Network & Systems Engineer",
    summary:
      "An experimental network security project analyzing packet streams and HTTP request velocities. Implements sliding-window rate limiters, statistical entropy analysis against SYN/HTTP floods, and automated IP mitigation.",
    technologies: [
      "Python",
      "C++",
      "Redis",
      "FastAPI",
      "Scapy",
      "Docker",
      "Bash"
    ],
    repositoryUrl: "https://github.com/Rit2sh/Smart-DDoS-Shield",
    problemStatement:
      "Small-scale web applications are vulnerable to Layer-4 SYN floods and Layer-7 HTTP volumetric attacks that exhaust server threads and databases. Existing commercial scrubbing centers can be cost-prohibitive for hobbyist servers. A lightweight, locally inspectable defensive shield is needed to detect anomalous traffic spikes and throttle hostile clients before services crash.",
    targetUsers: [
      "Independent system administrators securing self-hosted servers.",
      "DevOps engineers studying traffic anomaly detection heuristics.",
      "Computer networking students analyzing synthetic attack signatures."
    ],
    productRequirements: [
      "Real-time packet ingestion and connection rate tracking per CIDR / IP block.",
      "Sliding-window counter implementation using Redis to enforce rate-limiting without race conditions.",
      "Entropy-based header and URI distribution tracking to flag distributed botnet sweeps.",
      "Automated Linux iptables / nftables rule generation for high-velocity offensive IPs."
    ],
    architectureSteps: [
      {
        layer: "Ingestion Layer",
        component: "Packet Capture & Reverse Proxy Log Stream",
        role: "Collects incoming request telemetry, client IP headers, and packet arrival intervals."
      },
      {
        layer: "Heuristic Engine",
        component: "Sliding-Window Velocity Analyzer",
        role: "Evaluates requests-per-second against moving thresholds and computes Shannon entropy of request headers."
      },
      {
        layer: "Mitigation Core",
        component: "Redis ACL & Dynamic Rule Injector",
        role: "Issues temporary drop/tarpit instructions for IP ranges exhibiting attack signatures."
      },
      {
        layer: "Telemetry Dashboard",
        component: "Real-time Metrics Visualizer",
        role: "Renders active request throughput, blocked IP counts, and attack vector classification."
      }
    ],
    dataModelOverview:
      "IpReputation (ipAddress, requestVelocity, entropyScore, currentStatus, banExpiry), TrafficSample (timestamp, pps, rps, synAckRatio, uniqueIps), AlertEvent (severity, attackType, mitigationApplied).",
    securityAndPrivacy: [
      "System operates strictly within isolated test environments and synthetic packet injectors.",
      "No production infrastructure claims: Evaluated under controlled Locust and Scapy traffic generators.",
      "Safe ban release cycles with configurable exponential timeouts to avoid permanent lockout of legitimate users."
    ],
    testingStrategy: [
      "Simulated HTTP floods using Locust reaching 15,000 req/sec against local proxy to verify throttling accuracy.",
      "SYN flood simulation using Scapy to confirm half-open connection table exhaustion triggers mitigation.",
      "False-positive evaluation on bursty legitimate traffic patterns (e.g., flash sales simulation)."
    ],
    tradeoffs: [
      {
        decision: "Rate Limiting Algorithm",
        chosen: "Redis Sliding-Window Log with atomic Lua script",
        alternative: "Fixed-window counter",
        rationale: "Fixed-window counters permit double the limit at boundary resets; sliding window provides mathematically strict enforcement."
      },
      {
        decision: "Inspection Depth",
        chosen: "L7 Reverse Proxy telemetry with L4 header sampling",
        alternative: "Full deep-packet inspection (DPI) on all payloads",
        rationale: "Full DPI requires substantial CPU overhead that becomes a bottleneck itself during a volumetric attack."
      }
    ],
    difficultProblems: [
      "Differentiating between legitimate flash-traffic spikes (e.g., viral news) and coordinated Layer-7 HTTP GET floods.",
      "Maintaining low memory footprint in Redis when tracking hundreds of thousands of distinct IP addresses."
    ],
    knownLimitations: [
      "Tested only in controlled lab simulations; cannot withstand multi-gigabit terabit-scale volumetric ISP-level transit floods.",
      "Dynamic IP spoofing on raw UDP floods requires upstream BGP Flowspec rather than local host defenses."
    ],
    futureRoadmap: [
      "Integration with Linux eBPF / XDP for sub-millisecond packet drops before kernel network stack processing.",
      "Cluster-wide gossip protocol for distributed rate-limit sharing across multiple edge nodes."
    ]
  },
  {
    slug: "saarthinet",
    name: "SaarthiNet",
    tagline: "Voice-first assistant architecture tailored for Indian-language accessibility and digital public services.",
    category: "AI & Machine Learning",
    status: "Concept",
    featured: false,
    role: "Concept Designer & AI Architect",
    summary:
      "A conceptual voice-assisted digital interface designed to bridge digital literacy gaps for citizens speaking Hindi, Punjabi, and regional Indian languages, enabling accessible interaction with public utility workflows.",
    technologies: [
      "Speech-to-Text (STT)",
      "Text-to-Speech (TTS)",
      "Python",
      "Multilingual LLMs",
      "FastAPI Concept",
      "Voice Activity Detection"
    ],
    problemStatement:
      "Millions of non-English speaking citizens face high friction when interacting with digital services due to text-heavy user interfaces and complex navigation hierarchies. Existing commercial voice assistants struggle with regional accents, colloquial code-switching (e.g., Hinglish), and complex government portal forms.",
    targetUsers: [
      "Citizens in semi-urban and rural areas with limited English literacy.",
      "Elderly individuals who prefer conversational speech over touch navigation.",
      "Public service kiosks requiring intuitive multilingual voice interactions."
    ],
    productRequirements: [
      "Acoustic pipeline optimized for noisy environments via aggressive background suppression.",
      "Code-mixed natural language understanding capable of parsing mixed Hindi-English intent.",
      "Step-by-step guided voice workflows for utility bill lookup and application status tracking.",
      "Privacy-respecting voice telemetry with zero persistent audio storage by default."
    ],
    architectureSteps: [
      {
        layer: "Acoustic Input",
        component: "Audio Capture & Noise Filter",
        role: "Filters ambient noise and detects voice activity frames."
      },
      {
        layer: "Speech Recognition",
        component: "Indic Whisper / Conformer Model",
        role: "Transcribes regional speech and colloquial code-mixed phrases into normalized text."
      },
      {
        layer: "Intent Orchestrator",
        component: "LangChain / LLM Intent Parser",
        role: "Maps spoken requests to structured API parameters (e.g., serviceName, consumerNumber)."
      },
      {
        layer: "Voice Synthesis",
        component: "Neural Text-to-Speech Engine",
        role: "Generates natural regional language audio confirmations to guide the citizen."
      }
    ],
    dataModelOverview:
      "Conceptual model: UserSession (sessionId, preferredLanguage, dialectTag), InteractionTurn (audioDuration, transcript, recognizedIntent, fulfillmentStatus).",
    securityAndPrivacy: [
      "Raw user voice recordings must be processed in-memory and discarded immediately after transcription.",
      "Sensitive numbers (Aadhaar/PAN) must be masked from all log files and transcription caches."
    ],
    testingStrategy: [
      "Proposed Word Error Rate (WER) evaluations across accent variations and signal-to-noise ratios.",
      "Intent accuracy benchmarking on synthetic multi-turn utility dialog datasets."
    ],
    tradeoffs: [
      {
        decision: "Model Deployment Location",
        chosen: "Proposed edge-cached regional acoustic models with central LLM reasoning",
        alternative: "100% on-device speech processing",
        rationale: "Consumer-grade budget smartphones in target demographics lack the NPU/RAM required for high-accuracy local multilingual models."
      }
    ],
    difficultProblems: [
      "Accurate tokenization and disambiguation of colloquial code-mixing phrases where grammar shifts mid-sentence.",
      "Maintaining sub-second end-to-end voice latency over 3G/4G rural mobile connections."
    ],
    knownLimitations: [
      "Currently a research and architectural concept with no complete production deployment.",
      "Speech-to-text accuracy in heavily accented regional dialects remains an ongoing open research area."
    ],
    futureRoadmap: [
      "Building a working proof-of-concept prototype for electricity bill payment voice journeys.",
      "Evaluating open-source Indic Conformer models on low-compute edge devices."
    ]
  },
  {
    slug: "rakshaapp",
    name: "RakshaApp",
    tagline: "Consumer digital safety tool for scam-link analysis, phishing awareness, and risk communication.",
    category: "Cybersecurity",
    status: "Prototype",
    featured: false,
    role: "Full-Stack & Security Engineer",
    summary:
      "A proactive user-safety application designed to analyze suspicious URLs, detect social-engineering patterns, and communicate actionable digital hygiene advice to non-technical users.",
    technologies: [
      "React Native / Next.js",
      "TypeScript",
      "Node.js",
      "URL Parser",
      "DNS Over HTTPS",
      "Tailwind CSS"
    ],
    repositoryUrl: "https://github.com/Rit2sh/RakshaApp",
    problemStatement:
      "Online scams and phishing attacks increasingly target ordinary smartphone users through deceptive SMS and messaging links. Standard security software often uses cryptic warnings that confuse users or fails to explain why a website is dangerous.",
    targetUsers: [
      "General internet users seeking a safe way to check suspicious messages.",
      "Families seeking protective digital safety guidance for vulnerable members.",
      "Community leaders teaching cybersecurity awareness."
    ],
    productRequirements: [
      "Safe URL inspection: Unwraps URL shorteners and checks domain age, punycode spoofing, and SSL certificate validity without executing client scripts.",
      "Heuristic scoring: Detects aggressive urgency keywords (e.g., 'Account Suspended', 'Claim Prize Now') in page metadata.",
      "Plain-language risk reports explaining specific dangers without jargon.",
      "Offline educational tips for recognizing spear-phishing and social engineering."
    ],
    architectureSteps: [
      {
        layer: "Client Input",
        component: "Safety Checker Screen",
        role: "Accepts pasted URLs or suspicious message text with clipboard safety guards."
      },
      {
        layer: "Domain Inspection",
        component: "Backend Sandbox Resolver",
        role: "Follows redirect hops, queries WHOIS/DNS records, and computes domain entropy."
      },
      {
        layer: "Risk Communicator",
        component: "Heuristic Scoring Engine",
        role: "Maps technical anomalies to human-readable risk levels (Low, Elevated, High Risk)."
      }
    ],
    dataModelOverview:
      "UrlInspectionRecord (targetUrl, resolvedDomain, redirectHops, riskScore, identifiedFlags, timestamp).",
    securityAndPrivacy: [
      "Backend sandbox never executes external client-side JavaScript from analyzed URLs.",
      "Zero personal message storage; queries are hashed and discarded after inspection.",
      "Clear positioning: Prototype advisory tool, not an antivirus or real-time firewall."
    ],
    testingStrategy: [
      "Unit testing URL parsing against homograph attacks and punycode obfuscation.",
      "Testing redirect unrolling against circular redirect traps."
    ],
    tradeoffs: [
      {
        decision: "Page Inspection Depth",
        chosen: "Headless metadata and headers inspection only",
        alternative: "Full headless browser DOM rendering with screenshot capture",
        rationale: "Executing untrusted JavaScript in a backend cluster introduces severe sandbox escape vectors; metadata analysis is safe and low-latency."
      }
    ],
    difficultProblems: [
      "Safely following redirect chains that actively detect automated sandboxes and serve decoy landing pages.",
      "Communicating risk probabilities clearly without causing unnecessary alarm on benign unindexed websites."
    ],
    knownLimitations: [
      "Does not provide real-time operating system-level malware protection.",
      "Cannot detect targeted zero-day phishing campaigns hosted on legitimate cloud infrastructure (e.g., Google Forms/Firebase)."
    ],
    futureRoadmap: [
      "Browser extension companion for contextual phishing alerts during desktop browsing.",
      "Crowdsourced community threat signal aggregation with cryptographic verification."
    ]
  },
  {
    slug: "rakshanet",
    name: "RakshaNet",
    tagline: "Proposed distributed threat-intelligence mesh architecture for federated anomaly sharing.",
    category: "Cybersecurity",
    status: "Concept",
    featured: false,
    role: "Systems Security Designer",
    summary:
      "A proposed architectural concept for a decentralized cybersecurity mesh, exploring how independent nodes can share anonymized threat indicators and rate-limit attacks collaboratively without central telemetry custody.",
    technologies: [
      "Systems Architecture",
      "Threat Modeling",
      "Federated Mesh Concepts",
      "Cryptography",
      "Zero-Trust Principles"
    ],
    problemStatement:
      "Centralized threat intelligence feeds create single points of failure and privacy concerns when organizations share network indicators. A federated mesh design can allow independent nodes to pool threat signatures while preserving privacy.",
    targetUsers: [
      "Network security researchers exploring decentralized defense topologies.",
      "Community ISPs seeking cooperative attack mitigation without vendor lock-in."
    ],
    productRequirements: [
      "Zero-knowledge threat reporting: Anonymizes victim IP while distributing offending botnet signatures.",
      "Consensus-based reputation scoring to prevent malicious nodes from poisoning threat feeds.",
      "Interoperability with the broader SaarthiNet digital resilience vision."
    ],
    architectureSteps: [
      {
        layer: "Mesh Ingress",
        component: "Node Threat Sensor",
        role: "Detects anomalous traffic surges on participating network edges."
      },
      {
        layer: "Anonymization",
        component: "Cryptographic Hasher",
        role: "Converts local incident details into zero-knowledge threat proofs."
      },
      {
        layer: "Gossip Distribution",
        component: "P2P Threat Mesh",
        role: "Propagates verified threat hashes across peer nodes."
      }
    ],
    dataModelOverview:
      "ThreatDescriptor (signatureHash, attackCategory, firstSeenEpoch, peerValidationCount, severityScore).",
    securityAndPrivacy: [
      "Designed strictly with zero-trust network principles: No node is implicitly trusted.",
      "No production enterprise deployment claimed; currently a peer-reviewed architectural model."
    ],
    testingStrategy: [
      "Theoretical Byzantine fault tolerance modeling under simulated adversarial peer nodes."
    ],
    tradeoffs: [
      {
        decision: "Network Topology",
        chosen: "Federated peer gossip protocol",
        alternative: "Centralized threat database API",
        rationale: "Decentralized topologies eliminate single points of failure and jurisdiction vulnerability."
      }
    ],
    difficultProblems: [
      "Preventing Sybil attacks where an adversary spins up thousands of fake mesh nodes to white-list malicious infrastructure.",
      "Managing gossip network traffic overhead so defensive communication doesn't saturate low-bandwidth nodes."
    ],
    knownLimitations: [
      "Purely a conceptual systems design; no production software or live network mesh exists.",
      "Distinct and separate from RakshaApp: RakshaApp is an end-user safety tool; RakshaNet is an infrastructure concept."
    ],
    futureRoadmap: [
      "Authoring a formal technical specification whitepaper detailing mesh message protocols.",
      "Developing a small-scale Docker-based simulation of 10 interconnected test nodes."
    ]
  },
  {
    slug: "cryptobridge",
    name: "CryptoBridge",
    tagline: "Conceptual fintech framework exploring cross-ledger state verification and auditability safeguards.",
    category: "Fintech",
    status: "Concept",
    featured: false,
    role: "Fintech Systems Researcher",
    summary:
      "A technical investigation into transaction integrity, multi-signature state verification, and auditability boundaries for digital asset accounting systems.",
    technologies: [
      "TypeScript",
      "Solidity Concepts",
      "Node.js",
      "Cryptographic Hashing",
      "REST API Contracts"
    ],
    problemStatement:
      "Decentralized bridges and cross-ledger asset accounting systems frequently suffer from catastrophic smart-contract exploits, replay attacks, and state synchronization failures. Financial engineers need rigorous verification frameworks that prioritize state auditability over speculative transaction velocity.",
    targetUsers: [
      "Fintech developers studying cryptographic reconciliation mechanisms.",
      "Auditors reviewing transaction state machines and double-spend mitigations."
    ],
    productRequirements: [
      "Idempotent transaction state machine preventing replay attacks across ledger boundaries.",
      "Multi-party verification protocol with cryptographic proof of reserve checks.",
      "Strict separation between transaction proposal, authorization, and settlement phases."
    ],
    architectureSteps: [
      {
        layer: "Transaction Request",
        component: "Client API Contract",
        role: "Issues signed transfer request with unique cryptographic nonce and payload checksum."
      },
      {
        layer: "Verification Engine",
        component: "Multi-Sig Validator Hub",
        role: "Verifies signature authenticity and checks reserve thresholds."
      },
      {
        layer: "Audit Ledger",
        component: "Immutable Event Log",
        role: "Records state transitions with Merkle proof verification."
      }
    ],
    dataModelOverview:
      "LedgerTransaction (txHash, nonce, senderAddress, recipientAddress, amountMinorUnits, confirmationCount, settlementStatus).",
    securityAndPrivacy: [
      "Explicit boundary: No live cryptocurrency custody, wallet holding, or live exchange trading is claimed.",
      "All exploration focuses on cryptographic protocol design, state idempotency, and financial risk modeling."
    ],
    testingStrategy: [
      "Simulated race condition and double-spend replay tests against testnet RPC mocks."
    ],
    tradeoffs: [
      {
        decision: "Confirmation Model",
        chosen: "Deterministic delayed multi-block finality",
        alternative: "Instant speculative settlement",
        rationale: "Instant settlement risks catastrophic bridge drain during block re-organizations; safety must precede speed in financial protocols."
      }
    ],
    difficultProblems: [
      "Ensuring atomic rollback when one leg of a multi-ledger transaction fails after the counterpart has committed.",
      "Modeling regulatory compliance and transaction provenance without undermining cryptographic auditability."
    ],
    knownLimitations: [
      "Conceptual research project; no audited smart contracts or live money transfers are operational.",
      "Does not constitute financial or investment software."
    ],
    futureRoadmap: [
      "Developing formal mathematical verification proofs for the core balance-invariance theorems.",
      "Publishing an open-source test suite simulating validator partitions."
    ]
  },
  {
    slug: "reelmart",
    name: "REELMART",
    tagline: "AI-assisted shoppable video concept linking video timelines to structured e-commerce product catalogs.",
    category: "AI & Machine Learning",
    status: "Concept",
    featured: false,
    role: "Product & Full-Stack Architect",
    summary:
      "An architectural design for context-aware shoppable video, exploring computer vision detection of featured apparel, temporal timestamp tagging, and frictionless product catalog lookup.",
    technologies: [
      "Next.js Concept",
      "Computer Vision Concepts",
      "FastAPI",
      "Vector Search (Embeddings)",
      "Tailwind CSS"
    ],
    problemStatement:
      "Short-form video is the primary discovery channel for modern commerce, yet the journey from spotting an item in a clip to finding the exact product catalog listing is cumbersome and manual, leading to 90%+ drop-offs.",
    targetUsers: [
      "Content creators seeking non-intrusive affiliate and brand tag monetization.",
      "Consumers wanting instant item discovery directly from video timestamps.",
      "E-commerce merchants managing integrated video showcases."
    ],
    productRequirements: [
      "Temporal timestamp linking: Maps specific video seconds to product SKUs with overlay hotspots.",
      "Computer vision candidate matching: Explores visual embeddings to match clothing frames against merchant catalogs.",
      "Responsive lightweight video player with interactive non-blocking shopping drawers."
    ],
    architectureSteps: [
      {
        layer: "Video Ingestion",
        component: "Timeline Splitter",
        role: "Extracts keyframes at uniform temporal intervals."
      },
      {
        layer: "Feature Extraction",
        component: "Visual Embedding Model",
        role: "Generates vector embeddings for detected garment bounding boxes."
      },
      {
        layer: "Catalog Matcher",
        component: "Vector Similarity Engine",
        role: "Queries merchant product vector database for nearest cosine similarity candidates."
      },
      {
        layer: "Shoppable Player",
        component: "Interactive Web Video Player",
        role: "Displays dynamic product cards synchronized with playback time."
      }
    ],
    dataModelOverview:
      "VideoClip (clipId, duration, creatorId), VideoHotspot (timestampStart, timestampEnd, boundingBox, matchedSkuId, confidenceScore), CatalogProduct (skuId, name, price, buyUrl).",
    securityAndPrivacy: [
      "Strict respect for creator video copyright and clear indication of sponsored or affiliate links.",
      "No active e-commerce checkout, live card processing, or revenue claimed."
    ],
    testingStrategy: [
      "Keyframe temporal synchronization testing across variable playback rates (0.5x to 2x).",
      "Catalog visual recall precision evaluation on synthetic fashion benchmarks."
    ],
    tradeoffs: [
      {
        decision: "Item Tagging Strategy",
        chosen: "Semi-automated AI suggestions with creator approval",
        alternative: "Fully automated end-to-end publishing",
        rationale: "Fully automated computer vision produces too many false matches (e.g., mistaking background props for clothing); human-in-the-loop guarantees quality."
      }
    ],
    difficultProblems: [
      "Maintaining smooth 60fps video playback on mobile browsers while calculating dynamic coordinate overlays.",
      "Handling drastic lighting and pose changes across dynamic video movements."
    ],
    knownLimitations: [
      "Conceptual project; no active live merchants or real-money transactions are processed.",
      "High computational cost for video frame inference requires batch processing rather than live real-time analysis."
    ],
    futureRoadmap: [
      "Building a lightweight interactive demo player using open-source CC0 video clips.",
      "Evaluating browser-side ONNX runtime for on-device garment detection."
    ]
  },
  {
    slug: "thebtechguy",
    name: "TheBTechGuy",
    tagline: "India-focused builder community and startup initiative spotlighting student founders and product launches.",
    category: "Community & Initiatives",
    status: "Live",
    featured: true,
    role: "Founder & Community Lead",
    summary:
      "An India-focused grassroots builder platform and digital media initiative spotlighting technical students, early-stage startup journeys, and build-in-public stories across the engineering ecosystem.",
    technologies: [
      "Web Architecture",
      "Community Building",
      "Content Strategy",
      "Social Media Ecosystem",
      "Newsletter Publishing"
    ],
    initiativeUrl: "https://thebtechguy.com/",
    socialUrl: "https://www.instagram.com/the.btech.guy/",
    problemStatement:
      "Engineering students in tier-2 and tier-3 colleges in India often lack access to startup mentorship networks, transparent career roadmaps, and platforms to showcase their original technical projects to peers and recruiters.",
    targetUsers: [
      "Aspiring student software engineers and startup founders across Indian universities.",
      "Early-stage tech builders looking for peer feedback on original products.",
      "Tech enthusiasts following genuine build-in-public journeys."
    ],
    productRequirements: [
      "Public website showcasing curated builder spotlights, tech insights, and founder conversations.",
      "Community channel connecting engineers collaborating on hackathons and side projects.",
      "Transparent build-in-public ethos encouraging honest documentation of failures and lessons."
    ],
    architectureSteps: [
      {
        layer: "Public Hub",
        component: "TheBTechGuy Portal",
        role: "Serves community news, spotlight articles, and links to builder resources."
      },
      {
        layer: "Social Outreach",
        component: "Instagram & Media Channels",
        role: "Engages an active audience of tech students with bite-sized engineering and career content."
      },
      {
        layer: "Community Interaction",
        component: "Builder Network",
        role: "Hosts discussions, project feedback sessions, and peer code reviews."
      }
    ],
    dataModelOverview:
      "ContentPost (id, title, category, author, publishedAt, engagementNotes), BuilderSpotlight (founderName, college, projectSlug, storyNarrative).",
    securityAndPrivacy: [
      "Strict data privacy standards for all community members; zero unauthorized data harvesting.",
      "Honest metrics representation: Grounded community scale without inflated follower claims or fictitious corporate sponsorships."
    ],
    testingStrategy: [
      "Cross-browser responsive testing of community web pages across mobile devices and tablets.",
      "SEO validation and OpenGraph tag verification for shared social articles."
    ],
    tradeoffs: [
      {
        decision: "Platform Strategy",
        chosen: "Decentralized community approach leveraging existing social channels alongside dedicated web hub",
        alternative: "Building a complex proprietary social network from scratch",
        rationale: "Students already inhabit established mobile channels; meeting builders where they are yields higher engagement than demanding yet another login account."
      }
    ],
    difficultProblems: [
      "Maintaining high-quality editorial standards and authentic storytelling while balancing full-time engineering studies.",
      "Building genuine organic engagement without resorting to clickbait or exaggerated founder claims."
    ],
    knownLimitations: [
      "Community and media initiative rather than an automated software SaaS platform.",
      "Metrics and reach fluctuate naturally based on publication frequency and semester schedules."
    ],
    futureRoadmap: [
      "Launching an open directory for student-built open-source repositories.",
      "Organizing virtual student engineering hackathons with industry mentors."
    ]
  }
];
