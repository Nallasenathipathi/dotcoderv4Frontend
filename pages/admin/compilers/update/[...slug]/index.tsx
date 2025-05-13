import {Compiler_validation} from '../../../../../common/validations/validations'
import CommonForm from "../../../_components/CommonForm";

const Index: React.FC = () => {

    return (
        <CommonForm 
            isEdit={true}
            apiEndpoint="compilers"
            title="Compiler"
            fieldName="api"
            validator={Compiler_validation}
            label='Compiler name'
        />
    )
};

export default Index;
