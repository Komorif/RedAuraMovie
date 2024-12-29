"use client";
import "./globals.css";
import React from "react";

import { Alumni_Sans, Caveat } from 'next/font/google';
const alumni_sans = Alumni_Sans({ subsets: ["latin"]})
const caveat = Caveat({ subsets: ["latin"]})

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={alumni_sans.className}>
      <style jsx global>{`
          :root {
            --font-caveat: ${caveat.style.fontFamily};
          }
        `}
      </style>
      
        <div>
          {children}
            <footer>
              <div>
                <ul className='bottomUl'>
                  <li><a href="/about">О нас</a></li>
                  <li><a href="/contacts">Контакты</a></li>
                  <li><a href="/user_">Пользовательское соглашение</a></li>
                </ul>
              </div>
            </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;