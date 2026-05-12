// emails/RFQTemplate.jsx
import {
  Html,
  Body,
  Container,
  Heading,
} from "@react-email/components";
import { SITE } from '@config/site';

export default function RFQTemplate({ data }) {
  return (
    <Html>
      <Body style={{ background: "#ccc" }}>
        <Container style={{ padding: "20px", background: "#fff" }}>
          <Heading>
            <img src={`${SITE.url}/logo_tr_minified.jpg`} alt="Logo" />
          </Heading>
          <div dangerouslySetInnerHTML={{ __html: data }} />
        </Container>
      </Body>
    </Html>
  );
}