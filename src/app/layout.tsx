import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="h-full w-full xl:container mx-auto mt-8 px-4">
        {children}
      </body>
    </html>
  );
}
