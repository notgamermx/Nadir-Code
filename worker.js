const ANSWER_HASHES = [
  '5582fcd8', '11833534', 'b78a9c80', '5857faea', '1b0ce208',
  '9e6cdfe2', 'bdf64cf4', 'fc5fbcc8', '3ec9b054', 'f3ee0aa2',
  '9bb90cd0', '9ac7c276', '35ce675c', '551e18ec', '57cf3a90',
  '29aaed72', '8cf6ee32', '31a0e5b8', '512b918a', '46d7e00e'
];

function hashAnswer(val) {
  let x = 2166136261;
  const str = String(val).toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const c of str) {
    x = Math.imul(x ^ c.charCodeAt(0), 16777619);
  }
  return (x >>> 0).toString(16);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
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

    if (url.pathname === '/api/check' && request.method === 'POST') {
      try {
        const body = await request.json();
        const level = parseInt(body.level, 10);
        const answer = body.answer;

        if (!level || level < 1 || level > ANSWER_HASHES.length || typeof answer !== 'string') {
          return new Response(JSON.stringify({ error: 'Invalid parameters' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const inputHash = hashAnswer(answer);
        return new Response(JSON.stringify({
          level,
          correct: inputHash === ANSWER_HASHES[level - 1]
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch {
        return new Response(JSON.stringify({ error: 'Invalid request body' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Serve static assets from Cloudflare Worker Assets
    return env.ASSETS.fetch(request);
  }
};
