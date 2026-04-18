import '../../styles/layout.css';

export function FourQuadrantLayout({ 
  topLeft, 
  topRight, 
  bottomLeft, 
  bottomRight 
}) {
  return (
    <div className="quadrant-layout">
      <div className="quadrant">{topLeft}</div>
      <div className="quadrant">{topRight}</div>
      <div className="quadrant">{bottomLeft}</div>
      <div className="quadrant">{bottomRight}</div>

      {/* Divisore a croce futuristico */}
      <div className="cross-divider"></div>
    </div>
  );
}
