import "./Footer.css";

function Footer({
  developerName = "Angel Armas",
  year = new Date().getFullYear(),
}) {
  return (
    <footer className="footer">
      <p className="footer__credit">Developed by {developerName}</p>
      <p className="footer__year">{year}</p>
    </footer>
  );
}

export default Footer;
