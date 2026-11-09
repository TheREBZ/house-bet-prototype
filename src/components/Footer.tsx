import { siInstagram, siFacebook, siYoutube } from "simple-icons/icons"
import "../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <img src="/logo/housebets-wave-logo.svg" alt="Housebets" />
          <p>
            Your home for sports, live scores and the action you love.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Sports</h3>
            <a href="#">Football</a>
            <a href="#">Basketball</a>
            <a href="#">Tennis</a>
            <a href="#">Esports</a>
          </div>

          <div className="footer-column">
            <h3>Housebets</h3>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Promotions</a>
            <a href="#">Help Centre</a>
          </div>

          <div className="footer-column">
            <h3>Information</h3>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Responsible Gambling</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Housebets. All rights reserved.</span>

        <div className="footer-socials">
            <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d={siInstagram.path} />
                </svg>
            </a>

            <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d={siFacebook.path} />
                </svg>
            </a>

            <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d={siYoutube.path} />
                </svg>
            </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer