import UserForm from '../../../_components/UserForm'
import {User_validation} from '../../../../../common/validations/validations'

const Index: React.FC = () => {

    return (
        <UserForm 
            title='College Admin'
            isEdit={true}
            apiEndpoint='college_admin'
            frontEndRoute='collegeAdmin'
            role={5}
            validator={User_validation}
        />
    )
};

export default Index;
