import { useState } from "react";

// создал общий компонент Block который является единым для представления различного конетнта
// сам контент передаем с помощью children
export const Block = ({ mouseEnterCallbak, children }) => {
  const [isActive, setActive] = useState(false)

  const mouseEnterHandler = () => {
    setActive(true)
    mouseEnterCallbak()
  }

  return (
    <div onMouseEnter={mouseEnterHandler} className={isActive ? 'active' : ''}>
      {children}
    </div>
  )
}

// Block1, Block2, Block3 меняем на Block:
<Fragment>
  <Block mouseEnterCallbak={() => console.log("hi from Block1")}>
    <img
      src="https://ohmylook.ua/files/products/42504.290x484.JPG?ce7d3c50d2e66b146f8711dd9eb7af35"
      alt="my picture"
    />
  </Block>
  <Block mouseEnterCallbak={() => console.log("hi from Block 2")}>
    <p>Magdalena</p>
  </Block>
  <Block mouseEnterCallbak={() => console.log("hi from Block 3")}>
    <address>country: USA, street: Maskavas</address>
  </Block>
</Fragment>
