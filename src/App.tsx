import React from 'react';
import {Routes, Route, MemoryRouter } from "react-router-dom";
import SinglePaneLayout from "./layout/singlepanelayout/singlePaneLayout";
import {useMediaQuery} from "@mui/material";
import Info from "./components/info/info";
import MenuRead from "./components/menu/menuRead";
import MenuWrite from "./components/menu/menuWrite";
import MessagesRead from "./components/messages/messagesRead";
import MessagesWrite from "./components/messages/messagesWrit";
import TwainPaneLayout from "./layout/twainpanelayout/twainPaneLayout";
import MenuInactive from "./components/menu/menuInactive";
import PageNotFound from "./components/pagenotfound/pageNotFound";

function App() {
    const isMobile = useMediaQuery('(max-width:425px) and (orientation:portrait)');
    
    if (isMobile) {
        return (
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<SinglePaneLayout
                        menu={<MenuInactive/>}
                        children={null}/>}>
                    </Route>
                    <Route path="/read" element={<SinglePaneLayout
                        menu={<MenuRead/>}
                        children={<MessagesRead/>}/>}>
                    </Route>
                    <Route path="/read/:id" element={<SinglePaneLayout
                        menu={<MenuRead/>}
                        children={<Info/>}/>}>
                    </Route>
                    <Route path="/write" element={<SinglePaneLayout
                        menu={<MenuWrite/>}
                        children={<MessagesWrite/>}/>}>
                    </Route>
                    <Route path="/write/:id" element={<SinglePaneLayout
                        menu={<MenuWrite/>}
                        children={<Info/>}/>}>
                    </Route>
                    <Route path="*"
                           element={<PageNotFound/>}>
                    </Route>
                </Routes>
            </MemoryRouter >
        );
    } else {
        return (
            <MemoryRouter >
                <Routes>
                    <Route path="/" element={<SinglePaneLayout
                        menu={<MenuInactive/>}
                        children={null}/>}>
                    </Route>
                    <Route path="/read"
                           element={<TwainPaneLayout menu={<MenuRead/>}>
                               <MessagesRead/>
                               <Info/>
                           </TwainPaneLayout>}>
                    </Route>
                    <Route path="/read/:id"
                           element={<TwainPaneLayout menu={<MenuRead/>}>
                               <MessagesRead/>
                               <Info/>
                           </TwainPaneLayout>}>
                    </Route>
                    <Route path="/write"
                           element={<TwainPaneLayout menu={<MenuWrite/>}>
                               <MessagesWrite/>
                               <Info/>
                           </TwainPaneLayout>}>
                    </Route>
                    <Route path="/write/:id"
                           element={<TwainPaneLayout menu={<MenuWrite/>}>
                               <MessagesWrite/>
                               <Info/>
                           </TwainPaneLayout>}>
                    </Route>
                    <Route path="*"
                           element={<PageNotFound/>}>
                    </Route>
                </Routes>
            </MemoryRouter >);
    }
}

export default App;
