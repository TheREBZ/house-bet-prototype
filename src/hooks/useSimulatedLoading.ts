import { useEffect, useState } from "react"

// simulated delayed loading
export const useSimulatedLoading = (key = "default", delay = 600) => {
  const [loadedKey, setLoadedKey] = useState<string | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoadedKey(key), delay)
    return () => window.clearTimeout(timer)
  }, [key, delay])

  return loadedKey !== key
}