import Menu from "@/components/Menu";
import routesConfig from "@/config/routesConfig";

import Icon from './Icons';

//styles and animations, if..
 import '@as/footer.css'

const Footer = () => {
  return (
    <footer className="medium-container footer">
      <div className="grid-footer-container">
          <section className="footer-section">
            <a className="logo-img" href="/">
              <Icon iconName="logo"/>
            </a>
          </section>
          <section className="footer-section">
            <div className="footer-menu">
              <h3>Marketing<br/>Digital</h3>
              <Menu
                menuType="marketingDigital"
                routes={routesConfig}
                classMenu="footer-menu-items"
              />
            </div>
            <div className="footer-menu">
              <h3>Desarrollo y<br/> Marca</h3>
              <Menu
                menuType="desarrolloWebYBranding"
                routes={routesConfig}
                classMenu="footer-menu-items"
              />
            </div>
            <div className="footer-menu">
              <h3>Contenidos<br/><br/></h3>
              <Menu
                menuType="marketingDeContenidos"
                routes={routesConfig}
                classMenu="footer-menu-items"
              />
            </div>
          </section>

          <section className="footer-section">
            <div className="footer-tags">
              <p>#Marketing Digital Aplicado</p>
              <p>#Reportes en tiempo real</p>
              <p>#Procesos de mejora continua</p>
              <p>#Especialistas en performance</p>
              <div className="social-icons">
                <Icon iconName="facebook" />
                <Icon iconName="instagram" />
                <Icon iconName="googleplus" />
              </div>
            </div>
          </section>
        </div>
    </footer>
  );
};

export default Footer;
