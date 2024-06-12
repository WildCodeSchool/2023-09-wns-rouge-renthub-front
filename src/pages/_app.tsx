import "@/styles/index.scss";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { UserProvider } from "@/context/UserContext";
import { useRouter } from "next/router";
import { client } from "@/config/apollo-client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/appBar/Navbar";
import BackOfficeLayout from "@/components/backoffice/layout/BackOfficeLayout";
import LoadingApp from "@/styles/LoadingApp";
import { useAuth } from "@/config/userAuth";
import theme from "@/config/themeMui";

const privatePages = ["/compte"];

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth(privatePages);
  if (loading) return <LoadingApp />;
  return children;
};

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isBackOffice = router.pathname.startsWith("/renthub-backoffice");
  const Layout = isBackOffice ? BackOfficeLayout : React.Fragment;

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <AuthProvider>
            <CssBaseline />
            {!isBackOffice && <Navbar />}
            <Layout>
              <Component {...pageProps} />
            </Layout>
            {!isBackOffice && <Footer />}
          </AuthProvider>
        </UserProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
