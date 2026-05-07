import NavigationPage from "@/components/navigation";

function AboutLayout({ children }) {
  return (
    <div>
      <NavigationPage />
      {children}
    </div>
  );
}

export default AboutLayout;
