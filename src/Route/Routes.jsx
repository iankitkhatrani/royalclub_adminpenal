// dashbaord
import Social from "../Components/Dashboard/Social";
import ErrorPage4 from '../Components/Pages/ErrorPages/ErrorPage404';
import Banner from "../Pages/Banner";
import User from "../Pages/User";
import Agent from "../Pages/Agent";
import Admin from "../Pages/Admin";
import AdminTranscation from "../Pages/Admin/AdminTranscation";
import AgentTranscation from "../Pages/Agent/AgentTranscation";
import UserTranscation from "../Pages/User/UserTranscation";
import Roullette from "../Pages/Games/Roullette"
import Ludo from "../Pages/Games/Ludo"
import JantaVoldy from "../Pages/Games/JantaVoldy"
import TeenPatti from "../Pages/Games/TeenPatti"
import Rummy from "../Pages/Games/Rummy"
import Settings from "../Pages/Settings";
import PushNotification from "../Pages/PushNotification";
import Notice from "../Pages/Notice";

export const routes = [
  { path: `/dashboard/:layout`, Component: <Social /> },
  { path: `/agent/agent_list/:layout`, Component: <Agent /> },
  { path: `/agent/agent_transcation/:layout`, Component: <AgentTranscation /> },
  { path: `/users/user_list/:layout`, Component: <User /> },
  { path: `/users/user_transcation/:layout`, Component: <UserTranscation /> },
  { path: `/banner/:layout`, Component: <Banner /> },
  { path: `/admin/admin_list/:layout`, Component: <Admin /> },
  { path: `/admin/admin_transcation/:layout`, Component: <AdminTranscation /> },
  { path: `/games/roullette_history/:layout`, Component: <Roullette /> },
  { path: `/games/ludu_history/:layout`, Component: <Ludo /> },
  { path: `/games/janta_voldy/:layout`, Component: <JantaVoldy /> },
  { path: `/games/teen_patti/:layout`, Component: <TeenPatti /> },
  { path: `/games/rummy/:layout`, Component: <Rummy /> },
  { path: `/settings/:layout`, Component: <Settings /> },
  { path: `/push_notification/:layout`, Component: <PushNotification /> },
  { path: `/notice/:layout`, Component: <Notice /> },

  //Error
  { path: `*`, Component: <ErrorPage4 /> },

];
