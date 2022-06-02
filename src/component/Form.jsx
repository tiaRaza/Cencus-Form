import React, { useState } from 'react';
import { getDatabase, ref, set  } from "firebase/database";
import FormSection from './Section';
import firebaseAPP from '../services/firebase';


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
            <div className='form-header'>
                <h2>{title}</h2>
                <input type="text" placeholder='Family Name' />
                <input type="text" placeholder='Address' />
                <input type="text" placeholder='Telephone' />
                <input type="text" placeholder='Mobile' />
            </div>
            <div className='form-body'>
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
                <button type='button' onClick={IncrementSections}>ADD MEMBER</button>
            </div>
            <button type="submit">SUBMIT</button>
        </form>
    );
}

export default Form;