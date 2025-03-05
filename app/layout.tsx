import Global from "~/component/Global";
import NavBar from "~/component/NavBar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
          <NavBar />
          <div id="page-container">{children}</div>
          <Global />
        </div>
      </body>
    </html>
  );
}
