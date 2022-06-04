import React, { useRef, useState } from 'react';
import "./Section.css";

const FormSection = (props) => {
    let { id, RemoveSection, UpdateSectionData, displayRemoveCta } = props;
    let [ sectionData, setSectionData ] = useState({});
    let otherMinistryRef = useRef(null);

    const OnBlurHandler = (e) => {
        let DOM = e.target,
            { name } = DOM.dataset,
            copySectionData = {...sectionData};

        copySectionData[name] = DOM.value;
        if(DOM.value.length > 0) {
            if(DOM.getAttribute("data-is-required")) {
                DOM.classList.add("is-valid");
                DOM.classList.remove("is-invalid");
            }

            setSectionData(copySectionData);
            UpdateSectionData(id, copySectionData)
        } else {
            if(DOM.getAttribute("data-is-required")) {
                DOM.classList.remove("is-valid")
                DOM.classList.add("is-invalid")
            }
        }
    }

    const OnSelectChangeHandler = e => {
        e.preventDefault();
        const value = e.target.value;
        if(value !== "-1") {
            const copySectionData = {...sectionData};

            copySectionData[e.target.getAttribute('name')] = value;
            setSectionData(copySectionData);
            UpdateSectionData(id, copySectionData)
        }
    }

    const OnRadioChange = e => {
        const { value, name } = e.target.dataset,
            copySectionData = {...sectionData};

        copySectionData[name] = value;
        setSectionData(copySectionData);
        UpdateSectionData(id, copySectionData);
    }

    const OnCheckHandler = (e) => {
        let DOM = e.target,
            { name } = DOM.dataset,
            copySectionData = {...sectionData};

        copySectionData[name] = DOM.checked;
        setSectionData(copySectionData);
        UpdateSectionData(id, copySectionData)
    }

    return (
        <div className='form-section row bg-secondary' >
            <div className='section-left col-md-8'>
                <div className='section-top row'>
                    <div className="mb-3 col-sm col-md-6">
                        <input data-is-required="true" className="form-control" onBlur={OnBlurHandler} type="text" placeholder="Family Member's Name" data-name="memberName"/>
                    </div>
                    <div className="mb-3 col-sm col-md-3">
                        <select onChange={OnSelectChangeHandler} className="form-select" name="ageGroup">
                            <option value="-1">Age Group</option>
                            <option value="0-5">0-5</option>
                            <option value="6-12">6-12</option>
                            <option value="13-18">13-18</option>
                            <option value="19-50">19-50</option>
                            <option value="> 50">> 50</option>
                        </select>
                    </div>
                    <div className='col-sm col-md-3'>
                        <div className="form-check form-switch mb-3">
                            <input onClick={OnCheckHandler} type="checkbox" id={`${id}-anglican-check`} data-name="isAnglican" className="form-check-input"/>
                            <label htmlFor={`${id}-anglican-check`} className="form-check-label">Anglican</label>
                        </div>
                        <div className="form-check form-switch mb-3">
                            <input onClick={OnCheckHandler} type="checkbox" id={`${id}-baptized-check`} data-name="isBaptized" className="form-check-input"/>
                            <label htmlFor={`${id}-baptized-check`} className="form-check-label">Baptized</label>
                        </div>
                    </div>
                </div>

                <div className='section-top row'>
                    <p className="section-title">Ministry currently involved in:</p>
                    <div className='col-sm col-md-3'>
                        <div className="form-check mb-3">
                            <input onClick={OnCheckHandler} type="checkbox" id={`${id}-sunday-check`} data-name="isSundaySchool" className='form-check-input'/>
                            <label className='form-check-label' htmlFor={`${id}-sunday-check`}>Sunday School</label>
                        </div>    
                        <div className="form-check mb-3">
                            <input onClick={OnCheckHandler} type="checkbox" id={`${id}-youth-check`} data-name="isYouth" className='form-check-input'/>
                            <label className='form-check-label' htmlFor={`${id}-youth-check`}>Youth</label>
                        </div>
                        <div className="form-check mb-3">
                            <input onClick={OnCheckHandler} type="checkbox" id={`${id}-MU-check`} data-name="isMU" className='form-check-input'/>
                            <label className='form-check-label' htmlFor={`${id}-MU-check`}>Mother's Union</label>
                        </div>
                    </div>

                    <div className='col-sm col-md-3'>
                        <div className="form-check mb-3">
                            <input onClick={OnCheckHandler} type="checkbox" id={`${id}-elder-check`} data-name="isElderly" className='form-check-input'/>
                            <label className='form-check-label' htmlFor={`${id}-elder-check`}>Elderly</label>
                        </div>
                        <div className="form-check mb-3">
                            <input onClick={OnCheckHandler} type="checkbox" id={`${id}-welcome-check`} data-name="isWelcome" className='form-check-input'/>
                            <label className='form-check-label' htmlFor={`${id}-welcome-check`}>Welcome</label>
                        </div>
                        <div className="form-check mb-3">
                            <input onClick={OnCheckHandler} type="checkbox" id={`${id}-prayer-check`} data-name="isPrayer" className='form-check-input'/>
                            <label className='form-check-label' htmlFor={`${id}-prayer-check`}>Prayer</label>
                        </div>
                    </div>
                    
                    <div className='col-sm col-md-3'>
                        <div className="form-check mb-3">
                            <input onClick={OnCheckHandler} type="checkbox" id={`${id}-av-team-check`} data-name="isAVTeam" className='form-check-input'/>
                            <label className='form-check-label' htmlFor={`${id}-av-team-check`}>AV Team</label>
                        </div>
                        <div className="form-check mb-3">
                            <input onClick={OnCheckHandler} type="checkbox" id={`${id}-compassion-check`} data-name="isCompassion" className='form-check-input'/>
                            <label className='form-check-label' htmlFor={`${id}-compassion-check`}>Compassion</label>
                        </div>
                        <div className="form-check mb-3">
                            <input onClick={OnCheckHandler} type="checkbox" id={`${id}-music-check`} data-name="isMusic" className='form-check-input'/>
                            <label className='form-check-label' htmlFor={`${id}-music-check`}>Music</label>
                        </div>
                    </div>

                    <div className='col-sm col-md-3'>
                        <div className="form-check mb-3">
                            <input onClick={OnCheckHandler} type="checkbox" id={`${id}-cell-check`} data-name="isCellGroup" className='form-check-input'/>
                            <label className='form-check-label' htmlFor={`${id}-cell-check`}>Cell Group</label>
                        </div>
                        <div className="form-check mb-3">
                            <input ref={otherMinistryRef} onClick={OnCheckHandler} type="checkbox" id={`${id}-other-ministry-check`} data-name="isOther" className='form-check-input'/>
                            <label className='form-check-label' htmlFor={`${id}-other-ministry-check`}>Other</label>
                        </div>
                        {
                            !!otherMinistryRef.current && otherMinistryRef.current.checked ?
                            <textarea data-is-required="true" onBlur={OnBlurHandler} className="form-control" type="text" placeholder="Please specify" data-name="otherMinistries"/>
                            : null
                        }
                    </div>
                    <div className='section-info'>
                        <p><em><u>Note</u>
                        <br /><br /><strong>AV Team:</strong> Sound system, PowerPoint, Videographer
                        <br /><br /><strong>Other:</strong> Please input comma separated values. e.g. "Ministry 1, Ministry 2"</em></p>
                    </div>
                </div>
            </div>
            <div className='section-right  col-md-4'>
                <p className="section-title">How often do you attend church?</p>
                <div className="form-check mb-3">
                    <input onChange={OnRadioChange} data-name="churchFrequency" data-value="Once Week" name={`${id}-frequency`} className='form-check-input' type="radio" id={`${id}-one-week-check`}/>
                    <label className='form-check-label' htmlFor={`${id}-one-week-check`}>Once a week</label>
                </div>
                <div className="form-check mb-3">
                    <input onChange={OnRadioChange} data-name="churchFrequency" data-value="Once Month" name={`${id}-frequency`} className='form-check-input' type="radio" id={`${id}-one-month-check`} />
                    <label className='form-check-label' htmlFor={`${id}-one-month-check`}>Once a month</label>
                </div>
                <div className="form-check mb-3">
                    <input onChange={OnRadioChange} data-name="churchFrequency" data-value="Occasionally" name={`${id}-frequency`} className='form-check-input' type="radio" id={`${id}-occasionally-check`} />
                    <label className='form-check-label' htmlFor={`${id}-occasionally-check`}>Occasionally</label>
                </div>
                <div className="form-check mb-3">
                    <input onChange={OnRadioChange} data-name="churchFrequency" data-value="Never" name={`${id}-frequency`} className='form-check-input' type="radio" id={`${id}-never-check`} />
                    <label className='form-check-label' htmlFor={`${id}-never-check`}>Never</label>
                </div>
            </div>
            <div className={`section-cta ${displayRemoveCta ? '' : 'hidden'}`}>
                <button type='button' className="btn btn-danger" onClick={RemoveSection}>Remove Member</button>
            </div>
        </div>
    );
}

export default FormSection;