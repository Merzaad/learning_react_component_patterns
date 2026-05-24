import React, { lazy, Suspense, useState } from "react"

interface HeavyComponentProps {
  count: number
}

const HeavyComponent = lazy<React.ComponentType<HeavyComponentProps>>(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        default: ({ count }: HeavyComponentProps) => (
          <div
            style={{
              padding: "20px",
              background: "#f0f0f0",
              marginTop: "20px",
              borderRadius: " 8px",
              maxWidth: "600px",
              margin: "auto",
            }}
          >
            <h3>Heavy Component Loaded!</h3>
            <p>This component was lazy loaded. Count from parent: {count}</p>
          </div>
        ),
      })
    }, 1500)
  })
})

const LazyLoading: React.FC = () => {
  const [showHeavy, setShowHeavy] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setCount((c) => c + 1)}
          style={{ marginRight: "10px" }}
        >
          Increment Count ({count})
        </button>

        <button
          onClick={() => setShowHeavy(!showHeavy)}
          style={{
            background: showHeavy ? "#ff4444" : "#4CAF50",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          {showHeavy ? "Hide" : "Load"} Heavy Component
        </button>
      </div>

      {showHeavy && (
        <Suspense
          fallback={
            <div
              style={{
                padding: "20px",
                background: "#ffffcc",
                marginTop: "20px",
                textAlign: "center",
                borderRadius: " 8px",
                maxWidth: "600px",
                margin: "auto",
              }}
            >
              Loading heavy component...
            </div>
          }
        >
          <HeavyComponent count={count} />
        </Suspense>
      )}
    </div>
  )
}

export default LazyLoading
