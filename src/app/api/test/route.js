// src/app/api/test/route.js



const allowedOrigin = '*'; // নিরাপত্তার জন্য নির্দিষ্ট origin দিন প্রোডাকশনে

export async function OPTIONS(request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request) {
  const body = await request.json();
  console.log(body)
  return new Response(JSON.stringify({ message: 'Received!', data: body }), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
    },
  });
}

export async function GET(request) {
  return new Response(JSON.stringify({ message: 'GET OK' }), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
    },
  });
}