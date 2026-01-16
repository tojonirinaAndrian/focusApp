import type { Metadata } from "next";
import "./globals.css";
import ToastNotificationsWrapper from "../components/toastComponents/toastNotificationWrapper";

export const metadata: Metadata = {
  title: "Project name",
  description: "Project description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastNotificationsWrapper />
        {children}
      </body>
    </html>
  );
}
