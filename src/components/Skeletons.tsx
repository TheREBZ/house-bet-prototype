import type { CSSProperties } from "react"
import "../styles/Skeleton.css"

/* ---------- the basic building block ---------- */

type SkeletonProps = {
  width?: number | string
  height?: number | string
  radius?: number | string
  className?: string
  style?: CSSProperties
}

export const Skeleton = ({
  width = "100%",
  height = 14,
  radius,
  className = "",
  style,
}: SkeletonProps) => (
  <span
    className={`skeleton ${className}`}
    style={{ width, height, borderRadius: radius, ...style }}
    aria-hidden="true"
  />
)

/* ---------- league cards (Live, Football, other sports) ---------- */

type LeagueListSkeletonProps = {
  leagues?: number
  rows?: number
}

export const LeagueListSkeleton = ({
  leagues = 3,
  rows = 3,
}: LeagueListSkeletonProps) => (
  <div
    className="live-leagues"
    role="status"
    aria-busy="true"
    aria-label="Loading matches"
  >
    {Array.from({ length: leagues }, (_, i) => (
      <section className="league-card" key={i}>
        <header className="league-header live-grid">
          <div className="league-title">
            <Skeleton width={16} height={16} radius="50%" />
            <Skeleton width={130} height={14} />
          </div>
          <span />
          <div className="skeleton-more skeleton-right">
            <Skeleton width={64} height={12} />
          </div>
        </header>

        {Array.from({ length: rows }, (_, r) => (
          <div className="live-row live-grid" key={r}>
            <div className="live-status">
              <Skeleton width={40} height={16} />
              <Skeleton width={28} height={10} />
            </div>

            <div className="live-teams">
              <div className="live-team">
                <Skeleton width={18} height={18} radius="50%" />
                <Skeleton width={110} height={12} />
              </div>
              <div className="live-team">
                <Skeleton width={18} height={18} radius="50%" />
                <Skeleton width={90} height={12} />
              </div>
            </div>

            <div />

            <div
              className="live-odds"
              style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
            >
              {[0, 1, 2].map((n) => (
                <Skeleton key={n} height={46} radius={6} />
              ))}
            </div>

            <div className="skeleton-more skeleton-right">
              <Skeleton width={36} height={12} />
            </div>
          </div>
        ))}
      </section>
    ))}
  </div>
)

/* ---------- Home ---------- */

export const HomeSkeleton = () => (
  <div className="home-page" role="status" aria-busy="true" aria-label="Loading">
    <Skeleton height={46} radius={10} style={{ margin: "18px 0 10px" }} />

    <div className="skeleton-pill-row">
      {Array.from({ length: 7 }, (_, i) => (
        <Skeleton key={i} width={i === 0 ? 96 : 84} height={38} radius={10} />
      ))}
    </div>

    <div className="home-content">
      {/* favourites */}
      <section className="home-section">
        <div className="section-heading">
          <Skeleton width={110} height={18} />
          <Skeleton width={36} height={12} />
        </div>
        <div className="favourite-list">
          {[0, 1, 2, 3].map((n) => (
            <div className="favourite-item" key={n}>
              <Skeleton width={38} height={38} radius="50%" />
              <div className="skeleton-stack" style={{ flex: 1 }}>
                <Skeleton width="60%" height={12} />
                <Skeleton width="40%" height={10} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* your matches */}
      <section className="home-section">
        <div className="section-heading">
          <Skeleton width={120} height={18} />
          <Skeleton width={50} height={12} />
        </div>
        <div className="your-matches-list">
          {[0, 1, 2].map((n) => (
            <div className="your-match-item" key={n}>
              <div className="skeleton-stack">
                <Skeleton width={90} height={10} />
                <Skeleton width={60} height={10} />
              </div>
              <div className="skeleton-stack">
                <Skeleton width={110} height={12} />
                <Skeleton width={90} height={12} />
              </div>
              <Skeleton width={50} height={14} />
            </div>
          ))}
        </div>
      </section>

      {/* featured matches */}
      <section className="home-section">
        <div className="section-heading">
          <Skeleton width={150} height={18} />
          <Skeleton width={50} height={12} />
        </div>
        <div className="featured-matches">
          {[0, 1, 2].map((n) => (
            <article className="match-card" key={n}>
              <div className="match-card-header">
                <Skeleton width={90} height={10} />
                <Skeleton width={70} height={10} />
              </div>
              <div className="match-card-body">
                <div className="skeleton-stack">
                  <Skeleton width={110} height={12} />
                  <Skeleton width={90} height={12} />
                </div>
                <div className="skeleton-odds-row">
                  {[0, 1, 2].map((o) => (
                    <Skeleton key={o} height={40} radius={6} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* upcoming events */}
      <section className="home-section">
        <div className="section-heading">
          <Skeleton width={140} height={18} />
          <Skeleton width={50} height={12} />
        </div>
        <div className="upcoming-matches">
          {[0, 1].map((n) => (
            <div className="upcoming-match" key={n}>
              <div className="skeleton-stack">
                <Skeleton width={80} height={10} />
                <Skeleton width={60} height={10} />
              </div>
              <Skeleton width={110} height={12} />
              <Skeleton width={90} height={12} />
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
)

/* ---------- Match page ---------- */

export const MatchPageSkeleton = () => (
  <div
    className="match-page"
    role="status"
    aria-busy="true"
    aria-label="Loading match"
  >
    <div className="skeleton-pill-row" style={{ marginTop: 0 }}>
      <Skeleton width={40} height={40} radius={10} />
      {[0, 1, 2].map((n) => (
        <Skeleton key={n} width={110} height={40} radius={10} />
      ))}
    </div>

    <div className="skeleton-hero">
      <div className="skeleton-team">
        <Skeleton width={56} height={56} radius="50%" />
        <Skeleton width={120} height={16} />
      </div>

      <div className="skeleton-stack skeleton-center">
        <Skeleton width={90} height={12} />
        <Skeleton width={110} height={34} />
        <Skeleton width={60} height={12} />
      </div>

      <div className="skeleton-team">
        <Skeleton width={120} height={16} />
        <Skeleton width={56} height={56} radius="50%" />
      </div>
    </div>

    <Skeleton height={46} radius={10} style={{ margin: "16px 0 0" }} />

    <div className="skeleton-pill-row">
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} width={96} height={36} radius={10} />
      ))}
    </div>

    {[0, 1, 2].map((n) => (
      <div className="skeleton-market" key={n}>
        <Skeleton width={140} height={14} />
        <div className="skeleton-odds-row">
          {[0, 1, 2].map((o) => (
            <Skeleton key={o} height={46} radius={6} />
          ))}
        </div>
      </div>
    ))}
  </div>
)