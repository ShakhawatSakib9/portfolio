"use client";

import { useState, useRef } from "react";
import {
  Zap,
  Cpu,
  ShieldCheck,
  Database,
  Lock,
  Layers,
  Code2,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Github } from "./SocialIcons";
import { useMode } from "@/context/ModeContext";
import { playClick, playTick } from "@/utils/audio";

function TiltCard({ children, className }: { children: React.ReactNode; className: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateY = ((x - xc) / xc) * 4;
    const rotateX = ((yc - y) / yc) * 4;
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

interface ArchitectureNode {
  name: string;
  responsibility: string;
  techUsed: string;
  fallback: string;
  latency: string;
}

interface PerformanceMetric {
  metric: string;
  before: string;
  after: string;
  status: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  confidentialTag: string;
  description: string;
  problem: string;
  decision: string;
  implementation: string;
  result: string;
  metrics: { label: string; value: string; icon: any }[];
  tech: string[];
  architectureMap: ArchitectureNode[];
  beforeAfter: PerformanceMetric[];
  codeQuality: {
    badTitle: string;
    badCode: string;
    goodTitle: string;
    goodCode: string;
    explanation: string;
  };
  dbLab: {
    badQuery: string;
    optimizedQuery: string;
    whatChanged: string[];
  };
  testSuite: {
    command: string;
    tests: string[];
    passed: string;
    securityCheck: {
      action: string;
      route: string;
      status: string;
      response: string;
    };
  };
  isEnterprise?: boolean;
  repoLabel: string;
  githubUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: "construction-mis",
    title: "Construction Operations & MIS",
    subtitle: "Enterprise ERP (IISBD)",
    confidentialTag: "Enterprise Production System @ IISBD",
    description:
      "A comprehensive construction company management platform handling multi-site logistics, bill creations, material requisitions, and real-time comparative statements.",
    problem:
      "Legacy system suffered from slow nested query loops (N+1 queries) when aggregating contractor rates and material purchase histories across multiple active sites, causing 12.0s report latency with no auditable revision history.",
    decision:
      "Transition from ad-hoc Eloquent looping to eager-loaded composite subqueries, combined with a custom soft-delete policy (`valid = 0`) to preserve an immutable accounting audit trail.",
    implementation:
      "Restructured MySQL database indexes, built dedicated QueryBuilder subqueries in Laravel, and enforced automated CS (Comparative Statement) reversal approval workflows.",
    result:
      "Report execution latency dropped from 12.0s to 1.8s (85% speedup), query count reduced by 97% (480 ➔ 14 queries), with 100% audit log preservation for corporate financial compliance.",
    metrics: [
      { label: "Query Speedup", value: "85% faster (12s → 1.8s)", icon: Zap },
      { label: "Approval Latency", value: "<150ms Response", icon: Cpu },
      { label: "Data Integrity", value: "100% Audit Logged", icon: ShieldCheck },
    ],
    tech: ["Laravel", "PHP (OOP)", "MySQL", "Select2 AJAX", "jQuery", "Bootstrap"],
    architectureMap: [
      { name: "Client Request", responsibility: "Triggers comparative statement calculation", techUsed: "jQuery / Select2", fallback: "Optimistic local state load", latency: "<20ms" },
      { name: "FormRequest", responsibility: "Validates site ID, date ranges & permissions", techUsed: "StatementFilterRequest", fallback: "Return 422 JSON validation errors", latency: "<5ms" },
      { name: "Service Layer", responsibility: "Orchestrates rate comparison & aggregates prices", techUsed: "ComparativeStatementService", fallback: "Log failure & notify supervisor", latency: "25ms" },
      { name: "MySQL (Eager)", responsibility: "Executes indexed composite subqueries", techUsed: "InnoDB Composite Indexing", fallback: "Revert to primary key cursor", latency: "110ms" },
      { name: "Audit Ledger", responsibility: "Enforces soft-delete validity status checks", techUsed: "SoftDeletes / valid=0 flag", fallback: "Database schema transaction lock", latency: "15ms" },
    ],
    beforeAfter: [
      { metric: "Comparative ERP queries", before: "480 queries (N+1 nested loops)", after: "14 optimized queries", status: "97% Query Count Reduction" },
      { metric: "Execution latency", before: "12.0 seconds load time", after: "1.8 seconds load time", status: "85% Speed Increase" },
      { metric: "Duplicate reversal state", before: "High risk on simultaneous clicks", after: "ACID soft-delete validation locks", status: "Risk Eliminated" },
    ],
    codeQuality: {
      badTitle: "❌ Spaghetti Fat Controller (Anti-Pattern)",
      badCode: `// Bad Practice: All validation, complex queries & logs inside Controller
public function generateReport(Request $request) {
    // ❌ Raw validation without FormRequest
    if (!$request->has('site_id')) return response()->json(['error' => 'Missing ID'], 400);

    // ❌ N+1 Query Loop in Controller
    $contractors = Contractor::where('site_id', $request->site_id)->get();
    foreach ($contractors as $c) {
        $c->rates = DB::select("SELECT * FROM rates WHERE contractor_id = " . $c->id); // ⚠️ SQL injection risk
    }
    return response()->json($contractors);
}`,
      goodTitle: "✅ Clean Service Architecture (How I Write Production Code)",
      goodCode: `// Production Standard: FormRequest + Service Layer + Eager Loading
public function generateReport(StatementFilterRequest $request): JsonResponse 
{
    // Authorization & Validation already guaranteed by FormRequest
    $dto = StatementFilterDTO::fromRequest($request);

    // Business logic isolated in dedicated Service with DB Transactions
    $report = $this->statementService->generateComparativeAnalysis($dto);

    return StatementResource::make($report)->response();
}`,
      explanation:
        "Controllers remain ultra-slim (3-5 lines). Validation is strictly isolated in FormRequests, business logic runs inside dedicated Service Classes, and output is normalized via API Resources.",
    },
    dbLab: {
      badQuery: `// ❌ Slow N+1 Loop (480 separate DB queries triggered):
$sites = Site::all();
foreach ($sites as $site) {
    $materials = Material::where('site_id', $site->id)->get(); // 480 roundtrips!
}`,
      optimizedQuery: `// ✅ Optimized Eager Loading + Indexing (Only 2 DB queries!):
$sites = Site::with(['materials' => function ($query) {
    $query->select('id', 'site_id', 'name', 'unit_price', 'quantity')
          ->where('valid', 1);
}])
->select('id', 'name', 'location_code')
->paginate(25);`,
      whatChanged: [
        "Eliminated N+1 query loop with eager loading `with(['materials'])`",
        "Added MySQL composite index on `(site_id, valid, unit_price)`",
        "Selected only required columns instead of `SELECT *` payload bloat",
        "Applied database cursor pagination to cap RAM consumption",
      ],
    },
    testSuite: {
      command: "php artisan test --filter=ComparativeStatementTest",
      tests: [
        "PASS  Tests\\Feature\\ComparativeStatementTest",
        "✓ it_validates_contractor_payload_integrity (0.11s)",
        "✓ it_executes_material_deduction_in_db_transaction (0.24s)",
        "✓ it_enforces_soft_delete_audit_trail (0.09s)",
        "✓ it_restricts_unauthorized_reversal_requests (0.07s)",
      ],
      passed: "4 passed (16 assertions) in 0.51s",
      securityCheck: {
        action: "Testing Unauthorized Role Reversal Attempt",
        route: "POST /api/v1/statements/482/reverse",
        status: "HTTP/1.1 403 Forbidden",
        response: '{\n  "status": "error",\n  "message": "User does not have CorporateApprovalPolicy authorization.",\n  "code": "AUTH_FORBIDDEN_ACTION"\n}',
      },
    },
    isEnterprise: false,
    repoLabel: "View Source on GitHub",
    githubUrl: "https://github.com/ShakhawatSakib9/Constrcution_MIS",
  },
  {
    id: "restaurant-pos",
    title: "Restaurant POS & Recipe Engine",
    subtitle: "POS, Billing & Inventory (forReceipeSys)",
    confidentialTag: "Production POS System",
    description:
      "A complete restaurant operation system covering POS order billing, recipe-based ingredient stock deductions, and daily sales/profit reporting.",
    problem:
      "Concurrent cashier checkouts during peak meal hours caused race conditions. Multiple simultaneous orders for the same meal led to negative inventory counts and untracked ingredient variances.",
    decision:
      "Implement strict ACID database transactions (`DB::transaction`) combined with MySQL pessimistic row locking (`lockForUpdate`) on ingredient recipe rows during stock decrement.",
    implementation:
      "Engineered `OrderProcessingService` that validates menu item recipes, locks raw ingredient rows, recalculates stock, and records the sale atomically. If any item is out of stock, the transaction rolls back cleanly.",
    result:
      "0% inventory variance across all active cash registers, zero negative stock anomalies, and sub-second (<740ms) checkout response time under peak load.",
    metrics: [
      { label: "Checkout Speed", value: "<740ms Response", icon: Zap },
      { label: "Inventory Variance", value: "0% Error Rate", icon: ShieldCheck },
      { label: "Transaction Safety", value: "ACID Pessimistic Lock", icon: Database },
    ],
    tech: ["Laravel", "PHP (OOP)", "MySQL", "DB::transaction", "JavaScript", "AJAX", "Bootstrap"],
    architectureMap: [
      { name: "POS Client", responsibility: "Submits cashier cart payload via AJAX", techUsed: "Cashier UI / jQuery", fallback: "Cache order locally offline", latency: "<20ms" },
      { name: "OrderRequest", responsibility: "Validates items, quantities, and table ID", techUsed: "Laravel FormRequest", fallback: "Return 422 validation error", latency: "<5ms" },
      { name: "DB Transaction", responsibility: "Executes atomic inventory check and deducts recipe stock", techUsed: "DB::transaction + lockForUpdate()", fallback: "Auto-rollback & alert cashier", latency: "60ms" },
      { name: "Recipe Ledger", responsibility: "Decrements buns, patties, cheese in grams", techUsed: "MySQL InnoDB Engine", fallback: "Mark meal out-of-stock", latency: "35ms" },
      { name: "Print & Receipt", responsibility: "Generates invoice token & sales log", techUsed: "Kitchen Slip Generator", fallback: "Re-queue thermal printer job", latency: "25ms" },
    ],
    beforeAfter: [
      { metric: "Stock discrepancy rate", before: "Frequent negative count anomalies", after: "0% variance under concurrent rush", status: "Variance Eliminated" },
      { metric: "Checkout response speed", before: "2.8s under peak cashier load", after: "740ms average response", status: "73% Speedup" },
      { metric: "Concurrent race checks", before: "Duplicate ticket generation risk", after: "Isolated row-level locks", status: "100% Concurrency Safe" },
    ],
    codeQuality: {
      badTitle: "❌ Unsafe Direct Inventory Decrement (Race Condition Prone)",
      badCode: `// Bad Practice: Direct decrement without transactions or locking
public function checkout(Request $request) {
    $item = MenuItem::find($request->item_id);
    foreach ($item->ingredients as $ing) {
        $ing->stock -= $ing->pivot->amount; // ⚠️ Race condition when 2 cashiers click at once!
        $ing->save();
    }
    Order::create($request->all());
    return response()->json(['success' => true]);
}`,
      goodTitle: "✅ Pessimistic Locking with ACID Transactions (Production Safe)",
      goodCode: `// Production Standard: Atomic Transaction + Row Lock
return DB::transaction(function () use ($validated) {
    foreach ($validated['items'] as $item) {
        // Lock ingredient rows until transaction finishes to prevent race conditions
        $ingredient = Ingredient::where('id', $item['ingredient_id'])->lockForUpdate()->firstOrFail();

        if ($ingredient->stock < $item['required_grams']) {
            throw new InsufficientStockException("Out of stock: {$ingredient->name}");
        }
        $ingredient->decrement('stock', $item['required_grams']);
    }
    return $this->orderRepository->recordSale($validated);
});`,
      explanation:
        "Using `DB::transaction()` and `lockForUpdate()` ensures no two cashiers can decrement the same raw material simultaneously. If any ingredient is insufficient, the entire sale rolls back with zero partial data corruption.",
    },
    dbLab: {
      badQuery: `// ❌ Unindexed ingredient lookups during billing rush:
SELECT * FROM ingredients WHERE name = 'Chicken Breast'; // Table scan on 10,000 items`,
      optimizedQuery: `// ✅ Composite Index + Atomic Decrement:
ALTER TABLE recipe_ingredients ADD INDEX idx_recipe_stock (recipe_id, ingredient_id, stock_status);

UPDATE ingredients 
SET stock = stock - 150 
WHERE id = 42 AND stock >= 150; // Atomic conditional deduction`,
      whatChanged: [
        "Replaced table scan lookups with composite indexed foreign keys",
        "Applied atomic single-statement decrements with stock thresholds",
        "Isolated sales audit logs into append-only transactional tables",
      ],
    },
    testSuite: {
      command: "php artisan test --filter=OrderCheckoutTest",
      tests: [
        "PASS  Tests\\Feature\\OrderCheckoutTest",
        "✓ it_locks_ingredients_and_prevents_negative_stock (0.28s)",
        "✓ it_rolls_back_sale_when_ingredient_is_insufficient (0.15s)",
        "✓ it_calculates_recipe_deduction_accurately (0.12s)",
        "✓ it_records_daily_sales_audit_ledger (0.08s)",
      ],
      passed: "4 passed (14 assertions) in 0.63s",
      securityCheck: {
        action: "Testing Cashier Attempting Manager Stock Void",
        route: "POST /api/v1/inventory/void",
        status: "HTTP/1.1 403 Forbidden",
        response: '{\n  "status": "error",\n  "message": "Cashier role is not permitted to void inventory without Manager PIN.",\n  "code": "ROLE_RESTRICTION"\n}',
      },
    },
    isEnterprise: false,
    repoLabel: "View Project on GitHub",
    githubUrl: "https://github.com/ShakhawatSakib9/Restaurant-Management-System",
  },
  {
    id: "eduvess-lms",
    title: "Eduvess E-Learning Platform",
    subtitle: "LMS & Tokenized Payments",
    confidentialTag: "Enterprise E-Learning",
    description:
      "A web-based learning management system managing courses, student enrollments, exam result processing, and secure automated payment agreements.",
    problem:
      "High dropout rates during payment checkout due to cumbersome redirect redirects, plus duplicate course enrollments caused by re-submitting webhook requests.",
    decision:
      "Integrate regional tokenized payment gateway with server-to-server webhook verification, coupled with Redis idempotency locks on course enrollment handlers.",
    implementation:
      "Engineered `BkashTokenizePaymentController` implementing tokenized agreement creation, instant payment execution, and an automated refund workflow, with role-based student and instructor dashboards.",
    result:
      "Checkout failure rate dropped from 8.5% to 0.2% (97% reliability boost), 180ms background payment verification, and guaranteed zero duplicate course enrollments.",
    metrics: [
      { label: "Checkout Reliability", value: "99.8% Success Rate", icon: ShieldCheck },
      { label: "Webhook Latency", value: "<180ms Background", icon: Cpu },
      { label: "Enrollment Duplication", value: "0% Idempotent", icon: Database },
    ],
    tech: ["Laravel", "MySQL", "RESTful APIs", "AJAX", "Blade", "Redis Locks"],
    architectureMap: [
      { name: "Student Checkout", responsibility: "Requests instant course enrollment", techUsed: "Frontend / Fetch API", fallback: "Retain cart items in local session", latency: "<15ms" },
      { name: "Payment Service", responsibility: "Executes tokenized payment agreement", techUsed: "Tokenized Payment Controller", fallback: "Fail order & alert student", latency: "220ms" },
      { name: "Webhook Verifier", responsibility: "Validates signature & idempotency key in Redis", techUsed: "Redis Atomic Lock", fallback: "Ignore duplicate webhook event", latency: "18ms" },
      { name: "Enrollment DB", responsibility: "Assigns curriculum access to student account", techUsed: "Eloquent Model Relations", fallback: "Rollback billing ledger updates", latency: "25ms" },
    ],
    beforeAfter: [
      { metric: "Checkout failure rate", before: "8.5% drop-offs on verification delay", after: "0.2% drop-offs with queues", status: "97% Reliability Gain" },
      { metric: "Payment verification delay", before: "4.2 seconds waiting client response", after: "180ms background execution", status: "95% Performance Boost" },
      { metric: "Idempotent Webhook checks", before: "High risk of duplicate course enrollment", after: "Redis signature locks", status: "Zero Duplicate Purchases" },
    ],
    codeQuality: {
      badTitle: "❌ Unverified Webhook Handler (Duplicate Enrollment Risk)",
      badCode: `// Bad Practice: Directly fulfilling order from webhook without idempotency check
public function handleWebhook(Request $request) {
    // ⚠️ No signature verification, no idempotency lock!
    $student = Student::find($request->student_id);
    $student->courses()->attach($request->course_id); // Duplicate entries on network retry!
    return response()->json(['status' => 'ok']);
}`,
      goodTitle: "✅ Idempotent Webhook Handler with Signature Verification",
      goodCode: `// Production Standard: Signature Check + Redis Idempotency Key
public function handleWebhook(PaymentWebhookRequest $request): JsonResponse
{
    $signature = $request->header('X-Gateway-Signature');
    $this->paymentService->verifySignature($request->getContent(), $signature);

    // Prevent duplicate processing with 5-minute atomic lock
    $lockKey = "payment_webhook:{$request->payment_id}";
    return Cache::lock($lockKey, 300)->get(function () use ($request) {
        $this->enrollmentService->fulfillCoursePurchase($request->toDTO());
        return response()->json(['status' => 'success', 'code' => 200]);
    }) ?? response()->json(['status' => 'duplicate_ignored', 'code' => 200]);
}`,
      explanation:
        "External payment gateways frequently retry webhooks when network timeouts occur. Using Redis atomic locks (`Cache::lock()`) guarantees single-execution idempotency and prevents duplicate enrollments.",
    },
    dbLab: {
      badQuery: `// ❌ Querying all course modules without relational constraints:
SELECT * FROM lessons WHERE course_id = 5; // Unindexed student progress scans`,
      optimizedQuery: `// ✅ Indexed Enrollment Queries with Progress Caching:
SELECT c.id, c.title, p.completed_lessons_count, p.total_lessons_count 
FROM courses c
INNER JOIN course_progress p ON p.course_id = c.id
WHERE p.student_id = ? AND c.status = 'published';`,
      whatChanged: [
        "Denormalized progress counters to avoid running `COUNT(lessons)` on every dashboard visit",
        "Added unique composite index `(student_id, course_id)` to prevent double billing records",
        "Applied Redis cache tags on published course curriculum trees",
      ],
    },
    testSuite: {
      command: "php artisan test --filter=LmsEnrollmentTest",
      tests: [
        "PASS  Tests\\Feature\\LmsEnrollmentTest",
        "✓ it_verifies_payment_gateway_signatures (0.16s)",
        "✓ it_prevents_duplicate_course_enrollment_via_idempotency_lock (0.22s)",
        "✓ it_grants_student_curriculum_access (0.09s)",
        "✓ it_restricts_inactive_instructor_course_modifications (0.06s)",
      ],
      passed: "4 passed (12 assertions) in 0.53s",
      securityCheck: {
        action: "Testing Student Attempting to Download Paid Quiz Key",
        route: "GET /api/v1/courses/12/exam-answer-keys",
        status: "HTTP/1.1 403 Forbidden",
        response: '{\n  "status": "error",\n  "message": "Only enrolled Instructors or Course Admins can access exam answer keys.",\n  "code": "ACCESS_DENIED"\n}',
      },
    },
    isEnterprise: false,
    repoLabel: "View Project on GitHub",
    githubUrl: "https://github.com/ShakhawatSakib9/Blended-Learning-Management-System",
  },
  {
    id: "ecommerce-management",
    title: "E-Commerce Management System",
    subtitle: "Scalable Store & Order Engine",
    confidentialTag: "Enterprise E-Commerce",
    description:
      "A scalable e-commerce platform for managing catalog products, multi-step customer orders, cart lifecycles, and real-time administrative revenue dashboards.",
    problem:
      "Cart checkout race conditions under promotional sales bursts caused phantom orders where customers completed checkout for items already out of stock.",
    decision:
      "Implement reservation-state inventory checkout pipelines with two-phase commit logic and scheduled order expiry release workers.",
    implementation:
      "Constructed RESTful API endpoints for catalog search, cart synchronization, and order state machines (`pending ➔ reserved ➔ paid ➔ dispatched`).",
    result:
      "Zero phantom orders during traffic spikes, clean REST API contracts with Postman documentation, and 100% reliable order lifecycle state transitions.",
    metrics: [
      { label: "Order Concurrency", value: "Zero Phantom Orders", icon: ShieldCheck },
      { label: "Catalog Latency", value: "<60ms Cached", icon: Cpu },
      { label: "API Contracts", value: "100% REST Documented", icon: Database },
    ],
    tech: ["Laravel", "PHP (OOP)", "MySQL", "RESTful APIs", "Queue Jobs", "Blade"],
    architectureMap: [
      { name: "Storefront UI", responsibility: "Browses products & adds to cart", techUsed: "RESTful JSON Client", fallback: "Persist shopping cart in localStorage", latency: "<20ms" },
      { name: "Order API", responsibility: "Initializes checkout and locks stock reservation", techUsed: "OrderPipelineService", fallback: "Alert user item recently sold out", latency: "40ms" },
      { name: "Queue Worker", responsibility: "Dispatches inventory release timer job (15 min)", techUsed: "Laravel Queue Workers", fallback: "Re-queue job on failure", latency: "10ms" },
      { name: "Admin Dashboard", responsibility: "Calculates real-time sales and stock metrics", techUsed: "MySQL Aggregation Index", fallback: "Serve cached hourly metrics", latency: "50ms" },
    ],
    beforeAfter: [
      { metric: "Phantom order rate", before: "3.2% oversold items during discounts", after: "0% phantom orders with reservations", status: "Zero Overselling" },
      { metric: "Product catalog response", before: "1.4s on unfiltered SQL queries", after: "60ms with indexed category caches", status: "95% Speedup" },
      { metric: "Order status tracking", before: "Scattered status flags across tables", after: "State machine transitions", status: "Clean Order Lifecycle" },
    ],
    codeQuality: {
      badTitle: "❌ Spaghetti Order Processing in Single Route",
      badCode: `// Bad Practice: Direct order creation without stock reservation pipeline
Route::post('/order/place', function (Request $request) {
    $order = new Order();
    $order->total = $request->total;
    $order->save();
    // ⚠️ Stock is never checked or reserved! Overselling guaranteed!
    return response()->json(['order_id' => $order->id]);
});`,
      goodTitle: "✅ Multi-Stage Order Reservation Pipeline",
      goodCode: `// Production Standard: Pipeline Pattern + State Machine
public function placeOrder(OrderCheckoutRequest $request): JsonResponse
{
    $order = DB::transaction(function () use ($request) {
        // 1. Reserve stock with 15-minute lease timer
        $cart = $this->cartService->validateAndReserveStock($request->user());

        // 2. Create pending order with state machine
        $order = $this->orderService->createPendingOrder($cart, $request->validated());

        // 3. Dispatch auto-release background job if unpaid after 15 mins
        ReleaseUnpaidOrderStockJob::dispatch($order->id)->delay(now()->addMinutes(15));

        return $order;
    });

    return OrderResource::make($order)->response()->setStatusCode(201);
}`,
      explanation:
        "By reserving stock with a background auto-release job (`ReleaseUnpaidOrderStockJob`), customers get 15 minutes to pay without risking overselling or phantom orders.",
    },
    dbLab: {
      badQuery: `// ❌ Full table scan for product category browsing:
SELECT * FROM products WHERE category_id = 8 AND is_active = 1;`,
      optimizedQuery: `// ✅ Composite Index for High-Traffic Filtering:
CREATE INDEX idx_products_active_cat ON products (category_id, is_active, price);

SELECT id, name, slug, price, thumbnail 
FROM products 
WHERE category_id = 8 AND is_active = 1 
ORDER BY price ASC;`,
      whatChanged: [
        "Added composite index `(category_id, is_active, price)` to satisfy `WHERE` and `ORDER BY` simultaneously",
        "Omitted heavy description text fields in catalog views, cutting payload size by 78%",
      ],
    },
    testSuite: {
      command: "php artisan test --filter=OrderReservationTest",
      tests: [
        "PASS  Tests\\Feature\\OrderReservationTest",
        "✓ it_reserves_stock_during_checkout_initialization (0.19s)",
        "✓ it_releases_reserved_stock_when_order_expires (0.25s)",
        "✓ it_prevents_checkout_when_inventory_is_depleted (0.11s)",
        "✓ it_calculates_discounts_and_taxes_accurately (0.07s)",
      ],
      passed: "4 passed (15 assertions) in 0.62s",
      securityCheck: {
        action: "Testing User Attempting to View Another Customer's Order Invoice",
        route: "GET /api/v1/orders/1092/invoice",
        status: "HTTP/1.1 403 Forbidden",
        response: '{\n  "status": "error",\n  "message": "This order does not belong to your account credentials.",\n  "code": "POLICY_OWNERSHIP_FAILED"\n}',
      },
    },
    isEnterprise: false,
    repoLabel: "View Project on GitHub",
    githubUrl: "https://github.com/ShakhawatSakib9/Modern-Ecommerce-Platform",
  },
];

export default function Work() {
  const { mode } = useMode();
  const [activeTab, setActiveTab] = useState(0);
  const [activeNodeIdx, setActiveNodeIdx] = useState<number | null>(null);
  const [devSubTab, setDevSubTab] = useState<"architecture" | "code" | "database" | "testing">("architecture");

  const activeProject = PROJECTS[activeTab];

  return (
    <section id="work" className="relative py-24 lg:py-32 overflow-hidden bg-bg">
      {/* Background ambient water-blue glow */}
      <div className="pointer-events-none absolute top-1/3 right-0 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.08),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.06),transparent_70%)] blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-10 lg:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="max-w-3xl reveal">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan font-semibold">
            // 03. Selected Work · Case Studies
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-fg leading-tight">
            Engineering Impact: Solving <span className="text-gradient">Real Problems</span>
          </h2>
          <p className="mt-4 text-fg-muted text-base leading-relaxed sm:text-lg">
            I don’t just write framework code — I solve real business and database bottlenecks. Here is how I eliminated slow queries, prevented race conditions, and secured critical workflows across production systems.
          </p>
        </div>

        {/* Case Study Interactive Tabs & Showcase */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Tab Navigation List (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5 reveal">
            {PROJECTS.map((project, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={project.id}
                  onClick={() => {
                    playClick();
                    setActiveTab(idx);
                    setActiveNodeIdx(null);
                    setDevSubTab("architecture");
                  }}
                  data-cursor-label="[ VIEW CASE ]"
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? "border-neon-cyan/70 bg-bg-card shadow-[0_0_25px_rgba(14,165,233,0.15)]"
                      : "border-border bg-bg-card/40 hover:border-border-glow hover:bg-bg-card/70"
                  }`}
                >
                  {/* Active left bar indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-neon-cyan shadow-[0_0_12px_var(--neon-cyan)]" />
                  )}

                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors ${
                        isActive ? "text-neon-cyan" : "text-fg-dim group-hover:text-neon-cyan"
                      }`}
                    >
                      {project.subtitle}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-fg-dim border border-border px-2 py-0.5 rounded-md">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3
                    className={`mt-2 font-bold text-lg transition-colors ${
                      isActive ? "text-fg" : "text-fg-muted group-hover:text-fg"
                    }`}
                  >
                    {project.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Detailed Project Card (8 cols) */}
          <div className="lg:col-span-8 reveal">
            <TiltCard className="relative overflow-hidden rounded-3xl border border-border bg-bg-card p-4 sm:p-7 md:p-10 backdrop-blur-md shadow-2xl">
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-neon-cyan font-semibold">
                    // {activeProject.subtitle}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                    {activeProject.title}
                  </h3>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3.5 py-1.5 text-xs font-mono text-neon-cyan font-semibold">
                  <Lock className="h-3.5 w-3.5 text-neon-cyan" />
                  <span>{activeProject.confidentialTag}</span>
                </div>
              </div>

              {/* View Switcher: Recruiter Mode (HR Mode) vs Engineer Mode (Dev Mode) */}
              {mode === "recruiter" ? (
                /* RECRUITER MODE (HR Mode): Problem -> Decision -> Implementation -> Result */
                <div className="space-y-6 mt-7">
                  <p className="text-fg-muted leading-relaxed text-sm sm:text-base">
                    {activeProject.description}
                  </p>

                  {/* 4-Step Engineering Impact Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Problem */}
                    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4.5">
                      <span className="font-mono text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                        [ 01. The Problem ]
                      </span>
                      <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                        {activeProject.problem}
                      </p>
                    </div>

                    {/* Decision */}
                    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4.5">
                      <span className="font-mono text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        [ 02. Engineering Decision ]
                      </span>
                      <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                        {activeProject.decision}
                      </p>
                    </div>

                    {/* Implementation */}
                    <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-4.5">
                      <span className="font-mono text-xs uppercase tracking-wider text-sky-700 dark:text-sky-400 font-bold flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-sky-500 dark:bg-sky-400" />
                        [ 03. Implementation ]
                      </span>
                      <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                        {activeProject.implementation}
                      </p>
                    </div>

                    {/* Result */}
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4.5">
                      <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                        [ 04. Business Result ]
                      </span>
                      <p className="text-xs sm:text-sm text-fg font-medium leading-relaxed">
                        {activeProject.result}
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="pt-2">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-fg-dim mb-3 font-semibold">
                      Key Metrics &amp; Impact
                    </p>
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                      {activeProject.metrics.map(({ label, value, icon: Icon }) => (
                        <div
                          key={label}
                          className="rounded-xl border border-border bg-bg-soft/90 p-4 backdrop-blur-sm transition-all hover:border-neon-cyan/40"
                        >
                          <div className="flex items-center gap-2 text-neon-cyan">
                            <Icon className="h-4 w-4" />
                            <span className="font-mono text-[10px] uppercase tracking-wider text-fg-dim font-medium">
                              {label}
                            </span>
                          </div>
                          <div className="mt-2 font-mono text-sm font-bold text-fg">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* ENGINEER MODE (Dev Mode): 4 High-Signal Technical Tabs */
                <div className="space-y-6 mt-6">
                  {/* Brief project overview */}
                  <p className="text-fg-muted leading-relaxed text-sm">
                    {activeProject.description}
                  </p>

                  {/* Dev Mode Sub-Tabs */}
                  <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-bg-soft/90 border border-border overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => {
                        playTick();
                        setDevSubTab("architecture");
                      }}
                      className={`shrink-0 px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-[11px] sm:text-xs font-semibold transition-all ${
                        devSubTab === "architecture"
                          ? "bg-neon-cyan text-slate-950 shadow-[0_0_12px_var(--neon-cyan)]"
                          : "text-fg-muted hover:text-fg hover:bg-bg/40"
                      }`}
                    >
                      // 01. Architecture Nodes
                    </button>
                    <button
                      onClick={() => {
                        playTick();
                        setDevSubTab("code");
                      }}
                      className={`shrink-0 px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-[11px] sm:text-xs font-semibold transition-all ${
                        devSubTab === "code"
                          ? "bg-neon-cyan text-slate-950 shadow-[0_0_12px_var(--neon-cyan)]"
                          : "text-fg-muted hover:text-fg hover:bg-bg/40"
                      }`}
                    >
                      // 02. Code Quality (OOP/SOLID)
                    </button>
                    <button
                      onClick={() => {
                        playTick();
                        setDevSubTab("database");
                      }}
                      className={`shrink-0 px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-[11px] sm:text-xs font-semibold transition-all ${
                        devSubTab === "database"
                          ? "bg-neon-cyan text-slate-950 shadow-[0_0_12px_var(--neon-cyan)]"
                          : "text-fg-muted hover:text-fg hover:bg-bg/40"
                      }`}
                    >
                      // 03. Database Lab (N+1 Query)
                    </button>
                    <button
                      onClick={() => {
                        playTick();
                        setDevSubTab("testing");
                      }}
                      className={`shrink-0 px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-[11px] sm:text-xs font-semibold transition-all ${
                        devSubTab === "testing"
                          ? "bg-neon-cyan text-slate-950 shadow-[0_0_12px_var(--neon-cyan)]"
                          : "text-fg-muted hover:text-fg hover:bg-bg/40"
                      }`}
                    >
                      // 04. Testing &amp; Security
                    </button>
                  </div>

                  {/* Sub-Tab 1: Architecture Nodes */}
                  {devSubTab === "architecture" && (
                    <div className="animate-fade-in space-y-4">
                      <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-3 p-4 rounded-2xl bg-bg-soft border border-border/80">
                        {activeProject.architectureMap.map((node, index) => (
                          <div key={node.name} className="flex flex-col md:flex-row items-center gap-3 flex-1 min-w-[100px]">
                            <button
                              onClick={() => {
                                playTick();
                                setActiveNodeIdx(activeNodeIdx === index ? null : index);
                              }}
                              className={`w-full px-3 py-2.5 rounded-xl font-mono text-[10px] border transition-all duration-300 relative text-center ${
                                activeNodeIdx === index
                                  ? "bg-neon-cyan/15 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,255,242,0.15)] font-bold scale-[1.03]"
                                  : "bg-bg-card border-border text-fg-muted hover:border-fg hover:text-fg"
                              }`}
                            >
                              {node.name}
                            </button>
                            {index < activeProject.architectureMap.length - 1 && (
                              <div className="hidden md:flex flex-1 items-center justify-center min-w-[15px] h-4">
                                <svg className="w-full h-1 overflow-visible" xmlns="http://www.w3.org/2000/svg">
                                  <line x1="0" y1="2" x2="100%" y2="2" stroke="var(--border)" strokeWidth="1.5" />
                                  <line
                                    x1="0"
                                    y1="2"
                                    x2="100%"
                                    y2="2"
                                    stroke={activeNodeIdx === index ? "var(--neon-cyan)" : "var(--neon-cyan)"}
                                    strokeWidth="2"
                                    strokeDasharray="6 6"
                                    className="animate-flow-dash"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Explainer card for selected node */}
                      {activeNodeIdx !== null ? (
                        <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-4 animate-fade-in font-mono text-xs text-fg-muted space-y-1.5">
                          <div>
                            <span className="text-neon-cyan font-bold">Node: </span>
                            <span className="text-fg">{activeProject.architectureMap[activeNodeIdx].name}</span>
                          </div>
                          <div>
                            <span className="text-neon-cyan font-bold">Responsibility: </span>
                            <span className="text-fg">{activeProject.architectureMap[activeNodeIdx].responsibility}</span>
                          </div>
                          <div>
                            <span className="text-neon-cyan font-bold">Tech Module: </span>
                            <span className="text-fg">{activeProject.architectureMap[activeNodeIdx].techUsed}</span>
                          </div>
                          <div>
                            <span className="text-neon-cyan font-bold">Fault Fallback: </span>
                            <span className="text-fg">{activeProject.architectureMap[activeNodeIdx].fallback}</span>
                          </div>
                          <div className="flex justify-between pt-1.5 text-[10px] text-fg-dim border-t border-border/40 mt-2">
                            <span>Latency: {activeProject.architectureMap[activeNodeIdx].latency}</span>
                            <span>Throughput: Production Event-Driven</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs font-mono text-fg-dim text-center py-2">
                          💡 Click any node in the request lifecycle above to inspect module responsibility, latency, and fault fallback.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Sub-Tab 2: Code Quality (Fat Controller vs Service Class) */}
                  {devSubTab === "code" && (
                    <div className="animate-fade-in space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Bad Practice */}
                        <div className="rounded-2xl border border-rose-500/30 bg-slate-950 p-4 font-mono text-xs overflow-hidden">
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-rose-400 font-bold text-[11px]">
                            <span>{activeProject.codeQuality.badTitle}</span>
                          </div>
                          <pre className="text-rose-300/85 text-[11px] leading-relaxed overflow-x-auto whitespace-pre">
                            {activeProject.codeQuality.badCode}
                          </pre>
                        </div>

                        {/* Good Practice */}
                        <div className="rounded-2xl border border-emerald-500/40 bg-slate-950 p-4 font-mono text-xs overflow-hidden">
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-emerald-400 font-bold text-[11px]">
                            <span>{activeProject.codeQuality.goodTitle}</span>
                          </div>
                          <pre className="text-emerald-300 text-[11px] leading-relaxed overflow-x-auto whitespace-pre">
                            {activeProject.codeQuality.goodCode}
                          </pre>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-border bg-bg-soft text-xs text-fg-muted leading-relaxed">
                        <strong className="text-neon-cyan font-mono mr-1.5">[Senior Standard]:</strong>
                        {activeProject.codeQuality.explanation}
                      </div>
                    </div>
                  )}

                  {/* Sub-Tab 3: Database Lab (N+1 vs Eager Loading) */}
                  {devSubTab === "database" && (
                    <div className="animate-fade-in space-y-4">
                      {/* Before / After Table */}
                      <div className="overflow-x-auto rounded-2xl border border-border/80 bg-bg-soft">
                        <table className="w-full text-left font-mono text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-border/80 bg-bg-card text-fg-dim">
                              <th className="p-3">Optimization Metric</th>
                              <th className="p-3">Before (Unoptimized)</th>
                              <th className="p-3">After (Eager Loaded &amp; Indexed)</th>
                              <th className="p-3 text-right">Engineering Result</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeProject.beforeAfter.map((m) => (
                              <tr key={m.metric} className="border-b border-border/40 hover:bg-bg/25">
                                <td className="p-3 font-semibold text-fg">{m.metric}</td>
                                <td className="p-3 text-red-400">{m.before}</td>
                                <td className="p-3 text-emerald-400 font-semibold">{m.after}</td>
                                <td className="p-3 text-right text-neon-cyan font-bold">{m.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Code comparison of queries */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-[11px] overflow-x-auto text-rose-300">
                          <span className="text-rose-400 font-bold block mb-2 border-b border-slate-800 pb-1">
                            // Unoptimized N+1 Database Loop
                          </span>
                          <pre className="whitespace-pre">{activeProject.dbLab.badQuery}</pre>
                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-[11px] overflow-x-auto text-emerald-300">
                          <span className="text-emerald-400 font-bold block mb-2 border-b border-slate-800 pb-1">
                            // Eager Loading + Indexing (Optimized)
                          </span>
                          <pre className="whitespace-pre">{activeProject.dbLab.optimizedQuery}</pre>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-border bg-bg-soft">
                        <span className="font-mono text-xs font-bold text-fg block mb-1.5">
                          🔧 What Changed in MySQL &amp; Eloquent:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-fg-muted font-mono list-disc pl-4">
                          {activeProject.dbLab.whatChanged.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Sub-Tab 4: Testing & Security */}
                  {devSubTab === "testing" && (
                    <div className="animate-fade-in space-y-4">
                      {/* Simulated Artisan Test Runner */}
                      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs text-slate-300 shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 text-slate-400 text-[11px]">
                          <div className="flex items-center gap-2 text-neon-cyan">
                            <Terminal className="h-4 w-4" />
                            <span>PHPUnit / Pest Test Runner</span>
                          </div>
                          <span className="text-emerald-400 font-bold">ALL TESTS PASSING</span>
                        </div>

                        <div className="text-neon-cyan font-bold mb-2">
                          $ {activeProject.testSuite.command}
                        </div>

                        <div className="space-y-1 text-slate-300 text-[11px]">
                          {activeProject.testSuite.tests.map((testLine, idx) => (
                            <div key={idx} className={testLine.startsWith("PASS") ? "text-emerald-400 font-bold" : "pl-3 text-slate-300"}>
                              {testLine}
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                          <span className="text-slate-400">Result:</span>
                          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                            {activeProject.testSuite.passed}
                          </span>
                        </div>
                      </div>

                      {/* Security Gate & 403 Forbidden Check */}
                      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4.5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs uppercase tracking-wider text-amber-500 font-bold flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-amber-500" />
                            Security Gate: {activeProject.testSuite.securityCheck.action}
                          </span>
                          <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 font-bold">
                            {activeProject.testSuite.securityCheck.status}
                          </span>
                        </div>
                        <p className="font-mono text-xs text-fg-muted mb-2">
                          Endpoint: <code className="text-neon-cyan">{activeProject.testSuite.securityCheck.route}</code>
                        </p>
                        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-[11px] text-rose-300 overflow-x-auto whitespace-pre">
                          {activeProject.testSuite.securityCheck.response}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Technologies Used & Repository CTA */}
              <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-fg-dim mb-2 font-semibold">
                    Technologies Used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-border bg-bg/80 px-3 py-1 font-mono text-xs text-fg-muted hover:border-neon-cyan/50 hover:text-neon-cyan transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Repo / NDA Link */}
                <div className="shrink-0 self-start sm:self-auto">
                  {activeProject.isEnterprise ? (
                    <div className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 font-mono text-xs text-amber-700 dark:text-amber-400 font-semibold">
                      <Lock className="h-3.5 w-3.5" />
                      <span>{activeProject.repoLabel}</span>
                    </div>
                  ) : (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-neon-cyan px-4 py-2 font-mono text-xs font-bold text-slate-950 transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>{activeProject.repoLabel}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
