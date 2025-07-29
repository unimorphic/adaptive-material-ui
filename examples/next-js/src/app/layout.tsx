import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import type { Metadata } from "next";
import { headers } from "next/headers";
import App from "./app";

export const metadata: Metadata = {
  title: "Next.js Example",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider>
          <App userAgent={headersList.get("user-agent") ?? ""}>
            <CssBaseline />
            {children}
          </App>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
