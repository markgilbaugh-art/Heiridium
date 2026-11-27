import fs from "node:fs";
import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
const file =
  process.env.ACADEMY_TEST_PREVIEW_SECRET_FILE ??
  path.join(tmpdir(), "heiridium-academy-preview-secret");
if (fs.existsSync(file) && fs.lstatSync(file).isSymbolicLink())
  throw new Error("Unsafe preview credential path");
const secret = randomBytes(32).toString("hex");
fs.writeFileSync(file, secret, { mode: 0o600 });
fs.chmodSync(file, 0o600);
const child = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3427",
  ],
  { stdio: "inherit", env: { ...process.env, PREVIEW_SECRET: secret } },
);
const cleanup = () => {
  if (fs.existsSync(file)) fs.unlinkSync(file);
};
child.on("exit", (code) => {
  cleanup();
  process.exit(code ?? 0);
});
process.on("SIGTERM", () => {
  cleanup();
  child.kill("SIGTERM");
});
process.on("SIGINT", () => {
  cleanup();
  child.kill("SIGINT");
});
