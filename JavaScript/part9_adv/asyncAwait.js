function fetchUserData() {
  return new Promise((resolve, reject) => {
    console.log("Fetching user data from server...");

    setTimeout(() => {
      resolve({
        name: "Shiv",
        url: "https://www.udemy.com/course/complete-react-and-nextjs-course-with-ai-powered-projects/learn/lecture/47355679#overview",
      });
    }, 3000);
  });
}

async function getUserData() {
  try {
    console.log("Fetching user data...");
    const userdata = await fetchUserData();
    console.log("User data received:", userdata);
  } catch (error) {
    console.log("Error fetching data");
    console.log(error); // 🔑 always log error
  }
}

getUserData();
