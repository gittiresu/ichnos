export const prerender = false;

import { Resend } from "resend";

const resend = new Resend("re_5MJnuSjA_Me7AdL6Y6u6AAsoifEAUKwYA");

export async function POST({ request }) {
  const raw = await request.text();
  const data = raw ? JSON.parse(raw) : null;

  const toData = "gittires@gmail.com";
  const fromData = data?.firstName + " " + data?.lastName + " <" + data?.email + ">" || null;
  //const fromData = data?.firstName + " " + data?.lastName + " <noreply@ichnosconsultancy.com>" || null;
  const subjectData = "[Ichnos site] Application for " + data?.services || null;
  const bodyData = `<p>
    <b>Nome: </b> ${data?.firstName} ${data?.lastName} <br />
    <b>Email: </b> ${data?.email} <br />
    <b>Phone: </b> ${data?.phone} <br />
    <b>Current company: </b> ${data?.company} <br />
    <b>Company field: </b> ${data?.industry} <br />
    <b>Applying for: </b> ${data?.services} <br />
    <b>Available to start within: </b> ${data?.timeline} <br />
    <b>Expected salary: </b> ${data?.volume} <br />
    <b>Message: </b> ${data?.details} <br />
  </p>`
  
  const emailResponse = await resend.emails.send({
    from: fromData,
    to: toData,
    subject: subjectData,
    html: bodyData,
  });
  
  if(emailResponse?.error === null) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ ok: false }), { 
      status: emailResponse?.error?.statusCode, 
      name: emailResponse?.error?.name, 
      message: emailResponse?.error?.message 
    });
  }

}