import React from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `Blog ${slug}`,
    description: `This is a blog page`,
  };
}

async function Blog({ params }) {
  const { slug } = await params;
  return <div>Blog {slug}</div>;
}

export default Blog;
