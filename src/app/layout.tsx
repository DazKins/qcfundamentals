import "./globals.css";
import "katex/dist/katex.min.css";
import { normal } from "@/font/fonts";
import { getPageMetadata } from "@/util/metadata";
import TopBar from "@/components/topBar";

export const metadata = getPageMetadata({
  title: "QCFundamentals",
  description: "Learn the fundamentals of quantum computing",
  image: "/qc.png",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`bg-black text-white leading-7 tracking-wide ${normal.className}`}
    >
      <body>
        <TopBar />
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1200px] p-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
