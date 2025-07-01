import "@/styles/globals.css";
import LayoutsAdmin from "../../layouts/LayoutsAdmin";
import { AuthProvider } from "@/Context/AuthContext";
import LayoutAuth from "../../layouts/LayoutAuth";

const layouts = {
  admin: LayoutsAdmin,
  auth: LayoutAuth,
};

export default function App({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || ((children) => <> {children} </>);
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
