/**
 * Canvas Utilities — High-level helpers for visualization canvases
 */

export interface CanvasContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dpr: number;
  width: number;   // CSS width
  height: number;  // CSS height
}

/** Create a canvas that fills its container, handles DPR and resize */
export function createCanvasContext(
  container: HTMLElement,
  options: {
    aspectRatio?: number;  // width / height
    dpr?: number;          // device pixel ratio (max 2)
    className?: string;
  } = {}
): CanvasContext {
  const { aspectRatio = 1, dpr: maxDpr = 2, className = 'ml-canvas' } = options;
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

  const canvas = document.createElement('canvas');
  canvas.className = className;

  const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })!;

  const resize = () => {
    const rect = container.getBoundingClientRect();
    const cssWidth = rect.width;
    const cssHeight = aspectRatio ? cssWidth / aspectRatio : rect.height;

    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  container.appendChild(canvas);
  resize();

  // Expose cleanup
  (canvas as any)._cleanup = () => {
    ro.disconnect();
    canvas.remove();
  };

  return { canvas, ctx, dpr, width: canvas.width / dpr, height: canvas.height / dpr };
}

/** Clear canvas with optional background */
export function clearCanvas(ctx: CanvasRenderingContext2D, width: number, height: number, bg?: string): void {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (bg) {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
  } else {
    ctx.clearRect(0, 0, width, height);
  }
  ctx.restore();
}

/** Draw circle */
export function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  options: {
    fill?: string;
    stroke?: string;
    lineWidth?: number;
    lineDash?: number[];
  } = {}
): void {
  const { fill, stroke, lineWidth = 1, lineDash } = options;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);

  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }

  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    if (lineDash) ctx.setLineDash(lineDash);
    ctx.stroke();
    if (lineDash) ctx.setLineDash([]);
  }
}

/** Draw rectangle */
export function drawRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  options: {
    fill?: string;
    stroke?: string;
    lineWidth?: number;
    radius?: number; // border radius
  } = {}
): void {
  const { fill, stroke, lineWidth = 1, radius = 0 } = options;

  ctx.beginPath();
  if (radius > 0) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.roundRect(x, y, width, height, r);
  } else {
    ctx.rect(x, y, width, height);
  }

  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }

  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

/** Draw line */
export function drawLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  options: {
    stroke?: string;
    lineWidth?: number;
    lineCap?: CanvasLineCap;
    lineDash?: number[];
    lineDashOffset?: number;
  } = {}
): void {
  const { stroke = '#000', lineWidth = 1, lineCap = 'butt', lineDash, lineDashOffset = 0 } = options;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = lineCap;
  if (lineDash) {
    ctx.setLineDash(lineDash);
    ctx.lineDashOffset = lineDashOffset;
  }
  ctx.stroke();
  if (lineDash) ctx.setLineDash([]);
}

/** Draw arrow */
export function drawArrow(
  ctx: CanvasRenderingContext2D,
  from: { x: number; y: number },
  to: { x: number; y: number },
  options: {
    stroke?: string;
    lineWidth?: number;
    headSize?: number;
    headAngle?: number; // radians
  } = {}
): void {
  const { stroke = '#000', lineWidth = 2, headSize = 10, headAngle = Math.PI / 6 } = options;

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);

  // Line
  drawLine(ctx, from.x, from.y, to.x, to.y, { stroke, lineWidth });

  // Arrowhead
  ctx.beginPath();
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(
    to.x - headSize * Math.cos(angle - headAngle),
    to.y - headSize * Math.sin(angle - headAngle)
  );
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(
    to.x - headSize * Math.cos(angle + headAngle),
    to.y - headSize * Math.sin(angle + headAngle)
  );
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
}

/** Draw text with background (for labels) */
export function drawLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  options: {
    font?: string;
    fill?: string;
    background?: string;
    padding?: number;
    align?: CanvasTextAlign;
    baseline?: CanvasTextBaseline;
    borderRadius?: number;
  } = {}
): void {
  const {
    font = '12px var(--font-sans)',
    fill = '#000',
    background,
    padding = 4,
    align = 'center',
    baseline = 'middle',
    borderRadius = 4,
  } = options;

  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;

  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent || 16;

  const boxX = x - (align === 'center' ? textWidth / 2 : align === 'right' ? textWidth : 0) - padding;
  const boxY = y - (baseline === 'middle' ? textHeight / 2 : baseline === 'bottom' ? textHeight : 0) - padding;
  const boxW = textWidth + padding * 2;
  const boxH = textHeight + padding * 2;

  if (background) {
    ctx.fillStyle = background;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, borderRadius);
    ctx.fill();
  }

  ctx.fillStyle = fill;
  ctx.fillText(text, x, y);
}

/** Draw diamond (for centroids) */
export function drawDiamond(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  options: {
    fill?: string;
    stroke?: string;
    lineWidth?: number;
    rotation?: number;
  } = {}
): void {
  const { fill, stroke, lineWidth = 2, rotation = 0 } = options;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  const half = size / 2;
  ctx.beginPath();
  ctx.moveTo(0, -half);   // top
  ctx.lineTo(half, 0);    // right
  ctx.lineTo(0, half);    // bottom
  ctx.lineTo(-half, 0);   // left
  ctx.closePath();

  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  ctx.restore();
}

/** Draw triangle (for direction indicators) */
export function drawTriangle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  direction: 'up' | 'down' | 'left' | 'right',
  options: {
    fill?: string;
    stroke?: string;
    lineWidth?: number;
  } = {}
): void {
  const { fill, stroke, lineWidth = 1 } = options;
  const half = size / 2;

  ctx.beginPath();
  switch (direction) {
    case 'up':
      ctx.moveTo(x, y - half);
      ctx.lineTo(x - half, y + half);
      ctx.lineTo(x + half, y + half);
      break;
    case 'down':
      ctx.moveTo(x, y + half);
      ctx.lineTo(x + half, y - half);
      ctx.lineTo(x - half, y - half);
      break;
    case 'left':
      ctx.moveTo(x - half, y);
      ctx.lineTo(x + half, y - half);
      ctx.lineTo(x + half, y + half);
      break;
    case 'right':
      ctx.moveTo(x + half, y);
      ctx.lineTo(x - half, y + half);
      ctx.lineTo(x - half, y - half);
      break;
  }
  ctx.closePath();

  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

/** Draw grid */
export function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cellSize: number,
  options: {
    stroke?: string;
    lineWidth?: number;
    majorEvery?: number; // major line every N cells
    majorStroke?: string;
    majorLineWidth?: number;
  } = {}
): void {
  const {
    stroke = '#e2e8f0',
    lineWidth = 1,
    majorEvery = 5,
    majorStroke = '#cbd5e1',
    majorLineWidth = 1,
  } = options;

  // Minor lines
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  for (let x = 0; x <= width; x += cellSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y <= height; y += cellSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();

  // Major lines
  if (majorEvery > 0) {
    ctx.strokeStyle = majorStroke;
    ctx.lineWidth = majorLineWidth;
    ctx.beginPath();
    for (let x = 0; x <= width; x += cellSize * majorEvery) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += cellSize * majorEvery) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }
}

/** Download canvas as PNG */
export function downloadCanvas(canvas: HTMLCanvasElement, filename = 'canvas.png'): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

/** Get pixel data at point (accounting for DPR) */
export function getPixel(ctx: CanvasRenderingContext2D, x: number, y: number, dpr: number): ImageData {
  return ctx.getImageData(x * dpr, y * dpr, 1, 1);
}

/** Hit test circle */
export function hitTestCircle(px: number, py: number, cx: number, cy: number, radius: number): boolean {
  const dx = px - cx;
  const dy = py - cy;
  return dx * dx + dy * dy <= radius * radius;
}

/** Hit test rectangle */
export function hitTestRect(px: number, py: number, x: number, y: number, width: number, height: number): boolean {
  return px >= x && px <= x + width && py >= y && py <= y + height;
}

/** Hit test polygon (ray casting) */
export function hitTestPolygon(px: number, py: number, vertices: Array<{ x: number; y: number }>): boolean {
  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i].x, yi = vertices[i].y;
    const xj = vertices[j].x, yj = vertices[j].y;
    const intersect = ((yi > py) !== (yj > py)) &&
      (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

/** Convert canvas coordinates to data coordinates */
export function canvasToData(
  canvasX: number,
  canvasY: number,
  canvasWidth: number,
  canvasHeight: number,
  dataXMin: number,
  dataXMax: number,
  dataYMin: number,
  dataYMax: number
): { x: number; y: number } {
  return {
    x: dataXMin + (canvasX / canvasWidth) * (dataXMax - dataXMin),
    y: dataYMax - (canvasY / canvasHeight) * (dataYMax - dataYMin), // Y inverted
  };
}

/** Convert data coordinates to canvas coordinates */
export function dataToCanvas(
  dataX: number,
  dataY: number,
  canvasWidth: number,
  canvasHeight: number,
  dataXMin: number,
  dataXMax: number,
  dataYMin: number,
  dataYMax: number
): { x: number; y: number } {
  return {
    x: ((dataX - dataXMin) / (dataXMax - dataXMin)) * canvasWidth,
    y: ((dataYMax - dataY) / (dataYMax - dataYMin)) * canvasHeight, // Y inverted
  };
}