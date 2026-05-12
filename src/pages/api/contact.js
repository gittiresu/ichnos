export const prerender = false;

import { Resend } from "resend";
import RFQTemplate from "../../email/RFQTemplate";
import { RECAPTCHA, SITE, RESEND } from '@config/site';
import { POSITIONS } from '@utils/positions';
import { TIMELINES } from '@utils/timelines';
import { INDUSTRIES } from '@utils/industries';

const resend = new Resend(RESEND.apiKey);

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

  function getTitleByImageName(imageName) {
    const position = POSITIONS.find((item) => {
      const fileNameWithoutExtension = item.image.split('.').slice(0, -1).join('.');
      return fileNameWithoutExtension === imageName;
    });
    return position?.title;
  }

  function getTimelineByValue(value) {
    const timeline = TIMELINES.find((item) => item.value === value);
    return timeline?.label;
  }

  function getIndustryByValue(value) {
    const industry = INDUSTRIES.find((item) => item.value === value);
    return industry?.label;
  }

  const row = (label, value) => {
    if (!value) return "";
    return `<b>${label}: </b> ${value} <br />`;
  };
    
  let selectedTimeline = formData?.timeline ? getTimelineByValue(formData.timeline) : null;
  let selectedIndustry = formData?.industry ? getIndustryByValue(formData.industry) : null;
  let selectedService = formData?.services ? getTitleByImageName(formData.services) : null;
  const toData = SITE.email;
  const fromData = formData?.firstName + " " + formData?.lastName + " <noreply@ichnosconsultancy.com>" || null;
  let subjectData  = "[Ichnos site] ";
      subjectData += formData?.services ? "Application for " + selectedService : "Contact without application";

  const bodyData = `
    <p>
      ${row("Nome", `${formData?.firstName || ""} ${formData?.lastName || ""}`.trim())}
      ${row("Email", formData?.email)}
      ${row("Phone", formData?.phone)}
      ${row("Current company", formData?.company)}
      ${row("Company field", selectedIndustry)}
      ${row("Applying for", selectedService)}
      ${row("Available to start within", selectedTimeline)}
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