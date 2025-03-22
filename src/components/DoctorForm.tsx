import useForm from "../hooks/useForm";
import { validateEmptyFields } from "../utils/functions";

type DataObject = { [key: string]: string; } | {};
type ValidationFunction = (input: DataObject) => DataObject;
type SubmitFunction = (input: DataObject) => DataObject;

const DoctorForm = ({ operation, doctor, onSubmit, onClose }) => {

    let doctorValues = {
        id: doctor? doctor.id : undefined,
        name: doctor ? doctor.name : "",
        imageUrl: doctor ? doctor.imageUrl : "",
        specialty: doctor ? doctor.specialty :  "",
        experience: doctor ? doctor.experience : "",
        yearsOfExperience: doctor ? doctor.yearsOfExperience : 0,
        email: doctor ? doctor.email : ""
    };
   
    let title;
    switch(operation) {
        case 1:
            title = "Nuevo doctor";
            break;
        case 2:
            title = "Editar doctor";
            break;
        case 3:
            title = "Borrar doctor";
            break;
        default:
            throw new Error("Operación no válida");
    }

    const validate: ValidationFunction = (values) => {
        const validationErrors = validateEmptyFields(values);
        return validationErrors;
    };

    const deleteDoctor = () => {
        onSubmit(doctorValues.id);
        onClose();
    };

    const { errors, handleSubmit, handleChange } = useForm(doctorValues, validate, onSubmit, onClose, false);

    return (
        <div>
            <h3>{title}</h3>
            {(operation === 1 || operation === 2) &&
                <form onSubmit={handleSubmit as SubmitFunction} className="contact-form">
                    <div className="mb-3">
                        <input type="text" id="name" className="form-control" placeholder="Nombre" 
                            defaultValue={doctorValues.name} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" id="specialty" className="form-control" placeholder="Especialidad" 
                            defaultValue={doctorValues.specialty} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" id="experience" className="form-control" placeholder="Describa su experiencia" 
                            defaultValue={doctorValues.experience} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" id="yearsOfExperience" className="form-control" placeholder="Años de experiencia" 
                            defaultValue={doctorValues.yearsOfExperience} onChange={handleChange}/>
                    </div>
                    {operation === 1 &&
                        <div className="mb-3">
                            <input type="email" id="email" className="form-control" placeholder="Email" onChange={handleChange}/>
                        </div>
                    }
                    <button type="submit" className="btn btn-primary">{operation === 1 ? "Crear" : "Actualizar"}</button>
                    <button onClick={onClose} className="btn btn-primary">Cancelar</button>
                </form>
            }
            {operation === 3 &&
                <div>
                    <h6>El doctor {doctorValues.name} será borrado del sistema. ¿Está seguro?</h6>
                    <br />
                    <button onClick={deleteDoctor} className="btn btn-primary">Borrar</button>
                    <button onClick={onClose} className="btn btn-primary">Cancelar</button>
                </div>     
            }
            {errors && 
                <ul>
                    {Object.keys(errors).map(errorKey => <li style={{ color: "red" }} key={errorKey}>{errors[errorKey]}</li>)}
                </ul>
            }
        </div>
    );
};

export default DoctorForm;