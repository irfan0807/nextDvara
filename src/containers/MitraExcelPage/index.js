import React, { useState, useEffect } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import * as XLSX from 'xlsx';
import axios from 'axios';

import {
  XLPageContainer,
  XLPageHeaderContainer,
  XLPageWrapper,
  Buttton,
} from './elements';

import { firestore } from '../../firebase';

const XLuploader = (props) => {
  const [pendingJson, setPendingJson] = useState([]);
  const [completedJson, setCompletedJson] = useState([]);
  const [resMsg, setResMsg] = useState('');
  const [runoUsers, setRunoUsers] = useState([]);

  useEffect(() => {
    // Fetch Runo users here
    // setRunoUsers(result);
  }, []);

  const file1Change = (event) => {
    event.preventDefault();
    const files = event.target.files;
    const f = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      let readedData = XLSX.read(data, { type: 'binary' });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setPendingJson(dataParse);
    };

    reader.readAsBinaryString(f);
  }

  const file2Change = (event) => {
    event.preventDefault();
    const files = event.target.files;
    const f = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      let readedData = XLSX.read(data, { type: 'binary' });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setCompletedJson(dataParse);
    };

    reader.readAsBinaryString(f);
  }

  const handleSubmit = async () => {
    const pendingCounts = {};
    const completedCounts = {};

    if (pendingJson.length > 0 && completedJson.length > 0) {
      pendingJson.forEach(element => {
        const mobile = element[12];
        pendingCounts[mobile] = (pendingCounts[mobile] || 0) + 1;
      });

      completedJson.forEach(element => {
        const mobile = element[14];
        completedCounts[mobile] = (completedCounts[mobile] || 0) + 1;
      });

      updateLeads(pendingCounts, 'pending');
      updateLeads(completedCounts, 'completed');
    } else {
      setResMsg('Error !! Please upload Excel File !');
    }
  }

  const updateLeads = async (jsonData, type) => {
    Object.keys(jsonData).forEach(async (key, index) => {
      const dbRef = firestore.collection('/Files/runoData/allocations').doc(key);
      const value = jsonData[key];
      if (type === 'pending') {
        await dbRef.set({ pending: value }, { merge: true });
      } else if (type === 'completed') {
        await dbRef.set({ completed: value }, { merge: true });
      }

      if (index === Object.keys(jsonData).length - 1) {
        setResMsg('Allocation Counts Updated Successfully');
      }
    });
  }

  return (
    <XLPageContainer>
      <React.Fragment>
        <Header title="Surabhi Mitra Dev" url="/ops/homePage" logout />
        <XLPageHeaderContainer>
          <NavBar url="/ops/homePage" />
          <XLPageWrapper>
            <div style={{ width: '70%', background: '#fff', padding: '20px' }}>
              <div style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h4 style={{ marginRight: '10px' }}>Upload Pending Allocation XL File  : </h4>
                <input type="file" required name="image" onChange={file1Change} />
                <a target="_blank" href="http://34.105.16.205:4943/bcImages/Files/pending_sample.xlsx" download="Pending_sample.xlsx">Download Sample file</a>
              </div>
              <div style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h4 style={{ marginRight: '10px' }}>Upload Completed Allocation XL File  : </h4>
                <input type="file" required name="image" onChange={file2Change} />
                <a target="_blank" href="http://34.105.16.205:4943/bcImages/Files/complete_sample.xlsx" download="complete_sample.xlsx">Download Sample file</a>
              </div>
              <div style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Buttton onClick={handleSubmit}>Submit</Buttton>
              </div>
              <div
                style={{
                  textAlign: 'center',
                  color: resMsg.startsWith('Error') ? 'red' : 'green',
                  fontWeight: 'bold',
                }}
              >
                {resMsg}
              </div>
            </div>
          </XLPageWrapper>
        </XLPageHeaderContainer>
      </React.Fragment>
    </XLPageContainer>
  );
}

export default GoogleApiWrapper({
  apiKey: 'YOUR_API_KEY'
})(XLuploader);
