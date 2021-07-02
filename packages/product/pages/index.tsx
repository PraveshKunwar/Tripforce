import { GetServerSideProps, NextPage } from "next";

interface Props {
  thing: Promise<any>;
}

const MainPage: NextPage<Props> = ({ thing }: Props): JSX.Element => {
  return <div className="test">Hello world!</div>;
};

const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await fetch("/api/test");
  const thing = await data.json();
  return {
    props: {
      thing,
    },
  };
};

export default MainPage;
