import { CognitoUserPool } from 'amazon-cognito-identity-js';

const cognitoConfig = {
    UserPoolId: 'us-east-1_VBEJLebSo', 
    ClientId: '5bp5296eg0msmo1i5o7njbehn5' 
};

const UserPool = new CognitoUserPool(cognitoConfig);

export default UserPool;
