export const prerender = false;

import { Resend } from "resend";
import { RECAPTCHA } from '@config/site';

const resend = new Resend("re_5MJnuSjA_Me7AdL6Y6u6AAsoifEAUKwYA");

export async function POST({ request }) {
  const { token, formData } = await request.json();

  if (!token) {
    return new Response(JSON.stringify({ ok: false }), { 
      status: 400, 
      name: "CaptchaError", 
      message: 'Captcha missing' 
    });
  }
  
  const secret = RECAPTCHA.secretKey;
  const verify = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secret}&response=${token}`,
    }
  );

  const captchaVerify = await verify.json();
  if (!captchaVerify.success) {
    return new Response(JSON.stringify({ ok: false }), { 
      status: 400, 
      name: "CaptchaError", 
      message: 'Captcha not valid' 
    });
  }
    
  const toData = "gittires@gmail.com";
  const fromData = formData?.firstName + " " + formData?.lastName + " <" + formData?.email + ">" || null;
  //const fromData = formData?.firstName + " " + formData?.lastName + " <noreply@ichnosconsultancy.com>" || null;
  const subjectData = "[Ichnos site] Application for " + formData?.services || null;
  const bodyData = `<p>
    <b>Nome: </b> ${formData?.firstName} ${formData?.lastName} <br />
    <b>Email: </b> ${formData?.email} <br />
    <b>Phone: </b> ${formData?.phone} <br />
    <b>Current company: </b> ${formData?.company} <br />
    <b>Company field: </b> ${formData?.industry} <br />
    <b>Applying for: </b> ${formData?.services} <br />
    <b>Available to start within: </b> ${formData?.timeline} <br />
    <b>Expected salary: </b> ${formData?.volume} <br />
    <b>Message: </b> ${formData?.details} <br />
  </p>`;

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
  
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