import Wordmark from '/assets/wordmark.svg';

const Header = () => {
  return (
    <header>
      <nav>
        <a href="/">
          <img src={Wordmark} alt="Proto dot cool" />
        </a>
      </nav>
    </header>
  )
}

export default Header