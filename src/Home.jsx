import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import { useAuth } from "./contexts/authContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { userLoggedIn, isDeveloper, isProjectManager } = useAuth();
  console.log("IsLoggedIn:", userLoggedIn);
  console.log("isDeveloper:", isDeveloper);
  console.log("isProjectManager:", isProjectManager);
  if (userLoggedIn) {
    // Redirect the user if already logged in
    if (isDeveloper) {
        return <Navigate to="/home" replace={true} />;
    }
    if (isProjectManager) {
        return <Navigate to="/dashboard" replace={true} />;
    }
}
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <FeatureSection />
        <Workflow />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
};

export default Home;
