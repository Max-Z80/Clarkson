var hash = require("./security/hash");

module.exports = (function() {

    return {

        port: process.env.APP_PORT || 3000,

        enableRegistration: process.env.ENABLE_REGISTRATIONS || false,

        mysql: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD
        },

        auth: {
            jwtSecret: hash.random()
        },
	
	baseURI: process.env.PassengerBaseURI || ''
    };

}());
