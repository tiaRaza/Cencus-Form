import React, { useRef, useState } from 'react';
import { getDatabase, ref, set, update  } from "firebase/database";
import FormSection from './Section';
import firebaseAPP from '../services/firebase';
import "./Form.css";
import Loader from './Loader';
import Modal from './Modal';
import FormUtils from '../form-utils/utils';


const GetRandomNum = () => {
    let precision = 100000; // 2 decimals
    let randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision);

    return randomnum.toString().replace(".","");
}

const Form = (props) => {
    let { title } = props;
    let [ sections, setSections ] = useState([GetRandomNum()]);
    let [ formData, setFormData ] = useState({})
    let [ loaderDisplay, setLoaderDisplay ] = useState(false);
    let [ modalDisplay, setModalDisplay ] = useState(false);
    let [ errorDisplay, setErrorDisplay ] = useState(false);
    let conscentRef = useRef(null);
    let formRef = useRef(null);

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
    const RemoveSection = (e, id) => {
        if(sections.length > 1) {
            let copySections = [...sections];
            const index = copySections.indexOf(id);
            copySections.splice(index, 1)
            setSections(copySections)
    
            // remove section data
            let copyFormData = {...formData};
            delete copyFormData.members[id];
            setFormData(copyFormData)
        }
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
            default:
                break;
        }
    }

    const FormSubmit = async e => {
        e.preventDefault();
        let valid = FormUtils.ValidateForm(formRef.current);

        if(valid) {
            const db = getDatabase(firebaseAPP);
            const obj = {};
            obj[`${GetRandomNum()}-${formData.familyName}`] = formData;

            setLoaderDisplay(true);
            PreventScroll(true);

            try {
                await update(ref(db, "censusForm/"), obj);

                setTimeout( () => {
                    setLoaderDisplay(false);
                    PreventScroll(false);

                    setModalDisplay(true);
                    PreventScroll(true);

                    FormUtils.ResetForm(formRef.current);
                }, 1500)
            } catch (e) {
                setLoaderDisplay(false);
                setErrorDisplay(true)
            }
        }
    }

    return (
        <form ref={formRef} onSubmit={FormSubmit} action="#">
            <div className='form-header container'>
                <h2>{title}</h2>
                <div className='row justify-content-center'>
                    <div className="mb-3 col-sm col-md-4">
                        <select data-is-required="true" type="select" onChange={SelectChangeHandler} className="form-select" name="parish">
                            <option value="-1">Select Your Parish</option>
                            <option value="La Cathédrale St James - Port Louis">La Cathédrale St James - Port Louis</option>
                            <option value="St Thomas - Beau-Bassin">St Thomas - Beau-Bassin</option>
                            <option value="St John - Réduit">St John - Réduit</option>
                            <option value="St Paul - Vacoas">St Paul - Vacoas</option>
                            <option value="Christ Church  - Mahébourg">Christ Church  - Mahébourg</option>
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
                            <label htmlFor="familyName" className="col-sm-4 form-label">Family Name</label>
                            <div className="col-sm-8">
                                <input data-is-required="true" onBlur={InputOnBlurHandler} id="familyName" name="familyName" className="form-control" type="text" placeholder='Family Name' />
                            </div>
                        </div>
                        <div className='mb-3 row'>
                            <label htmlFor="address" className="col-sm-4 form-label">Address</label>
                            <div className="col-sm-8">
                                <input onBlur={InputOnBlurHandler} id="address" name="address" className="form-control" type="text" placeholder='Address' />
                            </div>
                        </div>
                    </div>
                    <div className='form-group col-sm col-md-6'>
                        <div className='mb-3 row'>
                            <label htmlFor="telephone" className="col-sm-4 form-label">Telephone</label>
                            <div className="col-sm-8">
                                <input onBlur={InputOnBlurHandler} id="telephone" name="telephone" className="form-control" type="text" placeholder='Telephone (Home)' />
                            </div>
                        </div>
                        <div className='mb-3 row'>
                            <label htmlFor="mobile" className="col-sm-4 form-label">Mobile</label>
                            <div className="col-sm-8">
                                <input onBlur={InputOnBlurHandler} id="mobile" name="mobile" className="form-control" type="text" placeholder='Mobile' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-body container'>
                <p><u>Survey description</u></p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed laoreet augue, sed pulvinar ante. Vestibulum vestibulum leo non felis tempus, in faucibus est semper. Praesent auctor vitae velit quis sagittis. Nulla nibh augue, porta eu interdum quis, ornare nec sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                </p>
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
                                RemoveSection={ e => RemoveSection(e, id)}
                                UpdateSectionData={ UpdateSectionData }
                            />
                        );
                    })
                }
                <div className='form-conscent container row justify-content-center'>
                    <div className="form-check mb-3 col-sm-8">
                        <input data-is-required="true" onClick={OnCheckHandler} ref={conscentRef} type="checkbox" id="conditions" data-name="gaveConscent" className="form-check-input"/>
                        <label htmlFor="conditions" className="form-check-label">I hereby conscent that these personal data may be collected and used by the <strong>Anglican Diocese of Mauritius</strong>.</label>
                    </div>
                </div>
                <div className="form-buttons">
                    <div className="col-sm col-lg-3 mb-3">
                        <button className="btn btn-primary" type='button' onClick={IncrementSections}>ADD ANOTHER MEMBER</button>
                    </div>
                    <div className="col-sm col-lg-3 mb-3">
                        <button className="btn btn-success" type="submit">SUBMIT</button>
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
        </form>
    );
}

export default Form;