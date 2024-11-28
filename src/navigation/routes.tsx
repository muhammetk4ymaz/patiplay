import SubtitlesVoiceoverSettings from '../components/shared/VideoPlayer/SubtitlesVoiceoverSettings';
import AuthView from '../views/auth';
import DashboardView from '../views/dashboard';
import CastDetailView from '../views/dashboard/pages/cast';
import CinephilesDetailView from '../views/dashboard/pages/cinephiles';
import CompaniesDetailView from '../views/dashboard/pages/companies';
import CountriesView from '../views/dashboard/pages/countries';
import CrewDetailView from '../views/dashboard/pages/crew';
import DiscussionView from '../views/dashboard/pages/discussion';
import GenresView from '../views/dashboard/pages/genres';
import LanguagesAudioView from '../views/dashboard/pages/languagesaudio';
import LanguagesSubtitlesView from '../views/dashboard/pages/languagessubtitles';
import ReleaseDatesView from '../views/dashboard/pages/releasedates';
import CalendarView from '../views/dashboard/patiplay/calendar';
import CampaignsView from '../views/dashboard/patiplay/campaigns';
import ChartsView from '../views/dashboard/patiplay/charts';
import ClipsView from '../views/dashboard/patiplay/clips';
import CommunitiesView from '../views/dashboard/patiplay/communities';
import InTheatersView from '../views/dashboard/patiplay/inTheaters';
import ListsView from '../views/dashboard/patiplay/lists';
import ListDetailView from '../views/dashboard/patiplay/lists/list_detail';
import MyListsView from '../views/dashboard/patiplay/lists/mylists';
import MyListDetailView from '../views/dashboard/patiplay/lists/mylists/mylist_detail';
import MyListEditView from '../views/dashboard/patiplay/lists/mylists/mylist_edit';
import MovementsView from '../views/dashboard/patiplay/movements';
import OnTvView from '../views/dashboard/patiplay/onTv';
import PremiereView from '../views/dashboard/patiplay/premiere';
import ShortsView from '../views/dashboard/patiplay/shorts';
import FavoriteActorsView from '../views/dashboard/profile/favorite_actors';
import FavoriteCompaniesView from '../views/dashboard/profile/favorite_companies';
import FavoriteCrewView from '../views/dashboard/profile/favorite_crew';
import MyFavoritesView from '../views/dashboard/profile/my_favorites';
import MyFollowingsView from '../views/dashboard/profile/my_followings';
import MyNetworkView from '../views/dashboard/profile/my_network';
import MyWatchlistView from '../views/dashboard/profile/my_watchlist';
import SettingsView from '../views/dashboard/profile/settings';
import AccountProfileView from '../views/dashboard/profile/settings/account_profile';
import LanguageView from '../views/dashboard/profile/settings/language';
import WatchHistoryView from '../views/dashboard/profile/watch_history';
import SearchView from '../views/dashboard/search';
import MessagesView from '../views/messages';
import ChatView from '../views/messages/chat';
import NewChatView from '../views/messages/newchat';
import NewGroupView from '../views/messages/newgroup';
import MovieDetailView from '../views/movie/movie_detail';
import MovieView from '../views/movie/movie_player';
import NotificationsView from '../views/notifications';
import AlmostHereView from '../views/preregistration/AlmostHereView';
import AlmostHere from '../views/preregistration/AlmostHereView';
import AlreadyHaveAnAccountView from '../views/preregistration/AlreadyHaveAnAccountView';
import CreateProfileView from '../views/preregistration/CreateProfileView';
import DontHaveAnAccountView from '../views/preregistration/DontHaveAnAccountView';
import PreRegistrationView from '../views/preregistration/PreRegistrationView';
import PreVerificationView from '../views/preregistration/PreVerificationView';
import VerificationView from '../views/verification';
import HomeRoute from './home_route';
import MissionRoute from './mymission_route';
import PatiPlayRoute from './patiplay_route';
import ProfileRoute from './profile_route';

export const Routes = {
  AUTH: AuthView,
  VERIFICATION: VerificationView,
  DASBOARD: DashboardView,
  HOME: HomeRoute,
  SEARCH: SearchView,
  MISSION: MissionRoute,
  PATIPLAY: PatiPlayRoute,
  PREMIERE: PremiereView,
  INTHEATERS: InTheatersView,
  ONTV: OnTvView,
  SHORTS: ShortsView,
  CLIPS: ClipsView,
  CHARTS: ChartsView,
  LISTS: ListsView,
  MYLIST: MyListsView,
  MYLISTDETAIL: MyListDetailView,
  MYLISTEDIT: MyListEditView,
  LISTDETAIL: ListDetailView,
  MOVEMENTS: MovementsView,
  CAMPAIGNS: CampaignsView,
  CALENDAR: CalendarView,
  COMMUNITIES: CommunitiesView,
  COMPANIESDETAIL: CompaniesDetailView,
  CASTDETAIL: CastDetailView,
  CREWDETAIL: CrewDetailView,
  CINEPHILESDETAIL: CinephilesDetailView,
  LANGUAGESAUDIO: LanguagesAudioView,
  LANGUAGESSUBTITLES: LanguagesSubtitlesView,
  COUNTRIES: CountriesView,
  RELEASEDATES: ReleaseDatesView,
  GENRES: GenresView,
  DISCUSSION: DiscussionView,
  MOVIE: MovieView,
  SUBTITLESVOICEOVERSETTINGS: SubtitlesVoiceoverSettings,
  SETTINGS: SettingsView,
  MOVIEDETAIL: MovieDetailView,
  LANGUAGE: LanguageView,
  NOTIFICATIONS: NotificationsView,
  MESSAGES: MessagesView,
  CHAT: ChatView,
  NEWCHAT: NewChatView,
  NEWGROUP: NewGroupView,
  ACCOUNTPROFILE: AccountProfileView,
  PROFILE: ProfileRoute,
  WATCHHISTORY: WatchHistoryView,
  MYFAVORITES: MyFavoritesView,
  MYWATCHLIST: MyWatchlistView,
  FAVORITECOMPANIES: FavoriteCompaniesView,
  FAVORITEACTORS: FavoriteActorsView,
  FAVORITECREW: FavoriteCrewView,
  MYNETWORK: MyNetworkView,
  MYFOLLOWINGS: MyFollowingsView,
  ALLREADYHAVEANACCOUNT: AlreadyHaveAnAccountView,
  DONTHAVEANDACCOUNT: DontHaveAnAccountView,
  PREVERIFICATION: PreVerificationView,
  ALMOSTHERE: AlmostHereView,
  CREATEPROFILE: CreateProfileView,
};

export type RootStackParamList = {
  Auth: undefined;
  Verification: undefined;
  Dashboard: undefined;
  Movie: undefined;
  Settings: undefined;
  SubtitlesVoiceoverSettings: undefined;
  MovieDetail: {movieId: string};
  Language: undefined;
  Notifications: undefined;
  Messages: undefined;
  Chat: {roomId: string; isGroup: boolean};
  NewChat: undefined;
  NewGroup: undefined;
  AccountProfile: undefined;
  Profile: undefined;
  WatchHistory: undefined;
  MyFavorites: undefined;
  MyWatchlist: undefined;
  FavoriteCompanies: undefined;
  FavoriteActors: undefined;
  FavoriteCrew: undefined;
  MyNetwork: undefined;
  MyFollowings: undefined;
  MyMission: undefined;
  PatiPlay: undefined;
  Premiere: undefined;
  InTheaters: undefined;
  OnTv: undefined;
  Shorts: undefined;
  Clips: undefined;
  Charts: undefined;
  Lists: undefined;
  MyLists: undefined;
  MyListDetail: undefined;
  MyListEdit: undefined;
  ListDetail: undefined;
  Movements: undefined;
  Campaigns: undefined;
  Calendar: undefined;
  CompaniesDetail: undefined;
  CastDetail: undefined;
  CrewDetail: undefined;
  CinephilesDetail: undefined;
  Discussion: undefined;
  Communities: undefined;
  LanguagesAudio: undefined;
  LanguagesSubtitles: undefined;
  Countries: undefined;
  ReleaseDates: undefined;
  Genres: undefined;
  AllReadyHaveAnAccount: undefined;
  DontHaveAnAccount: undefined;
  PreVerification: undefined;
  AlmostHere: undefined;
  CreateProfile: undefined;
  // other routes...
};
