import { ReactNode } from 'react';
import Logo from '/logo.svg';
import './Banner.css';

const Banner = ({ heading, body }: { heading: string, body?: ReactNode }) => {
  return (
    <section>
      <div>
        <h1>{heading}</h1>
        {body}
      </div>
      <img src={Logo} alt="" />
    </section>
  )
}

export default Banner