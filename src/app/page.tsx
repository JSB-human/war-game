import type { AppProps } from 'next/app';
import LeafletMapPage from "./_leaflet/LeafletMapPage";
import GameBoard from './_gameBoard/GameBoard';
import Aichat from './_llama/Lamma';
import ControlArmy from './_controlArmy/ContolArmy';




export default function Home({Component, pageProps} : AppProps) {
  return (
    <div className="w-full h-full flex">
        <div className="flex-1">
          <LeafletMapPage></LeafletMapPage>
        </div>
        <div className="flex-1 flex">
          <div className=''>
            <GameBoard></GameBoard>
            <Aichat></Aichat>
          </div>
          <div className="w-full">
            <ControlArmy></ControlArmy>
          </div>
        </div>
    </div>
  );
}
