export async function onRequest(context) {
  return new Response(JSON.stringify({
    status: 'ok',
    game: 'Nadir Code',
    edition: 'Hard Edition',
    cases: 20,
    timestamp: new Date().toISOString()
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
