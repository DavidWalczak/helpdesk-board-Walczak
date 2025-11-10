// Root Layout — imports global CSS so styles apply site-wide
import './styles/globals.css';

export const metadata = {
  title: 'Ticket Board',
  description: 'Live updating ticket management dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
