import "bootswatch/dist/Lux/bootstrap.min.css";

export const metadata = {
  title: 'Test for UdmurtOil',
  description: 'Done by Alina Erch',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
