export function smoothScrollTo(targetPosition: number, duration = 1000) {
  // Get the current scroll position
  const startPosition = window.scrollY
  // Calculate the distance to scroll
  const distance = targetPosition - startPosition

  // Use a responsive easing function
  const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

  let startTime: number | null = null

  // Animation function
  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const easedProgress = easeInOutQuad(progress)

    window.scrollTo(0, startPosition + distance * easedProgress)

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    }
  }

  // Start the animation
  requestAnimationFrame(animation)
}
