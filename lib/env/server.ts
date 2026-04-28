const readFirst = (...values: Array<string | undefined>) =>
  values.find((value) => typeof value === "string" && value.length > 0);

export function getSupabaseUrl(): string | undefined {
  return readFirst(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_URL
  );
}

export function getSupabaseAnonKey(): string | undefined {
  return readFirst(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    process.env.SUPABASE_ANON_KEY
  );
}

export function getSupabaseServiceRoleKey(): string | undefined {
  return readFirst(
    process.env.SUPABASE_SECRET_KEY,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
