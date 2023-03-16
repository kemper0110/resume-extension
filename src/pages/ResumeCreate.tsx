import Spinner from "../components/Spinner";
import ResumeForm from "../components/ResumeForm";
import {useEffect, useState} from "react";
import useParsedResume from "../api/useParsedResume";
import {useAlert} from "react-alert";
import {useApi} from "../contexts/ApiContext";

const useMutableResume = () => {
    const {resume, isLoading} = useParsedResume();
    const [state, setState] = useState(resume);
    useEffect(() => setState(resume), [resume]);
    return {
        resume: state, setResume: setState, isLoading
    }
}
const ResumeCreate = () => {
    const alert = useAlert();
    const api = useApi();
    const {resume, setResume, isLoading} = useMutableResume();

    const onSave = () => {
        console.log(resume);
        api.post("/resumes", resume).then(response => {
            if (response.status === 200)
                alert.success("Резюме успешно добавлено");
            else
                alert.error("Ошибка добавления резюме");
        })
    };

    if (isLoading)
        return <Spinner/>;
    return (
        <>
            <a target='_blank' role='button' className="btn btn-primary float-end me-1" href={process.env.REACT_APP_BASE_URL} rel="noreferrer">Список</a>
            <ResumeForm form={resume} setForm={setResume}/>
            <div className="text-center">
                <button className="btn btn-primary w-50 m-1" onClick={onSave}>
                    Сохранить
                </button>
            </div>
        </>
    );
};

export default ResumeCreate;