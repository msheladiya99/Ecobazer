import { Poster, Categories, Products, Features, Footer, NewsSection } from "../Components";

const Home = () => {
  return (
    <div className="flex flex-col justify-between items-center w-full">
      <div className="flex flex-col justify-between items-center w-full px-6 lg:px-20">
        <Poster />
        <Features />
        <Categories />
        <Products />
        <NewsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
