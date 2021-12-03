import { Container } from "@material-ui/core";
import FeaturedCategories from "components/home/featuredCategories";
import IdeasBlog from "components/home/ideasBlog";
import TopPicks from "components/home/topPicks";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import React from "react";

const Home = () => {
  return (
    <div>
      <Header />
      <Container style={{ paddingTop: 150 }}>
        <TopPicks />
        <FeaturedCategories />
        <IdeasBlog />
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
