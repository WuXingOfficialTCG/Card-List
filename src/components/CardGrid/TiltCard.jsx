export default function TiltCard({ src, alt, className, onClick, draggable, onDragStart, style }) {
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;

    setTiltStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
      transition: 'transform 0.1s ease',
    });
  };

  const resetTilt = () => {
    setTiltStyle({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.3s ease',
    });
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ ...style, ...tiltStyle }} // 🔥 FONDAMENTALE!
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      draggable={draggable}
      onDragStart={onDragStart}
      onClick={onClick}
    />
  );
}
