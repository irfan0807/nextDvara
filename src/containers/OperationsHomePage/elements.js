import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Farmer from '../../icons/Farmer';

export const OperationsHomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const InputField = styled.input`
  border-radius: 2px;
  font-weight: 600;
  border: 2px solid lightgray;
  padding: 17px;
  height: 30px;
  margin-top: 3px;
  margin-left: 5px;
  width: ${props => props.width || '225px'};
  font-size: 12px;
  margin-bottom: 10px;
  ::placeholder {
    font-weight: 500;
  }
  ::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`;

export const OperationsHomePageWrapper = styled.div`
  display: flex;
`;

export const OPSDashBoardTitleBar = styled.div`
  width: 100%;
  text-align: center;
  background: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  border-bottom: 1px solid lightgray;
  padding: 10px 0;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
  transform: box-shadow 0.15s ease 0.1s;
`;

export const OPSHomePageContainerWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  flex: 1;
  padding: 10px 15px;
  background: rgba(211, 211, 211, 0.6);
  margin-top: 80px;
  /* width: 100%; */
`;

export const StatusShowingContainer = styled.div`
  display: flex;
  padding: 3px 0;
  justify-content: space-evenly;
  align-self: flex-end;
  margin: 10px;
  border-radius: 3px;
  border: 1px solid #03706b;
  width: 20%;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
  transform: box-shadow 0.15s ease 0.1s;
  background: linear-gradient(
    -120deg,
    rgba(45, 250, 241, 0.6),
    rgba(3, 112, 107, 0.3)
  );
  @media screen and (max-width: 32em) {
    width: 97%;
  }
`;

export const StatusShowingContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 5px;
`;
// color: rgb(114, 49, 12);
export const StatusShowingTitle = styled.div`
  text-align: left;
  font-size: 0.9rem;
  font-weight: bold;
  color: ${props => (props.color ? props.color : '#72310C')};
`;

export const OpsListShowingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const OpsListShowingContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 5px;
  margin-bottom: 5px;
  margin-top: 10px;
  padding-bottom: 10px;
  border-radius: 3px;
  border: 1px solid #03706b;
  background: rgba(255, 255, 255, 0.89);
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
  transform: box-shadow 0.15s ease 0.1s;
`;

export const DateShowingWrapper = styled.div`
  margin: 10px;
  text-align: left;
  font-weight: 600;
`;

export const PendingListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3px 10px;
  background: lightgray;
  border-radius: 3px;
  min-height: 100px;
`;

export const PendingListTitle = styled.div`
  text-align: left;
  margin-left: 10px;
  font-size: 0.78rem;
  margin-top: 10px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${props => props.color || '#000'};
  opacity: 0.73;
`;

export const PendingListWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-left: 10px;
`;

export const PendingDetailsDesign = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 45px;
  width: 130px;
  background: ${props =>
    props.isSelected
      ? `linear-gradient(to right bottom, #FB8B1C, #D18539)`
      : `linear-gradient(to right bottom, #FFBF00, #FB8B1C)`};
  border-radius: 3px;
  padding: 4px 8px;
  margin: 8px 10px;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
  transform: box-shadow 0.15s ease 0.1s;
  cursor: pointer;
  &:hover {
    height: 46px;
  }
  text-decoration: none;
`;

export const CompletedDetailsDesign = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 45px;
  width: 165px;
  background: ${props =>
    props.isSelected
      ? `linear-gradient(to right bottom, #FB8B1C, #D18539)`
      : `linear-gradient(to right bottom, rgb(45, 206, 137), #09b63c)`};
  padding: 3px 8px;
  margin: 8px 10px;
  font-weight: 600;
  border-radius: 3px;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
  transform: box-shadow 0.15s ease 0.1s;
  color: #ffffff;
  text-decoration: none;
`;

export const NotCompletedText = styled.h1`
  margin: 0;
  color: #0d656f;
  font-size: 1.5rem;
`;

export const LogoShowingContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const DownloadXLButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
  @media screen and (max-width: 32em) {
    width: 100%;
  }
`;

export const DownloadXLButton = styled(Button)`
  height: 31px;
  width: ${props => props.width || '150px'};
  @media screen and (max-width: 32em) {
    width: 90%;
  }
  margin-bottom: 10px;
  /* border: 1px solid #bd9a37; */
  /* background: linear-gradient(to left, #d5a109, #f9c01b); */
`;

export const BulkEditButtonWrapper = styled.div`
  display: flex;
  width: 35%;
  justify-content: space-evenly;
  flex-wrap: wrap;
  @media screen and (max-width: 22em) {
    width: 100%;
  }
  margin-top: -40px;
  margin-left: 45px;
`;

export const BulkEditButton = styled(Link)`
  height: 31px;
  width: '150px';
  margin-left: 10px;
  @media screen and (max-width: 32em) {
    width: 90%;
  }
  text-transform: uppercase;
  background: #3399ff;
  color: white;
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  outline: none;
  cursor: pointer;
  padding: 5px 45px;
  position: relative;
  text-decoration: none;
  margin-bottom: 10px;
  /* border: 1px solid #bd9a37; */
  /* background: linear-gradient(to left, #d5a109, #f9c01b); */
`;
export const UserButtonWrapper = styled.div`
  display: flex;
  width: 25%;
  justify-content: space-evenly;
  flex-wrap: wrap;
  @media screen and (max-width: 32em) {
    width: 70%;
  }
  margin-top: -40px;
  margin-left: 860px;
`;

export const UserManageButton = styled(Link)`
  height: 31px;
  width: 210px;
  margin-left: auto;
  margin-right: 10px;
  @media screen and (max-width: 32em) {
    width: 90%;
  }
  text-transform: uppercase;
  background: #3399ff;
  color: white;
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  outline: none;
  cursor: pointer;
  padding: 5px 45px;
  position: relative;
  text-decoration: none;
  margin-bottom: 10px;
`;

export const CashCollectionButton = styled(Link)`
  @media screen and (max-width: 32em) {
    width: 90%;
  }
  height: 31px;
  width: 203px;
  margin-left: auto;
  margin-right: 11px;
  text-transform: uppercase;
  background: #3399ff;
  color: white;
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  outline: none;
  cursor: pointer;
  padding: 5px 43px;
  position: relative;
  -webkit-text-decoration: none;
  text-decoration: none;
  margin-bottom: 10px;
`;
export const AllocationButton = styled(Link)`
  height: 31px;
  width: 185px;
  margin-left: 10px;
  margin-right: 10px;
  @media screen and (max-width: 32em) {
    width: 90%;
  }
  text-transform: uppercase;
  background: #3399ff;
  color: white;
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  outline: none;
  cursor: pointer;
  padding: 5px 18px;
  position: relative;
  text-decoration: none;
  margin-bottom: 10px;
`;

export const FarmerNameWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const FarmerIconWrapper = styled(Farmer)`
  padding-top: 2px;
  height: 15px;
  width: 20px;
  color: #000;
  text-decoration: none;
`;

export const FarmerNameShow = styled.div`
  font-weight: 600;
  font-size: 0.5rem;
  text-align: left;
  padding-top: 4px;
  text-overflow: ellipsis;
  color: #000000;
  overflow: hidden;
  text-transform: capitalize;
`;

export const CattleNameWrapper = styled.div`
  font-weight: 600;
  text-align: left;
  text-overflow: ellipsis;
  color: #ffffff;
  overflow: hidden;
  text-transform: capitalize;
  padding-bottom: 2px;
`;

export const LogoShowingWrapper = styled.div`
  border-radius: 3px;
  margin-top: 10px;
  height: 70px;
  width: 110px;
  border: 1px solid #dcf0ec;
  overflow: hidden;
  @media screen and (max-width: 32em) {
    width: 260px;
    margin-left: 10px;
  }
`;

export const LogoImageContainer = styled.img`
  border-radius: 2px;
  height: inherit;
  width: inherit;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 99%;
`;

export const FilterIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

export const FilterBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #03706b;
  background: rgba(255, 255, 255, 0.89);
  border-radius: 2px;
  margin-top: 4px;
  padding: 4px;
`;

export const ClearButton = styled(Button)`
  height: 28px;
  width: 90px;
  margin: 2px;
  background: #d73307;
  cursor: pointer;
`;

export const FilterBoxWrapper = styled.div`
  display: flex;
`;

export const CalenderWrapper = styled.div`
  background: #ffffff;
  margin: 10px;
  padding: 5px;
  border-radius: 3px;
  width: 250px;
  height: 160px;
  display: flex;
  border: 1px solid #03706b;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
  transform: box-shadow 0.15s ease 0.1s;
`;

export const MonthByYear = styled.form`
  display: flex;
  justify-content: center;
  margin: 3px;
`;
export const MonthByYearTitle = styled.div`
  font-size: 0.9rem;
  padding: 5px;
  font-weight: 600;
`;

export const DropDownWrapperContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const DropDownCover = styled.div`
  width: 90px;
  font-size: 0.8rem;
`;

export const GETButton = styled(Button)`
  height: 35px;
  width: 42px;
  padding: 2px;
  margin-left: 4px;
`;

export const MFIListShowingContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 1);
  margin-right: 5px;
  margin-bottom: 5px;
  margin-top: 10px;
  border-radius: 3px;
  border: 1px solid #dcf0ec;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
  transform: box-shadow 0.15s ease 0.1s;
`;

export const CattleListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 10px;
  background: lightgray;
  padding-bottom: 10px;
  border-radius: 3px;
  min-height: 100px;
`;

export const CattleListTitle = styled.div`
  text-align: left;
  margin-left: 10px;
  font-size: 0.78rem;
  margin-top: 10px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${props => props.color || '#000'};
  opacity: 0.73;
`;

export const CattleListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-left: 10px;
`;

export const ItemsNotExist = styled.div`
  margin: 0;
  color: #0d656f;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 600;
  flex: 1;
`;
