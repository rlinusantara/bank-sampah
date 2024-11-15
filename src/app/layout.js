import "./globals.css";


export const metadata = {
  title: "Bank Sampah",
  description: "Bank Sampah Rumah Literasi Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-nunito"
      >
        {children}
      </body>
    </html>
  );
}
