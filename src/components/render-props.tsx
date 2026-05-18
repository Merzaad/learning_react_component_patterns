import { useState } from "react"

interface MousePosition {
  x: number
  y: number
  relativeX: number
  relativeY: number
  pageX: number
  pageY: number
}

interface MouseTrackerProps {
  children: (position: MousePosition) => React.ReactNode
}

const RenderProps = ({ children }: MouseTrackerProps) => {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    relativeX: 0,
    relativeY: 0,
    pageX: 0,
    pageY: 0,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      relativeX: ((e.clientX - rect.left) / rect.width) * 100,
      relativeY: ((e.clientY - rect.top) / rect.height) * 100,
      pageX: e.pageX,
      pageY: e.pageY,
    })
  }

  return (
    <div
      style={{
        position: "relative",
        maxWidth: "600px",
        margin: "3rem auto 0",
        padding: "3rem",
        backgroundColor: "#f9fafb",
        borderRadius: "0.5rem",
        border: "1px solid #e5e7eb",
        cursor: "crosshair",
      }}
      onMouseMove={handleMouseMove}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: position.y,
          height: "1px",
          backgroundColor: "#ef4444",
          pointerEvents: "none",
          zIndex: 20,
          boxShadow: "0 0 2px rgba(0,0,0,0.5)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: position.x,
          width: "1px",
          backgroundColor: "#ef4444",
          pointerEvents: "none",
          zIndex: 20,
          boxShadow: "0 0 2px rgba(0,0,0,0.5)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: -30,
          left: position.x,
          transform: "translateX(-50%)",
          backgroundColor: "#1f2937",
          color: "white",
          padding: "2px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          fontFamily: "monospace",
          pointerEvents: "none",
          zIndex: 30,
          whiteSpace: "nowrap",
        }}
      >
        X: {Math.round(position.x)}px
      </div>

      <div
        style={{
          position: "absolute",
          left: -80,
          top: position.y,
          transform: "translateY(-50%)",
          backgroundColor: "#1f2937",
          color: "white",
          padding: "2px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          fontFamily: "monospace",
          pointerEvents: "none",
          zIndex: 30,
          whiteSpace: "nowrap",
        }}
      >
        Y: {Math.round(position.y)}px
      </div>

      <div
        style={{
          position: "absolute",
          bottom: -25,
          right: 0,
          fontSize: "11px",
          fontFamily: "monospace",
          color: "#6b7280",
          pointerEvents: "none",
        }}
      >
        {Math.round(position.relativeX)}% / {Math.round(position.relativeY)}%
      </div>

      {children(position)}
    </div>
  )
}

export default function RulerApp() {
  return (
    <RenderProps>
      {({ x, y, relativeX, relativeY, pageX, pageY }: MousePosition) => (
        <div style={{ position: "relative", zIndex: 5 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "1rem",
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
              }}
            >
              <strong>Container</strong>
              <div>X: {Math.round(x)}px</div>
              <div>Y: {Math.round(y)}px</div>
            </div>

            <div
              style={{
                background: "white",
                padding: "1rem",
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
              }}
            >
              <strong>Page</strong>
              <div>X: {pageX}px</div>
              <div>Y: {pageY}px</div>
            </div>
          </div>
        </div>
      )}
    </RenderProps>
  )
}
