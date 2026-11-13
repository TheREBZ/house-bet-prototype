import { Link } from "react-router-dom"
import { ArrowUp, ChevronDown } from "lucide-react"
import { siX, siTelegram } from "simple-icons/icons"
import "../styles/Footer.css"

type FooterColumn = {
  title: string
  links: string[]
}

const columns: FooterColumn[] = [
  {
    title: "Play",
    links: [
      "Casino Home",
      "House Games",
      "Slots",
      "Live Casino",
      "Sportsbook",
      "Live Sports",
      "Sportsbook Rules",
    ],
  },
  {
    title: "Rewards",
    links: ["Rewards", "How Rewards Work", "Promotions", "Bonus Terms"],
  },
  {
    title: "Payments",
    links: [
      "How to Deposit",
      "How to Withdraw",
      "Coins & Networks",
      "Minimums & Fees",
      "Withdrawal Times",
    ],
  },
  {
    title: "Support",
    links: [
      "Help Center",
      "Provably Fair",
      "Account Verification",
      "Responsible Gambling",
      "Self-Exclusion",
      "Independent Gambling Support",
      "Complaints & Disputes",
    ],
  },
  {
    title: "Housebets",
    links: [
      "About Housebets",
      "Affiliate Program",
      "Affiliate Terms",
      "Community Guidelines",
    ],
  },
  {
    title: "Legal",
    links: [
      "Terms of Service",
      "Privacy Policy",
      "Cookies Policy",
      "KYC & Anti-Money Laundering",
      "Payment Terms",
      "Fairness Policy",
      "All Policies",
    ],
  },
]

// Links that already have a real page; everything else is a placeholder
const routes: Record<string, string> = {
  Sportsbook: "/",
  "Live Sports": "/live",
}

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="site-footer">
      {/* TOP: logo + language */}
      <div className="footer-top">
        <Link to="/" className="footer-logo">
          <img src="/logo/housebets-wave-logo.svg" alt="Housebets" />
        </Link>

        <button className="footer-lang" type="button">
          <img src="https://flagcdn.com/w40/gb.png" alt="" />
          <span>English</span>
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="footer-columns">
        {columns.map((column) => (
          <div className="footer-column" key={column.title}>
            <h3>{column.title}</h3>
            {column.links.map((label) =>
              routes[label] ? (
                <Link key={label} to={routes[label]}>
                  {label}
                </Link>
              ) : (
                <a key={label} href="#">
                  {label}
                </a>
              ),
            )}
          </div>
        ))}
      </div>

      <div className="footer-community">
        <div className="footer-community-left">
          <span className="footer-community-label">Our Community</span>

          <div className="footer-socials">
            <a href="#" className="footer-social" aria-label="X">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d={siX.path} />
              </svg>
            </a>
            <a href="#" className="footer-social" aria-label="Telegram">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d={siTelegram.path} />
              </svg>
            </a>
          </div>

          <a href="mailto:support@housebets.com" className="footer-email">
            support@housebets.com
          </a>
        </div>

        <div className="footer-trust">
          <span className="footer-license">
            <strong>Licensed</strong>
            <small>operator</small>
          </span>
          <span className="footer-gamble">
            Gamble
            <br />
            Responsibly
          </span>
          <span className="footer-age" aria-label="18 plus only">
            18+
          </span>
        </div>
      </div>

      <div className="footer-legal">
        <p>
          Housebets is operated by Example Gaming Ltd. (Reg. No. 000000),
          registered at 1 Placeholder Street. Licensed and regulated under the
          laws of its jurisdiction. Payments may be processed by an affiliated
          payment provider. Please gamble responsibly.
        </p>
        <a href="#" className="footer-cookie">
          Cookie settings
        </a>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <span>© 2026 Housebets. All rights reserved.</span>

        <button className="footer-top-btn" type="button" onClick={scrollToTop}>
          Return to Top
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  )
}

export default Footer