import {Tag_validation} from '../../../../../common/validations/validations'
import CommonForm from "../../../_components/CommonForm";

const Index: React.FC = () => {

    return (
        <CommonForm 
            isEdit={true}
            apiEndpoint="companytags"
            title="Company Tag"
            fieldName="tag_name"
            validator={Tag_validation}
            label='Tag name'
        />
    )
};

export default Index;
