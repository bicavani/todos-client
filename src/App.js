import React, {useState} from 'react';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './app/NavBar';
import MenuLeft from './app/MenuLeft';
import Todos from './features/todos/Todos';

let theme = createMuiTheme()

function App() {
  theme = responsiveFontSizes(theme)
  const [isMenuLeftOpen, setIsMenuLeftOpen] = useState(false)

  const handleMenuLeftToggle = e => setIsMenuLeftOpen(!isMenuLeftOpen)
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="App">
          <NavBar />
          <MenuLeft 
            isOpen={isMenuLeftOpen}
            handleToggle={handleMenuLeftToggle}
          />
          <Todos isMenuLeftOpen={isMenuLeftOpen} />
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
