function postData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Post Data fetched");
    }, 2000);
  });
}

function commentData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Comment Data fetched");
    }, 3000);
  });
}

async function getBlogData() {
  try {
    console.log("Fetching Blog data...");

    // const userPostData = await postData();
    // const userCommentData = await CommentData();

    const [userPostData, userCommentData] = await Promise.all([
      postData(),
      commentData(),
    ]);

    console.log(userPostData);
    console.log(userCommentData);

    console.log("Blog data fetched successfully");
  } catch (error) {
    console.log("Error fetching blog data");
    console.log(error);
  }
}

getBlogData();
