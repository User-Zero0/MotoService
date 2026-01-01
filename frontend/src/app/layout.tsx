import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
    title: "Moto Metus | Профессиональный Мотосервис в Батуми",
    description: "Ремонт и обслуживание Triumph, Ducati, Harley-Davidson и других брендов в Грузии",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <body className={`${inter.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}