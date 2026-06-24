// Ambient leaf particles drifting up through the hero background. Generated
// once at module load (not per render) so positions stay stable across
// re-renders triggered by the stat count-up animation.
function makeLeaves(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 8 + Math.random() * 10,
    duration: 14 + Math.random() * 10,
    delay: Math.random() * -20,
    drift: (Math.random() - 0.5) * 60,
    opacity: 0.12 + Math.random() * 0.18,
  }))
}

const LEAVES = makeLeaves(14)

export default function HeroParticles() {
  return (
    <div className="hero-particles" aria-hidden="true">
      {LEAVES.map((leaf) => (
        <span
          key={leaf.id}
          className="leaf-particle"
          style={{
            left: `${leaf.left}%`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            '--drift': `${leaf.drift}px`,
            '--leaf-opacity': leaf.opacity,
          }}
        />
      ))}
    </div>
  )
}
