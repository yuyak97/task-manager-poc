"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Provider from "@/components/provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Task management</Typography>
            </Toolbar>
          </AppBar>
          {children}
        </Provider>
      </body>
    </html>
  );
}
