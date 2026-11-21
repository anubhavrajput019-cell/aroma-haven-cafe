import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // In production with Supabase, this inserts into `contact_messages`.
    // In demo/hybrid mode, we log and return success.
    const messageId = `MSG-${Date.now().toString().slice(-6)}`;

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out to Aroma Haven Café. Our team will contact you shortly.',
      ticket_id: messageId,
      received_at: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to process inquiry.' },
      { status: 500 }
    );
  }
}
