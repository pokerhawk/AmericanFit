import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Routes from "./routes";
import { GlobalStyles } from "./styles/Global";
import theme from "./styles/styled-theme";
import { SWRConfig } from "swr";
import { fetcher } from "./services/api";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SWRConfig value={{ fetcher }}>
          <ThemeProvider theme={theme}>
            <Routes />
            <GlobalStyles />
          </ThemeProvider>
        </SWRConfig>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
