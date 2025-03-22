import React, { useState } from 'react';
import { sanitizeData } from "../utils/functions";
import { encryptInput } from "../utils/encryption";

type DataObject = { [key: string]: string; } | {};
type ValidationFunction = (input: DataObject) => DataObject;
type SubmitFunction = (input: DataObject) => DataObject;
type OnCloseFunction = () => void;

const useForm = (initialValues: DataObject, validate: ValidationFunction, onSubmit: SubmitFunction, onClose: OnCloseFunction, encrypt: boolean) => {

    const [values, setValues] = useState<DataObject>(initialValues);
    const [errors, setErrors] = useState<DataObject>({});
    const [processing, setProcessing] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...values, [event.target.id]: event.target.value});
    };

    const encryptData = (plainData: DataObject): DataObject => {
        let encryptedData: any = {};
        for (const [key, value] of Object.entries(plainData)) {
            encryptedData[key] = encryptInput(value);
        }
        return encryptedData;
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>): void => {
        try {
            event.preventDefault();
            setValues(sanitizeData(values));
            const errorsFound = validate(values);
            setErrors(errorsFound);
            console.log(`Errors: ${JSON.stringify(errorsFound)}`);
            if (!errorsFound || Object.keys(errorsFound).length === 0) {
                if (encrypt) {
                    setValues(encryptData(values));
                }
               
                console.log(`Request: ${JSON.stringify(values)}`);
                setProcessing(true);
                onSubmit(values);
                setProcessing(false);
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
       
    };
    
    return { values, errors, processing, handleChange, handleSubmit };
};

export default useForm;