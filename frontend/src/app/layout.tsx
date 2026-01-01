import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <main className="min-h-screen bg-background">
                    {children}
                </main>
            </body>
        </html>
    );
}