import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/hooks/useAuth";
import { MaintenanceProvider } from "@/hooks/useMaintenance";
import { MaintenanceWrapper } from "@/components/ui/MaintenanceView";

export const metadata: Metadata = {
  title: "Portal de Beneficios Estatales",
  description: "Consulta los beneficios estatales de Chile a los que puedes acceder.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* Usamos el script de recaptcha asumiendo integración nativa o mock. */}
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </head>
      <body>
        <a href="#login-view" className="skip-link">Saltar al contenido</a>
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
        <div className="bg-blob blob-3"></div>
        <div id="app">
          <MaintenanceProvider>
            <AuthProvider>
              <MaintenanceWrapper>
                {children}
              </MaintenanceWrapper>
            </AuthProvider>
          </MaintenanceProvider>
        </div>
      </body>
    </html>
  );
}
