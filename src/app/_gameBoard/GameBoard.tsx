'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Image, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import Face6TwoToneIcon from '@mui/icons-material/Face6TwoTone';
import PentagonTwoToneIcon from '@mui/icons-material/PentagonTwoTone';
import PetsTwoToneIcon from '@mui/icons-material/PetsTwoTone';
import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
import ParkTwoToneIcon from '@mui/icons-material/ParkTwoTone';

const GameBoard: React.FC = () => {
  const selectedArea = useSelector((state: RootState) => state.game.selectedGeoJson); 

  return (
    <div className='flex'>
      <div className=''>
          <div className="border-2 border-gray-500 flex justify-center items-center w-[300px] h-[45px]">
            <Image
              width={50}
              alt="NextUI hero Image"
              src={selectedArea.ci_logo_url ? selectedArea.ci_logo_url : ''}
            />  
            <div className='text-3xl text-green-900 font-bold ml-2'>{selectedArea.sigungu_ko}</div>
          </div>
          <div className="border-2 border-t-0 border-gray-500 w-[300px] h-[296px]">
            <Image
                width={300}
                alt="NextUI hero Image"
                src={selectedArea.king_img ? selectedArea.king_img : ''}
              />
            <p className="text-2xl text-center  text-white font-bold w-[300px] relative bottom-10 z-10" style={{textShadow : '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black'}}>{selectedArea.king}</p>
          </div>
      </div>
      <div className=''>
        <div className='flex'>
          <div className=''>
            <div className="border-2  border-gray-500 w-[233px] h-[341px]">
              <Table hideHeader removeWrapper  aria-label="Example empty table" className='border-none shadow-none text-2xl bg-slate-500 font-bold text-white h-full w-[230px]' style={{boxShadow: 'none'}} color={'primary'}>
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                  <TableRow key="1">
                    <TableCell><Face6TwoToneIcon></Face6TwoToneIcon>인구수</TableCell>
                    <TableCell>{selectedArea ? selectedArea.population.toLocaleString() + '명': ''}</TableCell>
                  </TableRow>
                  <TableRow key="1">
                    <TableCell><PentagonTwoToneIcon></PentagonTwoToneIcon>면적</TableCell>
                    <TableCell>{selectedArea ? selectedArea.carea : ''}</TableCell>
                  </TableRow>
                  <TableRow key="1">
                    <TableCell><PetsTwoToneIcon></PetsTwoToneIcon>동물</TableCell>
                    <TableCell>{selectedArea ? selectedArea.animal : ''}</TableCell>
                  </TableRow>
                  <TableRow key="1">
                    <TableCell><FilterVintageTwoToneIcon></FilterVintageTwoToneIcon>꽃</TableCell>
                    <TableCell>{selectedArea ? selectedArea.flower : ''}</TableCell>
                  </TableRow>
                  <TableRow key="1">
                    <TableCell><ParkTwoToneIcon></ParkTwoToneIcon>나무</TableCell>
                    <TableCell>{selectedArea ? selectedArea.tree : ''}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

            </div>

          </div>
        </div>
        
      </div>
     
    </div>
  );
};

export default GameBoard;
