import { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.css'
import './style/scss/style.scss'
import 'animate.css/animate.css'
import { SessionProvider } from 'next-auth/react';
import { Bounce, ToastContainer } from 'react-toastify';



export const metadata: Metadata = {
  title: "Nairobi Business - Explore all businesses in Nairobi, Kenya.",
  description: "Nairobi Business, explore all businesses in Nairobi, Kenya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
         <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
       </head>
      <body className={``}>
        <SessionProvider>
          {children}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
