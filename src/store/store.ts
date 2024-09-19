import { configureStore, createSlice } from '@reduxjs/toolkit';
import { FeatureCollection, Geometry } from 'geojson';

// 초기 상태 설정
const initialState = {
  selectedGeoJson : {
      ctprvn_code: '',
      sigungu_code: '',
      sigungu_en:'',
      sigungu_ko:'',
      geom:'',
      king:'',
      king_title:'',
      king_img:'',
      flower:'',
      animal:'',
      tree:'',
      population: 0,
      carea:'',
      ci_logo_url:'',
  }
};

// Slice 생성
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSelectedGeoJson: (state, action) => {
      state.selectedGeoJson = action.payload;
  },
  },
});

// 액션과 리듀서 내보내기
export const { setSelectedGeoJson } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;

// Redux 스토어 설정
const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
