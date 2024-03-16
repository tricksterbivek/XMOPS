import { CognitoUserPool } from 'amazon-cognito-identity-js';

const cognitoConfig = {
    UserPoolId: 'ap-southeast-2_wS43KwPMQ', 
    ClientId: '70i0rgkkuhapqt44lpqhnd72d6' 
};

const UserPool = new CognitoUserPool(cognitoConfig);

export default UserPool;
