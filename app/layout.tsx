import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HR 시스템 | 휴가 신청 도우미",
  description: "규정 Q&A, 휴가·야간수당 계산, 결재 라인을 제공하는 HR 시스템",
  openGraph: {
    title: "HR 시스템",
    description: "규정 Q&A · 개인별 휴가 및 수당 계산 · 결재 라인",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
