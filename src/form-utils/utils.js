const formUtils = () => {
    const ValidateRequired = (DOM) => {
        let type = DOM.getAttribute("type"),
            value = '';

        switch (type) {
            case "select":
                value = DOM.value;
                if(value === "-1") {
                    return {
                        DOM,
                        valid: false
                    }
                } else {
                    return {
                        DOM,
                        valid: true
                    }
                }
            case "text":
                value = DOM.value.trim();
                if(value.length < 1) {
                    return {
                        DOM,
                        valid: false
                    }
                } else {
                    return {
                        DOM,
                        valid: true
                    }
                }
            case "checkbox":
                if(!DOM.checked) {
                    return {
                        DOM,
                        valid: false
                    }
                } else {
                    return {
                        DOM,
                        valid: true
                    }
                }        
            default:
                break;
        }
    }

    const DisplayError = ({DOM, valid}) => {
        if(valid) {
            DOM.classList.remove("is-invalid")
        } else {
            DOM.classList.remove("is-valid")
            DOM.classList.add("is-invalid")
        }
    }

    const ValidateForm = (formDOM) => {
        let requiredInputs = formDOM.querySelectorAll('[data-is-required="true"]');
        let validatedDOMS = [];
        let validCount = 0;
        requiredInputs.forEach(input => {
            validatedDOMS.push(ValidateRequired(input))
        });
        validatedDOMS.forEach((item, index) => {
            if(!item.valid) {
                if(validCount === 0) {
                    item.DOM.focus()
                }

                validCount++;
            }

            DisplayError(item)
        });

        return validCount > 0 ? false : true
    }

    const ResetForm = (formDOM) => {
        formDOM.reset();
        let validInputs = formDOM.querySelectorAll('.is-valid');
        validInputs.forEach(input => {
            input.classList.remove("is-valid")
        });
    }

    return {
        ValidateForm,
        ResetForm
    };
}

const FormUtils = formUtils();
export default FormUtils;