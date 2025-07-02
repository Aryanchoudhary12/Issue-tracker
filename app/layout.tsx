import "./globals.css";
import Navbar from "./navbar";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import AuthProviders from "./providers/authProviders";
import { Roboto_Condensed,Poppins } from "next/font/google";
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["200","400","500","600","700"],
  variable: "--roboto-condensed",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200","400","500","600","700"],
  variable: "--poppins",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoCondensed.variable} ${poppins.variable}`}>
        <AuthProviders>
          <Theme
            accentColor="red"
            grayColor="olive"
            radius="large"
            appearance="dark"
          >
            <Navbar />
            <main className="pt-16 md:pl-48">{children}</main>
          </Theme>
        </AuthProviders>
      </body>
    </html>
  );
}
