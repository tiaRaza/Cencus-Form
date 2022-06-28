import React, { useEffect, useRef, useState } from 'react';
import { getDatabase, ref, update  } from "firebase/database";
import FormSection from './Section';
import firebaseAPP from '../services/firebase';
import "./Form.css";
import Loader from './Loader';
import Modal from './Modal';
import FormUtils from '../form-utils/utils';
import ConfirmationModal from './Confirmation';
// import FileUtils from '../services/fileUtils';


const GetRandomNum = () => {
    let precision = 100000; // 2 decimals
    let randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision);

    return randomnum.toString().replace(".","");
}

const Form = (props) => {
    let [ sections, setSections ] = useState([GetRandomNum()]);
    let [ formData, setFormData ] = useState({
        address: "",
        telephone: "",
        mobile: ""
    })
    let [ loaderDisplay, setLoaderDisplay ] = useState(false);
    let [ modalDisplay, setModalDisplay ] = useState(false);
    let [ errorDisplay, setErrorDisplay ] = useState(false);
    let [ confirmDeleteDisplay, setConfirmDeleteDisplay ] = useState(false);
    let [ confirmSubmitDisplay, setConfirmSubmitDisplay ] = useState(false);
    let [ removeID, setRemoveID ] = useState("");
    let [ proceedDelete, setProceedDelete ] = useState(false);
    let [ proceedSubmit, setProceedSubmit ] = useState(false);
    let conscentRef = useRef(null);
    let formRef = useRef(null);
    let submitRef = useRef(null);

    const PreventScroll = (display) => {
        let DOC = document.querySelector("html");
        if(display) {
            DOC.style.overflow = "hidden"
        } else {
            DOC.style.overflow = ""
        }
    }

    const IncrementSections = e => {
        e.preventDefault();
        const copySections = [...sections];
        copySections.push(GetRandomNum());
        setSections(copySections);
    }

    const InputOnBlurHandler = (e) => {
        e.preventDefault();
        let DOM = e.target,
            name = DOM.getAttribute("name"),
            copyFormData = {...formData};

        if(e.target.value.length > 0) {
            if(DOM.getAttribute("data-is-required")) {
                DOM.classList.add("is-valid");
                DOM.classList.remove("is-invalid");
            }

            copyFormData[name] = e.target.value
            setFormData(copyFormData)
        } else {
            if(DOM.getAttribute("data-is-required")) {
                DOM.classList.remove("is-valid")
                DOM.classList.add("is-invalid")
            }
        }
    }

    const SelectChangeHandler = e => {
        e.preventDefault()
        const DOM = e.target,
                value = DOM.value;
        if(value !== "-1") {
            if(DOM.getAttribute("data-is-required")) {
                DOM.classList.add("is-valid");
                DOM.classList.remove("is-invalid");
            }

            const copyFormData = {...formData};
            copyFormData[DOM.getAttribute("name")] = value;
            setFormData(copyFormData)
        } else {
            if(DOM.getAttribute("data-is-required")) {
                DOM.classList.remove("is-valid")
                DOM.classList.add("is-invalid")
            }
        }
    }

    const UpdateSectionData = (id, data) => {
        let copyFormData = {...formData};
        if (copyFormData.members === undefined) copyFormData.members = {}
        copyFormData.members[id] = {...data};
        setFormData(copyFormData)
    }

    const OnCheckHandler = (e) => {
        let DOM = e.target,
            { name } = DOM.dataset,
            copyFormData = {...formData};

        copyFormData[name] = DOM.checked;
        if(DOM.checked) {
            if(DOM.getAttribute("data-is-required")) {
                DOM.classList.add("is-valid");
                DOM.classList.remove("is-invalid");
            }
        } else {
            if(DOM.getAttribute("data-is-required")) {
                DOM.classList.remove("is-valid")
                DOM.classList.add("is-invalid")
            }
        }
        setFormData(copyFormData)
    }

    const CloseModal = (id, isOpen) => {
        switch (id) {
            case "thank-you":
                setModalDisplay(isOpen);
                PreventScroll(isOpen);
                break;
        
            case "error":
                setErrorDisplay(isOpen);
                PreventScroll(isOpen);
                break;

            case "confirmation-delete":
                setConfirmDeleteDisplay(isOpen);
                PreventScroll(isOpen);
                break;

            case "confirmation-submit":
                setConfirmSubmitDisplay(isOpen);
                PreventScroll(isOpen);
                break;
            default:
                break;
        }
    }

    const FormSubmit = e => {
        e.preventDefault();
        let valid = FormUtils.ValidateForm(formRef.current);
        
        if(valid) {
            setConfirmSubmitDisplay(true);
            PreventScroll(true);
        }
    }

    useEffect( () => {
        async function SubmitForm() {
            if(proceedSubmit) {
                submitRef.current.disabled = true;
                const db = getDatabase(firebaseAPP);
                const obj = {};
                const applicationID = `${GetRandomNum()}-${formData.familyName}`;
                formData.origin = window.location.hostname;
                formData.date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
                obj[applicationID] = formData;
    
                setLoaderDisplay(true);
                PreventScroll(true);
    
                try {
                    await update(ref(db, "censusForm/"), obj);
                    // FileUtils.WriteFile(applicationID, JSON.stringify(obj))
    
                    setTimeout( () => {
                        setFormData({
                            address: "",
                            telephone: "",
                            mobile: ""
                        });
                        setLoaderDisplay(false);
                        PreventScroll(false);
    
                        setModalDisplay(true);
                        PreventScroll(true);
                        submitRef.current.disabled = false;
                        FormUtils.ResetForm(formRef.current);
                        setProceedSubmit(false);

                        /**
                         * Remove additional sections
                         */
                        let copySections = [...sections];
                        copySections.splice(1, copySections.length)
                        setSections(copySections)

                    }, 1500)
                } catch (e) {
                    submitRef.current.disabled = false;
                    setLoaderDisplay(false);
                    setErrorDisplay(true);
                    // FileUtils.WriteFile(applicationID, JSON.stringify(obj))
                }
            }
        }

        SubmitForm();
    }, [proceedSubmit])

    useEffect(() => {
        if(proceedDelete) {
            var id = removeID;
            if(sections.length > 1 && proceedDelete) {
                setRemoveID("")
                let copySections = [...sections];
                const index = copySections.indexOf(id);
                copySections.splice(index, 1)
                setSections(copySections)
                
                // remove section data
                let copyFormData = {...formData};
                delete copyFormData.members[id];
                setFormData(copyFormData)
                setProceedDelete(false);
            }
        }
    }, [proceedDelete]);

    return (
        <form ref={formRef} onSubmit={FormSubmit} action="#">
            <div className='form-header container'>
                <div className='row justify-content-center'>
                    <div className="mb-3 col-sm col-md-5">
                        <select data-is-required="true" type="select" onChange={SelectChangeHandler} className="form-select" name="parish">
                            <option value="-1">Select Your Parish</option>
                            <option value="La Cathedrale St James - Port Louis">La Cathédrale St James - Port Louis</option>
                            <option value="St Thomas - Beau-Bassin">St Thomas - Beau-Bassin</option>
                            <option value="St John - Reduit">St John - Réduit</option>
                            <option value="St Paul - Vacoas">St Paul - Vacoas</option>
                            <option value="Christ Church  - Mahebourg">Christ Church  - Mahébourg</option>
                            <option value="St Barnabas - Pamplemousses">St Barnabas - Pamplemousses</option>
                            <option value="St Peter  - Pailles, Cassis">St Peter  - Pailles, Cassis</option>
                            <option value="St Paul - Plaine Verte">St Paul - Plaine Verte</option>
                            <option value="Holy Trinity - Rose-Hill">Holy Trinity - Rose-Hill</option>
                            <option value="St Luke - Souillac">St Luke - Souillac</option>
                            <option value="St Clement - Curepipe">St Clement - Curepipe</option>
                            <option value="St Mark - Poudre d'Or">St Mark - Poudre d'Or</option>
                            <option value="St Anges - Rose-Belle">St Anges - Rose-Belle</option>
                            <option value="St Andrew - Quatre-Bornes">St Andrew - Quatre-Bornes</option>
                            <option value="St Michael and All Angels - Saint Pierre">St Michael and All Angels - Saint Pierre</option>
                            <option value="St Philip/St James - Beau Champ">St Philip/St James - Beau Champ</option>
                            <option value="All Saints Chapel - Montagne Longue">All Saints Chapel - Montagne Longue</option>
                            <option value="St Simon The Fisherman - Tamarin">St Simon The Fisherman - Tamarin</option>
                            <option value="St Barnabas - Port Mathurin">St Barnabas - Port Mathurin</option>
                            <option value="St Luc- La Ferme">St Luc- La Ferme</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='form-group col-sm col-md-6'>
                        <div className='mb-3 row'>
                            <label htmlFor="familyName" className="col-sm-5 form-label">Family Name</label>
                            <div className="col-sm-7">
                                <input data-is-required="true" onBlur={InputOnBlurHandler} id="familyName" name="familyName" className="form-control" type="text" placeholder='Family Name' />
                            </div>
                        </div>
                        <div className='mb-3 row'>
                            <label htmlFor="address" className="col-sm-5 form-label">Address</label>
                            <div className="col-sm-7">
                                <input onBlur={InputOnBlurHandler} id="address" name="address" className="form-control" type="text" placeholder='Address' />
                            </div>
                        </div>
                    </div>
                    <div className='form-group col-sm col-md-6'>
                        <div className='mb-3 row'>
                            <label htmlFor="telephone" className="col-sm-5 form-label">Telephone</label>
                            <div className="col-sm-7">
                                <input onBlur={InputOnBlurHandler} id="telephone" name="telephone" className="form-control" type="text" placeholder='Telephone (Home)' />
                            </div>
                        </div>
                        <div className='mb-3 row'>
                            <label htmlFor="mobile" className="col-sm-5 form-label">Mobile</label>
                            <div className="col-sm-7">
                                <input onBlur={InputOnBlurHandler} id="mobile" name="mobile" className="form-control" type="text" placeholder='Mobile' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-body container form-description'>
                <p><u>Instructions for Anglican Diocese Census 2022:</u></p>
                <p><strong>We would recommend that the head of the household be the one responsible for filling in the form for the family. The head of the household is usually the husband/father but can be the mother in case of a widow.</strong></p>
                <p><strong>In cases whereby the child or children attend church services in an Anglican parish but the parents or one of the parents do NOT, the parent(s), as head of household, still need to fill in the form with their name(s) and select e.g. “Not Anglican” and “Never attend Anglican church services” for their specific situations.</strong></p>
                <p><strong>If there are specific cases in your family whereby you are not sure how to fill in the form, please contact your parish census team for clarification.</strong></p>

                <p><strong>Select Your Parish:</strong> Select the <strong>main</strong> parish where you attend church services.</p>
                <p><strong>Family Name:</strong> Enter your family’s Surname. Please note that if you have multiple families with different family surnames living together in the household, then EACH family, with different surname, will have to fill in a separate form.</p>
                <p><strong>Address:</strong> Enter your current household address.</p>
                <p><strong>Mobile:</strong> Enter the mobile number of the head of the household. This will be the primary point of contact by the parish or diocese.</p>
                <p><strong>Family Member’s Name:</strong> Enter the First Name of each member of the Family in the household. If you have a family member who is a minor and has a different Surname from the entered Family Name, then enter that person’s First Name and include his/her Surname in brackets after the First Name.</p>
                <p><strong>Anglican:</strong> Please tick if you currently attend church services in an Anglican parish (Note: You can be a Catholic, Adventist, etc. but for the purposes of this census, if you attend church services in an Anglican parish, then you are considered as an Anglican).</p>
                <p><strong>Baptized:</strong> Please tick if you have been baptized, whether in an Anglican, Catholic or other church denomination.</p>
                <p><strong>Ministry currently involved in:</strong> Please tick all the ministries you are currently involved in your parish.</p>
                <p><strong>Submit:</strong> Please click on the Submit button only when you have entered <strong>ALL</strong> the information for <strong>EACH</strong> member of the family. If when you click on the Submit button and nothing happens, it is most likely that you have not ticked the agreement for data use as per the Data Protection Act. Once you have successfully submitted your form, you will receive a confirmation pop-up. </p>
            </div>

            <div className='form-body container'>
                <p>Details of family living at the same address</p>
                { 
                    sections.map(section => {
                        let id = section;
                        return (
                            <FormSection 
                                key={id}
                                id={id} 
                                displayRemoveCta={sections.length > 1}
                                RemoveSection={ e => {
                                    setConfirmDeleteDisplay(true);
                                    PreventScroll(true);
                                    setRemoveID(id);
                                }}
                                UpdateSectionData={ UpdateSectionData }
                            />
                        );
                    })
                }
                <div className='form-conscent container row justify-content-center'>
                    <div className="form-check mb-3 col-sm-8">
                        <input data-is-required="true" onClick={OnCheckHandler} ref={conscentRef} type="checkbox" id="conditions" data-name="gaveConscent" className="form-check-input"/>
                        <label htmlFor="conditions" className="form-check-label">I hereby agree to the data collected to be used by the <strong>Anglican Diocese of Mauritius</strong> in accordance with the <em>Data Protection Act 2017</em> of the Republic of Mauritius.</label>
                    </div>
                </div>
                <div className="form-buttons">
                    <div className="col-sm col-lg-3 mb-3">
                        <button className="btn btn-primary" type='button' onClick={IncrementSections}>ADD ANOTHER MEMBER</button>
                    </div>
                    <div className="col-sm col-lg-3 mb-3">
                        <button ref={submitRef} className="btn btn-success" type="submit">SUBMIT</button>
                    </div>
                </div>
            </div>
            {
                loaderDisplay ?
                <Loader display={loaderDisplay} /> : null
            }

            {
                modalDisplay ?
                <Modal 
                    id="thank-you"
                    title="Thank You"
                    display={modalDisplay}
                    hideModal={CloseModal}
                    message="Thank you for taking the time to complete the form and submitting it back to us." /> : null
            }

            {
                errorDisplay ?
                <Modal 
                    id="error"
                    title="An Error Occurred"
                    display={errorDisplay}
                    hideModal={CloseModal}
                    message="Please submit form again, an error has occurred" /> : null
            }

            {
                confirmDeleteDisplay ?
                <ConfirmationModal
                    id="confirmation-delete"
                    title="Remove Member"
                    display={confirmDeleteDisplay}
                    hideModal={CloseModal}
                    actionProceed={ () => setProceedDelete(true) }
                    message="You are about to remove a member of your family from the application. Do you want to proceed?" /> : null
            }

            {
                confirmSubmitDisplay ?
                <ConfirmationModal
                    id="confirmation-submit"
                    title="Submit Form"
                    display={confirmSubmitDisplay}
                    hideModal={CloseModal}
                    actionProceed={ () => setProceedSubmit(true) }
                    message="Make sure you have added ALL your family members BEFORE submitting. Do you want to proceed and Submit ?" /> : null
            }
        </form>
    );
}

export default Form;