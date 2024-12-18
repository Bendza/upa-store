import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    company: [
      { title: 'O nama', href: '/o-nama' },
      { title: 'Prodavnice', href: '/prodavnice' },
      { title: 'Kontakt', href: '/kontakt' }
    ],
    help: [
      { title: 'Način plaćanja', href: '/nacin-placanja' },
      { title: 'Reklamacije', href: '/reklamacije' },
      { title: 'Česta pitanja', href: '/faq' }
    ],
    legal: [
      { title: 'Uslovi korišćenja', href: '/uslovi-koriscenja' },
      { title: 'Politika privatnosti', href: '/politika-privatnosti' }
    ]
  };

  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div>
          <h3 className="font-semibold text-lg mb-4">O KOMPANIJI</h3>
          <ul className="space-y-2">
            {footerLinks.company.map(link => (
              <li key={link.title}>
                <Link to={link.href} className="text-gray-600 hover:text-[#B39B8E]">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">POMOĆ</h3>
          <ul className="space-y-2">
            {footerLinks.help.map(link => (
              <li key={link.title}>
                <Link to={link.href} className="text-gray-600 hover:text-[#B39B8E]">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">PRAVNA DOKUMENTA</h3>
          <ul className="space-y-2">
            {footerLinks.legal.map(link => (
              <li key={link.title}>
                <Link to={link.href} className="text-gray-600 hover:text-[#B39B8E]">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">PRATITE NAS</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#B39B8E]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#B39B8E]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 pt-8 border-t border-gray-200 px-4">
        <p className="text-center text-gray-500">
          © {new Date().getFullYear()} UPA. Sva prava zadržana.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 