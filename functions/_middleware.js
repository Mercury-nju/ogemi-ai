// Cloudflare Pages Functions middleware
export function onRequest(context) {
  // Add CORS headers for API requests
  const response = new Response(context.request.body, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
  
  return response;
}
