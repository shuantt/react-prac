const Container = ({ children, className }) => {
  return <nav className={`flex justify-between py-4 px-4 ${className}`}>{children}</nav>;
};

const Logo = ({ title, src, alt }) => {
  return (
    <>
      <div>{src ? <img src={src} alt={alt} /> : <h1 className="font-bold text-lg">{title}</h1>}</div>
    </>
  );
};

const ItemGroup = ({ children }) => {
  return <ul className="flex gap-2">{children}</ul>;
};

const Item = ({ text, href }) => {
  return (
    <li>
      <a href={href}>{text}</a>
    </li>
  );
};

const LinkIconGroup = ({ children }) => {
  return <ul className="flex">{children}</ul>;
};

const LinkIcon = ({ src, alt, onClick }) => {
  return <div></div>;
};

const Navbar = {
  Container,
  Logo,
  ItemGroup,
  Item,
  LinkIconGroup,
  LinkIcon,
};

export default Navbar;
