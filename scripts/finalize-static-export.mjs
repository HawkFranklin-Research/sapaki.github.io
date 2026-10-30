import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Next exports a route named /deck.html as deck.html.html, alongside
// its RSC directory deck.html/. Give that directory an index document so
// GitHub Pages can also serve the public /deck.html URL (with a slash redirect).
const output = new URL("../out/", import.meta.url);
for (const entry of await readdir(output, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".html.html")) continue;
  const route = entry.name.slice(0, -5);
  const directory = new URL(`${route}/`, output);
  await mkdir(directory, { recursive: true });
  await copyFile(new URL(entry.name, output), new URL("index.html", directory));
  console.log(`Static route ready: /${route}`);
}
await writeFile(join(output.pathname, ".nojekyll"), "");
