// credits : kasan
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const idnetData = new FormData();
    idnetData.append('file', file);

    const uploadRes = await fetch('https://file.idnet.my.id/api/upload.php', {
      method: 'POST',
      body: idnetData,
    });

    const data = await uploadRes.json();
    const originalUrl = data.file.url;
    const encodedCode = Buffer.from(originalUrl).toString('base64');
    
    const host = req.headers.get('host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    
    return NextResponse.json({ url: `${protocol}://${host}/view/${encodedCode}` });

  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}


