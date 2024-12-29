import SearchInput from "./SearchInput";
import styles from "./search.module.css";

import { Alumni_Sans } from "next/font/google";
const alumni_sans = Alumni_Sans({ subsets: ["latin"] });

export default function SearchBar() {
  return (
    <div className={alumni_sans.className}> 
      <SearchInput />
      <div>
        <div className={styles.search_string}>
          <div className={styles.search_string_items}>
            
            <div className={styles.account_text}>
              <div className={styles.username}>LISTIC</div>
              <div className={styles.user_status}>в сети</div>
            </div>

            <div className={styles.account}>
              <a href="/">
                <img
                  src="http://localhost/static/images_menu/account.png"
                  alt="account"/>
              </a>
            </div>

            <div className={styles.telegram}>
              <a href="/">
                <img
                  src="http://localhost/static/images_menu/telegram_bar.png"
                  alt="tg"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}