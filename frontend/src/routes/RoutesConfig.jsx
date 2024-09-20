import { Routes, Route } from 'react-router-dom';

//pages
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Portfolio from '../pages/portfolio/Portfolio';
import JobDetail from '../pages/portfolio/JobDetails';

// private routes authenticator component
import PrivateRoute from '../components/auth/PrivateRoute';

//private routes
import Account from '../pages/Account';
import Dashboard from '../components/account/Dashboard';
import ManageLanguages from '../components/account/ManageLanguages'
import ManagePersonalInfo from '../components/account/ManagePersonalInfo';
import ManagePortfolio from '../components/account/ManagePortfolio';
import ManageToolSet from '../components/account/ManageToolSet'

//login - reset pages
import Login from '../pages/public/Login';
import ResetPassword from '../pages/public/ResetPassword';



const RoutesConfig = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>

      <Route path="/portfolio" element={<Portfolio/>}/>
      <Route path="/portfolio/job-detail/:id" element={<JobDetail/>}/>

      <Route path="/login" element={<Login/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      {/* End public routes */}


      {/* Private routes */}
      <Route path="/account" 
        element={
          <PrivateRoute>
            <Account/>
          </PrivateRoute>
        }
      />
      
      <Route path="/account/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
      />

      <Route path="/account/languages" 
        element={
          <PrivateRoute>
            <ManageLanguages/>
          </PrivateRoute>
        }
      />

      <Route path="/account/personal-info" 
        element={
          <PrivateRoute>
            <ManagePersonalInfo/>
          </PrivateRoute>
        }
      />

      <Route path="/account/portfolio" 
        element={
          <PrivateRoute>
            <ManagePortfolio/>
          </PrivateRoute>
        }
      />


      <Route path="/account/tool-set" 
        element={
          <PrivateRoute>
            <ManageToolSet/>
          </PrivateRoute>
        }
      />

      {/* End private routes */}
    </Routes>
  );
}


export default RoutesConfig;