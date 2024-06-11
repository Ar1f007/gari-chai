type Props = {
  params: {
    slug: string;
  };
};

const SingleCarPartPage = ({ params: { slug } }: Props) => {
  return <div>SingleCarPartPage {slug}</div>;
};
export default SingleCarPartPage;
