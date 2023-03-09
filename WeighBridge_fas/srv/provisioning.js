const cds = require("@sap/cds");
const xsenv = require("@sap/xsenv");
xsenv.loadEnv();

module.exports = (service) => {
    service.on("UPDATE", "tenant", async (req, next) => {
        //var consumerSubdomain = req.body.subscribedSubdomain;
        let tenantURL = process.env.APP_PROTOCOL + "://" + req.data.subscribedSubdomain + "-" + req.data.subscriptionAppName+".cfapps.ap10.hana.ondemand.com";  
        await next();
        return tenantURL;
    });

    service.on("DELETE", "tenant", async (req, next) => {
        await next();
        return req.data.subscribedTenantId;
    });

    service.on("upgradeTenant", async (req, next) => {
        await next();
    });

    service.on("dependencies", async (req, next) => {
        let dependencies = await next();
        const services = xsenv.getServices({ destination: { tag: "destination" } });
        dependencies.push({ xsappname: services.destination.xsappname });
        return dependencies;
    });
};