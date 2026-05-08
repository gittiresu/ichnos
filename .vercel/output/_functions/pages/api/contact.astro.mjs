import { Resend } from 'resend';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Html, Body, Container, Heading } from '@react-email/components';
import { S as SITE, R as RESEND, a as RECAPTCHA } from '../../chunks/site_mxF_3aby.mjs';
export { renderers } from '../../renderers.mjs';

function RFQTemplate({ data }) {
  return /* @__PURE__ */ jsx(Html, { children: /* @__PURE__ */ jsx(Body, { style: { background: "#ccc" }, children: /* @__PURE__ */ jsxs(Container, { style: { padding: "20px", background: "#fff" }, children: [
    /* @__PURE__ */ jsx(Heading, { children: /* @__PURE__ */ jsx("img", { src: `${SITE.url}/logo_tr_mini_no_border.png`, alt: "Logo" }) }),
    /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: data } })
  ] }) }) });
}

const prerender = false;

const resend = new Resend(RESEND.apiKey);

async function POST({ request }) {
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

  const row = (label, value) => {
    if (!value) return "";
    return `<b>${label}: </b> ${value} <br />`;
  };
    
  const toData = SITE.email;
  const fromData = formData?.firstName + " " + formData?.lastName + " <noreply@ichnosconsultancy.com>" || null;
  let subjectData  = "[Ichnos site] ";
      subjectData += !!formData?.services ? "Application for " + formData?.services : "Contact without application";

  const bodyData = `
    <p>
      ${row("Nome", `${formData?.firstName || ""} ${formData?.lastName || ""}`.trim())}
      ${row("Email", formData?.email)}
      ${row("Phone", formData?.phone)}
      ${row("Current company", formData?.company)}
      ${row("Company field", formData?.industry)}
      ${row("Applying for", formData?.services)}
      ${row("Available to start within", formData?.timeline)}
      ${row("Expected salary", formData?.volume)}
      ${row("Message", formData?.details)}
    </p>`;
  
  const emailResponse = await resend.emails.send({
    from: fromData,
    to: toData,
    subject: subjectData,
    react: RFQTemplate({ data: bodyData }),
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
