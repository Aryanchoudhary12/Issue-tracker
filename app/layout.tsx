import "./globals.css";
import Navbar from "./navbar";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import AuthProviders from "./providers/authProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
