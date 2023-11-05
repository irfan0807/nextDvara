import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Location from '../../icons/Location';
import makeSelectUserDistance, {
  selectLoading,
  selectDataList1,
  selectCattleData,
  selectFarmerDetails,
  selectFilterOpen,
  selectFilterValue,
  selectMonth,
  selectYear,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  fetchFarmerData,
  updateIsFilterOpen,
  updateMonth,
  updateYear,
} from './actions';
import PageLoading from '../../components/PageLoading';
import CowLoading from '../../components/CowLoading';
import { database, firestore } from '../../firebase';

import {
  UserDistanceContainer,
  UserDistanceWrapper,
  OPSHomePageContainerWrapper,
  DownloadXLButton,
} from './elements';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { Map, Marker } from 'google-maps-react';
import { GoogleAuth } from '../App';
import deleteimage from '../../images/deleteLogo.png';
import Geocode from "react-geocode";
import exportFromJSON from 'export-from-json';

import XLSX from 'xlsx';

Geocode.setApiKey("AIzaSyD6yoy_R7ed59wM_NNURCGv8Tj4A3VDlKQ");
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

const UserDistance = (props) => {
  const [listofusers, setListofUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [mithraType, setMithraType] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [userType, setUserType] = useState('');
  const [fpodetails, setFpoDetails] = useState([]);
  const [ssfavalue, setSsfavalue] = useState('');
  const [successmsg, setSuccessMsg] = useState('');
  const [pincode, setPincode] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [isFseAllowed, setIsFseAllowed] = useState(false);
  const [todayDate, setTodayDate] = useState('');
  const [isDateChange, setIsDateChange] = useState(false);
  const [displayDate, setDisplayDate] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(true);
  const scrollDiv = useRef(null);

  useEffect(() => {
    props.onFetchFarmerData();
    let todayDate = new Date();
    let dd = todayDate.getDate();
    let mm = todayDate.getMonth() + 1;
    let yyyy = todayDate.getFullYear();
    let newDate = dd + "-" + mm + "-" + yyyy;
    let displayDate = yyyy + "-" + mm + "-" + dd;
    database.ref('/Files/fpodetails').once('value', async snap => {
      var data = snap.val();
      var fpodetailsarray = [];
      Object.keys(data).forEach(records => {
        fpodetailsarray.push(data[records]);
      });
      setFpoDetails(fpodetailsarray);
      setTodayDate(newDate);
      setDisplayDate(displayDate);
      handleDetails();
    });
  }, []);

  const handleDetails = async () => {
    database.ref('Files/restrict_user').on('value', snap => {
      var data = snap.val();
      var usersarray = [];
      Object.keys(data).forEach(records => {
        usersarray.push({
          name: data[records]['mithraName'],
          fpotype: data[records]['fpoName'],
          mithraType: data[records]['mithraType'],
          userType: data[records]['userType'] ? data[records]['userType'] : "NA",
          pincode: data[records]['pincode'] ? data[records]['pincode'] : "NA",
          lat: data[records]['lat'] ? data[records]['lat'] : "NA",
          lng: data[records]['lng'] ? data[records]['lng'] : "NA",
          allowFse: data[records]['allowFse'] && data[records]['allowFse'] == "yes" ? "Yes" : "No",
          mobilenumber: data[records]['mobileNumber'],
        });
      });
      setAllUsers(usersarray);
      getDistanceData();
    });

    database.ref('Files/mithraType').once('value', snap => {
      var data = snap.val();
      setMithraType(Object.keys(data));
    });

    database.ref('Files/userType').once('value', snap => {
      var data = snap.val();
      setUserOptions(Object.keys(data));
    });
  };

  const getCheckTime = async (url) => {
    return new Promise(async (resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then((jsonData) => {
          console.log(jsonData);
          let obj = {};
          obj.checkIn = jsonData[0].timestamp;
          obj.checkOut = jsonData[jsonData.length - 1].timestamp;
          resolve(obj);
        })
        .catch((error) => {
          console.error(error);
          let obj = {};
          obj.checkIn = "NA";
          obj.checkOut = "NA";
          resolve(obj);
        })
    });
  }

  const getDistanceData = async () => {
    let totalData = [];
    if (allUsers.length > 0) {
      await Promise.all(allUsers.map(async (user, index) => {
        let mobile = user.mobilenumber;
        const distData = await firestore.collection(`Files/gpsData/${mobile}`).doc(todayDate).get();
        console.log(distData.id, distData.data(), mobile, "log data");
        let distanceData = distData.data();
        let obj = {};
        if (distanceData) {
          obj.name = user.name;
          obj.fpotype = user.fpotype;
          obj.mithraType = user.mithraType;
          obj.userType = user.userType;
          obj.mobilenumber = user.mobilenumber;
          let distance = parseFloat(distanceData.distanceTravelledInKms);
          obj.distance = distance.toFixed(2);
          let distUrl = distanceData.gpsCoordinates;
          const checkObj = await getCheckTime(distUrl);
          obj.checkIn = checkObj.checkIn;
          obj.checkOut = checkObj.checkOut;
          totalData.push(obj);
        }
        if (totalData.length > 0) {
          setListofUsers(totalData);
          setIsDataLoading(false);
        }
      }));
    }
  }

  const handleDateChange = (e) => {
    setIsDataLoading(true);
    let dateString = e.target.value;
    let dateArray = dateString.split("-");
    let dd = dateArray[2];
    let mm = dateArray[1];
    let yyyy = dateArray[0];
    let newDate = dd + "-" + mm + "-" + yyyy;
    let displayDate = yyyy + "-" + mm + "-" + dd;
    setTodayDate(newDate);
    setDisplayDate(displayDate);
    getDistanceData();
  }

  const handleDownloadData = () => {
    let { todayDate, listofusers } = this.state;

    const csvArray = [
      [
        'Farmer Name',
        'FPO Type',
        'Mitra Type',
        'User Type',
        'Mobile Number',
        'Check-In Time',
        'Check-Out Time',
        'Distance Travelled'
      ],
    ];
    const farmerData = listofusers;
    //   const ele = Object.keys(farmerData);
    // console.log('farmerData:-- ', farmerData)
    listofusers.map(item => {
      const array = [];
      array.push(
        item.name || 'NA',
        item.fpotype || 'NA',
        item.mithraType || 'NA',
        item.userType || 'NA',
        item.mobilenumber || 'NA',
        item.checkIn || 'NA',
        item.checkOut || 'NA',
        item.distance || 'NA'
      );
      csvArray.push(array);
      return '';
    });
    const wb = XLSX.utils.book_new();
    wb.Props = {
      Title: 'DB DATA',
      Subject: 'Test',
      Author: 'Dvara',
      // CreatedDate: new Date(2017, 12, 19),
    };
    // csvArray.sort(this.compareTimeStamp);
    wb.SheetNames.push('DB Sheet');
    const ws = XLSX.utils.aoa_to_sheet(csvArray);
    wb.Sheets['DB Sheet'] = ws;
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const jsonBlob = new Blob(
      [this.s2ab(wbout)],
      {
        type: 'application/octet-stream',
      },
      'data.xlsx',
    );
    const link = window.URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = link;
    a.download = `user_distance_${todayDate}.xlsx`;
    // this.setState({ progress: false });
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(link);
    }, 0);
  }


  return (
    <UserDistanceContainer>
      <Helmet>
        <meta name="description" content="Description of UserDistance" />
      </Helmet>
      {props.loading ? (
        <PageLoading />
      ) : (
        <React.Fragment>
          <Header
            title="Mitra Distance Travelled Dashboard"
            url="/ops/homePage"
            logout
          />
          <UserDistanceWrapper>
            <NavBar url="/ops/homePage" />
            <OPSHomePageContainerWrapper>
              <div
                className="content"
                style={{
                  backgroundColor: '#fdfdfd',
                  marginTop: '70px',
                  width: '100%',
                }}
              >
                <br />
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", margin: "10px 0px 10px 0px" }}>
                  <div style={{ display: "flex" }}>
                    <span style={{ fontWeight: "bolder", fontSize: "18px" }}> Filter By Date :</span>
                    <input type='date' style={{ marginLeft: "10px", border: "1px solid #000", width: "170px", fontSize: "18px" }} value={displayDate} onChange={handleDateChange} />
                  </div>
                </div>
                <br />
                {!isDataLoading &&
                  <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <button onClick={handleDownloadData}
                      className="btn btn-primary"
                      style={{
                        background: '#90d7a5',
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginRight: '50px',
                        width: '150px'
                      }}
                    >
                      Export Excel
                    </button>
                  </div>
                }
                <br />
                {isDataLoading ?
                  <div style={{ width: "100%" }}>
                    <CowLoading />
                  </div> :
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>FPO Type</th>
                        <th>Mithra Type</th>
                        <th>User Type</th>
                        <th>Mobile Number</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Distance Travelled</th>
                      </tr>
                    </thead>

                    <tbody>
                      {listofusers.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item['name']}</td>
                            <td>{item['fpotype']}</td>
                            <td>{item['mithraType']}</td>
                            <td>{item['userType']}</td>
                            <td>{item['mobilenumber']}</td>
                            <td>{item['checkIn']}</td>
                            <td>{item['checkOut']}</td>
                            <td style={{ color: item['distance'] != 'NA' ? "#0000ff" : "#000", fontWeight: item['distance'] != 'NA' ? "bolder" : "normal" }}>{item['distance'] != "NA" ? `${item['distance']} km` : item['distance']}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                }
              </div>
              {listofusers.length === 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    background: 'white',
                  }}
                >
                  <h3>No Records Found</h3>
                </div>
              )}
              <div ref={scrollDiv}>
                {showMap ? (
                  <Map
                    google={props.google}
                    zoom={8}
                    visible={showMap}
                    initialCenter={{ lat, lng }}
                  >
                    <Marker position={{ lat, lng }} />
                  </Map>
                ) : (
                  ''
                )}
              </div>
            </OPSHomePageContainerWrapper>
          </UserDistanceWrapper>
        </React.Fragment>
      )}
    </UserDistanceContainer>
  );
}

UserDistance.propTypes = {
  onFetchFarmerData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  google: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  UserDistance: makeSelectUserDistance(),
  loading: selectLoading(),
  dataList1: selectDataList1(),
  cattleData: selectCattleData(),
  farmerData: selectFarmerDetails(),
  open: selectFilterOpen(),
  filter: selectFilterValue(),
  month: selectMonth(),
  year: selectYear(),
});

function mapDispatchToProps(dispatch) {
  return {
    onFetchFarmerData: () => dispatch(fetchFarmerData()),
    onUpdateFilterOpen: data => dispatch(updateIsFilterOpen(data)),
    onUpdateMonth: data => dispatch(updateMonth(data)),
    onUpdateYear: data => dispatch(updateYear(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'UserDistance', reducer });
const withSaga = injectSaga({ key: 'UserDistance', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  GoogleAuth,
)(UserDistance);
