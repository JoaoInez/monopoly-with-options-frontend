import Meta from "../meta";
import styles from "./Layout.module.scss";

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Meta />
      <main className={styles.layout}>{children}</main>
    </>
  );
};

export default Layout;
