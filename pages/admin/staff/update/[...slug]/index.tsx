import UserForm from '../../../_components/UserForm'
import {User_validation} from '../../../../../common/validations/validations'

const Index: React.FC = () => {

    return (
        <UserForm 
            title='Staff'
            isEdit={true}
            apiEndpoint='staff'
            frontEndRoute='staff'
            role={6}
            validator={User_validation}
        />
    )
};

export default Index;
