
// Use JSR instead of deno.land for better reliability and performance on Deno Deploy
// @ts-ignore: Deno is available in the deploy environment
import { serveDir } from "jsr:@std/http/file-server";

// @ts-ignore
Deno.serve((req: Request) => {
  const url = new URL(req.url);
  // Serve static files from the current directory
  return serveDir(req, {
    fsRoot: ".",
    showIndex: true,
  });
});
