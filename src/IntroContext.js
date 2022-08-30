import { createContext, useState } from "react";

const IntroContext = createContext();

export function IntroProvider({ children }) {
  const [intro, setIntro] = useState(false);
  const changeIntro = () => setIntro(!intro)
  console.log(`Global intro is set to: ${intro}`);
  return (
    <IntroContext.Provider value={{ intro, changeIntro }}>{children}</IntroContext.Provider>
  )

}

export default IntroContext;