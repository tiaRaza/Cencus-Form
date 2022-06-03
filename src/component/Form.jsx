import React, { useState } from 'react';
import { getDatabase, ref, set  } from "firebase/database";
import FormSection from './Section';
import firebaseAPP from '../services/firebase';
import "./Form.css";


const GetRandomNum = () => {
    let precision = 100000; // 2 decimals
    let randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision);

    return randomnum.toString().replace(".","");
}

const Form = (props) => {
    let { title } = props;
    let [ sections, setSections ] = useState([GetRandomNum()]);
    let [ formData, setFormData ] = useState({})

    const IncrementSections = e => {
        e.preventDefault();
        const copySections = [...sections];
        copySections.push(GetRandomNum());
        setSections(copySections);
    }
    const RemoveSection = (e, id) => {
        let copySections = [...sections];
        const index = copySections.indexOf(id);
        copySections.splice(index, 1)
        setSections(copySections)

        // remove section data
        let copyFormData = {...formData};
        delete copyFormData[id];
        setFormData(copyFormData)
    }
    const UpdateSectionData = (id, data) => {
        let copyFormData = {...formData};
        copyFormData[id] = {...data};
        setFormData(copyFormData)
    }

    const FormSubmit = async e => {
        e.preventDefault();
        const db = getDatabase(firebaseAPP);
        const pushResponse = await set(ref(db, "families/"), formData);
        console.log(pushResponse)
    }

    return (
        <form onSubmit={FormSubmit} action="#">
            <div className='form-header container'>
                <h2>{title}</h2>
                <div className='row'>
                    <div className='form-group col-sm col-md-6'>
                        <div className='mb-3'>
                            <label for="familyName" class="form-label">Family Name</label>
                            <input id="familyName" name="familyName" class="form-control" type="text" placeholder='Family Name' />
                        </div>
                        <div className='mb-3'>
                            <label for="address" class="form-label">Address</label>
                            <input id="address" name="address" class="form-control" type="text" placeholder='Address' />
                        </div>
                    </div>
                    <div className='form-group col-sm col-md-6'>
                        <div className='mb-3'>
                            <label for="telephone" class="form-label">Telephone (Home)</label>
                            <input id="telephone" name="telephone" class="form-control" type="text" placeholder='Telephone' />
                        </div>
                        <div className='mb-3'>
                            <label for="mobile" class="form-label">Mobile</label>
                            <input id="mobile" name="mobile" class="form-control" type="text" placeholder='Mobile' />
                        </div>
                    </div>
                </div>
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
                                RemoveSection={ e => RemoveSection(e, id)}
                                UpdateSectionData={ UpdateSectionData }
                            />
                        );
                    })
                }
                <div className="form-buttons">
                    <div className="col-sm-3 mb-3">
                        <button className="btn btn-primary" type='button' onClick={IncrementSections}>ADD ANOTHER MEMBER</button>
                    </div>
                    <div className="col-sm-3 mb-3">
                        <button className="btn btn-success" type="submit">SUBMIT</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Form;