import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Button, Container, Card, Row, Col } from "react-bootstrap";

const Home: NextPage = ({ posts }: any) => {
  if(!posts.length) return <h2>Loading...</h2>
  return (
    <Container fluid className={styles.container}>
      <Row xl={4} md={3} sm={2} xs={1} className="gy-4">
        {posts.map((_ : any) => (
          <Col key={_.id}>
            <Card>
              <Card.Body>
                <Card.Title>{_.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>{_.body}</Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

// export const getServerSideProps = async (context: any) => {
//   const session = await getSession({ req: context.req });
//   console.log("CHECKING SERVER SIDE SESSION", session);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };
//   }

//   return { props: { session } };
// };

export const getStaticProps = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    ).then((res) => res.json());
    // console.log(response)
    // throw new Error("b")
    return {
      props: { posts: response },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Home;
