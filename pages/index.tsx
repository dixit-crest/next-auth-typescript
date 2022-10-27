import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return <div className={styles.container}>This is home page</div>;
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession({ req: context.req });
  console.log("CHECKING SERVER SIDE SESSION", session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return { props: { session } };
};

export default Home;
