/* eslint-disable react/no-unused-state */
/* eslint-disable no-var */
/**
 *
 * UserManagement
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import makeSelectUserManagement, {
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
  UserManagementContainer,
  UserManagementWrapper,
  OPSHomePageContainerWrapper,
} from './elements';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import deleteimag from '../../images/deleteLogo.png';

const UserManagement = ({ onFetchFarmerData, loading }) => {
  const [name, setName] = useState('');
  const [fpovalue, setFpovalue] = useState('');
  const [mithravalue, setMithravalue] = useState('');
  const [agentmobilenumber, setAgentMobileNumber] = useState('');
  const [successmsg, setSuccessMsg] = useState('');
  const [fpodetails, setFpodetails] = useState([]);
  const [mithraType, setMithraType] = useState([]);
  const [listofusers, setListofUsers] = useState([]);

  useEffect(() => {
    onFetchFarmerData();

    database.ref('/Files/fpodetails').once('value', async (snap) => {
      const data = snap.val();
      const fpodetailsarray = Object.keys(data).map((records) => data[records]);
      setFpodetails(fpodetailsarray);
    });

    setFpovalue('');
    setMithravalue('');
    setListofUsers([]);
    handleDetails();
  }, [onFetchFarmerData]);

  const handleDetails = () => {
    database.ref('Files/restrict_user').on('value', (snap) => {
      const data = snap.val();
      const usersarray = Object.keys(data).map((records) => ({
        name: data[records]['mithraName'],
        fpotype: data[records]['fpoName'],
        mithraType: data[records]['mithraType'],
        mobilenumber: data[records]['mobileNumber'],
      }));
      setListofUsers(usersarray);
    });

    database.ref('Files/mithraType').once('value', (snap) => {
      const data = snap.val();
      setMithraType(Object.keys(data));
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    database.ref('Files/restrict_user/').once('value', (snap) => {
      const result = snap.val();
      const obj = {};
      const keys = Object.keys(result);
      keys.forEach((i) => {
        obj[result[i]['mobileNumber']] = result[i]['fpoName'];
      });

      if (obj['+91' + agentmobilenumber]) {
        setSuccessMsg(
          'User is already added under ' + obj['+91' + agentmobilenumber]
        );
      } else {
        const usersRef = database.ref('Files/restrict_user/');
        const updates = {
          mithraName: name.trim(),
          fpoName: fpovalue.trim(),
          mithraType: mithravalue.trim(),
          mobileNumber: `+91${agentmobilenumber}`,
        };
        usersRef.child(`+91${agentmobilenumber.trim()}`).update(updates);
        setSuccessMsg('User is added successfully');
      }
    });
  };

  const handleChange = (event) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    }
    if (event.target.name === 'fpovalue') {
      setFpovalue(event.target.value.trim());
      setMithravalue('');
      setMithraType([]);
      setListofUsers([]);
      handleDetails();
    }

    if (event.target.name === 'mithraType') {
      setMithravalue(event.target.value.trim());
      setListofUsers([]);
      handleDetails();
    }

    if (event.target.name === 'agentmobilenumber') {
      setAgentMobileNumber(event.target.value.trim());
    }
  };

  const deleteRow = async (row, index) => {
    await database.ref(`Files/restrict_user/${row.mobilenumber}`).remove();
  };

  return (
    <UserManagementContainer>
      <Helmet>
        <meta name="description" content="Description of UserManagement" />
      </Helmet>
      {loading ? (
        <PageLoading />
      ) : (
        <React.Fragment>
          <Header
            title="Mithra User Management Dashboard"
            url="/ops/homePage"
            logout
          />
          <UserManagementWrapper>
            <NavBar url="/ops/homePage" />
            <OPSHomePageContainerWrapper>
              <div
                className="content"
                style={{
                  backgroundColor: '#fdfdfd',
                  marginTop: '2%',
                  width: '100%',
                }}
              >
                <br />
                <div>
                  <br />
                  <form onSubmit={handleClick}>
                    <div
                      className="row"
                      style={{ marginLeft: 'auto', marginTop: 'auto' }}
                    >
                      <h3>Add FPO Type</h3>
                      <div className="col-md-8">
                        <select
                          className="form-control"
                          required
                          name="fpovalue"
                          onChange={handleChange}
                        >
                          <option value="TEST">Select FPO Type</option>
                          {fpodetails.map((record, i) => (
                            <option key={i} value={record}>
                              {record}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <br />
                    <div
                      className="row"
                      style={{ marginLeft: 'auto', marginTop: 'auto' }}
                    >
                      <h3>Add Mithra Type</h3>
                      <div className="col-md-8">
                        <select
                          className="form-control"
                          required
                          name="mithraType"
                          onChange={handleChange}
                        >
                          <option value="">Select Mithra Type</option>
                          {mithraType.map((record, i) => (
                            <option key={i} value={record}>
                              {record}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <br />
                    <div
                      className="row"
                      style={{ marginLeft: 'auto', marginTop: 'auto' }}
                    >
                      <div className="col-md-4" style={{ width: '30%' }}>
                        <input
                          type="text"
                          placeholder="Name"
                          name="name"
                          value={name}
                          id="name"
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-3">
                        <input
                          type="text"
                          pattern="[6789][0-9]{9}"
                          title="Please enter a valid phone number"
                          placeholder="Mobile Number"
                          value={agentmobilenumber}
                          name="agentmobilenumber"
                          id="agentmobilenumber"
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-3">
                        <input
                          type="submit"
                          name="submit"
                          id="submit"
                          disabled={
                            !name ||
                            !fpovalue ||
                            !(name && agentmobilenumber)
                          }
                          className="btn btn-primary"
                          value="Register"
                        />
                      </div>
                    </div>
                  </form>
                  <div
                    style={{
                      color: successmsg.startsWith('User is already')
                        ? 'red'
                        : 'green',
                      fontWeight: 'bold',
                    }}
                  >
                    {successmsg}
                  </div>
                  <br />
                </div>
                <br />
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>FPO Type</th>
                      <th>Mithra Type</th>
                      <th>Mobile Number</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listofusers.map((item, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item['name']}</td>
                        <td>{item['fpotype']}</td>
                        <td>{item['mithraType']}</td>
                        <td>{item['mobilenumber']}</td>
                        <td>
                          <img
                            onClick={() => {
                              deleteRow(item, i);
                            }}
                            style={{
                              height: '20px',
                              width: '20px',
                              cursor: 'pointer',
                              marginLeft: '40%',
                            }}
                            src={deleteimag}
                          />{' '}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </OPSHomePageContainerWrapper>
          </UserManagementWrapper>
        </React.Fragment>
      )}
    </UserManagementContainer>
  );
};

UserManagement.propTypes = {
  onFetchFarmerData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  UserManagement: makeSelectUserManagement(),
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
    onUpdateFilterOpen: (data) => dispatch(updateIsFilterOpen(data)),
    onUpdateMonth: (data) => dispatch(updateMonth(data)),
    onUpdateYear: (data) => dispatch(updateYear(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'UserManagement', reducer });
const withSaga = injectSaga({ key: 'UserManagement', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(UserManagement);
