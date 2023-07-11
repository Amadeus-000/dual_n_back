import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { Provider } from "react-redux"
import store from './store';

import DNB from './routes/DNB';
import Test from './routes/Test';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
  palette: {
    primary: {
      main: "#60c7f0", // この色は任意のカラーコードに置き換えることができます。
    },
    secondary: {
      main: "#a0d8ef", // この色は任意のカラーコードに置き換えることができます。
    },
    background: {
      default: "#c8d1de", // ここに任意の色を設定
    },
  },
  components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    width: 200,
                    backgroundColor: "#282c34", // Drawerの背景色を変更
                    color: "#FFFFFF", // Drawer内のテキストの色を変更
                },
            },
        },
    },
});


function App() {
  return (
		<ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<DNB />} />
      <Route path='/test' element={<Test />} />
    </Routes>
    </BrowserRouter>
    </Provider>
    </ThemeProvider>
  );
}

export default App;
