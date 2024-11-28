import i18n, {t} from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector: any = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback: any) => {
    const locales = RNLocalize.getLocales();
    const defaultLocale = locales[0]?.languageTag || 'en';
    callback(defaultLocale);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',

    resources: {
      en: {
        title: 'Welcome Back,',
        home: {
          title: 'Welcome Back,',
        },
        profile: {
          menu: {
            discoverMore: 'Discover More',
            inTheaters: 'In Theaters',
            premiere: 'Premiere',
            onTV: 'On TV',
            myMission: {
              title: 'My Mission',
              enjoyFor:
                'Enjoy for [X] mins, get everything in this categoryfor FREE all day long!',
              missionPossible: 'Mission Possible',
            },
            buttons: {
              title: 'Buttons',
              supriseMe: 'Surprise Me',
              whatsInTheBox: "What's in the Box?",
              stayTogether: 'Stay Together',
              blindMatch: 'Blind Match',
            },

            shorts: 'Shorts',
            clips: 'Clips',
            lists: {
              title: 'Lists',
              titles: 'Titles',
              episodes: 'Episodes',
              clips: 'Clips',
            },
            communities: 'Communities',
            movements: {
              title: 'Movements',
            },
            charts: {
              title: 'Charts',
              titles: 'Titles',
              companies: 'Companies',
              cast: 'Cast',
              crew: 'Crew',
              cinephiles: 'Cinephiles',
            },
            campaigns: 'Campaigns',
            calendar: {
              title: 'Calendar',
              today: 'Today',
              thisWeek: 'This Week',
              thisMonth: 'This Month',
            },

            contact: 'Contact',
            logout: 'Logout',
          },
          settings: {
            title: 'Settings',
            menu: {
              accountProfile: 'Account Profile',
              profileTransfer: 'Profile Transfer',
              preferences: 'Preferences',
              language: 'Language',
              subtitleSettings: 'Subtitle Settings',
              notificationSettings: 'Notification Settings',
              parentalControls: 'Parental Controls',
              security: 'Security',
              subscription: 'Subscription',
              paymentMethod: 'Payment Method',
              paymentHistory: 'Payment History',
            },
            accountProfile: {
              title: 'Account Profile',
            },
            language: {
              title: 'Language',
            },
            paymentHistory: {
              title: 'Payment History',
            },
          },
          messages: {
            title: 'Messages',
          },
        },
        notifications: {
          title: 'Notifications',
        },
        common: {
          currentLanguage: 'The current language is "{{lng}}"',
          actions: {
            addToWatchlist: 'Add To Watchlist',
            toggleToTurkish: 'Turkish',
            toggleToEnglish: 'English',
          },
        },
      },
      tr: {
        home: {
          title: 'Hoş Geldin,',
        },
        profile: {
          menu: {
            discoverMore: 'Daha Fazla Keşfet',
            inTheaters: 'Vizyondakiler',
            premiere: 'Premier',
            onTV: 'TV’de',
            myMission: {
              title: 'Görevim',
              enjoyFor:
                '[X] dakika boyunca keyfini çıkarın, bu kategorideki her şeye gün boyu ÜCRETSİZ sahip olun!',
              missionPossible: 'Mission Possible',
            },
            buttons: {
              title: 'Butonlar',
              supriseMe: 'Bana Sürpriz Yap',
              whatsInTheBox: 'Kutunun İçinde Ne Var?',
              stayTogether: 'Birlikte Kal',
              blindMatch: 'Kör Eşleşme',
            },
            shorts: 'Kısa Filmler',
            clips: 'Klipler',
            lists: {
              title: 'Listeler',
              titles: 'İçerikler',
              episodes: 'Bölümler',
              clips: 'Klipler',
            },
            movements: {
              title: 'Hareketler',
            },
            charts: {
              title: 'Grafikler',
              titles: 'İçerikler',
              companies: 'Şirketler',
              cast: 'Oyuncular',
              crew: 'Ekip',
              cinephiles: 'Sinemaseverler',
            },
            campaigns: 'Kampanyalar',
            communities: 'Topluluklar',
            calendar: {
              title: 'Takvim',
              today: 'Bugün',
              thisWeek: 'Bu Hafta',
              thisMonth: 'Bu Ay',
            },

            contact: 'İletişim',
            logout: 'Çıkış Yap',
          },
          settings: {
            title: 'Ayarlar',
            menu: {
              accountProfile: 'Hesap Profili',
              profileTransfer: 'Profil Transferi',
              preferences: 'Tercihler',
              language: 'Dil',
              subtitleSettings: 'Altyazı Ayarları',
              notificationSettings: 'Bildirim Ayarları',
              parentalControls: 'Ebeveyn Kontrolleri',
              security: 'Güvenlik',
              subscription: 'Abonelik',
              paymentMethod: 'Ödeme Yöntemi',
              paymentHistory: 'Ödeme Geçmişi',
            },
            accountProfile: {
              title: 'Hesap Profili',
            },
            language: {
              title: 'Dil',
            },
            paymentHistory: {
              title: 'Ödeme Geçmişi',
            },
          },
          messages: {
            title: 'Mesajlar',
          },
        },
        notifications: {
          title: 'Bildirimler',
        },
        common: {
          currentLanguage: 'Şu anki dil "{{lng}}"',
          actions: {
            addToWatchlist: 'İzleme Listesine Ekle',
            toggleToTurkish: 'Türkçe',
            toggleToEnglish: 'İngilizce',
          },
        },
      },
    },

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: true,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18n;
