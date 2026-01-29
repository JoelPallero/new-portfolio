import Icons from './Icons';

//styles and animations, if..
 import '@as/footer.css'

const base = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const Footer = () => {
  return (
    <footer className="medium-container footer">
      <div className="grid-footer-container">
          <section className="footer-section">
            <a className="logo-img" href={`${base}`}>
              <Icons iconName="logo"/>
            </a>
          </section>
          <section className="footer-section">
            <div className="social-icons">
              <a target="_blank" href="https://www.linkedin.com/in/joel-pallero/">
                <Icons iconName="in"/>
              </a>
              <a target="_blank" href="https://github.com/JoelPallero?tab=repositories">
                <Icons iconName="github"/>
              </a>
              <a target="_blank" href={`${base}docs/Joel-Pallero-Resume.pdf`} download="resume-joel-pallero.pdf">
                <Icons iconName="download"/>
              </a>
              {/* <a target="_blank" href="https://wa.me/543512149461">
                <Icons iconName="wsp"/>
              </a> */}
            </div>
          </section>

          <section className="footer-section">
            <div className="footer-tags">
              <p>#SEO</p>
              <p>#E-Commerce</p>
              <p>#Landing page</p>
              <p>#Web performance</p>
            </div>
          </section>
        </div>
    </footer>
  );
};

export default Footer;
