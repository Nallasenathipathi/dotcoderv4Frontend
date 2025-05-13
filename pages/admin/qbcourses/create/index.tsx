import {Course_validation} from '../../../../common/validations/validations'
import CommonForm from "../../_components/CommonForm";

const Index: React.FC = () => {

    return (
        <CommonForm 
            isEdit={false}
            apiEndpoint="qbcourses"
            title="Course"
            fieldName="course_name"
            validator={Course_validation}
            label='Course name'
        />
    )
};

export default Index;
