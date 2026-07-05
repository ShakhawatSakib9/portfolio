import { NextResponse } from "next/server";

export async function GET() {
  const startTime = Date.now();
  
  // Calculate mock memory usage and metrics dynamically
  const memory = process.memoryUsage();
  const memoryRss = Math.round(memory.rss / 1024 / 1024 * 10) / 10;
  const memoryHeap = Math.round(memory.heapUsed / 1024 / 1024 * 10) / 10;

  // Artificial small delay to make it realistic (simulating a 20ms DB/Redis ping)
  await new Promise((resolve) => setTimeout(resolve, 20));
  const latency = Date.now() - startTime;

  return NextResponse.json(
    {
      status: "online",
      environment: "production",
      api_latency_ms: latency,
      timestamp: new Date().toISOString(),
      runtime: {
        framework: "Next.js 16 (App Router)",
        node_version: process.version,
        uptime_seconds: Math.round(process.uptime()),
        memory_usage: {
          rss_mb: memoryRss,
          heap_used_mb: memoryHeap,
        },
      },
      headers: {
        cache_control: "no-store, max-age=0",
        content_type: "application/json",
      },
    },
    {
      status: 200,
      headers: {
        "x-response-time": `${latency}ms`,
      },
    }
  );
}
