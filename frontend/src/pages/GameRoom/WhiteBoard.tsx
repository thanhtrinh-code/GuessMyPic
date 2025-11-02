import React, { useEffect, useRef } from 'react'
import ColorPallete from './ColorPallete';

interface WhiteBoardProps {
  wsRef: React.RefObject<WebSocket | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  ctxRef: React.RefObject<CanvasRenderingContext2D | null>;
}
export default function WhiteBoard({
  wsRef,
  canvasRef,
  ctxRef
}: WhiteBoardProps) {
    const [isDrawing, setIsDrawing] = React.useState(false);
    const [currentColor, setCurrentColor] = React.useState('black');
    const lastXRef = useRef<number | null>(null);
    const lastYRef = useRef<number | null>(null);
    useEffect(() => {

      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = 800;
      canvas.height = 600;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      ctxRef.current = ctx;


    }, []);
  const startDrawing = (e: React.MouseEvent) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    lastXRef.current = e.nativeEvent.offsetX;
    lastYRef.current = e.nativeEvent.offsetY;
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    const ctx = ctxRef.current;
    if (!ctx || !isDrawing || lastXRef.current === null || lastYRef.current === null) return;

    const currX = e.nativeEvent.offsetX;
    const currY = e.nativeEvent.offsetY;

    ctx.beginPath();
    ctx.moveTo(lastXRef.current, lastYRef.current);
    ctx.strokeStyle = currentColor;
    ctx.lineTo(currX, currY);
    ctx.stroke();

    // Send drawing data over WebSocket
    wsRef.current?.send(JSON.stringify({
      type: 'broadcast_everyone_except',
      data: {
        type: 'draw',
        prevX: lastXRef.current,
        prevY: lastYRef.current,
        currX: currX,
        currY: currY,
        color: currentColor,
        lineWidth: ctx.lineWidth
    }}));

    lastXRef.current = currX;
    lastYRef.current = currY;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  function handleClear() {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    wsRef.current?.send(JSON.stringify({
      type: 'broadcast_everyone_except',
      data: {
        type: 'clear',
      }
      }
    ))
  }
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-gray-100">
      <div className="bg-gray-300 rounded-xl border-2 border-dashed border-gray-300 aspect-video flex items-center justify-center hover:border-purple-400 transition-colors duration-300">
        <div className="">
          <canvas
            ref={canvasRef}
            className="bg-white rounded-lg shadow-inner cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          >
          </canvas>
        </div>
      </div>
      <div className="flex gap-3 mt-4 justify-center">
        <button className="bg-linear-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg"
          onClick={handleClear}
        >
          Clear Canvas
        </button>
      </div>
      <ColorPallete setCurrentColor={setCurrentColor} currentColor={currentColor} />
    </div>
  );
}
