import "./globals.css";
import NavbarBoot from "@/components/navbar/navbar";
// import SessionWrapper from "@/components/SessionWrapper";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <SessionWrapper>
    <html lang="en">
      <body>
      <SessionProvider>
        <NavbarBoot />
        {children}
        <ToastContainer />
      </SessionProvider>
      </body>
    </html>
    // </SessionWrapper>
  );
}
