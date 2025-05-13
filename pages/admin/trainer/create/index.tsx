import UserForm from '../../_components/UserForm'
import {User_validation} from '../../../../common/validations/validations'

const Index: React.FC = () => {

	return (
        <UserForm 
            title='Trainer'
            isEdit={false}
            apiEndpoint='trainer'
            frontEndRoute='trainer'
            role={3}
            validator={User_validation}
        />
    )
};

export default Index;
