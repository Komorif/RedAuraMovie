"use client";

import "../app/globals.css";
import React from "react";

import { Alumni_Sans } from 'next/font/google';
const alumni_sans = Alumni_Sans({ subsets: ["latin"]})


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={alumni_sans.className}>
        <div>
          <nav className="menu">
            <div className="elipse_one">
              <div className="line_one"></div>
              <div className="line_two"></div>
      
              <div className="images_elipse">
                <div className="menu_button">
                  <img className="img_menu" src="http://localhost/static/images_menu/films_menu.png" alt="" />
                  <a href="/videos/films" className="text_button">
                    ФИЛЬМЫ
                  </a>
                </div>
      
                <div className="menu_button">
                  <img className="img_menu" src="http://localhost/static/images_menu/series_menu.png" alt="" />
                  <a href="/videos/series" className="text_button">
                    СЕРИАЛЫ
                  </a>
                </div>
      
                <div className="menu_button">
                  <img className="img_menu" src="http://localhost/static/images_menu/anime_menu.png" alt="" />
                  <a href="/videos/anime" className="text_button">
                    АНИМЕ
                  </a>
                </div>
      
                <div className="menu_button">
                  <img className="img_menu" src="http://localhost/static/images_menu/favorites_menu.png" alt="" />
                  <a href="/favorites" className="text_button">
                    ИЗБРАННОЕ
                  </a>
                </div>
              </div>
            </div>
      
            <div className="elipse_two"></div>
            <div className="elipse_three"></div>
          </nav>

          <main>
            {children}
          </main>

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