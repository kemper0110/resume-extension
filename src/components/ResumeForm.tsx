import {useId} from "react";
import {Resume} from "../api/useParsedResume";

interface ResumeFormProps {
    form: Resume,
    setForm: (resume: Resume) => void;
}

const ResumeForm = ({form, setForm}: ResumeFormProps) => {
    const fullnameId = useId();
    const phoneId = useId();
    const emailId = useId();
    const expId = useId();

    const onChange = (e: any) => {
    // : ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement> - с этим не сработало
        console.log(e.target.value)
        setForm({...form, [e.target.name]: e.target.value});
    }

    return (
        <>
            <h1 className="m-1">Карточка кандидата</h1>
            <div className="m-1">
                <div className="mb-3 row">
                    <label htmlFor={fullnameId} className="col-sm-3 col-form-label">ФИО</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Иванов Иван Иванович"
                               id={fullnameId} name="fullname" value={form.fullname} onChange={onChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor={phoneId} className="col-sm-3 col-form-label">Телефон</label>
                    <div className="col-sm-10">
                        <input type="tel" className="form-control" placeholder="+7 900 000 0000"
                               id={phoneId} name="phone" value={form.phone} onChange={onChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor={emailId} className="col-sm-3 col-form-label">Почта</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" placeholder="name@mail.com"
                               id={emailId} name="email" value={form.email} onChange={onChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor={emailId} className="col-sm-3 col-form-label">Образование</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" rows={5}
                                  id={emailId} name="education" value={form.education} onChange={onChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor={expId} className="col-sm-3 col-form-label">Опыт работы</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" rows={10}
                                  id={expId} name="experience" value={form.experience} onChange={onChange}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResumeForm;