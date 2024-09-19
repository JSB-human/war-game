import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const aiMessage = searchParams.get('aiMessage');
    
    const response = await fetch(`http://localhost:11434/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        messages: [
          {
            "role": "system",
            "content": "Use only Korean."
          },
          {
            "role": "user",
            "content": aiMessage
          }
        ],
        stream: false
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error Occurred" }, { status: 500 });
  }
}
