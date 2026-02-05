// credits : kasan
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const targetUrl = Buffer.from(params.id, 'base64').toString('ascii');
    const response = await fetch(targetUrl);

    if (!response.ok) return new NextResponse('Not Found', { status: 404 });

    const contentType = response.headers.get('content-type');
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        'Content-Type': contentType || 'application/octet-stream',
        'Cache-Control': 'public, max-age=86400'
      },
    });

  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}

