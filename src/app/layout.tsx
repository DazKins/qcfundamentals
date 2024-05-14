import "./globals.css";
import "katex/dist/katex.min.css";
import { normal } from "@/font/fonts";
import { getPageMetadata } from "@/util/metadata";
import TopBar from "@/components/topBar";

export const metadata = getPageMetadata({
  title: "QCFundamentals",
  description: "Learn the fundamentals of quantum computing",
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
      <head>
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <TopBar />
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1200px] p-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
