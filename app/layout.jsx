import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from 'react-bootstrap';
import { Open_Sans } from "next/font/google";
import layoutStyles from "../src/components/layout-style.module.scss";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
  params: { locale },
}) {

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body style={{ backgroundColor: "#cbd5e0", minHeight: "100vh" }}>
        <NextIntlClientProvider messages={messages}>
          <div className="container" style={{ maxWidth: "1600px" }}>
            <Row
              className="mx-0"
              style={{ backgroundColor: "#cbd5e0", minHeight: "100vh" }}
            >
              <Col className="px-0">
                <div id="custom-prompt" />
                <div className="row mx-0">
                  <div className={layoutStyles["layout-wrapper"]}>
                    <div className={layoutStyles["layout-content-wrapper"]}>
                      {children}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
