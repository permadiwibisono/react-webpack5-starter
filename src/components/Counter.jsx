import { useState } from "react"

const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <main>
        <section>Counter: {count}</section>
        <div>
          <button onClick={() => setCount((count) => count + 1)}>+ Increase</button>
          <button onClick={() => setCount((count) => count - 1)}>- Decrease</button>
        </div>
      </main>
    </>
  )
}

export default Counter;