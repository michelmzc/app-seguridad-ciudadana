
const ENV = {
    dev: {
      API_URL: "https://backend-seguridad-ciudadana.onrender.com"//"http://10.0.2.2:3000", // IP local de tu PC
    },
    prod: {
      API_URL: "https://backend-seguridad-ciudadana.onrender.com",
    },
  };
  
  const getEnvVars = () => {
    // __DEV__ es una variable global de React Native
    return __DEV__ ? ENV.dev : ENV.prod;
  };
  
  export default getEnvVars;
  