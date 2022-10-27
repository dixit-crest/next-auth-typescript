import React from "react";
import Card from "react-bootstrap/Card";

const PostDetail = (props: any) => {
  const { post: _ } = props;
  if (!_) return <h2>Loading...</h2>;

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-capitalize">{_.title}</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
        <Card.Text style={{ whiteSpace: "pre-line" }}>{_.body}</Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
};

export const getStaticProps = async (context: any) => {
  try {

    // we can retrive data directly from databse to avoid
    // calling extra api call
    const id = context.params.id + "";
    const post = await fetch(
      "https://jsonplaceholder.typicode.com/posts/" + id
    ).then((_: any) => _.json());
    console.log(post);
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
  };
};
export default PostDetail;
