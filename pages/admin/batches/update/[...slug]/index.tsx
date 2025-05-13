import {Batch_validation} from '../../../../../common/validations/validations'
import CommonForm from '../../../_components/CommonForm'

const Index: React.FC = () => {

    return (
        <CommonForm 
            isEdit={true}
            apiEndpoint="batches"
            title="Batch"
            fieldName="batch_name"
            validator={Batch_validation}
            label='Batch name'
        />
    )
};

export default Index;
