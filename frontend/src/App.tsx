import React from 'react'
import './App.css'
import {useSelector} from "react-redux";
import {RootState} from "./core/store.config";
import Notification from "./shared/components/Notification";
import { QueryClientProvider} from "@tanstack/react-query";
import router,{queryClient} from "./routes/router";
import {RouterProvider} from "react-router-dom";


function App() {
  const notification = useSelector((state: RootState) => state.ui.notification);
  return (<>
        <QueryClientProvider client={queryClient}>
            {<span id='modal'/>}
            {notification && <Notification/>}
            <RouterProvider  router={router}/>
        </QueryClientProvider></>

  )
}

export default App
