import React, { Component } from "react";
import AppRouter from "./components/shared/routers/AppRouter";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
const Audio = React.memo(function Audio({children}) {
  return(
      <div style={{width: '0px', height: '0px', margin: '0px', fontSize: '0'}}>
        <audio src={require('../src/components/shared/pokemontheme.mp3')} id="MainTheme"/>
        {setTimeout(()=> {
          try{
            document.getElementById("MainTheme").volume = localStorage.getItem('VolumeMuted')=='false' ? (localStorage.getItem('MusicVol')/100) : 0;
            document.getElementById("MainTheme").play();
            document.getElementById("MainTheme").loop = true;
          }catch (e) {}
        }, 500)}
      </div>
  )
})

class App extends Component {
  render() {
    return (
      <div>
        <Audio/>
        <AppRouter />
      </div>
    );
  }
}

export default App;
