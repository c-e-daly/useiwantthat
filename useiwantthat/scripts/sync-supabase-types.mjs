import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const outputPath = resolve("src/types/database.types.ts");
const projectRefPaths = [
  resolve("supabase/.temp/project-ref"),
  resolve("../supabase/.temp/project-ref"),
];

const projectRefPath = projectRefPaths.find((path) => existsSync(path));
const projectRef = projectRefPath
  ? readFileSync(projectRefPath, "utf8").trim()
  : undefined;

const args = ["gen", "types", "typescript"];

if (projectRef) {
  args.push("--project-id", projectRef);
} else {
  args.push("--linked");
}

const result = spawnSync("supabase", args, {
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"],
});

if (result.status !== 0) {
  process.stderr.write(result.stderr || result.stdout);
  process.exit(result.status ?? 1);
}

if (!result.stdout.trim()) {
  process.stderr.write("Supabase generated an empty types file.\n");
  process.exit(1);
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, result.stdout);

console.log(`Synced Supabase types to ${outputPath}`);
