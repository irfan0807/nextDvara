import { all, call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { DB } from '../../firebase';
import {
  fetchFarmerDataSuccess,
  fetchFarmerDataFail,
  fetchCattleDataSuccess,
  fetchCattleDataFail,
} from './actions';
import { FETCH_FARMER_DATA } from './constants';

export function* fetchCattleData() {
  try {
    const farmerDetails = yield call(DB.database.read, 'Files/JANA/farmers');
    const cattleDetails = yield call(DB.database.read, 'Files/JANA/cattles');
    const elements = Object.keys(cattleDetails);
    const dataList = [];
    const currentData = new Date();
    yield elements.map(x => {
      if (
        cattleDetails[x].timestamp &&
        cattleDetails[x].photos &&
        (cattleDetails[x].photos[0].url ||
          cattleDetails[x].photos[1].url ||
          cattleDetails[x].photos[2].url ||
          cattleDetails[x].photos[3].url ||
          cattleDetails[x].photos[4].url)
      ) {
        dataList.push({
          date: cattleDetails[x].timestamp.slice(0, 10),
          status: 'pending',
          id: cattleDetails[x].cowIDORPetName,
          uniq: cattleDetails[x].cattleIDUniqueKey,
          farmerName: farmerDetails[cattleDetails[x].farmerID]
            ? farmerDetails[cattleDetails[x].farmerID].farmerName
            : 'Not Available',
        });
      }
      return '';
    });
    if (cattleDetails)
      yield put(
        fetchCattleDataSuccess({
          cattleDetails,
          dataList,
          farmerDetails,
          month: `${currentData.getMonth() + 1}`,
          year: `${currentData.getFullYear()}`,
        }),
      );
    else yield put(fetchCattleDataFail());
  } catch (error) {
    yield put(fetchCattleDataFail());
    console.log(error);
  }
}

export function* fetchFarmerData() {
  try {
    const farmerDetails = yield call(DB.database.read, 'Files/JANA/farmers');
    // const cattleDetails = yield call(DB.database.read, 'Files/data/cattles');
    const elements = Object.keys(farmerDetails);
    const dataList1 = [];
    const currentData = new Date();
    yield elements.map(x => {
      if (
        farmerDetails[x].farmerName &&
        farmerDetails[x].farmerMobile &&
        farmerDetails[x].village &&
        farmerDetails[x].mithraMobile &&
        farmerDetails[x].timeStamp
      ) {
        dataList1.push({
          status: 'pending',
          farmerName: farmerDetails[x].farmerName,
          farmerMobile: farmerDetails[x].farmerMobile,
          date: farmerDetails[x].timeStamp.slice(0, 10),
          id: farmerDetails[x].farmerID,
          village: farmerDetails[x].village,
          mithraMobile: farmerDetails[x].mithraMobile,
          photos: farmerDetails[x].photos?farmerDetails[x].photos:"NA"
        });
      }
      return '';
    });
    if (farmerDetails)
      yield put(
        fetchFarmerDataSuccess({
          // cattleDetails,
          dataList1,
          farmerDetails,
          month: `${currentData.getMonth() + 1}`,
          year: `${currentData.getFullYear()}`,
        }),
      );
    else yield put(fetchFarmerDataFail());
  } catch (error) {
    yield put(fetchFarmerDataFail());
    console.log(error);
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // yield all([takeLatest(FETCH_CATTLE_DATA, fetchCattleData)]);
  yield all([takeLatest(FETCH_FARMER_DATA, fetchFarmerData)]);
}
