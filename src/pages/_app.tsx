import "@/styles/index.scss";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/config/apollo-client";
import { useAuth } from "@/config/userAuth";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useRouter } from "next/router";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/appBar/Navbar";
import BackOfficeLayout from "@/components/backoffice/layout/BackOfficeLayout";
import React from "react";
import LoadingApp from "@/styles/LoadingApp";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    h1: {
      fontFamily: ["Poppins-Medium", "sans-serif"].join(","),
    },
    h2: {
      fontFamily: ["Poppins-Medium", "sans-serif"].join(","),
    },
    h3: {
      fontFamily: ["Poppins-Medium", "sans-serif"].join(","),
    },
    h4: {
      fontFamily: ["Poppins-Medium", "sans-serif"].join(","),
    },
    h5: {
      fontFamily: ["Poppins-Medium", "sans-serif"].join(","),
    },
  },

  palette: {
    mode: "light",
    background: {
      default: "FFFFFF",
    },
    primary: {
      main: "#FF8E3C",
      light: "#FFB648",
      dark: "#e89116",
    },
    secondary: {
      main: "#343a40",
      light: "#5C6166",
      dark: "#24282C",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#F8F8F8",
        },
      },
    },
  },
});

const privatePages = ["/account"];

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { loading, error } = useAuth(privatePages);
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
        <AuthProvider>
          <CssBaseline />
          {!isBackOffice && <Navbar />}
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {!isBackOffice && <Footer />}
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
