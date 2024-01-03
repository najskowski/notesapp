import { useEffect, useState } from "react";

const useId = (length = 10) => {
  const [id, setId] = useState<string | null>()
  
  const generateId = () => {
    let generatedId = ""
    for(let i = 0; i < length; i++) {
      generatedId += (Math.random() * 10).toString()[0]
    }
    setId(generatedId)
  }

  useEffect(() => {
    generateId()
  }, [])

  return { id, generateId }
}

export { useId };