import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body
        style={{
          height: "100vh",
          width: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
