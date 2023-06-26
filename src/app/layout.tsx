import SideNav from "./components/SideNav";
import "./globals.css";

export const metadata = {
  title: "Create Next Chat App",
  description: "Chat About Your Next Saas Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grid grid-cols-4 h-screen">
        <SideNav />
        <div className="col-span-3 bg-slate-700 overflow-scroll">
          {children}
        </div>
      </body>
    </html>
  );
}
