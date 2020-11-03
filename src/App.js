import React, {useState} from 'react';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './app/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import TasksPage from './pages/TasksPage';

function App() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState(null)
  
  const {pathname} = window.location
  const initialLink = () => {
    const match = pathname.match(/tasks\/\w+/g)
    if(match === null) return 'tasks'
    else if(match[0] === 'tasks/planned') return 'planned'
    else if(match[0] === 'tasks/important') return 'important'
    else if(match[0] === 'tasks/myday') return 'myday'
    else return 'tasks'
  }
  const [link, setLink] = useState(initialLink())

  let theme = React.useMemo(
    () => 
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          background: {
            grey: prefersDarkMode ? '#303030' : '#e0e0e0'
          }
        },
      }),
    [prefersDarkMode]
  );
  theme = responsiveFontSizes(theme)

  const switchDarkMode = () => setPrefersDarkMode(!prefersDarkMode)
  const changeSearchTerm= (text) =>setSearchTerm(text)
  const changeLink = link => setLink(link)

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <NavBar
            darkMode={prefersDarkMode}
            switchDarkMode={switchDarkMode} 
            changeSearchTerm={changeSearchTerm}
            searchTerm={searchTerm}
            changeLink={changeLink}
            link={link}
          />
          <div className="App">
            <Switch>
              <Route path="/tasks">
                <TasksPage 
                  link={link}
                  changeLink={changeLink}
                  searchTerm={searchTerm} 
                  changeSearchTerm={changeSearchTerm}/>
              </Route>
              <Redirect to="/tasks" />
            </Switch>  
          </div>
        </CssBaseline>
      </ThemeProvider>
    </Router>  
  );
}

export default App;
