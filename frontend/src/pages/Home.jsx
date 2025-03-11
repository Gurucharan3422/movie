import "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* ✅ Background Video */}
      <video autoPlay loop muted className="home-video">
        <source src="https://www.videvo.net/videvo_files/converted/2016_10/preview/160828_05_London_4k_003.mp4" type="video/mp4" />
      </video>

      {/* ✅ Hero Section - Netflix Style */}
      <div className="hero-section">
        <h1>Unlimited movies, TV shows, and more</h1>
        <p>Starts at ₹149. Cancel anytime.</p>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        <div className="email-signup">
          <input type="email" placeholder="Enter your email" />
          <button>Get Started</button>
        </div>
      </div>

      {/* ✅ Trending Now Section */}
      <div className="trending-now">
        <h2>Trending Now</h2>
        <div className="trending-slider">
          <img src="https://m.economictimes.com/thumb/msid-114885613,width-1200,height-900,resizemode-4,imgsize-1882225/squid-game-season-2.jpg" alt="Squid Game" />
          <img src="https://m.media-amazon.com/images/I/91KkWf50SoL._AC_SY679_.jpg" alt="Venom: The Last Dance" />
          <img src="https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg" alt="Pushpa 2" />
          <img src="https://upload.wikimedia.org/wikipedia/en/e/e4/Bhool_Bhulaiyaa_3_poster.jpg" alt="Bhool Bhulaiyaa 3" />
          <img src="https://upload.wikimedia.org/wikipedia/en/6/6c/Lucky_Baskhar_film_poster.jpg" alt="Lucky Baskhar" />
        </div>
      </div>

      {/* ✅ More Reasons to Join */}
      <div className="features-section">
        <div className="feature">
          <h3>Enjoy on your TV</h3>
          <p>Watch on smart TVs, PlayStation, Xbox, Apple TV, and more.</p>
        </div>
        <div className="feature">
          <h3>Download to watch offline</h3>
          <p>Save your favorites easily and always have something to watch.</p>
        </div>
        <div className="feature">
          <h3>Watch everywhere</h3>
          <p>Stream unlimited movies and TV shows on multiple devices.</p>
        </div>
        <div className="feature">
          <h3>Create profiles for kids</h3>
          <p>Let kids explore in a safe space with their favorite characters.</p>
        </div>
      </div>

      {/* ✅ FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq">
          <p>What is MovieApp?</p>
          <p>How much does MovieApp cost?</p>
          <p>Where can I watch?</p>
          <p>How do I cancel?</p>
          <p>Is MovieApp good for kids?</p>
        </div>
      </div>

      {/* ✅ Preserved Footer */}
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} MovieApp. All rights reserved.</p>
        <div>
          <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms-of-use">Terms of Use</Link> | <Link to="/help-center">Help Center</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
