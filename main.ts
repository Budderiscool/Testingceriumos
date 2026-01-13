// Added global declaration for Deno to resolve the "Cannot find name 'Deno'" error
declare const Deno: any;
import { serveDir } from "https://deno.land/std@0.225.0/http/file_server.ts";

Deno.serve((req: Request) => {
  return serveDir(req, {
    fsRoot: ".",
    showIndex: true,
  });
});
