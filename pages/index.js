import Seo from "components/shared/Seo";
import { useMemo } from "react";

const Home = () => {
  const seo = useMemo(() => ({
    meta_title: `Dxclan`,
    meta_description: `Dxclan`,
  }));
  return (
    <>
      <Seo seo={seo} />
      <h1>Home</h1>
    </>
  );
};
export default Home;
