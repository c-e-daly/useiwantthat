import { createClient } from "@supabase/supabase-js";
import { getBlogStorageConfig } from "@/lib/blog/storageConfig";

const readFirst = (...values: Array<string | undefined>) =>
  values.find((value) => typeof value === "string" && value.length > 0);

const supabaseUrl = () =>
  readFirst(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_URL);

const supabaseAnonKey = () =>
  readFirst(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    process.env.SUPABASE_ANON_KEY
  );

const supabaseServiceRoleKey = () =>
  readFirst(process.env.SUPABASE_SECRET_KEY, process.env.SUPABASE_SERVICE_ROLE_KEY);

function requireEnv(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Missing required Supabase environment variable: ${name}`);
  }

  return value;
}

export const blogStorageBucket = getBlogStorageConfig().bucket;

export function createSupabaseClient() {
  return createClient(
    requireEnv(supabaseUrl(), "NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL"),
    requireEnv(
      supabaseAnonKey(),
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, NEXT_PUBLIC_SUPABASE_ANON_KEY, or SUPABASE_ANON_KEY"
    )
  );
}

export function createSupabaseAdminClient() {
  return createClient(
    requireEnv(supabaseUrl(), "NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL"),
    requireEnv(
      supabaseServiceRoleKey(),
      "SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY"
    ),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export function createBlogStorageClient() {
  return createSupabaseAdminClient().storage.from(blogStorageBucket);
}
