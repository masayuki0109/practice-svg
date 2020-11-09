import {useState, useEffect, useRef} from 'react'

export const SVGComponent = () => {
  const [x, setX] = useState(50); 
  const [y, setY] = useState(50); 
  const [timeId, setTimerId] = useState()
  const svgRef = useRef(null)
   
  const [isMouseDown, setIsMouseDown] = useState(false)
    
  // マウス押下時
  const onMouseDown = (e) => {
      setIsMouseDown(true);
  }

  // マウス押下解除時
  const onMouseUp = (e) => {
    setIsMouseDown(false);
  };
  // マウス移動時
  const onMouseMove = (e) => {
    // マウス押下中
    if (isMouseDown) {
      const mouseX = e.pageX;
      const mouseY = e.pageY;

      const svgRect = svgRef.current.getBoundingClientRect();
      const relativeX = mouseX - svgRect.left;
      const relativeY = mouseY - svgRect.top;
      setX(relativeX);
      setY(relativeY);
    }
  };


  useEffect(() => {
    const id = setInterval(() => {
      setX(x => x + 5)
    }, 100)
    setTimerId(id)
    return () => clearInterval(id)
  },[])

  // 1000で止める
  useEffect(() => {
    if (x > 1000) clearInterval(timeId)
  }, [x] )

  return (
    <svg
      version="1.1"
      width="1240"
      height="1754"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
    >
      <circle
        cx={x}
        cy={y}
        r="25"
        stroke="blue"
        fill="blue"
        stroke-width="5"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />
    </svg>
  );
}