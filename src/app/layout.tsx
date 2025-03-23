import type { Metadata } from "next";
// style
import { Quicksand } from "next/font/google";
import "@/scss/main.scss";

//

export const metadata: Metadata = {
  title: {
    default: "Pomofocus",
    template: "%s | Time to focus",
  },
  icons:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAATlBMVEVHcEzjVlHUUEzuWlXwW1bxW1bvWlXkVlHvWlXuWlXuWlXwW1bwW1bvWlWzQ0DvW1XDSkatQT7bU0/ZUk0JAwPgVVDmV1LXUU3ST0t2LCoDZLzrAAAAGnRSTlMABxE2xf+aO16IdLj47DPdQSC3gRqcUW2gL75J5A4AAADISURBVHgBbdEBEkNAEETRnlkDACTB/S+aGrC6+AAPAJSo4DUNISSWhpDJw/LUzoqcqSzsXil3M+OqnI2rczauPLAwqq6bqLlxTYvOlwGApmxdDyAxM79reDEMviYXjsc13fYzTYHMvFaLfQmvswMnX/rxfu9PNEf5+lLgSuaIny9/8MRnmljEzKK6VXbD42lzNsZ61yTaVwApbtpZLKNvm5ONw/svo0f8PqmecdSOr3Y0TMZFe9x3+YHL+vGkXvFIdFjXdVDB2R8kSg0jT3YNUgAAAABJRU5ErkJggg==",
};

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand", // CSS o'zgaruvchi sifatida ishlatish uchun
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" className={`${quicksand.variable}`}>
        {children}
      </body>
    </html>
  );
}
