
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from 'react-bootstrap';
import { Open_Sans } from "@next/font/google";
import layoutStyles from "../src/components/layout-style.module.scss";
import "./globals.css";


const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Uncomment this if you want to handle invalid locales
  // if (!routing.locales.includes(locale as any)) {
  //   notFound();
  // }

  const locales = await getMessages();

  return (
    <html lang="en">
      <body style={{ backgroundColor: "#cbd5e0", minHeight: "100vh"}}>
        <NextIntlClientProvider messages={locales}>
          <div className="container" style={{ maxWidth: "1600px"}}>
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
