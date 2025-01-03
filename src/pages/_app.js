import Layout from "@/components/layouts/Layout";
import { CartProvider } from "@/components/utils/ContextReducer";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={5000} />
        </Layout>
      </CartProvider>
    </ThemeProvider>
  );
}
