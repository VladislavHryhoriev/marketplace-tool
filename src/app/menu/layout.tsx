import Container from "@/components/shared/container";
import { Tabs } from "@/components/shared/tabs";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container className="mt-4">
      <Tabs />
      <div>{children}</div>
      <ToastContainer
        hideProgressBar
        theme="dark"
        position="bottom-right"
        closeOnClick
        pauseOnFocusLoss={false}
      />
    </Container>
  );
};

export default Layout;
