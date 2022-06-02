import React, { useRef, useState } from 'react';

const FormSection = (props) => {
    let { id, RemoveSection, UpdateSectionData } = props;
    let [ sectionData, setSectionData ] = useState({});

    const OnBlurHandler = (e) => {
        let DOM = e.target,
            { name } = DOM.dataset,
            copySectionData = {...sectionData};

        copySectionData[name] = DOM.value;
        if(DOM.value.length > 0) {
            setSectionData(copySectionData);
            UpdateSectionData(id, copySectionData)
        }
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
        <div className='form-section'>
            <div className='section-left'>
                <input onBlur={OnBlurHandler} type="text" placeholder='Name of member' data-name="MemberName"/>
                <select>
                    <option value="-1">Select Age Group</option>
                    <option value="0-5">0-5</option>
                    <option value="6-12">6-12</option>
                    <option value="13-18">13-18</option>
                    <option value="19-50">19-50</option>
                    <option value="> 50">> 50</option>
                </select>
                <input onClick={OnCheckHandler} type="checkbox" id={`${id}-anglican-check`} data-name="isAnglican"/>
                <label htmlFor={`${id}-anglican-check`}>Anglican</label>
                <input onClick={OnCheckHandler} type="checkbox" id={`${id}-baptized-check`} data-name="isBaptized"/>
                <label htmlFor={`${id}-baptized-check`}>Baptized</label>

                <div>
                    <input onClick={OnCheckHandler} type="checkbox" id={`${id}-sunday-check`} data-name="isSundaySchool"/>
                    <label htmlFor={`${id}-sunday-check`}>Sunday School</label>
                    <input onClick={OnCheckHandler} type="checkbox" id={`${id}-youth-check`} data-name="isYouth"/>
                    <label htmlFor={`${id}-youth-check`}>Youth</label>
                    <input onClick={OnCheckHandler} type="checkbox" id={`${id}-MU-check`} data-name="isMU"/>
                    <label htmlFor={`${id}-MU-check`}>Mother's Union</label>
                    <input onClick={OnCheckHandler} type="checkbox" id={`${id}-elder-check`} data-name="isElderly"/>
                    <label htmlFor={`${id}-elder-check`}>Elderly</label>
                    <input onClick={OnCheckHandler} type="checkbox" id={`${id}-welcome-check`} data-name="isWelcome"/>
                    <label htmlFor={`${id}-welcome-check`}>Welcome</label>
                    <input onClick={OnCheckHandler} type="checkbox" id={`${id}-prayer-check`} data-name="isPrayer"/>
                    <label htmlFor={`${id}-prayer-check`}>Prayer</label>
                    <input onClick={OnCheckHandler} type="checkbox" id={`${id}-av-team-check`} data-name="isAVTeam"/>
                    <label htmlFor={`${id}-av-team-check`}>AV Team</label>
                    <input onClick={OnCheckHandler} type="checkbox" id={`${id}-compassion-check`} data-name="isCompassion"/>
                    <label htmlFor={`${id}-compassion-check`}>Compassion</label>
                    <input onClick={OnCheckHandler} type="checkbox" id={`${id}-music-check`} data-name="isMusic"/>
                    <label htmlFor={`${id}-music-check`}>Music</label>
                    <input onClick={OnCheckHandler} type="checkbox" id={`${id}-cell-check`} data-name="isCellGroup"/>
                    <label htmlFor={`${id}-cell-check`}>Cell Group</label>
                    <input onClick={OnCheckHandler} type="checkbox" id={`${id}-other-ministry-check`} data-name="isOther"/>
                    <label htmlFor={`${id}-other-ministry-check`}>Other</label>
                    {
                        true ?
                        <input type="text" placeholder="Please specify" /> : null
                    }
                </div>
            </div>
            <div className='section-right'>
                <input type="checkbox" id={`${id}-one-week-check`} />
                <label htmlFor={`${id}-one-week-check`}>Once a week</label>
                <input type="checkbox" id={`${id}-one-month-check`} />
                <label htmlFor={`${id}-one-month-check`}>Once a month</label>
                <input type="checkbox" id={`${id}-never-check`} />
                <label htmlFor={`${id}-never-check`}>Never</label>
                <input type="checkbox" id={`${id}-other-check`} />
                <label htmlFor={`${id}-other-check`}>Other</label>
                {
                    true ?
                    <input type="text" placeholder="Please specify" /> : null
                }
            </div>
            <button type='button' onClick={RemoveSection}>Remove Member</button>
        </div>
    );
}

export default FormSection;