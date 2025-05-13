import {Section_validation} from '../../../../common/validations/validations'
import CommonForm from "../../_components/CommonForm";

const Index: React.FC = () => {

	return (
        <CommonForm 
            isEdit={false}
            apiEndpoint="sections"
            title="Section"
            fieldName="section_name"
            validator={Section_validation}
            label='Section name'
        />
    )
};

export default Index;
