import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  consent: z.literal(true),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Request body inválido' },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Datos del formulario inválidos' },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;

  // Development mock — no RESEND_API_KEY needed locally
  if (!process.env.RESEND_API_KEY) {
    console.log('[Contact API] Mock mode — no RESEND_API_KEY set');
    console.log({ name, email, message });
    return NextResponse.json({
      success: true,
      message: 'Mensaje recibido (modo demo)',
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const toEmail = process.env.RESEND_TO_EMAIL ?? '';
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

  const { error } = await resend.emails.send({
    from: `Portfolio Contact <${fromEmail}>`,
    to: [toEmail],
    replyTo: email,
    subject: `[Portfolio] Nuevo mensaje de ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px">
        <h2 style="color:#6366f1">Nuevo mensaje desde tu portafolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr/>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap">${message}</p>
      </div>
    `,
  });

  if (error) {
    console.error('[Contact API] Resend error:', error);
    return NextResponse.json(
      { success: false, message: 'Error al enviar el email' },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, message: 'Email enviado' });
}
