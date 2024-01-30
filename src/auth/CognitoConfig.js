import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'YOUR_USER_POOL_ID', 
    ClientId: 'YOUR_CLIENT_ID' 
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
