/* eslint-disable no-var */
/**
 *
 * OperationsHomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import XLSX from 'xlsx';
import Select from 'react-select';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectOperationsHomePage, {
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
import { database } from '../../firebase';

import {
  OperationsHomePageContainer,
  OperationsHomePageWrapper,
  LogoShowingContainer,
  StatusShowingContainer,
  StatusShowingContainerWrapper,
  StatusShowingTitle,
  OPSHomePageContainerWrapper,
  OpsListShowingContainer,
  DateShowingWrapper,
  OpsListShowingContainerWrapper,
  PendingListContainer,
  PendingListTitle,
  PendingListWrapper,
  CompletedDetailsDesign,
  DownloadXLButtonWrapper,
  DownloadXLButton,
  BulkEditButton,
  UserManageButton,
  FilterBoxWrapper,
  CattleNameWrapper,
  FarmerNameWrapper,
  FarmerIconWrapper,
  FarmerNameShow,
  FilterContainer,
  FilterBoxContainer,
  MonthByYear,
  MonthByYearTitle,
  InputField,
  DropDownWrapperContainer,
  DropDownCover,
  MFIListShowingContainerWrapper,
  CattleListContainer,
  CattleListTitle,
  CattleListWrapper,
  ItemsNotExist,
  AllocationButton,
  CashCollectionButton
} from './elements';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
// eslint-disable-next-line import/first
import { keyframes } from 'styled-components';
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prefer-stateless-function */
export class OperationsHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Months: new Map([
        ['1', 'Jan'],
        ['2', 'Feb'],
        ['3', 'Mar'],
        ['4', 'Apr'],
        ['5', 'May'],
        ['6', 'Jun'],
        ['7', 'Jul'],
        ['8', 'Aug'],
        ['9', 'Sep'],
        ['10', 'Oct'],
        ['11', 'Nov'],
        ['12', 'Dec'],
      ]),
      rfid: '',
      rmid: '',
      rvid: '',
      // cashflowLoading: false,
    };
  }
  componentDidMount() {
    this.props.onFetchFarmerData();
    // console.log(this.props)
  }

  // Filter by farmer mobile
  handleOnChangeFarmer = event => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ rfid: event.target.value });
  };

  // Filter by mitra mobile
  handleOnChangeMitra = event => {
    // eslint-disable-next-line react/no-unused-state
    // console.log('rmid', this.state.rmid)
    this.setState({ rmid: event.target.value });
  };
  // Filter by village
  handleOnChangeVillage = event => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ rvid: event.target.value });
  };

  compare = (a, b) => {
    const x = a.split('-');
    const d1 = new Date(x[2], x[1], x[0]);
    const y = b.split('-');
    const d2 = new Date(y[2], y[1], y[0]);
    return d2 - d1;
  };

  compareTimeStamp = (a, b) => {
    // eslint-disable-next-line no-param-reassign
    if (!a[0]) a[0] = '01:01:1970_00:00:00';
    // eslint-disable-next-line no-param-reassign
    if (!b[0]) b[0] = '01:01:1970_00:00:00';
    if (a[0] === 'Time Stamp' || b[0] === 'Time Stamp' || !a[0] || !b[0])
      return 1;
    const aDate = a[0].split('_');
    const aData = aDate[0].split(':');
    const aTime = aDate[1].split(':');
    const fDate = new Date(
      aData[2],
      aData[1],
      aData[0],
      aTime[0],
      aTime[1],
      aTime[2],
      0,
    );
    const bDate = b[0].split('_');
    const bData = bDate[0].split(':');
    const bTime = bDate[1].split(':');
    const sDate = new Date(
      bData[2],
      bData[1],
      bData[0],
      bTime[0],
      bTime[1],
      bTime[2],
      0,
    );
    // eslint-disable-next-line no-param-reassign
    if (a[0] === '01:01:1970_00:00:00') a[0] = undefined;
    // eslint-disable-next-line no-param-reassign
    if (b[0] === '01:01:1970_00:00:00') b[0] = undefined;
    return sDate - fDate;
  };

  // Download data
  handleXLButton = async () => {
    this.setState({ progress: true });
    const users = {};
    await database.ref('/Files/restrict_user').once('value', async snap => {
      const obj = snap.val();
      console.log('obj', obj);
      Object.keys(obj).forEach(key => {
        users[obj[key]] = key;
      });
    });
    const { farmerData } = this.props;
    const csvArray = [
      [
        'Farmer ID',
        'Farmer Name',
        'Farmer Mobile',
        'Mithra Name',
        'Mithra Mobile',
        'High Mark Score',
        'Jana Cust. ID',
        'Dvara Cust ID',
        'Village',
        'Date&Time',
        'lat',
        'lng',
      ],
    ];
    const ele = Object.keys(farmerData);
    // console.log('farmerData:-- ', farmerData)
    ele.map(item => {
      const array = [];
      array.push(
        farmerData[item].farmerID ? farmerData[item].farmerID : 'NA',
        farmerData[item].farmerName ? farmerData[item].farmerName : 'NA',
        farmerData[item].farmerMobile ? farmerData[item].farmerMobile : 'NA',
        farmerData[item].mithraName ? farmerData[item].mithraName : 'NA',
        farmerData[item].mithraMobile ? farmerData[item].mithraMobile : 'NA',
        farmerData[item].highmarkScore ? farmerData[item].highmarkScore : 'NA',
        farmerData[item].janaCustId ? farmerData[item].janaCustId : 'NA',
        farmerData[item].custId ? farmerData[item].custId : 'NA',
        farmerData[item].village ? farmerData[item].village : 'NA',
        farmerData[item].timeStamp ? farmerData[item].timeStamp : 'NA',
        farmerData[item].lat ? farmerData[item].lat : 'NA',
        farmerData[item].lng ? farmerData[item].lng : 'NA',
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
    a.download = 'DB-Data.xlsx';
    this.setState({ progress: false });
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(link);
    }, 0);
  };

  s2ab = dataFile => {
    const buf = new ArrayBuffer(dataFile.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < dataFile.length; i += 1)
      view[i] = dataFile.charCodeAt(i);
    return buf;
  };

  // display farmer data by date
  handleFilterByMonth = () => {
    const { month, year } = this.props;

    // console.log('filter by month called')

    var newmonth = this.props.month;
    if (this.props.month.length === 1) {
      newmonth = `0${newmonth}`;
    }
    if (month && year) {
      const { dataList1 } = this.props;
      // const pending = dataList.filter(x => x.status === 'pending');
      // const completed = dataList.filter(x => x.status === 'completed');

      const allThree = [];

      const dates = [
        ...new Set(
          dataList1.map(x => {
            const dummy = x.date.split('-');
            if (
              dummy[0] === year &&
              dummy[1] === newmonth &&
              !this.state.rfid &&
              !this.state.rmid &&
              !this.state.rvid
            ) {
              return x.date;
            }

            if (
              this.state.rfid &&
              x.farmerMobile.includes(this.state.rfid) &&
              (this.state.rmid && x.mithraMobile.includes(this.state.rmid)) &&
              ((this.state.rvid && x.village.includes(this.state.rvid)) ||
                (this.state.rvid &&
                  x.village.toLowerCase().includes(this.state.rvid)) ||
                (this.state.rvid &&
                  x.village.toUpperCase().includes(this.state.rvid)))
            ) {
              // console.log('all three fields clicked')
              // // console.log('which id is in all three fields:--', x.id)
              allThree.push(x.id);
            } else if (
              this.state.rfid &&
              x.farmerMobile.includes(this.state.rfid) &&
              (this.state.rmid && x.mithraMobile.includes(this.state.rmid))
            ) {
              // console.log('came into rfid and rmid id:-- ')
              return x.id;
            } else if (
              this.state.rmid &&
              x.mithraMobile.includes(this.state.rmid) &&
              ((this.state.rvid && x.village.includes(this.state.rvid)) ||
                (this.state.rvid &&
                  x.village.toLowerCase().includes(this.state.rvid)) ||
                (this.state.rvid &&
                  x.village.toUpperCase().includes(this.state.rvid)))
            ) {
              // console.log('came into rmid and rvid id:-- ')
              return x.id;
            } else if (
              ((this.state.rvid && x.village.includes(this.state.rvid)) ||
                (this.state.rvid &&
                  x.village.toLowerCase().includes(this.state.rvid)) ||
                (this.state.rvid &&
                  x.village.toUpperCase().includes(this.state.rvid))) &&
              (this.state.rfid && x.farmerMobile.includes(this.state.rfid))
            ) {
              // console.log('came into rfid and rvid id:-- ')
              return x.id;
            } else if (
              this.state.rfid &&
              x.farmerMobile.includes(this.state.rfid)
            ) {
              return x.id;
            } else if (
              this.state.rmid &&
              x.mithraMobile.includes(this.state.rmid)
            ) {
              return x.id;
            } else if (
              this.state.rvid &&
              x.village.toLowerCase().includes(this.state.rvid)
            ) {
              return x.id;
            } else if (
              this.state.rvid &&
              x.village.toUpperCase().includes(this.state.rvid)
            ) {
              return x.id;
            } else if (this.state.rvid && x.village.includes(this.state.rvid)) {
              return x.id;
            }
            return '';
          }),
        ),
      ].sort(this.compare);

      // console.log('all three fields data id:--', allThree)

      // console.log('dates', dates)
      if (
        this.state.rfid &&
        this.state.rmid &&
        this.state.rvid &&
        allThree.length === 0
      ) {
        return (
          <MFIListShowingContainerWrapper>
            <CattleListContainer>
              <CattleListTitle />
              <CattleListWrapper>
                <ItemsNotExist>Zero items found! </ItemsNotExist>
              </CattleListWrapper>
            </CattleListContainer>
          </MFIListShowingContainerWrapper>
        );
      }
      if ((dates.length === 1 && dates[0] === '') || dates.length === 0)
        return (
          <MFIListShowingContainerWrapper>
            <CattleListContainer>
              <CattleListTitle />
              <CattleListWrapper>
                <ItemsNotExist>Zero items found! </ItemsNotExist>
              </CattleListWrapper>
            </CattleListContainer>
          </MFIListShowingContainerWrapper>
        );

      let realDate;
      let currentComplete;
      let finalData = [];
      const rmidData = [];
      const allThreeFieldsFilteredData = [];

      if (!this.state.rfid && !this.state.rmid && !this.state.rvid) {
        dates.map(x => {
          if (x === '') return '';
          currentComplete = dataList1.filter(val => val.date === x);
          finalData.push(currentComplete);
        });
      } else if (this.state.rfid && this.state.rmid && this.state.rvid) {
        console.log('came to all catogory');
        console.log('allThree data in filtering:-- ', allThree);
        const exactFilteredData = dataList1.filter(
          val => val.id === allThree[0],
        );
        console.log('exactFilteredData:-- ', exactFilteredData);
        allThreeFieldsFilteredData.push(exactFilteredData);
      } else if (this.state.rfid && this.state.rmid) {
        const rmidRfidObj = [];
        dates.map(x => {
          if (x === '') return '';
          currentComplete = dataList1.filter(val => val.id === x);
          rmidRfidObj.push(currentComplete);
        });

        const uniqueDates = new Set();

        rmidRfidObj.map(obj => {
          for (const item of obj) {
            uniqueDates.add(item.date);
          }
        });

        let count = 0;
        uniqueDates.forEach(date => {
          count += 1;
          // console.log('dates:-- ', date)
          const dataBasedOnDate = rmidRfidObj.filter(
            val => val[0].date === date,
          );
          // console.log('data based on date',dataBasedOnDate)
          finalData.push(dataBasedOnDate);
        });
      } else if (this.state.rmid && this.state.rvid) {
        const rmidRvidObj = [];
        dates.map(x => {
          if (x === '') return '';
          currentComplete = dataList1.filter(val => val.id === x);
          rmidRvidObj.push(currentComplete);
        });

        const uniqueDates = new Set();

        rmidRvidObj.map(obj => {
          for (const item of obj) {
            uniqueDates.add(item.date);
          }
        });

        let count = 0;
        uniqueDates.forEach(date => {
          count += 1;
          // console.log('dates:-- ', date)
          const dataBasedOnDate = rmidRvidObj.filter(
            val => val[0].date === date,
          );
          // console.log('data based on date',dataBasedOnDate)
          finalData.push(dataBasedOnDate);
        });
      } else if (this.state.rvid && this.state.rfid) {
        const rmidObj = [];
        const rvidRfidObj = [];
        dates.map(x => {
          if (x === '') return '';
          currentComplete = dataList1.filter(val => val.id === x);
          rvidRfidObj.push(currentComplete);
        });

        const uniqueDates = new Set();

        rvidRfidObj.map(obj => {
          for (const item of obj) {
            uniqueDates.add(item.date);
          }
        });

        let count = 0;
        uniqueDates.forEach(date => {
          count += 1;
          // console.log('dates:-- ', date)
          const dataBasedOnDate = rvidRfidObj.filter(
            val => val[0].date === date,
          );
          // console.log('data based on date',dataBasedOnDate)
          finalData.push(dataBasedOnDate);
        });
      } else if (this.state.rmid) {
        const rmidObj = [];
        const filteredrmidData = [];
        dates.map(x => {
          if (x === '') return '';
          currentComplete = dataList1.filter(val => val.id === x);
          rmidObj.push(currentComplete);
        });

        const uniqueDates = new Set();

        rmidObj.map(obj => {
          for (const item of obj) {
            uniqueDates.add(item.date);
          }
        });

        let count = 0;
        uniqueDates.forEach(date => {
          count += 1;
          // console.log('dates:-- ', date)
          const dataBasedOnDate = rmidObj.filter(val => val[0].date === date);
          // console.log('data based on date',dataBasedOnDate)
          finalData.push(dataBasedOnDate);
        });
      } else if (this.state.rfid) {
        console.log('came to rfid');
        const rfidObj = [];
        const filteredrfidData = [];
        dates.map(x => {
          if (x === '') return '';
          currentComplete = dataList1.filter(val => val.id === x);
          rfidObj.push(currentComplete);
        });

        const uniqueDates = new Set();

        rfidObj.map(obj => {
          for (const item of obj) {
            uniqueDates.add(item.date);
          }
        });

        let count = 0;
        uniqueDates.forEach(date => {
          count += 1;
          // console.log('dates:-- ', date)
          const dataBasedOnDate = rfidObj.filter(val => val[0].date === date);
          // console.log('data based on date',dataBasedOnDate)
          finalData.push(dataBasedOnDate);
        });
      } else if (this.state.rvid) {
        console.log('came to rvid');
        const rvidObj = [];
        const filteredrvidData = [];
        dates.map(x => {
          if (x === '') return '';
          currentComplete = dataList1.filter(val => val.id === x);
          rvidObj.push(currentComplete);
        });

        const uniqueDates = new Set();

        rvidObj.map(obj => {
          for (const item of obj) {
            uniqueDates.add(item.date);
          }
        });

        let count = 0;
        uniqueDates.forEach(date => {
          count += 1;
          // console.log('dates:-- ', date)
          const dataBasedOnDate = rvidObj.filter(val => val[0].date === date);
          // console.log('data based on date',dataBasedOnDate)
          finalData.push(dataBasedOnDate);
        });
      }

      // console.log('final data', finalData)

      if (this.state.rfid || this.state.rmid || this.state.rvid) {
        // finalData[0][0][0].date ? console.log('single data', finalData[0][0][0].date)  : null ;

        const startDate = new Date(finalData[0][0][0].date);
        const endDate = new Date(finalData[finalData.length - 1][0][0].date);

        // console.log('start date:-- ', startDate)
        // console.log('end date:-- ', endDate)

        const filteredData = finalData
          .filter(item => {
            const itemDate = new Date(item[0][0].date);
            return itemDate >= startDate && itemDate <= endDate;
          })
          .sort((a, b) => new Date(b[0][0].date) - new Date(a[0][0].date));

        // console.log('filtered data:-- ',filteredData);
        finalData = filteredData;
      }

      if (!this.state.rfid && !this.state.rmid && !this.state.rvid) {
        // console.log('came into general')
        return finalData.map(dataObj => (
          <OpsListShowingContainerWrapper key={Math.random()}>
            {!this.state.rfid &&
              !this.state.rmid &&
              !this.state.rvid && (
                <DateShowingWrapper>{dataObj[0].date}</DateShowingWrapper>
              )}
            {this.state.rfid && (
              <DateShowingWrapper>{dataObj[0].date}</DateShowingWrapper>
            )}
            {this.state.rmid && (
              <DateShowingWrapper>{dataObj[0].date}</DateShowingWrapper>
            )}
            {this.state.rvid && (
              <DateShowingWrapper>{dataObj[0].date}</DateShowingWrapper>
            )}
            <PendingListContainer>
              <PendingListTitle>Farmer Data</PendingListTitle>
              <PendingListWrapper>
                {dataObj.map(flag => (
                  <CompletedDetailsDesign
                    key={flag.id}
                    to={`/vetScore/${flag.id}`}
                    target="_blank"
                  >
                    <CattleNameWrapper>{flag.farmerMobile}</CattleNameWrapper>
                    <FarmerNameWrapper>
                      <FarmerIconWrapper />
                      <FarmerNameShow>{flag.farmerName}</FarmerNameShow>
                    </FarmerNameWrapper>
                  </CompletedDetailsDesign>
                ))}
              </PendingListWrapper>
            </PendingListContainer>
          </OpsListShowingContainerWrapper>
        ));
      } else if (this.state.rfid && this.state.rmid && this.state.rvid) {
        // console.log('came to all three fields in display farmer details')
        return allThreeFieldsFilteredData.map(dataObj => (
          <OpsListShowingContainerWrapper key={Math.random()}>
            <DateShowingWrapper>{dataObj[0].date}</DateShowingWrapper>
            <PendingListContainer>
              <PendingListTitle>Farmer Data</PendingListTitle>
              <PendingListWrapper>
                {dataObj.map(flag => (
                  <CompletedDetailsDesign
                    key={flag.id}
                    to={`/vetScore/${flag.id}`}
                    target="_blank"
                  >
                    <CattleNameWrapper>{flag.farmerMobile}</CattleNameWrapper>
                    <FarmerNameWrapper>
                      <FarmerIconWrapper />
                      <FarmerNameShow>{flag.farmerName}</FarmerNameShow>
                    </FarmerNameWrapper>
                  </CompletedDetailsDesign>
                ))}
              </PendingListWrapper>
            </PendingListContainer>
          </OpsListShowingContainerWrapper>
        ));
      }
      // console.log('came into rmid,rfid, and rvid farmer data display')

      return finalData.map(dataObj => (
        <OpsListShowingContainerWrapper key={Math.random()}>
          <DateShowingWrapper>{dataObj[0][0].date}</DateShowingWrapper>

          <PendingListContainer>
            <PendingListTitle>Farmer Data</PendingListTitle>
            <PendingListWrapper>
              {dataObj.map(flag => (
                <CompletedDetailsDesign
                  key={flag.id}
                  to={`/vetScore/${flag[0].id}`}
                  target="_blank"
                >
                  <CattleNameWrapper>{flag[0].farmerMobile}</CattleNameWrapper>
                  <FarmerNameWrapper>
                    <FarmerIconWrapper />
                    <FarmerNameShow>{flag[0].farmerName}</FarmerNameShow>
                  </FarmerNameWrapper>
                </CompletedDetailsDesign>
              ))}
            </PendingListWrapper>
          </PendingListContainer>
        </OpsListShowingContainerWrapper>
      ));
    }
    return '';
  };

  // change the month
  handleMonthChange = selectedOption => {
    // eslint-disable-next-line no-console
    // console.log(selectedOption.value)
    this.props.onUpdateMonth(selectedOption.value);
  };

  // change the year
  handleYearChange = selectedOption => {
    // eslint-disable-next-line no-console
    this.props.onUpdateYear(selectedOption.value);
  };

  // filter data by Month/Year
  handleBYMonth = e => {
    e.preventDefault();
    const { month, year } = this.state;
    if (!year || !month) alert('choose the Month & Year');
    else this.props.onUpdateFilterOpen('filter');
  };

  render() {
    const { loading, dataList1, open, month, year, farmerData } = this.props;
    // console.log('farmerData in render:-- ', typeof(farmerData))
    // console.log('farmerData in render:-- ', Object.keys(farmerData).length)
    const { Months } = this.state;
    const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;
    return (
      <OperationsHomePageContainer>
        <Helmet>
          {/* <title>OperationsHomePage</title> */}
          <meta
            name="description"
            content="Description of OperationsHomePage"
          />
        </Helmet>
        {loading ? (
          <PageLoading />
        ) : (
          <React.Fragment>
            <Header title="Surabhi Mitra Dev" url="/ops/homePage" logout />
            <OperationsHomePageWrapper>
              <NavBar url="/ops/homePage" />
              <OPSHomePageContainerWrapper>
                <LogoShowingContainer>
                  <StatusShowingContainer>
                    <StatusShowingContainerWrapper>
                      <StatusShowingTitle>Total Farmers</StatusShowingTitle>
                      {/* <StatusShowingTitle color="#35B804">
                        Scored Cattle
                      </StatusShowingTitle>
                      <StatusShowingTitle color="#F7561E">
                        Pending Cattle
                      </StatusShowingTitle> */}
                    </StatusShowingContainerWrapper>
                    <StatusShowingContainerWrapper>
                      <StatusShowingTitle>:</StatusShowingTitle>
                      {/* <StatusShowingTitle>:</StatusShowingTitle>
                      <StatusShowingTitle>:</StatusShowingTitle> */}
                    </StatusShowingContainerWrapper>
                    <StatusShowingContainerWrapper>
                      <StatusShowingTitle>
                        {/* {dataList1.length} */}
                        {Object.keys(farmerData).length}
                      </StatusShowingTitle>
                      {/* <StatusShowingTitle color="#35B804">
                        {dataList.length - pCount}
                      </StatusShowingTitle>
                      <StatusShowingTitle color="#F7561E">
                        {pCount}
                      </StatusShowingTitle> */}
                    </StatusShowingContainerWrapper>
                  </StatusShowingContainer>
                </LogoShowingContainer>

                <UserManageButton
                  key="ops/notification"
                  to="/ops/notification"
                  target="_blank"
                >
                  Send Notification
                </UserManageButton>
                <DownloadXLButtonWrapper>
                  <DownloadXLButton onClick={() => this.handleXLButton()}>
                    Download Data
                  </DownloadXLButton>
                  <BulkEditButton
                    key="ops/BulkEdit"
                    to="/ops/BulkEdit"
                    target="_blank"
                  >
                    Bulk Edit
                  </BulkEditButton>
                  <AllocationButton
                    key="ops/mitraAllocations"
                    to="/ops/mitraAllocations"
                    target="_blank"
                  >
                    Upload Allocations
                  </AllocationButton>
                <UserManageButton
                  key="ops/CashCollection"
                  to="/ops/CashCollection"
                  target="_blank"
                >
                  Cash Collection
                </UserManageButton>
                
                <UserManageButton
                  key="ops/userdistance"
                  to="/ops/userdistance"
                  target="_blank"
                >
                  User Distance
                </UserManageButton>
                  <UserManageButton
                    key="ops/UserManagement"
                    to="/ops/UserManagement"
                    target="_blank"
                  >
                    User Management
                  </UserManageButton>
                </DownloadXLButtonWrapper>
                {this.state.progress && (
                  <div
                    className="loader"
                    style={{
                      marginRight: '10px',
                      border: '4px solid #f3f3f3',
                      borderRadius: '50%',
                      borderTop: '4px solid black',
                      width: '22px',
                      height: '22px',
                      animation: `${spin} 2s linear infinite`,
                    }}
                  />
                )}
                <FilterContainer>
                  {/* <FilterIconWrapper>
                    <Filter
                      height={20}
                      width={20}
                      onClick={() => this.props.onUpdateFilterOpen('open')}
                    />
                  </FilterIconWrapper> */}
                  {open ? (
                    <FilterBoxContainer>
                      {/* //   <ClearButton
                    //     type="button"
                    //     // onClick={() => this.props.onUpdateFilterOpen('filter')}
                    //   >
                    //     Clear
                    //   </ClearButton> */}
                      <FilterBoxWrapper>
                        {/* <CalenderWrapper>
                    //     <Calendar onChange={this.handleDatePick} />
                    //   </CalenderWrapper> */}
                        <MonthByYear onSubmit={this.handleBYMonth}>
                          <MonthByYearTitle>Month & Year :</MonthByYearTitle>
                          <DropDownWrapperContainer>
                            <DropDownCover>
                              <Select
                                placeholder="Month"
                                name="month"
                                options={[
                                  { value: '1', label: 'Jan' },
                                  { value: '2', label: 'Feb' },
                                  { value: '3', label: 'Mar' },
                                  { value: '4', label: 'Apr' },
                                  { value: '5', label: 'May' },
                                  { value: '6', label: 'Jun' },
                                  { value: '7', label: 'Jul' },
                                  { value: '8', label: 'Aug' },
                                  { value: '9', label: 'Sep' },
                                  { value: '10', label: 'Oct' },
                                  { value: '11', label: 'Nov' },
                                  { value: '12', label: 'Dec' },
                                ]}
                                value={{
                                  value: month,
                                  label: Months.get(month),
                                }}
                                onChange={this.handleMonthChange}
                              />
                            </DropDownCover>
                            <DropDownCover>
                              <Select
                                placeholder="Year"
                                name="year"
                                options={[
                                  { value: '2020', label: '2020' },
                                  { value: '2021', label: '2021' },
                                  { value: '2022', label: '2022' },
                                ]}
                                value={{ value: year, label: year }}
                                onChange={this.handleYearChange}
                              />
                            </DropDownCover>
                            {/* <GETButton type="submit">Get</GETButton> */}
                          </DropDownWrapperContainer>
                        </MonthByYear>
                        <div>
                          <InputField
                            type="text"
                            name="rmid"
                            placeholder="Mithra Mobile"
                            onChange={this.handleOnChangeMitra}
                            autoComplete="off"
                            required
                          />
                        </div>
                        <div>
                          <InputField
                            type="text"
                            name="rvid"
                            placeholder="Village"
                            onChange={this.handleOnChangeVillage}
                            autoComplete="off"
                            required
                          />
                        </div>
                        <div>
                          <InputField
                            type="text"
                            name="rfid"
                            placeholder="Farmer Mobile"
                            onChange={this.handleOnChangeFarmer}
                            autoComplete="off"
                            required
                          />
                        </div>
                      </FilterBoxWrapper>
                    </FilterBoxContainer>
                  ) : (
                    ''
                  )}
                </FilterContainer>
                <OpsListShowingContainer>
                  {this.handleFilterByMonth()}
                </OpsListShowingContainer>
              </OPSHomePageContainerWrapper>
            </OperationsHomePageWrapper>
          </React.Fragment>
        )}
      </OperationsHomePageContainer>
    );
  }
}

OperationsHomePage.propTypes = {
  onFetchFarmerData: PropTypes.func.isRequired,
  dataList1: PropTypes.array,
  loading: PropTypes.bool,
  onUpdateFilterOpen: PropTypes.func,
  open: PropTypes.bool,
  month: PropTypes.string,
  year: PropTypes.string,
  onUpdateMonth: PropTypes.func,
  onUpdateYear: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  operationshomepage: makeSelectOperationsHomePage(),
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

const withReducer = injectReducer({ key: 'operationsHomePage', reducer });
const withSaga = injectSaga({ key: 'operationsHomePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OperationsHomePage);
