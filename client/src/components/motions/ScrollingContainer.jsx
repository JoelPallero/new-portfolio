import { m } from 'framer-motion'

const ScrollingContainer = () => {
  return (
    <m.div
      className='container'
      initial={{
        scale: .50,
      }}
      whileInView={{
        scale: 1,
        transition: {
          duration: 3,
        }
      }}
    >
    </m.div>
  );
}


export default ScrollingContainer;