import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

// Layouts
import ContentLayout from './layouts/ContentLayout';

// Pages
import PostList from './pages/PostList';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';
import DashboardMyPost from './pages/DashboardMyPost';
import DashboardMyComment from './pages/DashboardMyComment';
import TopicPosts from './pages/TopicPosts';
import UpdatePost from './pages/UpdatePost';
import ScrollToTop from './components/ScrollToTop';
import PageNotFound from './pages/PageNotFound';
import Logout from './pages/Logout';
import SearchResults from './pages/SearchResults';
import UserDashboard from './pages/UserDashboard';
import DashboardContact from './pages/DashboardContact';
import DashboardProfile from './pages/DashboardProfile';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<ScrollToTop />}>
        <Route path='/' element={<ContentLayout/>}>
          <Route index element={<LandingPage />}/>
          <Route path='posts' element={<PostList/>} />
          <Route path='post/:id/detail' element={<PostDetail/>} />
          <Route path='create/post' element={<CreatePost />}/>
          <Route path='topic/:name/posts' element={<TopicPosts />}/>
          <Route path='update/:id/post' element={<UpdatePost />}/>
          <Route path='register' element={<Register />}/>
          <Route path='login' element={<Login />}/>
          <Route path='logout' element={<Logout />}/>
          <Route path='search/result' element={<SearchResults />}/>
          <Route path='user/:username/dashboard' element={<UserDashboard />} >
            <Route index element={<DashboardMyPost />}/>
            <Route path='comments' element={<DashboardMyComment />}/>
            <Route path='contact' element={<DashboardContact />}/>
            <Route path='profile' element={<DashboardProfile />}/>
          </Route>
          <Route path='error' element={<Error />}/>
          <Route path='*' element={<PageNotFound />}/>
        </Route>
    </Route>
  )
)


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
