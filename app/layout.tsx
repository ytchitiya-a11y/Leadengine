import type { Metadata } from "next";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "AI Lead Engine — Intelligence Platform",
  description: "AI-powered lead capture, intent detection, and conversion intelligence",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-bg-base antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111527",
              color: "#e8ecf8",
              border: "1px solid #1e2438",
              borderRadius: "10px",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
