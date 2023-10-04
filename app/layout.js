"use client";
import ExpenseContextProvider from "@/lib/store/expense-context";
import "./globals.css";

import Navigation from "@/components/Navigation";
import AuthContextProvider from "@/lib/store/auth-context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <ExpenseContextProvider>
            <Navigation />
            {children}
          </ExpenseContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
