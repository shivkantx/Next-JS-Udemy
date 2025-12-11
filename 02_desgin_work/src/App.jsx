import "./App.css";
import Card from "./components/Card";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import { Button } from "./components/ui/button.tsx";

function App() {
  return (
    <>
      <div className="flex flex-col space-y-3 ">
        <Hero />
        <Header />
        <Button> Click me</Button>

        <div className="p-4 flex flex-col h-screen space-y-4">
          <h1 className="text-sky-600 font-semibold bg-gray-400/15 p-4 text-xl rounded-xl text-center">
            Lets make a layout with cards
          </h1>

          {/* Card */}
          <div className="p-2 flex gap-3 flex-wrap">
            <Card
              title={"Python Course"}
              buttonText="Buy at $100/ only"
              description="Learn Python with easy explanations, practical exercises, and beginner-friendly projects. Build strong programming foundations useful for automation, backend development, data science, and AI."
              imageUrl={
                "https://cdn.dribbble.com/userupload/14931549/file/original-e31e94aa1a95ec0d9484e0986070b99e.jpg?resize=752x&vertical=center"
              }
            />

            <Card
              title={"Node-JS Course"}
              buttonText="Buy at $99/ only"
              description="Master backend development using Node.js. Build APIs, work with databases, manage authentication, and create fast, scalable server-side applications through real, practical examples."
              imageUrl={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYd8F6_lR43_eimQ9FXJ_Gk_sru5JjzGdkTw&s"
              }
            />

            <Card
              title={"Django Course"}
              buttonText="Buy at $89/ only"
              description="Learn Django by building real web applications. Understand models, views, templates, authentication, and database operations while developing secure, efficient, and production-ready backend projects."
              imageUrl={
                "https://blog.secureflag.com/assets/images/python-django-feature.png"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
