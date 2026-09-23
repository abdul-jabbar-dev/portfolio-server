Deno.serve({ port: 8001, hostname: "::" }, () => new Response("OK"));
