import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import TopMovie from '../../../models/top_movie';
import networkService from '../../../helpers/networkService';
import axios from 'axios';

interface TitleDetailState {
  commentInputVisible?: boolean;
  comments: any[];
  fetchCommentLoading: boolean;
  recommendationInputVisible?: boolean;
  recommendations: any[];
  fetchRecommendationLoading: boolean;
}

const initialState: TitleDetailState = {
  commentInputVisible: false,
  comments: [],
  fetchCommentLoading: true,
  recommendationInputVisible: false,
  recommendations: [],
  fetchRecommendationLoading: true,
};

export const titleDetailSlice = createSlice({
  name: 'titleDetail',
  initialState: initialState,
  reducers: {
    setCommentInputVisible: (state, action) => {
      state.commentInputVisible = action.payload;
    },
    setRecommendationInputVisible: (state, action) => {
      state.recommendationInputVisible = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, (state, action) => {
      state.fetchCommentLoading = true;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.fetchCommentLoading = false;
    });

    builder.addCase(fetchComments.rejected, (state, action) => {
      state.fetchCommentLoading = false;
    });

    builder.addCase(fetchRecommendations.pending, (state, action) => {
      state.fetchRecommendationLoading = true;
    });

    builder.addCase(fetchRecommendations.fulfilled, (state, action) => {
      state.recommendations = action.payload;
      state.fetchRecommendationLoading = false;
    });
    builder.addCase(fetchRecommendations.rejected, (state, action) => {
      state.fetchRecommendationLoading = false;
    });
  },
});

export const {setCommentInputVisible, setRecommendationInputVisible} =
  titleDetailSlice.actions;

export const {} = titleDetailSlice.actions;

export default titleDetailSlice.reducer;

export const fetchComments = createAsyncThunk(
  'titleDetail/fetchComments',
  async (uuid: string) => {
    try {
      const response = await networkService.post('title/api/title-tab-movie/', {
        slug: uuid,
        tab: 'Comments',
      });

      return response.data.comments;
      // console.log('CommentTab', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);

          switch (error.response.status) {
            case 400:
              console.log('Hatalı istek. Lütfen bilgilerinizi kontrol edin.');

              break;
            case 401:
              console.log(
                'Yetkisiz giriş. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.',
              );

              break;
            case 500:
              console.log('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');

              break;
            default:
              console.log(
                'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
              );
          }
        } else if (error.request) {
          console.log(error.request);
          console.log(
            'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.',
          );
        } else {
          console.log('Error', error.message);
          console.log('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
      } else {
        console.log('Error', error);
        console.log('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  },
);

export const fetchRecommendations = createAsyncThunk(
  'titleDetail/fetchRecommendations',
  async (uuid: string) => {
    try {
      const response = await networkService.post('title/api/title-tab-movie/', {
        slug: uuid,
        tab: 'Recommendations',
      });
      // console.log('CommentTab', response.data);
      return response.data.recommentaions;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);

          switch (error.response.status) {
            case 400:
              console.log('Hatalı istek. Lütfen bilgilerinizi kontrol edin.');

              break;
            case 401:
              console.log(
                'Yetkisiz giriş. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.',
              );

              break;
            case 500:
              console.log('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');

              break;
            default:
              console.log(
                'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
              );
          }
        } else if (error.request) {
          console.log(error.request);
          console.log(
            'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.',
          );
        } else {
          console.log('Error', error.message);
          console.log('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
      } else {
        console.log('Error', error);
        console.log('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  },
);
