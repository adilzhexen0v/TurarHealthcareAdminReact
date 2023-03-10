import { useState, useEffect } from 'react';
import axios from '../../services/backendService';

import InputBlock from '../../components/inputBlock/inputBlock';
import SubmitBlock from '../../components/submitBlock/submitBlock';

import './generalPage.scss';


const GeneralPage = () => {
     const [isLoading, setIsLoading] = useState(true);
     const [generalInformation, setGeneralInformation] = useState({});
     const [message, setMessage] = useState('');
     const [bgMessage, setBgMessage] = useState('');
     const [homeBgMessage, setHomeBgMessage] = useState('');
     const [bg, setBg] = useState(null);
     const [selectedBg, setSelectedBg] = useState(null);
     const [homeBg, setHomeBg] = useState(null);
     const [selectedHomeBg, setSelectedHomeBg] = useState(null);

     const handleChange = (event) => {
          const { name, value } = event.target;
          if (name.includes('.')) {
               const [parent, child] = name.split('.');
               setGeneralInformation(prevState => ({
                    ...prevState,
                    [parent]: {
                         ...prevState[parent],
                         [child]: value
                    }
          }));
          } else {
               setGeneralInformation(prevState => ({
                    ...prevState,
                    [name]: value
               }));
          }
     };

     const handleHomeImageChange = (event) => {
          const file = event.target.files[0];
          setHomeBg(file);
          if (file) {
               const reader = new FileReader();
               reader.onload = () => {
                    setSelectedHomeBg(reader.result);
               };
               reader.readAsDataURL(file);
          }
     };

     const handImageChange = (event) => {
          const file = event.target.files[0];
          setBg(file);
          if (file) {
               const reader = new FileReader();
               reader.onload = () => {
                    setSelectedBg(reader.result);
               };
               reader.readAsDataURL(file);
          }
          console.log(selectedBg);
     };


     const sendData = async (e) => {
          e.preventDefault();
          setMessage('????????????????...');
          try {
               const res = await axios.post('/general/update', generalInformation, {
                    headers: 
                    {
                         Authorization: localStorage.getItem('token')
                    }
               })
               setMessage('???????????????????? ???????????? ???????????? ??????????????!');
               console.log(res);
          } catch (error) {
               console.warn(error);
               setMessage('?????????????????? ???????????? ???? ?????????? ???????????????????? ????????????!');
          }
     }

     const uploadBackground = async (e) => {
          e.preventDefault();
          setBgMessage('????????????????...');
          try {
               const formData = new FormData();
               formData.append("bg", bg);
               const res = await axios.post('/bg/change', formData, {
                    headers: 
                    {
                         Authorization: localStorage.getItem('token')
                    }
               })
               setBgMessage('???????????????????? ???????????????? ?????????????????????? ???????????? ??????????????!');
               console.log(res);
          } catch (error) {
               console.warn(error);
               setBgMessage('?????????????????? ???????????? ???? ?????????? ???????????????????? ???????????????? ??????????????????????!');
          }
     }

     const uploadHomeBackground = async (e) => {
          e.preventDefault();
          setHomeBgMessage('????????????????...');
          try {
               const formData = new FormData();
               formData.append("homebg", homeBg);
               const res = await axios.post('/homebg/change', formData, {
                    headers: {
                         Authorization: localStorage.getItem('token')
                    }
               })
               setHomeBgMessage('???????????????????? ???????????????? ?????????????????????? ???????????? ??????????????!');
               console.log(res);
          } catch (error) {
               console.warn(error);
               setHomeBgMessage('?????????????????? ???????????? ???? ?????????? ???????????????????? ???????????????? ??????????????????????!');
          }
     }

     useEffect(() => {
          axios.get('/general')
               .then(res => setGeneralInformation(res.data))
               .catch(err => console.log(err))
               .finally(() => setIsLoading(false));
     }, []);
     return (  
          <>
          <form onSubmit={(e) => sendData(e)}>
               <section className="general">
                    <h3 className="section__title">?????????? ????????????????????</h3>
                    {
                         isLoading ? (
                              <h2>????????????????...</h2>
                         ) : (
                              <div className="general__wrapper">
                                   <div className="general__part">
                                        <InputBlock
                                             title="???????????? ??????????????????"
                                             value={generalInformation.firstTitle}
                                             name="firstTitle"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="???????????? ?????????????????? ???? ?????????????? ??????????"
                                             value={generalInformation.secondTitle.ru}
                                             name="secondTitle.ru"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="???????????? ?????????????????? ???? ?????????????????? ??????????"
                                             value={generalInformation.secondTitle.kz}
                                             name="secondTitle.kz"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="???????????? ?????????????????? ???? ???????????????????? ??????????"
                                             value={generalInformation.secondTitle.en}
                                             name="secondTitle.en"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="???????????????????????????? ?????????????????? ???? ?????????????? ??????????"
                                             value={generalInformation.additionalTitle.ru}
                                             name="additionalTitle.ru"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="???????????????????????????? ?????????????????? ???? ?????????????????? ??????????"
                                             value={generalInformation.additionalTitle.kz}
                                             name="additionalTitle.kz"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="???????????????????????????? ?????????????????? ???? ???????????????????? ??????????"
                                             value={generalInformation.additionalTitle.en}
                                             name="additionalTitle.en"
                                             handleFunction={handleChange}
                                             />
                                   </div>
                                   <div className="general__part">
                                        <InputBlock
                                             title="E-mail ?????? ??????????"
                                             value={generalInformation.mail}
                                             name="mail"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="?????????? ????????????????"
                                             value={generalInformation.phoneNumber}
                                             name="phoneNumber"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="?????????? ???? ?????????????? ??????????"
                                             value={generalInformation.address.ru}
                                             name="address.ru"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="?????????? ???? ?????????????????? ??????????"
                                             value={generalInformation.address.kz}
                                             name="address.kz"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="?????????? ???? ???????????????????? ??????????"
                                             value={generalInformation.address.en}
                                             name="address.en"
                                             handleFunction={handleChange}
                                             />
                                        <InputBlock
                                             title="???????????? ???? Instagram"
                                             value={generalInformation.instagramLink}
                                             name="instagramLink"
                                             handleFunction={handleChange}
                                             />
                                        <SubmitBlock
                                             message={message}/>
                                   </div>
                              </div>
                         )
                    }
               </section>
          </form>
          <form onSubmit={(e) => uploadBackground(e)}>
               <section class="bg">
                    <div class="bg__wrapper">
                         <div class="bg__part">
                              <h3 class="section__title">?????????????? ??????????????????????</h3>
                              <input type="file" id="base-bg" onChange={(e) => handImageChange(e)}/>
                              <label htmlFor="base-bg" class="file__upload">
                                   <i class="fa-solid fa-upload"></i>
                                   <h6>???????????????? ????????</h6>
                              </label>
                              <div class="field__block-submit">
                                   <input type="submit" value="??????????????????" class="field__submit"/>
                                   <h5>{bgMessage}</h5>
                              </div>
                         </div>
                         {
                              isLoading ? (
                                   <h2>????????????????...</h2>
                              ) : (
                                   <div class="bg__part">
                                        <h3 class="section__title">????????????????????????</h3>
                                        <div class="bg__preview" style={
                                             {
                                                  'backgroundImage': 
                                                  `linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${
                                                       selectedBg ? selectedBg :
                                                       `http://localhost:4000/uploads/backgrounds/${generalInformation.bgImage}` 
                                                  })`
                                             }
                                        }>
                                             <h4 class="bg__preview-text">?????????????? / ???????? / ???????????????? ????????????</h4>
                                        </div>
                                   </div>
                              )
                         }
                    </div>
               </section>
          </form>
          <form onSubmit={(e) => uploadHomeBackground(e)}>
               <section class="bg">
                    <div class="bg__wrapper">
                         <div class="bg__part">
                              <h3 class="section__title">?????????????? ?????????????????????? ?????????????? ????????????????</h3>
                              <input type="file" id="home-bg" onChange={(e) => handleHomeImageChange(e)}/>
                              <label htmlFor="home-bg" class="file__upload">
                                   <i class="fa-solid fa-upload"></i>
                                   <h6>???????????????? ????????</h6>
                              </label>
                              <div class="field__block-submit">
                                   <input type="submit" value="??????????????????" class="field__submit"/>
                                   <h5>{homeBgMessage}</h5>
                              </div>
                         </div>
                         {
                              isLoading ? (
                                   <h2>????????????????...</h2>
                              ) : (
                                   <div class="bg__part">
                                        <h3 class="section__title">????????????????????????</h3>
                                        <div class="bg__preview" style={
                                             {
                                                  'backgroundImage': 
                                                  `linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${
                                                       selectedHomeBg ? selectedHomeBg :
                                                       `http://localhost:4000/uploads/backgrounds/${generalInformation.homeBgImage}` 
                                                  })`
                                             }
                                        }>
                                             <h4 class="bg__preview-text">?????????????? ????????????????</h4>
                                        </div>
                                   </div>
                              )
                         }
                    </div>
               </section>
          </form>
          </>
     );
}

export default GeneralPage;