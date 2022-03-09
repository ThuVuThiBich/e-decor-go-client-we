import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "redux/blogRedux";
import post1 from "./blog-post.1.md";
import post2 from "./blog-post.2.md";
import post3 from "./blog-post.3.md";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import MainFeaturedPost from "./MainFeaturedPost";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
}));

export const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
];

const mainFeaturedPost = {
  title: "E-Decor Blog",
  description:
    "Where you find inspirations and ideas through what's most interesting in post's contents.",
  image:
    "https://i.pinimg.com/564x/68/7e/be/687ebed47faa6963896c628b836046cc.jpg",
  imgText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image:
      "https://i.pinimg.com/564x/68/7e/be/687ebed47faa6963896c628b836046cc.jpg",
    imageText: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image:
      "https://i.pinimg.com/564x/68/7e/be/687ebed47faa6963896c628b836046cc.jpg",
    imageText: "Image Text",
  },
];

export const posts = [post1, post2, post3];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    { name: "Instagram", icon: InstagramIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

export default function Blog() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Blog");
    dispatch(getPosts({ page: 1, limit: 5 }));
  }, [dispatch]);
  return (
    <>
      <Container maxWidth="lg" style={{ paddingTop: 100 }}>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts?.map((post, index) => (
              <FeaturedPost key={index} post={post} />
            ))}
          </Grid>
          <Grid container spacing={3} className={classes.mainGrid}>
            <Main title="Decor Posts" posts={posts} />

            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
    </>
  );
}
