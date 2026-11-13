import { useState } from "react"

type TeamBadgeProps = {
  src?: string
  name: string
}

const TeamBadge = ({ src, name }: TeamBadgeProps) => {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <span className="team-badge team-badge-fallback" aria-hidden="true">
        {name.charAt(0)}
      </span>
    )
  }

  return (
    <img
      className="team-badge"
      src={src}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default TeamBadge