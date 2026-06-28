// In-memory fixed-window rate limiter. Per-instance only (resets on deploy/
// restart, not shared across instances) — adequate for this single-instance
// admin login endpoint; swap for a shared store (e.g. Redis) if scaled out.
const buckets = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  bucket.count += 1;
  return bucket.count > limit;
}
